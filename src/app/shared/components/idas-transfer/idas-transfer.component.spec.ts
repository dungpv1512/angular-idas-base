import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTransferComponent } from './idas-transfer.component';

describe('IdasTransferComponent', () => {
  let component: IdasTransferComponent;
  let fixture: ComponentFixture<IdasTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTransferComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
