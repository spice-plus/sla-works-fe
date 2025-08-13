"use client";

import { useMemo, useState } from "react";
import { getPrefectureByCode } from "../../masters/prefectures";
import type { Company } from "../models/types";
import type { CompanySearchState } from "../types/company";

interface UseCompanySearchProps {
  companies: Company[];
  articleCountMap: Map<number, number>;
}

export function useCompanySearch({
  companies,
  articleCountMap,
}: UseCompanySearchProps) {
  const [searchState, setSearchState] = useState<CompanySearchState>({
    keyword: "",
    prefecture: "",
    prefectures: [],
    minArticleCount: 0,
    sortBy: "articleCount",
    sortOrder: "desc",
  });

  // フィルタリングされた企業リスト
  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    // キーワード検索
    if (searchState.keyword.trim()) {
      const keyword = searchState.keyword.toLowerCase();
      filtered = filtered.filter((company) =>
        company.name.toLowerCase().includes(keyword)
      );
    }

    // 都道府県フィルター（単一選択 - 後方互換性のため）
    if (searchState.prefecture) {
      filtered = filtered.filter((company) =>
        company.location.includes(searchState.prefecture)
      );
    }

    // 都道府県フィルター（複数選択）
    if (searchState.prefectures && searchState.prefectures.length > 0) {
      filtered = filtered.filter((company) =>
        searchState.prefectures.some((prefCode) => {
          // 都道府県コードから都道府県名を取得してマッチング
          const prefecture = getPrefectureByCode(prefCode);
          return (
            prefecture && company.location.includes(prefecture.prefectureName)
          );
        })
      );
    }

    // 記事数フィルター
    if (searchState.minArticleCount > 0) {
      filtered = filtered.filter((company) => {
        const articleCount = articleCountMap.get(company.id) || 0;
        return articleCount >= searchState.minArticleCount;
      });
    }

    return filtered;
  }, [
    companies,
    searchState.keyword,
    searchState.prefecture,
    searchState.prefectures,
    searchState.minArticleCount,
    articleCountMap,
  ]);

  // ソートされた企業リスト
  const sortedCompanies = useMemo(() => {
    const sorted = [...filteredCompanies];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (searchState.sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "articleCount": {
          const countA = articleCountMap.get(a.id) || 0;
          const countB = articleCountMap.get(b.id) || 0;
          comparison = countA - countB;
          break;
        }
        default:
          comparison = 0;
      }

      return searchState.sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [
    filteredCompanies,
    searchState.sortBy,
    searchState.sortOrder,
    articleCountMap,
  ]);

  // 検索状態の更新関数
  const updateSearch = (updates: Partial<CompanySearchState>) => {
    setSearchState((prev) => ({ ...prev, ...updates }));
  };

  // フィルターのリセット
  const resetFilters = () => {
    setSearchState({
      keyword: "",
      prefecture: "",
      prefectures: [],
      minArticleCount: 0,
      sortBy: "articleCount",
      sortOrder: "desc",
    });
  };

  return {
    searchState,
    filteredCompanies: sortedCompanies,
    updateSearch,
    resetFilters,
    totalCount: companies.length,
    filteredCount: sortedCompanies.length,
  };
}
