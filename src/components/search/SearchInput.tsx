"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { typography } from "@/design/tokens/typography";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "検索...",
  label = "キーワード検索",
}: SearchInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="search-input" className={typography.variants.label}>
        {label}
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          id="search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
    </div>
  );
}
