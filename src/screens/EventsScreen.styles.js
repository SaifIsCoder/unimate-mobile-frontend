import { StyleSheet } from "react-native";
import { COLORS, RADIUS, FONT } from "../theme";

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  filterScroll: { flexGrow: 0, flexShrink: 0 },
  filterBar: { paddingHorizontal: 16, paddingVertical: 6, gap: 6 },

  listContent: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 25 },

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  cardPast: { opacity: 0.6 },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { flex: 1, fontSize: 14, fontWeight: FONT.bold, color: COLORS.textPrimary },

  pastBadge: {
    backgroundColor: COLORS.bg,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pastBadgeText: { fontSize: 9, fontWeight: FONT.semiBold, color: COLORS.textSecondary },

  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  metaText: { fontSize: 11, color: COLORS.textSecondary },

  categoryTag: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  categoryTagText: { fontSize: 10, fontWeight: FONT.semiBold },

  emptyWrap: { alignItems: "center", gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: FONT.bold, color: COLORS.textPrimary },
  emptySub: { fontSize: 12, color: COLORS.textSecondary },
});

export default s;
