import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UrlTree | true {
    const token = sessionStorage.getItem('access_token');
    const expiresAt = +sessionStorage.getItem('expires_at')!;

    if (!token || !expiresAt || isNaN(expiresAt) || expiresAt < Date.now()) {
      console.log('canceling nav');
      return this.router.parseUrl('/');
    } else {
      return true;
    }
  }
}
