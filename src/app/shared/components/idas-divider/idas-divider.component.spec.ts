import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasDividerComponent } from './idas-divider.component';

describe('IdasDividerComponent', () => {
  let component: IdasDividerComponent;
  let fixture: ComponentFixture<IdasDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasDividerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
