import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasCollapseComponent } from './idas-collapse.component';

describe('IdasCollapseComponent', () => {
  let component: IdasCollapseComponent;
  let fixture: ComponentFixture<IdasCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasCollapseComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
