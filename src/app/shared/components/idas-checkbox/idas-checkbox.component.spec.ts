import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasCheckboxComponent } from './idas-checkbox.component';

describe('IdasCheckboxComponent', () => {
  let component: IdasCheckboxComponent;
  let fixture: ComponentFixture<IdasCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasCheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
