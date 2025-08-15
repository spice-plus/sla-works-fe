// 検索・フィルター関連の型定義

export interface SearchFilters {
  keyword: string;
  categories: number[];
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

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface SearchState {
  filters: SearchFilters;
  sortBy: SortBy;
  viewMode: ViewMode;
  pagination: PaginationState;
}
