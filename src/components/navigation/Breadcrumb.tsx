import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BreadcrumbProps } from "./types";

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("mb-8", className)}>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            {item.current ? (
              <span className="text-gray-900 truncate font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href || "#"}
                className="hover:text-[#2E3A97] transition-colors truncate"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
