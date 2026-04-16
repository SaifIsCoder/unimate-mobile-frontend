import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { loginUser } from "../../services/authService";
import { useUser } from "../../context/UserContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ navigation }) {
  const [tenantCode, setTenantCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const { setUser } = useUser();

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
    setFormError("");

    try {
      const user = await loginUser(normalizedEmail, password, normalizedTenantCode);
      await setUser(user);
      navigation.replace("MainTabs");
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error?.message || "An error occurred during login. Please try again.";
      setFormError(message);
      Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{ uri: "https://assets.withfra.me/SignIn.2.png" }}
          />

          <Text style={styles.title}>
            Sign in to <Text style={{ color: "#075eec" }}>uniMate</Text>
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>University Code</Text>

            <TextInput
              autoCapitalize="characters"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(value) => {
                setTenantCode(value);
                if (formError) setFormError("");
              }}
              placeholder="SU"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={tenantCode}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(value) => {
                setEmail(value);
                if (formError) setFormError("");
              }}
              placeholder="email@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(value) => {
                setPassword(value);
                if (formError) setFormError("");
              }}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={password}
            />
          </View>

          {!!formError && <Text style={styles.errorText}>{formError}</Text>}

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin} disabled={loading}>
              <View style={[styles.btn, loading && styles.btnDisabled]}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Sign in</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
    marginTop: 86,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#075eec",
    textAlign: "center",
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  btnDisabled: {
    opacity: 0.6,
  },
  info: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  testInfo: {
    marginBottom: 16,
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
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
