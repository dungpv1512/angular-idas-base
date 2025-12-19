import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IdasResultComponent } from './idas-result.component';

/**
 * Test host component để test với TemplateRef
 */
@Component({
  standalone: true,
  imports: [IdasResultComponent],
  template: `
    <app-idas-result
      [status]="status"
      [title]="title"
      [subTitle]="subTitle"
      [extra]="extraTpl">
      <div class="custom-content">Custom Content</div>
    </app-idas-result>

    <ng-template #extraTpl>
      <button class="extra-button">Action</button>
    </ng-template>
  `
})
class TestHostComponent {
  status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500' = 'info';
  title: string = 'Test Title';
  subTitle: string = 'Test SubTitle';
  @ViewChild('extraTpl') extraTpl!: TemplateRef<void>;
}

describe('IdasResultComponent', () => {
  let component: IdasResultComponent;
  let fixture: ComponentFixture<IdasResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasResultComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default status as info', () => {
    expect(component.status).toBe('info');
  });

  it('should have empty title by default', () => {
    expect(component.title).toBe('');
  });

  it('should have empty subTitle by default', () => {
    expect(component.subTitle).toBe('');
  });

  it('should have null icon by default', () => {
    expect(component.icon).toBeNull();
  });

  it('should have null extra by default', () => {
    expect(component.extra).toBeNull();
  });

  it('should render nz-result element', () => {
    const nzResult = fixture.debugElement.query(By.css('nz-result'));
    expect(nzResult).toBeTruthy();
  });
});

describe('IdasResultComponent with TestHost', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should display title', () => {
    const compiled = hostFixture.nativeElement;
    expect(compiled.textContent).toContain('Test Title');
  });

  it('should display subTitle', () => {
    const compiled = hostFixture.nativeElement;
    expect(compiled.textContent).toContain('Test SubTitle');
  });

  it('should project custom content', () => {
    const customContent = hostFixture.debugElement.query(By.css('.custom-content'));
    expect(customContent).toBeTruthy();
    expect(customContent.nativeElement.textContent).toBe('Custom Content');
  });

  it('should change status', () => {
    hostComponent.status = 'success';
    hostFixture.detectChanges();
    
    const resultComponent = hostFixture.debugElement.query(By.directive(IdasResultComponent));
    expect(resultComponent.componentInstance.status).toBe('success');
  });

  it('should render extra template', () => {
    const extraButton = hostFixture.debugElement.query(By.css('.extra-button'));
    expect(extraButton).toBeTruthy();
  });
});
