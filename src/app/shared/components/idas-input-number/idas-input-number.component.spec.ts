import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasInputNumberComponent } from './idas-input-number.component';

describe('IdasInputNumberComponent', () => {
  let component: IdasInputNumberComponent;
  let fixture: ComponentFixture<IdasInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasInputNumberComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
