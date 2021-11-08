import { HttpClient } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, from, Observable, of } from 'rxjs';
import { API_BASE_URL, CLIENT_ID, REDIRECT_URI } from '../constants';
import { Playlist, Track } from '../models';
import { generateRandomString } from '../utils';

interface TokenDto {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

interface PaginatedResponse {
  items: any[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // private codeVerifier: string | null = null;

  private get codeVerifier(): string | null {
    return sessionStorage.getItem('code_verifier');
  }

  constructor(private http: HttpClient) {}

  async getToken(code: string): Promise<TokenDto> {
    return await firstValueFrom(
      this.http.post<any>(
        `https://accounts.spotify.com/api/token`,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          code_verifier: this.codeVerifier!,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
    );
  }

  async getProfile(): Promise<any> {
    return await firstValueFrom(this.http.get<any>(`${API_BASE_URL}/me`));
  }

  getUserPlaylists(): Observable<Playlist[]> {
    return from(this.getAllData(`${API_BASE_URL}/me/playlists`));
  }

  getPlaylistDetail(id: string): Observable<Playlist> {
    return this.http.get<any>(`${API_BASE_URL}/playlists/${id}`);
  }

  getTrack(id: string): Observable<Track> {
    return this.http.get<any>(`${API_BASE_URL}/tracks/${id}`);
  }

  async getCodeChallenge(): Promise<string> {
    const codeVerifier = generateRandomString(100);
    sessionStorage.setItem('code_verifier', codeVerifier);

    return base64urlencode(await sha256(codeVerifier));
  }

  /**
   * If the given endpoint is paginated, iterate to get all of the data
   */
  private async getAllData<T = any>(route: string): Promise<T[]> {
    const items: T[] = [];
    let next: string | null = route;
    while (next) {
      const res: any = await firstValueFrom(
        this.http.get<PaginatedResponse>(next)
      );

      items.push(...(res.items ?? []));
      next = res.next;
    }

    return items;
  }
}

async function sha256(message: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(a))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// function isPaginatedResponse(res: any): res is PaginatedResponse {
//   return (
//     'items' in res &&
//     'limit' in res &&
//     'offset' in res &&
//     'total' in res &&
//     ('next' in res || 'previous' in res)
//   );
// }
