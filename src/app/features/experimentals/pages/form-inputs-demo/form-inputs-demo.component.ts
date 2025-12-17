import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IdasInputComponent, IdasTextareaComponent, IdasSelectComponent } from '@app/shared/components';
import { SelectOption } from '@app/shared/components/types';

/**
 * Form Inputs Demo - Demo các input components
 */
@Component({
  selector: 'app-form-inputs-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzCardModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzTagModule,
    IdasInputComponent,
    IdasTextareaComponent,
    IdasSelectComponent
  ],
  templateUrl: './form-inputs-demo.component.html',
  styleUrl: './form-inputs-demo.component.less'
})
export class FormInputsDemoComponent {
  private readonly fb = inject(FormBuilder);

  demoForm: FormGroup;

  departmentOptions: SelectOption[] = [
    { label: 'IT', value: 'it' },
    { label: 'HR', value: 'hr' },
    { label: 'Sales', value: 'sales' },
    { label: 'Marketing', value: 'marketing' }
  ];

  skillOptions: SelectOption[] = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Node.js', value: 'nodejs' }
  ];

  constructor() {
    this.demoForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bio: [''],
      department: [null, Validators.required],
      skills: [[]]
    });
  }
}
