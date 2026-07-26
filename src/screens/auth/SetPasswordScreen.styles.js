import { StyleSheet } from "react-native";

// ── Local design tokens ───────────────────────────────────
// This screen intentionally uses its own Material-you palette (distinct from the
// app theme), preserved as-is per the balanced token-migration policy.
export const C = {
  primary: "#2c2abc",
  primaryFixed: "#e1e0ff",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#d1d1ff",

  secondary: "#6b38d4",
  secondaryContainer: "#8455ef",

  surface: "#f9f9ff",
  surfaceContainer: "#e7eefe",
  surfaceContainerLow: "#f0f3ff",
  surfaceContainerHigh: "#e2e8f8",
  surfaceContainerLowest: "#ffffff",
  surfaceVariant: "#dce2f3",

  onSurface: "#151c27",
  onSurfaceVariant: "#464554",
  outline: "#767586",
  outlineVariant: "#c6c5d7",

  error: "#ba1a1a",
  background: "#f9f9ff",
};

export const R = { sm: 4, md: 8, lg: 12, xl: 18, full: 9999 };
export const F = { regular: "400", semiBold: "600", bold: "700", extraBold: "800" };

export const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "center",
    gap: 20,
  },

  // ── BRANDING ──
  branding: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 8,
    paddingHorizontal: 24,
    gap: 8,
  },

  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: C.primaryFixed,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    // shadow-sm
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  brandTitle: {
    fontSize: 22,
    fontWeight: F.bold,
    color: C.onSurface,
    textAlign: "center",
    letterSpacing: -0.2,
  },

  brandSubtitle: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 18,
  },

  // ── FORM CARD ──
  // glass-card effect: white 80% + border
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.80)",
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    padding: 24,
    gap: 20,
    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 3,
  },

  errorText: {
    color: C.error,
    fontSize: 13,
    fontWeight: F.semiBold,
    textAlign: "center",
    marginBottom: 4,
  },

  // ── FIELD ──
  fieldGroup: { gap: 6 },

  fieldLabel: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.onSurfaceVariant,
    marginLeft: 4,
    letterSpacing: 0.1,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    backgroundColor: C.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    borderRadius: R.lg,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: C.onSurface,
    height: "100%",
  },

  eyeBtn: {
    padding: 4,
    marginLeft: 8,
  },

  // ── STRENGTH BAR ──
  strengthSection: { gap: 4, paddingHorizontal: 4, paddingTop: 4 },

  strengthTrack: {
    height: 4,
    width: "100%",
    backgroundColor: C.surfaceVariant,
    borderRadius: R.full,
    overflow: "hidden",
  },

  strengthFill: {
    height: "100%",
    borderRadius: R.full,
  },

  strengthLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },

  strengthLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    letterSpacing: 0.8,
  },

  strengthHint: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
  },

  // ── REQUIREMENTS BOX ──
  reqBox: {
    backgroundColor: C.surfaceContainerLow,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}33`,
    padding: 16,
    gap: 8,
  },

  reqTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },

  reqTitle: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.primary,
    letterSpacing: 0.1,
  },

  reqList: { gap: 8 },

  reqItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  reqText: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
  },

  // ── SUBMIT BUTTON ──
  submitBtn: {
    height: 44,
    backgroundColor: C.primary,
    borderRadius: R.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  submitText: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.onPrimary,
    letterSpacing: 0.1,
  },

  // ── SECURITY FOOTER PILL ──
  securityPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: `${C.surfaceContainerHigh}80`,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: R.full,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}1A`,
    marginTop: 8,
  },

  securityText: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});

export default s;
