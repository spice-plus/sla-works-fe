"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getAllCategories } from "../../masters/categories";
import { sampleArticles } from "../../sample/articles";
import { sampleCompanies } from "../../sample/companies";
import {
  ArticleGrid,
  ArticleListControls,
  ArticlePagination,
  ArticleSearchSidebar,
} from "../../src/components/search";
import { StructuredData } from "../../src/components/seo/StructuredData";
import { useArticleSearch } from "../../src/hooks/useArticleSearch";
import { parseSearchParamsToFilters, parsePageFromSearchParams } from "../../src/utils/searchParams";
import {
  generateArticleListStructuredData,
  generateBreadcrumbStructuredData,
} from "../../src/utils/structuredData";

export default function ArticlesPage() {
  const searchParams = useSearchParams();
  const articles = sampleArticles;
  const categories = getAllCategories();
  const companies = sampleCompanies;

  // カテゴリーマップを作成（categoryIdをキーとする）
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.categoryId, cat])
  );

  // 企業マップを作成
  const companyMap = Object.fromEntries(
    companies.map((comp) => [comp.id, comp])
  );

  // URLパラメータから初期フィルタとページ番号を作成
  const initialFilters = useMemo(() => {
    return parseSearchParamsToFilters(searchParams);
  }, [searchParams]);

  const initialPage = useMemo(() => {
    return parsePageFromSearchParams(searchParams);
  }, [searchParams]);

  const {
    filters,
    sortBy,
    viewMode,
    isAdvancedSearchOpen,
    filteredArticles,
    totalCount,
    currentPage,
    totalPages,
    itemsPerPage,
    handleFiltersChange,
    handleSortChange,
    handleViewModeChange,
    handleAdvancedSearchToggle,
    handleSearch,
    handleReset,
    handlePageChange,
  } = useArticleSearch({ articles, initialFilters, initialPage });

  // 構造化データの生成
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "記事一覧", current: true },
  ];

  const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbItems);
  const articleListStructuredData = generateArticleListStructuredData(
    filteredArticles,
    companies,
    "記事一覧",
    "システム開発・導入事例をご紹介。様々な業界・業種の成功事例をご覧いただけます。",
    "/articles"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 構造化データ */}
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={articleListStructuredData} />
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
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
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

          <ArticlePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
