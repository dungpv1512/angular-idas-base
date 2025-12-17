import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasCalendarComponent } from './idas-calendar.component';

describe('IdasCalendarComponent', () => {
  let component: IdasCalendarComponent;
  let fixture: ComponentFixture<IdasCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasCalendarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
