import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

// ── Import your existing shared components ────────────────
import Header from "../../components/Header";
import Background from "../../components/Background";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ── Design Tokens (mirrors Tailwind config) ───────────────
const C = {
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

  tertiary: "#40454d",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  background: "#f9f9ff",
};

const R = { sm: 4, md: 8, lg: 12, xl: 18, full: 9999 };
const F = { regular: "400", semiBold: "600", bold: "700", extraBold: "800" };

// ── SUMMARY CARD ──────────────────────────────────────────
// Mirrors: <div class="bg-surface-container-lowest p-gap-loose rounded-xl ...">
const SummaryCard = ({ label, value, unit }) => (
  <View style={s.summaryCard}>
    <Text style={s.summaryLabel}>{label}</Text>
    <View style={s.summaryValueRow}>
      <Text style={s.summaryValue}>{value}</Text>
      <Text style={s.summaryUnit}>{unit}</Text>
    </View>
  </View>
);

// ── CGPA SLIDER SECTION ───────────────────────────────────
// Mirrors: <section class="bg-surface-container-lowest p-6 rounded-[18px] ...">
const TargetSlider = ({ cgpa, onValueChange }) => {
  const isHighTarget = cgpa > 3.8;
  const pillBg = isHighTarget ? C.errorContainer : C.primaryFixed;
  const pillTextColor = isHighTarget ? C.error : C.primary;

  // Slider progress % for the filled track overlay
  const percent = ((cgpa - 3.0) / (4.0 - 3.0)) * 100;

  return (
    <View style={s.sliderSection}>
      {/* Header row */}
      <View style={s.sliderHeader}>
        <Text style={s.sliderTitle}>Target CGPA Goal</Text>
        <View style={[s.cgpaPill, { backgroundColor: pillBg }]}>
          <Text style={[s.cgpaPillText, { color: pillTextColor }]}>
            {cgpa.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Custom slider with filled track */}
      <View style={s.sliderTrackWrapper}>
        {/* Background track */}
        <View style={s.trackBg} />
        {/* Filled track */}
        <View style={[s.trackFill, { width: `${percent}%` }]} />
        {/* RN Slider (thumb only; track set transparent) */}
        <Slider
          style={s.slider}
          minimumValue={3.0}
          maximumValue={4.0}
          step={0.01}
          value={cgpa}
          onValueChange={onValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor={C.primary}
        />
      </View>

      {/* Labels row */}
      <View style={s.sliderLabels}>
        <Text style={s.sliderLabelText}>3.0</Text>
        <Text style={s.sliderLabelText}>3.25 (Current)</Text>
        <Text style={s.sliderLabelText}>4.0</Text>
      </View>
    </View>
  );
};

// ── AI ANALYSIS PANEL ─────────────────────────────────────
// Mirrors: <section class="bg-white border border-secondary/20 p-6 rounded-[18px] ai-glow ...">
const AiAnalysisPanel = ({ targetCgpa }) => {
  const requiredGpa = Math.min(4.0, 3.65 + (targetCgpa - 3.65) * 1.2).toFixed(
    2,
  );
  const pctHigher = Math.round(((targetCgpa - 3.25) / 3.25) * 100 + 19);

  return (
    <View style={s.aiPanel}>
      {/* Decorative watermark icon */}
      <View style={s.aiWatermark}>
        <MaterialIcons name="psychology" size={48} color={C.secondary} />
      </View>

      {/* Title row */}
      <View style={s.aiTitleRow}>
        <Text style={s.aiStar}>✨</Text>
        <Text style={s.aiTitle}>Lumina Analysis</Text>
      </View>

      {/* Required GPA badge */}
      <View style={s.requiredBadge}>
        <Text style={s.requiredBadgeText}>REQUIRED GPA: {requiredGpa}</Text>
      </View>

      {/* Body */}
      <Text style={s.aiBody}>
        To reach your target of{" "}
        <Text style={s.aiBodyBold}>{targetCgpa.toFixed(2)}</Text> with 48
        credits remaining, you need to maintain a semester average of{" "}
        {requiredGpa}. This is {pctHigher}% higher than your historical average.
      </Text>

      {/* Source chip */}
      <View style={s.sourceChip}>
        <Text style={s.sourceChipText}>
          Source: Academic Projection Engine 2.4
        </Text>
      </View>
    </View>
  );
};

// ── INTENSITY BUTTONS ─────────────────────────────────────
// Mirrors: <div class="grid grid-cols-3 gap-gap-tight">
const INTENSITY_OPTIONS = [
  { key: "balanced", icon: "balance", label: "Balanced" },
  { key: "high", icon: "trending-up", label: "High" },
  { key: "aggressive", icon: "bolt", label: "Aggressive" },
];

const IntensitySelector = ({ selected, onSelect }) => (
  <View style={s.intensitySection}>
    <Text style={s.intensityLabel}>STUDY INTENSITY LEVEL</Text>
    <View style={s.intensityRow}>
      {INTENSITY_OPTIONS.map((opt) => {
        const isActive = selected === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[s.intensityBtn, isActive && s.intensityBtnActive]}
            onPress={() => onSelect(opt.key)}
            activeOpacity={0.75}
          >
            <MaterialIcons
              name={opt.icon}
              size={22}
              color={isActive ? C.primary : C.onSurfaceVariant}
            />
            <Text
              style={[s.intensityBtnLabel, isActive && { color: C.primary }]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

// ── APPLY BUTTON ──────────────────────────────────────────
const ApplyButton = ({ onPress }) => (
  <View style={s.applyWrapper}>
    <Pressable
      style={({ pressed }) => [
        s.applyBtn,
        pressed && { transform: [{ scale: 0.95 }] },
      ]}
      onPress={onPress}
    >
      <Text style={s.applyBtnText}>Apply Goal Configuration</Text>
      <MaterialIcons name="check-circle" size={20} color={C.onPrimary} />
    </Pressable>
    <Text style={s.applyHint}>
      Your course schedules and study tasks will be recalibrated.
    </Text>
  </View>
);

// ── BOTTOM NAV ────────────────────────────────────────────
const NAV_ITEMS = [
  { icon: "home", label: "Home", active: false },
  { icon: "calendar-today", label: "Schedule", active: false },
  { icon: "grade", label: "Grades", active: true },
  { icon: "assignment", label: "Tasks", active: false },
  { icon: "notifications-active", label: "Updates", active: false },
];

// ── MAIN SCREEN ───────────────────────────────────────────
export default function CgpaGoalScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [cgpa, setCgpa] = useState(3.65);
  const [intensity, setIntensity] = useState("balanced");

  const handleSlider = useCallback((val) => {
    setCgpa(parseFloat(val.toFixed(2)));
  }, []);

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <Background />

      {/* TOP HEADER — reuse existing component with back arrow */}
      <Header
        title="Set Your Goal"
        showBack
        onBack={() => navigation?.goBack()}
      />

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[
          s.scrollContent,
          { paddingBottom: 80 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Summary Cards */}
        <View style={s.summaryRow}>
          <SummaryCard label="CURRENT CGPA" value="3.25" unit="/ 4.0" />
          <SummaryCard label="REMAINING CREDITS" value="48" unit="Hrs" />
        </View>

        {/* 2. Target Slider */}
        <TargetSlider cgpa={cgpa} onValueChange={handleSlider} />

        {/* 3. AI Analysis */}
        <AiAnalysisPanel targetCgpa={cgpa} />

        {/* 4. Intensity */}
        <IntensitySelector selected={intensity} onSelect={setIntensity} />

        {/* 5. Apply */}
        <ApplyButton onPress={() => {}} />
      </ScrollView>

      {/* BOTTOM NAV */}
    </View>
  );
}

// ── STYLES ────────────────────────────────────────────────
const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },

  // ── SUMMARY ROW ──
  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}33`,
    padding: 16,
    gap: 4,
    // shadow-sm
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  summaryLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  summaryValueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },

  summaryValue: {
    fontSize: 28,
    fontWeight: F.extraBold,
    color: C.primary,
    lineHeight: 34,
  },

  summaryUnit: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.secondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  // ── SLIDER SECTION ──
  sliderSection: {
    backgroundColor: C.surfaceContainerLowest,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    padding: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sliderTitle: {
    fontSize: 16,
    fontWeight: F.bold,
    color: C.onSurface,
    letterSpacing: -0.1,
  },

  cgpaPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: R.full,
  },

  cgpaPillText: {
    fontSize: 18,
    fontWeight: F.bold,
  },

  // Custom slider with visible filled track
  sliderTrackWrapper: {
    position: "relative",
    height: 48,
    justifyContent: "center",
    marginHorizontal: -4,
  },

  trackBg: {
    position: "absolute",
    left: 12,
    right: 12,
    height: 8,
    backgroundColor: C.surfaceContainerHighest,
    borderRadius: R.full,
  },

  trackFill: {
    position: "absolute",
    left: 12,
    height: 8,
    backgroundColor: C.primary,
    borderRadius: R.full,
    // Glow effect
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 2,
  },

  slider: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 48,
  },

  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sliderLabelText: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
  },

  // ── AI PANEL ──
  aiPanel: {
    backgroundColor: "#ffffff",
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.secondary}33`,
    padding: 20,
    gap: 12,
    overflow: "hidden",
    // ai-glow
    shadowColor: C.secondary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },

  aiWatermark: {
    position: "absolute",
    top: 12,
    right: 12,
    opacity: 0.2,
  },

  aiTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  aiStar: { fontSize: 18 },

  aiTitle: {
    fontSize: 13,
    fontWeight: F.semiBold,
    color: C.secondary,
    letterSpacing: 0.1,
  },

  requiredBadge: {
    backgroundColor: C.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: R.lg,
    alignSelf: "flex-start",
  },

  requiredBadgeText: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSecondaryContainer,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  aiBody: {
    fontSize: 12,
    color: C.onSurfaceVariant,
    lineHeight: 18,
  },

  aiBodyBold: {
    fontWeight: F.bold,
    color: C.onSurface,
  },

  sourceChip: {
    backgroundColor: C.surfaceContainerLow,
    borderRadius: R.lg,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    padding: 10,
  },

  sourceChipText: {
    fontSize: 11,
    color: C.tertiary,
  },

  // ── INTENSITY ──
  intensitySection: {
    gap: 8,
  },

  intensityLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginLeft: 4,
  },

  intensityRow: {
    flexDirection: "row",
    gap: 8,
  },

  intensityBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: R.xl,
    borderWidth: 1,
    borderColor: `${C.outlineVariant}4D`,
    backgroundColor: "#ffffff",
  },

  intensityBtnActive: {
    backgroundColor: C.surfaceContainerLow,
    borderColor: C.primary,
    // ring-1 ring-primary effect
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },

  intensityBtnLabel: {
    fontSize: 10,
    fontWeight: F.bold,
    color: C.onSurfaceVariant,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // ── APPLY ──
  applyWrapper: {
    gap: 12,
    marginTop: 4,
  },

  applyBtn: {
    height: 44,
    backgroundColor: C.primary,
    borderRadius: R.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  applyBtnText: {
    fontSize: 14,
    fontWeight: F.bold,
    color: C.onPrimary,
  },

  applyHint: {
    fontSize: 10,
    color: C.onSurfaceVariant,
    textAlign: "center",
    opacity: 0.6,
  },
});
