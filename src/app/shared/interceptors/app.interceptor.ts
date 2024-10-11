import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);
    const token = loginService.getAccessToken() || '';

    const reqHeader = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(reqHeader).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if (this.router.url !== '/login') {
            loginService.clearStoreData();
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
          }
        } else if (err.status === 403) {
          // Redirect to 404 page
          this.router.navigate(['/error-404']);
        }

        const error = err.message || err.statusText;

        return throwError(error);
      }),
    );
  }
}
