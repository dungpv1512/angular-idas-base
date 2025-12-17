import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasModalComponent } from './idas-modal.component';

describe('IdasModalComponent', () => {
  let component: IdasModalComponent;
  let fixture: ComponentFixture<IdasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
