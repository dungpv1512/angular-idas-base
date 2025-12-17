import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasDescriptionsComponent } from './idas-descriptions.component';

describe('IdasDescriptionsComponent', () => {
  let component: IdasDescriptionsComponent;
  let fixture: ComponentFixture<IdasDescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasDescriptionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasDescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
