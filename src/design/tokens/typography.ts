// フォントファミリー
const fontFamily = {
  sans: [
    "Noto Sans JP",
    "Hiragino Kaku Gothic ProN",
    "Yu Gothic",
    "YuGothic",
    "Meiryo",
    "system-ui",
    "-apple-system",
    "sans-serif",
  ],
  serif: [
    "Noto Serif JP",
    "Hiragino Mincho ProN",
    "Yu Mincho",
    "YuMincho",
    "serif",
  ],
  mono: ["SFMono-Regular", "Consolas", "Menlo", "Monaco", "monospace"],
} as const;

// フォントサイズ（基本サイズ定義）
const fontSize = {
  xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
  sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
  base: ["1rem", { lineHeight: "1.5rem" }], // 16px
  lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
  xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
  "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
  "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
  "5xl": ["3rem", { lineHeight: "1" }], // 48px
  "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
  "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
  "8xl": ["6rem", { lineHeight: "1" }], // 96px
  "9xl": ["8rem", { lineHeight: "1" }], // 128px
} as const;

// フォントウェイト
const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

// 行の高さ
const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
} as const;

// 文字間隔
const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

// レスポンシブテキストスタイル
const textStyles = {
  // 見出し
  h1: {
    desktop: {
      fontSize: "2rem", // 32px - 近い値がないため直接指定
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: "1.75rem", // 28px - 近い値がないため直接指定
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight.normal,
    },
  },
  h2: {
    desktop: {
      fontSize: "1.75rem", // 28px - 近い値がないため直接指定
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize["2xl"][0], // 24px
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
    },
  },
  h3: {
    desktop: {
      fontSize: fontSize["2xl"][0], // 24px
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize.xl[0], // 20px
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.normal,
    },
  },
  h4: {
    desktop: {
      fontSize: fontSize.xl[0], // 20px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize.lg[0], // 18px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.normal,
    },
  },
  h5: {
    desktop: {
      fontSize: fontSize.lg[0], // 18px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize.base[0], // 16px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.normal,
    },
  },
  h6: {
    desktop: {
      fontSize: fontSize.base[0], // 16px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize.sm[0], // 14px
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.normal,
    },
  },
  // 本文
  bodyLarge: {
    desktop: {
      fontSize: fontSize.xl[0], // 20px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize.lg[0], // 18px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
    },
  },
  body: {
    desktop: {
      fontSize: fontSize.lg[0], // 18px (デフォルト)
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize.base[0], // 16px (デフォルト)
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
    },
  },
  bodySmall: {
    desktop: {
      fontSize: fontSize.base[0], // 16px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize.sm[0], // 14px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
    },
  },
  // キャプション
  caption: {
    desktop: {
      fontSize: fontSize.sm[0], // 14px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
    },
    mobile: {
      fontSize: fontSize.xs[0], // 12px
      fontWeight: fontWeight.normal,
      lineHeight: lineHeight.normal,
    },
  },
} as const;

// ブレークポイント（参考用）
const breakpoints = {
  mobile: "640px",
  tablet: "768px",
  desktop: "1024px",
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
  breakpoints,
} as const;

export type Typography = typeof typography;
