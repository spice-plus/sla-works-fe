"use client";

import { Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ViewMode } from "../../types/search";

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center border rounded-lg p-1">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        className="h-8 w-8 p-0"
        title="グリッド表示"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className="h-8 w-8 p-0"
        title="リスト表示"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
