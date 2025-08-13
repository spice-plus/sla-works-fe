"use client";

import { Building2, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
          <CardContent className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col h-full">
              <CardTitle className="line-clamp-2 text-lg mb-2 group-hover:text-[#2E3A97] transition-colors">
                {article.title}
              </CardTitle>

              <CardDescription className="line-clamp-2 mb-4 flex-grow">
                {article.description}
              </CardDescription>

              {/* メタデータ */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(article.publishedAt, "yyyy/M/d")}
                </div>
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {article.viewCount.toLocaleString("ja-JP")}
                </div>
                {company && (
                  <div className="flex items-center">
                    <Building2 className="w-3 h-3 mr-1" />
                    <span className="truncate">{company.name}</span>
                  </div>
                )}
              </div>

              {/* 技術スタック */}
              {article.techStack && article.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {article.techStack.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      variant="tech"
                      className="text-xs px-2 py-0.5"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {article.techStack.length > 4 && (
                    <span className="text-muted-foreground text-xs self-center">
                      +{article.techStack.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
