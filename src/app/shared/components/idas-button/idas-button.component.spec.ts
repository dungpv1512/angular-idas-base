import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasButtonComponent } from './idas-button.component';

describe('IdasButtonComponent', () => {
  let component: IdasButtonComponent;
  let fixture: ComponentFixture<IdasButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
