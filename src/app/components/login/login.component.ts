import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { LoginService } from '../../services/login.service';
import { ReqLoginModel } from '../../interface/login';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../shared/interceptors/app.interceptor';
import { AuthGuard } from '../../services/auth.guard';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    LoginService,AuthGuard
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public fLogin: FormGroup;
  isLogging = false;
  loginFormSubmitted = false;
  isLoginFailed = false;
  returnUrl = '/';
  resMessageLogin = '';
  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {
    this.fLogin = fb.group({
      phone: [''],

      pass: [''],
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.loginFormSubmitted = true;
    this.isLoginFailed = false;
    const redirectUrl = '/';
  
    if (this.fLogin.invalid) {
      return;
    }
    let currentUrl = this.route.url;
    const urlParams = new URLSearchParams(currentUrl.split('?')[1]); 
    this.returnUrl = urlParams.get('returnUrl') || '/';
  
    const reqLogin = new ReqLoginModel();
    reqLogin.phone = this.fLogin.value.phone;
    reqLogin.pass = this.fLogin.value.pass;
    // reqLogin.pass = Md5.hashStr(this.fLogin.value.password);
  
    this.isLogging = true;
  
    this.loginService
      .login(reqLogin)
      .subscribe({
        next: (response: any) => {
          this.isLogging = false;
          this.isLoginFailed = false;
          this.resMessageLogin = 'Đăng nhập thành công!';
          localStorage.setItem('accessToken', `${response.token}`);
          
          if (this.returnUrl) {
            this.route.navigate([this.returnUrl]);
            console.log(redirectUrl);
          } else {
            this.route.navigate(['/search']);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoginFailed = true;
          this.isLogging = false;
          if (error.status === 500) {
            this.resMessageLogin = 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.';
          } else if (error.status === 401) {
            this.resMessageLogin = 'Tài khoản hoặc mật khẩu không chính xác';
          } else {
            this.resMessageLogin = 'Đã xảy ra lỗi. Vui lòng thử lại.';
          }
        }
      });
  }
  
}
