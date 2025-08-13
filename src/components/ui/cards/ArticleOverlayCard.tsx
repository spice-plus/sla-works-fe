"use client";

import { Building2, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getArticleTypeByRoman } from "../../../../masters/articleTypes";
import { formatDate } from "../../../utils/formatDate";
import { generateArticleUrl } from "../../../utils/urlHelpers";

interface ArticleOverlayCardProps {
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

export function ArticleOverlayCard({
  article,
  category,
  company,
  className = "",
}: ArticleOverlayCardProps) {
  const articleTypeData = getArticleTypeByRoman(article.articleType);

  return (
    <Link href={generateArticleUrl(article.id)}>
      <Card
        className={`relative overflow-hidden group cursor-pointer ${className}`}
      >
        <div className="aspect-video relative">
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />

          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* トップバッジ */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {category && (
              <Badge
                variant="category"
                className="text-sm font-medium bg-white/90 text-gray-900"
              >
                {category.name}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="text-xs bg-black/50 text-white border-white/20"
            >
              {articleTypeData?.articleTypeName || article.articleType}
            </Badge>
          </div>

          {/* コンテンツオーバーレイ */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-200 transition-colors">
              {article.title}
            </h3>

            {/* メタデータ */}
            <div className="text-xs text-white/80">
              <div className="flex items-center gap-3 mb-1">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(article.publishedAt, "yyyy/M/d")}
                </div>
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {article.viewCount.toLocaleString("ja-JP")}
                </div>
              </div>
              {company && (
                <div className="flex items-center">
                  <Building2 className="w-3 h-3 mr-1" />
                  <span className="truncate">{company.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
