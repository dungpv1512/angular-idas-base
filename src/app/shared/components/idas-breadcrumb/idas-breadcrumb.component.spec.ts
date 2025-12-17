import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasBreadcrumbComponent } from './idas-breadcrumb.component';

describe('IdasBreadcrumbComponent', () => {
  let component: IdasBreadcrumbComponent;
  let fixture: ComponentFixture<IdasBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasBreadcrumbComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
