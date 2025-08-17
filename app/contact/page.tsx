import type { Metadata } from "next";
import { spacingTokens } from "../../src/design/tokens/spacing";
import { typography } from "../../src/design/tokens/typography";

export const metadata: Metadata = {
  title: "お問い合わせ | SLA WORKS",
  description:
    "SLA WORKSへのお問い合わせはこちらから。開発事例やシステム開発に関するご相談をお受けしています。",
  openGraph: {
    title: "お問い合わせ | SLA WORKS",
    description:
      "SLA WORKSへのお問い合わせはこちらから。開発事例やシステム開発に関するご相談をお受けしています。",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-[90%] max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* ヘッダー */}
        <div className={`${spacingTokens.variants.element} text-center`}>
          <h1 className={`${typography.variants.h1} text-foreground mb-4`}>
            お問い合わせ
          </h1>
          <p
            className={`${typography.variants.body} text-muted-foreground max-w-2xl mx-auto`}
          >
            SLA WORKSに関するご質問、開発事例についてのお問い合わせ、
            システム開発のご相談など、お気軽にお問い合わせください。
          </p>
        </div>

        {/* お問い合わせフォーム */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="mb-6">
            <h3
              className={`${typography.variants.h3} font-semibold text-foreground mb-2`}
            >
              お問い合わせフォーム
            </h3>
            <p className={`${typography.variants["body-small"]} text-muted-foreground`}>
              以下のフォームからお問い合わせください。通常1-2営業日以内にご返信いたします。
            </p>
          </div>

          {/* Googleフォーム埋め込み用プレースホルダー */}
          <div className="w-full">
            <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <p className={`${typography.variants.body} text-muted-foreground mb-4`}>
                こちらにGoogleフォームを埋め込んでください
              </p>
              <div className="space-y-2">
                <p
                  className={`${typography.variants["body-small"]} text-muted-foreground/75`}
                >
                  埋め込み例：
                </p>
                <code className="block bg-muted p-2 rounded text-xs">
                  {`<iframe
  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
  width="100%"
  height="800"
  frameBorder="0"
  marginHeight="0"
  marginWidth="0"
>
  読み込んでいます…
</iframe>`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* 追加情報 */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border p-6">
            <h4
              className={`${typography.variants.h4} font-semibold text-foreground mb-3`}
            >
              お問い合わせについて
            </h4>
            <ul className="space-y-2">
              <li>
                <span
                  className={`${typography.variants["body-small"]} text-muted-foreground`}
                >
                  • 開発事例に関するご質問
                </span>
              </li>
              <li>
                <span
                  className={`${typography.variants["body-small"]} text-muted-foreground`}
                >
                  • システム開発のご相談
                </span>
              </li>
              <li>
                <span
                  className={`${typography.variants["body-small"]} text-muted-foreground`}
                >
                  • 掲載企業様からのお問い合わせ
                </span>
              </li>
              <li>
                <span
                  className={`${typography.variants["body-small"]} text-muted-foreground`}
                >
                  • サイトの使い方について
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h4
              className={`${typography.variants.h4} font-semibold text-foreground mb-3`}
            >
              ご返信について
            </h4>
            <ul className="space-y-2">
              <li>
                <span
                  className={`${typography.variants["body-small"]} text-muted-foreground`}
                >
                  • 通常1-2営業日以内にご返信
                </span>
              </li>
              <li>
                <span
                  className={`${typography.variants["body-small"]} text-muted-foreground`}
                >
                  • 営業時間：平日 9:00-18:00
                </span>
              </li>
              <li>
                <span
                  className={`${typography.variants["body-small"]} text-muted-foreground`}
                >
                  • 土日祝日は翌営業日の対応
                </span>
              </li>
              <li>
                <span
                  className={`${typography.variants["body-small"]} text-muted-foreground`}
                >
                  • 緊急の場合はお電話でご連絡ください
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
