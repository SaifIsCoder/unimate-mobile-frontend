import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import Background from "../../components/Background";
import { AIBriefCard } from "../../components/SharedComponents";

// ── Theme tokens (mirrors Tailwind config in HTML) ────────
const COLORS = {
  primary: "#2c2abc",
  primaryContainer: "#4648d4",
  primaryFixed: "#e1e0ff",
  primaryFixedDim: "#c0c1ff",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#d1d1ff",

  secondary: "#6b38d4",
  secondaryContainer: "#8455ef",
  onSecondary: "#ffffff",
  onSecondaryContainer: "#fffbff",

  surface: "#f9f9ff",
  surfaceContainer: "#e7eefe",
  surfaceContainerLow: "#f0f3ff",
  surfaceContainerHigh: "#e2e8f8",
  surfaceContainerHighest: "#dce2f3",
  surfaceContainerLowest: "#ffffff",

  onSurface: "#151c27",
  onSurfaceVariant: "#464554",
  outline: "#767586",
  outlineVariant: "#c6c5d7",

  background: "#f9f9ff",
  error: "#ba1a1a",
};

const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 18,
  full: 9999,
};

const FONT = {
  regular: "400",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
};
const AI_BRIEF = `Focus Mode: Your Database assignment is due in 2 days, and you usually struggle with this subject. Start now to avoid a late-night crunch.`;
// ── Mock Data ─────────────────────────────────────────────
const COURSES = [
  {
    id: "1",
    name: "Web Development",
    code: "CS-402",
    credits: 4,
    grade: "A-",
    progress: 82,
    midterm: "94/100",
    labsAvg: "100% Avg.",
    gradeColor: COLORS.primary,
    gradeBorderColor: `${COLORS.primary}1A`,
    progressColors: ["#2c2abc", "#484bd6"],
    statLabel1: "MIDTERM",
    statValue1: "94/100",
    statLabel2: "LABS",
    statValue2: "100% Avg.",
  },
  {
    id: "2",
    name: "Data Structures",
    code: "CS-301",
    credits: 3,
    grade: "B+",
    progress: 65,
    gradeColor: COLORS.secondary,
    gradeBorderColor: `${COLORS.secondary}1A`,
    progressColors: ["#6b38d4", "#9C6CF8"],
    statLabel1: "QUIZZES",
    statValue1: "88/100",
    statLabel2: "PROJECT 1",
    statValue2: "82/100",
  },
];

// ── GPA HERO CARD ─────────────────────────────────────────
// Mirrors: <section class="relative overflow-hidden bg-primary-container ...">
const GpaHero = ({ navigation }) => (
  <View style={styles.gpaHeroWrapper}>
    {/* Background fill — primary-container color */}
    <View style={styles.gpaHero}>
      {/* GPA number block */}
      <View style={styles.gpaContent}>
        <Text style={styles.gpaLabel}>CURRENT SEMESTER GPA</Text>
        <View style={styles.gpaRow}>
          <Text style={styles.gpaNumber}>3.88</Text>
          <Text style={styles.gpaOutOf}>/ 4.0</Text>
        </View>
      </View>

      {/* Footer strip — mirrors the white/10 backdrop row */}
      <View style={styles.gpaFooter}>
        <View style={styles.gpaFooterLeft}>
          <MaterialIcons
            name="trending-up"
            size={18}
            color={COLORS.primaryFixed}
          />
          <Text style={styles.gpaFooterText}>+0.12 since Midterm</Text>
        </View>
        <View style={styles.deansBadge}>
          <Text style={styles.deansBadgeText}>DEAN'S LIST ELIGIBLE</Text>
        </View>
      </View>

      {/* Top-right button — Sets CGPA Goal — Rendered last so it sits on top of all sibling layers */}
      <TouchableOpacity
        style={styles.goalButton}
        onPress={() => navigation.navigate("SetGPAGoal")}
        activeOpacity={0.85}
      >
        <MaterialIcons name="emoji-events" size={14} color={COLORS.primary} />
        <Text style={styles.goalButtonText}>Set CGPA Goal</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ── PROGRESS BAR ──────────────────────────────────────────
const ProgressBar = ({ progress, colors }) => (
  <View style={styles.progressTrack}>
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.progressFill, { width: `${progress}%` }]}
    />
  </View>
);

