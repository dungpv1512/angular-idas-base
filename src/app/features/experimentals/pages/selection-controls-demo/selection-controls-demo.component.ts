import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IdasRadioComponent, IdasCheckboxComponent, IdasSwitchComponent } from '@app/shared/components';
import { RadioOption, CheckboxOption } from '@app/shared/components/types';

/**
 * Selection Controls Demo - Demo radio, checkbox, switch
 */
@Component({
  selector: 'app-selection-controls-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCardModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzTagModule,
    IdasRadioComponent,
    IdasCheckboxComponent,
    IdasSwitchComponent
  ],
  templateUrl: './selection-controls-demo.component.html',
  styleUrl: './selection-controls-demo.component.less'
})
export class SelectionControlsDemoComponent {
  private readonly fb = inject(FormBuilder);

  demoForm: FormGroup;

  genderOptions: RadioOption[] = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
    { label: 'Khác', value: 'other' }
  ];

  statusOptions: RadioOption[] = [
    { label: 'Hoạt động', value: 'active' },
    { label: 'Tạm dừng', value: 'inactive' },
    { label: 'Đã khóa', value: 'locked' }
  ];

  interestOptions: CheckboxOption[] = [
    { label: 'Đọc sách', value: 'reading' },
    { label: 'Du lịch', value: 'travel' },
    { label: 'Thể thao', value: 'sports' },
    { label: 'Âm nhạc', value: 'music' }
  ];

  constructor() {
    this.demoForm = this.fb.group({
      gender: ['male'],
      status: ['active'],
      agree: [false],
      interests: [[]],
      notifications: [true]
    });
  }
}
