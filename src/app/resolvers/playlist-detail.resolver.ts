import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SpotifyService } from '../api/spotify.service';
import { Playlist } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistDetailResolver implements Resolve<Playlist | null> {
  constructor(private spotify: SpotifyService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Playlist | null> {
    const id = route.queryParamMap.get('id');
    if (!id) return of(null);
    return this.spotify.getPlaylistDetail(id);
  }
}
