// 検索・フィルター関連の型定義

export interface SearchFilters {
  keyword: string;
  categories: string[];
  articleTypes: string[];
  prefectures: string[];
  company: string;
}

export interface SortOption {
  value: string;
  label: string;
}

export type ViewMode = "grid" | "list";

export type SortBy = "publishedAt" | "viewCount" | "name" | "articleCount";

export interface SearchState {
  filters: SearchFilters;
  sortBy: SortBy;
  viewMode: ViewMode;
}
