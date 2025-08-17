import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { typography } from "@/design/tokens/typography";
import { cn } from "@/lib/utils";
import type { BackButtonProps } from "./types";

export function BackButton({
  href,
  label,
  icon = <ArrowLeft className="w-4 h-4" />,
  className,
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center text-primary hover:text-primary/90 font-medium transition-colors",
        className
      )}
    >
      {icon}
      <span className={`${typography.variants["body-small"]} ml-2`}>
        {label}
      </span>
    </Link>
  );
}
