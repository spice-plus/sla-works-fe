import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { BaseCardContentProps } from "./card-variants";

export function OverlayCard({
  image,
  title,
  description,
  date,
  metadata,
  className,
}: BaseCardContentProps) {
  return (
    <Card className={cn("relative overflow-hidden group", className)}>
      <div className="aspect-video relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* コンテンツオーバーレイ */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
          {description && (
            <p className="text-sm text-white/80 mb-2 line-clamp-2">
              {description}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-white/70">
            {date && <span>{date}</span>}
            {metadata && <span>{metadata}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
}
