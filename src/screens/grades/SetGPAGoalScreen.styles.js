import { StyleSheet } from "react-native";

// ── Local design tokens (Material-you palette, distinct from the app theme) ──
export const C = {
  primary: "#2c2abc",
  primaryContainer: "#4648d4",
  primaryFixed: "#e1e0ff",
  primaryFixedDim: "#c0c1ff",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#d1d1ff",

  secondary: "#6b38d4",
  secondaryContainer: "#8455ef",
  onSecondary: "#ffffff",
  onSecondaryContainer: "#fffbff",

  surface: "#f9f9ff",
  surfaceContainer: "#e7eefe",
  surfaceContainerLow: "#f0f3ff",
  surfaceContainerHigh: "#e2e8f8",
  surfaceContainerHighest: "#dce2f3",
  surfaceContainerLowest: "#ffffff",

  onSurface: "#151c27",
  onSurfaceVariant: "#464554",
  outline: "#767586",
  outlineVariant: "#c6c5d7",

  tertiary: "#40454d",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  background: "#f9f9ff",
};

export const R = { sm: 4, md: 8, lg: 12, xl: 18, full: 9999 };
export const F = { regular: "400", semiBold: "600", bold: "700", extraBold: "800" };

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },

  // ── SUMMARY ROW ──
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}33`,
    padding: 16,
    gap: 4,
    // shadow-sm
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  summaryLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  summaryValueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },

  summaryValue: {
    fontSize: 28,
    fontWeight: F.extraBold,
    color: C.primary,
    lineHeight: 34,
  },

  summaryUnit: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.secondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  // ── SLIDER SECTION ──
  sliderSection: {
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    padding: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sliderTitle: {
    fontSize: 16,
    fontWeight: F.bold,
    color: C.onSurface,
    letterSpacing: -0.1,
  },

  cgpaPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: R.full,
  },

  cgpaPillText: {
    fontSize: 18,
    fontWeight: F.bold,
  },

  // Custom slider with visible filled track
  sliderTrackWrapper: {
    position: "relative",
    height: 48,
    justifyContent: "center",
    marginHorizontal: -4,
  },

  trackBg: {
    position: "absolute",
    left: 12,
    right: 12,
    height: 8,
    backgroundColor: C.surfaceContainerHighest,
    borderRadius: R.full,
  },

  trackFill: {
    position: "absolute",
    left: 12,
    height: 8,
    backgroundColor: C.primary,
    borderRadius: R.full,
    // Glow effect
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },

  slider: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 48,
  },

  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sliderLabelText: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
  },

  // ── AI PANEL ──
  aiPanel: {
    backgroundColor: "#ffffff",
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.secondary}33`,
    padding: 20,
    gap: 12,
    overflow: "hidden",
    // ai-glow
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },

  aiWatermark: {
    position: "absolute",
    top: 12,
    right: 12,
    opacity: 0.2,
  },

  aiTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  aiTitle: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.secondary,
    letterSpacing: 0.1,
  },

  requiredBadge: {
    backgroundColor: C.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: R.lg,
    alignSelf: "flex-start",
  },

  requiredBadgeText: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSecondaryContainer,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  aiBody: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
  },

  aiBodyBold: {
    fontWeight: F.bold,
    color: C.onSurface,
  },

  sourceChip: {
    backgroundColor: C.surfaceContainerLow,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    padding: 10,
  },

  sourceChipText: {
    fontSize: 11,
    color: C.tertiary,
  },

  // ── INTENSITY ──
  intensitySection: {
    gap: 8,
  },

  intensityLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginLeft: 4,
  },

  intensityRow: {
    flexDirection: "row",
    gap: 8,
  },

  intensityBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    backgroundColor: "#ffffff",
  },

  intensityBtnActive: {
    backgroundColor: C.surfaceContainerLow,
    borderColor: C.primary,
    // ring-1 ring-primary effect
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },

  intensityBtnLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ── APPLY ──
  applyWrapper: {
    gap: 12,
    marginTop: 4,
  },

  applyBtn: {
    height: 44,
    backgroundColor: C.primary,
    borderRadius: R.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  applyBtnText: {
    fontSize: 14,
    fontWeight: F.bold,
    color: C.onPrimary,
  },

  applyHint: {
    fontSize: 10,
    color: C.onSurfaceVariant,
    textAlign: "center",
    opacity: 0.6,
  },
});

export default s;
