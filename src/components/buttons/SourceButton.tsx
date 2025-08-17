import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { typography } from "@/design/tokens/typography";
import { cn } from "@/lib/utils";
import type { SourceArticleButtonProps } from "../article/types";

export function SourceArticleButton({
  sourceUrl,
  className,
}: SourceArticleButtonProps) {
  if (!sourceUrl) {
    return null;
  }

  return (
    <section
      className={cn(
        "mb-12 text-center py-8 border-t border-b border-gray-200",
        className
      )}
    >
      <h3 className={cn(typography.variants.h3, "text-gray-900 mb-3")}>
        詳細情報
      </h3>
      <p className={cn(typography.variants.body, "text-gray-700 mb-6")}>
        この事例の詳細については、元記事をご覧ください。
      </p>
      <Button asChild size="xl">
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-5 h-5 mr-3" />
          元記事を読む
        </a>
      </Button>
      <p className={cn(typography.variants.caption, "text-gray-500 mt-3")}>
        外部サイトに移動します
      </p>
    </section>
  );
}
