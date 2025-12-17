import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasRateComponent } from './idas-rate.component';

describe('IdasRateComponent', () => {
  let component: IdasRateComponent;
  let fixture: ComponentFixture<IdasRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasRateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
