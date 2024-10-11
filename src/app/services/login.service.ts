import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReqLoginModel } from '../interface/login';
import { ApiConstant } from '../shared/constant/api.constant';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from './storage.service';
import { StorageData } from '../shared/constant/app.constant';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlState = new BehaviorSubject<any>({});
  public redirectUrl = this.urlState.asObservable();

  constructor(
    private http: HttpClient,
    private readonly storeService: StorageService,
    private readonly cookieService: CookieService

  ) { }

  login (reqData: ReqLoginModel) {
    return this.http.post(ApiConstant.Login, {...reqData})
    .pipe(map((res: any) => {

      return res;
    }));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.status === 400) {
      errorMessage = 'Bad request, invalid parameters.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized, invalid phone or password.';
    } else if (error.status === 500) {
      errorMessage = 'Internal server error.';
    } else {
      errorMessage = 'An unknown error occurred.';
    }
    console.error(`Error Status: ${error.status}, Message: ${errorMessage}`);

    // Trả lỗi ra ngoài
    return throwError(errorMessage);
  }
  

  getAccessToken() {
    return localStorage.getItem("accessToken")
  }

  clearStoreData() {
    this.cookieService.deleteAll();
    this.storeService.clear();
    localStorage.removeItem("accessToken")
  }

  setUrlRedirect (url: string) {
    this.urlState.next(url);
  }
}

