import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasCascaderComponent } from './idas-cascader.component';

describe('IdasCascaderComponent', () => {
  let component: IdasCascaderComponent;
  let fixture: ComponentFixture<IdasCascaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasCascaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasCascaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
