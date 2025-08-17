"use client";

import {
  Award,
  Building2,
  Clock,
  Eye,
  FileText,
  MessageCircle,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ArticleOverlayCard } from "@/components/cards/ArticleOverlayCard";
import { CategoryExplorer } from "@/components/sections/CategoryExplorer";
import { HeroImageGrid } from "@/components/sections/HeroImageGrid";
import { PrefectureExplorer } from "@/components/sections/PrefectureExplorer";
import { SystemExplorer } from "@/components/sections/SystemExplorer";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import { categories } from "../masters/categories";
import { getSystemNameById } from "../masters/systemNames";
import { sampleArticles } from "../sample/articles";
import { sampleCompanies } from "../sample/companies";
import type { Article } from "../src/models/types";

export default function HomePage() {
  const articles = sampleArticles;
  const companies = sampleCompanies;

  // データの準備
  const recentArticles = articles
    .sort((a, b) => {
      const dateA = new Date(b.publishedAt).getTime();
      const dateB = new Date(a.publishedAt).getTime();
      if (dateA !== dateB) {
        return dateA - dateB;
      }
      return a.id - b.id; // 同じ日時の場合はIDでソート
    })
    .slice(0, 6);

  const popularArticles = articles
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6);

  const interviewArticles = articles
    .filter((article) => article.articleType === "interview")
    .slice(0, 3);

  const processArticles = articles
    .filter((article) => article.articleType === "process")
    .slice(0, 3);

  const surveyArticles = articles
    .filter((article) => article.articleType === "survey")
    .slice(0, 3);

  const deliverableArticles = articles
    .filter((article) => article.articleType === "deliverable")
    .slice(0, 3);

  const featuredCompanies = companies.slice(0, 4);

  // カテゴリとカンパニーのマップを作成
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.categoryId, cat])
  );
  const companyMap = Object.fromEntries(
    companies.map((comp) => [comp.id, comp])
  );

  // 記事からカテゴリを取得するヘルパー関数
  const getCategoryForArticle = (article: Article) => {
    const systemName = getSystemNameById(article.systemId);
    return systemName ? categoryMap[systemName.categoryId] : undefined;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroImageGrid />

      {/* Navigation Buttons Section */}
      <section className="py-4 md:py-8 lg:py-12 relative overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/image/online-interview.jpg"
            alt="オンラインインタビュー"
            fill
            className="object-cover"
          />
        </div>

        {/* グラデーションオーバーレイ（透明度付き） */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/80 via-gray-800/85 to-zinc-900/90 z-10"></div>

        <div className="relative z-20 max-w-4xl mx-auto px-4">
          {/* 説明テキスト */}
          <div className={spacingTokens.variants.large}>
            <div className="text-center">
              <p
                className={`${typography.variants.body} text-white leading-relaxed`}
              >
                <Link
                  href="/about"
                  className="text-white hover:text-blue-200 underline underline-offset-2 transition-colors"
                >
                  /WORKS
                </Link>
                は開発事例やインタビュー記事を横断的に検索できるプラットフォームです
              </p>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 sm:gap-6 md:gap-8">
            <Link
              href="/articles"
              className="px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white hover:bg-white hover:text-gray-800 rounded-lg font-semibold transition-all duration-300 text-center text-base md:text-lg"
            >
              記事を探す
            </Link>
            <Link
              href="/companies"
              className="px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white hover:bg-white hover:text-gray-800 rounded-lg font-semibold transition-all duration-300 text-center text-base md:text-lg"
            >
              開発会社を探す
            </Link>
          </div>
        </div>
      </section>

      <div className="container-responsive">
        {/* 新着セクション */}
        <section className={spacingTokens.variants.xl}>
          <div className={spacingTokens.variants.large}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-[#059669] mr-2 md:mr-3" />
                <h2 className={`${typography.variants.h2} text-gray-900`}>
                  新着
                </h2>
              </div>
              <Link
                href="/articles"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                もっと見る
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => {
              const category = getCategoryForArticle(article);
              const articleWithCategoryId = {
                ...article,
                categoryId: category?.categoryId || 0,
              };

              return (
                <ArticleOverlayCard
                  key={article.id}
                  article={articleWithCategoryId}
                  category={
                    category
                      ? {
                          id: category.categoryId,
                          name: category.categoryName,
                          slug: category.categoryNameRoman,
                        }
                      : undefined
                  }
                  company={companyMap[article.companyId]}
                />
              );
            })}
          </div>
        </section>

        {/* 人気記事セクション */}
        <section className={spacingTokens.variants.xl}>
          <div className={spacingTokens.variants.large}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-6 h-6 text-[#EF4444] mr-2 md:mr-3" />
                <h2 className={`${typography.variants.h2} text-gray-900`}>
                  人気記事
                </h2>
              </div>
              <Link
                href="/articles"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                もっと見る
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article) => {
              const category = getCategoryForArticle(article);
              const articleWithCategoryId = {
                ...article,
                categoryId: category?.categoryId || 0,
              };

              return (
                <ArticleOverlayCard
                  key={article.id}
                  article={articleWithCategoryId}
                  category={
                    category
                      ? {
                          id: category.categoryId,
                          name: category.categoryName,
                          slug: category.categoryNameRoman,
                        }
                      : undefined
                  }
                  company={companyMap[article.companyId]}
                />
              );
            })}
          </div>
        </section>
      </div>

      {/* 企業を探すセクション */}
      <section className="mt-20 relative py-16 overflow-hidden">
        {/* 背景画像とオーバーレイ */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
            alt="オフィス環境"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#475569]/90 to-[#2E3A97]/80"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={spacingTokens.variants.large}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Building2 className="w-6 h-6 text-white mr-3" />
                <h2 className={`${typography.variants.h2} text-white`}>
                  開発会社を探す
                </h2>
              </div>
              <Link
                href="/companies"
                className="inline-flex items-center px-6 py-2 border border-white text-white hover:bg-white/90 hover:text-gray-900 backdrop-blur-sm rounded-full text-sm font-medium transition-all duration-300"
              >
                すべて見る
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCompanies.map((company) => (
              <Link key={company.id} href={`/companies/${company.id}`}>
                <div className="p-6 text-center bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 rounded-lg">
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                  />
                  <span
                    className={`${typography.variants["body-small"]} font-semibold text-gray-900 line-clamp-2`}
                  >
                    {company.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container-responsive">
        {/* 記事タイプで探すセクション */}
        <section className={spacingTokens.variants.xl}>
          <div className={spacingTokens.variants.large}>
            <div className="text-center">
              <h2 className={`${typography.variants.h2} text-gray-900`}>
                記事タイプで探す
              </h2>
              <p
                className={`${typography.variants["body-large"]} text-gray-600`}
              >
                目的に応じて記事を探すことができます
              </p>
            </div>
          </div>

          {/* インタビューセクション */}
          <div className={spacingTokens.variants.large}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B] mr-2 sm:mr-3 mt-0.5" />
                <div>
                  <h3 className={`${typography.variants.h3} text-gray-900`}>
                    インタビュー
                  </h3>
                  <p
                    className={`${typography.variants["body-small"]} text-gray-500`}
                  >
                    開発者や企業担当者への取材記事
                  </p>
                </div>
              </div>
              <Link
                href="/articles?articleType=interview"
                className="inline-flex items-center px-4 sm:px-6 py-2 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
              >
                もっと見る
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewArticles.map((article) => {
                const category = getCategoryForArticle(article);
                const articleWithCategoryId = {
                  ...article,
                  categoryId: category?.categoryId || 0,
                };

                return (
                  <ArticleCard
                    key={article.id}
                    article={articleWithCategoryId}
                    category={
                      category
                        ? {
                            id: category.categoryId,
                            name: category.categoryName,
                            slug: category.categoryNameRoman,
                          }
                        : undefined
                    }
                    company={companyMap[article.companyId]}
                  />
                );
              })}
            </div>
          </div>

          {/* プロセスセクション */}
          <div className={spacingTokens.variants.large}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-[#3B82F6] mr-2 sm:mr-3 mt-0.5" />
                <div>
                  <h3 className={`${typography.variants.h3} text-gray-900`}>
                    プロセス
                  </h3>
                  <p
                    className={`${typography.variants["body-small"]} text-gray-500`}
                  >
                    開発手順や導入プロセスの解説
                  </p>
                </div>
              </div>
              <Link
                href="/articles?articleType=process"
                className="inline-flex items-center px-4 sm:px-6 py-2 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
              >
                もっと見る
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processArticles.map((article) => {
                const category = getCategoryForArticle(article);
                const articleWithCategoryId = {
                  ...article,
                  categoryId: category?.categoryId || 0,
                };

                return (
                  <ArticleCard
                    key={article.id}
                    article={articleWithCategoryId}
                    category={
                      category
                        ? {
                            id: category.categoryId,
                            name: category.categoryName,
                            slug: category.categoryNameRoman,
                          }
                        : undefined
                    }
                    company={companyMap[article.companyId]}
                  />
                );
              })}
            </div>
          </div>

          {/* 調査セクション */}
          <div className={spacingTokens.variants.large}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#3B82F6] mr-2 sm:mr-3 mt-0.5" />
                <div>
                  <h3 className={`${typography.variants.h3} text-gray-900`}>
                    調査
                  </h3>
                  <p
                    className={`${typography.variants["body-small"]} text-gray-500`}
                  >
                    調査結果やユーザーの声
                  </p>
                </div>
              </div>
              <Link
                href="/articles?articleType=survey"
                className="inline-flex items-center px-4 sm:px-6 py-2 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
              >
                もっと見る
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveyArticles.map((article) => {
                const category = getCategoryForArticle(article);
                const articleWithCategoryId = {
                  ...article,
                  categoryId: category?.categoryId || 0,
                };

                return (
                  <ArticleCard
                    key={article.id}
                    article={articleWithCategoryId}
                    category={
                      category
                        ? {
                            id: category.categoryId,
                            name: category.categoryName,
                            slug: category.categoryNameRoman,
                          }
                        : undefined
                    }
                    company={companyMap[article.companyId]}
                  />
                );
              })}
            </div>
          </div>

          {/* 成果物セクション */}
          <div className={spacingTokens.variants.large}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#EF4444] mr-2 sm:mr-3 mt-0.5" />
                <div>
                  <h3 className={`${typography.variants.h3} text-gray-900`}>
                    成果物
                  </h3>
                  <p
                    className={`${typography.variants["body-small"]} text-gray-500`}
                  >
                    完成したシステムやプロダクトの紹介
                  </p>
                </div>
              </div>
              <Link
                href="/articles?articleType=deliverable"
                className="inline-flex items-center px-4 sm:px-6 py-2 border border-gray-300 rounded-full text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
              >
                もっと見る
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverableArticles.map((article) => {
                const category = getCategoryForArticle(article);
                const articleWithCategoryId = {
                  ...article,
                  categoryId: category?.categoryId || 0,
                };

                return (
                  <ArticleCard
                    key={article.id}
                    article={articleWithCategoryId}
                    category={
                      category
                        ? {
                            id: category.categoryId,
                            name: category.categoryName,
                            slug: category.categoryNameRoman,
                          }
                        : undefined
                    }
                    company={companyMap[article.companyId]}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* 探索セクション */}
      <section className="mt-20 bg-white py-16">
        <div className="container-responsive">
          {/* カテゴリ一覧セクション */}
          <CategoryExplorer limit={8} />

          {/* システム一覧セクション */}
          <SystemExplorer limit={12} className="mt-16" />

          {/* 都道府県一覧セクション */}
          <PrefectureExplorer className="mt-16" />
        </div>
      </section>
    </div>
  );
}
