"use client";

import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "../../services/authService";
import { useUser } from "../../context/UserContext";
import Background from "../../components/Background";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Floating Input
const FloatingInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = "default",
  autoCapitalize = "sentences",
  returnKeyType = "next",
  onSubmitEditing,
  inputRef,
  error,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(labelAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    if (!value) {
      Animated.timing(labelAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelTop = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 6],
  });

  const labelSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 11],
  });

  const labelColor = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      "#9ca3af",
      error ? "#ef4444" : focused ? "#7c3aed" : "#6b7280",
    ],
  });

  const borderColor = error ? "#ef4444" : focused ? "#7c3aed" : "#e5e7eb";

  return (
    <View style={[inputStyles.wrapper, { borderColor }]}>
      <Animated.Text
        style={[
          inputStyles.label,
          { top: labelTop, fontSize: labelSize, color: labelColor },
        ]}
      >
        {label}
      </Animated.Text>

      <TextInput
        ref={inputRef}
        style={inputStyles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor="transparent"
        placeholder=" "
      />

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setShowPassword((v) => !v)}
          style={inputStyles.eyeBtn}
        >
          <Text style={inputStyles.eyeText}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Background Shapes
const BgShapes = () => (
  <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
    <View style={styles.blob1} />
    <View style={styles.blob2} />
    <View style={styles.blob3} />
  </View>
);

// Logo
const LogoMark = () => (
  <View style={logo.container}>
    <View style={logo.outer}>
      <View style={logo.inner}>
        <View style={logo.shieldTop} />
        <View style={logo.shieldBottom} />
      </View>
    </View>
  </View>
);

// Main Screen
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setUser } = useUser();
  const passwordRef = useRef(null);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email.trim().toLowerCase())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const user = await loginUser(email.trim().toLowerCase(), password, "UOS");
      await setUser(user);
      navigation.replace("MainTabs");
    } catch (error) {
      const message =
        error?.message || "Something went wrong. Please try again.";
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f3ff" />

      {/* <BgShapes /> */}
      <Background />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <LogoMark />
            <Text style={styles.brand}>
              uni<Text style={styles.brandAccent}>Mate</Text>
            </Text>
            <Text style={styles.tagline}>
              Smarter Academics. Connected Students.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome back</Text>
            <Text style={styles.cardSubtitle}>Sign in to your account</Text>

            <FloatingInput
              label="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              error={!!errors.email}
            />

            <FloatingInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              inputRef={passwordRef}
              error={!!errors.password}
            />

            <TouchableOpacity onPress={handleLogin} disabled={loading}>
              <View style={styles.btn}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Sign in</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Styles
const inputStyles = StyleSheet.create({
  wrapper: {
    height: 58,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  label: {
    position: "absolute",
    left: 16,
  },
  input: {
    fontSize: 15,
    color: "#111827",
    paddingBottom: 8,
    paddingTop: 18,
  },
  eyeBtn: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  eyeText: {
    color: "#7c3aed",
  },
});

const logo = StyleSheet.create({
  container: { alignItems: "center" },
  outer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#7c3aed",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: { width: 36, height: 36 },
  shieldTop: {
    width: 28,
    height: 18,
    backgroundColor: "#fff",
  },
  shieldBottom: {
    width: 28,
    height: 10,
    backgroundColor: "#ddd",
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f3ff" },
  scroll: { flexGrow: 1, padding: 24 },
  header: { alignItems: "center", marginBottom: 20 },
  brand: { fontSize: 28, fontWeight: "bold" },
  brandAccent: { color: "#7c3aed" },
  tagline: { fontSize: 12 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 20 },
  cardTitle: { fontSize: 20, fontWeight: "bold" },
  cardSubtitle: { fontSize: 14, marginBottom: 10 },
  btn: {
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },

  blob1: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#7c3aed",
    opacity: 0.08,
  },
  blob2: {
    position: "absolute",
    top: 60,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#a78bfa",
    opacity: 0.1,
  },
  blob3: {
    position: "absolute",
    bottom: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#6d28d9",
    opacity: 0.07,
  },
});
