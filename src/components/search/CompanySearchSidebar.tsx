"use client";

import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { typography } from "@/design/tokens/typography";
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
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className="lg:w-80 space-y-6">
      <Card>
        {/* モバイル用の折りたたみヘッダー */}
        <CardHeader className="lg:block">
          <div className="flex items-center justify-between">
            <CardTitle>検索・フィルター</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
              aria-label="検索フィルターを開閉"
            >
              <Search className="w-4 h-4 mr-1" />
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full mr-1">
                  {activeFiltersCount}
                </span>
              )}
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>

        {/* 検索フィルター内容 */}
        <CardContent
          className={`space-y-6 ${isExpanded ? "block" : "hidden lg:block"}`}
        >
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
              <span
                className={`${typography.variants["body-small"]} font-medium text-muted-foreground`}
              >
                現在の検索条件:
              </span>
              <div className="space-y-1">
                {activeFiltersText.map((filter) => (
                  <span
                    key={filter}
                    className={`${typography.variants.caption} text-muted-foreground`}
                  >
                    {filter}
                  </span>
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
