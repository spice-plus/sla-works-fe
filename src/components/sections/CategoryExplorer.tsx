import Link from "next/link";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import { Badge } from "@/components/ui/badge";
import { getCategoryArticleCounts } from "@/utils/articleHelpers";
import type { CategoryExplorerProps } from "./types";

export function CategoryExplorer({
  title = "カテゴリで探す",
  showCount = true,
  limit,
  className,
}: CategoryExplorerProps) {
  let categories = getCategoryArticleCounts();

  // 記事数が0のカテゴリを除外
  categories = categories.filter((category) => category.articleCount > 0);

  // limitが指定されている場合は制限
  if (limit) {
    categories = categories.slice(0, limit);
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className={`${spacingTokens.variants.large} ${className}`}>
      <div className={spacingTokens.variants.large}>
        <h2 className={`${typography.variants.h2} text-gray-900`}>
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/articles/category/${category.slug}`}
            className="block p-3 rounded-lg border border-gray-200 bg-white hover:border-primary hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className={`${typography.variants.body} text-gray-900`}>
                {category.name}
              </span>
              {showCount && (
                <Badge variant="secondary" className="text-xs">
                  {category.articleCount}
                </Badge>
              )}
            </div>
            <span
              className={`${typography.variants.caption} text-gray-600 mt-1 line-clamp-2`}
            >
              {category.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
