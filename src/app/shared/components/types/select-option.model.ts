/**
 * Select option interface
 */
export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
  children?: SelectOption[];
}
