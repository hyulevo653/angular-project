import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paging } from '../interface/paging';
import { map } from 'rxjs';
import { ApiConstant } from '../shared/constant/api.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  searchData(queryParams: Paging) {
    let params = new HttpParams();

    if (queryParams.keyword) {
      params = params.set('keyword', queryParams.keyword);
    }
    if (queryParams.brand) {
      params = params.set('brand', queryParams.brand);
    }
    if (queryParams.page) {
      params = params.set('page', queryParams.page.toString());
    }
    if (queryParams.city) {
      params = params.set('city', queryParams.city);
    }
    if (queryParams.condition) {
      params = params.set('condition', queryParams.condition);
    }
    if (queryParams.release_year) {
      params = params.set('release_year', queryParams.release_year.toString());
    }
    if (queryParams.max_price) {
      params = params.set('max_price', queryParams.max_price.toString());
    }
  
    return this.http.get(ApiConstant.Search, { params })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getListUser() {
    return this.http.get(ApiConstant.GetUser)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
