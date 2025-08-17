import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { BaseCardContentProps } from "./card-variants";

export function HorizontalCard({
  image,
  title,
  description,
  date,
  metadata,
  className,
}: BaseCardContentProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <div className="flex">
        {/* 画像部分 */}
        <div className="w-32 h-32 bg-muted rounded-l-xl overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={title}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>

        {/* コンテンツ部分 */}
        <div className="flex-1 p-6">
          <CardTitle className="line-clamp-2 text-lg mb-2">{title}</CardTitle>
          {description && (
            <CardDescription className="line-clamp-2 mb-3">
              {description}
            </CardDescription>
          )}
          {(date || metadata) && (
            <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
              {date && <span>{date}</span>}
              {metadata && <span>{metadata}</span>}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
