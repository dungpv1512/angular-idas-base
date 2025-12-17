import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasSwitchComponent } from './idas-switch.component';

describe('IdasSwitchComponent', () => {
  let component: IdasSwitchComponent;
  let fixture: ComponentFixture<IdasSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasSwitchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
