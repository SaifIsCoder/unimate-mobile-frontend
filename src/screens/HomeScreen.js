// ─── HOME SCREEN (FULL REWRITE) ───────────────────────────────────────────
// Sections: Header → AI Brief → Classes Banner → Attendance Alert → Tasks → Upcoming

import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, RADIUS, FONT } from "../theme";
import { AIBriefCard } from "../components/ui";
import { useAIBrief } from "../hooks/useAIBrief";
import Header from "../components/layout/Header";
import { STUDENT } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/layout/Background";
import { styles, alertStyles, taskStyles, eventStyles } from "./HomeScreen.styles";

// ─── Animated press wrapper ──────────────────────────────────────────────────
const Pressable = ({ onPress, style, children }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.97,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 120,
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

const TASKS = [
  {
    id: 1,
    title: "Submit DB Assignment",
    due: "Today, 5:00 PM",
    subject: "Database Systems",
    urgent: true,
  },
  {
    id: 2,
    title: "Read Web Dev chapter 7",
    due: "Tomorrow",
    subject: "Web Development",
    urgent: false,
  },
];
const EVENTS = [
  {
    id: 1,
    title: "React Workshop",
    date: "Tomorrow",
    time: "2:00 PM",
    location: "Lab 3",
    icon: "celebration",
    color: "#4f46e5",
    bg: "#eef2ff",
  },
  {
    id: 2,
    title: "Mid-term Exams",
    date: "Mon, 22 July",
    time: "9:00 AM",
    location: "Exam Hall",
    icon: "edit-note",
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    id: 3,
    title: "Mid-term Exams",
    date: "Mon, 22 July",
    time: "9:00 AM",
    location: "Exam Hall",
    icon: "edit-note",
    color: "#0891b2",
    bg: "#ecfeff",
  },
];
const ATTENDANCE_DATA = [
  { name: "Data Structures", attended: 14, total: 20 },
  { name: "Database Systems", attended: 16, total: 20 },
  { name: "Web Development", attended: 18, total: 20 },
];

const ClassesBanner = ({ navigation }) => (
  <Pressable
    onPress={() => navigation.navigate("Schedule")}
    style={styles.bannerWrapper}
  >
    <LinearGradient
      colors={["#5b21b6", "#7c3aed", "#6d28d9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.banner}
    >
      {/* Decorative circles */}
      <View style={styles.bannerCircle1} />
      <View style={styles.bannerCircle2} />

      {/* Top row */}
      <View style={styles.bannerTop}>
        <View style={styles.bannerDatePill}>
          <View style={styles.bannerDateRow}>
            <MaterialIcons
              name="calendar-month"
              size={12}
              color="rgba(255,255,255,0.9)"
            />
            <Text style={styles.bannerDateText}>Thursday, 17 July</Text>
          </View>
        </View>
        <View style={styles.bannerCountBox}>
          <Text style={styles.bannerCountNum}>3</Text>
          <Text style={styles.bannerCountLabel}>classes</Text>
        </View>
      </View>

      <Text style={styles.bannerTitle}>3 Classes Today</Text>
      <Text style={styles.bannerSub}>
        Next: <Text style={styles.bannerSubBold}>Web Dev</Text> · 11:00 AM · Lab
        2
      </Text>

      {/* Mini schedule strip */}
      {/* <View style={styles.bannerStrip}>
        {CLASSES.map((c, i) => (
          <View key={c.name} style={styles.bannerStripItem}>
            <View
              style={[
                styles.bannerDot,
                {
                  backgroundColor:
                    c.status === "active"
                      ? "#fff"
                      : c.status === "next"
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(255,255,255,0.25)",
                },
              ]}
            />
            <Text
              style={[
                styles.bannerStripName,
                { opacity: c.status === "later" ? 0.45 : 1 },
              ]}
              numberOfLines={1}
            >
              {c.name}
            </Text>
            <Text
              style={[
                styles.bannerStripTime,
                { opacity: c.status === "later" ? 0.35 : 0.7 },
              ]}
            >
              {c.time}
            </Text>
          </View>
        ))}
      </View> */}

      <Text style={styles.bannerTap}>View full schedule →</Text>
    </LinearGradient>
  </Pressable>
);

const getAttendanceStatus = (pct) => {
  if (pct < 75)
    return {
      label: "Critical",
      color: "#dc2626",
      bg: "#fef2f2",
      border: "#fecaca",
    };
  if (pct < 85)
    return {
      label: "Warning",
      color: "#d97706",
      bg: "#fffbeb",
      border: "#fde68a",
    };
  return null;
};

const AttendanceAlert = ({ navigation }) => {
  const atRisk = ATTENDANCE_DATA.map((s) => ({
    ...s,
    pct: Math.round((s.attended / s.total) * 100),
  })).filter((s) => getAttendanceStatus(s.pct));

  if (atRisk.length === 0) return null;

  return (
    <View style={alertStyles.container}>
      {/* Header */}
      <View style={alertStyles.hdr}>
        <Text style={alertStyles.hdrText}>ATTENDANCE ALERT</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Attendance")}
          style={alertStyles.hdrLink}
        >
          <Text style={alertStyles.hdrLinkText}  >See all →</Text>
        </TouchableOpacity>
      </View>

      {/* Subject rows */}
      {atRisk.map((s) => {
        const st = getAttendanceStatus(s.pct);
        return (
          <View key={s.name} style={alertStyles.row}>
            {/* Left: color bar */}
            <View style={[alertStyles.bar, { backgroundColor: st.color }]} />

            <View style={{ flex: 1 }}>
              <Text style={alertStyles.subName}>{s.name}</Text>
              <Text style={alertStyles.subMeta}>
                {s.attended}/{s.total} classes · need{" "}
                {Math.ceil(0.75 * s.total - s.attended)} more to be safe
              </Text>

              {/* Progress bar */}
              <View style={alertStyles.track}>
                <View
                  style={[
                    alertStyles.fill,
                    {
                      width: `${s.pct}%`,
                      backgroundColor: st.color,
                    },
                  ]}
                />
                {/* 75% marker */}
                <View style={alertStyles.marker} />
              </View>
            </View>

            {/* Right: pct + badge */}
            <View style={alertStyles.right}>
              <Text style={[alertStyles.pct, { color: st.color }]}>
                {s.pct}%
              </Text>
              <View
                style={[
                  alertStyles.badge,
                  { backgroundColor: st.bg, borderColor: st.border },
                ]}
              >
                <Text style={[alertStyles.badgeText, { color: st.color }]}>
                  {st.label}
                </Text>
              </View>
            </View>
          </View>
        );
      })}

      <Text style={alertStyles.footnote}>
        Min. required attendance: 75% per subject
      </Text>
    </View>
  );
};

const TasksSection = ({ navigation }) => (
  <View style={taskStyles.wrap}>
    <View style={taskStyles.titleRow}>
      <Text style={taskStyles.sectionTitle}>Pending Tasks</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
        <Text style={taskStyles.seeAll}>See all →</Text>
      </TouchableOpacity>
    </View>

    {TASKS.map((task) => (
      <View key={task.id} style={taskStyles.card}>
        <View
          style={[
            taskStyles.urgentDot,
            { backgroundColor: task.urgent ? "#ef4444" : "#94a3b8" },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={taskStyles.taskTitle}>{task.title}</Text>
          <Text style={taskStyles.taskMeta}>
            {task.subject} · Due: {task.due}
          </Text>
        </View>
        {task.urgent && (
          <View style={taskStyles.urgentBadge}>
            <Text style={taskStyles.urgentText}>Urgent</Text>
          </View>
        )}
      </View>
    ))}
  </View>
);

const UpcomingSection = ({ navigation }) => (
  <View style={eventStyles.wrap}>
    <View style={eventStyles.titleRow}>
      <Text style={eventStyles.sectionTitle}>Upcoming</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Events")}>
        <Text style={eventStyles.seeAll}>See all →</Text>
      </TouchableOpacity>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      style={eventStyles.cardContainer}
    >
      {EVENTS.map((ev) => (
        <TouchableOpacity
          key={ev.id}
          onPress={() => navigation.navigate("Events")}
          activeOpacity={0.85}
        >
          <View style={[eventStyles.card, { borderTopColor: ev.color }]}>
            <View style={[eventStyles.iconCircle, { backgroundColor: ev.bg }]}>
              <MaterialIcons name={ev.icon} size={18} color={ev.color} />
            </View>
            <Text style={eventStyles.evTitle} numberOfLines={1}>
              {ev.title}
            </Text>
            <Text style={eventStyles.evDate}>
              {ev.date} · {ev.time}
            </Text>
            <View style={eventStyles.evLocRow}>
              <MaterialIcons
                name="place"
                size={12}
                color={COLORS.textTertiary}
              />
              <Text style={eventStyles.evLoc}>{ev.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const aiBrief = useAIBrief("home");

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Background />

      <Header title={STUDENT.name} />
      <View style={styles.studentMetaRow}>
        <View style={styles.studentMetaPill}>
          <Text style={styles.studentMetaText}>{STUDENT.department}</Text>
        </View>
        <View
          style={[
            styles.studentMetaPill,
            { backgroundColor: "#EEF0FF", borderColor: "#DDE0F5" },
          ]}
        >
          <Text style={[styles.studentMetaText, { color: COLORS.primary }]}>
            {STUDENT.semester}
          </Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 25,
          flexGrow: 1,
        }}
      >
        <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
          <AIBriefCard
            data={aiBrief.data}
            loading={aiBrief.loading}
            error={aiBrief.error}
            onRetry={aiBrief.refresh}
          />
        </View>
        <ClassesBanner navigation={navigation} />
        <AttendanceAlert navigation={navigation} />
        <UpcomingSection navigation={navigation} />
        <TasksSection navigation={navigation} />
      </ScrollView>
    </View>
  );
}

