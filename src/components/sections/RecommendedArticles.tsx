import { AdaptiveCard } from "@/components/cards";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import { getRecommendedArticles } from "@/utils/articleHelpers";
import { formatDate } from "@/utils/formatDate";
import { generateArticleUrl } from "@/utils/urlHelpers";
import type { RecommendedArticlesProps } from "./types";

export function RecommendedArticles({
  currentArticleId,
  categoryId,
  limit = 3,
  title = "おすすめ記事",
  className,
}: RecommendedArticlesProps) {
  const recommendedArticles = getRecommendedArticles(
    currentArticleId,
    categoryId,
    limit
  );

  if (recommendedArticles.length === 0) {
    return null;
  }

  return (
    <section className={`${spacingTokens.variants.large} ${className || ""}`}>
      <div className={spacingTokens.variants.large}>
        <h2 className={`${typography.variants.h2} font-bold text-gray-900`}>
          {title}
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {recommendedArticles.map((article) => (
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
