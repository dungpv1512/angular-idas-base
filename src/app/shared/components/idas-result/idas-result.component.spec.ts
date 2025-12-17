import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasResultComponent } from './idas-result.component';

describe('IdasResultComponent', () => {
  let component: IdasResultComponent;
  let fixture: ComponentFixture<IdasResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasResultComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
