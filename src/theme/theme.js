// ─── THEME CONSTANTS ──────────────────────────────────────────────────────────
// All colours, radii and spacing used across the app live here.
// Centralised so any redesign is a one-file change.

export const COLORS = {
  // Brand purple
  primary: '#5B4AE8',
  primary2: '#7B6CF0',
  primary3: '#EEF0FF',

  // Green
  green: '#1DB87A',
  green2: '#E6F9F2',

  // Orange
  orange: '#F5820A',
  orange2: '#FEF3E2',

  // Blue
  blue: '#2196F3',
  blue2: '#E8F4FF',

  // Red
  red: '#E53935',
  red2: '#FFEBEE',

  // Text
  textPrimary: '#0F0F1A',
  textSecondary: '#6B7080',
  textTertiary: '#9EA5B5',

  // UI
  bg: '#f5f3ff',
  card: '#FFFFFF',
  border: '#EAEDF5',
  // Gradients (used as array in LinearGradient)
  gradientPurple: ['#5B4AE8', '#9C6CF8', '#C084FC'],
  gradientGreen: ['#1DB87A', '#0EA5E9'],
  gradientRed: ['#FF4757', '#E53935'],
  gradientProfile: ['#5B4AE8', '#9C6CF8'],
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const FONT = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

// Accent colour helper – used by class cards, assignment cards, etc.
export const ACCENT = {
  purple: { border: COLORS.primary, bg: COLORS.primary3, text: COLORS.primary },
  green:  { border: COLORS.green,   bg: COLORS.green2,   text: COLORS.green   },
  blue:   { border: COLORS.blue,    bg: COLORS.blue2,    text: COLORS.blue    },
  orange: { border: COLORS.orange,  bg: COLORS.orange2,  text: COLORS.orange  },
  red:    { border: COLORS.red,     bg: COLORS.red2,     text: COLORS.red     },
};
