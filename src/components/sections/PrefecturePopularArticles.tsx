"use client";

import { ArticleOverlayCard } from "@/components/ui/cards/ArticleOverlayCard";
import { categories, getCategoryById } from "../../../masters/categories";
import { getAllSystemNames } from "../../../masters/systemNames";
import { sampleArticles } from "../../../sample/articles";
import { sampleCompanies } from "../../../sample/companies";

interface PrefecturePopularArticlesProps {
  prefecture: string;
  currentCompanyId: number;
  maxArticles?: number;
}

export function PrefecturePopularArticles({
  prefecture,
  currentCompanyId,
  maxArticles = 6,
}: PrefecturePopularArticlesProps) {
  // 同じ都道府県の他企業の記事を取得
  const prefectureArticles = sampleArticles
    .filter((article) => {
      const company = sampleCompanies.find((c) => c.id === article.companyId);
      return (
        company &&
        company.prefecture === prefecture &&
        article.companyId !== currentCompanyId
      );
    })
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, maxArticles);

  // システム名からカテゴリIDを取得するためのマップ
  const systemNames = getAllSystemNames();
  const systemMap = new Map(systemNames.map((sys) => [sys.systemId, sys]));
  const companyMap = new Map(sampleCompanies.map((comp) => [comp.id, comp]));

  if (prefectureArticles.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">本社が{prefecture}の人気記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {prefectureArticles.map((article) => {
          // systemIdからcategoryIdを取得
          const system = systemMap.get(article.systemId);
          const category = system
            ? getCategoryById(system.categoryId)
            : undefined;

          // ArticleOverlayCardが期待する形式に変換
          const articleWithCategoryId = {
            ...article,
            categoryId: system?.categoryId || 0,
          };

          const categoryForCard = category
            ? {
                id: category.categoryId,
                name: category.categoryName,
                slug: category.categoryNameRoman,
              }
            : undefined;

          return (
            <ArticleOverlayCard
              key={article.id}
              article={articleWithCategoryId}
              category={categoryForCard}
              company={companyMap.get(article.companyId)}
            />
          );
        })}
      </div>
    </section>
  );
}
