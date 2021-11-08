import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, firstValueFrom, map } from 'rxjs';
import { SpotifyService } from '../../api/spotify.service';
import { ConversionService } from '../../conversion.service';
import { Playlist, Track } from '../../models';

@Component({
  templateUrl: './finalize-playlist.component.html',
  styleUrls: ['./finalize-playlist.component.scss'],
})
export class FinalizePlaylistComponent implements OnInit {
  playlist: Playlist | null = null;
  tracks: Track[] = [];

  readonly name = this.formBuilder.control('', [Validators.required]);
  readonly override = this.formBuilder.control(false);
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private conversion: ConversionService,
    private spotify: SpotifyService,
    private router: Router
  ) {}

  converted: string[] = [];
  convertedIds: string[] = [];

  async ngOnInit(): Promise<void> {
    this.playlist = await firstValueFrom(
      this.route.data.pipe(
        map((d) => d['playlist']),
        filter((p) => !!p)
      )
    );

    this.converted = await firstValueFrom(this.route.queryParamMap).then(
      (m) => m.get('converted')?.split(',') ?? []
    );

    this.convertedIds = this.converted
      .map((uri) => uri.split(':').pop())
      .filter((id) => !!id) as string[];

    this.name.setValue(`${this.playlist!.name} (Taylor's Version)`);

    this.tracks = await Promise.all(
      this.playlist!.tracks.items.map(async ({ track }) => {
        if (this.convertedIds.includes(track.id)) {
          return this.conversion
            .findReplacementTrack(track)
            .then((v) => v ?? track); // Make sure we don't end up with a null track
        } else {
          return Promise.resolve(track);
        }
      })
    );
  }

  async finalize(): Promise<void> {
    if (!this.playlist) return;

    const newTracks = this.tracks.map((t) =>
      this.convertedIds.includes(t.id)
        ? this.conversion.findReplacement(t)!
        : t.uri
    );
    let playlistId: string;

    if (this.override.value) {
      await Promise.all([
        this.spotify.updatePlaylist(this.playlist.id, this.name.value),
        this.spotify.populatePlaylist(this.playlist.id, newTracks),
      ]);

      playlistId = this.playlist.id;
    } else {
      const playlist = await this.spotify.createPlaylist(this.name.value);

      await this.spotify.populatePlaylist(playlist.id, newTracks);

      playlistId = playlist.id;
    }

    this.router.navigate(['/finished'], {
      queryParams: {
        id: playlistId,
      },
    });
  }
}
