"use client";

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
import { spacingTokens } from "../../src/design/tokens/spacing";
import { typography } from "../../src/design/tokens/typography";
import { useArticleSearch } from "../../src/hooks/useArticleSearch";
import {
  generateArticleListStructuredData,
  generateBreadcrumbStructuredData,
} from "../../src/utils/structuredData";

export default function ArticlesPage() {
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
  } = useArticleSearch({ articles });

  // 構造化データの生成
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "記事一覧", current: true },
  ];

  const breadcrumbStructuredData =
    generateBreadcrumbStructuredData(breadcrumbItems);
  const articleListStructuredData = generateArticleListStructuredData(
    filteredArticles,
    companies,
    "記事一覧",
    "システム開発・導入事例をご紹介。様々な業界・業種の成功事例をご覧いただけます。",
    "/articles"
  );

  return (
    <div className="container-responsive py-8 md:py-12">
      {/* 構造化データ */}
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={articleListStructuredData} />
      {/* ヘッダーセクション */}
      <div className={spacingTokens.variants.element}>
        <h1 className={typography.variants.h1}>記事一覧</h1>
      </div>

      {/* レスポンシブレイアウト */}
      <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
        {/* 検索エリア（モバイルでは上部、デスクトップでは左サイドバー） */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <ArticleSearchSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSearch={handleSearch}
              onReset={handleReset}
              isAdvancedSearchOpen={isAdvancedSearchOpen}
              onAdvancedSearchToggle={handleAdvancedSearchToggle}
            />
          </div>
        </div>

        {/* メインコンテンツエリア */}
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
