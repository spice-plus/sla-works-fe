export type CompanySortOption = "name" | "articleCount";

export interface CompanySearchState {
  keyword: string;
  prefecture: string;
  prefectures: string[];
  minArticleCount: number;
  sortBy: CompanySortOption;
  sortOrder: "asc" | "desc";
  currentPage: number;
  itemsPerPage: number;
}

export interface CompanySearchFilters {
  keyword?: string;
  prefecture?: string;
  minArticleCount?: number;
}
