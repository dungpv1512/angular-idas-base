import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IdasInputComponent, IdasSelectComponent, IdasRadioComponent, IdasCheckboxComponent, IdasDatepickerComponent, IdasTextareaComponent } from '@app/shared/components';
import { SelectOption, RadioOption, CheckboxOption } from '@app/shared/components/types';
import { I18N_DEMO } from '@app/shared/constants';

@Component({
  selector: 'app-form-complete-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCardModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule,
    IdasInputComponent,
    IdasSelectComponent,
    IdasRadioComponent,
    IdasCheckboxComponent,
    IdasDatepickerComponent,
    IdasTextareaComponent
  ],
  templateUrl: './form-complete-demo.component.html',
  styleUrl: './form-complete-demo.component.less'
})
export class FormCompleteDemoComponent {
  private readonly fb = inject(FormBuilder);
  private readonly message = inject(NzMessageService);
  private readonly translate = inject(TranslateService);

  demoForm: FormGroup;

  departmentOptions: SelectOption[] = [
    { label: 'IT', value: 'it' },
    { label: 'HR', value: 'hr' }
  ];

  genderOptions: RadioOption[] = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' }
  ];

  interestOptions: CheckboxOption[] = [
    { label: 'Đọc sách', value: 'reading' },
    { label: 'Du lịch', value: 'travel' }
  ];

  constructor() {
    this.demoForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: [null, Validators.required],
      gender: ['male'],
      interests: [[]],
      birthDate: [null],
      bio: ['']
    });
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      this.message.success(this.translate.instant(I18N_DEMO.FORM_SUBMITTED));
      console.log(this.demoForm.value);
    }
  }

  onReset(): void {
    this.demoForm.reset({ gender: 'male' });
  }

  fillSample(): void {
    this.demoForm.patchValue({
      username: 'johndoe',
      email: 'john@example.com',
      department: 'it',
      gender: 'male',
      interests: ['reading'],
      birthDate: new Date('1990-01-01'),
      bio: 'Sample bio'
    });
  }
}
