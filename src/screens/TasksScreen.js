// ─── TASKS SCREEN — Command Center (FULL REWRITE) ────────────────────────────
// Design: Lumina Academic · No header · Starts from title + pills
// Sections: Title+Stats → Filter Pills → AI Focus Brief → AI Priority Cards → Completed List

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { COLORS, RADIUS, FONT } from "../theme/theme";
import Header from "../components/Header";
import { TASKS } from "../data/mockData";
import { useNotifications } from "../context/NotificationContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/Background";
import Svg, { Circle } from "react-native-svg";

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA — replace with real data from mockData.js
// ─────────────────────────────────────────────────────────────────────────────

const AI_INSIGHT =
  `Focus Mode: Your Database assignment is due in 2 days, and you usually struggle with this subject. Start now to avoid a late-night crunch.`;

const PRIORITY_TASKS = [
  {
    id: "p1",
    priority: "Critical",
    difficulty: "High",
    title: "Database Design — ER Diagram",
    subject: "Database Systems (IT-305)",
    due: "Due Jan 16 (2 Days)",
    progress: 85,
    accentColor: "#dc2626",
    accentBg: "#fef2f2",
    badgeBg: "#ffdad6",
    badgeText: "#93000a",
    progressColor: "#dc2626",
  },
  {
    id: "p2",
    priority: "Moderate",
    difficulty: "Medium",
    title: "Assignment — Linked Lists",
    subject: "Data Structures (CS-103)",
    due: "Due Jan 13",
    progress: 45,
    accentColor: "#6063ee",
    accentBg: "#f0f0ff",
    badgeBg: "#e5dcf4",
    badgeText: "#666073",
    progressColor: "#4648d4",
  },
];

const COMPLETED_TASKS = [
  {
    id: "c1",
    title: "Project — Portfolio Website",
    meta: "IT-201  ·  Graded: 92/100",
  },
  { id: "c2", title: "Lab 4: Binary Trees", meta: "CS-103  ·  Graded: 48/50" },
];

const FILTERS = ["All", "Pending", "Done", "Overdue"];

