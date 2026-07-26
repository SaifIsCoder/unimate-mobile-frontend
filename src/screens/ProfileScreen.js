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
import { STUDENT } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const { logout } = useUser();

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

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
    >
      {/* ── Status bar with dark/purple bg ── */}
      <LinearGradient
        colors={COLORS.gradientProfile}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.heroGradient, { paddingTop: insets.top + 20 }]}
      >

        {/* Decorative circle (replicates ::before pseudo-element) */}
        <View style={styles.heroCircle} />

        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={[COLORS.primary, "#9C6CF8"]}
            style={styles.profAvatar}
          >
            <Text style={styles.profAvatarText}>S</Text>
          </LinearGradient>
        </View>

        <Text style={styles.profName} numberOfLines={1} ellipsizeMode="tail">{STUDENT.name}</Text>
        <Text style={styles.profEmail}>{STUDENT.email}</Text>

        <View style={styles.profTags}>
          <View style={styles.profTag}>
            <Text style={styles.profTagText}>Roll #{STUDENT.rollNo}</Text>
          </View>
          <View style={styles.profTag}>
            <Text style={styles.profTagText}>{STUDENT.semester}</Text>
          </View>
        </View>

        {/* White curve at bottom of hero — achieved via a tall rounded View */}
        <View style={styles.heroCurve} />
      </LinearGradient>

      {/* ── GPA & Attendance tiles ── */}
      <View style={styles.statGrid}>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: COLORS.primary }]}>
            {STUDENT.gpa}
          </Text>
          <Text style={styles.statLbl}>Current GPA</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: COLORS.green }]}>
            {STUDENT.attendance}
          </Text>
          <Text style={styles.statLbl}>Attendance</Text>
        </View>
      </View>

      <InfoSection
        title="Academic Info"
        rows={[
          { label: "Program", value: STUDENT.program },
          { label: "Department", value: STUDENT.department },
          { label: "Session", value: STUDENT.session },
          { label: "Section", value: STUDENT.section },
          { label: "Semester", value: STUDENT.semester },
        ]}
      />

      <InfoSection
        title="Personal Info"
        rows={[
          { label: "Gender", value: STUDENT.gender },
          { label: "Date of Birth", value: STUDENT.dob },
          { label: "Email", value: STUDENT.email, highlight: true },
          { label: "Phone", value: STUDENT.phone },
        ]}
      />

      <InfoSection
        title="Guardian"
        rows={[
          { label: "Name", value: STUDENT.guardian.name },
          { label: "Relation", value: STUDENT.guardian.relation },
          { label: "Phone", value: STUDENT.guardian.phone },
        ]}
      />

      {/* ── Logout Button ── */}
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
  );
}

