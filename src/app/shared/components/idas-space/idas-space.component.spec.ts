import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasSpaceComponent } from './idas-space.component';

describe('IdasSpaceComponent', () => {
  let component: IdasSpaceComponent;
  let fixture: ComponentFixture<IdasSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasSpaceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
