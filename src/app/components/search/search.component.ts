import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SlickComponent } from '../slick/slick.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

interface ApiResponse {
  devices: any[];
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FooterComponent,
    HeaderComponent,
    SlickComponent,
    SlickCarouselModule,
    TableModule,
  ],
  providers: [ApiService],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  defaultImg = 'assets/images/anh_product.png';
  public data: any;
  totalItems: number = 0;
  minValue: number = 0;
  minYear: number = 1984;
  isLoading: boolean = false;
  isNull: boolean = false;
  pagedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  pages: number[] = [];
  totalPages!: number;
  errorMessage: string = '';

  public inputText: string = '';

  constructor(
    private http: HttpClient,
    private readonly apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onSearch();
    this.calculatePages();
  }

  onSearch() {
    this.isLoading = true;
    const queryParams = {
      keyword: this.inputText,
      page: this.currentPage,
    };

    this.router.navigate(['/search'], {
      queryParams: {
        keyword: this.inputText,
        page: this.currentPage,
      },
    });

    this.apiService
      .searchData(queryParams)
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          this.isLoading = false;
          if (error.status === 500) {
            this.errorMessage = 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.';
          } else {
            this.errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại.';
          }
          return of({ devices: [], count: 0 });
        })
      )
      .subscribe((response: any) => {
        this.isLoading = false;
        this.data = response.devices;
        this.totalItems = response.count;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        if (response.count === 0) {
          this.isNull = true;
        } else this.isNull = false;
      });
  }

  transform(value: number): string {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  changeText(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inputText = inputElement.value;
    console.log(this.inputText);
  }

  updateValue(event: Event) {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      this.minValue = +inputElement.value;
    }
  }
  updateYear(event: Event) {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      this.minYear = +inputElement.value;
    }
  }

  calculatePages() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  onPageChange(page: number) {
    this.isLoading = true;
    this.currentPage = page;
    this.onSearch();
  }

  onConditionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const condition = selectElement.value;
    this.callApiWithCondition(condition);
    let currentUrl = this.router.url;
    if (currentUrl.includes('?')) {
      currentUrl += `&condition=${condition}`;
    } else {
      currentUrl += `?condition=${condition}`;
    }
    this.router.navigateByUrl(currentUrl);
  }

  callApiWithCondition(condition: string) {
    const queryParams = {
      condition: condition,
    };

    this.apiService.searchData(queryParams).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.data = response.devices;
        this.totalItems = response.count;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        if (response.count === 0) {
          this.isNull = true;
        } else this.isNull = false;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
