"use client";

import {
  ArticleHorizontalCard,
  ArticleOverlayCard,
} from "@/components/ui/cards";
import type { Category } from "../../../masters/categories";
import { getSystemNameById } from "../../../masters/systemNames";
import type { Article, Company } from "../../models/types";
import type { ViewMode } from "../../types/search";

interface ArticleGridProps {
  articles: Article[];
  categories: Record<number, Category>;
  companies: Record<number, Company>;
  viewMode: ViewMode;
}

export function ArticleGrid({
  articles,
  categories,
  companies,
  viewMode,
}: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          記事が見つかりませんでした
        </h3>
        <p className="text-gray-500">検索条件を変更して再度お試しください</p>
      </div>
    );
  }

  const gridClassName =
    viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "";

  return (
    <div className={gridClassName}>
      {articles.map((article) => {
        // systemIdからcategoryIdを取得
        const systemName = getSystemNameById(article.systemId);
        const categoryData = systemName
          ? categories[systemName.categoryId]
          : undefined;
        const company = companies[article.companyId];

        // ArticleCardが期待する形式にカテゴリを変換
        const category = categoryData
          ? {
              id: categoryData.categoryId,
              name: categoryData.categoryName,
              slug: categoryData.categoryNameRoman,
            }
          : undefined;

        // ArticleOverlayCardが期待する形式に変換
        const articleWithCategoryId = {
          ...article,
          categoryId: categoryData?.categoryId || 0,
        };

        return viewMode === "grid" ? (
          <ArticleOverlayCard
            key={article.id}
            article={articleWithCategoryId}
            category={category}
            company={company}
          />
        ) : (
          <ArticleHorizontalCard
            key={article.id}
            article={articleWithCategoryId}
            category={category}
            company={company}
          />
        );
      })}
    </div>
  );
}
