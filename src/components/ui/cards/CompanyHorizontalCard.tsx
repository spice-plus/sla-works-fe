"use client";

import { FileText, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { generateCompanyUrl } from "@/utils/urlHelpers";

interface CompanyHorizontalCardProps {
  company: {
    id: number;
    name: string;
    description: string;
    logoUrl: string;
    location: string;
    websiteUrl?: string;
  };
  articleCount: number;
  className?: string;
}

export function CompanyHorizontalCard({
  company,
  articleCount,
  className = "",
}: CompanyHorizontalCardProps) {
  return (
    <Link href={generateCompanyUrl(company.id)}>
      <Card
        className={`hover:shadow-lg transition-all duration-300 cursor-pointer group mb-6 ${className}`}
      >
        <div className="flex">
          {/* ロゴ部分 */}
          <div className="w-32 sm:w-40 md:w-48 aspect-[4/3] bg-muted rounded-l-xl overflow-hidden flex-shrink-0 relative">
            <Image
              src={company.logoUrl}
              alt={`${company.name} logo`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* コンテンツ部分 */}
          <CardContent className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col h-full">
              <CardTitle>
                <h4
                  className={`${typography.variants.h4} line-clamp-2 group-hover:text-primary transition-colors`}
                >
                  {company.name}
                </h4>
              </CardTitle>

              <div className={spacingTokens.variants.element}>
                <CardDescription>
                  <p
                    className={`${typography.variants["body-small"]} line-clamp-2 flex-grow hidden sm:block`}
                  >
                    {company.description}
                  </p>
                </CardDescription>
              </div>

              {/* メタデータ */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className={typography.variants.caption}>{company.location}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="w-3 h-3 mr-1" />
                  <span className={typography.variants.caption}>
                    {articleCount}件の記事
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
