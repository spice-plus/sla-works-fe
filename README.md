# Next.js + TypeScript + shadcn/ui Starter

シンプルで最小限のNext.jsスターターテンプレートです。

## 技術スタック

- **Next.js 15** - Reactフレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストのCSSフレームワーク
- **shadcn/ui** - 再利用可能なUIコンポーネント

## はじめに

### 必要な環境

- Node.js 18.17以上

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

## プロジェクト構造

```
src/
├── components/     # 再利用可能なUIコンポーネント
│   ├── layout/    # レイアウトコンポーネント
│   └── ui/        # shadcn/uiコンポーネント
├── models/        # TypeScript型定義
├── services/      # APIサービスとデータ取得
├── utils/         # ユーティリティ関数
├── lib/           # コアライブラリコード
├── hooks/         # カスタムReactフック
└── design/        # デザインシステムトークン

app/               # Next.js App Routerページ
```

## 特徴

- ✅ TypeScriptによる型安全性
- ✅ shadcn/uiによる美しいUIコンポーネント
- ✅ Tailwind CSSによる効率的なスタイリング
- ✅ ESLintとPrettierによるコード品質管理
- ✅ 整理されたプロジェクト構造

## ライセンス

MIT
