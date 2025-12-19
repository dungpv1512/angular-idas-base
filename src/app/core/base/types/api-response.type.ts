/**
 * Interface cho response chuẩn từ API
 * Tất cả API responses đều tuân theo format này
 */
export interface ApiResponse<T> {
  /**
   * Trạng thái thành công của request
   */
  success: boolean;

  /**
   * Dữ liệu trả về
   */
  data: T;

  /**
   * Thông báo từ server (optional)
   */
  message?: string;

  /**
   * Danh sách lỗi validation (optional)
   */
  errors?: ValidationError[];
}

/**
 * Interface cho lỗi validation từ server
 */
export interface ValidationError {
  /**
   * Tên field bị lỗi
   */
  field: string;

  /**
   * Thông báo lỗi
   */
  message: string;

  /**
   * Mã lỗi
   */
  code: string;
}
