import { StyleSheet } from "react-native";
import { COLORS, RADIUS, FONT } from "../../theme";

export const s = StyleSheet.create({
  container: { flex: 1 },
  filterScroll: { flexGrow: 0, flexShrink: 0 },
  filterBar: { paddingHorizontal: 16, paddingVertical: 6, gap: 6 },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
  },
  emoji: { marginTop: 2 },
  headerText: { flex: 1 },
  title: { fontSize: 15, fontWeight: FONT.bold, color: COLORS.textPrimary },
  date: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  tagRow: { flexDirection: "row", gap: 6, marginBottom: 8 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: RADIUS.sm },
  tagText: { fontSize: 10, fontWeight: FONT.semiBold },
  message: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 10,
  },
  empty: { alignItems: "center", paddingHorizontal: 40 },
  emptyIcon: { marginBottom: 10 },
  emptyTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySub: { fontSize: 11, color: COLORS.textSecondary, textAlign: "center" },
});

export default s;
