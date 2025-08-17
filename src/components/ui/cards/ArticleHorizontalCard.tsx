"use client";

import { Building2, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getArticleTypeByRoman } from "../../../../masters/articleTypes";
import { formatDate } from "../../../utils/formatDate";
import { generateArticleUrl } from "../../../utils/urlHelpers";

interface ArticleHorizontalCardProps {
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
  className?: string;
}

export function ArticleHorizontalCard({
  article,
  category,
  company,
  className = "",
}: ArticleHorizontalCardProps) {
  const articleTypeData = getArticleTypeByRoman(article.articleType);

  return (
    <Link href={generateArticleUrl(article.id)}>
      <Card
        className={`hover:shadow-lg transition-all duration-300 cursor-pointer group mb-6 ${className}`}
      >
        <div className="flex">
          {/* 画像部分 */}
          <div className="w-32 sm:w-40 md:w-48 aspect-[4/3] bg-muted rounded-l-xl overflow-hidden flex-shrink-0 relative">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* カテゴリバッジ */}
            {category && (
              <div className="absolute top-2 left-2">
                <Badge variant="category" className="text-xs font-medium">
                  {category.name}
                </Badge>
              </div>
            )}
            {/* 記事タイプバッジ */}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs">
                {articleTypeData?.articleTypeName || article.articleType}
              </Badge>
            </div>
          </div>

          {/* コンテンツ部分 */}
          <CardContent className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col h-full">
              <CardTitle>
                <h3
                  className={`${typography.variants.h3} line-clamp-2 group-hover:text-primary transition-colors`}
                >
                  {article.title}
                </h3>
              </CardTitle>

              <div className={spacingTokens.variants.element}>
                <CardDescription>
                  <p
                    className={`${typography.variants["body-small"]} line-clamp-2 flex-grow hidden sm:block`}
                  >
                    {article.description}
                  </p>
                </CardDescription>
              </div>

              {/* メタデータ */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground">
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
                {company && (
                  <div className="flex items-center">
                    <Building2 className="w-3 h-3 mr-1" />
                    <span className={`${typography.variants.caption} truncate`}>
                      {company.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
