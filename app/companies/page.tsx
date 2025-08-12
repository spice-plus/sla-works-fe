import { Calendar, ExternalLink, FileText, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sampleArticles } from "../../sample/articles";
import { sampleCompanies } from "../../sample/companies";

export default function CompaniesPage() {
  // 企業を名前順でソート
  const sortedCompanies = sampleCompanies.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // 各企業の記事数を計算
  const articleCountMap = new Map();
  sampleArticles.forEach((article) => {
    const count = articleCountMap.get(article.companyId) || 0;
    articleCountMap.set(article.companyId, count + 1);
  });

  // 従業員規模の表示用マッピング
  const employeeRangeLabels = {
    small: "1-50名",
    medium: "51-300名",
    large: "301-1000名",
    enterprise: "1000名以上",
  };

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        {/* ヘッダーセクション */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">企業一覧</h1>
          <p className="text-muted-foreground">
            技術記事を投稿している企業の一覧です。各企業の詳細情報や投稿記事をご覧いただけます。
          </p>
        </div>

        {/* 企業一覧 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCompanies.map((company) => {
            const articleCount = articleCountMap.get(company.id) || 0;

            return (
              <Card
                key={company.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  {/* ロゴと基本情報 */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">
                        {company.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{company.location}</span>
                      </div>
                    </div>
                  </div>

                  <CardDescription className="line-clamp-3">
                    {company.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* 企業情報 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">設立年:</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{company.establishedYear}年</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">規模:</span>
                      <Badge variant="outline" className="text-xs">
                        {
                          employeeRangeLabels[
                            company.employeeRange as keyof typeof employeeRangeLabels
                          ]
                        }
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">記事数:</span>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>{articleCount}件</span>
                      </div>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/companies/${company.id}`}>詳細を見る</Link>
                    </Button>

                    {company.websiteUrl && (
                      <Button asChild variant="outline" size="icon">
                        <Link
                          href={company.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="公式サイト"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
