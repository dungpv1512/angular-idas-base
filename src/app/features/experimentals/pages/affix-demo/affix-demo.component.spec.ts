import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AffixDemoComponent } from './affix-demo.component';

describe('AffixDemoComponent', () => {
  let component: AffixDemoComponent;
  let fixture: ComponentFixture<AffixDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffixDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AffixDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
