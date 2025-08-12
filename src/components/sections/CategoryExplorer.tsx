import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
    <section className={cn("mb-12", className)}>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/articles?category=${category.slug}`}
            className="block p-3 rounded-lg border border-gray-200 hover:border-[#2E3A97] hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 text-sm">
                {category.name}
              </span>
              {showCount && (
                <Badge variant="secondary" className="text-xs">
                  {category.articleCount}
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
