import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTextareaComponent } from './idas-textarea.component';

describe('IdasTextareaComponent', () => {
  let component: IdasTextareaComponent;
  let fixture: ComponentFixture<IdasTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTextareaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
