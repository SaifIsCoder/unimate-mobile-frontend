import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { COLORS } from "../theme";
import Header from "../components/layout/Header";
import { TASKS } from "../data/mockData";
import { useNotifications } from "../context/NotificationContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/layout/Background";
import { AIBriefCard } from "../components/ui";
import { styles } from "./TasksScreen.styles";

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
        contentContainerStyle={{ paddingBottom: 25 }}
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

