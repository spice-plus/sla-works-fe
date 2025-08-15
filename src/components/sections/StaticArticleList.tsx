"use client";

import Link from "next/link";
import { getAllCategories } from "../../../masters/categories";
import { sampleCompanies } from "../../../sample/companies";
import type { Article } from "../../models/types";
import { ArticleGrid } from "../search/ArticleGrid";
import { Button } from "../ui/button";

interface StaticArticleListProps {
  articles: Article[];
  title?: string;
  emptyMessage: string;
}

export function StaticArticleList({
  articles,
  title: _title,
  emptyMessage,
}: StaticArticleListProps) {
  const categories = getAllCategories();
  const companies = sampleCompanies;

  // カテゴリーマップを作成（categoryIdをキーとする）
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.categoryId, cat])
  );

  // 企業マップを作成
  const companyMap = Object.fromEntries(
    companies.map((comp) => [comp.id, comp])
  );

  return (
    <div className="space-y-8">
      {/* 記事数とアクションボタン */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {articles.length > 0 ? (
            <span>{articles.length}件の事例が見つかりました</span>
          ) : (
            <span>該当する事例はありません</span>
          )}
        </div>
        <Link href="/articles">
          <Button variant="outline">すべての記事を検索する</Button>
        </Link>
      </div>

      {/* 記事一覧 */}
      {articles.length > 0 ? (
        <ArticleGrid
          articles={articles}
          categories={categoryMap}
          companies={companyMap}
          viewMode="grid"
        />
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">{emptyMessage}</div>
          <Link href="/articles">
            <Button>すべての記事を見る</Button>
          </Link>
        </div>
      )}

      {/* フッターアクション */}
      {articles.length > 0 && (
        <div className="text-center pt-8">
          <Link href="/articles">
            <Button size="lg">詳細検索・フィルタ機能を使う</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
