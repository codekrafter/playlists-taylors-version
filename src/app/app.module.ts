import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthInterceptor } from './api/auth.interceptor';
import { SelectPlaylistComponent } from './pages/select-playlist/select-playlist.component';
import { EditPlaylistComponent } from './pages/edit-playlist/edit-playlist.component';
import { BestImagePipe } from './pipes/best-image.pipe';
import { FinalizePlaylistComponent } from './pages/finalize-playlist/finalize-playlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FinishedComponent } from './pages/finished/finished.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
} from '@angular/fire/analytics';
import { providePerformance, getPerformance } from '@angular/fire/performance';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    CallbackComponent,
    SelectPlaylistComponent,
    EditPlaylistComponent,
    BestImagePipe,
    FinalizePlaylistComponent,
    FinishedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    LayoutModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSlideToggleModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    providePerformance(() => getPerformance()),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ScreenTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
