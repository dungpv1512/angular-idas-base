import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ResultDemoComponent } from './result-demo.component';

describe('ResultDemoComponent', () => {
  let component: ResultDemoComponent;
  let fixture: ComponentFixture<ResultDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultDemoComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 status types', () => {
    expect(component.statusList.length).toBe(7);
  });

  it('should include all expected statuses', () => {
    expect(component.statusList).toContain('success');
    expect(component.statusList).toContain('error');
    expect(component.statusList).toContain('info');
    expect(component.statusList).toContain('warning');
    expect(component.statusList).toContain('403');
    expect(component.statusList).toContain('404');
    expect(component.statusList).toContain('500');
  });
});
