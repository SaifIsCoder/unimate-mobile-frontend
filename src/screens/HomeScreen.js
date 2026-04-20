// ─── HOME SCREEN (REFACTORED) ─────────────────────────────────────────────

import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, RADIUS, FONT } from "../theme/theme";
import { Avatar, SectionTitle } from "../components/SharedComponents";
import NotificationBell from "../components/NotificationBell";
import { STUDENT } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/Background";

const Pressable = ({ onPress, style, children }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    onPress?.();
  };
  return (
    <TouchableOpacity onPress={press} activeOpacity={1}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};
 
// ─────────────────────────────────────────────────────────────────────────────
// CLASS BANNER — deep gradient, subtle dot pattern overlay
// ─────────────────────────────────────────────────────────────────────────────
 
const ClassBanner = ({ navigation }) => (
  <Pressable
    onPress={() => navigation.navigate("Schedule")}
    style={{ marginHorizontal: 16, marginVertical: 8 }}
  >
    <LinearGradient
      colors={["#7c3aed", "#5b21b6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      {/* Decorative circles */}
      <View style={styles.bannerCircle1} />
      <View style={styles.bannerCircle2} />
 
      <View style={styles.bannerContent}>
        <View style={styles.bannerLeft}>
          <View style={styles.bannerDatePill}>
            <Text style={styles.bannerDateText}>📅 Thursday</Text>
          </View>
          <Text style={styles.bannerTitle}>3 Classes Today</Text>
          <Text style={styles.bannerSub}>Next: Web Dev · 9:00 AM · Room 15</Text>
        </View>
        <View style={styles.bannerRight}>
          <Text style={styles.bannerCount}>3</Text>
          <Text style={styles.bannerCountLabel}>classes</Text>
        </View>
      </View>
 
      {/* Tap hint */}
      <Text style={styles.bannerTap}>View schedule →</Text>
    </LinearGradient>
  </Pressable>
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
      <Background />
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={{ flex: 1, paddingRight: 16 }}>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{STUDENT.name}</Text>
        </View>

        <View style={styles.headerRight}>
          <NotificationBell />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── 1. Class Banner ── */}
          <ClassBanner navigation={navigation} />


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
  name: {
    fontSize: 20,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    textAlign: "left",
    lineHeight: 24,
  },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  banner: {
    borderRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    overflow: "hidden",
    position: "relative",
  },

  bannerCircle1: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.07)",
    top: -30,
    right: -20,
  },

  bannerCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.05)",
    bottom: -20,
    left: 60,
  },

  bannerContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  bannerLeft: {
    flex: 1,
  },

  bannerDatePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },

  bannerDateText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },

  bannerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "500",
  },

  bannerRight: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    width: 64,
    height: 64,
    marginLeft: 12,
  },

  bannerCount: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
  },

  bannerCountLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
  },

  bannerTap: {
    marginTop: 14,
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "600",
  },
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
