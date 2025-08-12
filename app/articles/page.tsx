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
import { sampleArticles } from "../../sample/articles";
import { sampleCategories } from "../../sample/categories";
import { sampleCompanies } from "../../sample/companies";
import { Calendar, Eye, Building2, Tag } from "lucide-react";
import { formatDate } from "../../src/utils/formatDate";

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

  // プロジェクト規模の日本語表示
  const projectScaleMap = {
    small: '小規模',
    medium: '中規模', 
    large: '大規模',
    enterprise: 'エンタープライズ',
  };

  // 記事タイプの日本語表示
  const articleTypeMap = {
    process: 'プロセス',
    interview: 'インタビュー',
    deliverable: '成果物',
    survey: '調査',
  };

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
          const category = categoryMap[article.categoryId];
          const company = companyMap[article.companyId];
          
          return (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={article.thumbnailUrl} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                {category && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#2E3A97] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {category.name}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                    {projectScaleMap[article.projectScale]}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  <Link 
                    href={`/articles/${article.id}`}
                    className="hover:text-[#2E3A97] transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(article.publishedAt, 'yyyy/M/d')}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {article.viewCount.toLocaleString('ja-JP')}
                  </div>
                  {company && (
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      <Link 
                        href={`/companies/${company.id}`}
                        className="hover:text-[#2E3A97] font-medium"
                      >
                        {company.name}
                      </Link>
                    </div>
                  )}
                </div>

                {/* 技術スタック */}
                {article.techStack && article.techStack.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {article.techStack.slice(0, 3).map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {article.techStack.length > 3 && (
                        <span className="text-gray-500 text-xs">
                          +{article.techStack.length - 3}個
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* キーワード */}
                {article.keywords.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {article.keywords.slice(0, 2).map((keyword, index) => (
                        <span 
                          key={index}
                          className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs flex items-center"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {keyword}
                        </span>
                      ))}
                      {article.keywords.length > 2 && (
                        <span className="text-gray-500 text-xs">
                          +{article.keywords.length - 2}個
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      {articleTypeMap[article.articleType]}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    人気度: {article.popularityScore}/10
                  </div>
                </div>
              </div>
            </article>
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