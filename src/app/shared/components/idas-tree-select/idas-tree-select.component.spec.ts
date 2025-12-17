import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTreeSelectComponent } from './idas-tree-select.component';

describe('IdasTreeSelectComponent', () => {
  let component: IdasTreeSelectComponent;
  let fixture: ComponentFixture<IdasTreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTreeSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
