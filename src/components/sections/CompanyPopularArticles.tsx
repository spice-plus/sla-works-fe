import { AdaptiveCard } from "@/components/ui/adaptive-card";
import { cn } from "@/lib/utils";
import { getCompanyPopularArticles } from "@/utils/articleHelpers";
import { formatDate } from "@/utils/formatDate";
import { generateArticleUrl } from "@/utils/urlHelpers";
import type { CompanyPopularArticlesProps } from "./types";

export function CompanyPopularArticles({
  companyId,
  companyName,
  limit = 3,
  excludeArticleId,
  className,
}: CompanyPopularArticlesProps) {
  const popularArticles = getCompanyPopularArticles(
    companyId,
    limit,
    excludeArticleId
  );

  if (popularArticles.length === 0) {
    return null;
  }

  return (
    <section className={cn("mb-12", className)}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {companyName}の人気記事
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {popularArticles.map((article) => (
          <AdaptiveCard
            key={article.id}
            variant="overlay"
            image={article.thumbnailUrl}
            title={article.title}
            description=""
            date={formatDate(article.publishedAt, "yyyy/M/d")}
            metadata={`${article.viewCount.toLocaleString("ja-JP")} views`}
            href={generateArticleUrl(article.id)}
          />
        ))}
      </div>
    </section>
  );
}
