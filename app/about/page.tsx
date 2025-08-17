import { Building2, FileText } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "サイトについて",
  description:
    "/WORKSについて。開発事例やインタビュー記事を横断的に検索できるプラットフォームの概要をご紹介します。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <div className="relative h-64 sm:h-80 overflow-hidden mb-8">
        <Image
          src="/images/image/online-interview.jpg"
          alt="オンラインインタビュー"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E3A97]/80 to-[#475569]/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              /WORKS について
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto">
              開発事例やインタビュー記事を横断的に検索できるプラットフォーム
            </p>
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* サイト立ち上げの背景 */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* 左側：タイトルとイラスト */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-700 mb-2">
                コンセプト
              </h3>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                CONCEPT
              </h2>
              <Image
                src="/images/image/illust-hint.svg"
                alt="アイデア"
                width={80}
                height={80}
                className="opacity-80 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
              />
            </div>

            {/* 右側：コンセプトテキスト */}
            <div className="text-gray-700 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base">
              <p>システム開発のパートナー選びで、こんな経験はありませんか？</p>
              <p>
                「何を基準に選べばいいかわからない」「知り合いの紹介や過去の付き合いだけで選んでいる」
              </p>
              <p>
                多くの発注者が直面するこの課題。本来の目的は「ビジネスゴールを達成する最適なパートナーとの出会い」ですが、限られたネットワークの中で費用や雰囲気だけで判断せざるを得ないのが現状です。
              </p>
              <p>
                では、どのような情報があれば最適なパートナー選択ができるでしょうか？
              </p>
              <p>
                答えは「実際のプロジェクト事例」です。顧客の声、開発プロセス、課題解決への取り組みが詳細に記載された事例記事は、専門知識がなくても開発会社の真の実力を判断できる貴重な情報源となります。
              </p>
              <p>
                実際に、多くの優秀な開発会社がこうした価値ある事例記事を制作し、自社サイトで発信しています。しかし、これらのコンテンツは各社のコーポレートサイトに分散しているため、まずその会社を知らなければ出会うことができません。
              </p>
              <p>
                これは発注者にとっては「最適な情報にたどり着けない」課題であり、開発会社にとっては「せっかく制作した価値あるコンテンツが見られない」という課題でもあります。
              </p>
              <p>
                /WORKSは、この双方の課題を解決するプラットフォームです。優良な開発会社の事例記事を一箇所に集約し、発注者が実際のプロジェクト成果や開発プロセスに基づいてパートナーを選択できる環境を提供します。
              </p>
              <p>
                隠れた優秀なパートナーとの出会いが、あなたのビジネスゴール達成への確実な一歩となることを目指しています。
              </p>
            </div>
          </div>
        </div>

        {/* サービス概要 */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            サービス概要
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Image
                  src="/images/image/illust-pen.svg"
                  alt="記事作成"
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                豊富な記事コンテンツ
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                開発事例、インタビュー、プロセス解説、調査結果など、
                多様な記事タイプで技術情報を提供
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Image
                  src="/images/image/illust-magic.svg"
                  alt="検索機能"
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                横断的な検索機能
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                カテゴリ、技術スタック、都道府県、記事タイプなど、
                多角的な検索で目的の情報を素早く発見
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Image
                  src="/images/image/illust-guitar.svg"
                  alt="開発会社"
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 opacity-80"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                開発会社情報
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                実際の開発事例を手がけた企業の情報も併せて提供し、
                パートナー選びの参考情報を提供
              </p>
            </div>
          </div>
        </div>

        {/* 記事タイプの説明 */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            記事タイプ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                インタビュー
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                開発者や企業担当者への取材記事。実際の開発現場の声や課題解決のプロセスを紹介。
              </p>
              <Link
                href="/articles?articleType=interview"
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
              >
                インタビュー記事を見る →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                プロセス
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                開発手順や導入プロセスの詳細な解説。技術選定から実装まで、具体的な手順を紹介。
              </p>
              <Link
                href="/articles?articleType=process"
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
              >
                プロセス記事を見る →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                調査
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                技術トレンドの調査結果やユーザーの声。データに基づいた客観的な情報を提供。
              </p>
              <Link
                href="/articles?articleType=survey"
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
              >
                調査記事を見る →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                成果物
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                完成したシステムやプロダクトの紹介。実際の成果物を通じて技術の活用例を紹介。
              </p>
              <Link
                href="/articles?articleType=deliverable"
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
              >
                成果物記事を見る →
              </Link>
            </div>
          </div>
        </div>

        {/* 運営会社情報 */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            運営会社
          </h2>

          <div className="text-center">
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              /WORKSは、株式会社スパプラによって運営されています。
            </p>
            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
              私たちは、技術コミュニティの発展と、開発者・企業の成長を支援することを使命としています。
            </p>
            <Link
              href="https://spice-plus.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              コーポレートサイト
            </Link>
          </div>
        </div>

        {/* CTA セクション */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 sm:p-8 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              さっそく記事を探してみませんか？
            </h2>
            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
              あなたの開発に役立つ情報がきっと見つかります
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/articles"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                記事を探す
              </Link>
              <Link
                href="/companies"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-medium text-sm sm:text-base"
              >
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                開発会社を探す
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
