/**
 * Định nghĩa thứ tự chạy các Startup Task
 * Tương tự UngDungVNStartupOrderDefaults trong .NET Core
 * 
 * Quy tắc:
 * - Số càng nhỏ chạy càng sớm
 * - Các task cùng nhóm chức năng nên có order gần nhau
 * - Để khoảng cách giữa các nhóm để dễ thêm task mới
 */
export const StartupOrderDefaults = {
  /**
   * Khởi tạo cấu hình ứng dụng
   * Chạy đầu tiên vì các task khác có thể phụ thuộc vào config
   */
  AppConfig: 10,

  /**
   * Khởi tạo đa ngôn ngữ (i18n)
   * Chạy sau config để có thể đọc ngôn ngữ mặc định từ config
   */
  I18n: 20,

  /**
   * Khởi tạo theme/giao diện
   */
  Theme: 30,

  /**
   * Khởi tạo authentication
   * Kiểm tra token, refresh token nếu cần
   */
  Authentication: 100,

  /**
   * Khởi tạo authorization
   * Load permissions, roles sau khi đã xác thực
   */
  Authorization: 110,

  /**
   * Khởi tạo user profile
   * Load thông tin user sau khi đã xác thực
   */
  UserProfile: 120,

  /**
   * Khởi tạo menu/navigation
   * Có thể phụ thuộc vào permissions
   */
  Navigation: 200,

  /**
   * Khởi tạo notifications
   * Kết nối SignalR, load notifications
   */
  Notifications: 300,

  /**
   * Khởi tạo analytics/tracking
   */
  Analytics: 400,

  /**
   * Thứ tự mặc định cho các task không chỉ định order
   */
  Default: 1000
} as const;

/**
 * Type cho các key của StartupOrderDefaults
 */
export type StartupOrderKey = keyof typeof StartupOrderDefaults;
