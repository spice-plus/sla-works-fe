"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getAllArticleTypes } from "../../../masters/articleTypes";

interface ArticleTypeFilterProps {
  selectedArticleTypes: string[];
  onChange: (articleTypes: string[]) => void;
}

export function ArticleTypeFilter({
  selectedArticleTypes,
  onChange,
}: ArticleTypeFilterProps) {
  const articleTypes = getAllArticleTypes();

  const handleArticleTypeChange = (articleTypeId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedArticleTypes, articleTypeId]);
    } else {
      onChange(selectedArticleTypes.filter((id) => id !== articleTypeId));
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">記事タイプ</Label>
      <div className="space-y-2">
        {articleTypes.map((articleType) => (
          <div
            key={articleType.articleTypeId}
            className="flex items-center space-x-2"
          >
            <Checkbox
              id={`articleType-${articleType.articleTypeId}`}
              checked={selectedArticleTypes.includes(articleType.articleTypeId)}
              onCheckedChange={(checked) =>
                handleArticleTypeChange(
                  articleType.articleTypeId,
                  checked as boolean
                )
              }
            />
            <Label
              htmlFor={`articleType-${articleType.articleTypeId}`}
              className="text-sm font-normal cursor-pointer"
            >
              {articleType.articleTypeName}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
