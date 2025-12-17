import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasPageHeaderComponent } from './idas-page-header.component';

describe('IdasPageHeaderComponent', () => {
  let component: IdasPageHeaderComponent;
  let fixture: ComponentFixture<IdasPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasPageHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
