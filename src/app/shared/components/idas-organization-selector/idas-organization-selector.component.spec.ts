import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchOutline, CloseCircleFill, LoadingOutline } from '@ant-design/icons-angular/icons';

import { IdasOrganizationSelectorComponent, OrganizationSelectorFilter } from './idas-organization-selector.component';
import { OrganizationData } from '../idas-organization-view/idas-organization-view.component';

describe('IdasOrganizationSelectorComponent', () => {
  let component: IdasOrganizationSelectorComponent;
  let fixture: ComponentFixture<IdasOrganizationSelectorComponent>;

  // Mock data
  const mockOrganizations: OrganizationData[] = [
    {
      Id: 1,
      MaToChuc: 'TC001',
      TenToChuc: 'Công ty ABC',
      Loai: 1,
      TrangThai: 2,
      TinhTrang: 1,
      IdToChucCapTren: null,
      children: [
        {
          Id: 2,
          MaToChuc: 'TC002',
          TenToChuc: 'Phòng Kỹ thuật',
          Loai: 2,
          TrangThai: 2,
          TinhTrang: 1,
          IdToChucCapTren: 1,
          children: []
        },
        {
          Id: 3,
          MaToChuc: 'TC003',
          TenToChuc: 'Phòng Nhân sự',
          Loai: 2,
          TrangThai: 1,
          TinhTrang: 1,
          IdToChucCapTren: 1,
          children: []
        }
      ]
    },
    {
      Id: 4,
      MaToChuc: 'TC004',
      TenToChuc: 'Chi nhánh XYZ',
      Loai: 1,
      TrangThai: 2,
      TinhTrang: 2,
      IdToChucCapTren: null,
      children: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IdasOrganizationSelectorComponent,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        NzIconModule.forRoot([SearchOutline, CloseCircleFill, LoadingOutline])
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasOrganizationSelectorComponent);
    component = fixture.componentInstance;
    component.data = mockOrganizations;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should have default values', () => {
      expect(component.label).toBe('');
      expect(component.placeholder).toBe('');
      expect(component.multiple).toBeFalse();
      expect(component.required).toBeFalse();
      expect(component.disabled).toBeFalse();
      expect(component.showClear).toBeTrue();
      expect(component.loading).toBeFalse();
    });

    it('should accept input properties', () => {
      component.label = 'Chọn tổ chức';
      component.placeholder = 'Vui lòng chọn';
      component.multiple = true;
      component.required = true;
      fixture.detectChanges();

      expect(component.label).toBe('Chọn tổ chức');
      expect(component.placeholder).toBe('Vui lòng chọn');
      expect(component.multiple).toBeTrue();
      expect(component.required).toBeTrue();
    });
  });

  describe('Modal Operations', () => {
    it('should open modal when openModal is called', () => {
      expect(component.modalVisible()).toBeFalse();
      component.openModal();
      expect(component.modalVisible()).toBeTrue();
    });

    it('should not open modal when disabled', () => {
      component.disabled = true;
      component.openModal();
      expect(component.modalVisible()).toBeFalse();
    });

    it('should close modal when closeModal is called', () => {
      component.openModal();
      expect(component.modalVisible()).toBeTrue();
      component.closeModal();
      expect(component.modalVisible()).toBeFalse();
    });

    it('should reset search text when closing modal', () => {
      component.openModal();
      component.onSearchChange('test');
      expect(component.searchText()).toBe('test');
      component.closeModal();
      expect(component.searchText()).toBe('');
    });
  });

  describe('Single Selection Mode', () => {
    beforeEach(() => {
      component.multiple = false;
    });

    it('should select single organization', () => {
      component.openModal();
      const org = mockOrganizations[0];
      component.onOrganizationSelect(org);
      
      expect(component.tempSelectedIds()).toEqual([org.Id]);
      expect(component.tempSelectedRecords()).toEqual([org]);
    });

    it('should replace selection when selecting another organization', () => {
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.onOrganizationSelect(mockOrganizations[1]);
      
      expect(component.tempSelectedIds()).toEqual([mockOrganizations[1].Id]);
    });

    it('should emit onSelect with single organization on confirm', () => {
      spyOn(component.onSelect, 'emit');
      
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.confirmSelection();
      
      expect(component.onSelect.emit).toHaveBeenCalledWith(mockOrganizations[0]);
    });

    it('should display selected organization name', () => {
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.confirmSelection();
      
      expect(component.displayText()).toBe(mockOrganizations[0].TenToChuc);
    });
  });

  describe('Multiple Selection Mode', () => {
    beforeEach(() => {
      component.multiple = true;
    });

    it('should allow selecting multiple organizations', () => {
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.onOrganizationSelect(mockOrganizations[1]);
      
      expect(component.tempSelectedIds().length).toBe(2);
      expect(component.tempSelectedIds()).toContain(mockOrganizations[0].Id);
      expect(component.tempSelectedIds()).toContain(mockOrganizations[1].Id);
    });

    it('should toggle selection when clicking same organization', () => {
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      expect(component.tempSelectedIds()).toContain(mockOrganizations[0].Id);
      
      component.onOrganizationSelect(mockOrganizations[0]);
      expect(component.tempSelectedIds()).not.toContain(mockOrganizations[0].Id);
    });

    it('should emit onSelect with array on confirm', () => {
      spyOn(component.onSelect, 'emit');
      
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.onOrganizationSelect(mockOrganizations[1]);
      component.confirmSelection();
      
      expect(component.onSelect.emit).toHaveBeenCalledWith([mockOrganizations[0], mockOrganizations[1]]);
    });

    it('should display comma-separated names', () => {
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.onOrganizationSelect(mockOrganizations[1]);
      component.confirmSelection();
      
      expect(component.displayText()).toContain(mockOrganizations[0].TenToChuc);
      expect(component.displayText()).toContain(mockOrganizations[1].TenToChuc);
    });

    it('should remove item when removeItem is called', () => {
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.onOrganizationSelect(mockOrganizations[1]);
      component.confirmSelection();
      
      expect(component.selectedRecords().length).toBe(2);
      
      component.removeItem(mockOrganizations[0]);
      
      expect(component.selectedRecords().length).toBe(1);
      expect(component.selectedRecords()[0].Id).toBe(mockOrganizations[1].Id);
    });
  });

  describe('Search Functionality', () => {
    it('should filter data by search text', () => {
      component.onSearchChange('Kỹ thuật');
      
      const filtered = component.filteredData();
      // Tìm trong children
      const hasKyThuat = filtered.some(org => 
        org.TenToChuc.includes('Kỹ thuật') ||
        (org.children && org.children.some(child => child.TenToChuc.includes('Kỹ thuật')))
      );
      expect(hasKyThuat).toBeTrue();
    });

    it('should filter by MaToChuc', () => {
      component.onSearchChange('TC002');
      
      const filtered = component.filteredData();
      const hasTC002 = filtered.some(org => 
        org.MaToChuc === 'TC002' ||
        (org.children && org.children.some(child => child.MaToChuc === 'TC002'))
      );
      expect(hasTC002).toBeTrue();
    });

    it('should be case-insensitive', () => {
      component.onSearchChange('CÔNG TY');
      
      const filtered = component.filteredData();
      expect(filtered.length).toBeGreaterThan(0);
    });

    it('should return all data when search is empty', () => {
      component.onSearchChange('');
      
      const filtered = component.filteredData();
      expect(filtered.length).toBe(mockOrganizations.length);
    });
  });

  describe('Filter Functionality', () => {
    it('should filter by loai', () => {
      const filter: OrganizationSelectorFilter = { loai: 1 };
      component.filter = filter;
      fixture.detectChanges();
      
      const filtered = component.filteredData();
      // Chỉ có tổ chức loại 1
      filtered.forEach(org => {
        expect(org.Loai).toBe(1);
      });
    });

    it('should filter by trangThai', () => {
      const filter: OrganizationSelectorFilter = { trangThai: 2 };
      component.filter = filter;
      fixture.detectChanges();
      
      const filtered = component.filteredData();
      filtered.forEach(org => {
        expect(org.TrangThai).toBe(2);
      });
    });

    it('should exclude specific IDs', () => {
      const filter: OrganizationSelectorFilter = { excludeIds: [1, 4] };
      component.filter = filter;
      fixture.detectChanges();
      
      const filtered = component.filteredData();
      filtered.forEach(org => {
        expect(org.Id).not.toBe(1);
        expect(org.Id).not.toBe(4);
      });
    });
  });

  describe('Clear Selection', () => {
    it('should clear selection in single mode', () => {
      component.multiple = false;
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.confirmSelection();
      
      expect(component.selectedRecords().length).toBe(1);
      
      component.clearSelection();
      
      expect(component.selectedRecords().length).toBe(0);
      expect(component.displayText()).toBe('');
    });

    it('should clear selection in multiple mode', () => {
      component.multiple = true;
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.onOrganizationSelect(mockOrganizations[1]);
      component.confirmSelection();
      
      expect(component.selectedRecords().length).toBe(2);
      
      component.clearSelection();
      
      expect(component.selectedRecords().length).toBe(0);
    });

    it('should emit onClear event', () => {
      spyOn(component.onClear, 'emit');
      
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.confirmSelection();
      component.clearSelection();
      
      expect(component.onClear.emit).toHaveBeenCalled();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value in single mode', () => {
      component.multiple = false;
      component.writeValue(1);
      
      expect(component.selectedRecords().length).toBe(1);
      expect(component.selectedRecords()[0].Id).toBe(1);
    });

    it('should write value in multiple mode', () => {
      component.multiple = true;
      component.writeValue([1, 4]);
      
      expect(component.selectedRecords().length).toBe(2);
    });

    it('should handle null value', () => {
      component.writeValue(null);
      expect(component.selectedRecords().length).toBe(0);
    });

    it('should call onChange when selection changes', () => {
      const onChangeSpy = jasmine.createSpy('onChange');
      component.registerOnChange(onChangeSpy);
      
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.confirmSelection();
      
      expect(onChangeSpy).toHaveBeenCalledWith(mockOrganizations[0].Id);
    });

    it('should call onTouched when selection changes', () => {
      const onTouchedSpy = jasmine.createSpy('onTouched');
      component.registerOnTouched(onTouchedSpy);
      
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      component.confirmSelection();
      
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBeTrue();
      
      component.setDisabledState(false);
      expect(component.disabled).toBeFalse();
    });
  });

  describe('isSelected', () => {
    it('should return true for selected organization', () => {
      component.openModal();
      component.onOrganizationSelect(mockOrganizations[0]);
      
      expect(component.isSelected(mockOrganizations[0])).toBeTrue();
    });

    it('should return false for unselected organization', () => {
      component.openModal();
      
      expect(component.isSelected(mockOrganizations[0])).toBeFalse();
    });
  });

  describe('Pre-selection', () => {
    it('should pre-select organization by selectedId input', () => {
      component.selectedId = 1;
      component.ngOnChanges({
        selectedId: {
          currentValue: 1,
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true
        }
      });
      
      expect(component.selectedRecords().length).toBe(1);
      expect(component.selectedRecords()[0].Id).toBe(1);
    });

    it('should copy current selection to temp when opening modal', () => {
      component.writeValue(1);
      component.openModal();
      
      expect(component.tempSelectedIds()).toContain(1);
    });
  });

  describe('Nested Organization Search', () => {
    it('should find nested organizations', () => {
      component.onSearchChange('Phòng');
      
      const filtered = component.filteredData();
      // Phải tìm thấy parent có children match
      expect(filtered.length).toBeGreaterThan(0);
    });
  });
});
