import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { SlickComponent } from "../slick/slick.component";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ApiResponse {
  devices: any[]; 
}


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
      CommonModule,
      FooterComponent,
      HeaderComponent,
      SlickComponent,
      SlickCarouselModule,
      HttpClientModule,
  ],
  providers: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})


export class SearchComponent {
  data : any;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalItems: number = 0;
  minValue: number = 500000000; 
  minYear: number = 1984;
  isLoading: boolean = false;

  public inputText : string = '';
  
  constructor(
    // private readonly searchService : SearchService
    private http: HttpClient
  ){}

  ngOnInit() {
    this.data = [
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
      {
        img : "assets/images/anh_product.png",
        name : " 2021 Spider 15.75 Pro Platform Basket Spider Lift",
        khuvuc : "Hà Nội",
        namsx : "2020",
        tinhtrang : "Đã Qua Sử Dụng",
        tgbangiao : "Sẵn Sàng",
        price : 900000,
        brand_name : "Hitachi",
      },
     
    ]
  }

  onSearch() {
    this.isLoading = true; // Bắt đầu loading
    const apiUrl = `http://localhost:3000/api/keyword-search/${this.inputText}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.data = response.devices; // Nhận dữ liệu thiết bị
        this.totalItems = response.count; // Nhận tổng số bản ghi
      },
      (error) => {
        console.error('Error:', error);
      },
      () => {
        this.isLoading = false; // Kết thúc loading
      }
    );
  }

  changeText(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.inputText = inputElement.value; 
    console.log(this.inputText)
  }

  updateValue(event: Event) {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      this.minValue = +inputElement.value;
    }
  }
  updateYear(event: Event) {
    const inputElement = event.target as HTMLInputElement | null;
    if(inputElement){
      this.minYear = +inputElement.value
    }
  }
  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
