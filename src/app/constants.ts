import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

// API Constants
export const API_BASE_URL = 'https://api.spotify.com/v1';

// Auth Constants
export const CLIENT_ID = '44a71e5b4c124ffbbdb3d8bdd5c6ad8b';
export const REDIRECT_URI = `${environment.host}/callback`;
export const OAUTH_SCOPE = [
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
].join(' ');

// Injection Tokens
export const LOGIN_REDIRECT = new InjectionToken('LOGIN_REDIRECT');
