import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTypographyComponent } from './idas-typography.component';

describe('IdasTypographyComponent', () => {
  let component: IdasTypographyComponent;
  let fixture: ComponentFixture<IdasTypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTypographyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
