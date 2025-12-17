import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTimelineComponent } from './idas-timeline.component';

describe('IdasTimelineComponent', () => {
  let component: IdasTimelineComponent;
  let fixture: ComponentFixture<IdasTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTimelineComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
