import type { Article } from "@/models/types";
import { categories } from "../../masters/categories";
import { sampleArticles } from "../../sample/articles";
import { getArticleRelatedData } from "./urlHelpers";

// 企業の人気記事を取得
export function getCompanyPopularArticles(
  companyId: number,
  limit: number = 3,
  excludeArticleId?: number
): Article[] {
  return sampleArticles
    .filter((article) => {
      if (article.companyId !== companyId) return false;
      if (excludeArticleId && article.id === excludeArticleId) return false;
      return true;
    })
    .sort((a, b) => b.viewCount - a.viewCount) // 閲覧数順でソート
    .slice(0, limit);
}

// おすすめ記事を取得（関連記事）
export function getRecommendedArticles(
  currentArticleId?: number,
  categoryId?: number,
  limit: number = 3
): Article[] {
  let articles = sampleArticles;

  // 現在の記事を除外
  if (currentArticleId) {
    articles = articles.filter((article) => article.id !== currentArticleId);
  }

  // カテゴリが指定されている場合は同じカテゴリの記事を優先
  if (categoryId) {
    const sameCategoryArticles = articles.filter(
      (article) => article.categoryId === categoryId
    );
    const otherArticles = articles.filter(
      (article) => article.categoryId !== categoryId
    );

    // 同じカテゴリの記事を優先し、足りない場合は他のカテゴリから補完
    articles = [
      ...sameCategoryArticles.slice(0, limit),
      ...otherArticles.slice(
        0,
        Math.max(0, limit - sameCategoryArticles.length)
      ),
    ];
  }

  return articles
    .sort((a, b) => b.viewCount - a.viewCount) // 閲覧数順でソート
    .slice(0, limit);
}

// カテゴリ別記事数を取得
export function getCategoryArticleCounts() {
  const counts: Record<number, number> = {};

  sampleArticles.forEach((article) => {
    counts[article.categoryId] = (counts[article.categoryId] || 0) + 1;
  });

  return categories.map((category) => ({
    id: parseInt(category.categoryId),
    name: category.categoryName,
    slug: category.categoryNameRoman,
    description: category.description,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    articleCount: counts[parseInt(category.categoryId)] || 0,
  }));
}

// タグ別記事数を取得
export function getTagArticleCounts() {
  const tagCounts: Record<string, number> = {};

  sampleArticles.forEach((article) => {
    article.keywords.forEach((keyword) => {
      tagCounts[keyword] = (tagCounts[keyword] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count); // 記事数順でソート
}

// 都道府県別記事数を取得
export function getPrefectureArticleCounts() {
  const prefectureCounts: Record<string, number> = {};

  sampleArticles.forEach((article) => {
    const relatedData = getArticleRelatedData(article.id);
    if (relatedData?.company?.prefecture) {
      const prefecture = relatedData.company.prefecture;
      prefectureCounts[prefecture] = (prefectureCounts[prefecture] || 0) + 1;
    }
  });

  return Object.entries(prefectureCounts)
    .map(([prefecture, count]) => ({ prefecture, count }))
    .sort((a, b) => b.count - a.count); // 記事数順でソート
}
