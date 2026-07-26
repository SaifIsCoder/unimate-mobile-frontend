// ─── THEME (back-compat barrel) ───────────────────────────────────────────────
// The theme is now split into colors / typography / spacing / layout modules.
// This file re-exports them so existing `from '../theme/theme'` imports keep
// working unchanged. New code should import from '../theme' (index) instead.

export { COLORS, ACCENT } from './colors';
export { FONT, FONT_SIZE } from './typography';
export { SPACING } from './spacing';
export { RADIUS, ICON_SIZE, SCREEN } from './layout';
