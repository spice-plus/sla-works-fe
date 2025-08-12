import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sampleCompanies } from "../../../sample/companies";
import { sampleArticles } from "../../../sample/articles";
import { sampleCategories } from "../../../sample/categories";
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Users,
  FileText,
  Eye,
  Building2
} from "lucide-react";
import { formatDate } from "../../../src/utils/formatDate";

interface CompanyDetailPageProps {
  params: {
    id: string;
  };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const resolvedParams = await params;
  const companyId = parseInt(resolvedParams.id);
  const company = sampleCompanies.find(c => c.id === companyId);
  
  if (!company) {
    notFound();
  }

  // この企業の記事を取得
  const companyArticles = sampleArticles
    .filter(article => article.companyId === companyId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // カテゴリーマップを作成
  const categoryMap = new Map(sampleCategories.map(cat => [cat.id, cat]));

  // 従業員規模の表示用マッピング
  const employeeRangeLabels = {
    small: '1-50名',
    medium: '51-300名', 
    large: '301-1000名',
    enterprise: '1000名以上'
  };

  // 統計情報を計算
  const totalViews = companyArticles.reduce((sum, article) => sum + article.viewCount, 0);
  const avgPopularity = companyArticles.length > 0 
    ? (companyArticles.reduce((sum, article) => sum + article.popularityScore, 0) / companyArticles.length).toFixed(1)
    : 0;

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        {/* 戻るボタン */}
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/companies">
              <ArrowLeft className="mr-2 h-4 w-4" />
              企業一覧に戻る
            </Link>
          </Button>
        </div>

        {/* 企業ヘッダー */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* ロゴ */}
                <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* 企業情報 */}
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{company.name}</CardTitle>
                  <CardDescription className="text-lg mb-4">
                    {company.description}
                  </CardDescription>
                  
                  {/* 基本情報 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{company.establishedYear}年設立</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{employeeRangeLabels[company.employeeRange]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{companyArticles.length}件の記事</span>
                    </div>
                  </div>
                </div>
                
                {/* アクションボタン */}
                <div className="flex flex-col gap-2">
                  {company.websiteUrl && (
                    <Button asChild>
                      <Link href={company.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        公式サイト
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* 統計情報 */}
        {companyArticles.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  総記事数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyArticles.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  総閲覧数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalViews.toLocaleString('ja-JP')}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  平均人気度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgPopularity}/10</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Separator className="my-8" />

        {/* 記事一覧 */}
        <section>
          <h2 className="text-2xl font-bold mb-6">投稿記事</h2>
          
          {companyArticles.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">まだ記事が投稿されていません。</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {companyArticles.map((article) => {
                const category = categoryMap.get(article.categoryId);
                
                return (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      {/* サムネイル */}
                      <div className="md:w-80 md:flex-shrink-0">
                        <div className="aspect-video md:aspect-square md:h-full bg-muted overflow-hidden md:rounded-l-lg">
                          <img
                            src={article.thumbnailUrl}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* コンテンツ */}
                      <div className="flex-1">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            {category && (
                              <Badge variant="secondary">
                                {category.name}
                              </Badge>
                            )}
                            <Badge variant="outline">
                              {article.articleType}
                            </Badge>
                            <Badge variant="outline">
                              {article.projectScale}
                            </Badge>
                          </div>
                          
                          <CardTitle className="line-clamp-2 text-xl">
                            {article.title}
                          </CardTitle>
                          
                          <CardDescription className="line-clamp-3">
                            {article.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          {/* メタ情報 */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(article.publishedAt, 'yyyy/M/d')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {article.viewCount.toLocaleString('ja-JP')}
                            </div>
                          </div>
                          
                          {/* キーワード */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.keywords.slice(0, 3).map((keyword) => (
                              <span
                                key={keyword}
                                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                          
                          <Button asChild>
                            <Link href={`/articles/${article.id}`}>
                              記事を読む
                            </Link>
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}