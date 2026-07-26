import { StyleSheet } from "react-native";
import { COLORS, RADIUS, FONT } from "../theme";

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  summaryRow: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 2 },
  summaryText: { fontSize: 12, fontWeight: FONT.medium, color: COLORS.textSecondary },

  filterScroll: { flexGrow: 0, flexShrink: 0 },
  filterBar: { paddingHorizontal: 16, paddingVertical: 6, gap: 6 },

  listContent: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 25 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 10,
    gap: 10,
  },
  bar: { width: 3, alignSelf: "stretch", minHeight: 44, borderRadius: 2 },

  subName: { fontSize: 13, fontWeight: FONT.semiBold, color: COLORS.textPrimary },
  subMeta: { fontSize: 10.5, color: COLORS.textSecondary, marginTop: 2, marginBottom: 6 },

  track: {
    height: 5,
    backgroundColor: COLORS.bg,
    borderRadius: 3,
    overflow: "visible",
    position: "relative",
  },
  fill: { height: "100%", borderRadius: 3, position: "absolute", top: 0, left: 0 },
  marker: {
    position: "absolute",
    left: "75%",
    top: -2,
    width: 1.5,
    height: 9,
    backgroundColor: COLORS.textTertiary,
    borderRadius: 1,
  },

  right: { alignItems: "flex-end", gap: 4, minWidth: 62 },
  pct: { fontSize: 18, fontWeight: FONT.bold },
  badge: { borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1 },
  badgeText: { fontSize: 10, fontWeight: FONT.semiBold },

  footnote: {
    fontSize: 10.5,
    color: COLORS.textTertiary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 8,
  },

  emptyWrap: { alignItems: "center", gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: FONT.bold, color: COLORS.textPrimary },
  emptySub: { fontSize: 12, color: COLORS.textSecondary },
});

export default s;
