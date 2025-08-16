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
import { getCategoryByRoman } from "../../../../masters/categories";
import { getSystemNameById } from "../../../../masters/systemNames";
import { sampleArticles } from "../../../../sample/articles";
import {
  generateBreadcrumbStructuredData,
  generateCategoryStructuredData,
} from "../../../../src/utils/structuredData";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryByRoman(resolvedParams.slug);

  if (!category) {
    return {
      title: "ページが見つかりません",
    };
  }

  return {
    title: `${category.categoryName}の導入事例 | SLA Works`,
    description: `${category.categoryName}システムの導入事例をご紹介。${category.description}の成功事例をご覧いただけます。`,
    openGraph: {
      title: `${category.categoryName}の導入事例`,
      description: `${category.categoryName}システムの導入事例をご紹介`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = getCategoryByRoman(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  // カテゴリに属する記事をフィルタリング
  const filteredArticles = sampleArticles.filter((article) => {
    if (!article.systemId) return false;

    const systemName = getSystemNameById(article.systemId);
    if (!systemName) return false;

    return systemName.categoryId === category.categoryId;
  });

  const pageTitle = `${category.categoryName}の導入事例`;
  const pageDescription = `${category.categoryName}システムの導入事例をご紹介します。${category.description}の成功事例をご覧いただけます。`;

  // 構造化データの生成
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "記事一覧", href: "/articles" },
    { label: category.categoryName, current: true },
  ];

  const breadcrumbStructuredData =
    generateBreadcrumbStructuredData(breadcrumbItems);
  const categoryStructuredData = generateCategoryStructuredData(
    category,
    filteredArticles
  );

  return (
    <div>
      {/* 構造化データ */}
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={categoryStructuredData} />
      <div className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* パンくずナビ */}
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "記事一覧", href: "/articles" },
            { label: category.categoryName, current: true },
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
          emptyMessage={`${category.categoryName}の導入事例はまだありません。`}
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
