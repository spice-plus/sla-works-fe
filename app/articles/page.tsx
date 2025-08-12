import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "../../src/components/ui/ArticleCard";
import { sampleArticles } from "../../sample/articles";
import { sampleCategories } from "../../sample/categories";
import { sampleCompanies } from "../../sample/companies";
import { Calendar, Eye, Building2, Tag } from "lucide-react";
import { formatDate } from "../../src/utils/formatDate";
import { generateArticleUrl } from "../../src/utils/urlHelpers";

export default function ArticlesPage() {
  const articles = sampleArticles;
  const categories = sampleCategories;
  const companies = sampleCompanies;

  // 記事を公開日順でソート
  const sortedArticles = articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // カテゴリーマップを作成
  const categoryMap = Object.fromEntries(categories.map(cat => [cat.id, cat]));
  
  // 企業マップを作成
  const companyMap = Object.fromEntries(companies.map(comp => [comp.id, comp]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          記事一覧
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          様々な企業の事例記事をご覧いただけます
        </p>
        <div className="text-sm text-gray-500">
          全 {articles.length} 件の記事
        </div>
      </div>

      {/* カテゴリフィルター */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">カテゴリ</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <span 
              key={category.id}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
      
      {/* 記事一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedArticles.map((article) => {
          return (
            <ArticleCard 
              key={article.id} 
              article={article}
              category={categoryMap[article.categoryId]}
              company={companyMap[article.companyId]}
            />
          );
        })}
      </div>

      {/* 統計情報 */}
      <div className="mt-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">記事統計</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E3A97] mb-2">
              {articles.length}
            </div>
            <div className="text-gray-600">総記事数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E3A97] mb-2">
              {articles.reduce((sum, article) => sum + article.viewCount, 0).toLocaleString('ja-JP')}
            </div>
            <div className="text-gray-600">総閲覧数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E3A97] mb-2">
              {companies.length}
            </div>
            <div className="text-gray-600">掲載企業数</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E3A97] mb-2">
              {(articles.reduce((sum, article) => sum + article.popularityScore, 0) / articles.length).toFixed(1)}
            </div>
            <div className="text-gray-600">平均人気度</div>
          </div>
        </div>
      </div>
    </div>
  );
}