// ─────────────────────────────────────────────────────────────────────────────
// CIRCULAR PROGRESS
// ─────────────────────────────────────────────────────────────────────────────
const CircularProgress = ({ progress, color }) => {
  const size = 40;
  const strokeWidth = 3;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (progress / 100) * circ;

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#e9e5ff"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={{ fontSize: 8, fontWeight: "800", color: "#111827" }}>
        {progress}%
      </Text>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FILTER PILLS
// ─────────────────────────────────────────────────────────────────────────────
const FilterPills = ({ active, setActive }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={pillStyles.row}
  >
    {FILTERS.map((f) => (
      <TouchableOpacity
        key={f}
        onPress={() => setActive(f)}
        activeOpacity={0.75}
        style={[pillStyles.pill, active === f && pillStyles.pillActive]}
      >
        <Text
          style={[
            pillStyles.pillText,
            active === f && pillStyles.pillTextActive,
          ]}
        >
          {f}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

// ─────────────────────────────────────────────────────────────────────────────
// AI FOCUS BRIEF
// ─────────────────────────────────────────────────────────────────────────────
const AIFocusBrief = () => (
  <View style={briefStyles.card}>
    <View style={briefStyles.headerRow}>
      <Text style={briefStyles.icon}>✨</Text>
      <Text style={briefStyles.label}>FOCUS MODE INSIGHT</Text>
    </View>
    <Text style={briefStyles.body}>"{AI_INSIGHT}"</Text>
    <View style={briefStyles.btnRow}>
      <TouchableOpacity style={briefStyles.btnPrimary}>
        <Text style={briefStyles.btnPrimaryText}>Start Pomodoro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={briefStyles.btnSecondary}>
        <Text style={briefStyles.btnSecondaryText}>View Resources</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// AI PRIORITY CARD
// ─────────────────────────────────────────────────────────────────────────────
const PriorityCard = ({ task }) => (
  <View style={[prioStyles.card, { borderLeftColor: task.accentColor }]}>
    {/* Top row: badge + difficulty */}
    <View style={prioStyles.topRow}>
      <View style={[prioStyles.badge, { backgroundColor: task.badgeBg }]}>
        <Text style={[prioStyles.badgeText, { color: task.badgeText }]}>
          {task.priority}
        </Text>
      </View>
      <View style={prioStyles.diffRow}>
        <Text style={prioStyles.bolt}>⚡</Text>
        <Text style={prioStyles.diffText}>Difficulty: {task.difficulty}</Text>
      </View>
    </View>

    {/* Title + subject */}
    <Text style={prioStyles.title}>{task.title}</Text>
    <Text style={prioStyles.subject}>{task.subject}</Text>

    {/* Footer: due + circle */}
    <View style={prioStyles.footer}>
      <View style={prioStyles.dueRow}>
        <Text style={[prioStyles.dueIcon, { color: task.accentColor }]}>
          🕐
        </Text>
        <Text style={prioStyles.dueText}>{task.due}</Text>
      </View>
      <CircularProgress progress={task.progress} color={task.progressColor} />
    </View>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// COMPLETED TASK ROW
// ─────────────────────────────────────────────────────────────────────────────
const CompletedCard = ({ item }) => (
  <View style={doneStyles.card}>
    <View style={doneStyles.iconBox}>
      <Text style={{ fontSize: 20 }}>✅</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={doneStyles.title}>{item.title}</Text>
      <Text style={doneStyles.meta}>{item.meta}</Text>
    </View>
    <TouchableOpacity style={doneStyles.chevron}>
      <Text style={{ color: COLORS.textSecondary, fontSize: 16 }}>›</Text>
    </TouchableOpacity>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// STANDARD TASK CARD (for filtered list)
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_CFG = {
  pending: {
    bg: "#eff6ff",
    text: "#1d4ed8",
    label: "⏳ Pending",
    bar: "#3b82f6",
  },
  done: { bg: "#f0fdf4", text: "#15803d", label: "✓ Done", bar: "#22c55e" },
  overdue: {
    bg: "#fef2f2",
    text: "#dc2626",
    label: "⚠ Overdue",
    bar: "#dc2626",
  },
};

const TaskCard = ({ item, hasUpdate }) => {
  const cfg = STATUS_CFG[item.status] || STATUS_CFG.pending;
  return (
    <View style={[taskStyles.card, { borderLeftColor: cfg.bar }]}>
      {hasUpdate && <View style={taskStyles.updateDot} />}
      <View style={taskStyles.topRow}>
        <Text style={taskStyles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={[taskStyles.badge, { backgroundColor: cfg.bg }]}>
          <Text style={[taskStyles.badgeText, { color: cfg.text }]}>
            {cfg.label}
          </Text>
        </View>
      </View>
      <Text style={taskStyles.meta}>📄 {item.course}</Text>
      <Text style={taskStyles.meta}>📅 {item.due}</Text>
      <View style={taskStyles.footer}>
        {item.isGraded ? (
          <Text style={taskStyles.graded}>
            ✅ Graded:{" "}
            <Text style={{ fontWeight: "700", color: "#111" }}>
              {item.marks}
            </Text>
          </Text>
        ) : item.status === "done" ? (
          <Text style={taskStyles.doneText}>✔ Completed</Text>
        ) : (
          <Text style={taskStyles.pendingText}>Awaiting update</Text>
        )}
        <TouchableOpacity style={taskStyles.viewBtn}>
          <Text style={taskStyles.viewBtnText}>👁 View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────
export default function TasksScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const { hasUnreadForEntity } = useNotifications();
  const insets = useSafeAreaInsets();

  const total = TASKS.length;
  const pending = TASKS.filter((t) => t.status === "pending").length;
  const done = TASKS.filter((t) => t.status === "done").length;
  const overdue = TASKS.filter((t) => t.status === "overdue").length;

  const filtered = TASKS.filter((t) => {
    if (activeFilter === "All") return true;
    return t.status === activeFilter.toLowerCase();
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
        {/* ── Title + Stats ── */}
        {/* <View style={styles.titleSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pageSub}>
              Stay on track with your academic goals.
            </Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: COLORS.primary }]}>
                {total}
              </Text>
              <Text style={styles.statLbl}>TOTAL</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: "#615b6f" }]}>
                {pending}
              </Text>
              <Text style={styles.statLbl}>PENDING</Text>
            </View>
              <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: "#615b6f" }]}>
                {pending}
              </Text>
              <Text style={styles.statLbl}>PENDING</Text>
            </View>
              <View style={styles.statItem}>
              <Text style={[styles.statNum, { color: "#615b6f" }]}>
                {pending}
              </Text>
              <Text style={styles.statLbl}>PENDING</Text>
            </View>
          </View>
        </View> */}

        {/* ── Filter Pills ── */}
        <FilterPills active={activeFilter} setActive={setActiveFilter} />

        {/* ── AI Focus Brief (only in All view) ── */}
        {activeFilter === "All" && <AIFocusBrief />}

        {/* ── AI Priority Cards (only in All view) ── */}
        {activeFilter === "All" && (
          <View style={styles.prioritySection}>
            <View style={styles.sectionHeader}>
              {/* <Text style={styles.sectionIcon}>🧠</Text> */}
              <Text style={styles.sectionTitle}>AI Task Prioritization</Text>
            </View>
            <View style={styles.priorityGrid}>
              {PRIORITY_TASKS.map((t) => (
                <PriorityCard key={t.id} task={t} />
              ))}
            </View>
          </View>
        )}

        {/* ── Completed Tasks (only in All view) ── */}
        {activeFilter === "All" && (
          <View style={styles.completedSection}>
            <Text style={styles.sectionTitle2}>Completed Tasks</Text>
            {COMPLETED_TASKS.map((c) => (
              <CompletedCard key={c.id} item={c} />
            ))}
          </View>
        )}

        {/* ── Filtered Standard List ── */}
        {showStandardList && (
          <View style={{ paddingTop: 8 }}>
            {filtered.length === 0 ? (
              <Text style={styles.emptyText}>No tasks here 🎉</Text>
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

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#181445",
    letterSpacing: -0.5,
  },
  pageSub: { fontSize: 13, color: "#464554", marginTop: 2, fontWeight: "400" },

  statsRow: { flexDirection: "row", gap: 20, alignItems: "flex-end" },
  statItem: { alignItems: "center" },
  statNum: { fontSize: 22, fontWeight: "800" },
  statLbl: {
    fontSize: 9,
    fontWeight: "700",
    color: "#767586",
    letterSpacing: 0.5,
    marginTop: 1,
  },

  prioritySection: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#181445" },

  priorityGrid: { gap: 12 },

  completedSection: { marginTop: 24, paddingHorizontal: 16 },
  sectionTitle2: {
    fontSize: 17,
    fontWeight: "700",
    color: "#181445",
    marginBottom: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: COLORS.textTertiary,
    fontSize: 13,
  },
});

// Filter pills
const pillStyles = StyleSheet.create({
  row: { paddingHorizontal: 16, gap: 8, paddingBottom: 4 },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: "#efebff",
  },
  pillActive: { backgroundColor: COLORS.primary },
  pillText: { fontSize: 12, fontWeight: "700", color: "#464554" },
  pillTextActive: { color: "#fff" },
});

// AI brief
const briefStyles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    borderTopWidth: 4,
    borderTopColor: "#6063ee",
    borderWidth: 1,
    borderColor: "#6063ee",
    padding: 14,
    gap: 10,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  icon: { fontSize: 16 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4648d4",
    letterSpacing: 1,
  },
  body: {
    fontSize: 13,
    fontWeight: "500",
    color: "#181445",
    lineHeight: 17,
    fontStyle: "italic",
  },
  btnRow: { flexDirection: "row", gap: 10, marginTop: 4 },
  btnPrimary: {
    backgroundColor: "#4648d4",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
  },
  btnPrimaryText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  btnSecondary: {
    backgroundColor: "#e5dcf4",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 10,
  },
  btnSecondaryText: { fontSize: 12, fontWeight: "700", color: "#666073" },
});

// Priority cards
const prioStyles = StyleSheet.create({
  card: {
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: { borderRadius: 99, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontSize: 9, fontWeight: "700", letterSpacing: 0.6 },
  diffRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  bolt: { fontSize: 12 },
  diffText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#464554",
    letterSpacing: 0.5,
  },

  title: { fontSize: 16, fontWeight: "800", color: "#181445", marginBottom: 3 },
  subject: { fontSize: 12, color: "#464554", fontWeight: "400" },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  dueRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  dueIcon: { fontSize: 12 },
  dueText: { fontSize: 11, fontWeight: "700", color: "#464554" },
});

// Completed cards
const doneStyles = StyleSheet.create({
  card: {
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
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 14, fontWeight: "700", color: "#181445" },
  meta: {
    fontSize: 10,
    fontWeight: "700",
    color: "#767586",
    letterSpacing: 0.4,
    marginTop: 2,
  },
  chevron: { padding: 4 },
});

// Standard task cards (filtered views)
const taskStyles = StyleSheet.create({
  card: {
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#181445",
    flex: 1,
    marginRight: 8,
  },
  badge: {
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  badgeText: { fontSize: 10, fontWeight: "600" },
  meta: { fontSize: 12, color: "#767586", marginBottom: 2 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e9e5ff",
    paddingTop: 8,
  },
  graded: { fontSize: 12, color: "#15803d", fontWeight: "600" },
  doneText: { fontSize: 11, color: "#15803d", fontWeight: "600" },
  pendingText: { fontSize: 11, color: "#d97706" },
  viewBtn: {
    backgroundColor: "#ede9fe",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 99,
  },
  viewBtnText: { fontSize: 10, color: "#4648d4", fontWeight: "700" },
});
