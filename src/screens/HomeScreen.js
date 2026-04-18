// ─── HOME SCREEN (REFACTORED) ─────────────────────────────────────────────

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { COLORS, RADIUS, FONT } from "../theme/theme";
import { Avatar, SectionTitle } from "../components/SharedComponents";
import { STUDENT } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ── Banner (Classes ONLY) ────────────────────────────────────────────────
const Banner = () => (
  <LinearGradient
    colors={COLORS.gradientPurple}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.banner}
  >
    <Text style={styles.bannerLabel}>📅 Today — Thursday</Text>
    <Text style={styles.bannerTitle}>3 Classes Today</Text>
    <Text style={styles.bannerSub}>Next: Web Dev at 9:00 AM → Room 15</Text>
  </LinearGradient>
);

// ── Stat Tile ────────────────────────────────────────────────────────────
const StatTile = ({ bg, label, value, sub, borderColor }) => (
  <View style={[styles.statTile, { backgroundColor: bg, borderColor }]}>
    <Text style={[styles.statLabel, { color: borderColor }]}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statSub}>{sub}</Text>
  </View>
);

// ── Small Card (Tasks) ───────────────────────────────────────────────────
const SmallCard = ({ icon, label, value }) => (
  <View style={styles.smallCard}>
    <Text style={{ fontSize: 16 }}>{icon}</Text>
    <Text style={styles.smallCardLabel}>{label}</Text>
    <Text style={styles.smallCardValue}>{value}</Text>
  </View>
);

// ── Event Card (MEDIUM – not banner) ─────────────────────────────────────
const EventCard = ({ onPress }) => (
  <View style={styles.eventCard}>
    <Text style={styles.eventTitle}>🎉 React Workshop</Text>
    <Text style={styles.eventMeta}>Tomorrow • 2:00 PM</Text>

    <TouchableOpacity onPress={onPress} style={styles.eventBtn}>
      <Text style={styles.eventBtnText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

// ── Main Screen ──────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: 40,
        flexGrow: 1,
      }}
    >
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.name}>{STUDENT.name}</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.bellBtn}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Feather name="bell" size={16} color={COLORS.textSecondary} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── 1. Class Banner ── */}
      <Banner />

      {/* ── 2. Stats ── */}
      <View style={styles.tileRow}>
        <StatTile
          bg={COLORS.green2}
          borderColor={COLORS.green}
          label="📊 Attendance"
          value={STUDENT.attendance}
          sub="This semester"
        />
        <StatTile
          bg={COLORS.primary3}
          borderColor={COLORS.primary}
          label="⭐ GPA"
          value={STUDENT.gpa}
          sub="Current CGPA"
        />
      </View>

      {/* ── 3. Tasks ── */}
      <View style={styles.smallCardRow}>
        <SmallCard icon="📝" label="Tasks" value="1 Pending" />
      </View>

      {/* ── 4. Upcoming Event ── */}
      <SectionTitle>Upcoming Event</SectionTitle>
      <EventCard onPress={() => navigation.navigate("Events")} />

      {/* ── 5. Future: Alert Card (optional) ── */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  greeting: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 1 },
  name: { fontSize: 20, fontWeight: FONT.bold, color: COLORS.textPrimary },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },

  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  bellDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4757",
    borderWidth: 1.5,
    borderColor: COLORS.bg,
  },

  banner: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: RADIUS.xl,
    paddingVertical: 26,
    paddingHorizontal: 16,
    overflow: "hidden",
    position: "relative",
  },

  bannerLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
    fontWeight: FONT.medium,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: FONT.bold,
    color: "#fff",
    marginBottom: 2,
  },
  bannerSub: { fontSize: 12, color: "rgba(255,255,255,0.75)" },

  tileRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 6,
  },

  statTile: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
  },

  statLabel: { fontSize: 10, fontWeight: FONT.medium, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: FONT.bold, color: COLORS.textPrimary },
  statSub: { fontSize: 9, color: COLORS.textTertiary, marginTop: 2 },

  smallCardRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },

  smallCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  smallCardLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginBottom: 3,
    fontWeight: FONT.medium,
  },
  smallCardValue: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  eventCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  eventTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  eventMeta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  eventBtn: {
    marginTop: 10,
  },

  eventBtnText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: FONT.semiBold,
  },
});
