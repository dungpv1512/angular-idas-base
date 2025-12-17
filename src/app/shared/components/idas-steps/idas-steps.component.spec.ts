import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasStepsComponent } from './idas-steps.component';

describe('IdasStepsComponent', () => {
  let component: IdasStepsComponent;
  let fixture: ComponentFixture<IdasStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasStepsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
