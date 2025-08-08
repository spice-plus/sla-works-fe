/**
 * カラーユーティリティ関数
 */

// HSL値を調整してカラースケールを生成
function adjustHSL(hsl: string, lightness: number): string {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return hsl;

  const [, h, s] = match;
  return `hsl(${h}, ${s}%, ${lightness}%)`;
}

// HEXをHSLに変換
function hexToHSL(hex: string): string {
  // ハッシュが存在する場合は削除
  hex = hex.replace(/^#/, "");

  // HEX値を解析
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h: number;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    case b:
      h = ((r - g) / d + 4) / 6;
      break;
    default:
      h = 0;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// カラースケールを生成
function generateColorScale(baseColor: string): Record<number, string> {
  const hsl = baseColor.startsWith("#") ? hexToHSL(baseColor) : baseColor;
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return { 500: baseColor };

  const [, h, s, l] = match;
  const hue = parseInt(h);
  const saturation = parseInt(s);
  const lightness = parseInt(l);

  return {
    50: `hsl(${hue}, ${Math.max(saturation - 20, 10)}%, 97%)`,
    100: `hsl(${hue}, ${Math.max(saturation - 15, 15)}%, 93%)`,
    200: `hsl(${hue}, ${Math.max(saturation - 10, 20)}%, 85%)`,
    300: `hsl(${hue}, ${Math.max(saturation - 5, 25)}%, 75%)`,
    400: `hsl(${hue}, ${saturation}%, 65%)`,
    500: hsl, // ベースカラー
    600: `hsl(${hue}, ${Math.min(saturation + 5, 90)}%, ${Math.max(lightness - 10, 25)}%)`,
    700: `hsl(${hue}, ${Math.min(saturation + 10, 95)}%, ${Math.max(lightness - 20, 20)}%)`,
    800: `hsl(${hue}, ${Math.min(saturation + 15, 100)}%, ${Math.max(lightness - 30, 15)}%)`,
    900: `hsl(${hue}, ${Math.min(saturation + 20, 100)}%, ${Math.max(lightness - 40, 10)}%)`,
  };
}

// 状態バリエーションを生成
function generateStateVariants(baseColor: string) {
  const hsl = baseColor.startsWith("#") ? hexToHSL(baseColor) : baseColor;
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) {
    return {
      base: baseColor,
      hover: baseColor,
      active: baseColor,
      light: baseColor,
      dark: baseColor,
    };
  }

  const [, h, s, l] = match;
  const lightness = parseInt(l);

  return {
    base: hsl,
    hover: `hsl(${h}, ${s}%, ${Math.max(lightness - 10, 0)}%)`,
    active: `hsl(${h}, ${s}%, ${Math.max(lightness - 20, 0)}%)`,
    light: `hsl(${h}, ${s}%, ${Math.min(lightness + 20, 95)}%)`,
    dark: `hsl(${h}, ${s}%, ${Math.max(lightness - 30, 10)}%)`,
  };
}

/**
 * カラー定義
 */

// ブランドカラー
const brandColors = {
  primary: generateColorScale("#2E3A97"),
  secondary: generateColorScale("#475569"),
  tertiary: generateColorScale("#059669"),
};

// 状態カラー
const stateColors = {
  success: generateStateVariants("#10B981"),
  warning: generateStateVariants("#F59E0B"),
  error: generateStateVariants("#EF4444"),
  info: generateStateVariants("#3B82F6"),
  disabled: generateStateVariants("#9CA3AF"),
};

// テキストカラー
const textColors = {
  primary: "#111827",
  secondary: "#6B7280",
  disabled: "#D1D5DB",
  inverse: "#FFFFFF",
  // スケール版
  scale: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
};

// 背景カラー
const backgroundColors = {
  primary: "#FFFFFF",
  secondary: "#F9FAFB",
  tertiary: "#F3F4F6",
  // スケール版
  scale: {
    50: "#FFFFFF",
    100: "#F9FAFB",
    200: "#F3F4F6",
    300: "#E5E7EB",
    400: "#D1D5DB",
    500: "#9CA3AF",
    600: "#6B7280",
    700: "#4B5563",
    800: "#374151",
    900: "#1F2937",
  },
};

/**
 * エクスポート用のカラーオブジェクト
 */
export const colors = {
  // ブランドカラー（スケール付き）
  brand: {
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    tertiary: brandColors.tertiary,
  },

  // セマンティックカラー（状態を表す）
  semantic: {
    success: stateColors.success,
    warning: stateColors.warning,
    error: stateColors.error,
    info: stateColors.info,
    disabled: stateColors.disabled,
  },

  // テキストカラー
  text: {
    primary: textColors.primary,
    secondary: textColors.secondary,
    disabled: textColors.disabled,
    inverse: textColors.inverse,
    scale: textColors.scale,
  },

  // 背景カラー
  background: {
    primary: backgroundColors.primary,
    secondary: backgroundColors.secondary,
    tertiary: backgroundColors.tertiary,
    scale: backgroundColors.scale,
  },

  // 中性色（UIコンポーネント用）
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
  },

  // レガシー互換性のための定義（既存のコードとの互換性）
  component: {
    card: "hsl(var(--card))",
    cardForeground: "hsl(var(--card-foreground))",
    popover: "hsl(var(--popover))",
    popoverForeground: "hsl(var(--popover-foreground))",
  },
} as const;

/**
 * 型定義
 */
export type Colors = typeof colors;
export type BrandColorKey = keyof typeof colors.brand;
export type SemanticColorKey = keyof typeof colors.semantic;
export type ColorScale =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
export type StateVariant = "base" | "hover" | "active" | "light" | "dark";

/**
 * ヘルパー関数のエクスポート
 */
export const colorUtils = {
  generateColorScale,
  generateStateVariants,
  hexToHSL,
  adjustHSL,
};

/**
 * Tailwind CSS用のカラー設定を生成
 */
export function generateTailwindColors() {
  return {
    primary: colors.brand.primary,
    secondary: colors.brand.secondary,
    tertiary: colors.brand.tertiary,
    success: colors.semantic.success.base,
    warning: colors.semantic.warning.base,
    error: colors.semantic.error.base,
    info: colors.semantic.info.base,
    gray: colors.neutral.gray,
  };
}
