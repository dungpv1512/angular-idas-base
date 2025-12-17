import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasLayoutComponent } from './idas-layout.component';

describe('IdasLayoutComponent', () => {
  let component: IdasLayoutComponent;
  let fixture: ComponentFixture<IdasLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasLayoutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
