/**
 * Search result interface
 */
export interface SearchResult {
  value: string;
  values: string[]; // Mảng các giá trị sau khi split
  fields?: string[];
}
