import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTagComponent } from './idas-tag.component';

describe('IdasTagComponent', () => {
  let component: IdasTagComponent;
  let fixture: ComponentFixture<IdasTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTagComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
