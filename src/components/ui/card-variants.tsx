export type CardVariant = "overlay" | "vertical" | "horizontal";

export interface CardProps {
  variant: CardVariant;
  image: string;
  title: string;
  description?: string;
  date?: string;
  metadata?: string; // 閲覧数など
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface BaseCardContentProps {
  image: string;
  title: string;
  description?: string;
  date?: string;
  metadata?: string;
  className?: string;
}
