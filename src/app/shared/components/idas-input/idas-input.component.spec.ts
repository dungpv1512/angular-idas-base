import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasInputComponent } from './idas-input.component';

describe('IdasInputComponent', () => {
  let component: IdasInputComponent;
  let fixture: ComponentFixture<IdasInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
