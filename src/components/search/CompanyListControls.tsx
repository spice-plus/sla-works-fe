"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typography } from "@/design/tokens/typography";
import type { CompanySearchState } from "../../types/company";

interface CompanyListControlsProps {
  searchState: CompanySearchState;
  onSearchChange: (updates: Partial<CompanySearchState>) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export function CompanyListControls({
  searchState,
  onSearchChange,
  onReset: _onReset,
  totalCount: _totalCount,
  filteredCount,
}: CompanyListControlsProps) {
  // 表示範囲の計算
  const startIndex =
    (searchState.currentPage - 1) * searchState.itemsPerPage + 1;
  const endIndex = Math.min(
    searchState.currentPage * searchState.itemsPerPage,
    filteredCount
  );

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-lg text-muted-foreground">
        {filteredCount > 0 ? (
          <>
            {startIndex}-{endIndex}社目 / 全{filteredCount}社
          </>
        ) : (
          "0社の開発会社が見つかりました"
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* 並び順 */}
        <div className="flex items-center gap-2">
          <span
            className={`${typography.variants.label} text-muted-foreground`}
          >
            並び順:
          </span>
          <Select
            value={
              searchState.sortBy === "articleCount" ? "articleCount" : "name"
            }
            onValueChange={(value) => {
              if (value === "articleCount") {
                onSearchChange({ sortBy: "articleCount", sortOrder: "desc" });
              } else {
                onSearchChange({ sortBy: "name", sortOrder: "asc" });
              }
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="articleCount">記事数順</SelectItem>
              <SelectItem value="name">開発会社名順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
