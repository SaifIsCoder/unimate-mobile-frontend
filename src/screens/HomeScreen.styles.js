import { StyleSheet } from "react-native";
import { COLORS, RADIUS, FONT } from "../theme";

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  // Welcome Banner
  welcomeBanner: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    marginBottom: 4,
  },
  welcomeBack: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  studentName: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  studentMetaRow: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 17,
    marginBottom: 10,
  },
  studentMetaPill: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  studentMetaText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },

  // Classes Banner
  bannerWrapper: { marginHorizontal: 16, marginTop: 14 },
  banner: {
    borderRadius: 20,
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 14,
    overflow: "hidden",
    position: "relative",
  },
  bannerCircle1: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -35,
    right: -25,
  },
  bannerCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.04)",
    bottom: -20,
    left: 50,
  },

  bannerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bannerDatePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bannerDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bannerDateText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  bannerCountBox: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    width: 56,
    height: 56,
    justifyContent: "center",
  },
  bannerCountNum: { fontSize: 26, fontWeight: "800", color: "#fff" },
  bannerCountLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },

  bannerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.72)",
    fontWeight: "500",
  },
  bannerSubBold: { fontWeight: "700", color: "#fff" },

  // Mini class strip inside banner
  bannerStrip: {
    flexDirection: "row",
    marginTop: 16,
    gap: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    paddingTop: 12,
  },
  bannerStripItem: { flex: 1, alignItems: "center", gap: 4 },
  bannerDot: { width: 7, height: 7, borderRadius: 4 },
  bannerStripName: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  bannerStripTime: {
    fontSize: 9,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },

  bannerTap: {
    marginTop: 12,
    fontSize: 11,
    color: "white",
    fontWeight: "600",
    alignSelf: "flex-end",
  },
});

export const alertStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#fff5f5",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fecaca",
    padding: 14,
  },
  hdr: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  hdrIcon: { fontSize: 13 },
  hdrText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#dc2626",
    letterSpacing: 0.8,
    flex: 1,
  },
  hdrLink: {},
  hdrLinkText: { fontSize: 11, color: "#dc2626", fontWeight: "600" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    gap: 10,
  },
  bar: {
    width: 3,
    height: "100%",
    borderRadius: 2,
    alignSelf: "stretch",
    minHeight: 40,
  },

  subName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  subMeta: { fontSize: 10, color: "#6b7280", marginBottom: 6 },

  track: {
    height: 5,
    backgroundColor: "#f3f4f6",
    borderRadius: 3,
    overflow: "visible",
    position: "relative",
  },
  fill: {
    height: "100%",
    borderRadius: 3,
    position: "absolute",
    top: 0,
    left: 0,
  },
  marker: {
    position: "absolute",
    left: "75%",
    top: -2,
    width: 1.5,
    height: 9,
    backgroundColor: "#9ca3af",
    borderRadius: 1,
  },

  right: { alignItems: "flex-end", gap: 4, minWidth: 60 },
  pct: { fontSize: 18, fontWeight: "700" },
  badge: {
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
  },
  badgeText: { fontSize: 10, fontWeight: "600" },
  footnote: { fontSize: 10, color: "#ef4444", marginTop: 4, opacity: 0.75 },
});

export const taskStyles = StyleSheet.create({
  wrap: { marginTop: 20, paddingHorizontal: 16 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },
  seeAll: { fontSize: 12, color: COLORS.primary, fontWeight: "600" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  urgentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 2,
    alignSelf: "flex-start",
  },
  taskTitle: { fontSize: 13, fontWeight: "600", color: COLORS.textPrimary },
  taskMeta: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },

  urgentBadge: {
    backgroundColor: "#fef2f2",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  urgentText: { fontSize: 10, color: "#dc2626", fontWeight: "600" },
});

export const eventStyles = StyleSheet.create({
  wrap: { marginTop: 15, paddingBottom: 8 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },
  seeAll: { fontSize: 12, color: COLORS.primary, fontWeight: "600" },
  cardContainer: {
    marginHorizontal: 18,
  },
  card: {
    width: 160,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderColor: COLORS.border,
    gap: 3,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  evTitle: { fontSize: 13, fontWeight: "700", color: COLORS.textPrimary },
  evDate: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  evLocRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  evLoc: { fontSize: 10, color: COLORS.textTertiary },
});
