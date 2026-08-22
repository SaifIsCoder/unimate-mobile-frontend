// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "../components/common";
import { styles } from "./ProfileScreen.styles";

// ── Info Row ──────────────────────────────────────────────────────────────────
const InfoRow = ({ label, value, highlight }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoVal, highlight && { color: COLORS.primary }]}>
      {value}
    </Text>
  </View>
);

// ── Info Section ──────────────────────────────────────────────────────────────
const InfoSection = ({ title, rows }) => (
  <View style={styles.infoSection}>
    <Text style={styles.infoSectionTitle}>{title}</Text>
    {rows.map((row, i) => (
      <InfoRow
        key={i}
        label={row.label}
        value={row.value}
        highlight={row.highlight}
      />
    ))}
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useUser();

  const handleLogout = () =>
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          await AsyncStorage.multiRemove([
            "has_set_password",
            "mock_user_email",
            "mock_user_password",
          ]);
        },
      },
    ]);

  if (!user) return null;

  return (
    <View style={styles.root}>
      <BackButton
        variant="light"
        style={[styles.backBtn, { top: insets.top + 8 }]}
      />

      <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
    >
      <LinearGradient
        colors={COLORS.gradientProfile}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.heroGradient, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.heroCircle} />

        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={[COLORS.primary, "#9C6CF8"]}
            style={styles.profAvatar}
          >
            <Text style={styles.profAvatarText}>
              {user.name ? user.name.charAt(0).toUpperCase() : "?"}
            </Text>
          </LinearGradient>
        </View>

        <Text style={styles.profName} numberOfLines={1} ellipsizeMode="tail">
          {user.name || "Student"}
        </Text>
        <Text style={styles.profEmail}>{user.personal?.email || ""}</Text>

        <View style={styles.profTags}>
          <View style={styles.profTag}>
            <Text style={styles.profTagText}>Reg #{user.registrationNumber || "N/A"}</Text>
          </View>
        </View>

        <View style={styles.heroCurve} />
      </LinearGradient>

      <View style={styles.statGrid}>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: COLORS.primary }]}>
            {user.cgpa?.toFixed(2) || "0.00"}
          </Text>
          <Text style={styles.statLbl}>Current GPA</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: COLORS.green }]}>
            {user.averageAttendance ? `${user.averageAttendance}%` : "0%"}
          </Text>
          <Text style={styles.statLbl}>Attendance</Text>
        </View>
      </View>

      <InfoSection
        title="Personal Info"
        rows={[
          { label: "Email", value: user.personal?.email || "N/A", highlight: true },
          { label: "Phone", value: user.personal?.phone || "N/A" },
          { label: "Address", value: user.personal?.address || "N/A" },
        ]}
      />

      <InfoSection
        title="Guardian"
        rows={[
          { label: "Father's Name", value: user.guardian?.fatherName || "N/A" },
          { label: "Phone", value: user.guardian?.phone || "N/A" },
          { label: "Emergency Phone", value: user.guardian?.emergencyPhone || "N/A" },
        ]}
      />

      <LinearGradient
        colors={COLORS.gradientRed}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.logoutBtn}
      >
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.85}
          style={styles.logoutTouchable}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
      </ScrollView>
    </View>
  );
}

