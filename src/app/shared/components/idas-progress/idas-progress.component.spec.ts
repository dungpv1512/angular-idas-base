import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasProgressComponent } from './idas-progress.component';

describe('IdasProgressComponent', () => {
  let component: IdasProgressComponent;
  let fixture: ComponentFixture<IdasProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasProgressComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
