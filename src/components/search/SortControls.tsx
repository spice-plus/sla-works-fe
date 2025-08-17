"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { typography } from "@/design/tokens/typography";
import type { SortOption } from "../../types/search";

interface SortControlsProps {
  sortOptions: SortOption[];
  currentSort: string;
  onChange: (sort: string) => void;
  label?: string;
}

export function SortControls({
  sortOptions,
  currentSort,
  onChange,
  label = "並び順",
}: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`${typography.variants.label} whitespace-nowrap`}>{label}:</span>
      <Select value={currentSort} onValueChange={onChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
