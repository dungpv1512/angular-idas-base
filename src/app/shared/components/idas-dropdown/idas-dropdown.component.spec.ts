import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasDropdownComponent } from './idas-dropdown.component';

describe('IdasDropdownComponent', () => {
  let component: IdasDropdownComponent;
  let fixture: ComponentFixture<IdasDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasDropdownComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
