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
  SystemExplorer,
} from "@/components/sections";
import { Badge } from "@/components/ui/badge";
import { getArticleTypeByRoman } from "../../../../../masters/articleTypes";
import { getCategoryById } from "../../../../../masters/categories";
import { prefectures } from "../../../../../masters/prefectures";
import { getPurposeById } from "../../../../../masters/purposes";
import { getSystemNameById } from "../../../../../masters/systemNames";
import { sampleArticles } from "../../../../../sample/articles";
import { sampleCompanies } from "../../../../../sample/companies";
import { generateCompanyUrl } from "../../../../../src/utils/urlHelpers";

export async function generateStaticParams() {
  // すべての記事に対してパラメータを生成
  return sampleArticles
    .map((article) => {
      // 企業情報を取得
      const company = sampleCompanies.find((c) => c.id === article.companyId);
      if (!company) return null;

      // システム名からカテゴリを取得
      const systemName = getSystemNameById(article.systemId);
      if (!systemName) return null;

      const category = getCategoryById(systemName.categoryId);
      if (!category) return null;

      // 都道府県スラッグを生成
      const prefecture = prefectures.find(
        (p) => p.prefectureName === company.prefecture
      );
      if (!prefecture) return null;

      return {
        prefecture: prefecture.prefectureNameRoman.toLowerCase(),
        articleId: article.id.toString(),
      };
    })
    .filter(Boolean);
}

interface ArticleDetailPageProps {
  params: Promise<{
    prefecture: string;
    articleId: string;
  }>;
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.articleId);
  const article = sampleArticles.find((a) => a.id === articleId);

  if (!article) {
    notFound();
  }

  // 企業情報を取得
  const company = sampleCompanies.find((c) => c.id === article.companyId);
  if (!company) {
    notFound();
  }

  // システム名からカテゴリを取得
  const systemName = getSystemNameById(article.systemId);
  if (!systemName) {
    notFound();
  }

  const category = getCategoryById(systemName.categoryId);
  if (!category) {
    notFound();
  }

  // 目的情報を取得
  const purpose = getPurposeById(article.purposeId);
  if (!purpose) {
    notFound();
  }

  // 都道府県情報を取得
  const prefecture = prefectures.find(
    (p) => p.prefectureName === company.prefecture
  );
  if (!prefecture) {
    notFound();
  }

  // URLパラメータの検証
  if (
    resolvedParams.prefecture !== prefecture.prefectureNameRoman.toLowerCase()
  ) {
    notFound();
  }

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
    <div>
      <div className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* パンくずナビ */}
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "記事一覧", href: "/articles" },
            {
              label: prefecture.prefectureName,
              href: `/articles/prefecture/${prefecture.prefectureNameRoman}`,
            },
            {
              label: category.categoryName,
              href: `/articles/${prefecture.prefectureNameRoman}/${category.categoryNameRoman}`,
            },
            { label: article.title, current: true },
          ]}
        />

        {/* 記事ヘッダー */}
        <header className="mb-8">
          {/* カテゴリと記事タイプ */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-block bg-[#2E3A97] text-white px-3 py-1 rounded-full text-sm font-medium">
              {category.categoryName}
            </span>
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
          <div className="mb-6 aspect-video">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              width={800}
              height={450}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* 企業情報 */}
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
              <Link href={generateCompanyUrl(company.id)}>
                <h3 className="font-semibold text-gray-900 hover:text-[#2E3A97]">
                  {company.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600">{company.location}</p>
            </div>
          </div>
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
                <h3 className="font-semibold text-gray-900 mb-2">
                  クライアント
                </h3>
                <p className="text-gray-700">{article.customerName}</p>
              </div>
            )}
          </div>

          {/* 課題・目的 */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">課題・目的</h3>
            <Badge variant="secondary">{purpose.purposeName}</Badge>
          </div>

          {/* 成果物 */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">成果物</h3>
            <Badge variant="secondary">{systemName.systemName}</Badge>
          </div>

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

        {/* 企業の人気記事 */}
        <CompanyPopularArticles
          companyId={company.id}
          companyName={company.name}
          excludeArticleId={article.id}
          limit={4}
        />

        {/* おすすめ記事（関連記事） */}
        <RecommendedArticles
          currentArticleId={article.id}
          categoryId={category.categoryId}
          title="おすすめ記事"
          limit={4}
        />

        {/* ナビゲーション */}
        <div className="flex justify-between items-center pt-8 border-t">
          <BackButton href="/articles" label="記事一覧に戻る" />

          <Link
            href={generateCompanyUrl(company.id)}
            className="inline-flex items-center text-[#2E3A97] hover:text-[#1E2875] font-medium"
          >
            {company.name}の詳細
            <Building2 className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* 探索セクション */}
      <section className="bg-white py-16">
        <div className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryExplorer limit={6} />
          <SystemExplorer limit={15} className="mt-16" />
          <PrefectureExplorer className="mt-16" />
        </div>
      </section>
    </div>
  );
}
