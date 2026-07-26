import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import Background from "../../components/layout/Background";
import { COLORS } from "../../theme";
import { useUser } from "../../context/UserContext";
import { loginUser } from "../../services/authService";
import { s, C, F } from "./Login.styles";

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

