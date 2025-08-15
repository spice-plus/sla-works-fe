// 記事関連の型定義
export interface Article {
  id: number;
  companyId: number;
  purposeId: number;
  systemId: number;
  title: string;
  description: string;
  sourceUrl: string;
  thumbnailUrl: string;
  keywords: string[];
  isOriginal: boolean;
  publishedAt: string;
  viewCount: number;
  popularityScore: number;
  articleType: "process" | "interview" | "deliverable" | "survey";
  customerName?: string;
  createdAt: string;
  updatedAt: string;
}

// カテゴリー関連の型定義
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 企業関連の型定義
export interface Company {
  id: number;
  name: string;
  websiteUrl: string;
  logoUrl: string;
  description: string;
  location: string;
  prefecture: string;
  prefectureCode: string;
  createdAt: string;
  updatedAt: string;
}

// タグ関連の型定義
export interface Tag {
  id: number;
  name: string;
  slug: string;
  color: string;
  createdAt: string;
}
