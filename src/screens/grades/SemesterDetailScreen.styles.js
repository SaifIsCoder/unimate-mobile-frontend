import { StyleSheet } from "react-native";
import { COLORS, RADIUS, FONT } from "../../theme";

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 8, gap: 12 },

  // ── Summary card ──────────────────────────────────────────────────────────
  summaryCard: {
    borderRadius: 20,
    padding: 18,
    overflow: "hidden",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryOrb: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.12)",
    top: -50,
    right: -40,
  },
  summaryTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  summaryTerm: {
    fontSize: 11,
    fontWeight: FONT.bold,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 1,
  },
  summaryGpaRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: 4,
  },
  summaryGpa: {
    fontSize: 34,
    fontWeight: FONT.bold,
    color: COLORS.white,
    letterSpacing: -1,
  },
  summaryGpaOutOf: {
    fontSize: 12,
    fontWeight: FONT.semiBold,
    color: "rgba(255,255,255,0.7)",
  },

  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.white,
  },

  summaryStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: RADIUS.md,
    paddingVertical: 10,
  },
  summaryStat: { flex: 1, alignItems: "center", gap: 2 },
  summaryStatNum: {
    fontSize: 18,
    fontWeight: FONT.bold,
    color: COLORS.white,
  },
  summaryStatLabel: {
    fontSize: 9,
    fontWeight: FONT.bold,
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 0.8,
  },
  summaryDivider: {
    width: 1,
    height: 26,
    backgroundColor: "rgba(255,255,255,0.22)",
  },

  pendingBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  pendingText: {
    flex: 1,
    fontSize: 11,
    fontWeight: FONT.medium,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 16,
  },

  // ── Section header ────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },
  sectionCount: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.textTertiary,
    letterSpacing: 0.8,
  },

  // ── Course card ───────────────────────────────────────────────────────────
  courseCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    padding: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  courseTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  courseTitleWrap: { flex: 1, gap: 3 },
  courseName: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
    lineHeight: 19,
  },
  courseMeta: {
    fontSize: 11.5,
    color: COLORS.textSecondary,
  },

  gradeBlock: { alignItems: "center", gap: 4 },
  gradeBadge: {
    minWidth: 42,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: RADIUS.sm,
    alignItems: "center",
  },
  gradeLetter: {
    fontSize: 15,
    fontWeight: FONT.bold,
  },
  creditText: {
    fontSize: 9.5,
    fontWeight: FONT.bold,
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
  },

  marksRow: {
    flexDirection: "row",
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    paddingVertical: 9,
  },
  markCell: { flex: 1, alignItems: "center", gap: 2 },
  markLabel: {
    fontSize: 8.5,
    fontWeight: FONT.bold,
    color: COLORS.textTertiary,
    letterSpacing: 0.6,
  },
  markValue: {
    fontSize: 12.5,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
  },

  progressTrack: {
    height: 5,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: RADIUS.full,
  },
});

export default styles;
