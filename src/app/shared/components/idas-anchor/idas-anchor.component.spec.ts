import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasAnchorComponent } from './idas-anchor.component';

describe('IdasAnchorComponent', () => {
  let component: IdasAnchorComponent;
  let fixture: ComponentFixture<IdasAnchorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasAnchorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
