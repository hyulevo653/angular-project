import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  imagePath: string = 'assets/images/Layer_1.png';

  constructor(
    private router: Router
  ){

  }

  logout(){
    localStorage.removeItem("accessToken");
    console.log("đã xóa accesstoken")
    this.router.navigate(['/login'])
  }
}
