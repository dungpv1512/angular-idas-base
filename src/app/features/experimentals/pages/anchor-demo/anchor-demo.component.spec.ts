import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnchorDemoComponent } from './anchor-demo.component';

describe('AnchorDemoComponent', () => {
  let component: AnchorDemoComponent;
  let fixture: ComponentFixture<AnchorDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AnchorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
