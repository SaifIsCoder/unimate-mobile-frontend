import { StyleSheet } from "react-native";

// Note: this screen intentionally uses its own light palette (distinct from the
// app theme), preserved as-is per the balanced token-migration policy.
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F6FA",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    flex: 1,
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  counter: {
    textAlign: "right",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  cancel: {
    padding: 14,
  },
  cancelText: {
    color: "#6B7280",
  },
  post: {
    backgroundColor: "#1A56DB",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
  },
  postText: {
    color: "#fff",
    fontWeight: "600",
  },
  imageBtn: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    overflow: "hidden",
    marginTop: 4,
  },
  imagePlaceholder: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  imagePlaceholderText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  imagePreviewContainer: {
    height: 200,
    width: "100%",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImage: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
});

export default styles;
