import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = sessionStorage.getItem('access_token');

    if (!authToken) return next.handle(req);

    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });

    return next.handle(authReq);
  }
}
