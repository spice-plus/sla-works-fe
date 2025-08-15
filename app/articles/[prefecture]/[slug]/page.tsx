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
import { getPrefectureByRoman } from "../../../../masters/prefectures";
import {
  getSystemNameById,
  getSystemNameByRoman,
} from "../../../../masters/systemNames";
import { sampleArticles } from "../../../../sample/articles";
import { sampleCompanies } from "../../../../sample/companies";
import {
  generateBreadcrumbStructuredData,
  generatePrefectureSlugStructuredData,
} from "../../../../src/utils/structuredData";

type SlugInfo =
  | {
      type: "category";
      data: {
        categoryId: number;
        categoryName: string;
        categoryNameRoman: string;
        description: string;
      };
    }
  | {
      type: "system";
      data: {
        systemId: number;
        systemName: string;
        systemNameRoman: string;
        categoryId: number;
        description: string;
      };
    };

interface PrefectureSlugPageProps {
  params: Promise<{
    prefecture: string;
    slug: string;
  }>;
}

/**
 * スラグの種類を判定する関数（カテゴリまたはシステム名）
 */
function determineSlugType(slug: string): SlugInfo | null {
  // カテゴリチェック
  const category = getCategoryByRoman(slug);
  if (category) {
    return { type: "category" as const, data: category };
  }

  // システム名チェック
  const systemName = getSystemNameByRoman(slug);
  if (systemName) {
    return { type: "system" as const, data: systemName };
  }

  return null;
}

export async function generateMetadata({
  params,
}: PrefectureSlugPageProps): Promise<Metadata> {
  const resolvedParams = await params;

  const prefecture = getPrefectureByRoman(resolvedParams.prefecture);

  const slugInfo = determineSlugType(resolvedParams.slug);

  if (!prefecture || !slugInfo) {
    return {
      title: "ページが見つかりません",
    };
  }

  switch (slugInfo.type) {
    case "category": {
      return {
        title: `${prefecture.prefectureName}の${slugInfo.data.categoryName}開発事例 | SLA Works`,
        description: `${prefecture.prefectureName}の開発会社による${slugInfo.data.categoryName}システムの開発事例をご紹介。${slugInfo.data.description}の成功事例をご覧いただけます。`,
        openGraph: {
          title: `${prefecture.prefectureName}の${slugInfo.data.categoryName}開発事例`,
          description: `${prefecture.prefectureName}の開発会社による${slugInfo.data.categoryName}システムの開発事例をご紹介`,
          type: "website",
        },
      };
    }

    case "system": {
      return {
        title: `${prefecture.prefectureName}の${slugInfo.data.systemName}開発事例 | SLA Works`,
        description: `${prefecture.prefectureName}の開発会社による${slugInfo.data.systemName}の開発事例をご紹介。${slugInfo.data.description}の成功事例をご覧いただけます。`,
        openGraph: {
          title: `${prefecture.prefectureName}の${slugInfo.data.systemName}開発事例`,
          description: `${prefecture.prefectureName}の開発会社による${slugInfo.data.systemName}の開発事例をご紹介`,
          type: "website",
        },
      };
    }

    default:
      return {
        title: "ページが見つかりません",
      };
  }
}

export default async function PrefectureSlugPage({
  params,
}: PrefectureSlugPageProps) {
  const resolvedParams = await params;

  // 都道府県情報を取得
  const prefecture = getPrefectureByRoman(resolvedParams.prefecture);

  const slugInfo = determineSlugType(resolvedParams.slug);

  if (!prefecture || !slugInfo) {
    notFound();
  }

  let filteredArticles: typeof sampleArticles = [];
  let pageTitle = "";
  let pageDescription = "";

  // スラグの種類に応じて記事をフィルタリング
  switch (slugInfo.type) {
    case "category": {
      // 該当都道府県×カテゴリの記事をフィルタリング
      filteredArticles = sampleArticles.filter((article) => {
        // 企業の都道府県をチェック
        const company = sampleCompanies.find((c) => c.id === article.companyId);
        if (!company || company.prefecture !== prefecture.prefectureName) {
          return false;
        }

        // 記事のカテゴリをチェック
        if (!article.systemId) return false;

        const systemName = getSystemNameById(article.systemId);
        if (!systemName) return false;

        return systemName.categoryId === slugInfo.data.categoryId;
      });

      pageTitle = `${prefecture.prefectureName}の${slugInfo.data.categoryName}開発事例`;
      pageDescription = `${prefecture.prefectureName}の開発会社による${slugInfo.data.categoryName}システムの開発事例をご紹介します。${slugInfo.data.description}の成功事例をご覧いただけます。`;
      break;
    }

    case "system": {
      // 該当都道府県×システム名の記事をフィルタリング
      filteredArticles = sampleArticles.filter((article) => {
        // 企業の都道府県をチェック
        const company = sampleCompanies.find((c) => c.id === article.companyId);
        if (!company || company.prefecture !== prefecture.prefectureName) {
          return false;
        }

        // 記事のシステムIDをチェック
        return article.systemId === slugInfo.data.systemId;
      });

      pageTitle = `${prefecture.prefectureName}の${slugInfo.data.systemName}開発事例`;
      pageDescription = `${prefecture.prefectureName}の開発会社による${slugInfo.data.systemName}の開発事例をご紹介します。${slugInfo.data.description}の成功事例をご覧いただけます。`;
      break;
    }
  }

  // 構造化データの生成
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    { label: "記事一覧", href: "/articles" },
    {
      label: prefecture.prefectureName,
      href: `/articles/prefecture/${prefecture.prefectureNameRoman}`,
    },
    {
      label:
        slugInfo.type === "category"
          ? slugInfo.data.categoryName
          : slugInfo.data.systemName,
      current: true,
    },
  ];

  const breadcrumbStructuredData =
    generateBreadcrumbStructuredData(breadcrumbItems);
  const prefectureSlugStructuredData = generatePrefectureSlugStructuredData(
    prefecture,
    slugInfo,
    filteredArticles
  );

  return (
    <div>
      {/* 構造化データ */}
      <StructuredData data={breadcrumbStructuredData} />
      <StructuredData data={prefectureSlugStructuredData} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              label:
                slugInfo.type === "category"
                  ? slugInfo.data.categoryName
                  : slugInfo.data.systemName,
              current: true,
            },
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
          emptyMessage={`${pageTitle.replace("開発事例", "")}の開発事例はまだありません。`}
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
