import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasBackTopComponent } from './idas-back-top.component';

describe('IdasBackTopComponent', () => {
  let component: IdasBackTopComponent;
  let fixture: ComponentFixture<IdasBackTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasBackTopComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasBackTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
