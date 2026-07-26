import { StyleSheet } from "react-native";

// ── Local design tokens (Material-you palette, distinct from the app theme) ──
// Preserved as named constants per the balanced token-migration policy.
export const COLORS = {
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

  background: "#f9f9ff",
  error: "#ba1a1a",
};

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 18,
  full: 9999,
};

export const FONT = {
  regular: "400",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: { flex: 1 },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 16,
  },

  // ── GPA HERO ──
  gpaHeroWrapper: {
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: `${COLORS.primary}33`,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  gpaHero: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: RADIUS.xl,
    padding: 20,
    gap: 0,
  },

  goalButton: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 99,
  },

  goalButtonText: {
    fontSize: 11,
    fontWeight: FONT.bold,
    color: COLORS.primary,
  },

  gpaContent: {
    marginTop: 4,
    marginBottom: 24,
  },

  gpaLabel: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: `${COLORS.onPrimaryContainer}CC`,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  gpaRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },

  gpaNumber: {
    fontSize: 40,
    fontWeight: FONT.extraBold,
    color: "white",
    letterSpacing: -0.5,
    lineHeight: 44,
  },

  gpaOutOf: {
    fontSize: 18,
    fontWeight: FONT.semiBold,
    color: `${COLORS.onPrimaryContainer}B3`,
    marginBottom: 4,
  },

  // Footer strip — mirrors white/10 backdrop
  gpaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: RADIUS.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  gpaFooterLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  gpaFooterText: {
    fontSize: 12,
    color: COLORS.onPrimaryContainer,
  },

  deansBadge: {
    backgroundColor: "rgba(209,209,255,0.2)",
    borderRadius: RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  deansBadgeText: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.onPrimaryContainer,
    letterSpacing: 0.5,
  },

  // ── SECTION HEADER ──
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.onSurface,
    letterSpacing: -0.1,
  },

  viewAll: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ── COURSE CARD ──
  courseCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${COLORS.outlineVariant}33`,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  courseName: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.onSurface,
    lineHeight: 22,
  },

  courseCode: {
    fontSize: 12,
    color: COLORS.outline,
    marginTop: 1,
  },

  gradeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  gradeText: {
    fontSize: 15,
    fontWeight: FONT.bold,
  },

  // ── PROGRESS ──
  progressSection: {
    gap: 4,
  },

  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  progressLabel: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.outlineVariant,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  progressTrack: {
    height: 8,
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: RADIUS.full,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: RADIUS.full,
  },

  // ── STAT PILLS ──
  statRow: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 4,
  },

  statPill: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: `${COLORS.outlineVariant}1A`,
    padding: 2,
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  statLabel: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.outline,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  statValue: {
    fontSize: 13,
    fontWeight: FONT.semiBold,
    color: COLORS.onSurface,
  },

  // ── FAB ──
  fab: {
    position: "absolute",
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 40,
  },

  fabIcon: {
    fontSize: 24,
  },

  // ── BOTTOM NAV ──
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.outlineVariant}4D`,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },

  navItemActive: {
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 8,
    transform: [{ scale: 0.9 }],
  },

  navLabel: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default styles;
