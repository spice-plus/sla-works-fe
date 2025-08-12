// 共通ナビゲーションコンポーネントの型定義

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export interface BackButtonProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}
