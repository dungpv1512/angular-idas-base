import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTreeComponent } from './idas-tree.component';

describe('IdasTreeComponent', () => {
  let component: IdasTreeComponent;
  let fixture: ComponentFixture<IdasTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTreeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
