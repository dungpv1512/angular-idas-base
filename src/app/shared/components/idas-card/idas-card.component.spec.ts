import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasCardComponent } from './idas-card.component';

describe('IdasCardComponent', () => {
  let component: IdasCardComponent;
  let fixture: ComponentFixture<IdasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
