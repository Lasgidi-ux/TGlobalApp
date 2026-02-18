// Color palette derived from the Figma design
export const colors = {
    // Primary
    primary: '#5B4CFF',
    primaryLight: '#E8E6FF',
    primaryDark: '#3D30CC',

    // Accent / Orange
    accent: '#FF6B35',
    accentLight: '#FFF0E8',

    // Backgrounds
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    cardBackground: '#FFFFFF',

    // Text
    textPrimary: '#1A1A2E',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    textAccent: '#FF6B35',

    // Borders
    border: '#E5E7EB',
    borderLight: '#F3F4F6',

    // Status
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Tags
    tagCovid: '#E8F4FD',
    tagCovidText: '#0EA5E9',
    tagVaccine: '#FEF3E2',
    tagVaccineText: '#F97316',

    // Shift card
    shiftCardBorder: '#E8E6FF',
    shiftCardBg: '#FAFAFE',
    shiftTimeText: '#FF6B35',

    // Bottom sheet
    bottomSheetHandle: '#D1D5DB',

    // Tab bar
    tabBarActive: '#5B4CFF',
    tabBarInactive: '#9CA3AF',
    tabBarBackground: '#FFFFFF',

    // Shadows
    shadowColor: '#000000',

    // Misc
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    currentTimeLine: '#5B4CFF',
    dotIndicator: '#5B4CFF',
} as const;

export type ColorKey = keyof typeof colors;
