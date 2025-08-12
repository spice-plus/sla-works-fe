import { ArrowLeft } from "lucide-react";
import Link from "next/link";
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
        "inline-flex items-center text-[#2E3A97] hover:text-[#1E2875] font-medium transition-colors",
        className
      )}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );
}
