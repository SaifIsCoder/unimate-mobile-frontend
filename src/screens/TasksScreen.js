import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { COLORS } from "../theme/theme";
import Header from "../components/Header";
import { TASKS } from "../data/mockData";
import { useNotifications } from "../context/NotificationContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/Background";
import { AIBriefCard } from "../components/SharedComponents";

const AI_BRIEF =
  "Focus Mode: Your Database assignment is due in 2 days, and you usually struggle with this subject. Start now to avoid a late-night crunch.";

const PRIORITY_TASKS = [
  {
    id: "p1",
    priority: "Critical",
    difficulty: "High",
    title: "Database Design - ER Diagram",
    subject: "Database Systems (IT-305)",
    due: "Due Jan 16 (2 Days)",
    progress: 85,
    accentColor: "#dc2626",
    badgeBg: "#ffdad6",
    badgeText: "#93000a",
    progressColor: "#dc2626",
  },
  {
    id: "p2",
    priority: "Moderate",
    difficulty: "Medium",
    title: "Assignment - Linked Lists",
    subject: "Data Structures (CS-103)",
    due: "Due Jan 13",
    progress: 45,
    accentColor: "#6063ee",
    badgeBg: "#e5dcf4",
    badgeText: "#666073",
    progressColor: "#4648d4",
  },
];

const COMPLETED_TASKS = [
  {
    id: "c1",
    title: "Project - Portfolio Website",
    meta: "IT-201 - Graded: 92/100",
  },
  { id: "c2", title: "Lab 4: Binary Trees", meta: "CS-103 - Graded: 48/50" },
];

const FILTERS = ["All", "Pending", "Done", "Overdue"];

const STATUS_CFG = {
  pending: {
    bg: "#eff6ff",
    text: "#1d4ed8",
    label: "Pending",
    bar: "#3b82f6",
  },
  done: {
    bg: "#f0fdf4",
    text: "#15803d",
    label: "Done",
    bar: "#22c55e",
  },
  overdue: {
    bg: "#fef2f2",
    text: "#dc2626",
    label: "Overdue",
    bar: "#dc2626",
  },
};

