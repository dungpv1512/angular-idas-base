import { Injectable } from '@angular/core';
import * as fc from 'fast-check';
import { BaseStore, StoreState } from './base-store';

/**
 * Concrete implementation của BaseStore để test
 * BaseStore là abstract nên cần tạo class cụ thể
 */
@Injectable()
class TestStore extends BaseStore<string[]> {
  /**
   * Expose protected methods để test
   */
  public testSetLoading(loading: boolean): void {
    this.setLoading(loading);
  }

  public testSetData(data: string[] | null): void {
    this.setData(data);
  }

  public testSetError(error: string): void {
    this.setError(error);
  }
}

describe('BaseStore', () => {
  let store: TestStore;

  beforeEach(() => {
    // Tạo instance trực tiếp - không cần TestBed cho zoneless
    store = new TestStore();
  });

  afterEach(() => {
    store.reset();
  });

  describe('Initial State', () => {
    it('should have null data initially', () => {
      expect(store.data()).toBeNull();
    });

    it('should have loading false initially', () => {
      expect(store.loading()).toBeFalse();
    });

    it('should have null error initially', () => {
      expect(store.error()).toBeNull();
    });

    it('should have hasData false initially', () => {
      expect(store.hasData()).toBeFalse();
    });

    it('should have hasError false initially', () => {
      expect(store.hasError()).toBeFalse();
    });
  });

  /**
   * **Feature: angular-frontend-architecture, Property 6: Signal Reactivity**
   * *For any* signal-based store, when a signal value changes,
   * all computed signals depending on it SHALL automatically update
   * without manual subscription.
   * **Validates: Requirements 3.2, 3.3**
   */
  describe('Property 6: Signal Reactivity', () => {
    it('hasData computed signal should automatically update when data changes', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string(), { minLength: 0, maxLength: 10 }),
          (testData: string[]) => {
            // Reset trước mỗi test
            store.reset();

            // Ban đầu hasData phải là false
            expect(store.hasData()).toBeFalse();

            // Set data
            store.testSetData(testData);

            // hasData phải tự động cập nhật dựa trên data
            // Nếu data là array rỗng, hasData vẫn là true vì data !== null
            expect(store.hasData()).toBeTrue();

            // Set data về null
            store.testSetData(null);

            // hasData phải tự động cập nhật về false
            expect(store.hasData()).toBeFalse();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('hasError computed signal should automatically update when error changes', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (errorMessage: string) => {
            // Reset trước mỗi test
            store.reset();

            // Ban đầu hasError phải là false
            expect(store.hasError()).toBeFalse();

            // Set error
            store.testSetError(errorMessage);

            // hasError phải tự động cập nhật thành true
            expect(store.hasError()).toBeTrue();

            // Reset store
            store.reset();

            // hasError phải tự động cập nhật về false
            expect(store.hasError()).toBeFalse();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('loading signal should update without manual subscription', () => {
      fc.assert(
        fc.property(
          fc.boolean(),
          (loadingState: boolean) => {
            // Reset trước mỗi test
            store.reset();

            // Set loading
            store.testSetLoading(loadingState);

            // loading signal phải phản ánh giá trị mới
            expect(store.loading()).toBe(loadingState);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: angular-frontend-architecture, Property 7: Store State Management**
   * *For any* store extending BaseStore, the store SHALL correctly manage
   * loading, error, and data states, transitioning between states
   * appropriately during data operations.
   * **Validates: Requirements 3.4**
   */
  describe('Property 7: Store State Management', () => {
    it('setLoading(true) should clear error state', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (errorMessage: string) => {
            // Reset và set error trước
            store.reset();
            store.testSetError(errorMessage);

            // Verify error đã được set
            expect(store.error()).toBe(errorMessage);

            // Set loading = true
            store.testSetLoading(true);

            // Error phải được clear
            expect(store.error()).toBeNull();
            expect(store.loading()).toBeTrue();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('setData should turn off loading', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string(), { minLength: 0, maxLength: 10 }),
          (testData: string[]) => {
            // Reset và set loading trước
            store.reset();
            store.testSetLoading(true);

            // Verify loading đã được set
            expect(store.loading()).toBeTrue();

            // Set data
            store.testSetData(testData);

            // Loading phải được tắt
            expect(store.loading()).toBeFalse();
            expect(store.data()).toEqual(testData);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('setError should turn off loading', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 100 }),
          (errorMessage: string) => {
            // Reset và set loading trước
            store.reset();
            store.testSetLoading(true);

            // Verify loading đã được set
            expect(store.loading()).toBeTrue();

            // Set error
            store.testSetError(errorMessage);

            // Loading phải được tắt
            expect(store.loading()).toBeFalse();
            expect(store.error()).toBe(errorMessage);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('reset should restore initial state', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string(), { minLength: 1, maxLength: 10 }),
          fc.string({ minLength: 1, maxLength: 100 }),
          (testData: string[], errorMessage: string) => {
            // Set các state khác nhau
            store.testSetData(testData);
            store.testSetError(errorMessage);
            store.testSetLoading(true);

            // Reset
            store.reset();

            // Tất cả state phải về initial
            expect(store.data()).toBeNull();
            expect(store.loading()).toBeFalse();
            expect(store.error()).toBeNull();
            expect(store.hasData()).toBeFalse();
            expect(store.hasError()).toBeFalse();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('getState should return correct snapshot', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string(), { minLength: 0, maxLength: 10 }),
          fc.boolean(),
          fc.option(fc.string({ minLength: 1, maxLength: 100 }), { nil: undefined }),
          (testData: string[], loadingState: boolean, errorMessage: string | undefined) => {
            // Reset
            store.reset();

            // Set data
            store.testSetData(testData);

            // Set loading (sẽ clear error nếu true)
            store.testSetLoading(loadingState);

            // Set error nếu có (sẽ tắt loading)
            if (errorMessage) {
              store.testSetError(errorMessage);
            }

            // Get state snapshot
            const state: StoreState<string[]> = store.getState();

            // Verify snapshot matches current signals
            expect(state.data).toEqual(store.data());
            expect(state.loading).toBe(store.loading());
            expect(state.error).toBe(store.error());
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
