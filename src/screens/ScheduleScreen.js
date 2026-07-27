import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import { COLORS, RADIUS, FONT, ACCENT } from "../theme";
import Header from "../components/layout/Header";
import { CLASSES, CLASS_STATUS, WEEK_DAYS } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Background from "../components/layout/Background";
import { AIBriefCard } from "../components/ui";
import { useAIBrief } from "../hooks/useAIBrief";
import { styles, stripStyles, cardStyles } from "./ScheduleScreen.styles";

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
        const dayName = day.name.toUpperCase();
        const isWeekend = dayName === "SAT" || dayName === "SUN";
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
const ClassCard = ({ item, index, total }) => {
  const cfg = CLASS_STATUS[item.status] || CLASS_STATUS.next;
  const accent = ACCENT[item.accent] || ACCENT.purple;

  const isNow = item.status === "now";
  const isCancelled = item.status === "cancelled";
  const isRescheduled = item.status === "rescheduled";
  const isDone = item.status === "done";

  // Only live/disrupted classes tint the timeline dot
  const dotColor =
    isNow || isCancelled || isRescheduled ? cfg.color : "#d1d5db";

  return (
    <View style={cardStyles.wrapper}>
      {/* Timeline line — not shown for last card */}
      {index < total - 1 && <View style={cardStyles.timelineLine} />}

      {/* Timeline dot */}
      <View style={[cardStyles.timelineDot, { backgroundColor: dotColor }]} />

      <Pressable
        style={[
          cardStyles.card,
          { borderLeftColor: accent.border, borderLeftWidth: 3 },
          isNow && { borderColor: cfg.color, borderWidth: 1.5 },
          isCancelled && cardStyles.cardCancelled,
          isDone && cardStyles.cardDone,
        ]}
      >
        <View style={cardStyles.body}>
          {/* Top row: name + time */}
          <View style={cardStyles.topRow}>
            <View style={{ flex: 1 }}>
              <View style={[cardStyles.statusPill, { backgroundColor: cfg.bg }]}>
                <MaterialIcons name={cfg.icon} size={12} color={cfg.color} />
                <Text style={[cardStyles.statusText, { color: cfg.color }]}>
                  {cfg.label}
                </Text>
              </View>
              <Text
                style={[
                  cardStyles.className,
                  isCancelled && cardStyles.strikeText,
                ]}
              >
                {item.name}
              </Text>
              <Text style={cardStyles.classCode}>{item.code}</Text>
            </View>
            <Text
              style={[
                cardStyles.time,
                (isCancelled || isRescheduled) && cardStyles.strikeText,
              ]}
            >
              {item.time}
            </Text>
          </View>

          {/* Meta row — replaced by the reason line when cancelled */}
          {!isCancelled && (
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
          )}

          {/* Status note — cancellation reason or the new slot */}
          {(isCancelled || isRescheduled) && item.statusNote && (
            <View style={[cardStyles.noteRow, { backgroundColor: cfg.bg }]}>
              <MaterialIcons name={cfg.icon} size={14} color={cfg.color} />
              <Text style={[cardStyles.noteText, { color: cfg.color }]}>
                {item.statusNote}
              </Text>
            </View>
          )}

          {/* Prep time block */}
          {item.hasPrep && (
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
  const aiBrief = useAIBrief("schedule");

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

  const cancelledCount = CLASSES.filter((c) => c.status === "cancelled").length;
  const activeCount = CLASSES.length - cancelledCount;

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


        <AIBriefCard
          data={aiBrief.data}
          loading={aiBrief.loading}
          error={aiBrief.error}
          onRetry={aiBrief.refresh}
        />
        </View>
        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>TODAY'S SESSIONS</Text>
          <Text style={styles.sectionCount}>
            {activeCount} CLASSES
            {cancelledCount > 0 ? ` · ${cancelledCount} CANCELLED` : ""}
          </Text>
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

