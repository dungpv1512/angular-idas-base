import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IdasDatepickerComponent, IdasUploadComponent } from '@app/shared/components';

@Component({
  selector: 'app-date-upload-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzCardModule, IdasDatepickerComponent, IdasUploadComponent],
  templateUrl: './date-upload-demo.component.html',
  styleUrl: './date-upload-demo.component.less'
})
export class DateUploadDemoComponent {
  private readonly fb = inject(FormBuilder);
  demoForm: FormGroup;

  constructor() {
    this.demoForm = this.fb.group({
      birthDate: [null],
      dateRange: [null],
      avatar: [[]]
    });
  }
}
