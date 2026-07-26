import { StyleSheet } from "react-native";

// ── Local design tokens (Material-you palette, distinct from the app theme) ──
export const C = {
  primary: "#2c2abc",
  primaryContainer: "#4648d4",
  primaryFixed: "#e1e0ff",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#d1d1ff",

  secondary: "#6b38d4",
  secondaryContainer: "#8455ef",
  onSecondaryContainer: "#fffbff",

  surface: "#f9f9ff",
  surfaceContainer: "#e7eefe",
  surfaceContainerLow: "#f0f3ff",
  surfaceContainerHighest: "#dce2f3",
  surfaceContainerLowest: "#ffffff",

  onSurface: "#151c27",
  onSurfaceVariant: "#464554",
  outline: "#767586",
  outlineVariant: "#c6c5d7",
  background: "#f9f9ff",
};

export const R = { sm: 4, md: 8, lg: 12, xl: 18, full: 9999 };
export const F = { regular: "400", semiBold: "600", bold: "700", extraBold: "800" };

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 20,
  },

  // ── PAGE HEADER ──
  pageHeader: { gap: 2 },
  pageTitle: {
    fontSize: 16,
    fontWeight: F.bold,
    color: C.onSurface,
    letterSpacing: -0.1,
  },
  pageSubtitle: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
  },

  // ── CGPA HERO ──
  heroWrapper: {
    borderRadius: R.xl,
    overflow: "hidden",
    // ai-glow
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },

  heroGradient: {
    borderRadius: R.xl,
    padding: 20,
    overflow: "hidden",
  },

  // Decorative orbs
  orbTopRight: {
    position: "absolute",
    top: -48,
    right: -48,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  orbBottomLeft: {
    position: "absolute",
    bottom: -32,
    left: -32,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(132,85,239,0.20)",
  },

  heroContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 10,
  },

  heroLeft: { flex: 1, gap: 16, marginRight: 12 },

  // CGPA number block
  cgpaBlock: { gap: 2 },
  cgpaLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: "rgba(255,255,255,0.70)",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  cgpaValueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  cgpaNumber: {
    fontSize: 32,
    fontWeight: F.bold,
    color: "#ffffff",
    lineHeight: 36,
  },
  cgpaOutOf: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: "rgba(255,255,255,0.80)",
    marginBottom: 2,
  },

  // Goal progress box — white/10 backdrop strip
  goalBox: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    padding: 12,
    gap: 8,
  },
  goalLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: "rgba(255,255,255,0.70)",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  goalTrack: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.20)",
    borderRadius: R.full,
    overflow: "hidden",
  },
  goalFill: {
    width: "85%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: R.full,
  },
  goalTarget: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: "#ffffff",
  },

  // Right — ring + label
  heroRight: { alignItems: "center", gap: 8 },
  ringWrapper: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  ringSvg: { position: "absolute" },
  ringCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  deanLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: "#ffffff",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // AI Insight banner
  insightBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.10)",
  },
  insightText: {
    flex: 1,
    fontSize: 11,
    fontWeight: F.semiBold,
    color: "rgba(255,255,255,0.90)",
    lineHeight: 16,
  },

  // ── SEMESTER SECTION ──
  section: { gap: 12 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.onSurface,
    letterSpacing: 0.1,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  downloadText: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  semList: { gap: 12 },

  // Semester row card
  semRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  semIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  semInfo: { flex: 1, gap: 2 },
  semName: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.onSurface,
  },
  semMeta: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
  },
  semGpaBlock: { alignItems: "flex-end", gap: 1 },
  semGpa: {
    fontSize: 16,
    fontWeight: F.bold,
    letterSpacing: -0.1,
  },
  semGpaLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  showMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: R.xl,
  },
  showMoreText: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.primary,
  },

  // ── TREND CARD ──
  trendCard: {
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}33`,
    padding: 20,
    overflow: "hidden",
    gap: 0,
    // ai-glow
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  trendWatermark: {
    position: "absolute",
    top: 16,
    right: 16,
    opacity: 0.2,
  },
  trendTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  trendTitle: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.onSurface,
  },
  trendBody: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 24,
  },
  trendHighlight: {
    color: C.primary,
    fontWeight: F.bold,
  },

  // Bar chart
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 80,
    gap: 12,
    paddingHorizontal: 8,
  },
  chartBarWrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    transformOrigin: "bottom",
  },
  chartBar: {
    width: "100%",
    borderTopLeftRadius: R.lg,
    borderTopRightRadius: R.lg,
  },

  // ── FAB ──
  fab: {
    position: "absolute",
    bottom: 88,
    right: 16,
    zIndex: 40,
  },
  fabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.secondary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default s;
