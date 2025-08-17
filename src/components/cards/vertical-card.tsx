import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BaseCardContentProps } from "./card-variants";

export function VerticalCard({
  image,
  title,
  description,
  date,
  metadata,
  className,
}: BaseCardContentProps) {
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader>
        <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={300}
            height={169}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
        {description && (
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {(date || metadata) && (
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {date && <span>{date}</span>}
            {metadata && <span>{metadata}</span>}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
