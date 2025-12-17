import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasSliderComponent } from './idas-slider.component';

describe('IdasSliderComponent', () => {
  let component: IdasSliderComponent;
  let fixture: ComponentFixture<IdasSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasSliderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
