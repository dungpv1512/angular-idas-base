import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasListComponent } from './idas-list.component';

describe('IdasListComponent', () => {
  let component: IdasListComponent;
  let fixture: ComponentFixture<IdasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
