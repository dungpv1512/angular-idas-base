import { Injectable } from '@angular/core';
import { Subject, Observable, filter } from 'rxjs';
import { AppEvent } from './events.constant';

/**
 * Event Bus Service - Cross-feature communication
 *
 * Cho phép features giao tiếp với nhau thông qua events,
 * không cần biết về nhau (loosely coupled).
 *
 * @example
 * ```typescript
 * // Emit event
 * this.eventBus.emit({
 *   type: APP_EVENTS.ORGANIZATION.CREATED,
 *   payload: { id: 1, name: 'New Org' }
 * });
 *
 * // Listen event
 * this.eventBus.on(APP_EVENTS.ORGANIZATION.CREATED)
 *   .pipe(takeUntilDestroyed(this.destroyRef))
 *   .subscribe(event => {
 *     console.log('Organization created:', event.payload);
 *   });
 * ```
 *
 * @see .kiro/steering/state-management.md
 */
@Injectable({ providedIn: 'root' })
export class EventBusService {
  private readonly events$ = new Subject<AppEvent>();

  /**
   * Emit một event
   * @param event - Event object với type và payload
   */
  emit<T extends AppEvent>(event: T): void {
    this.events$.next(event);
  }

  /**
   * Subscribe vào một loại event cụ thể
   * @param eventType - Event type string
   * @returns Observable của events matching type
   *
   * @example
   * ```typescript
   * this.eventBus.on(APP_EVENTS.ORGANIZATION.DELETED)
   *   .pipe(takeUntilDestroyed(this.destroyRef))
   *   .subscribe(event => {
   *     console.log('Deleted org id:', event.payload.id);
   *   });
   * ```
   */
  on<T extends AppEvent>(eventType: T['type']): Observable<T> {
    return this.events$.pipe(
      filter((event): event is T => event.type === eventType)
    );
  }

  /**
   * Subscribe vào nhiều event types cùng lúc
   * @param eventTypes - Array of event type strings
   * @returns Observable của events matching any of the types
   *
   * @example
   * ```typescript
   * this.eventBus.onAny([
   *   APP_EVENTS.ORGANIZATION.CREATED,
   *   APP_EVENTS.ORGANIZATION.UPDATED,
   *   APP_EVENTS.ORGANIZATION.DELETED
   * ])
   *   .pipe(takeUntilDestroyed(this.destroyRef))
   *   .subscribe(event => {
   *     console.log('Organization changed:', event);
   *     this.refreshData();
   *   });
   * ```
   */
  onAny<T extends AppEvent>(eventTypes: T['type'][]): Observable<T> {
    return this.events$.pipe(
      filter((event): event is T =>
        eventTypes.includes(event.type as T['type'])
      )
    );
  }

  /**
   * Subscribe vào tất cả events (debugging purpose)
   * @returns Observable của tất cả events
   *
   * ⚠️ CHỈ SỬ DỤNG CHO DEBUGGING
   */
  onAll(): Observable<AppEvent> {
    return this.events$.asObservable();
  }
}
