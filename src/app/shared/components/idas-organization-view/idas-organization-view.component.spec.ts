import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  UnorderedListOutline,
  ApartmentOutline,
  UserOutline,
  TeamOutline,
  InfoCircleOutline
} from '@ant-design/icons-angular/icons';

import { IdasOrganizationViewComponent } from './idas-organization-view.component';
import { OrganizationViewData } from '@app/shared/components/types/organization-view.model';
import { VIEW_MODE } from '@app/shared/constants/view-mode.constant';

/**
 * Unit tests cho IdasOrganizationViewComponent
 */
describe('IdasOrganizationViewComponent', () => {
  let component: IdasOrganizationViewComponent;
  let fixture: ComponentFixture<IdasOrganizationViewComponent>;

  // Mock data
  const mockOrganizations: OrganizationViewData[] = [
    {
      Id: 1,
      MaToChuc: 'TC001',
      TenToChuc: 'Công ty ABC',
      Loai: 1,
      TrangThai: 2, // BanHanh
      TinhTrang: 1,
      IdToChucCapTren: null,
      DuongDanSapXep: ',1,',
      TenNhanSu: 'Nguyễn Văn A',
      countNS: 10,
      children: [
        {
          Id: 2,
          MaToChuc: 'TC002',
          TenToChuc: 'Phòng Kỹ thuật',
          Loai: 2,
          TrangThai: 2, // BanHanh
          TinhTrang: 1,
          IdToChucCapTren: 1,
          DuongDanSapXep: ',1,2,',
          TenNhanSu: 'Trần Văn B',
          countNS: 5,
          children: []
        },
        {
          Id: 3,
          MaToChuc: 'TC003',
          TenToChuc: 'Phòng Nhân sự',
          Loai: 2,
          TrangThai: 1, // ThietLap - sẽ bị filter trong org chart
          TinhTrang: 1,
          IdToChucCapTren: 1,
          DuongDanSapXep: ',1,3,',
          TenNhanSu: null,
          countNS: 3,
          children: []
        }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IdasOrganizationViewComponent,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        NzIconModule.forRoot([
          UnorderedListOutline,
          ApartmentOutline,
          UserOutline,
          TeamOutline,
          InfoCircleOutline
        ])
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasOrganizationViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should have default viewMode as list', () => {
      expect(component.viewMode).toBe(VIEW_MODE.LIST);
    });

    it('should have default loading as false', () => {
      expect(component.loading).toBe(false);
    });

    it('should have default showViewModeToggle as true', () => {
      expect(component.showViewModeToggle).toBe(true);
    });

    it('should have default expandAll as false', () => {
      expect(component.expandAll).toBe(false);
    });

    it('should have default checkable as false', () => {
      expect(component.checkable).toBe(false);
    });
  });

  describe('View Mode Toggle', () => {
    it('should emit viewModeChange when view mode changes', () => {
      const spy = spyOn(component.viewModeChange, 'emit');
      
      component.onViewModeChange(VIEW_MODE.ORG_CHART);
      
      expect(spy).toHaveBeenCalledWith(VIEW_MODE.ORG_CHART);
    });
  });

  describe('Selection Events', () => {
    it('should emit onSelect when row is clicked', () => {
      const spy = spyOn(component.onSelect, 'emit');
      const record = mockOrganizations[0];
      
      component.onRowClick(record);
      
      expect(spy).toHaveBeenCalledWith(record);
    });

    it('should emit onDetail when row is double-clicked', () => {
      const spy = spyOn(component.onDetail, 'emit');
      const record = mockOrganizations[0];
      
      component.onRowDoubleClick(record);
      
      expect(spy).toHaveBeenCalledWith(record);
    });

    it('should emit onSelect when org chart node is clicked', () => {
      const spy = spyOn(component.onSelect, 'emit');
      const node = mockOrganizations[0];
      
      component.onOrgChartNodeClick(node);
      
      expect(spy).toHaveBeenCalledWith(node);
    });

    it('should emit onDetail when org chart node is double-clicked', () => {
      const spy = spyOn(component.onDetail, 'emit');
      const node = mockOrganizations[0];
      
      component.onOrgChartNodeDoubleClick(node);
      
      expect(spy).toHaveBeenCalledWith(node);
    });
  });

  describe('Check Events', () => {
    it('should emit checkChange when checkbox changes', () => {
      const spy = spyOn(component.checkChange, 'emit');
      const event = {
        keys: ['1', '2'],
        records: [mockOrganizations[0], mockOrganizations[0].children![0]]
      };
      
      component.onCheckChange(event);
      
      expect(spy).toHaveBeenCalledWith(event);
    });
  });

  describe('Node Selection', () => {
    it('should return true when node is selected', () => {
      component.selectedId = 1;
      const node = mockOrganizations[0];
      
      expect(component.isNodeSelected(node)).toBe(true);
    });

    it('should return false when node is not selected', () => {
      component.selectedId = 999;
      const node = mockOrganizations[0];
      
      expect(component.isNodeSelected(node)).toBe(false);
    });
  });

  describe('Initials', () => {
    it('should return initials from full name', () => {
      expect(component.getInitials('Nguyễn Văn A')).toBe('NA');
    });

    it('should return single initial from single name', () => {
      expect(component.getInitials('Admin')).toBe('A');
    });

    it('should return ? for null name', () => {
      expect(component.getInitials(null)).toBe('?');
    });

    it('should return ? for undefined name', () => {
      expect(component.getInitials(undefined)).toBe('?');
    });

    it('should return ? for empty name', () => {
      expect(component.getInitials('')).toBe('?');
    });
  });

  describe('Has Children', () => {
    it('should return true when node has children', () => {
      const node = mockOrganizations[0];
      expect(component.hasChildren(node)).toBe(true);
    });

    it('should return false when node has no children', () => {
      const node = mockOrganizations[0].children![0];
      expect(component.hasChildren(node)).toBe(false);
    });

    it('should return false when children is undefined', () => {
      const node: OrganizationViewData = {
        Id: 99,
        MaToChuc: 'TC099',
        TenToChuc: 'Test'
      };
      expect(component.hasChildren(node)).toBe(false);
    });
  });

  describe('Org Chart Data Filter', () => {
    it('should filter org chart data to only show BanHanh status', () => {
      component.data = mockOrganizations;
      fixture.detectChanges();
      
      const orgChartData = component.orgChartData();
      
      // Root node có TrangThai = 2 (BanHanh) nên được giữ lại
      expect(orgChartData.length).toBe(1);
      expect(orgChartData[0].Id).toBe(1);
      
      // Children: TC002 có TrangThai = 2, TC003 có TrangThai = 1
      // Chỉ TC002 được giữ lại
      expect(orgChartData[0].children?.length).toBe(1);
      expect(orgChartData[0].children?.[0].Id).toBe(2);
    });
  });

  describe('Tree Data Building', () => {
    it('should build tree data on data change', () => {
      component.data = mockOrganizations;
      component.ngOnChanges({
        data: {
          currentValue: mockOrganizations,
          previousValue: [],
          firstChange: true,
          isFirstChange: () => true
        }
      });
      
      const treeData = component.treeData();
      
      expect(treeData.length).toBe(1);
      expect(treeData[0].key).toBe('1');
      expect(treeData[0].title).toBe('Công ty ABC');
      expect(treeData[0].children?.length).toBe(2);
    });

    it('should expand all nodes when expandAll is true', () => {
      component.data = mockOrganizations;
      component.expandAll = true;
      component.ngOnChanges({
        expandAll: {
          currentValue: true,
          previousValue: false,
          firstChange: false,
          isFirstChange: () => false
        }
      });
      
      const treeData = component.treeData();
      
      expect(treeData[0].expand).toBe(true);
    });
  });
});
