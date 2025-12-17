import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasPopoverComponent } from './idas-popover.component';

describe('IdasPopoverComponent', () => {
  let component: IdasPopoverComponent;
  let fixture: ComponentFixture<IdasPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasPopoverComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
