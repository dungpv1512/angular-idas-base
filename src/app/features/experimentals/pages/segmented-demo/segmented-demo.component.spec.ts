import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegmentedDemoComponent } from './segmented-demo.component';

describe('SegmentedDemoComponent', () => {
  let component: SegmentedDemoComponent;
  let fixture: ComponentFixture<SegmentedDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentedDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
