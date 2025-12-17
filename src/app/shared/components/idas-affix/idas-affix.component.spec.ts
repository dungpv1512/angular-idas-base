import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasAffixComponent } from './idas-affix.component';

describe('IdasAffixComponent', () => {
  let component: IdasAffixComponent;
  let fixture: ComponentFixture<IdasAffixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasAffixComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasAffixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
