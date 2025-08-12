'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Clock, Building2, MessageCircle, Settings, FileText, Award, ChevronDown, Folder, Hash, MapPin, Eye, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "../src/components/ui/ArticleCard";
import { sampleArticles } from "../sample/articles";
import { sampleCategories } from "../sample/categories";
import { sampleCompanies } from "../sample/companies";
import { sampleTags } from "../sample/tags";
import { formatDate } from "../src/utils/formatDate";
import { prefectures } from "../masters/prefectures";
import { generateArticleUrl } from "../src/utils/urlHelpers";

interface SearchFormData {
  keyword: string;
}

interface HomePageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function HomePage({ searchParams }: HomePageProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const articles = sampleArticles;
  const categories = sampleCategories;
  const companies = sampleCompanies;
  const tags = sampleTags;

  // データの準備
  const popularArticles = articles
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 6);
  
  const recentArticles = articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  const interviewArticles = articles
    .filter(article => article.articleType === 'interview')
    .slice(0, 3);

  const processArticles = articles
    .filter(article => article.articleType === 'process')
    .slice(0, 3);

  const surveyArticles = articles
    .filter(article => article.articleType === 'survey')
    .slice(0, 3);

  const deliverableArticles = articles
    .filter(article => article.articleType === 'deliverable')
    .slice(0, 3);

  const featuredCompanies = companies.slice(0, 4);
  const featuredCategories = categories.slice(0, 8);
  const featuredTags = tags.slice(0, 12);

  // カテゴリとカンパニーのマップを作成
  const categoryMap = Object.fromEntries(categories.map(cat => [cat.id, cat]));
  const companyMap = Object.fromEntries(companies.map(comp => [comp.id, comp]));

  // 検索実行
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      window.location.href = `/articles?keyword=${encodeURIComponent(searchKeyword.trim())}`;
    } else {
      window.location.href = '/articles';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 lg:py-48 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* 背景画像とオーバーレイ */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="テクノロジーとイノベーション"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E3A97]/90 to-[#475569]/80"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* 装飾的な要素 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#059669]/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent font-mono">/WORKs</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            開発事例やインタビュー記事を横断的に検索できるプラットフォーム
          </p>
          
          {/* 検索バー */}
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative group flex">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 z-10" />
              <input
                type="text"
                placeholder="事例記事を検索..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="flex-1 pl-16 pr-4 py-5 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-l-2xl shadow-2xl focus:ring-4 focus:ring-white/30 focus:bg-white transition-all duration-300 placeholder-gray-500 outline-none"
              />
              <button
                type="submit"
                className="bg-[#2E3A97] hover:bg-[#1E2875] text-white px-8 py-5 rounded-r-2xl font-semibold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              >
                検索
              </button>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/articles"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white/95 hover:text-[#2E3A97] rounded-lg font-semibold transition-all duration-300"
            >
              事例一覧
            </Link>
            <Link 
              href="/companies"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white/95 hover:text-[#2E3A97] rounded-lg font-semibold transition-all duration-300"
            >
              開発会社一覧
            </Link>
          </div>
        </div>
        
        {/* スクロール促進アニメーション */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center animate-pulse">
            <ChevronDown className="w-6 h-6 text-white/80 animate-bounce" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PICKUP（注目記事）セクション */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 text-[#2E3A97] mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">PICKUP</h2>
              <span className="ml-4 text-sm text-gray-500">編集部おすすめの記事</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article}
                category={categoryMap[article.categoryId]}
                company={companyMap[article.companyId]}
              />
            ))}
          </div>
        </section>

        {/* 新着セクション */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-[#059669] mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">新着</h2>
            </div>
            <Link 
              href="/articles"
              className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              もっと見る
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article}
                category={categoryMap[article.categoryId]}
                company={companyMap[article.companyId]}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 企業を探すセクション */}
      <section className="mt-20 relative py-16 overflow-hidden">
        {/* 背景画像とオーバーレイ */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
            alt="オフィス環境"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#475569]/90 to-[#2E3A97]/80"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Building2 className="w-6 h-6 text-white mr-3" />
              <h2 className="text-2xl font-bold text-white">開発会社を探す</h2>
            </div>
            <Link 
              href="/companies"
              className="inline-flex items-center px-6 py-2 border border-white text-white hover:bg-white/90 hover:text-gray-900 backdrop-blur-sm rounded-full text-sm font-medium transition-all duration-300"
            >
              すべて見る
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCompanies.map((company) => (
              <Link key={company.id} href={`/companies/${company.id}`}>
                <div className="p-6 text-center bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300 rounded-lg">
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                    {company.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 記事タイプで探すセクション */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">記事タイプで探す</h2>
            <p className="text-lg text-gray-600">目的に応じて記事を探すことができます</p>
          </div>

          {/* インタビューセクション */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-[#F59E0B] mr-3" />
                <h3 className="text-xl font-bold text-gray-900">インタビュー</h3>
                <span className="ml-4 text-sm text-gray-500">開発者や企業担当者への取材記事</span>
              </div>
              <Link 
                href="/articles"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                もっと見る
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* プロセスセクション */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Settings className="w-6 h-6 text-[#3B82F6] mr-3" />
                <h3 className="text-xl font-bold text-gray-900">プロセス</h3>
                <span className="ml-4 text-sm text-gray-500">開発手順や導入プロセスの解説</span>
              </div>
              <Link 
                href="/articles"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                もっと見る
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* 調査セクション */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-[#3B82F6] mr-3" />
                <h3 className="text-xl font-bold text-gray-900">調査</h3>
                <span className="ml-4 text-sm text-gray-500">調査結果やユーザーの声</span>
              </div>
              <Link 
                href="/articles"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                もっと見る
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveyArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* 成果物セクション */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Award className="w-6 h-6 text-[#EF4444] mr-3" />
                <h3 className="text-xl font-bold text-gray-900">成果物</h3>
                <span className="ml-4 text-sm text-gray-500">完成したシステムやプロダクトの紹介</span>
              </div>
              <Link 
                href="/articles"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                もっと見る
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverableArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* カテゴリ一覧セクション */}
        <section className="mt-20">
          <div className="flex items-center mb-8">
            <Folder className="w-6 h-6 text-[#3B82F6] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">カテゴリで探す</h2>
            <span className="ml-4 text-sm text-gray-500">技術分野別に記事を探す</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {featuredCategories.map((category) => (
              <Link key={category.id} href="/articles">
                <div className="p-6 text-center hover:border-[#2E3A97]/20 transition-all duration-300 group bg-white rounded-lg shadow-sm hover:shadow-md border">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-[#2E3A97] mb-2 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-700 line-clamp-2 transition-colors duration-300">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* タグ一覧セクション */}
        <section className="mt-20">
          <div className="flex items-center mb-8">
            <Hash className="w-6 h-6 text-[#10B981] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">タグで探す</h2>
            <span className="ml-4 text-sm text-gray-500">技術スタックやキーワードで探す</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {featuredTags.map((tag) => (
              <Link key={tag.id} href="/articles">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-[#2E3A97] hover:text-white transition-colors duration-300">
                  #{tag.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 都道府県一覧セクション */}
        <section className="mt-20 pb-20">
          <div className="flex items-center mb-8">
            <MapPin className="w-6 h-6 text-[#F59E0B] mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">都道府県で探す</h2>
            <span className="ml-4 text-sm text-gray-500">地域別に記事を探す</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {prefectures.map((prefecture) => (
              <Link key={prefecture.prefectureCode} href="/articles">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-[#F59E0B] hover:text-white transition-colors duration-300">
                  <MapPin className="w-3 h-3 mr-1" />
                  {prefecture.prefectureName}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}