"use client";

import type { SortOption, ViewMode } from "../../types/search";
import { SortControls } from "./SortControls";
import { ViewToggle } from "./ViewToggle";

interface ArticleListControlsProps {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (view: ViewMode) => void;
}

export function ArticleListControls({
  totalCount,
  currentPage,
  itemsPerPage,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ArticleListControlsProps) {
  const sortOptions: SortOption[] = [
    { value: "publishedAt", label: "新着順" },
    { value: "viewCount", label: "閲覧数順" },
  ];

  // 表示範囲の計算
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-lg text-gray-600">
          {totalCount > 0 ? (
            <>
              {startIndex}-{endIndex}件目 / 全{totalCount}件
            </>
          ) : (
            "0件の記事が見つかりました"
          )}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <SortControls
          sortOptions={sortOptions}
          currentSort={sortBy}
          onChange={onSortChange}
        />
        <ViewToggle view={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
}
