import type { Category } from "../../masters/categories";
import type { Prefecture } from "../../masters/prefectures";
import { getPrefectureByCode } from "../../masters/prefectures";
import type { SystemName } from "../../masters/systemNames";
import type { Article, Company } from "../models/types";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

// パンくずナビゲーション用の構造化データ
export function generateBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  const baseUrl = "https://sla-works.com";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => !item.current)
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: `${baseUrl}${item.href}`,
      })),
  };
}

// 記事一覧ページ用の構造化データ
export function generateArticleListStructuredData(
  articles: Article[],
  companies: Company[],
  pageTitle: string,
  pageDescription: string,
  pageUrl: string
) {
  const baseUrl = "https://sla-works.com";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: `${baseUrl}${pageUrl}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => {
        // 記事に関連する都道府県を取得（企業情報から）
        const company = companies.find((c) => c.id === article.companyId);
        const prefecture = company
          ? getPrefectureByCode(company.prefectureCode)
          : null;
        const prefectureRoman = prefecture?.prefectureNameRoman || "tokyo"; // デフォルトは東京

        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Article",
            headline: article.title,
            description: article.description,
            url: `${baseUrl}/articles/${prefectureRoman}/article/${article.id}`,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: {
              "@type": "Organization",
              name: "SLA Works",
            },
            publisher: {
              "@type": "Organization",
              name: "SLA Works",
              logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.png`,
              },
            },
          },
        };
      }),
    },
  };
}

// 個別記事用の構造化データ
export function generateArticleStructuredData(
  article: Article,
  companyName: string,
  prefecture: string
) {
  const baseUrl = "https://sla-works.com";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${baseUrl}/articles/${prefecture}/article/${article.id}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: companyName,
    },
    publisher: {
      "@type": "Organization",
      name: "SLA Works",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/articles/${prefecture}/article/${article.id}`,
    },
    image: article.thumbnailUrl
      ? {
          "@type": "ImageObject",
          url: article.thumbnailUrl,
        }
      : undefined,
  };
}

// カテゴリページ用の構造化データ
export function generateCategoryStructuredData(
  category: Category,
  articles: Article[]
) {
  const baseUrl = "https://sla-works.com";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.categoryName}の導入事例`,
    description: `${category.categoryName}システムの導入事例をご紹介。${category.description}の成功事例をご覧いただけます。`,
    url: `${baseUrl}/articles/category/${category.categoryNameRoman}`,
    about: {
      "@type": "Thing",
      name: category.categoryName,
      description: category.description,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
        },
      })),
    },
  };
}

// 都道府県ページ用の構造化データ
export function generatePrefectureStructuredData(
  prefecture: Prefecture,
  articles: Article[]
) {
  const baseUrl = "https://sla-works.com";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${prefecture.prefectureName}の開発事例`,
    description: `${prefecture.prefectureName}の開発会社による導入事例をご紹介します。`,
    url: `${baseUrl}/articles/prefecture/${prefecture.prefectureNameRoman}`,
    about: {
      "@type": "Place",
      name: prefecture.prefectureName,
      "@id": `https://ja.wikipedia.org/wiki/${prefecture.prefectureName}`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
        },
      })),
    },
  };
}

// システムページ用の構造化データ
export function generateSystemStructuredData(
  system: SystemName,
  articles: Article[]
) {
  const baseUrl = "https://sla-works.com";

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${system.systemName}の導入事例`,
    description: `${system.systemName}の導入事例をご紹介。${system.description}の成功事例をご覧いただけます。`,
    url: `${baseUrl}/articles/system/${system.systemNameRoman}`,
    about: {
      "@type": "SoftwareApplication",
      name: system.systemName,
      description: system.description,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
        },
      })),
    },
  };
}

// 都道府県×カテゴリ/システムページ用の構造化データ
export function generatePrefectureSlugStructuredData(
  prefecture: Prefecture,
  slugInfo:
    | { type: "category"; data: Category }
    | { type: "system"; data: SystemName },
  articles: Article[]
) {
  const baseUrl = "https://sla-works.com";

  const isCategory = slugInfo.type === "category";
  const name = isCategory
    ? slugInfo.data.categoryName
    : slugInfo.data.systemName;
  const description = slugInfo.data.description;
  const slug = isCategory
    ? slugInfo.data.categoryNameRoman
    : slugInfo.data.systemNameRoman;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${prefecture.prefectureName}の${name}開発事例`,
    description: `${prefecture.prefectureName}の開発会社による${name}の開発事例をご紹介します。${description}の成功事例をご覧いただけます。`,
    url: `${baseUrl}/articles/${prefecture.prefectureNameRoman}/${slug}`,
    about: [
      {
        "@type": "Place",
        name: prefecture.prefectureName,
      },
      {
        "@type": isCategory ? "Thing" : "SoftwareApplication",
        name: name,
        description: description,
      },
    ],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.publishedAt,
        },
      })),
    },
  };
}
