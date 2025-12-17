import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTableComponent } from './idas-table.component';

describe('IdasTableComponent', () => {
  let component: IdasTableComponent;
  let fixture: ComponentFixture<IdasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
