# Next.js + TypeScript + shadcn/ui Starter

## 技術スタック

- **Next.js 15** - React フレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストの CSS フレームワーク
- **shadcn/ui** - 再利用可能な UI コンポーネント

## はじめに

### 必要な環境

- Node.js 18.17 以上

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションが起動します。

### ビルド

```bash
npm run build
```

### 本番環境での実行

```bash
npm run start
```

## 特徴

- ✅ TypeScript による型安全性
- ✅ shadcn/ui による美しい UI コンポーネント
- ✅ Tailwind CSS による効率的なスタイリング
- ✅ Biome によるコード品質管理
- ✅ 整理されたプロジェクト構造

# コーディングルール

このプロジェクトでは、TypeScript + shadcn/ui + Tailwind CSS を使用したコンポーネントベースの開発を行います。
一貫性のあるコードベースを維持するため、以下のルールに従ってください。

## 基本方針

- **デザイントークン優先**: 直接的な Tailwind クラスよりもデザイントークンを優先
- **レスポンシブファースト**: モバイル → デスクトップの順で設計
- **shadcn/ui 保護**: shadcn/ui ベースのコンポーネントは変更禁止
- **ダークモード非対応**: ダークモード関連のコードは使用しない

## 1. テキスト・タイポグラフィ

### ✅ 必須ルール

**すべてのテキストはデザイントークンを使用**

```tsx
import { typography } from '@/design/tokens/typography';

// ✅ 正しい例
<h1 className={typography.variants.h1}>メインタイトル</h1>
<h2 className={typography.variants.h2}>セクションタイトル</h2>
<h3 className={typography.variants.h3}>サブセクションタイトル</h3>
<h4 className={typography.variants.h4}>小見出し</h4>
<p className={typography.variants.body}>本文</p>
<p className={typography.variants["body-small"]}>小さな本文</p>
<span className={typography.variants.caption}>キャプション・メタデータ</span>
<label className={typography.variants.label}>フォームラベル</label>

// ❌ 禁止例
<h1 className="text-2xl font-bold">タイトル</h1>
<p className="text-sm text-gray-600">本文</p>
<span className="font-semibold">強調テキスト</span>
```

### 複数クラスの組み合わせ

```tsx
<h2 className={`${typography.variants.h2} text-primary`}>カラー付き見出し</h2>
<span className={`${typography.variants.body} font-medium`}>強調本文</span>
```

## 2. スペーシング・レイアウト

### ✅ 必須ルール

**要素間の間隔はデザイントークンを使用**

```tsx
import { spacingTokens } from '@/design/tokens/spacing';

// ✅ 正しい例
<div className={spacingTokens.variants.large}>
  <h2 className={typography.variants.h2}>セクションタイトル</h2>
</div>
<div className={spacingTokens.variants.element}>
  <p className={typography.variants.body}>本文</p>
</div>

// ❌ 禁止例
<div className="mb-8">
  <h2>セクションタイトル</h2>
</div>
<div className="mt-4">
  <p>本文</p>
</div>
```

### Tailwind 使用許可範囲（レイアウトのみ）

```tsx
// ✅ 許可されるTailwind使用
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="flex items-center justify-between">
<div className="w-full max-w-4xl mx-auto">
<div className="gap-4 md:gap-6"> // コンポーネント間のギャップ
```

## 3. カラーシステム

### ✅ 必須ルール

**CSS 変数ベースのカラーを使用**

```tsx
// ✅ 正しい例
<div className="text-primary hover:text-primary/90">
<div className="bg-primary text-primary-foreground">
<div className="text-foreground">
<div className="text-muted-foreground">

// ❌ 禁止例
<div className="text-[#2E3A97]">
<div className="text-gray-900">
<div className="bg-blue-600">
```

### 利用可能なカラートークン

- **プライマリ**: `text-primary`, `bg-primary`, `border-primary`
- **テキスト**: `text-foreground`, `text-muted-foreground`
- **背景**: `bg-background`, `bg-card`
- **アクセント**: `text-accent-foreground`, `bg-accent`

## 4. コンポーネント使用ルール

### Button

```tsx
// ✅ 正しい例
<Button variant="default">メインボタン</Button>
<Button variant="outline">サブボタン</Button>
<Button variant="ghost">テキストボタン</Button>

// ❌ 禁止例
<button className="bg-blue-600 text-white px-4 py-2">ボタン</button>
```

### Badge

```tsx
// ✅ 正しい例
<Badge variant="category">カテゴリ</Badge>
<Badge variant="secondary">記事タイプ</Badge>

// ❌ 禁止例
<span className="bg-blue-600 text-white px-2 py-1 rounded">バッジ</span>
```

