import {
  getArticleTypeById,
  getArticleTypeByRoman,
} from "../../masters/articleTypes";
import { getCategoryById, getCategoryByRoman } from "../../masters/categories";
import {
  getPrefectureByCode,
  getPrefectureByRoman,
} from "../../masters/prefectures";
import type { SearchFilters } from "../types/search";

/**
 * URLSearchParamsから検索フィルタを作成する
 */
export function parseSearchParamsToFilters(
  searchParams: URLSearchParams
): Partial<SearchFilters> {
  const filters: Partial<SearchFilters> = {};

  // キーワード検索
  const keyword = searchParams.get("keyword");
  if (keyword) {
    filters.keyword = keyword;
  }

  // 記事タイプ
  const type = searchParams.get("type");
  const articleType = searchParams.get("articleType");
  if (type) {
    const articleTypeData = getArticleTypeByRoman(type);
    if (articleTypeData) {
      filters.articleTypes = [articleTypeData.articleTypeId];
    }
  } else if (articleType) {
    const articleTypeData = getArticleTypeByRoman(articleType);
    if (articleTypeData) {
      filters.articleTypes = [articleTypeData.articleTypeId];
    }
  }

  // カテゴリ
  const category = searchParams.get("category");
  if (category) {
    const categoryData = getCategoryByRoman(category);
    if (categoryData) {
      filters.categories = [categoryData.categoryId];
    }
  }

  // 都道府県
  const prefecture = searchParams.get("prefecture");
  if (prefecture) {
    // Roman名から都道府県コードに変換
    const prefectureData = getPrefectureByRoman(prefecture);
    if (prefectureData) {
      filters.prefectures = [prefectureData.prefectureCode];
    }
  }

  // 企業名
  const company = searchParams.get("company");
  if (company) {
    filters.company = company;
  }

  return filters;
}

/**
 * URLSearchParamsからページ番号を取得する
 */
export function parsePageFromSearchParams(
  searchParams: URLSearchParams
): number {
  const page = searchParams.get("page");
  if (page) {
    const pageNumber = parseInt(page, 10);
    return pageNumber > 0 ? pageNumber : 1;
  }
  return 1;
}

/**
 * 検索フィルタからURLSearchParamsを作成する
 */
export function filtersToSearchParams(filters: SearchFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.keyword) {
    params.set("keyword", filters.keyword);
  }

  if (filters.articleTypes.length > 0) {
    // 最初の記事タイプのみ（単一選択）
    const articleTypeId = filters.articleTypes[0];
    const articleType = getArticleTypeById(articleTypeId);
    if (articleType) {
      params.set("type", articleType.articleTypeNameRoman);
    }
  }

  if (filters.categories.length > 0) {
    // 最初のカテゴリのみ（単一選択）
    const categoryId = filters.categories[0];
    const categoryData = getCategoryById(categoryId);
    if (categoryData) {
      params.set("category", categoryData.categoryNameRoman);
    }
  }

  if (filters.prefectures.length > 0) {
    // 都道府県コードからRoman名に変換
    const prefectureCode = filters.prefectures[0];
    const prefectureData = getPrefectureByCode(prefectureCode);
    if (prefectureData) {
      params.set("prefecture", prefectureData.prefectureNameRoman);
    }
  }

  if (filters.company) {
    params.set("company", filters.company);
  }

  return params;
}
