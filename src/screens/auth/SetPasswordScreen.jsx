import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext";

import Header from "../../components/layout/Header";
import Background from "../../components/layout/Background";
import { s, C, R, F } from "./SetPasswordScreen.styles";

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
