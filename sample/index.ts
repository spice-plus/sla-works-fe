// データアクセス用のヘルパー関数
import { sampleArticles } from './articles';
import { sampleCategories } from './categories';
import { sampleCompanies } from './companies';
import { sampleTags } from './tags';
import { Article, Category, Company, Tag } from '../../src/models/types';

// 記事関連
export function getArticleById(id: number): Article | undefined {
  return sampleArticles.find(article => article.id === id);
}

export function getArticlesByCompanyId(companyId: number): Article[] {
  return sampleArticles.filter(article => article.companyId === companyId);
}

export function getAllArticles(): Article[] {
  return sampleArticles;
}

// 企業関連
export function getCompanyById(id: number): Company | undefined {
  return sampleCompanies.find(company => company.id === id);
}

export function getAllCompanies(): Company[] {
  return sampleCompanies;
}

// カテゴリ関連
export function getCategoryById(id: number): Category | undefined {
  return sampleCategories.find(category => category.id === id);
}

export function getAllCategories(): Category[] {
  return sampleCategories;
}

// タグ関連
export function getTagById(id: number): Tag | undefined {
  return sampleTags.find(tag => tag.id === id);
}

export function getAllTags(): Tag[] {
  return sampleTags;
}

// 関連データを含む記事取得
export function getArticleWithRelatedData(id: number) {
  const article = getArticleById(id);
  if (!article) return null;

  const company = getCompanyById(article.companyId);
  const category = getCategoryById(article.categoryId);

  return {
    article,
    company,
    category,
  };
}

// 関連記事を含む企業取得
export function getCompanyWithRelatedData(id: number) {
  const company = getCompanyById(id);
  if (!company) return null;

  const articles = getArticlesByCompanyId(id);

  return {
    company,
    articles,
  };
}