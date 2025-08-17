import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import { getSystemArticleCounts } from "@/utils/articleHelpers";
import type { SystemExplorerProps } from "./types";

export function SystemExplorer({
  title = "システムで探す",
  showCount = true,
  limit,
  className,
}: SystemExplorerProps) {
  let systems = getSystemArticleCounts();

  // 記事数が0のシステムを除外
  systems = systems.filter((system) => system.articleCount > 0);

  // 記事数順でソート
  systems = systems.sort((a, b) => b.articleCount - a.articleCount);

  // limitが指定されている場合は制限
  if (limit) {
    systems = systems.slice(0, limit);
  }

  if (systems.length === 0) {
    return null;
  }

  return (
    <section className={`${spacingTokens.variants.large} ${className}`}>
      <div className={spacingTokens.variants.large}>
        <h2 className={`${typography.variants.h2} font-bold text-gray-900`}>
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {systems.map((system) => (
          <Link
            key={system.id}
            href={`/articles/system/${system.slug}`}
            className="block p-3 rounded-lg border border-gray-200 bg-white hover:border-primary hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span
                className={`${typography.variants.body} font-medium text-gray-900`}
              >
                {system.name}
              </span>
              {showCount && (
                <Badge variant="secondary" className="text-xs">
                  {system.articleCount}
                </Badge>
              )}
            </div>
            <span
              className={`${typography.variants.caption} text-gray-600 mt-1 line-clamp-2`}
            >
              {system.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
