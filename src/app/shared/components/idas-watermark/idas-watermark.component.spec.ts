import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasWatermarkComponent } from './idas-watermark.component';

describe('IdasWatermarkComponent', () => {
  let component: IdasWatermarkComponent;
  let fixture: ComponentFixture<IdasWatermarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasWatermarkComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasWatermarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
