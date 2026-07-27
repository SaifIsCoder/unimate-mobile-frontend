import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

// ── Import your existing shared components ────────────────
import Header from "../../components/layout/Header";
import Background from "../../components/layout/Background";
import { s, C, R, F } from "./SetGPAGoalScreen.styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");


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
        <MaterialIcons name="auto-awesome" size={18} color={C.secondary} />
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
      <Header title="Set Your Goal" showBack />

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[
          s.scrollContent,
          { paddingBottom: 30 + insets.bottom },
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
