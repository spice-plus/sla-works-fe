"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getAllCategories } from "../../../masters/categories";

interface CategoryFilterProps {
  selectedCategories: number[];
  onChange: (categories: number[]) => void;
}

export function CategoryFilter({
  selectedCategories,
  onChange,
}: CategoryFilterProps) {
  const categories = getAllCategories();

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      onChange([...selectedCategories, categoryId]);
    } else {
      onChange(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">カテゴリ</Label>
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="flex items-center space-x-2"
          >
            <Checkbox
              id={`category-${category.categoryId}`}
              checked={selectedCategories.includes(category.categoryId)}
              onCheckedChange={(checked) =>
                handleCategoryChange(category.categoryId, checked as boolean)
              }
            />
            <Label
              htmlFor={`category-${category.categoryId}`}
              className="text-sm font-normal cursor-pointer"
            >
              {category.categoryName}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
