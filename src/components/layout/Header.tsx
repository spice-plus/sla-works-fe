"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { typography } from "@/design/tokens/typography";
import { cn } from "@/lib/utils";
import { articleTypes } from "../../../masters/articleTypes";
import { categories } from "../../../masters/categories";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-3"
          onClick={closeMobileMenu}
        >
          <Logo size="md" />
          <span
            className={`${typography.variants.caption} hidden lg:block font-medium text-muted-foreground`}
          >
            開発事例を横断検索できるプラットフォーム
          </span>
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* 記事タイプ */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center space-x-1 text-sm md:text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <span>記事タイプ</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* ドロップダウンメニュー */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <div className="space-y-1">
                  {articleTypes.map((type) => (
                    <Link
                      key={type.articleTypeId}
                      href={`/articles?articleType=${type.articleTypeNameRoman}`}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    >
                      {type.articleTypeName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* カテゴリ */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center space-x-1 text-sm md:text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <span>カテゴリ</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* ドロップダウンメニュー */}
            <div className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2 max-h-80 overflow-y-auto">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Link
                      key={category.categoryId}
                      href={`/articles?category=${category.categoryNameRoman}`}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                    >
                      {category.categoryName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* /WORKSについて */}
          <Link
            href="/about"
            className={cn(
              "font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span
              className={`${typography.variants["body-small"]} font-medium`}
            >
              /WORKSについて
            </span>
          </Link>

          {/* お問い合わせ */}
          <Link
            href="/contact"
            className={cn(
              "font-medium transition-colors hover:text-primary",
              pathname === "/contact" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span
              className={`${typography.variants["body-small"]} font-medium`}
            >
              お問い合わせ
            </span>
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={toggleMobileMenu}
          aria-label="メニューを開く"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* モバイルナビゲーション */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container-responsive py-4 md:py-6 space-y-4 md:space-y-6">
            {/* 記事タイプ・カテゴリアコーディオン */}
            <div className="bg-card rounded-lg border p-4">
              <Accordion type="multiple" className="w-full">
                {/* 記事タイプ */}
                <AccordionItem value="article-types" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">
                    記事タイプ
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {articleTypes.map((type) => (
                        <Link
                          key={type.articleTypeId}
                          href={`/articles?articleType=${type.articleTypeNameRoman}`}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                          onClick={closeMobileMenu}
                        >
                          {type.articleTypeName}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* カテゴリ */}
                <AccordionItem value="categories">
                  <AccordionTrigger className="text-sm font-medium">
                    カテゴリ
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.categoryId}
                          href={`/articles?category=${category.categoryNameRoman}`}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
                          onClick={closeMobileMenu}
                        >
                          {category.categoryName}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* /WORKSについて */}
            <Link
              href="/about"
              className={cn(
                "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                pathname === "/about"
                  ? "text-primary bg-accent"
                  : "text-muted-foreground"
              )}
              onClick={closeMobileMenu}
            >
              /WORKSについて
            </Link>

            {/* お問い合わせ */}
            <Link
              href="/contact"
              className={cn(
                "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                pathname === "/contact"
                  ? "text-primary bg-accent"
                  : "text-muted-foreground"
              )}
              onClick={closeMobileMenu}
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
