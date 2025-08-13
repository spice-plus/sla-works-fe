"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CompanySearchState } from "../../types/company";
import { PrefectureSelector } from "./PrefectureSelector";
import { SearchInput } from "./SearchInput";

interface CompanyAdvancedSearchModalProps {
  searchState: CompanySearchState;
  onSearchChange: (updates: Partial<CompanySearchState>) => void;
  onReset: () => void;
  children: React.ReactNode;
}

export function CompanyAdvancedSearchModal({
  searchState,
  onSearchChange,
  onReset,
  children,
}: CompanyAdvancedSearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSearchState, setLocalSearchState] = useState(searchState);

  // モーダルが開かれた時に最新の検索状態を同期
  useEffect(() => {
    if (isOpen) {
      setLocalSearchState(searchState);
    }
  }, [isOpen, searchState]);

  const handleApply = () => {
    onSearchChange(localSearchState);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetState = {
      keyword: "",
      prefecture: "",
      prefectures: [],
      minArticleCount: 0,
      sortBy: "articleCount" as const,
      sortOrder: "desc" as const,
    };
    setLocalSearchState(resetState);
    onReset();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setLocalSearchState(searchState); // 元の状態に戻す
    setIsOpen(false);
  };

  const updateLocalSearch = (updates: Partial<CompanySearchState>) => {
    setLocalSearchState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-4xl h-[80vh] flex flex-col"
        suppressHydrationWarning
      >
        <DialogHeader>
          <DialogTitle>詳細検索</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="keyword" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="keyword">キーワード</TabsTrigger>
              <TabsTrigger value="articles">記事数</TabsTrigger>
              <TabsTrigger value="prefecture">都道府県</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="keyword" className="space-y-6 mt-6">
                {/* キーワード検索 */}
                <div>
                  <Label htmlFor="keyword" className="text-sm font-medium">
                    開発会社名で検索
                  </Label>
                  <div className="mt-2">
                    <SearchInput
                      placeholder="開発会社名を検索..."
                      value={localSearchState.keyword}
                      onChange={(value) =>
                        updateLocalSearch({ keyword: value })
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    開発会社名の一部を入力して検索できます
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="articles" className="space-y-6 mt-6">
                {/* 記事数フィルター */}
                <div>
                  <Label
                    htmlFor="minArticleCount"
                    className="text-sm font-medium"
                  >
                    最小記事数
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="minArticleCount"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={localSearchState.minArticleCount || ""}
                      onChange={(e) =>
                        updateLocalSearch({
                          minArticleCount: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    指定した記事数以上の開発会社のみ表示されます
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="prefecture" className="mt-6">
                <PrefectureSelector
                  selectedPrefectures={localSearchState.prefectures || []}
                  onChange={(prefectures) => updateLocalSearch({ prefectures })}
                />
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
            <Button onClick={handleApply} className="flex items-center gap-2">
              <span className="text-sm">🔍</span>
              検索
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
