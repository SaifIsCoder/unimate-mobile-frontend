// ─── TASKS SCREEN (UPDATED - NOTIFICATION INTEGRATED) ────────────────────────

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS, RADIUS, FONT, ACCENT } from "../theme/theme";
import { Avatar, FilterPill } from "../components/SharedComponents";
import NotificationBell from "../components/NotificationBell";
import { TASKS } from "../data/mockData";
import { useNotifications } from "../context/NotificationContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Background from "../components/Background";

const FILTERS = ["All", "Pending", "Done", "Overdue"];

// ── Status Badge ──────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    pending: { bg: COLORS.blue2, text: COLORS.blue, label: "⏳ Pending" },
    done: { bg: COLORS.green2, text: COLORS.green, label: "✓ Done" },
    overdue: { bg: COLORS.red2, text: COLORS.red, label: "⚠ Overdue" },
  };

  const cfg = map[status] || map.pending;

  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.badgeText, { color: cfg.text }]}>
        {cfg.label}
      </Text>
    </View>
  );
};

// ── Task Card ────────────────────────────────────────────────────────────────
const TaskCard = ({ item, hasUpdate }) => {
  const accentColor = ACCENT[item.accent] || ACCENT.purple;
  const isDone = item.status === "done";

  return (
    <View style={[styles.card, { borderLeftColor: accentColor.border }]}>

      {/* NEW UPDATE INDICATOR — from notification system */}
      {hasUpdate && <View style={styles.updateDot} />}

      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Badge status={item.status} />
      </View>

      <Text style={styles.meta}>📄 {item.course}</Text>

      <View style={styles.row}>
        <Text style={styles.meta}>📅 {item.due}</Text>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        {item.isGraded ? (
          <View style={styles.gradedRow}>
            <Text style={styles.gradedText}>
              ✅ Graded: <Text style={styles.marksText}>{item.marks}</Text>
            </Text>
          </View>
        ) : isDone ? (
          <Text style={styles.doneText}>✔ Completed</Text>
        ) : (
          <Text style={styles.pendingText}>Awaiting update</Text>
        )}

        <TouchableOpacity style={styles.btnView}>
          <Text style={styles.btnViewText}>👁 View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
export default function TasksScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const { hasUnreadForEntity } = useNotifications();
  const insets = useSafeAreaInsets();

  const filtered = TASKS.filter((t) => {
    if (activeFilter === "All") return true;
    return t.status === activeFilter.toLowerCase();
  });

  const total = TASKS.length;
  const pending = TASKS.filter((t) => t.status === "pending").length;
  const done = TASKS.filter((t) => t.status === "done").length;
  const overdue = TASKS.filter((t) => t.status === "overdue").length;

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16 }]}>
<Background />
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Tasks</Text>
        <View style={styles.headerRight}>
          <NotificationBell />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      {/* FILTERS */}
      <View style={styles.filterBar}>
        {FILTERS.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={activeFilter === f}
            onPress={() => setActiveFilter(f)}
          />
        ))}
      </View>

      {/* SUMMARY */}
      <View style={styles.summary}>
        {[
          { num: total, lbl: "Total", color: COLORS.primary },
          { num: pending, lbl: "Pending", color: COLORS.orange },
          { num: done, lbl: "Done", color: COLORS.green },
          { num: overdue, lbl: "Overdue", color: COLORS.red },
        ].map((s) => (
          <View key={s.lbl} style={styles.sumItem}>
            <Text style={[styles.sumNum, { color: s.color }]}>
              {s.num}
            </Text>
            <Text style={styles.sumLbl}>{s.lbl}</Text>
          </View>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            item={item}
            hasUpdate={hasUnreadForEntity('task', item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks available</Text>
        }
      />
    </View>
  );
}

// ── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },

  filterBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 10,
  },

  summary: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: COLORS.primary3,
    padding: 10,
    borderRadius: RADIUS.md,
    gap: 16,
  },

  sumItem: { alignItems: "center" },
  sumNum: { fontSize: 16, fontWeight: FONT.bold },
  sumLbl: { fontSize: 10, color: COLORS.primary2 },

  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    position: "relative",
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
    borderColor: COLORS.card,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },

  meta: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },

  row: { flexDirection: "row" },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },

  gradedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  gradedText: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: FONT.semiBold,
  },

  marksText: {
    color: COLORS.textPrimary,
    fontWeight: FONT.bold,
  },

  doneText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: FONT.semiBold,
  },

  pendingText: {
    color: COLORS.orange,
    fontSize: 11,
  },

  btnView: {
    backgroundColor: COLORS.primary3,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },

  btnViewText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: FONT.semiBold,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: COLORS.textTertiary,
  },
});