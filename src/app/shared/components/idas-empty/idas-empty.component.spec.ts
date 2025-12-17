import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasEmptyComponent } from './idas-empty.component';

describe('IdasEmptyComponent', () => {
  let component: IdasEmptyComponent;
  let fixture: ComponentFixture<IdasEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasEmptyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
