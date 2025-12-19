import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, computed, Signal, provideZonelessChangeDetection } from '@angular/core';
import { BaseDetailDrawerFeature } from './base-detail-drawer.feature';

interface TestItem {
  Id: number;
  Name: string;
}

/**
 * Concrete implementation cho testing
 */
@Component({
  selector: 'app-test-detail-drawer',
  template: '',
  standalone: true
})
class TestDetailDrawerComponent extends BaseDetailDrawerFeature<TestItem> {
  override readonly drawerWidth = '600px';

  override readonly drawerTitle: Signal<string> = computed(() => {
    const id = this.itemId;
    return id ? `Chi tiết item ${id}` : 'Chi tiết';
  });
}

describe('BaseDetailDrawerFeature', () => {
  let component: TestDetailDrawerComponent;
  let fixture: ComponentFixture<TestDetailDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDetailDrawerComponent],
      providers: [
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestDetailDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Khởi tạo', () => {
    it('nên khởi tạo với activeTab = 0', () => {
      expect(component.activeTab()).toBe(0);
    });

    it('nên khởi tạo với loading = false', () => {
      expect(component.loading()).toBeFalse();
    });

    it('nên có drawerWidth được định nghĩa', () => {
      expect(component.drawerWidth).toBe('600px');
    });

    it('nên khởi tạo với visible = false', () => {
      expect(component.visible).toBeFalse();
    });

    it('nên khởi tạo với itemId = null', () => {
      expect(component.itemId).toBeNull();
    });
  });

  describe('drawerTitle', () => {
    it('nên trả về title mặc định khi không có itemId', () => {
      expect(component.drawerTitle()).toBe('Chi tiết');
    });

    it('nên trả về title với itemId khi có itemId', () => {
      component.itemId = 1;
      fixture.detectChanges();

      expect(component.drawerTitle()).toBe('Chi tiết item 1');
    });
  });

  describe('handleClose', () => {
    it('nên emit visibleChange với false', () => {
      const visibleChangeSpy = spyOn(component.visibleChange, 'emit');

      component.handleClose();

      expect(visibleChangeSpy).toHaveBeenCalledWith(false);
    });

    it('nên emit onClose event', () => {
      const onCloseSpy = spyOn(component.onClose, 'emit');

      component.handleClose();

      expect(onCloseSpy).toHaveBeenCalled();
    });

    it('nên reset activeTab về 0', () => {
      component.setActiveTab(2);
      expect(component.activeTab()).toBe(2);

      component.handleClose();

      expect(component.activeTab()).toBe(0);
    });

    it('nên reset loading về false', () => {
      component.handleClose();

      expect(component.loading()).toBeFalse();
    });
  });

  describe('setActiveTab', () => {
    it('nên set active tab index', () => {
      component.setActiveTab(1);
      expect(component.activeTab()).toBe(1);

      component.setActiveTab(2);
      expect(component.activeTab()).toBe(2);
    });
  });

  describe('isOpen computed', () => {
    it('nên trả về false khi visible = false', () => {
      component.visible = false;
      fixture.detectChanges();

      expect(component.isOpen()).toBeFalse();
    });

    it('nên trả về true khi visible = true', () => {
      component.visible = true;
      fixture.detectChanges();

      expect(component.isOpen()).toBeTrue();
    });
  });

  describe('hasSelectedItem computed', () => {
    it('nên trả về false khi itemId = null', () => {
      component.itemId = null;
      fixture.detectChanges();

      expect(component.hasSelectedItem()).toBeFalse();
    });

    it('nên trả về true khi có itemId', () => {
      component.itemId = 1;
      fixture.detectChanges();

      expect(component.hasSelectedItem()).toBeTrue();
    });
  });
});
