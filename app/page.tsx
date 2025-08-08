"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { colors } from "@/design/tokens/colors";

export default function Home() {
  // カラースケールを表示するコンポーネント
  const ColorScale = ({
    title,
    colorScale,
  }: {
    title: string;
    colorScale: Record<number, string>;
  }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {Object.entries(colorScale).map(([scale, color]) => (
          <div key={scale} className="text-center">
            <div
              className="w-full h-12 md:h-16 rounded-md shadow-sm border border-gray-200"
              style={{ backgroundColor: color }}
            />
            <p className="text-xs mt-1">{scale}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // 状態カラーを表示するコンポーネント
  const StateColors = ({
    title,
    stateColor,
  }: {
    title: string;
    stateColor: Record<string, string>;
  }) => (
    <div className="mb-6">
      <h4 className="text-md font-medium mb-3">{title}</h4>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(stateColor).map(([state, color]) => (
          <div key={state} className="text-center">
            <div
              className="w-full h-12 rounded-md shadow-sm border border-gray-200"
              style={{ backgroundColor: color }}
            />
            <p className="text-xs mt-1">{state}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // 単色を表示するコンポーネント
  const SingleColor = ({
    title,
    color,
    textColor = "#000000",
  }: {
    title: string;
    color: string;
    textColor?: string;
  }) => (
    <div className="text-center">
      <div
        className="w-full h-12 rounded-md shadow-sm border border-gray-200 flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        {title === "反転" && (
          <span style={{ color: textColor }} className="text-sm">
            Aa
          </span>
        )}
      </div>
      <p className="text-xs mt-1">{title}</p>
      <p className="text-xs text-gray-500">{color}</p>
    </div>
  );

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-2">カラーシステム</h1>
        <p className="text-center text-muted-foreground mb-8">
          デザインシステムで定義された100〜900のスケールを持つカラーパレット
        </p>

        {/* ブランドカラー */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>ブランドカラー</CardTitle>
            <CardDescription>
              プロジェクトの主要なブランドカラー
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ColorScale
              title="プライマリー (#2E3A97)"
              colorScale={colors.brand.primary}
            />
            <ColorScale
              title="セカンダリー (#475569)"
              colorScale={colors.brand.secondary}
            />
            <ColorScale
              title="ターシャリー (#059669)"
              colorScale={colors.brand.tertiary}
            />
          </CardContent>
        </Card>

        {/* セマンティックカラー */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>セマンティックカラー</CardTitle>
            <CardDescription>
              状態を表すカラー（base, hover, active, light, dark）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <StateColors
                title="成功 (Success) - #10B981"
                stateColor={colors.semantic.success}
              />
              <StateColors
                title="警告 (Warning) - #F59E0B"
                stateColor={colors.semantic.warning}
              />
              <StateColors
                title="エラー (Error) - #EF4444"
                stateColor={colors.semantic.error}
              />
              <StateColors
                title="情報 (Info) - #3B82F6"
                stateColor={colors.semantic.info}
              />
              <StateColors
                title="無効 (Disabled) - #9CA3AF"
                stateColor={colors.semantic.disabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* テキスト・背景カラー */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>テキストカラー</CardTitle>
              <CardDescription>テキスト表示用のカラー定義</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <SingleColor title="主要" color={colors.text.primary} />
                <SingleColor title="副次" color={colors.text.secondary} />
                <SingleColor title="無効" color={colors.text.disabled} />
                <SingleColor
                  title="反転"
                  color="#1F2937"
                  textColor={colors.text.inverse}
                />
              </div>
              <ColorScale
                title="テキストスケール"
                colorScale={colors.text.scale}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>背景カラー</CardTitle>
              <CardDescription>背景用のカラー定義</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <SingleColor title="主要" color={colors.background.primary} />
                <SingleColor title="副次" color={colors.background.secondary} />
                <SingleColor
                  title="ターシャリー"
                  color={colors.background.tertiary}
                />
              </div>
              <ColorScale
                title="背景スケール"
                colorScale={colors.background.scale}
              />
            </CardContent>
          </Card>
        </div>

        {/* 中性色 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>中性色（グレースケール）</CardTitle>
            <CardDescription>UIコンポーネント用の中性色</CardDescription>
          </CardHeader>
          <CardContent>
            <ColorScale title="グレー" colorScale={colors.neutral.gray} />
          </CardContent>
        </Card>

        {/* 使用例 */}
        <Card>
          <CardHeader>
            <CardTitle>使用例</CardTitle>
            <CardDescription>カラーシステムの実際の使用例</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.brand.primary[500] }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: colors.text.inverse }}
              >
                プライマリーカラーの使用例
              </h3>
              <p style={{ color: colors.text.inverse }}>
                これはプライマリーカラーを背景に使用した例です。
              </p>
            </div>

            <div
              className="p-4 rounded-lg border-2"
              style={{
                backgroundColor: colors.semantic.success.light,
                borderColor: colors.semantic.success.base,
              }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: colors.semantic.success.dark }}
              >
                成功メッセージの例
              </h3>
              <p style={{ color: colors.text.primary }}>
                操作が正常に完了しました。
              </p>
            </div>

            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: colors.background.secondary,
                borderColor: colors.neutral.gray[300],
              }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: colors.text.primary }}
              >
                カードコンポーネントの例
              </h3>
              <p style={{ color: colors.text.secondary }}>
                これは背景色とテキストカラーを組み合わせた例です。
              </p>
            </div>

            <div
              className="p-4 rounded-lg border-2"
              style={{
                backgroundColor: colors.semantic.error.light,
                borderColor: colors.semantic.error.base,
              }}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: colors.semantic.error.dark }}
              >
                エラーメッセージの例
              </h3>
              <p style={{ color: colors.text.primary }}>
                エラーが発生しました。もう一度お試しください。
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-muted-foreground">
          <p>
            詳しい使用方法は{" "}
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
              src/design/tokens/colors-usage.md
            </code>{" "}
            を参照してください。
          </p>
        </div>
      </div>
    </div>
  );
}
