import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasSelectComponent } from './idas-select.component';

describe('IdasSelectComponent', () => {
  let component: IdasSelectComponent;
  let fixture: ComponentFixture<IdasSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
