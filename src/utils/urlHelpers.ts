/**
 * URL生成とスラッグ変換のヘルパー関数
 */

import { sampleArticles } from "../../sample/articles";
import { sampleCategories } from "../../sample/categories";
import { sampleCompanies } from "../../sample/companies";
import { prefectures } from "../../masters/prefectures";

/**
 * 記事詳細ページのURLを生成
 */
export function generateArticleUrl(articleId: number): string {
  const article = sampleArticles.find(a => a.id === articleId);
  if (!article) return `/articles/${articleId}`;

  const category = sampleCategories.find(c => c.id === article.categoryId);
  const company = sampleCompanies.find(c => c.id === article.companyId);
  
  if (!category || !company) return `/articles/${articleId}`;

  // 都道府県を会社の所在地から取得
  const prefecture = prefectures.find(p => company.prefecture === p.prefectureName);
  const prefectureSlug = prefecture ? prefecture.prefectureNameRoman.toLowerCase() : 'japan';
  
  return `/${prefectureSlug}/${category.slug}/${articleId}`;
}

/**
 * 都道府県名からスラッグを生成
 */
export function getPrefectureSlug(prefectureName: string): string {
  const prefecture = prefectures.find(p => p.prefectureName === prefectureName);
  return prefecture ? prefecture.prefectureNameRoman.toLowerCase() : 'japan';
}

/**
 * カテゴリIDからスラッグを取得
 */
export function getCategorySlug(categoryId: number): string {
  const category = sampleCategories.find(c => c.id === categoryId);
  return category ? category.slug : 'general';
}

/**
 * 記事IDから関連データを取得
 */
export function getArticleRelatedData(articleId: number) {
  const article = sampleArticles.find(a => a.id === articleId);
  if (!article) return null;

  const category = sampleCategories.find(c => c.id === article.categoryId);
  const company = sampleCompanies.find(c => c.id === article.companyId);
  
  return {
    article,
    category,
    company,
  };
}