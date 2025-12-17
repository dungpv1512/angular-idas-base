import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasMenuComponent } from './idas-menu.component';

describe('IdasMenuComponent', () => {
  let component: IdasMenuComponent;
  let fixture: ComponentFixture<IdasMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
