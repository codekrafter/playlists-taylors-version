import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, firstValueFrom, map } from 'rxjs';
import { Playlist } from '../../models';

@Component({
  templateUrl: './select-playlist.component.html',
  styleUrls: ['./select-playlist.component.scss'],
})
export class SelectPlaylistComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  readonly window = window;

  playlists: Playlist[] = [];

  async ngOnInit(): Promise<void> {
    this.playlists = await firstValueFrom(
      this.route.data.pipe(
        map((d) => d['playlists']),
        filter((p) => !!p)
      )
    );
  }
}
