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
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  providers: [ApiService],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  selectedBrand: string = ''; // thương hiệu
  condition : string = ''; //trạng thái cũ - mới
  cityName : string = ''; // tên thành phố
  minPrice: number = 0;     // Giá trị nhỏ nhất cho slider
  maxPrice: number = 1000000000;   // Giá trị lớn nhất cho slider
  minValuePrice: number = 0;  // Giá trị khởi tạo cho min
  maxValuePrice : number = 1000000000;  // Giá trị khởi tạo cho max
  minYear: number = 1984;     // Giá trị nhỏ nhất cho slider
  maxYear: number = 2024;   // Giá trị lớn nhất cho slider
  minValueYear: number = 1984;  // Giá trị khởi tạo cho min
  maxValueYear : number = 2024;  // Giá trị khởi tạo cho max
  defaultImg = 'assets/images/anh_product.png';
  public data: any;
  totalItems: number = 0;
  isLoading: boolean = false;
  isNull: boolean = false;
  pagedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  pages: number[] = [];
  totalPages!: number;
  errorMessage: string = '';
  isRow : boolean = true;
  isColumn : boolean = false;

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

  change(){
    console.log(this.cityName)
  }

  onSearch() {
    this.isLoading = true;
    const queryParams : any = {
      keyword: this.inputText,
      page: this.currentPage,
    };

    if (this.cityName !== '') {
      queryParams.city = this.cityName;
    }

    this.router.navigate(['/search'], {
      queryParams: {
        keyword: this.inputText,
        city : this.cityName,
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
          } else if (error.status === 400 ) {
            this.errorMessage = 'Tham số không hợp lệ, vui lòng nhập lại';
          }
            else {
            this.errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại.';
          }
          return of({ devices: []});
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

  checkColumn(){
    this.isRow = !this.isRow; 
    this.isColumn = !this.isColumn; 
  }
  checkRow(){
    this.isRow = !this.isRow; 
    this.isColumn = !this.isColumn; 
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onConditionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.condition = selectElement.value;
    this.callApiWithCondition(this.condition);
    let currentUrl = this.router.url;
    const urlParams = new URLSearchParams(currentUrl.split('?')[1]);
    urlParams.set('condition', this.condition);
    const newUrl = `${currentUrl.split('?')[0]}?${urlParams.toString()}`;
    this.router.navigateByUrl(newUrl);
  }

  callApiWithCondition(condition: string) {
    const currentUrl = this.router.url;
    const urlParams = new URLSearchParams(currentUrl.split('?')[1]);
    const queryParams = {
      keyword: urlParams.get('keyword') || '', 
      page: Number(urlParams.get('page')) || 1, 
      city : urlParams.get('city') || '',
      brand : urlParams.get('brand') || '',
      condition: this.condition, 
    };
  
    this.apiService.searchData(queryParams).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.data = response.devices;
        this.totalItems = response.count;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.isNull = response.count === 0;
      },
      (error) => {
        console.error('Error:', error);
        this.isLoading = false; // Đảm bảo isLoading được cập nhật
      }
    );
  }
    // Cập nhật giá trị min khi người dùng tương tác
    updateMinValue() {
      if (this.minValuePrice > this.maxValuePrice) {
        this.minValuePrice = this.maxValuePrice;
      }
    }
  
    // Cập nhật giá trị max khi người dùng tương tác
    updateMaxValue() {
      if (this.maxValuePrice < this.minValuePrice) {
        this.maxValuePrice = this.minValuePrice;
      }
    }
  
    // Cập nhật style cho thanh trượt
    get trackStyle() {
      const minPercentPrice = ((this.minValuePrice - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
      const maxPercentPrice = ((this.maxValuePrice - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
      return `background: linear-gradient(to right, #ffc900 ${minPercentPrice}%, #ffc900 ${minPercentPrice}%, #ffc900 ${maxPercentPrice}%, #ffc900 ${maxPercentPrice}%);`;
    }

      // Cập nhật giá trị min khi người dùng tương tác
      updateMinValueYear() {
        if (this.minValueYear > this.maxValueYear) {
          this.minValueYear = this.maxValueYear;
        }
      }
    
      // Cập nhật giá trị max khi người dùng tương tác
      updateMaxValueYear() {
        if (this.maxValueYear < this.minValueYear) {
          this.maxValueYear = this.minValueYear;
        }
      }
    
      // Cập nhật style cho thanh trượt
      get trackStyleYear() {
        const minPercentYear = ((this.minValuePrice - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
        const maxPercentYear = ((this.maxValuePrice - this.minPrice) / (this.maxPrice - this.minPrice)) * 100;
        return `background: linear-gradient(to right, #ffc900 ${minPercentYear}%, #ffc900 ${minPercentYear}%, #ffc900 ${maxPercentYear}%, #ffc900 ${maxPercentYear}%);`;
      }
      onCheckboxChange(event: Event, brand: string) {
        const isChecked = (event.target as HTMLInputElement).checked;
    
        if (isChecked) {
          this.selectedBrand = brand; 
        } else {
          this.selectedBrand = '';
        }
        this.callApiWithBrand(this.selectedBrand)
        let currentUrl = this.router.url;
        const urlParams = new URLSearchParams(currentUrl.split('?')[1]);
        urlParams.set('brand', this.selectedBrand);
        const newUrl = `${currentUrl.split('?')[0]}?${urlParams.toString()}`;
        this.router.navigateByUrl(newUrl);
      }
      callApiWithBrand(brand: string){
        const currentUrl = this.router.url;
        const urlParams = new URLSearchParams(currentUrl.split('?')[1]);
        const queryParams = {
          keyword: urlParams.get('keyword') || '', 
          page: Number(urlParams.get('page')) || 1, 
          condition: urlParams.get('condition') || '', 
          city : urlParams.get('city') || '',
          brand : this.selectedBrand
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
