# デザインシステム使用ガイド

このプロジェクトでは、統一されたデザインシステムを採用しており、**1箇所を変更すると全てに適用される**仕組みを実現しています。

## 🎯 基本原則

### 1. デザイントークンファースト
すべてのスタイリングは `src/design/tokens/` で定義されたデザイントークンを基準とします。

### 2. 階層構造の遵守
新しいUIパーツを作成する際は、以下の優先順位に従ってください：

1. **デザイントークン** (`src/design/tokens/`)
2. **基本UIコンポーネント** (`src/components/ui/`)
3. **複合コンポーネント** (`src/components/features/`)
4. **カスタム実装** (最後の手段)

## 🎨 カラーシステムの使用方法

### TypeScriptでの使用
```typescript
import { colors } from '@/design/tokens';

// ブランドカラー
backgroundColor: colors.brand.primary[500]
color: colors.text.inverse

// セマンティックカラー
backgroundColor: colors.semantic.success.base
borderColor: colors.semantic.error.base

// 中性色
backgroundColor: colors.neutral.gray[100]
```

### Tailwind CSSでの使用
```tsx
// プライマリカラー
<div className="bg-primary text-primary-foreground">

// セマンティックカラー
<div className="bg-success text-success-foreground">
<div className="border-error">

// グレースケール
<div className="bg-gray-100 text-gray-900">
```

## 📝 Typography（文字）

### デザイントークンを使用したTypography
```tsx
import { typography } from '@/design/tokens/typography';

<h1 className={typography.variants.h1}>見出し1</h1>
<p className={typography.variants.body}>本文テキスト</p>
<span className={typography.variants.caption}>キャプション</span>
```

### 利用可能なバリエーション
- `h1`, `h2`, `h3`, `h4` - 見出し
- `body-large`, `body`, `body-small` - 本文
- `caption` - キャプション
- `label` - ラベル

## 📏 Spacing（間隔）

### デザイントークンを使用したSpacing
```tsx
import { spacingTokens } from '@/design/tokens/spacing';

<section className={spacingTokens.variants.section}>
  <h1>セクション間隔</h1>
</section>

<div className={spacingTokens.variants.element}>
  <p>要素間隔</p>
</div>
```

### 利用可能なバリエーション
- `section` - セクション間隔
- `element` - 要素間隔
- `small` - 小さい間隔
- `large` - 大きい間隔
- `xl` - 特大間隔

## 🧩 新しいUIパーツの作成方法

### 1. 既存コンポーネントの確認
まず `src/components/ui/` に必要なコンポーネントがないか確認してください。

### 2. 基本UIコンポーネントの拡張
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { colors } from '@/design/tokens';

export function CustomCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border-primary">
      {children}
      <Button variant="default">アクション</Button>
    </Card>
  );
}
```

### 3. デザイントークンを使用したカスタム実装
```tsx
import { colors } from '@/design/tokens';
import { typography } from '@/design/tokens/typography';
import { spacingTokens } from '@/design/tokens/spacing';
import { cn } from '@/lib/utils';

interface CustomComponentProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function CustomComponent({ 
  variant = 'primary', 
  className 
}: CustomComponentProps) {
  const styles = {
    primary: {
      backgroundColor: colors.brand.primary[500],
      color: colors.text.inverse,
    },
    secondary: {
      backgroundColor: colors.brand.secondary[500],
      color: colors.text.inverse,
    },
  };

  return (
    <div 
      className={cn('p-4 rounded-lg', className)}
      style={styles[variant]}
    >
      <div className={spacingTokens.variants.large}>
        <h2 className={typography.variants.h2}>タイトル</h2>
      </div>
    </div>
  );
}
```

## 🔧 カラーのカスタマイズ

### ブランドカラーの変更
`src/design/tokens/colors.ts` でブランドカラーを変更すると、全体に自動的に反映されます：

```typescript
// ブランドカラー
const brandColors = {
  primary: generateColorScale("#2E3A97"), // ← ここを変更
  secondary: generateColorScale("#475569"),
  tertiary: generateColorScale("#059669"),
};
```

### 新しいセマンティックカラーの追加
```typescript
// 状態カラー
const stateColors = {
  success: generateStateVariants("#10B981"),
  warning: generateStateVariants("#F59E0B"),
  error: generateStateVariants("#EF4444"),
  info: generateStateVariants("#3B82F6"),
  disabled: generateStateVariants("#9CA3AF"),
  // 新しいカラーを追加
  custom: generateStateVariants("#8B5CF6"),
};
```

## ⚠️ 避けるべきパターン

### ❌ 直接的なカラー指定
```tsx
// 悪い例
<div style={{ backgroundColor: '#2E3A97' }}>
<div className="bg-blue-500">
```

### ❌ インラインスタイルでの複雑な実装
```tsx
// 悪い例
<div style={{ 
  padding: '16px', 
  margin: '24px',
  fontSize: '18px',
  lineHeight: '1.5'
}}>
```

### ✅ 推奨パターン
```tsx
// 良い例
<div className="bg-primary text-primary-foreground">
<h1 className={typography.variants.h1}>見出し</h1>
<div className={spacingTokens.variants.element}>
  <p className={typography.variants.body}>本文</p>
</div>
```

## 🚀 メリット

この統一されたアプローチにより、以下が実現されます：

1. **一貫性**: 全体で統一されたデザイン
2. **保守性**: 1箇所の変更で全体に反映
3. **効率性**: 再利用可能なコンポーネント
4. **型安全性**: TypeScriptによる型チェック
5. **アクセシビリティ**: WCAG準拠のカラーコントラスト

## 📚 参考資料

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
