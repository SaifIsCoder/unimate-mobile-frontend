import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext";

// ── Import your existing shared components ────────────────
import Header from "../../components/Header";
import Background from "../../components/Background";
// ── Design Tokens ─────────────────────────────────────────
const C = {
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

const R = { sm: 4, md: 8, lg: 12, xl: 18, full: 9999 };
const F = { regular: "400", semiBold: "600", bold: "700", extraBold: "800" };

// ── PASSWORD STRENGTH ─────────────────────────────────────
const getStrength = (val) => {
  let score = 0;
  if (val.length >= 8) score += 25;
  if (/[A-Z]/.test(val)) score += 25;
  if (/[0-9]/.test(val)) score += 25;
  if (/[^A-Za-z0-9]/.test(val)) score += 25;
  return score;
};

const getStrengthMeta = (score) => {
  if (score <= 25) return { label: "Weak", color: C.error };
  if (score <= 75) return { label: "Good", color: C.secondary };
  return { label: "Strong", color: C.primary };
};

// ── PASSWORD INPUT ────────────────────────────────────────
const PasswordInput = ({ label, value, onChange, showStrength }) => {
  const [visible, setVisible] = useState(false);
  const strength = showStrength ? getStrength(value) : 0;
  const meta = getStrengthMeta(strength);

  // Animated width for strength bar
  const widthAnim = useRef(new Animated.Value(0)).current;

  const handleChange = (text) => {
    onChange(text);
    if (showStrength) {
      Animated.timing(widthAnim, {
        toValue: getStrength(text),
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={s.fieldGroup}>
      <Text style={s.fieldLabel}>{label}</Text>

      {/* Input row */}
      <View style={s.inputWrapper}>
        <TextInput
          style={s.input}
          value={value}
          onChangeText={handleChange}
          secureTextEntry={!visible}
          placeholder="••••••••"
          placeholderTextColor={C.outlineVariant}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={s.eyeBtn}
          onPress={() => setVisible((v) => !v)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={visible ? "visibility-off" : "visibility"}
            size={20}
            color={C.onSurfaceVariant}
          />
        </TouchableOpacity>
      </View>

      {/* Strength bar — only on new password field */}
      {showStrength && (
        <View style={s.strengthSection}>
          <View style={s.strengthTrack}>
            <Animated.View
              style={[
                s.strengthFill,
                {
                  width: widthAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0%", "100%"],
                    extrapolate: "clamp",
                  }),
                  backgroundColor: meta.color,
                },
              ]}
            />
          </View>
          <View style={s.strengthLabels}>
            <Text style={[s.strengthLabel, { color: meta.color }]}>
              {value.length > 0 ? meta.label.toUpperCase() : "WEAK"}
            </Text>
            <Text style={s.strengthHint}>8+ Characters</Text>
          </View>
        </View>
      )}
    </View>
  );
};

// ── REQUIREMENTS BOX ──────────────────────────────────────
// Mirrors: <div class="bg-surface-container-low p-4 rounded-xl border ...">
const RequirementsBox = () => (
  <View style={s.reqBox}>
    <View style={s.reqTitleRow}>
      <MaterialIcons name="info" size={18} color={C.primary} />
      <Text style={s.reqTitle}>Academic Security Standards</Text>
    </View>
    <View style={s.reqList}>
      <View style={s.reqItem}>
        <MaterialIcons name="check-circle" size={14} color={C.primary} />
        <Text style={s.reqText}>One uppercase &amp; one lowercase</Text>
      </View>
      <View style={s.reqItem}>
        <MaterialIcons name="check-circle" size={14} color={C.primary} />
        <Text style={s.reqText}>One number or special symbol</Text>
      </View>
    </View>
  </View>
);

// ── SUBMIT BUTTON ─────────────────────────────────────────
const SubmitButton = ({ onPress, loading }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() =>
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
        }).start()
      }
      onPressOut={() =>
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start()
      }
    >
      <Animated.View
        style={[s.submitBtn, { transform: [{ scale: scaleAnim }] }]}
      >
        {loading ? (
          <Text style={s.submitText}>Securing...</Text>
        ) : (
          <>
            <Text style={s.submitText}>Update &amp; Sign In</Text>
            <MaterialIcons name="arrow-forward" size={18} color={C.onPrimary} />
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};

// ── SECURITY FOOTER PILL ──────────────────────────────────
// Mirrors: <div class="mt-8 flex items-center gap-2 bg-surface-container-high/50 px-4 py-2 rounded-full ...">
const SecurityFooter = () => (
  <View style={s.securityPill}>
    <MaterialIcons name="enhanced-encryption" size={16} color={C.secondary} />
    <Text style={s.securityText}>END-TO-END ENCRYPTED SESSION</Text>
  </View>
);

// ── MAIN SCREEN ───────────────────────────────────────────
export default function SetPasswordScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { logout } = useUser();

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMsg("Please enter and confirm your password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      await AsyncStorage.setItem("has_set_password", "true");
      await AsyncStorage.setItem("mock_user_password", newPassword);
      // Simulate saving delay
      setTimeout(async () => {
        setLoading(false);
        await logout(); // This will log the user out and bounce them back to login!
      }, 1200);
    } catch (err) {
      setLoading(false);
      setErrorMsg("Failed to save password. Please try again.");
    }
  };

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <Background />

      {/* TOP HEADER */}
      {/* <Header title="uniMate" /> */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={s.scroll}
          contentContainerStyle={[
            s.scrollContent,
            { paddingBottom: 40 + insets.bottom },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Logo & Branding ── */}
          {/* Mirrors: <div class="mb-10 text-center mt-12"> */}
          <View style={s.branding}>
            <View style={s.logoBox}>
              <MaterialIcons name="key" size={32} color={C.primary} />
            </View>
            <Text style={s.brandTitle}>Secure Your Account</Text>
            <Text style={s.brandSubtitle}>
              Since this is your first login, please set a new password to
              continue.
            </Text>
          </View>

          {/* ── Form Card ── */}
          {/* Mirrors: <div class="w-full glass-card border ... rounded-[18px] p-6"> */}
          <View style={s.card}>
            {errorMsg ? (
              <Text style={s.errorText}>{errorMsg}</Text>
            ) : null}

            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              showStrength
            />

            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              showStrength={false}
            />

            <RequirementsBox />

            <SubmitButton onPress={handleSubmit} loading={loading} />
          </View>

          {/* ── Security Footer ── */}
          <SecurityFooter />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── STYLES ────────────────────────────────────────────────
const s = StyleSheet.create({
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