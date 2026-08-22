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
import { getTodaySchedule } from "../services/academicService";
import { getMyAttendance } from "../services/attendanceService";
import { listMyAssignments } from "../services/taskService";
import { listUpcomingEvents } from "../services/communicationService";
import { format } from "date-fns";
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

const ClassesBanner = ({ navigation, scheduleData }) => {
  const { classes = [], classCount = 0 } = scheduleData || {};
  const activeClasses = classes.filter(c => c.status !== 'cancelled');
  const nextClass = activeClasses.find(c => c.status === 'next' || c.status === 'upcoming') || activeClasses[0];

  return (
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
            <Text style={styles.bannerDateText}>{scheduleData?.dayOfWeek || "Today"}</Text>
          </View>
        </View>
        <View style={styles.bannerCountBox}>
          <Text style={styles.bannerCountNum}>{classCount}</Text>
          <Text style={styles.bannerCountLabel}>classes</Text>
        </View>
      </View>

      <Text style={styles.bannerTitle}>{classCount} Classes Today</Text>
      {nextClass ? (
        <Text style={styles.bannerSub}>
          Next: <Text style={styles.bannerSubBold}>{nextClass.courseName}</Text> · {nextClass.startTime.split('T')[1].substring(0,5)} · {nextClass.room}
        </Text>
      ) : (
        <Text style={styles.bannerSub}>No upcoming classes today.</Text>
      )}

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
};

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

const AttendanceAlert = ({ navigation, attendanceData }) => {
  const atRisk = (attendanceData || []).map((s) => ({
    ...s,
    name: s.course?.title || s.name,
    pct: Math.round((s.attended / (s.total || 1)) * 100),
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

const TasksSection = ({ navigation, tasks }) => (
  <View style={taskStyles.wrap}>
    <View style={taskStyles.titleRow}>
      <Text style={taskStyles.sectionTitle}>Pending Tasks</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
        <Text style={taskStyles.seeAll}>See all →</Text>
      </TouchableOpacity>
    </View>

    {tasks.length === 0 ? (
      <Text style={{ textAlign: 'center', color: '#6b7280', paddingVertical: 16 }}>
        No pending tasks at the moment.
      </Text>
    ) : (
      tasks.slice(0, 3).map((task) => (
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
              {task.subject} · Due: {new Date(task.due).toLocaleDateString()}
            </Text>
          </View>
          {(task.priority === 'high' || task.priority === 'critical') && (
            <View style={taskStyles.urgentBadge}>
              <Text style={taskStyles.urgentText}>Urgent</Text>
            </View>
          )}
        </View>
      ))
    )}
  </View>
);

const UpcomingSection = ({ navigation, events }) => (
  <View style={eventStyles.wrap}>
    <View style={eventStyles.titleRow}>
      <Text style={eventStyles.sectionTitle}>Upcoming</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Events")}>
        <Text style={eventStyles.seeAll}>See all →</Text>
      </TouchableOpacity>
    </View>

    {events.length === 0 ? (
      <Text style={{ textAlign: 'center', color: '#6b7280', paddingVertical: 16 }}>
        No upcoming events.
      </Text>
    ) : (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        style={eventStyles.cardContainer}
      >
        {events.map((ev) => (
          <TouchableOpacity
            key={ev.id}
            onPress={() => navigation.navigate("Events")}
            activeOpacity={0.85}
          >
            <View style={[eventStyles.card, { borderTopColor: ev.color || '#4f46e5' }]}>
              <View style={[eventStyles.iconCircle, { backgroundColor: ev.bg || '#eef2ff' }]}>
                <MaterialIcons name={ev.icon || 'event'} size={18} color={ev.color || '#4f46e5'} />
              </View>
              <Text style={eventStyles.evTitle} numberOfLines={1}>
                {ev.title}
              </Text>
              <Text style={eventStyles.evDate}>
                {new Date(ev.date).toLocaleDateString()} · {new Date(ev.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
    )}
  </View>
);

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const aiBrief = useAIBrief("home");
  const { user } = require("../context/UserContext").useUser();

  const [scheduleData, setScheduleData] = React.useState(null);
  const [attendanceData, setAttendanceData] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    const loadHomeData = async () => {
      try {
        const [schRes, attRes, tskRes, evRes] = await Promise.all([
          getTodaySchedule().catch(() => []),
          getMyAttendance().catch(() => ({ courses: [] })),
          listMyAssignments().catch(() => []),
          listUpcomingEvents().catch(() => []),
        ]);
        
        if (!mounted) return;
        
        setScheduleData({ classes: schRes, classCount: schRes.length });
        setAttendanceData(attRes.courses || []);
        setTasks(tskRes.filter(t => t.status === 'pending'));
        setEvents(evRes);
      } catch (err) {
        console.error("Error loading home data:", err);
      }
    };
    loadHomeData();
    return () => { mounted = false; };
  }, []);

  if (!user) return null;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Background />

      <Header title={user.name || "Student"} />
      <View style={styles.studentMetaRow}>
        <View style={styles.studentMetaPill}>
          <Text style={styles.studentMetaText}>{user.student?.department?.name || "Department"}</Text>
        </View>
        <View
          style={[
            styles.studentMetaPill,
            { backgroundColor: "#EEF0FF", borderColor: "#DDE0F5" },
          ]}
        >
          <Text style={[styles.studentMetaText, { color: COLORS.primary }]}>
            {user.student?.current_semester || "Semester"}
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
        <ClassesBanner navigation={navigation} scheduleData={scheduleData} />
        <AttendanceAlert navigation={navigation} attendanceData={attendanceData} />
        <UpcomingSection navigation={navigation} events={events} />
        <TasksSection navigation={navigation} tasks={tasks} />
      </ScrollView>
    </View>
  );
}

