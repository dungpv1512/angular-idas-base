import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasDrawerComponent } from './idas-drawer.component';

describe('IdasDrawerComponent', () => {
  let component: IdasDrawerComponent;
  let fixture: ComponentFixture<IdasDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasDrawerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
