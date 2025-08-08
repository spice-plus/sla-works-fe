/**
 * メールアドレスのバリデーション
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 電話番号のバリデーション（基本的な国際形式）
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex =
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * URLのバリデーション
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * パスワード強度のバリデーション
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("パスワードは8文字以上である必要があります");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("パスワードには大文字を1文字以上含める必要があります");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("パスワードには小文字を1文字以上含める必要があります");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("パスワードには数字を1文字以上含める必要があります");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("パスワードには特殊文字を1文字以上含める必要があります");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 文字列が空または空白のみかをチェック
 */
export function isEmpty(value: string): boolean {
  return !value || value.trim().length === 0;
}

/**
 * オブジェクトの必須フィールドをバリデーション
 */
export function validateRequired<T extends Record<string, unknown>>(
  data: T,
  requiredFields: (keyof T)[]
): {
  isValid: boolean;
  missingFields: (keyof T)[];
} {
  const missingFields = requiredFields.filter((field) => {
    const value = data[field];
    return (
      value === undefined ||
      value === null ||
      (typeof value === "string" && isEmpty(value))
    );
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * 数値が範囲内にあるかをバリデーション
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * 文字列の長さをバリデーション
 */
export function isValidLength(
  value: string,
  min: number,
  max: number
): boolean {
  return value.length >= min && value.length <= max;
}

/**
 * 潜在的に有害な文字を削除して入力をサニタイズ
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // < と > を削除
    .replace(/javascript:/gi, "") // javascript: プロトコルを削除
    .replace(/on\w+\s*=/gi, "") // イベントハンドラーを削除
    .trim();
}
