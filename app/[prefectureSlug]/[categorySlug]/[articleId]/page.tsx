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
import { sampleArticles } from "../../../../sample/articles";
import { sampleCategories } from "../../../../sample/categories";
import { sampleCompanies } from "../../../../sample/companies";
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  Building2, 
  ExternalLink,
  Star,
  Users,
  Tag
} from "lucide-react";
import { formatDate } from "../../../../src/utils/formatDate";
import { generateArticleUrl, getArticleRelatedData } from "../../../../src/utils/urlHelpers";

export async function generateStaticParams() {
  // すべての記事に対してパラメータを生成
  return sampleArticles.map((article) => {
    const relatedData = getArticleRelatedData(article.id);
    if (!relatedData) return null;

    const { category, company } = relatedData;
    if (!category || !company) return null;

    // 都道府県スラッグを生成（会社の都道府県から）
    const prefectureSlug = company.prefecture === '東京都' ? 'tokyo' : 'japan';
    
    return {
      prefectureSlug,
      categorySlug: category.slug,
      articleId: article.id.toString(),
    };
  }).filter(Boolean);
}

interface ArticleDetailPageProps {
  params: {
    prefectureSlug: string;
    categorySlug: string;
    articleId: string;
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.articleId);
  const relatedData = getArticleRelatedData(articleId);
  
  if (!relatedData) {
    notFound();
  }

  const { article, category, company } = relatedData;
  
  // 関連記事を取得（同じカテゴリーの他の記事）
  const relatedArticles = sampleArticles
    .filter(a => a.categoryId === article.categoryId && a.id !== article.id)
    .slice(0, 3);

  // 日付フォーマット
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // プロジェクト規模の日本語表示
  const projectScaleMap = {
    small: '小規模',
    medium: '中規模',
    large: '大規模',
    enterprise: 'エンタープライズ',
  };

  // 記事タイプの日本語表示
  const articleTypeMap = {
    process: 'プロセス',
    interview: 'インタビュー',
    deliverable: '成果物',
    survey: '調査',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* パンくずナビ */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#2E3A97]">ホーム</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-[#2E3A97]">記事一覧</Link>
          <span>/</span>
          {category && (
            <>
              <Link href="/articles" className="hover:text-[#2E3A97]">{category.name}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 truncate">{article.title}</span>
        </div>
      </nav>

      {/* 記事ヘッダー */}
      <header className="mb-8">
        <div className="mb-4">
          {category && (
            <span className="inline-block bg-[#2E3A97] text-white px-3 py-1 rounded-full text-sm font-medium">
              {category.name}
            </span>
          )}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {publishedDate}
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            {article.viewCount.toLocaleString('ja-JP')} 回閲覧
          </div>
          {company && (
            <div className="flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              <Link 
                href={`/companies/${company.id}`}
                className="hover:text-[#2E3A97] font-medium"
              >
                {company.name}
              </Link>
            </div>
          )}
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          {article.description}
        </p>
      </header>

      {/* メイン画像 */}
      <div className="mb-8">
        <img 
          src={article.thumbnailUrl} 
          alt={article.title}
          className="w-full h-96 md:h-[32rem] object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* 記事詳細情報 */}
      <Card className="mb-8">
        <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">プロジェクト詳細</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {article.customerName && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">顧客</h3>
              <p className="text-gray-700">{article.customerName}</p>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">プロジェクト規模</h3>
            <p className="text-gray-700">{projectScaleMap[article.projectScale]}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">記事タイプ</h3>
            <p className="text-gray-700">{articleTypeMap[article.articleType]}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">人気度スコア</h3>
            <p className="text-gray-700">{article.popularityScore}/10</p>
          </div>
        </div>

        {/* 技術スタック */}
        {article.techStack && article.techStack.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">使用技術</h3>
            <div className="flex flex-wrap gap-2">
              {article.techStack.map((tech, index) => (
                <Badge
                  key={index}
                  variant="tech"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* キーワード */}
        {article.keywords.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">キーワード</h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="keyword"
                  className="flex items-center"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}
        </CardContent>
      </Card>

      {/* 元記事リンク */}
      {article.sourceUrl && (
        <Card className="mb-8 bg-gray-50">
          <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">詳細情報</h3>
          <p className="text-gray-700 mb-4">
            この事例の詳細については、元記事をご覧ください。
          </p>
          <Button asChild size="xl" className="font-semibold">
            <a 
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            >
              <ExternalLink className="w-5 h-5 mr-3" />
              元記事を読む
            </a>
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            外部サイトに移動します
          </p>
          </CardContent>
        </Card>
      )}

      {/* 企業情報 */}
      {company && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">企業情報</h2>
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
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
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
                    <Link href={generateArticleUrl(relatedArticle.id)}>
                      記事を読む
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* ナビゲーション */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Link 
          href="/articles"
          className="inline-flex items-center text-[#2E3A97] hover:text-[#1E2875] font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          記事一覧に戻る
        </Link>
        
        {company && (
          <Link 
            href={`/companies/${company.id}`}
            className="inline-flex items-center text-[#2E3A97] hover:text-[#1E2875] font-medium"
          >
            {company.name}の詳細
            <Building2 className="w-4 h-4 ml-2" />
          </Link>
        )}
      </div>
    </div>
  );
}