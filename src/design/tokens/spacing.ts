// 基本スペーシング値
const spacing = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

// レスポンシブスペーシング値
const responsiveSpacing = {
  xs: "0.5rem", // 8px
  sm: "0.75rem", // 12px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
  section: "1.5rem", // 24px
  page: "2rem", // 32px
} as const;

// Spacing variants (from Spacing.tsx component)
const variants = {
  section: "py-8 md:py-12 lg:py-16",
  element: "mb-6 md:mb-8 lg:mb-10",
  small: "mb-4 md:mb-6",
  large: "mb-8 md:mb-12 lg:mb-16",
  xl: "mt-12 md:mt-16 lg:mt-20",
} as const;

// コンテナパディング設定
const containerPadding = {
  DEFAULT: "1rem",
  sm: "1.5rem",
  md: "2rem",
  lg: "4rem",
  xl: "5rem",
  "2xl": "6rem",
} as const;

export const spacingTokens = {
  spacing,
  responsiveSpacing,
  variants,
  containerPadding,
} as const;

export type SpacingTokens = typeof spacingTokens;
export type SpacingVariant = keyof typeof variants;
export type SpacingKey = keyof typeof spacing;
export type ResponsiveSpacingKey = keyof typeof responsiveSpacing;

/**
 * Generate Tailwind CSS spacing configuration
 */
export function generateTailwindSpacing() {
  return {
    spacing: {
      ...spacing,
      // レスポンシブスペーシング
      "responsive-xs": responsiveSpacing.xs,
      "responsive-sm": responsiveSpacing.sm,
      "responsive-md": responsiveSpacing.md,
      "responsive-lg": responsiveSpacing.lg,
      "responsive-xl": responsiveSpacing.xl,
      "responsive-2xl": responsiveSpacing["2xl"],
      "responsive-3xl": responsiveSpacing["3xl"],
      // セクション間隔
      "responsive-section": responsiveSpacing.section,
      "responsive-page": responsiveSpacing.page,
    },
    container: {
      center: true,
      padding: containerPadding,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
  };
}
