import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getTagArticleCounts } from "@/utils/articleHelpers";
import type { TagExplorerProps } from "./types";

export function TagExplorer({
  title = "タグで探す",
  showCount = true,
  limit = 20,
  className,
}: TagExplorerProps) {
  let tags = getTagArticleCounts();

  // limitが指定されている場合は制限
  if (limit) {
    tags = tags.slice(0, limit);
  }

  if (tags.length === 0) {
    return null;
  }

  return (
    <section className={cn("mb-12", className)}>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/articles?tag=${encodeURIComponent(tag)}`}
            className="inline-block"
          >
            <Badge
              variant="outline"
              className="hover:bg-[#2E3A97] hover:text-white hover:border-[#2E3A97] transition-colors cursor-pointer"
            >
              {tag}
              {showCount && (
                <span className="ml-1 text-xs opacity-70">({count})</span>
              )}
            </Badge>
          </Link>
        ))}
      </div>
    </section>
  );
}
