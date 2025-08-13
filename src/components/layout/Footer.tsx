import { Building2, FileText } from "lucide-react";
import Link from "next/link";
import { articleTypes } from "../../../masters/articleTypes";
import { categories } from "../../../masters/categories";

export function Footer() {
  // 主要カテゴリ（最初の5つ）
  const mainCategories = categories.slice(0, 5);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* メインフッターコンテンツ */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-footer gap-8">
          {/* ブランド情報セクション */}
          <div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent font-mono">
                /WORKs
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed pr-20">
              開発事例やインタビュー記事を横断的に検索できるプラットフォーム。
              技術トレンドや実装事例を通じて、より良い開発を支援します。
            </p>
            <div className="space-y-2">
              <div>
                <Link
                  href="/articles"
                  className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  記事を探す
                </Link>
              </div>
              <div>
                <Link
                  href="/companies"
                  className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  開発会社を探す
                </Link>
              </div>
            </div>
          </div>

          {/* 記事タイプセクション */}
          <div>
            <h4 className="text-lg font-semibold mb-4">記事タイプ</h4>
            <ul className="space-y-2">
              {articleTypes.map((type) => (
                <li key={type.articleTypeId}>
                  <Link
                    href={`/articles?type=${type.articleTypeNameRoman}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {type.articleTypeName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* カテゴリセクション */}
          <div>
            <h4 className="text-lg font-semibold mb-4">カテゴリ</h4>
            <ul className="space-y-2">
              {mainCategories.map((category) => (
                <li key={category.categoryId}>
                  <Link
                    href={`/articles?category=${category.categoryNameRoman}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {category.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報セクション */}
          <div>
            <h4 className="text-lg font-semibold mb-4">サイト情報</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  サイトについて
                </Link>
              </li>
              <li>
                <Link
                  href="https://spice-plus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  運営会社
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  サイトマップ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-700"></div>

        {/* 下部セクション */}
        <div className="py-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © 2025 /WORKs. すべての権利を保有します。
          </p>
        </div>
      </div>
    </footer>
  );
}
