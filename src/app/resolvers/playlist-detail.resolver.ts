import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../api/spotify.service';
import { Playlist } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlaylistDetailResolver implements Resolve<Playlist> {
  constructor(private spotify: SpotifyService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Playlist> {
    return this.spotify.getPlaylistDetail(route.queryParamMap.get('id') ?? '');
  }
}
