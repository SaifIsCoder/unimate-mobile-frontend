// ─── HOME SCREEN (FULL REWRITE) ───────────────────────────────────────────
// Sections: Header → AI Brief → Classes Banner → Attendance Alert → Tasks → Upcoming

import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, RADIUS, FONT } from "../theme/theme";
import { AIBriefCard } from "../components/SharedComponents";
import Header from "../components/Header";
import { STUDENT } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/Background";

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



// ─────────────────────────────────────────────────────────────────────────────
// 2. AI BRIEF
// ─────────────────────────────────────────────────────────────────────────────
const AI_BRIEF = {
  summary:
    "Heavy day ahead — 3 back-to-back classes. Prep for your Web Dev quiz during the 11 AM break. Data Structures attendance is at risk; consider attending today's session.",
  tags: ["Web Dev quiz", "Attendance risk", "3 classes"],
};


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

// ─────────────────────────────────────────────────────────────────────────────
// 4. ATTENDANCE ALERT
// ─────────────────────────────────────────────────────────────────────────────
const ATTENDANCE_DATA = [
  { name: "Data Structures", attended: 14, total: 20 },
  { name: "Database Systems", attended: 16, total: 20 },
  { name: "Web Development", attended: 18, total: 20 },
];

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
        {/* <Text style={alertStyles.hdrIcon}>⚠️</Text> */}
        <Text style={alertStyles.hdrText}>ATTENDANCE ALERT</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Attendance")}
          style={alertStyles.hdrLink}
        >
          <Text style={alertStyles.hdrLinkText}>See all →</Text>
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

// ─────────────────────────────────────────────────────────────────────────────
// 5. TASKS
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 6. UPCOMING EVENTS
// ─────────────────────────────────────────────────────────────────────────────
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
              <MaterialIcons name="place" size={12} color={COLORS.textTertiary} />
              <Text style={eventStyles.evLoc}>{ev.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Background />

      {/* 1 · Unified Header */}
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
       
        {/* 2 · AI Brief */}
        <View style={{ paddingHorizontal: 16, marginTop: 6}}>


        <AIBriefCard data={AI_BRIEF} />
        </View>

        {/* 3 · Classes Banner */}
        <ClassesBanner navigation={navigation} />

        {/* 4 · Attendance Alert */}
        <AttendanceAlert navigation={navigation} />
        <UpcomingSection navigation={navigation} />

        {/* 5 · Tasks */}
        <TasksSection navigation={navigation} />

        {/* 6 · Upcoming Events */}
      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  // Welcome Banner
  welcomeBanner: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    marginBottom: 4,
  },
  welcomeBack: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  studentName: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  studentMetaRow: {
    flexDirection: "row",
    gap: 8,
    marginLeft: 17,
    marginBottom: 10,
    // marginTop: 8,
  },
  studentMetaPill: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  studentMetaText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },

  // Classes Banner
  bannerWrapper: { marginHorizontal: 16, marginTop: 14 },
  banner: {
    borderRadius: 20,
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 14,
    overflow: "hidden",
    position: "relative",
  },
  bannerCircle1: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -35,
    right: -25,
  },
  bannerCircle2: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.04)",
    bottom: -20,
    left: 50,
  },

  bannerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bannerDatePill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bannerDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bannerDateText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "600",
  },
  bannerCountBox: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    width: 56,
    height: 56,
    justifyContent: "center",
  },
  bannerCountNum: { fontSize: 26, fontWeight: "800", color: "#fff" },
  bannerCountLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },

  bannerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.72)",
    fontWeight: "500",
  },
  bannerSubBold: { fontWeight: "700", color: "#fff" },

  // Mini class strip inside banner
  bannerStrip: {
    flexDirection: "row",
    marginTop: 16,
    gap: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    paddingTop: 12,
  },
  bannerStripItem: { flex: 1, alignItems: "center", gap: 4 },
  bannerDot: { width: 7, height: 7, borderRadius: 4 },
  bannerStripName: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  bannerStripTime: {
    fontSize: 9,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
  },

  bannerTap: {
    marginTop: 12,
    fontSize: 11,
    color: "white",
    fontWeight: "600",
    alignSelf: "flex-end",
  },
});

// Attendance Alert styles
const alertStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#fff5f5",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#fecaca",
    padding: 14,
  },
  hdr: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  hdrIcon: { fontSize: 13 },
  hdrText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#dc2626",
    letterSpacing: 0.8,
    flex: 1,
  },
  hdrLink: {},
  hdrLinkText: { fontSize: 11, color: "#dc2626", fontWeight: "600" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    gap: 10,
  },
  bar: {
    width: 3,
    height: "100%",
    borderRadius: 2,
    alignSelf: "stretch",
    minHeight: 40,
  },

  subName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  subMeta: { fontSize: 10, color: "#6b7280", marginBottom: 6 },

  track: {
    height: 5,
    backgroundColor: "#f3f4f6",
    borderRadius: 3,
    overflow: "visible",
    position: "relative",
  },
  fill: {
    height: "100%",
    borderRadius: 3,
    position: "absolute",
    top: 0,
    left: 0,
  },
  marker: {
    position: "absolute",
    left: "75%",
    top: -2,
    width: 1.5,
    height: 9,
    backgroundColor: "#9ca3af",
    borderRadius: 1,
  },

  right: { alignItems: "flex-end", gap: 4, minWidth: 60 },
  pct: { fontSize: 18, fontWeight: "700" },
  badge: {
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
  },
  badgeText: { fontSize: 10, fontWeight: "600" },
  footnote: { fontSize: 10, color: "#ef4444", marginTop: 4, opacity: 0.75 },
});

// Tasks styles
const taskStyles = StyleSheet.create({
  wrap: { marginTop: 20, paddingHorizontal: 16 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },
  seeAll: { fontSize: 12, color: COLORS.primary, fontWeight: "600" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  urgentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 2,
    alignSelf: "flex-start",
  },
  taskTitle: { fontSize: 13, fontWeight: "600", color: COLORS.textPrimary },
  taskMeta: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },

  urgentBadge: {
    backgroundColor: "#fef2f2",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  urgentText: { fontSize: 10, color: "#dc2626", fontWeight: "600" },
});

// Events styles
const eventStyles = StyleSheet.create({
  wrap: { marginTop: 15, paddingBottom: 8 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },
  seeAll: { fontSize: 12, color: COLORS.primary, fontWeight: "600" },
  cardContainer: {
    // paddingLeft: 16,
    marginHorizontal: 18,
  },
  card: {
    width: 160,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    // borderWidth: 1,
    borderColor: COLORS.border,
    // borderTopWidth: 3,
    gap: 3,
    // marginLeft: 16,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  evTitle: { fontSize: 13, fontWeight: "700", color: COLORS.textPrimary },
  evDate: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  evLocRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 2 },
  evLoc: { fontSize: 10, color: COLORS.textTertiary },
});
