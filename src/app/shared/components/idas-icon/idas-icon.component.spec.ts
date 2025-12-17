import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasIconComponent } from './idas-icon.component';

describe('IdasIconComponent', () => {
  let component: IdasIconComponent;
  let fixture: ComponentFixture<IdasIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasIconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
