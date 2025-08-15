import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  FileText,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CategoryExplorer,
  PrefectureExplorer,
  SystemExplorer,
} from "@/components/sections";
import { PrefecturePopularArticles } from "@/components/sections/PrefecturePopularArticles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArticleOverlayCard } from "@/components/ui/cards/ArticleOverlayCard";
import type { Category } from "../../../../masters/categories";
import { categories } from "../../../../masters/categories";
import { getSystemNameById } from "../../../../masters/systemNames";
import { sampleArticles } from "../../../../sample/articles";
import { sampleCompanies } from "../../../../sample/companies";
import { getPrefectureSlug } from "../../../../src/utils/urlHelpers";

export async function generateStaticParams() {
  // すべての企業に対してパラメータを生成
  return sampleCompanies.map((company) => {
    const prefectureSlug = getPrefectureSlug(company.prefecture);
    return {
      prefectureSlug,
      id: company.id.toString(),
    };
  });
}

interface CompanyDetailPageProps {
  params: Promise<{
    prefectureSlug: string;
    id: string;
  }>;
}

export default async function CompanyDetailPage({
  params,
}: CompanyDetailPageProps) {
  const resolvedParams = await params;
  const companyId = parseInt(resolvedParams.id);
  const company = sampleCompanies.find((c) => c.id === companyId);

  if (!company) {
    notFound();
  }

  // URLの都道府県スラッグと企業の都道府県が一致するかチェック
  const expectedPrefectureSlug = getPrefectureSlug(company.prefecture);
  if (resolvedParams.prefectureSlug !== expectedPrefectureSlug) {
    notFound();
  }

  // この企業の記事を取得
  const companyArticles = sampleArticles
    .filter((article) => article.companyId === companyId)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  // カテゴリーマップを作成
  const categoryMap = new Map(categories.map((cat) => [cat.categoryId, cat]));

  return (
    <div>
      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          {/* 戻るボタン */}
          <div className="mb-6">
            <Button asChild variant="ghost">
              <Link href="/companies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                開発会社一覧に戻る
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
                    <Image
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 企業情報 */}
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">
                      {company.name}
                    </CardTitle>
                    <CardDescription className="text-lg mb-4">
                      {company.description}
                    </CardDescription>

                    {/* 基本情報 */}
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{company.establishedYear}年設立</span>
                      </div>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex flex-col gap-2">
                    {company.websiteUrl && (
                      <Button asChild>
                        <Link
                          href={company.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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

          {/* 記事一覧 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">記事一覧</h2>

            {companyArticles.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    まだ記事が投稿されていません。
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {companyArticles.map((article) => {
                  // systemIdからカテゴリを特定
                  let category: Category | undefined;
                  if (article.systemId) {
                    const systemName = getSystemNameById(article.systemId);
                    if (systemName) {
                      category = categoryMap.get(systemName.categoryId);
                    }
                  }

                  const companyData = sampleCompanies.find(
                    (c) => c.id === article.companyId
                  );

                  // ArticleOverlayCardが期待する形式に変換
                  const articleWithCategoryId = {
                    ...article,
                    categoryId: parseInt(category?.categoryId.toString() || "0")
                  };

                  return (
                    <ArticleOverlayCard
                      key={article.id}
                      article={articleWithCategoryId}
                      category={
                        category
                          ? {
                              id: category.categoryId,
                              name: category.categoryName,
                              slug: category.categoryNameRoman,
                            }
                          : undefined
                      }
                      company={companyData}
                    />
                  );
                })}
              </div>
            )}
          </section>

          {/* 都道府県別人気記事 */}
          <PrefecturePopularArticles
            prefecture={company.prefecture}
            currentCompanyId={companyId}
          />
        </div>
      </div>

      {/* 探索セクション */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryExplorer limit={8} />
          <SystemExplorer limit={12} className="mt-16" />
          <PrefectureExplorer className="mt-16" />
        </div>
      </section>
    </div>
  );
}
