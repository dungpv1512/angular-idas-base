import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTagsInputComponent } from './idas-tags-input.component';

describe('IdasTagsInputComponent', () => {
  let component: IdasTagsInputComponent;
  let fixture: ComponentFixture<IdasTagsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTagsInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTagsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
