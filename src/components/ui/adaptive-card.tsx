import Link from "next/link";
import type { CardProps } from "./card-variants";
import { HorizontalCard } from "./cards/horizontal-card";
import { OverlayCard } from "./cards/overlay-card";
import { VerticalCard } from "./cards/vertical-card";

export function AdaptiveCard({ variant, href, onClick, ...props }: CardProps) {
  const CardComponent = () => {
    switch (variant) {
      case "overlay":
        return <OverlayCard {...props} />;
      case "vertical":
        return <VerticalCard {...props} />;
      case "horizontal":
        return <HorizontalCard {...props} />;
      default:
        return <VerticalCard {...props} />;
    }
  };

  // リンクがある場合はLinkでラップ
  if (href) {
    return (
      <Link href={href} className="block">
        <CardComponent />
      </Link>
    );
  }

  // クリックハンドラーがある場合はbuttonでラップ
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className="cursor-pointer w-full text-left"
      >
        <CardComponent />
      </button>
    );
  }

  // そのまま表示
  return <CardComponent />;
}
