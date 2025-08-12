import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sampleArticles } from "../sample/articles";
import { sampleCompanies } from "../sample/companies";
import { ArrowRight, Building2, FileText } from "lucide-react";

export default function Home() {
  // 最新の記事を3件取得
  const latestArticles = sampleArticles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  // 企業を3件取得
  const featuredCompanies = sampleCompanies.slice(0, 3);

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        {/* ヒーローセクション */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            技術記事プラットフォーム
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            最新の技術トレンドや実装事例を企業の実体験とともにお届けします。
            DX、AI、クラウド、セキュリティなど幅広い分野の記事をご覧いただけます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/articles">
                <FileText className="mr-2 h-5 w-5" />
                記事を読む
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/companies">
                <Building2 className="mr-2 h-5 w-5" />
                企業を見る
              </Link>
            </Button>
          </div>
        </section>

        {/* 最新記事セクション */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">最新記事</h2>
            <Button asChild variant="ghost">
              <Link href="/articles">
                すべて見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
                    <img
                      src={article.thumbnailUrl}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{new Date(article.publishedAt).toLocaleDateString('ja-JP')}</span>
                    <span>{article.viewCount.toLocaleString()} views</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.keywords.slice(0, 2).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/articles/${article.id}`}>
                      記事を読む
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 注目企業セクション */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">注目企業</h2>
            <Button asChild variant="ghost">
              <Link href="/companies">
                すべて見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {company.location} • {company.establishedYear}年設立
                      </p>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {company.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/companies/${company.id}`}>
                      企業詳細を見る
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}