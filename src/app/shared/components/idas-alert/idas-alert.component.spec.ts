import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasAlertComponent } from './idas-alert.component';

describe('IdasAlertComponent', () => {
  let component: IdasAlertComponent;
  let fixture: ComponentFixture<IdasAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasAlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
