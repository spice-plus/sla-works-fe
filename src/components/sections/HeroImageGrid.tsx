"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ANIMATION_DELAY_STEP,
  ANIMATION_INTERVAL,
} from "@/config/heroArticles";
import { typography } from "@/design/tokens/typography";
import { chunkArticles, getHeroArticles } from "@/utils/heroArticleSelector";
import { generateArticleUrl } from "@/utils/urlHelpers";
import { categories } from "../../../masters/categories";
import { getSystemNameById } from "../../../masters/systemNames";
import { sampleCompanies } from "../../../sample/companies";
import type { Article } from "../../models/types";

interface HeroImageGridProps {
  className?: string;
}

export function HeroImageGrid({ className = "" }: HeroImageGridProps) {
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 記事データを準備
  const heroArticles = getHeroArticles();
  const articleChunks = chunkArticles(heroArticles, 5);

  // カテゴリとカンパニーのマップを作成
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.categoryId, cat])
  );
  const companyMap = Object.fromEntries(
    sampleCompanies.map((comp) => [comp.id, comp])
  );

  // 記事からカテゴリを取得するヘルパー関数
  const getCategoryForArticle = (article: Article) => {
    const systemName = getSystemNameById(article.systemId);
    return systemName ? categoryMap[systemName.categoryId] : undefined;
  };

  // 現在表示中の記事チャンク
  const currentArticles = articleChunks[currentChunkIndex] || [];

  // アニメーション制御（デスクトップのみ）
  useEffect(() => {
    if (articleChunks.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentChunkIndex((prev) => (prev + 1) % articleChunks.length);
        setIsAnimating(false);
      }, 500); // フェードアウト時間
    }, ANIMATION_INTERVAL);

    return () => clearInterval(interval);
  }, [articleChunks.length]);

  if (currentArticles.length === 0) {
    return null;
  }

  return (
    <section
      className={`relative w-full min-h-[300px] lg:min-h-[500px] ${className}`}
    >
      {/* デスクトップレイアウト (lg以上) */}
      <div className="hidden lg:flex h-[500px] gap-0 w-full relative z-10">
        {/* メインの大きなブロック - 左側50% */}
        {currentArticles[0] && (
          <div className="w-1/2">
            <HeroImageBlock
              article={currentArticles[0]}
              category={getCategoryForArticle(currentArticles[0])}
              company={companyMap[currentArticles[0].companyId]}
              className=""
              animationDelay={0}
              isAnimating={isAnimating}
              isMain={true}
            />
          </div>
        )}

        {/* 右側の4つの小さなブロック - 右側50%を2x2グリッドに分割 */}
        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-0">
          {currentArticles.slice(1, 5).map((article, index) => (
            <HeroImageBlock
              key={`${article.id}-${currentChunkIndex}`}
              article={article}
              category={getCategoryForArticle(article)}
              company={companyMap[article.companyId]}
              animationDelay={(index + 1) * ANIMATION_DELAY_STEP}
              isAnimating={isAnimating}
              isMain={false}
            />
          ))}
        </div>
      </div>

      {/* タブレットレイアウト (md以上lg未満) - 1、2、2で縦に詰む */}
      <div className="hidden md:block lg:hidden relative z-10">
        <div className="flex flex-col gap-0">
          {/* 最初の1つ */}
          {currentArticles[0] && (
            <div className="h-[250px]">
              <HeroImageBlock
                article={currentArticles[0]}
                category={getCategoryForArticle(currentArticles[0])}
                company={companyMap[currentArticles[0].companyId]}
                className=""
                animationDelay={0}
                isAnimating={isAnimating}
                isMain={true}
              />
            </div>
          )}

          {/* 2つ目の行 */}
          <div className="grid grid-cols-2 gap-0">
            {currentArticles.slice(1, 3).map((article, index) => (
              <div
                key={`${article.id}-${currentChunkIndex}`}
                className="h-[200px]"
              >
                <HeroImageBlock
                  article={article}
                  category={getCategoryForArticle(article)}
                  company={companyMap[article.companyId]}
                  animationDelay={(index + 1) * ANIMATION_DELAY_STEP}
                  isAnimating={isAnimating}
                  isMain={false}
                />
              </div>
            ))}
          </div>

          {/* 3つ目の行 */}
          <div className="grid grid-cols-2 gap-0">
            {currentArticles.slice(3, 5).map((article, index) => (
              <div
                key={`${article.id}-${currentChunkIndex}`}
                className="h-[200px]"
              >
                <HeroImageBlock
                  article={article}
                  category={getCategoryForArticle(article)}
                  company={companyMap[article.companyId]}
                  animationDelay={(index + 3) * ANIMATION_DELAY_STEP}
                  isAnimating={isAnimating}
                  isMain={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* スマホレイアウト (md未満) - カルーセル */}
      <div className="block md:hidden relative z-10">
        <Carousel className="w-full">
          <CarouselContent>
            {currentArticles.map((article, index) => (
              <CarouselItem key={`${article.id}-${currentChunkIndex}`}>
                <div className="h-[300px]">
                  <HeroImageBlock
                    article={article}
                    category={getCategoryForArticle(article)}
                    company={companyMap[article.companyId]}
                    className=""
                    animationDelay={0}
                    isAnimating={false}
                    isMain={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
}

interface HeroImageBlockProps {
  article: Article;
  category?: {
    categoryId: number;
    categoryName: string;
    categoryNameRoman: string;
  };
  company?: {
    id: number;
    name: string;
    logoUrl: string;
  };
  className?: string;
  animationDelay: number;
  isAnimating: boolean;
  isMain: boolean;
}

function HeroImageBlock({
  article,
  category,
  company,
  className = "",
  animationDelay,
  isAnimating,
  isMain,
}: HeroImageBlockProps) {
  return (
    <Link href={generateArticleUrl(article.id)}>
      <div
        className={`relative overflow-hidden group cursor-pointer transition-opacity duration-500 h-full ${
          isAnimating ? "opacity-0" : "opacity-100"
        } ${className}`}
        style={{
          transitionDelay: isAnimating ? `${animationDelay}ms` : "0ms",
        }}
      >
        <Image
          src={article.thumbnailUrl}
          alt={article.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        {/* コンテンツオーバーレイ */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          {/* カテゴリバッジ */}
          {category && (
            <div className="mb-2">
              <span
                className={`${typography.variants.caption} inline-block px-2 py-1 font-medium bg-white/90 text-gray-900 rounded`}
              >
                {category.categoryName}
              </span>
            </div>
          )}

          {/* タイトル */}
          <h3
            className={`${
              isMain
                ? typography.variants.body
                : typography.variants["body-small"]
            } font-semibold text-white line-clamp-2 group-hover:text-blue-200 transition-colors mb-2`}
          >
            {article.title}
          </h3>

          {/* メタデータ */}
          {company && (
            <span
              className={`${typography.variants.caption} text-white/80 truncate`}
            >
              {company.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
