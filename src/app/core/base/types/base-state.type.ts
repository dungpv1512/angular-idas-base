import { LoadingState } from './loading-state.type';

/**
 * Interface cho trạng thái cơ bản của store
 */
export interface BaseState<T> extends LoadingState {
  data: T[];
  selectedItem: T | null;
  total: number;
  page: number;
  pageSize: number;
}
