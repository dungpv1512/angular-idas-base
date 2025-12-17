export interface MenuItem {
  title: string;
  titleKey?: string; // Translation key
  icon?: string;
  route?: string;
  children?: MenuItem[];
  open?: boolean;
}
