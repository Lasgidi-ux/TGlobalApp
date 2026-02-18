import { TextStyle } from 'react-native';

export const fontSizes = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
} as const;

export const fontWeights: Record<string, TextStyle['fontWeight']> = {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
};

export const lineHeights = {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
};

export const typography = {
    // Headings
    h1: {
        fontSize: fontSizes['4xl'],
        fontWeight: fontWeights.bold,
        lineHeight: fontSizes['4xl'] * lineHeights.tight,
    } as TextStyle,
    h2: {
        fontSize: fontSizes['3xl'],
        fontWeight: fontWeights.bold,
        lineHeight: fontSizes['3xl'] * lineHeights.tight,
    } as TextStyle,
    h3: {
        fontSize: fontSizes['2xl'],
        fontWeight: fontWeights.semibold,
        lineHeight: fontSizes['2xl'] * lineHeights.tight,
    } as TextStyle,

    // Body
    bodyLg: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.regular,
        lineHeight: fontSizes.lg * lineHeights.normal,
    } as TextStyle,
    bodyMd: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.regular,
        lineHeight: fontSizes.md * lineHeights.normal,
    } as TextStyle,
    bodySm: {
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.regular,
        lineHeight: fontSizes.sm * lineHeights.normal,
    } as TextStyle,

    // Labels
    labelLg: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.medium,
        lineHeight: fontSizes.lg * lineHeights.tight,
    } as TextStyle,
    labelMd: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.medium,
        lineHeight: fontSizes.md * lineHeights.tight,
    } as TextStyle,
    labelSm: {
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.medium,
        lineHeight: fontSizes.sm * lineHeights.tight,
    } as TextStyle,

    // Caption
    caption: {
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.regular,
        lineHeight: fontSizes.xs * lineHeights.normal,
    } as TextStyle,
} as const;
