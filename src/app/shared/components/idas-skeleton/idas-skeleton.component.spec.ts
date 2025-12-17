import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasSkeletonComponent } from './idas-skeleton.component';

describe('IdasSkeletonComponent', () => {
  let component: IdasSkeletonComponent;
  let fixture: ComponentFixture<IdasSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasSkeletonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
