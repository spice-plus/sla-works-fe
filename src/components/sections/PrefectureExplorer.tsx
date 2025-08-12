import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
    <section className={cn("mb-12", className)}>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {prefectureList.map((prefecture) => (
          <Link
            key={prefecture.prefectureCode}
            href={`/articles?prefecture=${prefecture.prefectureNameRoman}`}
            className="inline-block"
          >
            <Badge
              variant="outline"
              className="hover:bg-[#2E3A97] hover:text-white hover:border-[#2E3A97] transition-colors cursor-pointer"
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
