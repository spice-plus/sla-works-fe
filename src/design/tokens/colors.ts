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

// グラデーション定義
const gradients = {
  radial: "radial-gradient(var(--tw-gradient-stops))",
  conic: "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  subtle: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
  warm: "linear-gradient(135deg, #fefbff 0%, #f8fafc 50%, #f1f5f9 100%)",
} as const;

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

  // グラデーション
  gradients,

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
 * shadcn/uiとの完全互換性を提供
 */
export function generateTailwindColors() {
  return {
    // shadcn/ui互換のカラー定義
    background: colors.background.primary,
    foreground: colors.text.primary,
    card: {
      DEFAULT: colors.background.primary,
      foreground: colors.text.primary,
    },
    popover: {
      DEFAULT: colors.background.primary,
      foreground: colors.text.primary,
    },
    primary: {
      DEFAULT: colors.brand.primary[500],
      foreground: colors.text.inverse,
      50: colors.brand.primary[50],
      100: colors.brand.primary[100],
      200: colors.brand.primary[200],
      300: colors.brand.primary[300],
      400: colors.brand.primary[400],
      500: colors.brand.primary[500],
      600: colors.brand.primary[600],
      700: colors.brand.primary[700],
      800: colors.brand.primary[800],
      900: colors.brand.primary[900],
    },
    secondary: {
      DEFAULT: colors.background.secondary,
      foreground: colors.text.secondary,
      50: colors.brand.secondary[50],
      100: colors.brand.secondary[100],
      200: colors.brand.secondary[200],
      300: colors.brand.secondary[300],
      400: colors.brand.secondary[400],
      500: colors.brand.secondary[500],
      600: colors.brand.secondary[600],
      700: colors.brand.secondary[700],
      800: colors.brand.secondary[800],
      900: colors.brand.secondary[900],
    },
    muted: {
      DEFAULT: colors.background.tertiary,
      foreground: colors.text.secondary,
    },
    accent: {
      DEFAULT: colors.background.tertiary,
      foreground: colors.text.primary,
    },
    destructive: {
      DEFAULT: colors.semantic.error.base,
      foreground: colors.text.inverse,
    },
    border: colors.neutral.gray[200],
    input: colors.neutral.gray[200],
    ring: colors.brand.primary[500],

    // セマンティックカラー
    success: {
      DEFAULT: colors.semantic.success.base,
      foreground: colors.text.inverse,
      light: colors.semantic.success.light,
      dark: colors.semantic.success.dark,
    },
    warning: {
      DEFAULT: colors.semantic.warning.base,
      foreground: colors.text.primary,
      light: colors.semantic.warning.light,
      dark: colors.semantic.warning.dark,
    },
    error: {
      DEFAULT: colors.semantic.error.base,
      foreground: colors.text.inverse,
      light: colors.semantic.error.light,
      dark: colors.semantic.error.dark,
    },
    info: {
      DEFAULT: colors.semantic.info.base,
      foreground: colors.text.inverse,
      light: colors.semantic.info.light,
      dark: colors.semantic.info.dark,
    },

    // 中性色
    gray: colors.neutral.gray,

    // チャートカラー（既存のものを保持）
    chart: {
      "1": "hsl(12, 76%, 61%)",
      "2": "hsl(173, 58%, 39%)",
      "3": "hsl(197, 37%, 24%)",
      "4": "hsl(43, 74%, 66%)",
      "5": "hsl(27, 87%, 67%)",
    },
  };
}

/**
 * Tailwind CSS用のグラデーション設定を生成
 */
export function generateTailwindGradients() {
  return {
    "gradient-radial": gradients.radial,
    "gradient-conic": gradients.conic,
    "gradient-subtle": gradients.subtle,
    "gradient-warm": gradients.warm,
  };
}

/**
 * ダークモード用のカラー設定を生成
 */
export function generateDarkModeColors() {
  return {
    background: colors.neutral.gray[900],
    foreground: colors.text.inverse,
    card: {
      DEFAULT: colors.neutral.gray[900],
      foreground: colors.text.inverse,
    },
    popover: {
      DEFAULT: colors.neutral.gray[900],
      foreground: colors.text.inverse,
    },
    primary: {
      DEFAULT: colors.text.inverse,
      foreground: colors.neutral.gray[900],
    },
    secondary: {
      DEFAULT: colors.neutral.gray[800],
      foreground: colors.text.inverse,
    },
    muted: {
      DEFAULT: colors.neutral.gray[800],
      foreground: colors.neutral.gray[400],
    },
    accent: {
      DEFAULT: colors.neutral.gray[800],
      foreground: colors.text.inverse,
    },
    destructive: {
      DEFAULT: "hsl(0, 62.8%, 30.6%)",
      foreground: colors.text.inverse,
    },
    border: colors.neutral.gray[800],
    input: colors.neutral.gray[800],
    ring: colors.neutral.gray[300],
  };
}
