import { getAllCategories } from "../../masters/categories";
import { getPrefectureByCode, prefectures } from "../../masters/prefectures";
import { getAllSystemNames } from "../../masters/systemNames";
import { sampleArticles } from "../../sample/articles";
import { sampleCompanies } from "../../sample/companies";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

export function GET(): Response {
  const baseUrl = "https://sla-works.com";

  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/companies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // カテゴリページ
  const categories = getAllCategories();
  const categoryPages: SitemapEntry[] = categories.map((category) => ({
    url: `${baseUrl}/articles/category/${category.categoryNameRoman}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // システムページ
  const systems = getAllSystemNames();
  const systemPages: SitemapEntry[] = systems.map((system) => ({
    url: `${baseUrl}/articles/system/${system.systemNameRoman}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 都道府県ページ
  const prefecturePages: SitemapEntry[] = prefectures.map((prefecture) => ({
    url: `${baseUrl}/articles/prefecture/${prefecture.prefectureNameRoman}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 都道府県×カテゴリページ
  const prefectureCategoryPages: SitemapEntry[] = [];
  prefectures.forEach((prefecture) => {
    categories.forEach((category) => {
      prefectureCategoryPages.push({
        url: `${baseUrl}/articles/${prefecture.prefectureNameRoman}/${category.categoryNameRoman}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    });
  });

  // 都道府県×システムページ
  const prefectureSystemPages: SitemapEntry[] = [];
  prefectures.forEach((prefecture) => {
    systems.forEach((system) => {
      prefectureSystemPages.push({
        url: `${baseUrl}/articles/${prefecture.prefectureNameRoman}/${system.systemNameRoman}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      });
    });
  });

  // 個別記事ページ
  const articlePages: SitemapEntry[] = sampleArticles.map((article) => {
    // 記事に関連する都道府県を取得（企業情報から）
    const company = sampleCompanies.find((c) => c.id === article.companyId);
    const prefecture = company
      ? getPrefectureByCode(company.prefectureCode)
      : null;
    const prefectureRoman = prefecture?.prefectureNameRoman || "tokyo"; // デフォルトは東京

    return {
      url: `${baseUrl}/articles/${prefectureRoman}/article/${article.id}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };
  });

  // 企業ページ
  const companyPages: SitemapEntry[] = prefectures.map((prefecture) => ({
    url: `${baseUrl}/companies/${prefecture.prefectureNameRoman}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const allPages = [
    ...staticPages,
    ...categoryPages,
    ...systemPages,
    ...prefecturePages,
    ...prefectureCategoryPages,
    ...prefectureSystemPages,
    ...articlePages,
    ...companyPages,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
