import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService 
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const endpoint = route.data['endpoint'];
    const token = this.loginService.getAccessToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(endpoint, { headers }).pipe(
      map(data => {
        return data;
      }),
      catchError(error => {
        if (error.status === 403) {
          this.router.navigate(['/error-404']);
          return of(null);
        }
        return of(error);
      })
    );
  }
}
