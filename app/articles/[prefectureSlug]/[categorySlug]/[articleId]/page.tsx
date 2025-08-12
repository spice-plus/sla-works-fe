import { Building2, Calendar, Eye, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SourceArticleButton } from "@/components/article";
import { BackButton, Breadcrumb } from "@/components/navigation";
import {
  CategoryExplorer,
  CompanyPopularArticles,
  PrefectureExplorer,
  RecommendedArticles,
  TagExplorer,
} from "@/components/sections";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getArticleTypeByRoman } from "../../../../../masters/articleTypes";
import { sampleArticles } from "../../../../../sample/articles";
import {
  getArticleRelatedData,
  getPrefectureSlug,
} from "../../../../../src/utils/urlHelpers";

export async function generateStaticParams() {
  // すべての記事に対してパラメータを生成
  return sampleArticles
    .map((article) => {
      const relatedData = getArticleRelatedData(article.id);
      if (!relatedData) return null;

      const { category, company } = relatedData;
      if (!category || !company) return null;

      // 都道府県スラッグを生成（会社の都道府県から）
      const prefectureSlug = getPrefectureSlug(company.prefecture);

      return {
        prefectureSlug,
        categorySlug: category.slug,
        articleId: article.id.toString(),
      };
    })
    .filter(Boolean);
}

interface ArticleDetailPageProps {
  params: Promise<{
    prefectureSlug: string;
    categorySlug: string;
    articleId: string;
  }>;
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.articleId);
  const relatedData = getArticleRelatedData(articleId);

  if (!relatedData) {
    notFound();
  }

  const { article, category, company } = relatedData;

  // 日付フォーマット
  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    "ja-JP",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // 記事タイプ情報
  const articleTypeData = getArticleTypeByRoman(article.articleType);

  // 記事タイプごとの色を定義
  const getTypeColor = (type: string) => {
    switch (type) {
      case "process":
        return "bg-blue-500 text-white";
      case "interview":
        return "bg-green-500 text-white";
      case "deliverable":
        return "bg-purple-500 text-white";
      case "survey":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* パンくずナビ */}
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "記事一覧", href: "/articles" },
          ...(category ? [{ label: category.name, href: "/articles" }] : []),
          { label: article.title, current: true },
        ]}
      />

      {/* 記事ヘッダー */}
      <header className="mb-8">
        {/* カテゴリと記事タイプ */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {category && (
            <span className="inline-block bg-[#2E3A97] text-white px-3 py-1 rounded-full text-sm font-medium">
              {category.name}
            </span>
          )}
          {articleTypeData && (
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(article.articleType)}`}
            >
              {articleTypeData.articleTypeName}
            </span>
          )}
        </div>

        {/* タイトル */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>
      </header>

      {/* メタデータ */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {publishedDate}
        </div>

        <div className="flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          {article.viewCount.toLocaleString("ja-JP")} 回閲覧
        </div>
      </div>

      {/* メイン画像と企業情報 */}
      <div className="mb-8">
        {/* メイン画像 */}
        <div className="mb-6">
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            width={800}
            height={448}
            className="w-full h-80 md:h-[28rem] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* 企業情報 */}
        {company && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
              <Image
                src={company.logoUrl}
                alt={`${company.name} logo`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{company.name}</h3>
              <p className="text-sm text-gray-600">
                {company.location} • {company.establishedYear}年設立
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 記事詳細情報 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          プロジェクト詳細
        </h2>

        {/* 説明文 */}
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          {article.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 顧客情報 */}
          {article.customerName && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">クライアント</h3>
              <p className="text-gray-700">{article.customerName}</p>
            </div>
          )}
        </div>

        {/* 技術スタック */}
        {article.techStack && article.techStack.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">技術スタック</h3>
            <div className="flex flex-wrap gap-2">
              {article.techStack.map((tech) => (
                <Badge key={tech} variant="tech">
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
              {article.keywords.map((keyword) => (
                <Badge
                  key={keyword}
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
      </section>

      {/* 元記事リンク */}
      <SourceArticleButton sourceUrl={article.sourceUrl} />

      {/* 企業情報 */}
      {company && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">企業情報</h2>
          <Link href={`/companies/${company.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                {/* ロゴと基本情報 */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl truncate">
                      {company.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Building2 className="h-4 w-4" />
                      <span className="truncate">{company.location}</span>
                    </div>
                  </div>
                </div>

                <CardDescription className="line-clamp-3 text-base">
                  {company.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* 企業情報 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">設立年:</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{company.establishedYear}年</span>
                    </div>
                  </div>

                  {company.employeeRange && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">規模:</span>
                      <Badge variant="outline" className="text-xs">
                        {company.employeeRange === "small" && "1-50名"}
                        {company.employeeRange === "medium" && "51-300名"}
                        {company.employeeRange === "large" && "301-1000名"}
                        {company.employeeRange === "enterprise" && "1000名以上"}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>
      )}

      {/* 企業の人気記事 */}
      {company && (
        <CompanyPopularArticles
          companyId={company.id}
          companyName={company.name}
          excludeArticleId={article.id}
          limit={3}
        />
      )}

      {/* おすすめ記事（関連記事） */}
      <RecommendedArticles
        currentArticleId={article.id}
        categoryId={article.categoryId}
        title="おすすめ記事"
        limit={3}
      />

      {/* 探索セクション */}
      <div>
        <CategoryExplorer limit={6} />
        <TagExplorer limit={15} />
        <PrefectureExplorer />
      </div>

      {/* ナビゲーション */}
      <div className="flex justify-between items-center pt-8 border-t">
        <BackButton href="/articles" label="記事一覧に戻る" />

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
