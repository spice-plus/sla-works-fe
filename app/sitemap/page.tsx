import type { Metadata } from "next";
import Link from "next/link";
import { Building2, FileText, MapPin, Settings, Tag } from "lucide-react";
import { articleTypes } from "../../masters/articleTypes";
import { categories } from "../../masters/categories";
import { prefectures } from "../../masters/prefectures";

export const metadata: Metadata = {
  title: "サイトマップ",
  description: "/WORKSのサイトマップです。サイト内のすべてのページへのリンクを掲載しています。",
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-[90%] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">サイトマップ</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* メインページ */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                メインページ
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="text-blue-600 hover:text-blue-800 hover:underline">
                    記事一覧
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="text-blue-600 hover:text-blue-800 hover:underline">
                    開発会社一覧
                  </Link>
                </li>
              </ul>
            </section>

            {/* 記事タイプ */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-green-600" />
                記事タイプ
              </h2>
              <ul className="space-y-2">
                {articleTypes.map((type) => (
                  <li key={type.articleTypeId}>
                    <Link
                      href={`/articles?type=${type.articleTypeNameRoman}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {type.articleTypeName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* カテゴリ */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-purple-600" />
                カテゴリ
              </h2>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {categories.map((category) => (
                  <li key={category.categoryId}>
                    <Link
                      href={`/articles/category/${category.categoryNameRoman}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {category.categoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* 都道府県 */}
            <section className="md:col-span-2 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                都道府県
              </h2>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {prefectures.map((prefecture) => (
                  <li key={prefecture.prefectureCode}>
                    <Link
                      href={`/articles/prefecture/${prefecture.prefectureNameRoman}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {prefecture.prefectureName}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* サイト情報 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-gray-600" />
                サイト情報
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-blue-600 hover:text-blue-800 hover:underline">
                    サイトについて
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://spice-plus.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    運営会社
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 hover:underline">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800 hover:underline">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-blue-600 hover:text-blue-800 hover:underline">
                    サイトマップ
                  </Link>
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              このサイトマップは、/WORKS内のすべての主要ページへのリンクを提供しています。<br />
              ご不明な点がございましたら、運営会社までお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
