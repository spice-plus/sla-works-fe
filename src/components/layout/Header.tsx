"use client";

import { Building2, FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

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
      <div className="w-[90%] max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
          <Logo size="md" />
        </Link>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/articles"
            className={cn(
              "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
              pathname?.startsWith("/articles")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <FileText className="h-4 w-4" />
            <span>記事</span>
          </Link>

          <Link
            href="/companies"
            className={cn(
              "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
              pathname?.startsWith("/companies")
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Building2 className="h-4 w-4" />
            <span>開発会社</span>
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
            <nav className="w-[90%] max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4">
            <Link
              href="/articles"
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                pathname?.startsWith("/articles")
                  ? "text-primary bg-accent"
                  : "text-muted-foreground"
              )}
              onClick={closeMobileMenu}
            >
              <FileText className="h-5 w-5" />
              <span>記事</span>
            </Link>

            <Link
              href="/companies"
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                pathname?.startsWith("/companies")
                  ? "text-primary bg-accent"
                  : "text-muted-foreground"
              )}
              onClick={closeMobileMenu}
            >
              <Building2 className="h-5 w-5" />
              <span>開発会社</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
