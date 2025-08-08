# Webpack Cache and Sharp Module Resolution Troubleshooting Guide

## 問題の概要

Next.jsプロジェクトでWebpackキャッシュ機能がsharpパッケージ内でtunnel-agentモジュールを解決できない問題が発生する場合があります。この問題は以下の状況で発生します：

- sharpパッケージが間接的な依存関係として存在する
- Webpackキャッシュが古い依存関係情報を保持している
- tunnel-agentのような内部依存関係の解決に失敗する

## 実装された解決策

### 1. Sharp パッケージの明示的なインストール

```bash
npm install sharp --save
```

sharpパッケージを直接の依存関係として追加することで、モジュール解決の問題を回避します。

### 2. Next.js設定の最適化

`next.config.js`に以下の設定を追加：

```javascript
webpack: (config, { isServer, dev }) => {
  // Sharp optimization for server-side rendering
  if (isServer) {
    config.externals = config.externals || [];
    config.externals.push({
      sharp: 'commonjs sharp'
    });
  }

  // Resolve tunnel-agent and other potential missing modules
  config.resolve = config.resolve || {};
  config.resolve.fallback = {
    ...config.resolve.fallback,
    'tunnel-agent': false,
    'http': false,
    'https': false,
    'url': false,
    'assert': false,
    'stream': false,
    'util': false,
  };

  // Optimize caching for sharp and related modules
  if (!dev) {
    config.cache = {
      ...config.cache,
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    };
  }

  return config;
},
// Experimental features for better module resolution
experimental: {
  esmExternals: 'loose',
},
```

### 3. 自動修復スクリプト

問題が発生した場合に使用できる修復スクリプトを作成：

```bash
npm run fix-webpack-cache
```

または手動でキャッシュをクリア：

```bash
npm run clean
```

## 使用方法

### 問題が発生した場合

1. **自動修復スクリプトを実行**：
   ```bash
   npm run fix-webpack-cache
   ```

2. **手動でキャッシュをクリア**：
   ```bash
   npm run clean
   npm install
   ```

3. **ビルドをテスト**：
   ```bash
   npm run build
   ```

### 予防策

- sharpパッケージを直接の依存関係として維持
- 定期的にキャッシュをクリア
- Next.jsとWebpackの設定を最新に保つ

## トラブルシューティング

### よくあるエラーメッセージ

1. **"Cannot resolve module 'tunnel-agent'"**
   - 解決策: `npm run fix-webpack-cache`を実行

2. **"Sharp installation failed"**
   - 解決策: `npm install sharp --save --force`

3. **"Webpack cache corruption"**
   - 解決策: `npm run clean`でキャッシュをクリア

### 確認コマンド

```bash
# Sharp の依存関係を確認
npm ls sharp

# tunnel-agent の存在を確認
find node_modules -name "*tunnel*" -type d

# キャッシュの状態を確認
ls -la .next/cache
```

## 注意事項

- `experimental.esmExternals: 'loose'`は実験的機能のため、本番環境での使用は慎重に検討してください
- 定期的に依存関係を更新し、互換性を確認してください
- ビルド時の警告メッセージを監視し、必要に応じて設定を調整してください

## 関連ファイル

- `next.config.js` - Webpack設定とモジュール解決の設定
- `scripts/fix-webpack-cache.js` - 自動修復スクリプト
- `package.json` - 依存関係とスクリプトの定義

## 更新履歴

- 2025/01/08: 初版作成、Sharp v0.34.3対応
- Next.js 15.0.3での動作確認済み
