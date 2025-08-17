import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { typography } from "@/design/tokens/typography";
import { cn } from "@/lib/utils";
import type { BreadcrumbProps } from "./types";

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("mb-8", className)}>
      <div className="flex items-center space-x-2">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            {item.current ? (
              <span
                className={`${typography.variants["body-small"]} text-gray-900 truncate font-medium`}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href || "#"}
                className="hover:text-primary transition-colors truncate"
              >
                <span className={`${typography.variants["body-small"]} text-gray-600`}>
                  {item.label}
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
