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
};

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
};

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

// Typography variants (from Typography.tsx component)
const variants = {
  h1: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight md:tracking-normal",
  h2: "text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight md:tracking-normal",
  h3: "text-lg md:text-xl lg:text-2xl font-semibold tracking-normal",
  h4: "text-base md:text-lg lg:text-xl font-medium tracking-normal",
  "body-large": "text-lg md:text-xl leading-relaxed tracking-normal",
  body: "text-base md:text-lg leading-relaxed tracking-normal",
  "body-small": "text-sm md:text-base leading-normal tracking-normal",
  caption:
    "text-xs md:text-sm leading-tight tracking-normal text-muted-foreground",
  label: "text-sm font-medium leading-none tracking-normal",
} as const;

// Tracking classes for responsive design
const trackingClasses = {
  tight: "tracking-responsive-tight",
  normal: "tracking-responsive-normal",
  wide: "tracking-responsive-wide",
} as const;

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textStyles,
  breakpoints,
  variants,
  trackingClasses,
} as const;

export type Typography = typeof typography;
export type TypographyVariant = keyof typeof variants;
export type TrackingVariant = keyof typeof trackingClasses;

/**
 * Generate Tailwind CSS typography configuration
 */
export function generateTailwindTypography() {
  return {
    fontFamily: {
      sans: fontFamily.sans,
      serif: fontFamily.serif,
      mono: fontFamily.mono,
    },
    fontSize: {
      xs: fontSize.xs as [string, { lineHeight: string }],
      sm: fontSize.sm as [string, { lineHeight: string }],
      base: fontSize.base as [string, { lineHeight: string }],
      lg: fontSize.lg as [string, { lineHeight: string }],
      xl: fontSize.xl as [string, { lineHeight: string }],
      "2xl": fontSize["2xl"] as [string, { lineHeight: string }],
      "3xl": fontSize["3xl"] as [string, { lineHeight: string }],
      "4xl": fontSize["4xl"] as [string, { lineHeight: string }],
      "5xl": fontSize["5xl"] as [string, { lineHeight: string }],
      "6xl": fontSize["6xl"] as [string, { lineHeight: string }],
      "7xl": fontSize["7xl"] as [string, { lineHeight: string }],
      "8xl": fontSize["8xl"] as [string, { lineHeight: string }],
      "9xl": fontSize["9xl"] as [string, { lineHeight: string }],
      // レスポンシブタイポグラフィ
      "responsive-h1": ["1.75rem", { lineHeight: "1.5" }] as [
        string,
        { lineHeight: string },
      ],
      "responsive-h2": ["1.5rem", { lineHeight: "1.5" }] as [
        string,
        { lineHeight: string },
      ],
      "responsive-h3": ["1.25rem", { lineHeight: "1.5" }] as [
        string,
        { lineHeight: string },
      ],
      "responsive-h4": ["1.125rem", { lineHeight: "1.5" }] as [
        string,
        { lineHeight: string },
      ],
      "responsive-body-large": ["1.125rem", { lineHeight: "1.6" }] as [
        string,
        { lineHeight: string },
      ],
      "responsive-body": ["1rem", { lineHeight: "1.6" }] as [
        string,
        { lineHeight: string },
      ],
      "responsive-body-small": ["0.875rem", { lineHeight: "1.5" }] as [
        string,
        { lineHeight: string },
      ],
      "responsive-caption": ["0.75rem", { lineHeight: "1.4" }] as [
        string,
        { lineHeight: string },
      ],
    },
    fontWeight: {
      thin: fontWeight.thin,
      extralight: fontWeight.extralight,
      light: fontWeight.light,
      normal: fontWeight.normal,
      medium: fontWeight.medium,
      semibold: fontWeight.semibold,
      bold: fontWeight.bold,
      extrabold: fontWeight.extrabold,
      black: fontWeight.black,
    },
    lineHeight: {
      none: lineHeight.none,
      tight: lineHeight.tight,
      snug: lineHeight.snug,
      normal: lineHeight.normal,
      relaxed: lineHeight.relaxed,
      loose: lineHeight.loose,
    },
    letterSpacing: {
      tighter: letterSpacing.tighter,
      tight: letterSpacing.tight,
      normal: letterSpacing.normal,
      wide: letterSpacing.wide,
      wider: letterSpacing.wider,
      widest: letterSpacing.widest,
      // レスポンシブトラッキング
      "responsive-tight": "-0.025em",
      "responsive-normal": "0em",
      "responsive-wide": "0.025em",
    },
  };
}
