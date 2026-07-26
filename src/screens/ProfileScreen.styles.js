import { StyleSheet } from "react-native";
import { COLORS, RADIUS, FONT } from "../theme";

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  heroGradient: { paddingVertical: 50, position: "relative", overflow: "hidden" },
  heroCircle: {
    position: "absolute",
    top: -20,
    right: -10,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  // Rounded white arc at hero bottom
  heroCurve: {
    position: "absolute",
    bottom: -30,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: COLORS.bg,
    borderRadius: 30,
  },

  avatarWrap: { alignItems: "center", marginTop: 12, marginBottom: 10 },
  profAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  profAvatarText: { color: "#fff", fontSize: 22, fontWeight: FONT.bold },
  profName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: FONT.bold,
    textAlign: "center",
    marginBottom: 2,
    width: "70%",
    alignSelf: "center",
  },
  profEmail: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  profTags: { flexDirection: "row", justifyContent: "center", gap: 6 },
  profTag: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
  },
  profTagText: { color: "#fff", fontSize: 11, fontWeight: FONT.medium },

  statGrid: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  statNum: { fontSize: 24, fontWeight: FONT.bold },
  statLbl: {
    fontSize: 11,
    color: COLORS.textTertiary,
    fontWeight: FONT.medium,
    marginTop: 2,
  },

  infoSection: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  infoSectionTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.textTertiary,
    fontWeight: FONT.medium,
  },
  infoVal: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: FONT.medium,
    textAlign: "right",
  },

  logoutBtn: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
  logoutTouchable: { paddingVertical: 12, alignItems: "center" },
  logoutText: { fontSize: 13, fontWeight: FONT.bold, color: "#fff" },
});

export default styles;
