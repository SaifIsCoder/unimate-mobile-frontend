// ─── LAYOUT ───────────────────────────────────────────────────────────────────
// Border radii, icon sizing, and screen dimension helpers.

import { Dimensions } from 'react-native';

// Corner radii (values match the previous theme.js RADIUS — unchanged).
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

// Icon size scale (folded in from the former constants/sizes.js).
export const ICON_SIZE = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const { width, height } = Dimensions.get('window');

// Screen dimensions — prefer these over scattered `Dimensions.get('window')` calls.
export const SCREEN = {
  width,
  height,
};

export default RADIUS;
