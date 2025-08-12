# Adaptive Card System

このディレクトリには、3つの異なるカードパターンを提供する統合カードシステムが含まれています。

## カードバリアント

### 1. Overlay Card (`overlay`)
画像の上にタイトルと日付をオーバーレイ表示するカード

### 2. Vertical Card (`vertical`)
縦型レイアウトのカード（画像上、コンテンツ下）

### 3. Horizontal Card (`horizontal`)
横型レイアウトのカード（画像左、コンテンツ右）

## 使用方法

```tsx
import { AdaptiveCard } from "@/components/ui/adaptive-card";

// オーバーレイカード
<AdaptiveCard
  variant="overlay"
  image="/path/to/image.jpg"
  title="記事タイトル"
  description="記事の説明文"
  date="2024/1/1"
  metadata="1,234 views"
  href="/articles/123"
/>

// 縦型カード
<AdaptiveCard
  variant="vertical"
  image="/path/to/image.jpg"
  title="記事タイトル"
  description="記事の説明文"
  date="2024/1/1"
  metadata="1,234 views"
  href="/articles/123"
/>

// 横型カード
<AdaptiveCard
  variant="horizontal"
  image="/path/to/image.jpg"
  title="記事タイトル"
  description="記事の説明文"
  date="2024/1/1"
  metadata="1,234 views"
  href="/articles/123"
/>

// クリックハンドラーを使用
<AdaptiveCard
  variant="vertical"
  image="/path/to/image.jpg"
  title="記事タイトル"
  onClick={() => console.log('clicked')}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| variant | `'overlay' \| 'vertical' \| 'horizontal'` | ✅ | カードのレイアウトパターン |
| image | `string` | ✅ | 画像のURL |
| title | `string` | ✅ | カードのタイトル |
| description | `string` | ❌ | カードの説明文 |
| date | `string` | ❌ | 日付情報 |
| metadata | `string` | ❌ | メタデータ（閲覧数など） |
| href | `string` | ❌ | リンク先URL |
| onClick | `() => void` | ❌ | クリックハンドラー |
| className | `string` | ❌ | 追加のCSSクラス |

## 実装例

### CompanyPopularArticles での使用
```tsx
<AdaptiveCard
  variant="vertical"
  image={article.thumbnailUrl}
  title={article.title}
  description={article.description}
  date={formatDate(article.publishedAt, "yyyy/M/d")}
  metadata={`${article.viewCount.toLocaleString("ja-JP")} views`}
  href={generateArticleUrl(article.id)}
/>
```

### 企業一覧での使用例
```tsx
<AdaptiveCard
  variant="horizontal"
  image={company.logoUrl}
  title={company.name}
  description={company.description}
  date={`${company.establishedYear}年設立`}
  metadata={`${articleCount}件の記事`}
  href={`/companies/${company.id}`}
/>
```

## ファイル構成

```
src/components/ui/cards/
├── README.md              # このファイル
├── index.ts              # エクスポート定義
├── overlay-card.tsx      # オーバーレイカード
├── vertical-card.tsx     # 縦型カード
└── horizontal-card.tsx   # 横型カード

src/components/ui/
├── adaptive-card.tsx     # 統合カードコンポーネント
├── card-variants.tsx     # 型定義
└── card.tsx             # 基本カードコンポーネント
