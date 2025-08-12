import {
  format,
  formatDistance,
  formatRelative,
  isValid,
  parseISO,
} from "date-fns";
import { enUS } from "date-fns/locale";

/**
 * 日付を指定した形式でフォーマットする
 * @param date - フォーマットする日付（Dateオブジェクトまたは ISO文字列）
 * @param formatStr - フォーマット文字列（デフォルト: 'PPP'）
 * @returns フォーマットされた日付文字列
 */
export function formatDate(
  date: Date | string,
  formatStr: string = "PPP"
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return "無効な日付";
  }

  // ハイドレーションエラーを防ぐため、特定のフォーマットではIntl.DateTimeFormatを使用
  if (formatStr === "yyyy/M/d") {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "UTC",
    }).format(dateObj);
  }

  // UTCタイムゾーンで統一するため、UTC成分を使って新しいDateオブジェクトを作成
  const utcDate = new Date(
    dateObj.getUTCFullYear(),
    dateObj.getUTCMonth(),
    dateObj.getUTCDate(),
    dateObj.getUTCHours(),
    dateObj.getUTCMinutes(),
    dateObj.getUTCSeconds(),
    dateObj.getUTCMilliseconds()
  );

  return format(utcDate, formatStr, { locale: enUS });
}

/**
 * 日付を相対時間でフォーマットする（例: "2時間前"）
 * @param date - フォーマットする日付
 * @param baseDate - 比較基準となる日付（デフォルト: 現在時刻）
 * @returns 相対時間文字列
 */
export function formatTimeAgo(
  date: Date | string,
  baseDate: Date = new Date()
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return "無効な日付";
  }

  return formatDistance(dateObj, baseDate, { addSuffix: true, locale: enUS });
}

/**
 * 日付を相対的な形式でフォーマットする（例: "昨日の午前10:00"）
 * @param date - フォーマットする日付
 * @param baseDate - 比較基準となる日付（デフォルト: 現在時刻）
 * @returns 相対形式文字列
 */
export function formatRelativeDate(
  date: Date | string,
  baseDate: Date = new Date()
): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  if (!isValid(dateObj)) {
    return "無効な日付";
  }

  return formatRelative(dateObj, baseDate, { locale: enUS });
}

/**
 * 一般的な日付フォーマットパターン
 */
export const dateFormats = {
  short: "MM/dd/yyyy",
  medium: "MMM dd, yyyy",
  long: "MMMM dd, yyyy",
  full: "EEEE, MMMM dd, yyyy",
  time: "HH:mm",
  timeWithSeconds: "HH:mm:ss",
  datetime: "MMM dd, yyyy HH:mm",
  iso: "yyyy-MM-dd'T'HH:mm:ss",
} as const;
