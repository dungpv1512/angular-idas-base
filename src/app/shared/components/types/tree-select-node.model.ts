/**
 * Tree select node interface
 */
export interface TreeSelectNode {
  title: string;
  value: any;
  key: string;
  disabled?: boolean;
  isLeaf?: boolean;
  children?: TreeSelectNode[];
}
