import { Building2, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
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
                <Badge variant="category">{category.name}</Badge>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <Badge variant="secondary">
                {articleTypeData?.articleTypeName || article.articleType}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            <div className={spacingTokens.variants.element}>
              <p
                className={`${typography.variants["body-small"]} text-gray-600 line-clamp-2`}
              >
                {article.description}
              </p>
            </div>

            <div className={spacingTokens.variants.element}>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className={typography.variants.caption}>
                    {formatDate(article.publishedAt, "yyyy/M/d")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  <span className={typography.variants.caption}>
                    {article.viewCount.toLocaleString("ja-JP")}
                  </span>
                </div>
              </div>
            </div>

            {/* 会社名表示 */}
            {showCompany && company && (
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                <span
                  className={`${typography.variants["body-small"]} font-medium text-gray-700`}
                >
                  {company.name}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </article>
    </Link>
  );
}
