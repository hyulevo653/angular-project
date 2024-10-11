import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../shared/interceptors/app.interceptor';
import { AuthGuard } from '../../services/auth.guard';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ApiService,
    AuthGuard
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {
  lstUser : any;
  errorMessage: string = '';
  constructor(
    private readonly apiService: ApiService
  ){

  }

  ngOnInit(){
    this.callApi();
  }

  callApi() {
    this.apiService.getListUser().subscribe({
      next: (response: any) => {
       this.lstUser = response
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 500) {
          this.errorMessage = 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.';
        } else if (error.status === 401) {
          this.errorMessage = 'Tài khoản hoặc mật khẩu không chính xác';
        } else {
          this.errorMessage = 'Đã xảy ra lỗi. Vui lòng thử lại.';
        }
      }
    });
  }
}
