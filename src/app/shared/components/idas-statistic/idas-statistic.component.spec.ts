import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasStatisticComponent } from './idas-statistic.component';

describe('IdasStatisticComponent', () => {
  let component: IdasStatisticComponent;
  let fixture: ComponentFixture<IdasStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasStatisticComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
