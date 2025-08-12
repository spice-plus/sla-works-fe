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
import { sampleArticles } from "../../../sample/articles";
import { sampleCategories } from "../../../sample/categories";
import { sampleCompanies } from "../../../sample/companies";
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  Building2, 
  ExternalLink,
  Star,
  Users
} from "lucide-react";
import { formatDate } from "../../../src/utils/formatDate";

interface ArticleDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.id);
  const article = sampleArticles.find(a => a.id === articleId);
  
  if (!article) {
    notFound();
  }

  // 関連データを取得
  const category = sampleCategories.find(c => c.id === article.categoryId);
  const company = sampleCompanies.find(c => c.id === article.companyId);
  
  // 関連記事を取得（同じカテゴリーの他の記事）
  const relatedArticles = sampleArticles
    .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        {/* 戻るボタン */}
        <div className="mb-6">
          <Button asChild variant="ghost">
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              記事一覧に戻る
            </Link>
          </Button>
        </div>

        {/* メイン記事 */}
        <article>
          {/* ヘッダー */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
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
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {article.description}
            </p>
            
            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt, 'yyyy/M/d')}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {article.viewCount.toLocaleString('ja-JP')} views
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {article.popularityScore}/10
              </div>
              {company && (
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <Link 
                    href={`/companies/${company.id}`}
                    className="hover:underline"
                  >
                    {company.name}
                  </Link>
                </div>
              )}
            </div>
            
            {/* サムネイル */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
              <img
                src={article.thumbnailUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* 記事情報カード */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 技術スタック */}
            {article.techStack && article.techStack.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">使用技術</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {article.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* プロジェクト情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">プロジェクト情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">規模:</span>
                  <span>{article.projectScale}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">種類:</span>
                  <span>{article.articleType}</span>
                </div>
                {article.customerName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">顧客:</span>
                    <span>{article.customerName}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* キーワード */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">キーワード</h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 元記事リンク */}
          {article.sourceUrl && (
            <div className="mb-8">
              <Button asChild>
                <Link href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  元記事を読む
                </Link>
              </Button>
            </div>
          )}
        </article>

        <Separator className="my-8" />

        {/* 企業情報 */}
        {company && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">企業情報</h2>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription>
                      {company.location} • {company.establishedYear}年設立
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{company.description}</p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href={`/companies/${company.id}`}>
                      企業詳細を見る
                    </Link>
                  </Button>
                  {company.websiteUrl && (
                    <Button asChild variant="outline">
                      <Link href={company.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        公式サイト
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* 関連記事 */}
        {relatedArticles.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">関連記事</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card key={relatedArticle.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
                      <img
                        src={relatedArticle.thumbnailUrl}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="line-clamp-2 text-lg">
                      {relatedArticle.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {relatedArticle.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{formatDate(relatedArticle.publishedAt, 'yyyy/M/d')}</span>
                      <span>{relatedArticle.viewCount.toLocaleString('ja-JP')} views</span>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/articles/${relatedArticle.id}`}>
                        記事を読む
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}