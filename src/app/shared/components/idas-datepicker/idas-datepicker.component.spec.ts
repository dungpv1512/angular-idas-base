import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasDatepickerComponent } from './idas-datepicker.component';

describe('IdasDatepickerComponent', () => {
  let component: IdasDatepickerComponent;
  let fixture: ComponentFixture<IdasDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasDatepickerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
