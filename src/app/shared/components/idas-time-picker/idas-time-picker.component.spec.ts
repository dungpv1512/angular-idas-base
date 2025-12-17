import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTimePickerComponent } from './idas-time-picker.component';

describe('IdasTimePickerComponent', () => {
  let component: IdasTimePickerComponent;
  let fixture: ComponentFixture<IdasTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTimePickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
