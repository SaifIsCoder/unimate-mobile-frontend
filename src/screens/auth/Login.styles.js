import { StyleSheet } from "react-native";

// ── Local design tokens ───────────────────────────────────
// This screen intentionally uses its own Material-you palette (distinct from the
// app theme), preserved as-is per the balanced token-migration policy.
export const C = {
  primary: "#2c2abc",
  primaryFixed: "#e1e0ff",
  onPrimary: "#ffffff",

  secondary: "#6b38d4",

  surface: "#f9f9ff",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f0f3ff",

  onSurface: "#151c27",
  onSurfaceVariant: "#464554",
  outline: "#767586",
  outlineVariant: "#c6c5d7",

  background: "#f9f9ff",
};

export const R = { sm: 4, md: 8, lg: 12, xl: 18, full: 9999 };
export const F = { regular: "400", semiBold: "600", bold: "700", extraBold: "800" };

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.background },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 48,
    gap: 24,
  },

  // ── BRANDING ──
  branding: {
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },

  logoBox: {
    width: 100,
    height: 90,
    borderRadius: 18,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },

  brandName: {
    fontSize: 22,
    fontWeight: F.extraBold,
    letterSpacing: -0.3,
  },

  brandTagline: {
    fontSize: 13,
    fontWeight: F.regular,
    color: C.onSurfaceVariant,
  },

  // ── CARD ──
  card: {
    width: "100%",
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    padding: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },

  errorText: {
    color: "#ba1a1a",
    fontSize: 13,
    fontWeight: F.semiBold,
    textAlign: "center",
    marginBottom: 4,
  },

  // ── FIELD ──
  fieldGroup: { gap: 6 },

  fieldLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginLeft: 2,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    backgroundColor: C.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    borderRadius: R.lg,
    paddingHorizontal: 12,
  },

  inputWrapperFocused: {
    borderColor: C.primary,
    borderWidth: 2,
  },

  leftIcon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: C.onSurface,
    height: "100%",
  },

  eyeBtn: {
    padding: 4,
    marginLeft: 6,
  },

  // ── FORGOT ──
  forgotWrapper: {
    alignSelf: "flex-end",
    marginTop: -8,
  },

  forgotText: {
    fontSize: 12,
    fontWeight: F.semiBold,
    color: C.primary,
  },

  // ── CHECKBOX ──
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: C.outlineVariant,
    backgroundColor: C.surfaceContainerLowest,
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },

  checkboxLabel: {
    fontSize: 13,
    color: C.onSurfaceVariant,
  },

  // ── SIGN IN BUTTON ──
  signInBtn: {
    height: 44,
    backgroundColor: C.primary,
    borderRadius: R.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  signInText: {
    fontSize: 15,
    fontWeight: F.bold,
    color: C.onPrimary,
    letterSpacing: 0.1,
  },
});

export default s;
