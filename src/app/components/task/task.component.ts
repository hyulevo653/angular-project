import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  myForm: FormGroup;
  images: string[] = [
    'https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-1-png-image_2158836.jpg',
    'https://png.pngtree.com/png-clipart/20200309/ourlarge/pngtree-gold-number-2-png-image_2158838.jpg',
    'https://png.pngtree.com/png-clipart/20200401/original/pngtree-gold-number-3-png-image_5330868.jpg',
    'https://png.pngtree.com/png-clipart/20200309/ourmid/pngtree-gold-number-4-png-image_2158842.jpg'
  ];
  phoneNumber: string = '0123456789';
  emailAddress: string = 'wtfclgtdm@gmail.com';

  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  private inputMap: Record<string, ElementRef> = {};
  imageUrl = 'assets/images/anh_product.png';
  imageUrlXoa: string | null = 'assets/images/anh_2.png';
  isPreviewOpen = false;
  previewImageUrl: string | null = null;
  @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5, otp6, otp7')
  otpInputs!: QueryList<ElementRef>;
  isLoading = true;
  draggedIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(50),
          Validators.email,
        ],
      ],
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.inputMap = {
      username: this.usernameInput,
      email: this.emailInput,
    };
  }

  loadData() {
    // this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  openPreview(imageUrl: string) {
    this.previewImageUrl = imageUrl;
    this.isPreviewOpen = true;
    console.log('1');
  }

  closePreview() {
    this.isPreviewOpen = false;
    this.previewImageUrl = null;
  }

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', this.imageUrl);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const imageUrl = event.dataTransfer?.getData('text/plain');
    if (imageUrl) {
      alert(`Ảnh đã được thả thành công:', ${imageUrl}`);
    }
  }

  onDropRestricted(event: DragEvent) {
    event.preventDefault();
    alert('Khu vực này không cho phép thả ảnh!');
  }

  removeImage() {
    this.imageUrlXoa = null;
    console.log('Ảnh đã bị xóa');
  }
  onSubmit() {
    if (this.myForm.valid) {
      alert('submit thành công');
    } else {
      this.focusFirstInvalidControl();
    }
  }

  private focusFirstInvalidControl() {
    const controls = this.myForm.controls;
    for (const controlName in controls) {
      if (controls[controlName].invalid) {
        const inputElement = this.inputMap[controlName];
        if (inputElement) {
          inputElement.nativeElement.focus();
          break;
        }
      }
    }
  }
  onInput(event: any, index: number) {
    const input = event.target;
    let value = input.value;

    if (!/^\d$/.test(value)) {
      input.value = '';
      return;
    }

    if (value.length === 1 && index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }
  onChangeImg(event: DragEvent, index: number): void {
    this.draggedIndex = index; // Lưu trữ vị trí ảnh đang được kéo
  }
  onDropImg(event: DragEvent, dropIndex: number): void {
    event.preventDefault();

    if (this.draggedIndex !== null && this.draggedIndex !== dropIndex) {
      // Thay đổi vị trí của ảnh
      const draggedImage = this.images[this.draggedIndex];
      this.images.splice(this.draggedIndex, 1); // Xóa ảnh đang kéo
      this.images.splice(dropIndex, 0, draggedImage); // Chèn ảnh vào vị trí mới
    }

    this.draggedIndex = null; // Reset vị trí kéo
  }
}
