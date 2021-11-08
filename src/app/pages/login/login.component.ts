import { Component, Provider } from '@angular/core';
import { SpotifyService } from '../../api/spotify.service';
import {
  CLIENT_ID,
  LOGIN_REDIRECT,
  OAUTH_SCOPE,
  REDIRECT_URI,
} from '../../constants';
import { generateRandomString } from '../../utils';

@Component({
  template: 'Redirecting...',
})
export class LoginComponent {}

export const LoginRedirect: Provider = {
  provide: LOGIN_REDIRECT,
  deps: [SpotifyService],
  useFactory: (spotify: SpotifyService) => async () => {
    sessionStorage.removeItem('access_token');
    let state = sessionStorage.getItem('state');
    if (!state) {
      state = generateRandomString(16);
      sessionStorage.setItem('state', state);
    }
    const url = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', CLIENT_ID);
    url.searchParams.set('scope', OAUTH_SCOPE);
    url.searchParams.set('redirect_uri', REDIRECT_URI);
    url.searchParams.set('state', state);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('code_challenge', await spotify.getCodeChallenge());

    window.open(url.toString(), '_self');
  },
};
