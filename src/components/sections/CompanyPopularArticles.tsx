import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import { AdaptiveCard } from "@/components/cards";
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
    <section className={`${spacingTokens.variants.large} ${className}`}>
      <div className={spacingTokens.variants.large}>
        <h2 className={`${typography.variants.h2} font-bold text-gray-900`}>
          {companyName}の人気記事
        </h2>
      </div>
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
