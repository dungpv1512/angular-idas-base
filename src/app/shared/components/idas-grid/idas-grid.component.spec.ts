import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasGridComponent } from './idas-grid.component';

describe('IdasGridComponent', () => {
  let component: IdasGridComponent;
  let fixture: ComponentFixture<IdasGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
