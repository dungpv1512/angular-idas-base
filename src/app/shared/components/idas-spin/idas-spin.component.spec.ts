import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasSpinComponent } from './idas-spin.component';

describe('IdasSpinComponent', () => {
  let component: IdasSpinComponent;
  let fixture: ComponentFixture<IdasSpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasSpinComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
