import { Building2, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticleTypeByRoman } from "../../../masters/articleTypes";
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
    techStack?: string[];
    keywords: string[];
    articleType: "process" | "interview" | "deliverable" | "survey";
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

export function ArticleCard({
  article,
  category,
  company,
  showCompany = true,
  className = "",
}: ArticleCardProps) {
  const articleTypeData = getArticleTypeByRoman(article.articleType);
  return (
    <Link href={generateArticleUrl(article.id)}>
      <article
        className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${className}`}
      >
        <Card className="h-full overflow-hidden">
          <div className="relative">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              width={400}
              height={192}
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
                {articleTypeData?.articleTypeName || article.articleType}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-[#2E3A97] transition-colors">
              {article.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(article.publishedAt, "yyyy/M/d")}
              </div>
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                {article.viewCount.toLocaleString("ja-JP")}
              </div>
            </div>

            {/* 会社名表示 */}
            {showCompany && company && (
              <div className="mb-3">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    {company.name}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </article>
    </Link>
  );
}
