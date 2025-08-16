"use client";

import { FileText, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    establishedYear: number;
    employeeRange: string;
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
              <CardTitle className="line-clamp-2 text-base sm:text-lg mb-2 group-hover:text-[#2E3A97] transition-colors">
                {company.name}
              </CardTitle>

              <CardDescription className="line-clamp-2 mb-4 flex-grow hidden sm:block">
                {company.description}
              </CardDescription>

              {/* メタデータ */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {company.location}
                </div>
                <div className="flex items-center">
                  <FileText className="w-3 h-3 mr-1" />
                  {articleCount}件の記事
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
