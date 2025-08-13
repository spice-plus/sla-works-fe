"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPrefectureByCode } from "../../../masters/prefectures";
import type { CompanySearchState } from "../../types/company";
import { CompanyAdvancedSearchModal } from "./CompanyAdvancedSearchModal";
import { SearchInput } from "./SearchInput";

interface CompanySearchSidebarProps {
  searchState: CompanySearchState;
  onSearchChange: (updates: Partial<CompanySearchState>) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export function CompanySearchSidebar({
  searchState,
  onSearchChange,
  onReset,
  totalCount: _totalCount,
  filteredCount: _filteredCount,
}: CompanySearchSidebarProps) {
  // 現在の検索条件をサマリー表示用に整理
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchState.keyword.trim()) count++;
    if (searchState.prefecture) count++;
    if (searchState.prefectures && searchState.prefectures.length > 0) count++;
    if (searchState.minArticleCount > 0) count++;
    return count;
  };

  const getActiveFiltersText = () => {
    const filters = [];
    if (searchState.keyword.trim()) {
      filters.push(`キーワード: ${searchState.keyword}`);
    }
    if (searchState.prefecture) {
      filters.push(`都道府県: ${searchState.prefecture}`);
    }
    if (searchState.prefectures && searchState.prefectures.length > 0) {
      const prefNames = searchState.prefectures
        .map((code) => getPrefectureByCode(code)?.prefectureName)
        .filter(Boolean)
        .slice(0, 2);
      const text = prefNames.join(", ");
      if (searchState.prefectures.length > 2) {
        filters.push(
          `都道府県: ${text} 他${searchState.prefectures.length - 2}件`
        );
      } else {
        filters.push(`都道府県: ${text}`);
      }
    }
    if (searchState.minArticleCount > 0) {
      filters.push(`記事数: ${searchState.minArticleCount}件以上`);
    }
    return filters;
  };

  const activeFiltersCount = getActiveFiltersCount();
  const activeFiltersText = getActiveFiltersText();

  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">検索・フィルター</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* キーワード検索 */}
          <div>
            <SearchInput
              placeholder="開発会社名で検索..."
              label="開発会社名で検索"
              value={searchState.keyword}
              onChange={(value) => onSearchChange({ keyword: value })}
            />
          </div>

          {/* 詳細検索ボタン */}
          <CompanyAdvancedSearchModal
            searchState={searchState}
            onSearchChange={onSearchChange}
            onReset={onReset}
          >
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              詳細検索
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </CompanyAdvancedSearchModal>

          {/* 現在の検索条件表示 */}
          {activeFiltersText.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                現在の検索条件:
              </div>
              <div className="space-y-1">
                {activeFiltersText.map((filter) => (
                  <div key={filter} className="text-xs text-muted-foreground">
                    {filter}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* リセットボタン */}
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full"
            disabled={activeFiltersCount === 0}
          >
            フィルターをリセット
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
