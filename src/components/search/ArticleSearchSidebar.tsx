"use client";

import { ChevronDown, ChevronUp, Search, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { typography } from "@/design/tokens/typography";
import { getAllArticleTypes } from "../../../masters/articleTypes";
import { getAllCategories } from "../../../masters/categories";
import { getPrefectureByCode } from "../../../masters/prefectures";
import type { SearchFilters } from "../../types/search";
import { AdvancedSearchModal } from "./AdvancedSearchModal";
import { ArticleTypeFilter } from "./ArticleTypeFilter";
import { CategoryFilter } from "./CategoryFilter";

interface ArticleSearchSidebarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  onReset: () => void;
  isAdvancedSearchOpen: boolean;
  onAdvancedSearchToggle: () => void;
}

export function ArticleSearchSidebar({
  filters,
  onFiltersChange,
  onSearch,
  onReset,
  isAdvancedSearchOpen,
  onAdvancedSearchToggle,
}: ArticleSearchSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoriesChange = (categories: number[]) => {
    onFiltersChange({ ...filters, categories });
  };

  const handleArticleTypesChange = (articleTypes: string[]) => {
    onFiltersChange({ ...filters, articleTypes });
  };

  // 現在の検索条件をサマリー表示用に整理
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.keyword.trim()) count++;
    if (filters.categories.length > 0) count++;
    if (filters.articleTypes.length > 0) count++;
    if (filters.prefectures.length > 0) count++;
    if (filters.company.trim()) count++;
    return count;
  };

  const getActiveFiltersText = () => {
    const filterTexts = [];

    if (filters.keyword.trim()) {
      filterTexts.push(`キーワード: ${filters.keyword}`);
    }

    if (filters.categories.length > 0) {
      const categories = getAllCategories();
      const categoryNames = filters.categories
        .map((id) => categories.find((c) => c.categoryId === id)?.categoryName)
        .filter(Boolean)
        .slice(0, 2);
      const text = categoryNames.join(", ");
      if (filters.categories.length > 2) {
        filterTexts.push(
          `カテゴリ: ${text} 他${filters.categories.length - 2}件`
        );
      } else {
        filterTexts.push(`カテゴリ: ${text}`);
      }
    }

    if (filters.articleTypes.length > 0) {
      const articleTypes = getAllArticleTypes();
      const typeNames = filters.articleTypes
        .map(
          (id) =>
            articleTypes.find((t) => t.articleTypeId === id)?.articleTypeName
        )
        .filter(Boolean)
        .slice(0, 2);
      const text = typeNames.join(", ");
      if (filters.articleTypes.length > 2) {
        filterTexts.push(
          `記事タイプ: ${text} 他${filters.articleTypes.length - 2}件`
        );
      } else {
        filterTexts.push(`記事タイプ: ${text}`);
      }
    }

    if (filters.prefectures.length > 0) {
      const prefNames = filters.prefectures
        .map((code) => getPrefectureByCode(code)?.prefectureName)
        .filter(Boolean)
        .slice(0, 2);
      const text = prefNames.join(", ");
      if (filters.prefectures.length > 2) {
        filterTexts.push(
          `都道府県: ${text} 他${filters.prefectures.length - 2}件`
        );
      } else {
        filterTexts.push(`都道府県: ${text}`);
      }
    }

    if (filters.company.trim()) {
      filterTexts.push(`開発会社: ${filters.company}`);
    }

    return filterTexts;
  };

  const activeFiltersCount = getActiveFiltersCount();
  const activeFiltersText = getActiveFiltersText();

  return (
    <>
      <Card className="sticky top-4">
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
          {/* カテゴリフィルター */}
          <CategoryFilter
            selectedCategories={filters.categories}
            onChange={handleCategoriesChange}
          />

          <Separator />

          {/* 記事タイプフィルター */}
          <ArticleTypeFilter
            selectedArticleTypes={filters.articleTypes}
            onChange={handleArticleTypesChange}
          />

          <Separator />

          {/* 詳細検索ボタン */}
          <Button
            variant="outline"
            onClick={onAdvancedSearchToggle}
            className="w-full flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            詳細検索
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {/* 現在の検索条件表示 */}
          {activeFiltersText.length > 0 && (
            <div className="space-y-2">
              <div
                className={`${typography.variants["body-small"]} font-medium text-muted-foreground`}
              >
                現在の検索条件:
              </div>
              <div className="space-y-1">
                {activeFiltersText.map((filter) => (
                  <div
                    key={filter}
                    className={`${typography.variants.caption} text-muted-foreground`}
                  >
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

      {/* 詳細検索モーダル */}
      <AdvancedSearchModal
        isOpen={isAdvancedSearchOpen}
        onClose={onAdvancedSearchToggle}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onSearch={onSearch}
      />
    </>
  );
}
