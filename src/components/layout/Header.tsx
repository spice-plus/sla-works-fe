"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FileText, Building2 } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">{APP_NAME}</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
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
            <span>企業</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
