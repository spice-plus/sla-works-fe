# インストールされているツールとカラーシステム

## 📦 インストールされているツール

### メインフレームワーク・ライブラリ
- **Next.js** (v15.0.3) - Reactベースのフルスタックフレームワーク
- **React** (v18.3.1) - UIライブラリ
- **TypeScript** (v5.2.2) - 型安全なJavaScript

### UIコンポーネント・デザインシステム
- **Tailwind CSS** (v3.3.3) - ユーティリティファーストCSSフレームワーク
- **Radix UI** - アクセシブルなUIプリミティブ
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu など30+コンポーネント
- **Lucide React** (v0.446.0) - アイコンライブラリ
- **class-variance-authority** (v0.7.0) - バリアント管理
- **clsx** (v2.1.1) - 条件付きクラス名
- **tailwind-merge** (v2.5.2) - Tailwindクラスのマージ

### フォーム・バリデーション
- **React Hook Form** (v7.53.0) - フォーム管理
- **@hookform/resolvers** (v3.9.0) - バリデーションリゾルバー
- **Zod** (v3.23.8) - スキーマバリデーション

### UI拡張・ユーティリティ
- **next-themes** (v0.3.0) - テーマ切り替え
- **date-fns** (v3.6.0) - 日付操作
- **react-day-picker** (v8.10.1) - 日付ピッカー
- **cmdk** (v1.0.0) - コマンドパレット
- **sonner** (v1.5.0) - トースト通知
- **vaul** (v0.9.9) - ドロワーコンポーネント
- **embla-carousel-react** (v8.3.0) - カルーセル
- **recharts** (v2.12.7) - チャートライブラリ
- **react-resizable-panels** (v2.1.3) - リサイザブルパネル
- **input-otp** (v1.2.4) - OTP入力

### 開発ツール
- **Biome** (v2.1.4) - リンター・フォーマッター（ESLint + Prettierの代替）
- **PostCSS** (v8.4.30) - CSS処理
- **Autoprefixer** (v10.4.15) - CSSベンダープレフィックス自動付与
- **tailwindcss-animate** (v1.0.7) - Tailwindアニメーション拡張

---

## 🎨 カラーシステム

### システム概要
このプロジェクトでは、体系的なカラーシステムを採用しており、100〜900の段階的なスケールを持つカラーパレットにより、一貫性のあるデザインを実現しています。

### 1. ブランドカラー（Brand Colors）
```typescript
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

- **Success**: #10B981 (緑系)
- **Warning**: #F59E0B (黄系)
- **Error**: #EF4444 (赤系)
- **Info**: #3B82F6 (青系)
- **Disabled**: #9CA3AF (グレー系)

### 3. テキストカラー（Text Colors）
- **Primary**: #111827 - 主要テキスト
- **Secondary**: #6B7280 - 副次テキスト
- **Disabled**: #D1D5DB - 無効テキスト
- **Inverse**: #FFFFFF - 反転テキスト

### 4. 背景カラー（Background Colors）
- **Primary**: #FFFFFF - メイン背景
- **Secondary**: #F9FAFB - セカンダリ背景
- **Tertiary**: #F3F4F6 - ターシャリ背景

### 5. 中性色（Neutral Colors）
50〜900のスケールを持つグレーパレット：
- **Gray 50**: #F9FAFB (最も明るい)
- **Gray 500**: #6B7280 (中間)
- **Gray 900**: #111827 (最も暗い)

### カラーユーティリティ機能
- **自動スケール生成**: ベースカラーから100〜900のスケールを自動生成
- **状態バリエーション**: hover、active、light、darkの状態を自動生成
- **HEX ↔ HSL変換**: カラー形式の相互変換
- **Tailwind統合**: generateTailwindColors()でTailwind設定に自動統合

### アクセシビリティ対応
- WCAG 2.1ガイドライン準拠
- 通常テキスト: 4.5:1以上のコントラスト比
- 大きなテキスト: 3:1以上のコントラスト比

### 使用例
```tsx
import { colors } from '@/design/tokens';

// ボタンスタイル
backgroundColor: colors.brand.primary[500],
color: colors.text.inverse,

// カードスタイル
backgroundColor: colors.background.primary,
borderColor: colors.neutral.gray[200],
```

---

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# コードチェック（Biome）
npm run lint

# コード修正（Biome）
npm run lint:fix

# コードフォーマット（Biome）
npm run format
```

---

## 📁 プロジェクト構造

```
├── app/                    # Next.js App Router
├── src/
│   ├── components/         # Reactコンポーネント
│   │   ├── ui/            # 基本UIコンポーネント（shadcn/ui）
│   │   ├── layout/        # レイアウトコンポーネント
│   │   └── features/      # 機能別コンポーネント
│   ├── design/
│   │   └── tokens/        # デザイントークン
│   │       ├── colors.ts  # カラーシステム
│   │       ├── colors-usage.md # カラー使用ガイド
│   │       ├── spacing.ts # スペーシング
│   │       └── typography.ts # タイポグラフィ
│   ├── hooks/             # カスタムフック
│   ├── lib/               # ユーティリティ
│   ├── models/            # 型定義
│   ├── services/          # APIサービス
│   └── utils/             # ヘルパー関数
├── tailwind.config.ts     # Tailwind設定
├── biome.json            # Biome設定
└── package.json          # 依存関係
```

このプロジェクトは、モダンなReact/Next.jsスタックと体系的なデザインシステムを組み合わせた、スケーラブルで保守性の高いWebアプリケーション開発環境を提供しています。
