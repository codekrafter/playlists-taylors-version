import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { LOGIN_REDIRECT } from './constants';
import { LoginGuard } from './login.guard';
import { CallbackComponent } from './pages/callback/callback.component';
import { DevHelperComponent } from './pages/dev-helper/dev-helper.component';
import { EditPlaylistComponent } from './pages/edit-playlist/edit-playlist.component';
import { FinalizePlaylistComponent } from './pages/finalize-playlist/finalize-playlist.component';
import { FinishedComponent } from './pages/finished/finished.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent, LoginRedirect } from './pages/login/login.component';
import { SelectPlaylistComponent } from './pages/select-playlist/select-playlist.component';
import { PlaylistDetailResolver } from './resolvers/playlist-detail.resolver';
import { PlaylistsResolver } from './resolvers/playlists.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      url: LOGIN_REDIRECT,
    },
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'select',
    component: SelectPlaylistComponent,
    canActivate: [LoginGuard],
    resolve: {
      playlists: PlaylistsResolver,
    },
  },
  {
    path: 'edit',
    component: EditPlaylistComponent,
    canActivate: [LoginGuard],
    resolve: {
      playlist: PlaylistDetailResolver,
    },
  },
  {
    path: 'finalize',
    component: FinalizePlaylistComponent,
    canActivate: [LoginGuard],
    resolve: {
      playlist: PlaylistDetailResolver,
    },
  },
  {
    path: 'finished',
    component: FinishedComponent,
    canActivate: [LoginGuard],
    resolve: {
      playlist: PlaylistDetailResolver,
    },
  },
];

if (!environment.production) {
  routes.push({
    path: 'dev',
    component: DevHelperComponent,
    resolve: {
      playlist: PlaylistDetailResolver,
    },
  });
}

@NgModule({
  providers: [LoginRedirect],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
