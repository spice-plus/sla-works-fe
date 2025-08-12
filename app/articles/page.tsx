import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleArticles } from "../../sample/articles";
import { sampleCategories } from "../../sample/categories";
import { sampleCompanies } from "../../sample/companies";
import { Eye, Calendar, Building2 } from "lucide-react";
import { formatDate } from "../../src/utils/formatDate";

export default function ArticlesPage() {
  // 記事を公開日順でソート
  const sortedArticles = sampleArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // カテゴリーマップを作成
  const categoryMap = new Map(sampleCategories.map(cat => [cat.id, cat]));
  
  // 企業マップを作成
  const companyMap = new Map(sampleCompanies.map(comp => [comp.id, comp]));

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        {/* ヘッダーセクション */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">記事一覧</h1>
          <p className="text-muted-foreground">
            技術記事の一覧です。最新の技術トレンドや実装事例をご覧いただけます。
          </p>
        </div>

        {/* 記事一覧 */}
        <div className="grid gap-6">
          {sortedArticles.map((article) => {
            const category = categoryMap.get(article.categoryId);
            const company = companyMap.get(article.companyId);
            
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
                        {company && (
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {company.name}
                          </div>
                        )}
                      </div>
                      
                      {/* キーワード */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      {/* 技術スタック */}
                      {article.techStack && article.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
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
      </div>
    </div>
  );
}