// ── COURSE CARD ───────────────────────────────────────────
// Mirrors: <div class="bg-white rounded-[14px] border ...">
const CourseCard = ({ item }) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => setSelected((v) => !v)}
      style={[
        styles.courseCard,
        selected && {
          borderColor: `${COLORS.primary}33`,
          borderWidth: 2,
        },
      ]}
    >
      {/* Card header row */}
      <View style={styles.courseHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.courseName}>{item.name}</Text>
          <Text style={styles.courseCode}>
            {item.code} • {item.credits} Credits
          </Text>
        </View>

        {/* Grade circle */}
        <View
          style={[styles.gradeCircle, { borderColor: item.gradeBorderColor }]}
        >
          <Text style={[styles.gradeText, { color: item.gradeColor }]}>
            {item.grade}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabelRow}>
          <Text style={styles.progressLabel}>COURSE PROGRESS</Text>
          <Text style={styles.progressLabel}>{item.progress}%</Text>
        </View>
        <ProgressBar progress={item.progress} colors={item.progressColors} />
      </View>

      {/* Stat pills */}
      <View style={styles.statRow}>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{item.statLabel1}</Text>
          <Text style={styles.statValue}>{item.statValue1}</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{item.statLabel1}</Text>
          <Text style={styles.statValue}>{item.statValue1}</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{item.statLabel1}</Text>
          <Text style={styles.statValue}>{item.statValue1}</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{item.statLabel2}</Text>
          <Text style={styles.statValue}>{item.statValue2}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function GradesScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Background />

      {/* TOP HEADER — reuse your existing component */}
      <Header title="Grades" />

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 80 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. GPA Hero */}
        <GpaHero navigation={navigation} />

        <AIBriefCard data={AI_BRIEF} />

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingVertical: 10,
            backgroundColor: "#ffffff",
            borderRadius: RADIUS.full,
            borderWidth: 1,
            borderColor: COLORS.primary,
          }}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("AllSemestersScreen")}
        >
          <MaterialIcons name="history" size={20} color={COLORS.primary} />

          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: COLORS.primary,
            }}
          >
            View All Semester History
          </Text>
        </TouchableOpacity>
        {/* 3. Course Performance header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Course Performance</Text>
        </View>

        {/* 4. Course cards */}
        {COURSES.map((course) => (
          <CourseCard key={course.id} item={course} />
        ))}
      </ScrollView>
    </View>
  );
}

// ── STYLES ────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: { flex: 1 },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 16,
  },

  // ── GPA HERO ──
  gpaHeroWrapper: {
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    // Subtle border like HTML's border-primary/20
    borderWidth: 1,
    borderColor: `${COLORS.primary}33`,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  gpaHero: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: RADIUS.xl,
    padding: 20,
    gap: 0,
  },

  goalButton: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 99,
  },

  goalButtonText: {
    fontSize: 11,
    fontWeight: FONT.bold,
    color: COLORS.primary,
  },

  gpaContent: {
    marginTop: 4,
    marginBottom: 24,
  },

  gpaLabel: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: `${COLORS.onPrimaryContainer}CC`,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  gpaRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },

  gpaNumber: {
    fontSize: 40,
    fontWeight: FONT.extraBold,
    color: "white",
    letterSpacing: -0.5,
    lineHeight: 44,
  },

  gpaOutOf: {
    fontSize: 18,
    fontWeight: FONT.semiBold,
    color: `${COLORS.onPrimaryContainer}B3`,
    marginBottom: 4,
  },

  // Footer strip — mirrors white/10 backdrop
  gpaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: RADIUS.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  gpaFooterLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  gpaFooterText: {
    fontSize: 12,
    color: COLORS.onPrimaryContainer,
  },

  deansBadge: {
    backgroundColor: "rgba(209,209,255,0.2)",
    borderRadius: RADIUS.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  deansBadgeText: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.onPrimaryContainer,
    letterSpacing: 0.5,
  },

  // ── SECTION HEADER ──
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.onSurface,
    letterSpacing: -0.1,
  },

  viewAll: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ── COURSE CARD ──
  courseCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${COLORS.outlineVariant}33`,
    padding: 16,
    gap: 12,
    // shadow-sm
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  courseName: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.onSurface,
    lineHeight: 22,
  },

  courseCode: {
    fontSize: 12,
    color: COLORS.outline,
    marginTop: 1,
  },

  gradeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  gradeText: {
    fontSize: 15,
    fontWeight: FONT.bold,
  },

  // ── PROGRESS ──
  progressSection: {
    gap: 4,
  },

  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  progressLabel: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.outlineVariant,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  progressTrack: {
    height: 8,
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: RADIUS.full,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: RADIUS.full,
  },

  // ── STAT PILLS ──
  statRow: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 4,
  },

  statPill: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: `${COLORS.outlineVariant}1A`,
    padding: 2,
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  statLabel: {
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.outline,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  statValue: {
    fontSize: 13,
    fontWeight: FONT.semiBold,
    color: COLORS.onSurface,
  },

  // ── FAB ──
  fab: {
    position: "absolute",
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 40,
  },

  fabIcon: {
    fontSize: 24,
  },

  // ── BOTTOM NAV ──
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.outlineVariant}4D`,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },

  navItemActive: {
    backgroundColor: COLORS.secondaryContainer,
    // mirrors the rounded-full pill on active nav
    paddingHorizontal: 8,
    transform: [{ scale: 0.9 }],
  },

  navLabel: {
    fontSize: 10,
    marginTop: 2,
  },
});
