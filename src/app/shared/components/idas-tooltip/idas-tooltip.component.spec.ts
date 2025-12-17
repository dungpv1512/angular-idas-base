import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTooltipComponent } from './idas-tooltip.component';

describe('IdasTooltipComponent', () => {
  let component: IdasTooltipComponent;
  let fixture: ComponentFixture<IdasTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTooltipComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
