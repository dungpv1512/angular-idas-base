/**
 * Anchor link interface - Định nghĩa cấu trúc cho anchor navigation links
 */
export interface AnchorLink {
  /** Tiêu đề hiển thị của link */
  title: string;
  /** Href target (ví dụ: #section-1) */
  href: string;
  /** Các link con (nested) */
  children?: AnchorLink[];
}
