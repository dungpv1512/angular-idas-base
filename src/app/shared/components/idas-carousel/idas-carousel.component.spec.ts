import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasCarouselComponent } from './idas-carousel.component';

describe('IdasCarouselComponent', () => {
  let component: IdasCarouselComponent;
  let fixture: ComponentFixture<IdasCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasCarouselComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
