import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../theme";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginRight: 16,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -0.5,
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  aiBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#c4b5fd",
    // soft shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 15, 26, 0.45)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
    maxHeight: height * 0.7,
    // strong shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#e5e7eb",
    alignSelf: "center",
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  aiIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  modalSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "500",
    marginTop: 1,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },

  // AI Bubble
  aiBubbleContainer: {
    marginBottom: 20,
  },
  aiBubble: {
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#e9e5ff",
    padding: 18,
    overflow: "hidden",
    position: "relative",
  },
  // Keeps the bubble roughly its loaded height while the copilot is fetching
  aiBubbleLoading: {
    minHeight: 96,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  aiBubbleLoadingText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  aiBubbleWatermark: {
    position: "absolute",
    right: -10,
    top: -10,
    opacity: 0.04,
  },
  aiBubbleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  aiBubbleTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#7c3aed",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  aiBubbleText: {
    fontSize: 14,
    color: "#1e1b4b",
    lineHeight: 22,
    fontWeight: "500",
  },

  // Suggestion Chips
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.textTertiary,
    letterSpacing: 1.2,
    marginBottom: 10,
    marginLeft: 4,
  },
  chipsRow: {
    paddingBottom: 16,
    gap: 8,
    paddingLeft: 2,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 6,
    // subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  chipContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: "#fff",
  },

  // Footer
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
    marginTop: 6,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  footerText: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textTertiary,
    lineHeight: 16,
    fontWeight: "500",
  },
});

export default styles;
