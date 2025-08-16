import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "horizontal" | "square";
  className?: string;
}

const horizontalSizeMap = {
  sm: { width: 80, height: 26 },
  md: { width: 120, height: 40 },
  lg: { width: 160, height: 53 },
  xl: { width: 200, height: 66 },
};

const squareSizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 },
};

export function Logo({
  variant = "light",
  size = "md",
  shape = "horizontal",
  className
}: LogoProps) {
  const logoSrc = shape === "square"
    ? (variant === "dark"
        ? "/images/logo/logo-dark-square.svg"
        : "/images/logo/logo-square.svg")
    : (variant === "dark"
        ? "/images/logo/logo-dark-horizontal.svg"
        : "/images/logo/logo-horizontal.svg");

  const dimensions = shape === "square" ? squareSizeMap[size] : horizontalSizeMap[size];

  return (
    <Image
      src={logoSrc}
      alt="SLA Works"
      width={dimensions.width}
      height={dimensions.height}
      priority
      className={cn("h-auto", className)}
    />
  );
}
