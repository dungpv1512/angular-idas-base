import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasQrCodeComponent } from './idas-qr-code.component';

describe('IdasQrCodeComponent', () => {
  let component: IdasQrCodeComponent;
  let fixture: ComponentFixture<IdasQrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasQrCodeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
