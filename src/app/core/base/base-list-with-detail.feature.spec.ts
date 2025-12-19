import { TestBed } from '@angular/core/testing';
import { Component, Injectable, signal, provideZonelessChangeDetection } from '@angular/core';
import { Router, ActivatedRoute, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BaseListWithDetailFeature } from './base-list-with-detail.feature';
import { BaseStore } from './base-store';

/**
 * Mock Store cho testing
 */
@Injectable()
class MockStore extends BaseStore<TestItem[]> {
  readonly items = signal<TestItem[]>([
    { Id: 1, Name: 'Item 1' },
    { Id: 2, Name: 'Item 2' },
    { Id: 3, Name: 'Item 3' }
  ]);
}

interface TestItem {
  Id: number;
  Name: string;
}

/**
 * Concrete implementation cho testing
 */
@Component({
  selector: 'app-test-list',
  template: '',
  standalone: true
})
class TestListComponent extends BaseListWithDetailFeature<TestItem> {
  override readonly store = TestBed.inject(MockStore);
  override readonly queryParamKey = 'idsDetail';
}

describe('BaseListWithDetailFeature', () => {
  let component: TestListComponent;
  let router: Router;
  let queryParamsSubject: BehaviorSubject<Record<string, string>>;

  beforeEach(async () => {
    queryParamsSubject = new BehaviorSubject<Record<string, string>>({});

    await TestBed.configureTestingModule({
      imports: [TestListComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        MockStore,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParamsSubject.asObservable()
          }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    const fixture = TestBed.createComponent(TestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Khởi tạo', () => {
    it('nên khởi tạo với drawer đóng', () => {
      expect(component.drawerVisible()).toBeFalse();
      expect(component.selectedItemId()).toBeNull();
    });

    it('nên có queryParamKey mặc định là idsDetail', () => {
      expect(component.queryParamKey).toBe('idsDetail');
    });
  });

  describe('Deep Link - initDeepLink', () => {
    it('nên mở drawer khi URL có idsDetail', async () => {
      queryParamsSubject.next({ idsDetail: '1' });
      // Đợi subscription xử lý
      await Promise.resolve();

      expect(component.drawerVisible()).toBeTrue();
      expect(component.selectedItemId()).toBe(1);
    });

    it('nên lấy ID đầu tiên khi có nhiều IDs', async () => {
      queryParamsSubject.next({ idsDetail: '1,2,3' });
      await Promise.resolve();

      expect(component.selectedItemId()).toBe(1);
    });

    it('nên bỏ qua ID không hợp lệ', async () => {
      queryParamsSubject.next({ idsDetail: 'abc' });
      await Promise.resolve();

      expect(component.drawerVisible()).toBeFalse();
      expect(component.selectedItemId()).toBeNull();
    });

    it('nên bỏ qua ID âm hoặc 0', async () => {
      queryParamsSubject.next({ idsDetail: '-1,0' });
      await Promise.resolve();

      expect(component.drawerVisible()).toBeFalse();
      expect(component.selectedItemId()).toBeNull();
    });
  });

  describe('openDetailById', () => {
    it('nên mở drawer và set selectedItemId', () => {
      component.openDetailById(2);

      expect(component.drawerVisible()).toBeTrue();
      expect(component.selectedItemId()).toBe(2);
    });

    it('nên cập nhật URL với idsDetail', () => {
      component.openDetailById(2);

      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: jasmine.any(Object),
        queryParams: { idsDetail: 2 },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    });
  });

  describe('closeDetail', () => {
    beforeEach(() => {
      component.openDetailById(1);
    });

    it('nên đóng drawer và clear selectedItemId', () => {
      component.closeDetail();

      expect(component.drawerVisible()).toBeFalse();
      expect(component.selectedItemId()).toBeNull();
    });

    it('nên xóa idsDetail khỏi URL', () => {
      component.closeDetail();

      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: jasmine.any(Object),
        queryParams: { idsDetail: null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    });
  });

  describe('setDrawerVisible', () => {
    it('nên set drawer visible state', () => {
      component.setDrawerVisible(true);
      expect(component.drawerVisible()).toBeTrue();

      component.setDrawerVisible(false);
      expect(component.drawerVisible()).toBeFalse();
    });

    it('nên clear selectedItemId và URL khi đóng drawer', () => {
      component.openDetailById(1);
      component.setDrawerVisible(false);

      expect(component.selectedItemId()).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith([], {
        relativeTo: jasmine.any(Object),
        queryParams: { idsDetail: null },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    });
  });
});
