import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import { getPrefectureArticleCounts } from "@/utils/articleHelpers";
import { prefectures } from "../../../masters/prefectures";
import type { PrefectureExplorerProps } from "./types";

export function PrefectureExplorer({
  title = "都道府県で探す",
  showCount = true,
  limit,
  className,
}: PrefectureExplorerProps) {
  // 都道府県マスタから全都道府県を取得
  const allPrefectures = prefectures;

  // 記事数データを取得
  const prefectureArticleCounts = getPrefectureArticleCounts();

  // マスタデータと記事数データを組み合わせ
  let prefectureList = allPrefectures.map((prefecture) => {
    const countData = prefectureArticleCounts.find(
      (p) => p.prefecture === prefecture.prefectureName
    );
    return {
      ...prefecture,
      count: countData?.count || 0,
    };
  });

  // limitが指定されている場合は制限
  if (limit) {
    prefectureList = prefectureList.slice(0, limit);
  }

  if (prefectureList.length === 0) {
    return null;
  }

  return (
    <section className={`${spacingTokens.variants.large} ${className}`}>
      <div className={spacingTokens.variants.large}>
        <h2 className={`${typography.variants.h2} font-bold text-gray-900`}>
          {title}
        </h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {prefectureList.map((prefecture) => (
          <Link
            key={prefecture.prefectureCode}
            href={`/articles/prefecture/${prefecture.prefectureNameRoman.toLowerCase()}`}
            className="inline-block"
          >
            <Badge
              variant="outline"
              className="px-3 py-1.5 text-sm font-medium rounded-full border border-gray-300 bg-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
            >
              {prefecture.prefectureName}
              {showCount && (
                <span className="ml-1 text-xs opacity-70">
                  ({prefecture.count})
                </span>
              )}
            </Badge>
          </Link>
        ))}
      </div>
    </section>
  );
}
