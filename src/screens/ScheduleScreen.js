import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Animated,
} from "react-native";
import { COLORS, RADIUS, FONT, ACCENT } from "../theme/theme";
import Header from "../components/Header";
import { CLASSES, WEEK_DAYS } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Background from "../components/Background";
import { AIBriefCard } from "../components/SharedComponents";
// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

// Replace with your real mock data keys or import from mockData
const AI_BRIEF =
  "You have three back-to-back classes today. I've blocked 15 mins for a break after your second class to keep your focus high.";

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED PRESS WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
const Pressable = ({ onPress, style, children }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.97,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 110,
        useNativeDriver: true,
      }),
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

// Unified Header imported from components

// ─────────────────────────────────────────────────────────────────────────────
// 2. DATE STRIP — month nav + scrollable day chips
// ─────────────────────────────────────────────────────────────────────────────
const DateStrip = ({
  selectedDay,
  setSelectedDay,
  month,
  onPrevMonth,
  onNextMonth,
}) => (
  <View style={stripStyles.container}>
    {/* Month navigation */}
    <View style={stripStyles.monthRow}>
      <TouchableOpacity style={stripStyles.chevronBtn} onPress={onPrevMonth}>
        <MaterialIcons name="chevron-left" size={22} color={COLORS.textPrimary} />
      </TouchableOpacity>
      <Text style={stripStyles.monthLabel}>{month}</Text>
      <TouchableOpacity style={stripStyles.chevronBtn} onPress={onNextMonth}>
        <MaterialIcons name="chevron-right" size={22} color={COLORS.textPrimary} />
      </TouchableOpacity>
    </View>

    {/* Day chips */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={stripStyles.chipRow}
    >
      {WEEK_DAYS.map((day, i) => {
        const isActive = selectedDay === i;
        const isWeekend = day.name === "SAT" || day.name === "SUN";
        return (
          <TouchableOpacity
            key={i}
            onPress={() => setSelectedDay(i)}
            activeOpacity={0.75}
            style={[
              stripStyles.chip,
              isActive && stripStyles.chipActive,
              isWeekend && !isActive && stripStyles.chipWeekend,
            ]}
          >
            <Text
              style={[
                stripStyles.chipDay,
                isActive && stripStyles.chipTextActive,
              ]}
            >
              {day.name}
            </Text>
            <Text
              style={[
                stripStyles.chipNum,
                isActive && stripStyles.chipTextActive,
              ]}
            >
              {day.num}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. AI COGNITIVE BRIEF
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// 4. CLASS CARD
// ─────────────────────────────────────────────────────────────────────────────
const PREP_CLASS_INDEX = 1; // Index of the class that gets a prep-time block

const ClassCard = ({ item, index, total }) => {
  const accentColor =
    index === 0 ? "#6366f1" : index === 1 ? "#7c3aed" : "#0891b2";

  const isNow = index === 0;
  const isNext = index === 1;
  const hasPrep = index === PREP_CLASS_INDEX;

  return (
    <View style={cardStyles.wrapper}>
      {/* Timeline line — not shown for last card */}
      {index < total - 1 && <View style={cardStyles.timelineLine} />}

      {/* Timeline dot */}
      <View
        style={[
          cardStyles.timelineDot,
          { backgroundColor: isNow ? accentColor : "#d1d5db" },
        ]}
      />

      <Pressable
        style={[
          cardStyles.card,
          isNow && { borderColor: accentColor, borderWidth: 1.5 },
        ]}
      >
        <View style={cardStyles.body}>
          {/* Top row: name + time */}
          <View style={cardStyles.topRow}>
            <View style={{ flex: 1 }}>
              {(isNow || isNext) && (
                <View
                  style={[
                    cardStyles.statusPill,
                    { backgroundColor: isNow ? accentColor + "20" : "#f3f4f6" },
                  ]}
                >
                  <Text
                    style={[
                      cardStyles.statusText,
                      { color: isNow ? accentColor : "#6b7280" },
                    ]}
                  >
                    {isNow ? "NOW" : "NEXT"}
                  </Text>
                </View>
              )}
              <Text style={cardStyles.className}>{item.name}</Text>
              <Text style={cardStyles.classCode}>{item.code}</Text>
            </View>
            <Text style={cardStyles.time}>{item.time}</Text>
          </View>

          {/* Meta row */}
          <View style={cardStyles.metaRow}>
            <View style={cardStyles.metaItem}>
              <MaterialIcons name="meeting-room" size={14} color={COLORS.textSecondary} />
              <Text style={cardStyles.metaMeta}>{item.room}</Text>
            </View>
            <View style={cardStyles.metaItem}>
              <MaterialIcons name="person-outline" size={14} color={COLORS.textSecondary} />
              <Text style={cardStyles.metaMeta}>{item.teacher}</Text>
            </View>
          </View>

          {/* Prep time block — shown for specific class */}
          {hasPrep && (
            <View style={cardStyles.prepBlock}>
              <MaterialIcons name="timer" size={14} color="#5b21b6" />
              <Text style={cardStyles.prepText}>15 min prep-time added</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. EMPTY STATE
// ─────────────────────────────────────────────────────────────────────────────
const EmptyState = () => (
  <View style={styles.emptyWrap}>
    <MaterialIcons name="event-busy" size={36} color={COLORS.textTertiary} />
    <Text style={styles.emptyTitle}>No classes today</Text>
    <Text style={styles.emptySub}>You have time to relax or plan ahead</Text>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
export default function ScheduleScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(3);
  const [month, setMonth] = useState("April 2026");
  const insets = useSafeAreaInsets();

  const DATE_LABELS = [
    "Monday, April 13",
    "Tuesday, April 14",
    "Wednesday, April 15",
    "Thursday, April 16",
    "Friday, April 17",
    "Saturday, April 18",
    "Sunday, April 19",
  ];

  const handlePrevMonth = () => setMonth("March 2026");
  const handleNextMonth = () => setMonth("May 2026");

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Background />

      {/* 1 · Unified Header */}
      <Header title="Schedule" />
      <DateStrip
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        month={month}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        {/* 2 · Date Strip */}

        {/* 3 · AI Brief */}
     <View style={{ paddingHorizontal: 16, marginTop: 6}}>


        <AIBriefCard data={AI_BRIEF} />
        </View>
        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>TODAY'S SESSIONS</Text>
          <Text style={styles.sectionCount}>{CLASSES.length} CLASSES</Text>
        </View>

        {/* 4 · Class list or empty state */}
        {CLASSES.length === 0 ? (
          <EmptyState />
        ) : (
          <View style={{ paddingHorizontal: 16, marginTop: 4 }}>
            {CLASSES.map((item, index) => (
              <ClassCard
                key={item.id}
                item={item}
                index={index}
                total={CLASSES.length}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  // Unified Header styling is managed inside components/Header

  // Date label
  dateLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textSecondary,
    paddingHorizontal: 16,
    marginTop: 2,
    marginBottom: 14,
  },

  // Section header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 1,
  },
  sectionCount: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },

  // Empty state
  emptyWrap: { alignItems: "center", marginTop: 48, gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textPrimary },
  emptySub: { fontSize: 12, color: COLORS.textSecondary },
});

// Date Strip
const stripStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#e9e5ff",
    // subtle shadow
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  monthLabel: { fontSize: 14, fontWeight: "700", color: COLORS.textPrimary },
  chevronBtn: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  chipRow: { paddingHorizontal: 14, gap: 6, paddingBottom: 2 },
  chip: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 12,
    minWidth: 44,
    height: 54,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  chipWeekend: { opacity: 0.45 },
  chipDay: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  chipNum: { fontSize: 16, fontWeight: "700", color: COLORS.textSecondary },
  chipTextActive: { color: "#fff" },
});

// Class Card
const cardStyles = StyleSheet.create({
  wrapper: {
    position: "relative",
    paddingLeft: 22,
    marginBottom: 12,
  },
  timelineLine: {
    position: "absolute",
    left: 7,
    top: 20,
    bottom: -12,
    width: 2,
    backgroundColor: "#e9e5ff",
    borderRadius: 1,
  },
  timelineDot: {
    position: "absolute",
    left: 2,
    top: 14,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2.5,
    borderColor: "#fff",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e9e5ff",
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  accentBar: { width: 4, borderRadius: 0 },
  body: { flex: 1, padding: 14 },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  statusPill: {
    alignSelf: "flex-start",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 5,
  },
  statusText: { fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },

  className: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  classCode: { fontSize: 11, color: COLORS.textTertiary, fontWeight: "500" },
  time: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  metaRow: { flexDirection: "row", gap: 16 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaMeta: { fontSize: 12, color: COLORS.textSecondary, fontWeight: "500" },

  prepBlock: {
    marginTop: 10,
    backgroundColor: "#ede9fe",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#c4b5fd",
  },
  prepText: { fontSize: 12, color: "#5b21b6", fontWeight: "600" },
});
