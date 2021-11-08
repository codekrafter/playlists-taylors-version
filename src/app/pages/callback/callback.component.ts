import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SpotifyService } from '../../api/spotify.service';
import { getErrorMessage } from '../../utils';

@Component({
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {}

  name: string | null = null;
  error: string | null = null;

  async ngOnInit(): Promise<void> {
    const queryMap = await firstValueFrom(this.route.queryParamMap);

    const state = queryMap.get('state');
    const error = queryMap.get('error');
    const code = queryMap.get('code');

    if (state !== sessionStorage.getItem('state'))
      return this.displayError('State mismatch. Please try again');
    else if (error)
      return this.displayError(`Error: ${error}. Please try again`);
    else if (!code)
      return this.displayError('Error: missing code. Please try again');

    try {
      const { access_token, expires_in, refresh_token } =
        await this.spotify.getToken(code);

      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('expires_at', `${Date.now() + expires_in * 1000}`);
      sessionStorage.setItem('refresh_token', refresh_token);

      const profile = await this.spotify.getProfile();

      this.name = profile.display_name;
    } catch (e) {
      console.error(e);
      this.displayError(`Error: ${getErrorMessage(e)}.  Please try again`);
    }
  }

  displayError(message: string): void {
    this.error = message;
  }
}
