"use client";

import type { SortOption, ViewMode } from "../../types/search";
import { SortControls } from "./SortControls";
import { ViewToggle } from "./ViewToggle";

interface ArticleListControlsProps {
  totalCount: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (view: ViewMode) => void;
}

export function ArticleListControls({
  totalCount,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ArticleListControlsProps) {
  const sortOptions: SortOption[] = [
    { value: "publishedAt", label: "新着順" },
    { value: "viewCount", label: "閲覧数順" },
  ];

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-lg text-gray-600">
          {totalCount}件の記事が見つかりました
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
