import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SpotifyService } from './api/spotify.service';
import { MUSIC_MAP } from './data';
import { Track } from './models';

@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  private trackCache: Map<string, Track> = new Map();
  constructor(private spotify: SpotifyService) {}

  findReplacement(track: Track): string | null {
    const uri = MUSIC_MAP[track.external_ids.isrc];

    if (uri) return uri;
    else return null;
  }

  async findReplacementTrack(track: Track): Promise<Track | null> {
    const uri = this.findReplacement(track);
    if (!uri) return null;
    if (this.trackCache.has(uri)) return this.trackCache.get(uri)!;

    const id = uri.split(':').pop();

    if (!id) return null;

    const t = await firstValueFrom(this.spotify.getTrack(id));

    this.trackCache.set(uri, t);

    return t;
  }

  clearCache(): void {
    this.trackCache.clear();
  }
}
