import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasTabsComponent } from './idas-tabs.component';

describe('IdasTabsComponent', () => {
  let component: IdasTabsComponent;
  let fixture: ComponentFixture<IdasTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasTabsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
