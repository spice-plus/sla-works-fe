/**
 * アプリケーション全体で使用される定数
 */

// アプリメタデータ
export const APP_NAME = "Next.js Starter";
export const APP_DESCRIPTION =
  "A modern Next.js starter with TypeScript and shadcn/ui";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// API設定
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
export const API_TIMEOUT = 30000; // 30 seconds

// ストレージキー
export const STORAGE_KEYS = {
  THEME: "theme",
  LOCALE: "locale",
  USER_PREFERENCES: "user_preferences",
} as const;

// ルート
export const ROUTES = {
  HOME: "/",
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  GENERIC: "何かが間違っています。もう一度お試しください。",
  NETWORK: "ネットワークエラーです。接続を確認してください。",
  UNAUTHORIZED: "この操作を実行する権限がありません。",
  NOT_FOUND: "要求されたリソースが見つかりませんでした。",
  VALIDATION: "入力内容を確認してもう一度お試しください。",
} as const;

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  SAVED: "変更が正常に保存されました。",
  DELETED: "アイテムが正常に削除されました。",
  CREATED: "アイテムが正常に作成されました。",
  UPDATED: "アイテムが正常に更新されました。",
} as const;

// 正規表現パターン
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{4,6}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

// 日付フォーマット
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  INPUT: "yyyy-MM-dd",
  DATETIME: "MMM dd, yyyy HH:mm",
  TIME: "HH:mm",
} as const;
