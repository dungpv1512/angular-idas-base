import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasRadioComponent } from './idas-radio.component';

describe('IdasRadioComponent', () => {
  let component: IdasRadioComponent;
  let fixture: ComponentFixture<IdasRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasRadioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
