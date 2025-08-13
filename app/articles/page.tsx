"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getAllCategories } from "../../masters/categories";
import { sampleArticles } from "../../sample/articles";
import { sampleCompanies } from "../../sample/companies";
import {
  ArticleGrid,
  ArticleListControls,
  ArticleSearchSidebar,
} from "../../src/components/search";
import { useArticleSearch } from "../../src/hooks/useArticleSearch";
import { parseSearchParamsToFilters } from "../../src/utils/searchParams";

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const articles = sampleArticles;
  const categories = getAllCategories();
  const companies = sampleCompanies;

  // カテゴリーマップを作成（categoryIdをキーとする）
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [parseInt(cat.categoryId), cat])
  );

  // 企業マップを作成
  const companyMap = Object.fromEntries(
    companies.map((comp) => [comp.id, comp])
  );

  // URLパラメータから初期フィルタを作成
  const initialFilters = useMemo(() => {
    return parseSearchParamsToFilters(searchParams);
  }, [searchParams]);

  const {
    filters,
    sortBy,
    viewMode,
    isAdvancedSearchOpen,
    filteredArticles,
    totalCount,
    handleFiltersChange,
    handleSortChange,
    handleViewModeChange,
    handleAdvancedSearchToggle,
    handleSearch,
    handleReset,
  } = useArticleSearch({ articles, initialFilters });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ヘッダーセクション */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">記事一覧</h1>
      </div>

      {/* 2カラムレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 左サイドバー（検索エリア） */}
        <div className="lg:col-span-1">
          <ArticleSearchSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            onReset={handleReset}
            isAdvancedSearchOpen={isAdvancedSearchOpen}
            onAdvancedSearchToggle={handleAdvancedSearchToggle}
          />
        </div>

        {/* 右メインエリア（コンテンツ） */}
        <div className="lg:col-span-3">
          <ArticleListControls
            totalCount={totalCount}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />

          <ArticleGrid
            articles={filteredArticles}
            categories={categoryMap}
            companies={companyMap}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
}
