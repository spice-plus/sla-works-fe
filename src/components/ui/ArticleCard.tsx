import Link from "next/link";
import { Calendar, Eye, Building2, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "../../utils/formatDate";
import { generateArticleUrl } from "../../utils/urlHelpers";

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
    viewCount: number;
    popularityScore: number;
    techStack?: string[];
    keywords: string[];
    articleType: 'process' | 'interview' | 'deliverable' | 'survey';
    categoryId: number;
    companyId: number;
  };
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  company?: {
    id: number;
    name: string;
    logoUrl: string;
  };
  showCompany?: boolean;
  className?: string;
}

// 記事タイプの日本語表示
const articleTypeMap = {
  process: 'プロセス',
  interview: 'インタビュー',
  deliverable: '成果物',
  survey: '調査',
};

export function ArticleCard({ 
  article, 
  category, 
  company, 
  showCompany = true, 
  className = "" 
}: ArticleCardProps) {
  return (
    <article className={`group hover:shadow-xl transition-all duration-300 ${className}`}>
      <Card className="h-full overflow-hidden">
        <div className="relative">
          <img 
            src={article.thumbnailUrl} 
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {category && (
            <div className="absolute top-4 left-4">
              <Badge variant="category" className="text-sm font-medium">
                {category.name}
              </Badge>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="text-xs">
              {articleTypeMap[article.articleType]}
            </Badge>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-[#2E3A97] transition-colors">
            <Link href={generateArticleUrl(article.id)}>
              {article.title}
            </Link>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
            {article.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(article.publishedAt, 'yyyy/M/d')}
            </div>
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {article.viewCount.toLocaleString('ja-JP')}
            </div>
            {showCompany && company && (
              <div className="flex items-center">
                <Building2 className="w-3 h-3 mr-1" />
                <Link 
                  href={`/companies/${company.id}`}
                  className="hover:text-[#2E3A97] font-medium truncate"
                >
                  {company.name}
                </Link>
              </div>
            )}
          </div>

          {/* 技術スタック */}
          {article.techStack && article.techStack.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {article.techStack.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="tech" className="text-xs px-2 py-0.5">
                    {tech}
                  </Badge>
                ))}
                {article.techStack.length > 3 && (
                  <span className="text-gray-500 text-xs self-center">
                    +{article.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-xs font-medium text-gray-700">
              人気度: {article.popularityScore}/10
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}