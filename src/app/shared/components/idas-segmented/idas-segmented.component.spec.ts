import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasSegmentedComponent } from './idas-segmented.component';

describe('IdasSegmentedComponent', () => {
  let component: IdasSegmentedComponent;
  let fixture: ComponentFixture<IdasSegmentedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasSegmentedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasSegmentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onValueChange when option is selected', () => {
    const spy = spyOn(component.onValueChange, 'emit');
    component.options = [
      { value: 'list', label: 'List' },
      { value: 'chart', label: 'Chart' }
    ];
    fixture.detectChanges();

    // Gọi valueChange với giá trị của option thứ 2
    component.valueChange('chart');

    expect(spy).toHaveBeenCalledWith('chart');
  });

  it('should return correct selectedIndex', () => {
    component.options = [
      { value: 'list', label: 'List' },
      { value: 'chart', label: 'Chart' }
    ];
    component.value = 'chart';

    expect(component.selectedIndex).toBe(1);
  });
});
