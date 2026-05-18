import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

// ── Import your existing shared components ────────────────
import Background from "../../components/Background";
import { COLORS } from "../../theme/theme";
import { useUser } from "../../context/UserContext";
import { loginUser } from "../../services/authService";
// ── Design Tokens ─────────────────────────────────────────
const C = {
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

const R = { sm: 4, md: 8, lg: 12, xl: 18, full: 9999 };
const F = { regular: "400", semiBold: "600", bold: "700", extraBold: "800" };

// ── LOGO BOX ──────────────────────────────────────────────
const LogoBox = () => (
  <View style={s.logoBox}>
    {/* <MaterialIcons name="auto-awesome" size={32} color={C.onPrimary} /> */}
    <Image source={require("../../../assets/images/splash-screen-icon.png")} style={s.logo} resizeMode="contain" width={100} height={100}/>
  </View>
);

// ── INPUT FIELD ───────────────────────────────────────────
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  keyboardType = "default",
  leftIcon,
  rightElement,
  secureTextEntry = false,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={s.fieldGroup}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View
        style={[
          s.inputWrapper,
          focused && s.inputWrapperFocused,
        ]}
      >
        {leftIcon && (
          <MaterialIcons
            name={leftIcon}
            size={18}
            color={focused ? C.primary : C.outline}
            style={s.leftIcon}
          />
        )}
        <TextInput
          style={s.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={C.outlineVariant}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {rightElement}
      </View>
    </View>
  );
};

// ── SIGN IN BUTTON ────────────────────────────────────────
const SignInButton = ({ onPress, loading }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() =>
        Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true }).start()
      }
      onPressOut={() =>
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start()
      }
    >
      <Animated.View style={[s.signInBtn, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={s.signInText}>{loading ? "Signing In..." : "Sign In"}</Text>
        {!loading && (
          <MaterialIcons name="arrow-forward" size={18} color={C.onPrimary} />
        )}
      </Animated.View>
    </Pressable>
  );
};

// ── MAIN SCREEN ───────────────────────────────────────────
export default function Login({ navigation }) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useUser();

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMsg("Email and password are required.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const mockUser = await loginUser(email, password, "UOS");
      await setUser(mockUser);
    } catch (err) {
      setErrorMsg(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={[
            s.scrollContent,
            { paddingBottom: 40 + insets.bottom },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Branding ── */}
          <View style={s.branding}>
            <LogoBox />
            <Text style={s.brandName}>uni<Text style={{ color: COLORS.primary, fontWeight: F.extraBold }}>Mate</Text></Text>
            <Text style={s.brandTagline}>Welcome Back, Scholar!</Text>
          </View>

          {/* ── Form Card ── */}
          <View style={s.card}>
            {errorMsg ? (
              <Text style={s.errorText}>{errorMsg}</Text>
            ) : null}

            {/* Email */}
            <InputField
              label="INSTITUTIONAL EMAIL"
              value={email}
              onChange={setEmail}
              placeholder="you@university.edu"
              keyboardType="email-address"
              leftIcon="person-outline"
            />

            {/* Password */}
            <InputField
              label="PASSWORD"
              value={password}
              onChange={setPassword}
              placeholder="••••"
              secureTextEntry={!showPassword}
              leftIcon="lock-outline"
              rightElement={
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  activeOpacity={0.7}
                  style={s.eyeBtn}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility-off" : "visibility"}
                    size={20}
                    color={C.outline}
                  />
                </TouchableOpacity>
              }
            />

            {/* Forgot Password — inline with PASSWORD label */}
            <TouchableOpacity
              style={s.forgotWrapper}
              activeOpacity={0.7}
            >
              <Text style={s.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Keep me signed in */}
            <TouchableOpacity
              style={s.checkboxRow}
              onPress={() => setKeepSignedIn((v) => !v)}
              activeOpacity={0.7}
            >
              <View style={[s.checkbox, keepSignedIn && s.checkboxChecked]}>
                {keepSignedIn && (
                  <MaterialIcons name="check" size={12} color={C.onPrimary} />
                )}
              </View>
              <Text style={s.checkboxLabel}>Keep me signed in</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <SignInButton onPress={handleSignIn} loading={loading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── STYLES ────────────────────────────────────────────────
const s = StyleSheet.create({
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
    // color: C.onSurface,
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
    shadowOpacity: 0.30,
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