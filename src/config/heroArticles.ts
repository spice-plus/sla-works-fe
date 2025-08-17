// ヒーローセクションで表示するピックアップ記事のID配列
// 空配列の場合は、全て閲覧数順で15個選択される
// 例: [3, 12, 7] → 指定3個 + 閲覧数順12個 = 合計15個
export const FEATURED_ARTICLE_IDS: number[] = [
  // ピックアップしたい記事IDをここに追加
  // 例: 3, 12, 7
];

// ヒーローセクションで表示する記事の総数
export const HERO_ARTICLES_COUNT = 15;

// アニメーション設定
export const ANIMATION_INTERVAL = 4000; // 4秒間隔
export const ANIMATION_DELAY_STEP = 250; // 0.25秒の時差