### Card

```tsx
// ✅ 正しい例
<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
  </CardHeader>
  <CardContent>
    <p className={typography.variants.body}>内容</p>
  </CardContent>
</Card>

// ❌ 禁止例
<div className="bg-white border rounded-lg p-4">
  <h3 className="font-bold">タイトル</h3>
  <p>内容</p>
</div>
```

## 5. レスポンシブ対応

### ブレークポイント統一

- **sm**: 640px 以上（スマートフォン横向き）
- **md**: 768px 以上（タブレット）
- **lg**: 1024px 以上（デスクトップ）
- **xl**: 1280px 以上（大画面）

### レスポンシブクラスの使用例

```tsx
// ✅ 正しい例
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div className="text-sm md:text-base lg:text-lg"> // デザイントークンで自動対応済み
<div className="px-4 md:px-6 lg:px-8">

// ❌ 禁止例（デザイントークンで対応済み）
<div className="text-sm md:text-base lg:text-lg">
```

## 6. 禁止事項

### 絶対に使用禁止

```tsx
// ❌ 直接的なテキストスタイリング
className = "text-sm font-bold text-gray-900";

// ❌ 直接的なスペーシング
className = "mb-4 mt-8 py-6";

// ❌ ハードコーディングされたカラー
className = "text-[#2E3A97] bg-[#1E2875]";

// ❌ shadcn/uiコンポーネントの改変
// src/components/ui/button.tsx等の編集
```

### 例外的に許可される場合

```tsx
// ✅ レイアウト・ポジショニング
className = "absolute top-4 right-4";
className = "flex items-center justify-between";
className = "grid grid-cols-2 gap-4";

// ✅ 状態・インタラクション
className = "hover:scale-105 transition-transform";
className = "group-hover:text-primary";
className = "opacity-0 group-hover:opacity-100";
```

## 7. 新規コンポーネント作成ガイドライン

### カスタムコンポーネント作成時

1. **CVA（Class Variance Authority）を使用**
2. **既存のデザイントークンを内部で使用**
3. **variant ベースの設計**

```tsx
// ✅ 推奨パターン
import { cva } from "class-variance-authority";
import { typography } from '@/design/tokens/typography';
import { spacingTokens } from '@/design/tokens/spacing';

const cardVariants = cva(
  "rounded-lg border transition-colors", // ベースクラス
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        highlighted: "bg-primary/5 border-primary",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
  }
);

export function CustomCard({ variant, size, title, children }) {
  return (
    <div className={cardVariants({ variant, size })}>
      <h3 className={typography.variants.h3}>{title}</h3>
      <div className={spacingTokens.variants.element}>{children}</div>
    </div>
  );
}
```

## 8. コードレビューチェックリスト

### 必須チェック項目

- [ ] `text-*`, `font-*`クラスの直接使用がないか
- [ ] `mb-*`, `mt-*`, `py-*`クラスの直接使用がないか
- [ ] ハードコーディングされたカラーコードがないか
- [ ] デザイントークンが適切に使用されているか
- [ ] shadcn/ui コンポーネントが改変されていないか

### 推奨チェック項目

- [ ] レスポンシブ対応が適切か
- [ ] アクセシビリティが考慮されているか
- [ ] コンポーネントの再利用性が高いか

## 9. マイグレーション手順

### 既存コードのリファクタリング

1. **テキスト要素の置き換え**

   ```tsx
   // Before
   <h2 className="text-xl font-semibold">タイトル</h2>

   // After
   <h2 className={typography.variants.h2}>タイトル</h2>
   ```

2. **スペーシングの置き換え**

   ```tsx
   // Before
   <div className="mb-8">

   // After
   <div className={spacingTokens.variants.large}>
   ```

3. **カラーの置き換え**

   ```tsx
   // Before
   <div className="text-[#2E3A97]">

   // After
   <div className="text-primary">
   ```

## 10. よくある質問

### Q: 既存の shadcn/ui コンポーネントを変更したい場合は？

A: 変更禁止です。代わりに、そのコンポーネントをラップするカスタムコンポーネントを作成してください。

### Q: 一回限りのスタイリングでもデザイントークンを使う必要がありますか？

A: はい。一貫性を保つため、すべてのテキストでデザイントークンを使用してください。

### Q: レスポンシブ対応はどこまで必要ですか？

A: 最低限、sm（モバイル）、md（タブレット）、lg（デスクトップ）の 3 つのブレークポイントに対応してください。

---

このルールに従うことで、保守性が高く一貫性のあるコードベースを維持できます。
