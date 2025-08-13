"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SearchFilters } from "../../types/search";
import { ArticleTypeFilter } from "./ArticleTypeFilter";
import { CategoryFilter } from "./CategoryFilter";
import { PrefectureSelector } from "./PrefectureSelector";
import { SearchInput } from "./SearchInput";

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
}

export function AdvancedSearchModal({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onSearch,
}: AdvancedSearchModalProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  // モーダルが開かれた時に最新のフィルターを同期
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
    }
  }, [isOpen, filters]);

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      keyword: "",
      categories: [],
      articleTypes: [],
      prefectures: [],
      company: "",
    };
    setLocalFilters(resetFilters);
  };

  const handleSearch = () => {
    onFiltersChange(localFilters);
    onSearch();
    onClose();
  };

  const handleCancel = () => {
    setLocalFilters(filters); // 元の状態に戻す
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl h-[80vh] flex flex-col"
        suppressHydrationWarning
      >
        <DialogHeader>
          <DialogTitle>詳細検索</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs
            defaultValue="categories"
            className="w-full h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="categories">カテゴリ</TabsTrigger>
              <TabsTrigger value="articleTypes">記事タイプ</TabsTrigger>
              <TabsTrigger value="prefectures">都道府県</TabsTrigger>
              <TabsTrigger value="keyword">キーワード</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="categories" className="mt-6">
                <CategoryFilter
                  selectedCategories={localFilters.categories}
                  onChange={(categories) =>
                    setLocalFilters({ ...localFilters, categories })
                  }
                />
              </TabsContent>

              <TabsContent value="articleTypes" className="mt-6">
                <ArticleTypeFilter
                  selectedArticleTypes={localFilters.articleTypes}
                  onChange={(articleTypes) =>
                    setLocalFilters({ ...localFilters, articleTypes })
                  }
                />
              </TabsContent>

              <TabsContent value="prefectures" className="mt-6">
                <PrefectureSelector
                  selectedPrefectures={localFilters.prefectures}
                  onChange={(prefectures) =>
                    setLocalFilters({ ...localFilters, prefectures })
                  }
                />
              </TabsContent>

              <TabsContent value="keyword" className="mt-6">
                <SearchInput
                  value={localFilters.keyword}
                  onChange={(keyword) =>
                    setLocalFilters({ ...localFilters, keyword })
                  }
                  placeholder="記事タイトルを検索..."
                  label="記事を検索"
                />
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    記事タイトルの一部を入力して検索できます
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            リセット
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              キャンセル
            </Button>
            <Button onClick={handleSearch} className="flex items-center gap-2">
              <span className="text-sm">🔍</span>
              検索
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
