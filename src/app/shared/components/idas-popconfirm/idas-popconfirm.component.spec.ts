import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasPopconfirmComponent } from './idas-popconfirm.component';

describe('IdasPopconfirmComponent', () => {
  let component: IdasPopconfirmComponent;
  let fixture: ComponentFixture<IdasPopconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasPopconfirmComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasPopconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
