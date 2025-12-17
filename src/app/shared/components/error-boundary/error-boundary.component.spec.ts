import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorBoundaryComponent } from './error-boundary.component';
import { ErrorService } from '@core/services/error.service';

describe('ErrorBoundaryComponent', () => {
  let component: ErrorBoundaryComponent;
  let fixture: ComponentFixture<ErrorBoundaryComponent>;
  let errorService: ErrorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorBoundaryComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorBoundaryComponent);
    component = fixture.componentInstance;
    errorService = TestBed.inject(ErrorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show content when no fatal error', () => {
    expect(component.hasFatalError()).toBeFalse();
  });

  it('should show fatal error overlay when fatal error exists', () => {
    errorService.addError({
      message: 'Fatal error',
      severity: 'fatal'
    });

    fixture.detectChanges();
    expect(component.hasFatalError()).toBeTrue();
  });

  it('should dismiss error', () => {
    const errorId = errorService.addError({
      message: 'Test error',
      severity: 'error',
      autoDismiss: false
    });

    expect(errorService.errorCount()).toBe(1);

    errorService.dismissError(errorId);
    expect(errorService.errorCount()).toBe(0);
  });

  it('should dismiss all errors', () => {
    errorService.addError({ message: 'Error 1', autoDismiss: false });
    errorService.addError({ message: 'Error 2', autoDismiss: false });

    expect(errorService.errorCount()).toBe(2);

    component.onDismissAll();
    expect(errorService.errorCount()).toBe(0);
  });

  it('should return correct alert type for severity', () => {
    expect(component.getAlertType('info')).toBe('info');
    expect(component.getAlertType('warning')).toBe('warning');
    expect(component.getAlertType('error')).toBe('error');
    expect(component.getAlertType('fatal')).toBe('error');
  });
});
