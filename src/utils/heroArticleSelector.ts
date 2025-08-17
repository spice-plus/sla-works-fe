import {
  FEATURED_ARTICLE_IDS,
  HERO_ARTICLES_COUNT,
} from "@/config/heroArticles";
import { sampleArticles } from "../../sample/articles";
import type { Article } from "../models/types";

/**
 * ヒーローセクション用の記事を選択する
 * ピックアップ記事 + 閲覧数順記事の組み合わせで15個を返す
 */
export function getHeroArticles(): Article[] {
  // ピックアップ記事を取得
  const featuredArticles =
    FEATURED_ARTICLE_IDS.length > 0
      ? sampleArticles.filter((article) =>
          FEATURED_ARTICLE_IDS.includes(article.id)
        )
      : [];

  // 残りの記事数を計算
  const remainingCount = HERO_ARTICLES_COUNT - featuredArticles.length;

  // ピックアップ記事以外から閲覧数順で選択
  const popularArticles = sampleArticles
    .filter((article) => !FEATURED_ARTICLE_IDS.includes(article.id))
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, remainingCount);

  // ピックアップ記事を先頭に、その後に人気記事を配置
  return [...featuredArticles, ...popularArticles];
}

/**
 * 記事配列を指定されたサイズのチャンクに分割する
 * @param articles 記事配列
 * @param chunkSize チャンクサイズ（デフォルト: 5）
 */
export function chunkArticles(
  articles: Article[],
  chunkSize: number = 5
): Article[][] {
  const chunks: Article[][] = [];
  for (let i = 0; i < articles.length; i += chunkSize) {
    chunks.push(articles.slice(i, i + chunkSize));
  }
  return chunks;
}
