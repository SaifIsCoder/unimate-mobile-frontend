import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

// ── Import your existing shared components ────────────────
import Header from "../../components/Header";
import Background from "../../components/Background";
// ── Design Tokens ─────────────────────────────────────────
const C = {
  primary: "#2c2abc",
  primaryContainer: "#4648d4",
  primaryFixed: "#e1e0ff",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#d1d1ff",

  secondary: "#6b38d4",
  secondaryContainer: "#8455ef",
  onSecondaryContainer: "#fffbff",

  surface: "#f9f9ff",
  surfaceContainer: "#e7eefe",
  surfaceContainerLow: "#f0f3ff",
  surfaceContainerHighest: "#dce2f3",
  surfaceContainerLowest: "#ffffff",

  onSurface: "#151c27",
  onSurfaceVariant: "#464554",
  outline: "#767586",
  outlineVariant: "#c6c5d7",
  background: "#f9f9ff",
};

const R = { sm: 4, md: 8, lg: 12, xl: 18, full: 9999 };
const F = { regular: "400", semiBold: "600", bold: "700", extraBold: "800" };

// ── SVG PROGRESS RING ─────────────────────────────────────
// Mirrors: <svg class="w-20 h-20"> with animated stroke-dashoffset
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressRing = ({ cgpa = 3.82, maxCgpa = 4.0 }) => {
  const SIZE = 80;
  const RADIUS = 34;
  const STROKE = 6;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const animVal = useRef(new Animated.Value(CIRCUMFERENCE)).current;

  useEffect(() => {
    const percent = cgpa / maxCgpa;
    const targetOffset = CIRCUMFERENCE - percent * CIRCUMFERENCE;
    Animated.timing(animVal, {
      toValue: targetOffset,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [cgpa]);

  const strokeDashoffset = animVal;

  return (
    <View style={s.ringWrapper}>
      <Svg width={SIZE} height={SIZE} style={s.ringSvg}>
        {/* Background track — white/20 */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="transparent"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={STROKE}
        />
        {/* Animated progress arc */}
        <AnimatedCircle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="transparent"
          stroke="#ffffff"
          strokeWidth={STROKE}
          strokeDasharray={`${CIRCUMFERENCE}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          // rotate -90deg so arc starts at top
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>
      {/* Center icon */}
      <View style={s.ringCenter}>
        <MaterialIcons name="auto-awesome" size={20} color="#ffffff" />
      </View>
    </View>
  );
};
const CgpaHeroCard = () => (
  <View style={s.heroWrapper}>
    <LinearGradient
      colors={[C.primary, C.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.heroGradient}
    >
      {/* Decorative orbs — mirrors the absolute blurred circles */}
      <View style={s.orbTopRight} />
      <View style={s.orbBottomLeft} />

      {/* Main content row */}
      <View style={s.heroContent}>
        {/* Left — CGPA + Goal Progress */}
        <View style={s.heroLeft}>
          {/* CGPA block */}
          <View style={s.cgpaBlock}>
            <Text style={s.cgpaLabel}>CURRENT CGPA</Text>
            <View style={s.cgpaValueRow}>
              <Text style={s.cgpaNumber}>3.82</Text>
              <Text style={s.cgpaOutOf}>/ 4.00</Text>
            </View>
          </View>

          {/* Goal progress strip — mirrors white/10 backdrop-blur box */}
          <View style={s.goalBox}>
            <Text style={s.goalLabel}>GOAL PROGRESS</Text>
            <View style={s.goalRow}>
              <View style={s.goalTrack}>
                <View style={s.goalFill} />
              </View>
              <Text style={s.goalTarget}>3.90 Target</Text>
            </View>
          </View>
        </View>

        {/* Right — progress ring */}
        <View style={s.heroRight}>
          <ProgressRing cgpa={3.82} />
          <Text style={s.deanLabel}>DEAN'S LIST</Text>
        </View>
      </View>

      {/* AI Insight mini-banner — mirrors the border-t section */}
      <View style={s.insightBanner}>
        <MaterialIcons name="psychology" size={16} color="#ffffff" />
        <Text style={s.insightText}>
          Lumina Insight: Maintain an A- in "Advanced Algorithms" to hit your
          3.90 goal.
        </Text>
      </View>
    </LinearGradient>
  </View>
);
const SemesterRow = ({ item }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isCurrent = item.isCurrent;

  const onPressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();

  const onPressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={s.semRow}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        {/* Icon circle */}
        <View
          style={[
            s.semIcon,
            {
              backgroundColor: isCurrent ? C.primaryFixed : C.surfaceContainer,
            },
          ]}
        >
          <MaterialIcons
            name={isCurrent ? "school" : "history-edu"}
            size={20}
            color={isCurrent ? C.primary : C.onSurfaceVariant}
          />
        </View>

        {/* Text block */}
        <View style={s.semInfo}>
          <Text style={s.semName}>{item.name}</Text>
          <Text style={s.semMeta}>{item.meta}</Text>
        </View>

        {/* GPA block */}
        <View style={s.semGpaBlock}>
          <Text
            style={[
              s.semGpa,
              { color: isCurrent ? C.primary : C.onSurface },
            ]}
          >
            {item.gpa}
          </Text>
          <Text style={s.semGpaLabel}>GPA</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};
const BAR_DATA = [
  { height: "60%", color: C.surfaceContainer },
  { height: "75%", color: C.surfaceContainer },
  { height: "70%", color: C.surfaceContainer },
  { height: "85%", color: C.primaryContainer },
  { height: "95%", color: C.secondaryContainer },
];

const BarChart = () => {
  const anims = useRef(BAR_DATA.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      80,
      anims.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  return (
    <View style={s.chartRow}>
      {BAR_DATA.map((bar, i) => (
        <Animated.View
          key={i}
          style={[
            s.chartBarWrapper,
            {
              transform: [
                {
                  scaleY: anims[i],
                },
              ],
            },
          ]}
        >
          <View
            style={[
              s.chartBar,
              {
                height: bar.height,
                backgroundColor: bar.color,
              },
            ]}
          />
        </Animated.View>
      ))}
    </View>
  );
};
const TrendCard = () => (
  <View style={s.trendCard}>
    {/* Watermark icon */}
    <View style={s.trendWatermark}>
      <MaterialIcons name="auto-graph" size={48} color={C.secondary} />
    </View>

    {/* Title row */}
    <View style={s.trendTitleRow}>
      <MaterialIcons name="insights" size={18} color={C.secondary} />
      <Text style={s.trendTitle}>Academic Trend</Text>
    </View>

    {/* Body */}
    <Text style={s.trendBody}>
      Your GPA has increased by{" "}
      <Text style={s.trendHighlight}>0.17 pts</Text> over the last 3 semesters.
    </Text>

    {/* Bar chart */}
    <BarChart />
  </View>
);

const SEMESTERS = [
  {
    id: "8",
    name: "Semester 8",
    meta: "Winter 2026 • 5 Courses",
    gpa: "3.92",
    isCurrent: true,
  },
  {
    id: "7",
    name: "Semester 7",
    meta: "Fall 2025 • 6 Courses",
    gpa: "3.85",
    isCurrent: false,
  },
  {
    id: "6",
    name: "Semester 6",
    meta: "Winter 2025 • 5 Courses",
    gpa: "3.78",
    isCurrent: false,
  },
  {
    id: "5",
    name: "Semester 5",
    meta: "Fall 2024 • 5 Courses",
    gpa: "3.75",
    isCurrent: false,
  },
];

export default function AllSemestersScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? SEMESTERS : SEMESTERS;

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <Background />

      {/* TOP HEADER — reuse existing component */}
      <Header title="All Semesters" />

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[
          s.scrollContent,
          { paddingBottom: 30 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Page title */}
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>Academic Performance</Text>
          <Text style={s.pageSubtitle}>
            Detailed breakdown of your scholastic journey.
          </Text>
        </View>

        {/* 2. CGPA Hero */}
        <CgpaHeroCard />

        {/* 3. Semester History */}
        <View style={s.section}>
          {/* Section header */}
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Semester History</Text>
            <TouchableOpacity style={s.downloadBtn} activeOpacity={0.7}>
              <Text style={s.downloadText}>DOWNLOAD TRANSCRIPT</Text>
              <MaterialIcons name="download" size={14} color={C.primary} />
            </TouchableOpacity>
          </View>

          {/* Semester rows */}
          <View style={s.semList}>
            {displayed.map((item) => (
              <SemesterRow key={item.id} item={item} />
            ))}
          </View>

          {/* Show Full History button */}
          <TouchableOpacity
            style={s.showMoreBtn}
            activeOpacity={0.7}
            onPress={() => setShowAll((v) => !v)}
          >
            <Text style={s.showMoreText}>
              {showAll ? "Show Less" : "Show Full History"}
            </Text>
            <MaterialIcons
              name={showAll ? "expand-less" : "expand-more"}
              size={20}
              color={C.primary}
            />
          </TouchableOpacity>
        </View>

        {/* 4. Trend Card */}
        <TrendCard />
      </ScrollView>

      {/* FAB — fixed bottom-right above nav */}
      {/* <Fab /> */}
    </View>
  );
}

// ── STYLES ────────────────────────────────────────────────
const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 20,
  },

  // ── PAGE HEADER ──
  pageHeader: { gap: 2 },
  pageTitle: {
    fontSize: 16,
    fontWeight: F.bold,
    color: C.onSurface,
    letterSpacing: -0.1,
  },
  pageSubtitle: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
  },

  // ── CGPA HERO ──
  heroWrapper: {
    borderRadius: R.xl,
    overflow: "hidden",
    // ai-glow
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },

  heroGradient: {
    borderRadius: R.xl,
    padding: 20,
    overflow: "hidden",
  },

  // Decorative orbs
  orbTopRight: {
    position: "absolute",
    top: -48,
    right: -48,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  orbBottomLeft: {
    position: "absolute",
    bottom: -32,
    left: -32,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(132,85,239,0.20)",
  },

  heroContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 10,
  },

  heroLeft: { flex: 1, gap: 16, marginRight: 12 },

  // CGPA number block
  cgpaBlock: { gap: 2 },
  cgpaLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: "rgba(255,255,255,0.70)",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  cgpaValueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  cgpaNumber: {
    fontSize: 32,
    fontWeight: F.bold,
    color: "#ffffff",
    lineHeight: 36,
  },
  cgpaOutOf: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: "rgba(255,255,255,0.80)",
    marginBottom: 2,
  },

  // Goal progress box — white/10 backdrop strip
  goalBox: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    padding: 12,
    gap: 8,
  },
  goalLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: "rgba(255,255,255,0.70)",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  goalTrack: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.20)",
    borderRadius: R.full,
    overflow: "hidden",
  },
  goalFill: {
    width: "85%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: R.full,
  },
  goalTarget: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: "#ffffff",
  },

  // Right — ring + label
  heroRight: { alignItems: "center", gap: 8 },
  ringWrapper: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  ringSvg: { position: "absolute" },
  ringCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  deanLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: "#ffffff",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // AI Insight banner
  insightBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.10)",
  },
  insightText: {
    flex: 1,
    fontSize: 11,
    fontWeight: F.semiBold,
    color: "rgba(255,255,255,0.90)",
    lineHeight: 16,
  },

  // ── SEMESTER SECTION ──
  section: { gap: 12 },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.onSurface,
    letterSpacing: 0.1,
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  downloadText: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.primary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  semList: { gap: 12 },

  // Semester row card
  semRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  semIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  semInfo: { flex: 1, gap: 2 },
  semName: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.onSurface,
  },
  semMeta: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
  },
  semGpaBlock: { alignItems: "flex-end", gap: 1 },
  semGpa: {
    fontSize: 16,
    fontWeight: F.bold,
    letterSpacing: -0.1,
  },
  semGpaLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  showMoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: R.xl,
  },
  showMoreText: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.primary,
  },

  // ── TREND CARD ──
  trendCard: {
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}33`,
    padding: 20,
    overflow: "hidden",
    gap: 0,
    // ai-glow
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  trendWatermark: {
    position: "absolute",
    top: 16,
    right: 16,
    opacity: 0.2,
  },
  trendTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  trendTitle: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.onSurface,
  },
  trendBody: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 24,
  },
  trendHighlight: {
    color: C.primary,
    fontWeight: F.bold,
  },

  // Bar chart
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 80,
    gap: 12,
    paddingHorizontal: 8,
  },
  chartBarWrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    transformOrigin: "bottom",
  },
  chartBar: {
    width: "100%",
    borderTopLeftRadius: R.lg,
    borderTopRightRadius: R.lg,
  },

  // ── FAB ──
  fab: {
    position: "absolute",
    bottom: 88,
    right: 16,
    zIndex: 40,
  },
  fabInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: C.secondary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});