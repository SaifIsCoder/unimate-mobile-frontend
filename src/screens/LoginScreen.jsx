import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "../services/authService";
import { useUser } from "../context/UserContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }) {
  const [tenantCode, setTenantCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const { setUser, authError, clearAuthError } = useUser();

  const clearErrors = () => {
    if (formError) setFormError("");
    if (authError) clearAuthError();
  };

  const handleLogin = async () => {
    const normalizedTenantCode = tenantCode.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedTenantCode) {
      setFormError("Please enter your University Code.");
      return;
    }

    if (!normalizedEmail) {
      setFormError("Please enter your email.");
      return;
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setFormError("Please enter your password.");
      return;
    }

    setLoading(true);
    clearErrors();

    try {
      // const user = await loginUser(normalizedEmail, password, normalizedTenantCode);
      const user = {
        _id: "mock_user",
        email: normalizedEmail,
        role: "student",
        profile: {
          fullName: "Mock User",
          phone: "0000000000",
          avatarUrl: "https://i.pravatar.cc/150?img=12"
        }
      };
      await setUser(user);
      navigation.replace("MainTabs");
    } catch (error) {
      console.error("Login error:", error);
      const message = error?.message || "An error occurred during login. Please try again.";
      setFormError(message);
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          placeholder="University Code"
          value={tenantCode}
          onChangeText={(value) => {
            setTenantCode(value);
            clearErrors();
          }}
          autoCapitalize="characters"
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            clearErrors();
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            clearErrors();
          }}
          style={styles.input}
        />

        {!!(formError || authError) && (
          <Text style={styles.errorText}>{formError || authError}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.info}>
          Use your university email and password to login.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E88E5",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1E88E5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  info: {
    marginTop: 15,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    width: "100%",
    marginBottom: 12,
    color: "#D32F2F",
    fontSize: 13,
    textAlign: "left",
  },
});
