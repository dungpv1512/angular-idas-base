import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasSearchComponent } from './idas-search.component';

describe('IdasSearchComponent', () => {
  let component: IdasSearchComponent;
  let fixture: ComponentFixture<IdasSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasSearchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
