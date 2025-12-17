import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasBadgeComponent } from './idas-badge.component';

describe('IdasBadgeComponent', () => {
  let component: IdasBadgeComponent;
  let fixture: ComponentFixture<IdasBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
