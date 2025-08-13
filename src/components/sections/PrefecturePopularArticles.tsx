"use client";

import { ArticleOverlayCard } from "@/components/ui/cards/ArticleOverlayCard";
import { sampleArticles } from "../../../sample/articles";
import { sampleCategories } from "../../../sample/categories";
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

  // カテゴリーと企業のマップを作成
  const categoryMap = new Map(sampleCategories.map((cat) => [cat.id, cat]));
  const companyMap = new Map(sampleCompanies.map((comp) => [comp.id, comp]));

  if (prefectureArticles.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">本社が{prefecture}の人気記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {prefectureArticles.map((article) => (
          <ArticleOverlayCard
            key={article.id}
            article={article}
            category={categoryMap.get(article.categoryId)}
            company={companyMap.get(article.companyId)}
          />
        ))}
      </div>
    </section>
  );
}
