import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasCommentComponent } from './idas-comment.component';

describe('IdasCommentComponent', () => {
  let component: IdasCommentComponent;
  let fixture: ComponentFixture<IdasCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasCommentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
