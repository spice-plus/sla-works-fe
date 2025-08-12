/**
 * URL生成とスラッグ変換のヘルパー関数
 */

import { getCategoryById } from "../../masters/categories";
import { prefectures } from "../../masters/prefectures";
import { sampleArticles } from "../../sample/articles";
import { sampleCompanies } from "../../sample/companies";

/**
 * 記事詳細ページのURLを生成
 */
export function generateArticleUrl(articleId: number): string {
  const article = sampleArticles.find((a) => a.id === articleId);
  if (!article) return `/articles/${articleId}`;

  const category = getCategoryById(article.categoryId.toString());
  const company = sampleCompanies.find((c) => c.id === article.companyId);

  if (!category || !company) return `/articles/${articleId}`;

  // 都道府県を会社の所在地から取得
  const prefecture = prefectures.find(
    (p) => company.prefecture === p.prefectureName
  );
  const prefectureSlug = prefecture
    ? prefecture.prefectureNameRoman.toLowerCase()
    : "japan";

  return `/articles/${prefectureSlug}/${category.categoryNameRoman}/${articleId}`;
}

/**
 * 都道府県名からスラッグを生成
 */
export function getPrefectureSlug(prefectureName: string): string {
  const prefecture = prefectures.find(
    (p) => p.prefectureName === prefectureName
  );
  return prefecture ? prefecture.prefectureNameRoman.toLowerCase() : "japan";
}

/**
 * カテゴリIDからスラッグを取得
 */
export function getCategorySlug(categoryId: number): string {
  const category = getCategoryById(categoryId.toString());
  return category ? category.categoryNameRoman : "general";
}

/**
 * 記事IDから関連データを取得
 */
export function getArticleRelatedData(articleId: number) {
  const article = sampleArticles.find((a) => a.id === articleId);
  if (!article) return null;

  const categoryMaster = getCategoryById(article.categoryId.toString());
  const company = sampleCompanies.find((c) => c.id === article.companyId);

  // マスタデータを既存の型に変換
  const category = categoryMaster
    ? {
        id: parseInt(categoryMaster.categoryId),
        name: categoryMaster.categoryName,
        slug: categoryMaster.categoryNameRoman,
        description: categoryMaster.description,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      }
    : undefined;

  return {
    article,
    category,
    company,
  };
}
