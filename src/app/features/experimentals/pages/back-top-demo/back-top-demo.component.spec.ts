import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackTopDemoComponent } from './back-top-demo.component';

describe('BackTopDemoComponent', () => {
  let component: BackTopDemoComponent;
  let fixture: ComponentFixture<BackTopDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackTopDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BackTopDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
