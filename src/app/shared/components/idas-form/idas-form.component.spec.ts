import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasFormComponent } from './idas-form.component';

describe('IdasFormComponent', () => {
  let component: IdasFormComponent;
  let fixture: ComponentFixture<IdasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
