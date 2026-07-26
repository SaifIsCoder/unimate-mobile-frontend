import { StyleSheet } from "react-native";
import { COLORS } from "../theme";

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  // Unified Header styling is managed inside components/layout/Header

  // Date label
  dateLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textSecondary,
    paddingHorizontal: 16,
    marginTop: 2,
    marginBottom: 14,
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1,
  },
  sectionCount: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },

  // Empty state
  emptyWrap: { alignItems: "center", marginTop: 48, gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textPrimary },
  emptySub: { fontSize: 12, color: COLORS.textSecondary },
});

// Date Strip
export const stripStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#e9e5ff",
    // subtle shadow
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  monthLabel: { fontSize: 14, fontWeight: "700", color: COLORS.textPrimary },
  chevronBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  chipRow: { paddingHorizontal: 14, gap: 6, paddingBottom: 2 },
  chip: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 12,
    minWidth: 44,
    height: 54,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  chipWeekend: { opacity: 0.45 },
  chipDay: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  chipNum: { fontSize: 16, fontWeight: "700", color: COLORS.textSecondary },
  chipTextActive: { color: "#fff" },
});

// Class Card
export const cardStyles = StyleSheet.create({
  wrapper: {
    position: "relative",
    paddingLeft: 22,
    marginBottom: 12,
  },
  timelineLine: {
    position: "absolute",
    left: 7,
    top: 20,
    bottom: -12,
    width: 2,
    backgroundColor: "#e9e5ff",
    borderRadius: 1,
  },
  timelineDot: {
    position: "absolute",
    left: 2,
    top: 14,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2.5,
    borderColor: "#fff",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e9e5ff",
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  accentBar: { width: 4, borderRadius: 0 },
  body: { flex: 1, padding: 14 },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  statusPill: {
    alignSelf: "flex-start",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 5,
  },
  statusText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },

  className: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  classCode: { fontSize: 11, color: COLORS.textTertiary, fontWeight: "500" },
  time: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  metaRow: { flexDirection: "row", gap: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaMeta: { fontSize: 12, color: COLORS.textSecondary, fontWeight: "500" },

  prepBlock: {
    marginTop: 10,
    backgroundColor: "#ede9fe",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#c4b5fd",
  },
  prepText: { fontSize: 12, color: "#5b21b6", fontWeight: "600" },
});
