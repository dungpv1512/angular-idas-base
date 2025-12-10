import { Injectable, signal } from '@angular/core';

/**
 * Loading Service - Quản lý trạng thái loading
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = 0;
  public isLoading = signal<boolean>(false);

  show(): void {
    this.loadingCount++;
    this.isLoading.set(true);
  }

  hide(): void {
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      this.loadingCount = 0;
      this.isLoading.set(false);
    }
  }

  reset(): void {
    this.loadingCount = 0;
    this.isLoading.set(false);
  }
}
