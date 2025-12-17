/**
 * Tree table node interface
 */
export interface TreeTableNode {
  key: string;
  title: string;
  data?: any;
  level?: number;
  expand?: boolean;
  children?: TreeTableNode[];
}
