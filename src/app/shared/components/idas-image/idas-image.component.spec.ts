import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasImageComponent } from './idas-image.component';

describe('IdasImageComponent', () => {
  let component: IdasImageComponent;
  let fixture: ComponentFixture<IdasImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasImageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
