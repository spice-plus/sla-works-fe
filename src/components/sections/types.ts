export interface CompanyPopularArticlesProps {
  companyId: number;
  companyName: string;
  limit?: number;
  excludeArticleId?: number; // 現在の記事を除外する場合
  className?: string;
}

export interface RecommendedArticlesProps {
  currentArticleId?: number;
  categoryId?: number;
  limit?: number;
  title?: string; // セクションタイトルをカスタマイズ
  className?: string;
}

export interface CategoryExplorerProps {
  title?: string;
  showCount?: boolean; // 各項目の記事数を表示するか
  limit?: number;
  className?: string;
}

export interface TagExplorerProps {
  title?: string;
  showCount?: boolean; // 各項目の記事数を表示するか
  limit?: number;
  className?: string;
}

export interface PrefectureExplorerProps {
  title?: string;
  showCount?: boolean; // 各項目の記事数を表示するか
  limit?: number;
  className?: string;
}
