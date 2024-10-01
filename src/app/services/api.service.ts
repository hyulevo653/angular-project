import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paging } from '../interface/paging';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi : string = " http://localhost:3000/api/product-search"

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
  
    return this.http.get(this.urlApi, { params })
      .pipe(map((res: any) => {
        return res;
      }));
    }
}
