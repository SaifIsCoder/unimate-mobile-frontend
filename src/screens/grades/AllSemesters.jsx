import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

// ── Import your existing shared components ────────────────
import Header from "../../components/layout/Header";
import Background from "../../components/layout/Background";
import { ACADEMIC_SUMMARY, SEMESTER_HISTORY } from "../../data/mockData";
import { ROUTES } from "../../navigation/routes";
import { s, C, R, F } from "./AllSemesters.styles";

// ── SVG PROGRESS RING ─────────────────────────────────────
// Mirrors: <svg class="w-20 h-20"> with animated stroke-dashoffset
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressRing = ({ cgpa = Number(ACADEMIC_SUMMARY.cgpa), maxCgpa = ACADEMIC_SUMMARY.maxCgpa }) => {
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
              <Text style={s.cgpaNumber}>{ACADEMIC_SUMMARY.cgpa}</Text>
              <Text style={s.cgpaOutOf}>
                / {ACADEMIC_SUMMARY.maxCgpa.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Goal progress strip — mirrors white/10 backdrop-blur box */}
          <View style={s.goalBox}>
            <Text style={s.goalLabel}>GOAL PROGRESS</Text>
            <View style={s.goalRow}>
              <View style={s.goalTrack}>
                <View style={s.goalFill} />
              </View>
              <Text style={s.goalTarget}>{ACADEMIC_SUMMARY.target} Target</Text>
            </View>
          </View>
        </View>

        {/* Right — progress ring */}
        <View style={s.heroRight}>
          <ProgressRing />
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
const SemesterRow = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isCurrent = item.isCurrent;
  const meta = `${item.term} • ${item.courses.length} Courses`;

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
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, ${meta}, GPA ${item.gpa}`}
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
          <Text style={s.semMeta}>{meta}</Text>
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

        <MaterialIcons
          name="chevron-right"
          size={20}
          color={C.onSurfaceVariant}
        />
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

const COLLAPSED_COUNT = 4;

export default function AllSemestersScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll
    ? SEMESTER_HISTORY
    : SEMESTER_HISTORY.slice(0, COLLAPSED_COUNT);

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <Background />

      {/* TOP HEADER — reuse existing component */}
      <Header title="All Semesters" showBack />

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
              <SemesterRow
                key={item.id}
                item={item}
                onPress={() =>
                  navigation.navigate(ROUTES.SEMESTER_DETAIL, {
                    semesterId: item.id,
                  })
                }
              />
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
