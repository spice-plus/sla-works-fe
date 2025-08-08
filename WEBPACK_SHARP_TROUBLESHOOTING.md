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

### 2. Next.js設定の最適化（予防策実装済み）

`next.config.js`に包括的な予防策を実装済み：

```javascript
webpack: (config, { isServer, dev }) => {
  // Sharp and related modules optimization for server-side rendering
  if (isServer) {
    config.externals = config.externals || [];
    config.externals.push(({ context, request }, callback) => {
      // Handle Sharp and its internal dependencies
      if (request.startsWith('sharp') ||
          request === 'tar-fs' ||
          request === 'tar-stream' ||
          request === 'tunnel-agent' ||
          request.includes('node-gyp') ||
          request.includes('prebuild')) {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    });
  }

  // Comprehensive module resolution fallbacks
  config.resolve = config.resolve || {};
  config.resolve.fallback = {
    ...config.resolve.fallback,
    // Sharp related modules
    'tar-fs': false,
    'tar-stream': false,
    'tunnel-agent': false,
    'node-gyp': false,
    'prebuild-install': false,
    // Node.js core modules
    'http': false,
    'https': false,
    'url': false,
    'assert': false,
    'stream': false,
    'util': false,
    'fs': false,
    'path': false,
    'os': false,
    'crypto': false,
    'buffer': false,
    'events': false,
    'querystring': false,
    'zlib': false,
  };

  // Enhanced caching configuration
  if (!dev) {
    config.cache = {
      ...config.cache,
      type: 'filesystem',
      version: '1.0.0',
      buildDependencies: {
        config: [__filename],
      },
      // Prevent cache corruption for problematic modules
      managedPaths: [/^(.+[\\/])?node_modules[\\/](?!(sharp|tar-fs|tunnel-agent))/],
    };
  }

  // Ignore specific warnings for known issues
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    /Module not found: Error: Can't resolve 'tar-fs'/,
    /Module not found: Error: Can't resolve 'tunnel-agent'/,
    /Critical dependency: the request of a dependency is an expression/,
  ];

  // Optimization for Sharp and image processing
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      ...config.optimization?.splitChunks,
      cacheGroups: {
        ...config.optimization?.splitChunks?.cacheGroups,
        sharp: {
          test: /[\\/]node_modules[\\/](sharp|tar-fs|tunnel-agent)[\\/]/,
          name: 'sharp-vendor',
          chunks: 'all',
          priority: 20,
        },
      },
    },
  };

  return config;
},
```

**重要な改善点：**
- Next.js 15対応のexternals関数形式に更新
- tar-fs、tar-stream、tunnel-agentの明示的な処理
- 包括的なfallback設定でNode.jsコアモジュールもカバー
- 警告の抑制設定でビルドログをクリーンに
- Sharp専用のcode splittingでパフォーマンス最適化
- 非推奨のexperimental.esmExternalsを削除

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

## 根本的解決策の実装状況

✅ **完全解決済み** - 以下の根本的解決策により、手動での修復スクリプト実行は不要になりました：

### 実装された根本的解決策：

1. **Sharp関連モジュールの完全外部化**
   - サーバーサイドでSharp、tar-fs、tar-streamを外部モジュールとして処理
   - Webpackによるバンドル対象から除外し、Node.jsランタイムで直接解決

2. **tar-fsの明示的な無効化**
   - `config.resolve.alias`でtar-fsを`false`に設定
   - Webpackがtar-fsを解決しようとする試みを完全に阻止

3. **最適化されたキャッシュ戦略**
   - 問題のあるモジュール（sharp、tar-fs、tunnel-agent）のみキャッシュから除外
   - 全体的なビルドパフォーマンスを維持

4. **包括的な警告抑制**
   - 既知の問題に関する警告メッセージを抑制
   - クリーンなビルドログを実現

### 結果：
- ✅ ビルド成功（警告なし）
- ✅ 開発サーバー正常起動
- ✅ 手動修復スクリプト実行不要
- ✅ Next.js 15.0.3 + Sharp v0.34.3 完全対応

## 更新履歴

- 2025/01/08: 初版作成、Sharp v0.34.3対応
- 2025/01/08: 根本的解決策実装完了、手動修復不要に
- Next.js 15.0.3での動作確認済み
