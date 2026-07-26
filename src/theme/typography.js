// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────
// Font weights and the type scale. `semiBold` was previously missing from the
// weight map (referenced ~25 times but undefined) — it now resolves to '600'.

export const FONT = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  // `c` kept as a back-compat alias for the old (mis-named) semi-bold key.
  c: '600',
};

// Type scale (folded in from the former constants/sizes.js).
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  title: 28,
  heading: 32,
};

export default FONT;
