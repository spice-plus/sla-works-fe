import { Building2, FileText } from "lucide-react";
import Link from "next/link";
import { spacingTokens } from "@/design/tokens/spacing";
import { typography } from "@/design/tokens/typography";
import { Logo } from "@/components/ui/Logo";
import { articleTypes } from "../../../masters/articleTypes";
import { categories } from "../../../masters/categories";

export function Footer() {
  // 主要カテゴリ（最初の5つ）
  const mainCategories = categories.slice(0, 5);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* メインフッターコンテンツ */}
        <div className="py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* ブランド情報セクション */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className={spacingTokens.variants.element}>
              <Logo variant="dark" size="md" />
            </div>
            <div className={spacingTokens.variants.large}>
              <p
                className={`${typography.variants["body-small"]} text-gray-300 leading-relaxed lg:pr-4`}
              >
                開発事例やインタビュー記事を横断的に検索できるプラットフォーム。
                技術トレンドや実装事例を通じて、より良い開発を支援します。
              </p>
            </div>
            <div className="space-y-2">
              <div>
                <Link
                  href="/articles"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span className={typography.variants["body-small"]}>記事を探す</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/companies"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4" />
                  <span className={typography.variants["body-small"]}>開発会社を探す</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 記事タイプセクション */}
          <div>
            <div className={spacingTokens.variants.element}>
              <h4 className={typography.variants.h4}>記事タイプ</h4>
            </div>
            <ul className="space-y-2">
              {articleTypes.map((type) => (
                <li key={type.articleTypeId}>
                  <Link
                    href={`/articles?type=${type.articleTypeNameRoman}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <span className={typography.variants["body-small"]}>
                      {type.articleTypeName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* カテゴリセクション */}
          <div>
            <div className={spacingTokens.variants.element}>
              <h4 className={typography.variants.h4}>カテゴリ</h4>
            </div>
            <ul className="space-y-2">
              {mainCategories.map((category) => (
                <li key={category.categoryId}>
                  <Link
                    href={`/articles?category=${category.categoryNameRoman}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <span className={typography.variants["body-small"]}>
                      {category.categoryName}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報セクション */}
          <div>
            <div className={spacingTokens.variants.element}>
              <h4 className={typography.variants.h4}>サイト情報</h4>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className={typography.variants["body-small"]}>サイトについて</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://spice-plus.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className={typography.variants["body-small"]}>運営会社</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className={typography.variants["body-small"]}>
                    プライバシーポリシー
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className={typography.variants["body-small"]}>利用規約</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <span className={typography.variants["body-small"]}>お問い合わせ</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-gray-700"></div>

        {/* 下部セクション */}
        <div className="py-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          <span className={`${typography.variants["body-small"]} text-gray-400`}>
            © 2025 /WORKS. すべての権利を保有します。
          </span>
        </div>
      </div>
    </footer>
  );
}
