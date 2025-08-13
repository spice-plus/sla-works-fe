"use client";

import { useMemo } from "react";
import { CompanyList } from "@/components/search/CompanyList";
import { CompanyListControls } from "@/components/search/CompanyListControls";
import { CompanySearchSidebar } from "@/components/search/CompanySearchSidebar";
import { useCompanySearch } from "@/hooks/useCompanySearch";
import { sampleArticles } from "../../sample/articles";
import { sampleCompanies } from "../../sample/companies";

export default function CompaniesPage() {
  // 各企業の記事数を計算
  const articleCountMap = useMemo(() => {
    const map = new Map<number, number>();
    sampleArticles.forEach((article) => {
      const count = map.get(article.companyId) || 0;
      map.set(article.companyId, count + 1);
    });
    return map;
  }, []);

  // 企業検索フック
  const {
    searchState,
    filteredCompanies,
    updateSearch,
    resetFilters,
    totalCount,
    filteredCount,
  } = useCompanySearch({
    companies: sampleCompanies,
    articleCountMap,
  });

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-7xl">
        {/* ヘッダーセクション */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">開発会社一覧</h1>
        </div>

        {/* 2カラムレイアウト */}
        <div className="flex gap-8">
          {/* 左サイドバー - 検索・フィルター */}
          <aside className="flex-shrink-0">
            <CompanySearchSidebar
              searchState={searchState}
              onSearchChange={updateSearch}
              onReset={resetFilters}
              totalCount={totalCount}
              filteredCount={filteredCount}
            />
          </aside>

          {/* 右メインエリア - 企業リスト */}
          <main className="flex-1 min-w-0">
            <CompanyListControls
              searchState={searchState}
              onSearchChange={updateSearch}
              onReset={resetFilters}
              totalCount={totalCount}
              filteredCount={filteredCount}
            />

            <CompanyList
              companies={filteredCompanies}
              articleCountMap={articleCountMap}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
