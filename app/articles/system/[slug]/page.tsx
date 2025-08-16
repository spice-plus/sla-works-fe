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
import { getSystemNameByRoman } from "../../../../masters/systemNames";
import { sampleArticles } from "../../../../sample/articles";
import {
  generateBreadcrumbStructuredData,
  generateSystemStructuredData,
} from "../../../../src/utils/structuredData";

interface SystemPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: SystemPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const systemName = getSystemNameByRoman(resolvedParams.slug);

  if (!systemName) {
    return {
      title: "ページが見つかりません",
    };
  }

  return {
    title: `${systemName.systemName}の導入事例 | SLA Works`,
    description: `${systemName.systemName}の導入事例をご紹介。${systemName.description}の成功事例をご覧いただけます。`,
    openGraph: {
      title: `${systemName.systemName}の導入事例`,
      description: `${systemName.systemName}の導入事例をご紹介`,
      type: "website",
    },
  };
}

export default async function SystemPage({ params }: SystemPageProps) {
  const resolvedParams = await params;
  const systemName = getSystemNameByRoman(resolvedParams.slug);

  if (!systemName) {
    notFound();
  }

  // システムに属する記事をフィルタリング
  const filteredArticles = sampleArticles.filter((article) => {
    return article.systemId === systemName.systemId;
  });

  const pageTitle = `${systemName.systemName}の導入事例`;
  const pageDescription = `${systemName.systemName}の導入事例をご紹介します。${systemName.description}の成功事例をご覧いただけます。`;

  // 構造化データの生成
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "記事一覧", href: "/articles" },
    { label: systemName.systemName, current: true },
  ];

  const breadcrumbStructuredData =
    generateBreadcrumbStructuredData(breadcrumbItems);
  const systemStructuredData = generateSystemStructuredData(
    systemName,
    filteredArticles
  );

  return (
    <div>
      {/* 構造化データ */}
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={systemStructuredData} />
      <div className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* パンくずナビ */}
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "記事一覧", href: "/articles" },
            { label: systemName.systemName, current: true },
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
          emptyMessage={`${systemName.systemName}の導入事例はまだありません。`}
        />
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
