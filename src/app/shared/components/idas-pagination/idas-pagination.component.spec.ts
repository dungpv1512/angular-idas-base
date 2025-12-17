import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasPaginationComponent } from './idas-pagination.component';

describe('IdasPaginationComponent', () => {
  let component: IdasPaginationComponent;
  let fixture: ComponentFixture<IdasPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasPaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
