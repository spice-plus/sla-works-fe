import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/navigation";
import {
  CategoryExplorer,
  PrefectureExplorer,
  StaticArticleList,
  SystemExplorer,
} from "@/components/sections";
import { StructuredData } from "@/components/seo/StructuredData";
import { getPrefectureByRoman } from "../../../../masters/prefectures";
import { sampleArticles } from "../../../../sample/articles";
import { sampleCompanies } from "../../../../sample/companies";
import {
  generateBreadcrumbStructuredData,
  generatePrefectureStructuredData,
} from "../../../../src/utils/structuredData";

interface PrefecturePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PrefecturePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const prefecture = getPrefectureByRoman(resolvedParams.slug);

  if (!prefecture) {
    return {
      title: "ページが見つかりません",
    };
  }

  return {
    title: `${prefecture.prefectureName}の開発事例 | SLA Works`,
    description: `${prefecture.prefectureName}の開発会社による事例をご紹介。地域に根ざした成功事例をご覧いただけます。`,
    openGraph: {
      title: `${prefecture.prefectureName}の開発事例`,
      description: `${prefecture.prefectureName}の開発会社による事例をご紹介`,
      type: "website",
    },
  };
}

export default async function PrefecturePage({ params }: PrefecturePageProps) {
  const resolvedParams = await params;
  const prefecture = getPrefectureByRoman(resolvedParams.slug);

  if (!prefecture) {
    notFound();
  }

  // 都道府県に属する記事をフィルタリング
  const filteredArticles = sampleArticles.filter((article) => {
    const company = sampleCompanies.find((c) => c.id === article.companyId);
    return company && company.prefecture === prefecture.prefectureName;
  });

  const pageTitle = `${prefecture.prefectureName}の開発事例`;
  const pageDescription = `${prefecture.prefectureName}の開発会社による事例をご紹介します。地域に根ざした成功事例をご覧いただけます。`;

  // 構造化データの生成
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "記事一覧", href: "/articles" },
    { label: prefecture.prefectureName, current: true },
  ];

  const breadcrumbStructuredData = generateBreadcrumbStructuredData(breadcrumbItems);
  const prefectureStructuredData = generatePrefectureStructuredData(prefecture, filteredArticles);

  return (
    <div>
      {/* 構造化データ */}
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={prefectureStructuredData} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* パンくずナビ */}
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "記事一覧", href: "/articles" },
            { label: prefecture.prefectureName, current: true },
          ]}
        />

        {/* ヘッダーセクション */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
          <p className="text-gray-600 text-lg">{pageDescription}</p>
        </div>

        {/* 記事一覧 */}
        <StaticArticleList
          articles={filteredArticles}
          title={pageTitle}
          emptyMessage={`${prefecture.prefectureName}の開発事例はまだありません。`}
        />
      </div>

      {/* 探索セクション */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryExplorer limit={6} />
          <SystemExplorer limit={15} className="mt-16" />
          <PrefectureExplorer className="mt-16" />
        </div>
      </section>
    </div>
  );
}
