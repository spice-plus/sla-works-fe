"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { CompanyList } from "@/components/search/CompanyList";
import { CompanyListControls } from "@/components/search/CompanyListControls";
import { CompanyPagination } from "@/components/search/CompanyPagination";
import { CompanySearchSidebar } from "@/components/search/CompanySearchSidebar";
import { useCompanySearch } from "@/hooks/useCompanySearch";
import { sampleArticles } from "../../sample/articles";
import { sampleCompanies } from "../../sample/companies";

export default function CompaniesPage() {
  const searchParams = useSearchParams();
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
    totalPages,
  } = useCompanySearch({
    companies: sampleCompanies,
    articleCountMap,
  });

  // URL同期 - ページ番号の初期化（クライアントサイドのみ）
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    if (page !== searchState.currentPage && page > 0) {
      updateSearch({ currentPage: page });
    }
  }, [searchParams, searchState.currentPage, updateSearch]);

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-8">
      <div>
        {/* ヘッダーセクション */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">開発会社一覧</h1>
        </div>

        {/* レスポンシブレイアウト */}
        <div className="space-y-6 lg:space-y-0 lg:flex lg:gap-8">
          {/* 検索・フィルターエリア（モバイルでは上部、デスクトップでは左サイドバー） */}
          <aside className="lg:flex-shrink-0 lg:w-80">
            <div className="lg:sticky lg:top-24">
              <CompanySearchSidebar
                searchState={searchState}
                onSearchChange={updateSearch}
                onReset={resetFilters}
                totalCount={totalCount}
                filteredCount={filteredCount}
              />
            </div>
          </aside>

          {/* メインコンテンツエリア */}
          <main className="lg:flex-1 lg:min-w-0">
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

            {/* ページネーション */}
            <CompanyPagination
              currentPage={searchState.currentPage}
              totalPages={totalPages}
              onPageChange={(page) => updateSearch({ currentPage: page })}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