const CircularProgress = ({ progress, color }) => {
  const size = 40;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (progress / 100) * circumference;

  return (
    <View style={styles.progressWrap}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e9e5ff"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
};

const FilterPills = ({ active, setActive }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.pillRow}
  >
    {FILTERS.map((filter) => (
      <TouchableOpacity
        key={filter}
        onPress={() => setActive(filter)}
        activeOpacity={0.75}
        style={[styles.pill, active === filter && styles.pillActive]}
      >
        <Text style={[styles.pillText, active === filter && styles.pillTextActive]}>
          {filter}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const PriorityCard = ({ task }) => (
  <View style={[styles.priorityCard, { borderLeftColor: task.accentColor }]}>
    <View style={styles.priorityTopRow}>
      <View style={[styles.priorityBadge, { backgroundColor: task.badgeBg }]}>
        <Text style={[styles.priorityBadgeText, { color: task.badgeText }]}>
          {task.priority}
        </Text>
      </View>
      <View style={styles.priorityDiffRow}>
        <MaterialIcons name="bolt" size={12} color="#464554" />
        <Text style={styles.priorityDiffText}>Difficulty: {task.difficulty}</Text>
      </View>
    </View>

    <Text style={styles.priorityTitle}>{task.title}</Text>
    <Text style={styles.prioritySubject}>{task.subject}</Text>

    <View style={styles.priorityFooter}>
      <View style={styles.priorityDueRow}>
        <MaterialIcons name="schedule" size={13} color={task.accentColor} />
        <Text style={styles.priorityDueText}>{task.due}</Text>
      </View>
      <CircularProgress progress={task.progress} color={task.progressColor} />
    </View>
  </View>
);

const CompletedCard = ({ item }) => (
  <View style={styles.completedCard}>
    <View style={styles.completedIconBox}>
      <MaterialIcons name="task-alt" size={24} color="#5b21b6" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.completedTitle}>{item.title}</Text>
      <Text style={styles.completedMeta}>{item.meta}</Text>
    </View>
    <TouchableOpacity style={styles.completedChevron}>
      <MaterialIcons name="chevron-right" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  </View>
);

const TaskCard = ({ item, hasUpdate }) => {
  const cfg = STATUS_CFG[item.status] || STATUS_CFG.pending;

  return (
    <View style={[styles.taskCard, { borderLeftColor: cfg.bar }]}>
      {hasUpdate && <View style={styles.updateDot} />}

      <View style={styles.taskTopRow}>
        <Text style={styles.taskTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={[styles.taskBadge, { backgroundColor: cfg.bg }]}>
          <Text style={[styles.taskBadgeText, { color: cfg.text }]}>{cfg.label}</Text>
        </View>
      </View>

      <View style={styles.taskMetaRow}>
        <MaterialIcons name="description" size={14} color="#767586" />
        <Text style={styles.taskMeta}>{item.course}</Text>
      </View>
      <View style={styles.taskMetaRow}>
        <MaterialIcons name="calendar-month" size={14} color="#767586" />
        <Text style={styles.taskMeta}>{item.due}</Text>
      </View>

      <View style={styles.taskFooter}>
        {item.isGraded ? (
          <Text style={styles.taskGraded}>
            Graded: <Text style={styles.taskMarks}>{item.marks}</Text>
          </Text>
        ) : item.status === "done" ? (
          <Text style={styles.taskDone}>Completed</Text>
        ) : (
          <Text style={styles.taskPending}>Awaiting update</Text>
        )}
      </View>
    </View>
  );
};

export default function TasksScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { hasUnreadForEntity } = useNotifications();
  const insets = useSafeAreaInsets();

  const filtered = TASKS.filter((task) => {
    if (activeFilter === "All") return true;
    return task.status === activeFilter.toLowerCase();
  });

  const showStandardList = activeFilter !== "All";

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Background />
      <Header title="Tasks" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        <FilterPills active={activeFilter} setActive={setActiveFilter} />

        {activeFilter === "All" && (
          <View style={styles.briefWrap}>
            <AIBriefCard data={AI_BRIEF} />
          </View>
        )}

        {activeFilter === "All" && (
          <View style={styles.prioritySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>AI Task Prioritization</Text>
            </View>
            <View style={styles.priorityGrid}>
              {PRIORITY_TASKS.map((task) => (
                <PriorityCard key={task.id} task={task} />
              ))}
            </View>
          </View>
        )}

        {activeFilter === "All" && (
          <View style={styles.completedSection}>
            <Text style={styles.sectionTitle}>Completed Tasks</Text>
            {COMPLETED_TASKS.map((item) => (
              <CompletedCard key={item.id} item={item} />
            ))}
          </View>
        )}

        {showStandardList && (
          <View style={{ paddingTop: 8 }}>
            {filtered.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialIcons
                  name="celebration"
                  size={28}
                  color={COLORS.textTertiary}
                />
                <Text style={styles.emptyText}>No tasks here</Text>
              </View>
            ) : (
              filtered.map((item) => (
                <TaskCard
                  key={item.id}
                  item={item}
                  hasUpdate={hasUnreadForEntity?.("task", item.id)}
                />
              ))
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  briefWrap: { paddingHorizontal: 16, marginTop: 6 },

  pillRow: { paddingHorizontal: 16, gap: 8, paddingBottom: 4 },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: "#efebff",
  },
  pillActive: { backgroundColor: COLORS.primary },
  pillText: { fontSize: 12, fontWeight: "700", color: "#464554" },
  pillTextActive: { color: "#fff" },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#181445" },

  prioritySection: { marginTop: 24, paddingHorizontal: 16 },
  priorityGrid: { gap: 12 },
  priorityCard: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderLeftWidth: 4,
    padding: 16,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  priorityTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  priorityBadge: { borderRadius: 99, paddingHorizontal: 10, paddingVertical: 3 },
  priorityBadgeText: { fontSize: 9, fontWeight: "700", letterSpacing: 0.6 },
  priorityDiffRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  priorityDiffText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#464554",
    letterSpacing: 0.5,
  },
  priorityTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#181445",
    marginBottom: 3,
  },
  prioritySubject: { fontSize: 12, color: "#464554", fontWeight: "400" },
  priorityFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  priorityDueRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  priorityDueText: { fontSize: 11, fontWeight: "700", color: "#464554" },

  progressWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: { fontSize: 8, fontWeight: "800", color: "#111827" },

  completedSection: { marginTop: 24, paddingHorizontal: 16 },
  completedCard: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(199,196,215,0.3)",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  completedIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
  },
  completedTitle: { fontSize: 14, fontWeight: "700", color: "#181445" },
  completedMeta: {
    fontSize: 10,
    fontWeight: "700",
    color: "#767586",
    letterSpacing: 0.4,
    marginTop: 2,
  },
  completedChevron: { padding: 4 },

  taskCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(199,196,215,0.4)",
    borderLeftWidth: 4,
    position: "relative",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  updateDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  taskTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#181445",
    flex: 1,
    marginRight: 8,
  },
  taskBadge: {
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  taskBadgeText: { fontSize: 10, fontWeight: "600" },
  taskMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  taskMeta: { fontSize: 12, color: "#767586" },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e9e5ff",
    paddingTop: 8,
  },
  taskGraded: { fontSize: 12, color: "#15803d", fontWeight: "600" },
  taskMarks: { fontWeight: "700", color: "#111" },
  taskDone: { fontSize: 11, color: "#15803d", fontWeight: "600" },
  taskPending: { fontSize: 11, color: "#d97706" },

  emptyState: { alignItems: "center", marginTop: 40, gap: 8 },
  emptyText: {
    textAlign: "center",
    color: COLORS.textTertiary,
    fontSize: 13,
  },
});
