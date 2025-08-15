/**
 * URL生成とスラッグ変換のヘルパー関数
 */

import { getCategoryById } from "../../masters/categories";
import { getPrefectureByRoman, prefectures } from "../../masters/prefectures";
import { getPurposeById } from "../../masters/purposes";
import { getSystemNameById } from "../../masters/systemNames";
import { sampleArticles } from "../../sample/articles";
import { sampleCompanies } from "../../sample/companies";

/**
 * 記事詳細ページのURLを生成
 */
export function generateArticleUrl(articleId: number): string {
  const article = sampleArticles.find((a) => a.id === articleId);
  if (!article || !article.systemId) return `/articles/${articleId}`;

  // systemIdからカテゴリを取得
  const systemName = getSystemNameById(article.systemId);
  const category = systemName ? getCategoryById(systemName.categoryId) : null;
  const company = sampleCompanies.find((c) => c.id === article.companyId);

  if (!category || !company) return `/articles/${articleId}`;

  // 都道府県を会社の所在地から取得
  const prefecture = prefectures.find(
    (p) => company.prefecture === p.prefectureName
  );
  const prefectureSlug = prefecture ? prefecture.prefectureNameRoman : "japan";

  return `/articles/${prefectureSlug}/article/${articleId}`;
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
  const category = getCategoryById(categoryId);
  return category ? category.categoryNameRoman : "general";
}

/**
 * 企業詳細ページのURLを生成
 */
export function generateCompanyUrl(companyId: number): string {
  const company = sampleCompanies.find((c) => c.id === companyId);
  if (!company) return `/companies/${companyId}`;

  const prefectureSlug = getPrefectureSlug(company.prefecture);
  return `/companies/${prefectureSlug}/${companyId}`;
}

/**
 * 都道府県別記事一覧ページのURLを生成
 */
export function generatePrefectureArticlesUrl(prefectureName: string): string {
  const prefectureSlug = getPrefectureSlug(prefectureName);
  return `/articles/${prefectureSlug}`;
}

/**
 * 都道府県×カテゴリ別記事一覧ページのURLを生成
 */
export function generatePrefectureCategoryArticlesUrl(
  prefectureName: string,
  categoryId: number
): string {
  const prefectureSlug = getPrefectureSlug(prefectureName);
  const category = getCategoryById(categoryId);
  const categorySlug = category ? category.categoryNameRoman : "general";
  return `/articles/${prefectureSlug}/${categorySlug}`;
}

/**
 * URLパラメータから都道府県情報を取得
 */
export function getPrefectureFromSlug(prefectureSlug: string) {
  const normalizedSlug =
    prefectureSlug.charAt(0).toUpperCase() + prefectureSlug.slice(1);
  return getPrefectureByRoman(normalizedSlug);
}

/**
 * 記事IDから関連データを取得
 */
export function getArticleRelatedData(articleId: number) {
  const article = sampleArticles.find((a) => a.id === articleId);
  if (!article) return null;

  // systemIdからカテゴリを取得
  const systemName = getSystemNameById(article.systemId);
  const categoryMaster = systemName
    ? getCategoryById(systemName.categoryId)
    : null;
  const company = sampleCompanies.find((c) => c.id === article.companyId);

  // 目的を取得
  const purpose = getPurposeById(article.purposeId);

  // マスタデータを既存の型に変換
  const category = categoryMaster
    ? {
        id: categoryMaster.categoryId,
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
    systemName,
    purpose,
  };
}
