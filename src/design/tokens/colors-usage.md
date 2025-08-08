# カラーシステム使用ガイド

## 概要

このプロジェクトでは、体系的なカラーシステムを採用しています。100〜900の段階的なスケールを持つカラーパレットにより、一貫性のあるデザインを実現します。

## カラー構造

### 1. ブランドカラー（Brand Colors）

```typescript
import { colors } from '@/design/tokens';

// プライマリーカラー（#2E3A97ベース）
colors.brand.primary[500] // ベースカラー
colors.brand.primary[100] // ライトバリエーション
colors.brand.primary[900] // ダークバリエーション

// セカンダリーカラー（#475569ベース）
colors.brand.secondary[500]

// ターシャリーカラー（#059669ベース）
colors.brand.tertiary[500]
```

### 2. セマンティックカラー（Semantic Colors）

状態を表すカラーには、base、hover、active、light、darkのバリエーションがあります。

```typescript
// 成功状態
colors.semantic.success.base    // #10B981
colors.semantic.success.hover   // ホバー時
colors.semantic.success.active  // アクティブ時

// 警告状態
colors.semantic.warning.base    // #F59E0B

// エラー状態
colors.semantic.error.base      // #EF4444

// 情報状態
colors.semantic.info.base       // #3B82F6

// 無効状態
colors.semantic.disabled.base   // #9CA3AF
```

### 3. テキストカラー（Text Colors）

```typescript
// 基本的なテキストカラー
colors.text.primary    // #111827 - 主要テキスト
colors.text.secondary  // #6B7280 - 副次テキスト
colors.text.disabled   // #D1D5DB - 無効テキスト
colors.text.inverse    // #FFFFFF - 反転テキスト

// スケール版（より細かい制御が必要な場合）
colors.text.scale[900] // 最も濃い
colors.text.scale[500] // 中間
colors.text.scale[100] // 最も薄い
```

### 4. 背景カラー（Background Colors）

```typescript
// 基本的な背景カラー
colors.background.primary    // #FFFFFF
colors.background.secondary  // #F9FAFB
colors.background.tertiary   // #F3F4F6

// スケール版
colors.background.scale[50]  // 最も明るい
colors.background.scale[900] // 最も暗い
```

## 実装例

### React/TypeScriptでの使用例

```tsx
import { colors } from '@/design/tokens';

// ボタンコンポーネント
const Button = ({ variant = 'primary', children }) => {
  const styles = {
    primary: {
      backgroundColor: colors.brand.primary[500],
      color: colors.text.inverse,
      '&:hover': {
        backgroundColor: colors.brand.primary[600],
      },
      '&:active': {
        backgroundColor: colors.brand.primary[700],
      },
    },
    success: {
      backgroundColor: colors.semantic.success.base,
      color: colors.text.inverse,
      '&:hover': {
        backgroundColor: colors.semantic.success.hover,
      },
    },
  };

  return (
    <button style={styles[variant]}>
      {children}
    </button>
  );
};

// カードコンポーネント
const Card = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: colors.background.primary,
        borderColor: colors.neutral.gray[200],
        boxShadow: `0 1px 3px ${colors.neutral.gray[400]}20`,
      }}
    >
      {children}
    </div>
  );
};
```

### Tailwind CSSとの統合

```typescript
// tailwind.config.ts
import { generateTailwindColors } from '@/design/tokens/colors';

export default {
  theme: {
    extend: {
      colors: generateTailwindColors(),
    },
  },
};
```

使用例：
```html
<div class="bg-primary-500 hover:bg-primary-600 text-white">
  プライマリーボタン
</div>

<div class="bg-success hover:bg-success-hover">
  成功メッセージ
</div>
```

## カラーユーティリティ関数

```typescript
import { colorUtils } from '@/design/tokens/colors';

// カスタムカラーのスケールを生成
const customColorScale = colorUtils.generateColorScale('#FF6B6B');

// 状態バリエーションを生成
const customStateColors = colorUtils.generateStateVariants('#FF6B6B');

// HEXをHSLに変換
const hslColor = colorUtils.hexToHSL('#FF6B6B');
```

## アクセシビリティの考慮事項

1. **コントラスト比**: テキストと背景のコントラスト比は、WCAG 2.1のガイドラインに従ってください
   - 通常テキスト: 4.5:1以上
   - 大きなテキスト: 3:1以上

2. **カラーの使い分け**:
   - `colors.text.primary` は白背景で使用
   - `colors.text.inverse` は暗い背景で使用
   - 状態カラーは必ずアイコンやテキストと組み合わせて使用

## ベストプラクティス

1. **一貫性**: 同じ用途には同じカラーを使用する
2. **階層性**: カラーの濃淡で視覚的な階層を作る
3. **制限**: 使用するカラーの数を制限し、統一感を保つ
4. **テスト**: 異なる画面や照明条件でカラーをテストする

## 型安全性

TypeScriptを使用している場合、以下の型が利用可能です：

```typescript
import type { 
  Colors, 
  BrandColorKey, 
  SemanticColorKey, 
  ColorScale, 
  StateVariant 
} from '@/design/tokens/colors';

// 型安全なカラー選択
const selectBrandColor = (
  brand: BrandColorKey, 
  scale: ColorScale
): string => {
  return colors.brand[brand][scale];
};

// 使用例
const primaryLight = selectBrandColor('primary', 100);
