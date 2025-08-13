"use client";

import { useCallback, useMemo, useState } from "react";
import { sampleCompanies } from "../../sample/companies";
import type { Article } from "../models/types";
import type { SearchFilters, SortBy, ViewMode } from "../types/search";

interface UseArticleSearchProps {
  articles: Article[];
  initialFilters?: Partial<SearchFilters>;
}

export function useArticleSearch({
  articles,
  initialFilters,
}: UseArticleSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    categories: [],
    articleTypes: [],
    prefectures: [],
    company: "",
    ...initialFilters,
  });

  const [sortBy, setSortBy] = useState<SortBy>("publishedAt");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  // 記事のフィルタリング
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // キーワード検索（記事タイトル）
      if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        if (!article.title.toLowerCase().includes(keyword)) {
          return false;
        }
      }

      // カテゴリフィルター
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(article.categoryId.toString())) {
          return false;
        }
      }

      // 記事タイプフィルター
      if (filters.articleTypes.length > 0) {
        // articleTypeをIDに変換するマッピング
        const articleTypeMapping: Record<string, string> = {
          "01": "process",
          "02": "interview",
          "03": "deliverable",
          "04": "survey",
        };

        const articleTypeIds = filters.articleTypes;
        const articleTypeNames = articleTypeIds
          .map((id) => articleTypeMapping[id])
          .filter(Boolean);

        if (!articleTypeNames.includes(article.articleType)) {
          return false;
        }
      }

      // 開発会社フィルター
      if (filters.company) {
        const company = sampleCompanies.find((c) => c.id === article.companyId);
        if (
          !company ||
          !company.name.toLowerCase().includes(filters.company.toLowerCase())
        ) {
          return false;
        }
      }

      // 都道府県フィルター（企業の所在地で絞り込み）
      if (filters.prefectures.length > 0) {
        const company = sampleCompanies.find((c) => c.id === article.companyId);
        if (!company || !filters.prefectures.includes(company.prefectureCode)) {
          return false;
        }
      }

      return true;
    });
  }, [articles, filters]);

  // 記事のソート
  const sortedArticles = useMemo(() => {
    const sorted = [...filteredArticles];

    switch (sortBy) {
      case "publishedAt":
        return sorted.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
      case "viewCount":
        return sorted.sort((a, b) => b.viewCount - a.viewCount);
      default:
        return sorted;
    }
  }, [filteredArticles, sortBy]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSort: string) => {
    setSortBy(newSort as SortBy);
  }, []);

  const handleViewModeChange = useCallback((newViewMode: ViewMode) => {
    setViewMode(newViewMode);
  }, []);

  const handleAdvancedSearchToggle = useCallback(() => {
    setIsAdvancedSearchOpen((prev) => !prev);
  }, []);

  const handleSearch = useCallback(() => {
    // 検索実行時の処理（必要に応じて追加）
  }, []);

  const handleReset = useCallback(() => {
    setFilters({
      keyword: "",
      categories: [],
      articleTypes: [],
      prefectures: [],
      company: "",
    });
  }, []);

  return {
    filters,
    sortBy,
    viewMode,
    isAdvancedSearchOpen,
    filteredArticles: sortedArticles,
    totalCount: sortedArticles.length,
    handleFiltersChange,
    handleSortChange,
    handleViewModeChange,
    handleAdvancedSearchToggle,
    handleSearch,
    handleReset,
  };
}
