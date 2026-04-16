// ─── ASSIGNMENTS SCREEN ───────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { COLORS, RADIUS, FONT, ACCENT } from '../theme/theme';
import { StatusBarRow, Avatar, FilterPill } from '../components/SharedComponents';
import { ASSIGNMENTS } from '../data/mockData';
const FILTERS = ['All', 'Pending', 'Submitted', 'Overdue'];

// ── Status Badge ──────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    submitted: { bg: COLORS.green2,  text: COLORS.green,  label: '✓ Submitted' },
    pending:   { bg: COLORS.blue2,   text: COLORS.blue,   label: '⏳ Pending'   },
    overdue:   { bg: COLORS.red2,    text: COLORS.red,    label: '⚠ Overdue'   },
  };
  const cfg = map[status] || map.pending;
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.badgeText, { color: cfg.text }]}>{cfg.label}</Text>
    </View>
  );
};

// ── Assignment Card ───────────────────────────────────────────────────────────
const AssignmentCard = ({ item }) => {
  const accentColor = ACCENT[item.accent] || ACCENT.purple;
  const isSubmitted = item.status === 'submitted';

  return (
    <View style={[styles.asgnCard, { borderLeftColor: accentColor.border }]}>
      <View style={styles.asgnHeader}>
        <Text style={styles.asgnTitle} numberOfLines={2}>{item.title}</Text>
        <Badge status={item.status} />
      </View>
      <Text style={styles.asgnMeta}>📄 {item.course}</Text>
      <View style={styles.asgnDueRow}>
        <Text style={styles.asgnMeta}>📅 {item.due}</Text>
        {item.submitted && (
          <Text style={styles.asgnSubmitted}> — {item.submitted}</Text>
        )}
        {!item.submitted && (
          <Text style={styles.asgnOverdue}> (Due soon!)</Text>
        )}
      </View>

      <View style={styles.asgnFooter}>
        <Text style={styles.pts}>⭐ {item.pts} pts</Text>
        <View style={styles.asgnActions}>
          <TouchableOpacity style={styles.btnView} activeOpacity={0.7}>
            <Text style={styles.btnViewText}>👁 View</Text>
          </TouchableOpacity>
          {isSubmitted ? (
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.btnReup}>Re-upload</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.btnSubmit} activeOpacity={0.7}>
              <Text style={styles.btnSubmitText}>↑ Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
export default function AssignmentsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = ASSIGNMENTS.filter((a) => {
    if (activeFilter === 'All') return true;
    return a.status === activeFilter.toLowerCase();
  });

  const total     = ASSIGNMENTS.length;
  const pending   = ASSIGNMENTS.filter((a) => a.status === 'pending').length;
  const overdue   = ASSIGNMENTS.filter((a) => a.status === 'overdue').length;
  const submitted = ASSIGNMENTS.filter((a) => a.status === 'submitted').length;

  return (
    <View style={styles.screen}>
      {/* <StatusBarRow /> */}

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Assignments</Text>
        <Avatar label="S" size={36} />
      </View>

      {/* ── Course Selector (static) ── */}
      <TouchableOpacity style={styles.courseSelect} activeOpacity={0.7}>
        <Text style={styles.courseSelectText}>All Courses</Text>
        <Text style={styles.courseSelectArrow}>▾</Text>
      </TouchableOpacity>

      {/* ── Filter Pills ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
      >
        {FILTERS.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={activeFilter === f}
            onPress={() => setActiveFilter(f)}
          />
        ))}
      </ScrollView>

      {/* ── Summary Strip ── */}
      <View style={styles.summaryStrip}>
        {[
          { num: total,     color: COLORS.primary, lbl: 'Total'   },
          { num: pending,   color: COLORS.orange,  lbl: 'Pending' },
          { num: overdue,   color: COLORS.red,     lbl: 'Overdue' },
          { num: submitted, color: COLORS.green,   lbl: 'Done'    },
        ].map((s) => (
          <View key={s.lbl} style={styles.sumItem}>
            <Text style={[styles.sumNum, { color: s.color }]}>{s.num}</Text>
            <Text style={styles.sumLbl}>{s.lbl}</Text>
          </View>
        ))}
      </View>

      {/* ── Assignment List ── */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AssignmentCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No assignments in this category.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, paddingVertical: 16 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8,
  },
  pageTitle: { fontSize: 22, fontWeight: FONT.bold, color: COLORS.textPrimary },

  courseSelect: {
    marginHorizontal: 16, marginBottom: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.md, paddingVertical: 10, paddingHorizontal: 14,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  courseSelectText:  { fontSize: 13, color: COLORS.textSecondary },
  courseSelectArrow: { fontSize: 13, color: COLORS.textTertiary },

  filterBar: { paddingHorizontal: 16, paddingBottom: 8 },

  summaryStrip: {
    marginHorizontal: 16, marginBottom: 10,
    backgroundColor: COLORS.primary3,
    borderRadius: RADIUS.md, padding: 10,
    flexDirection: 'row', gap: 16,
  },
  sumItem:  { alignItems: 'center' },
  sumNum:   { fontSize: 16, fontWeight: FONT.bold },
  sumLbl:   { fontSize: 9, color: COLORS.primary2, fontWeight: FONT.medium },

  asgnCard: {
    marginHorizontal: 16, marginBottom: 10,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4,
    elevation: 2,
  },
  asgnHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 6,
  },
  asgnTitle: {
    fontSize: 13, fontWeight: FONT.bold, color: COLORS.textPrimary,
    flex: 1, marginRight: 8,
  },
  badge: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: RADIUS.full },
  badgeText: { fontSize: 9, fontWeight: FONT.semiBold },

  asgnMeta: { fontSize: 10, color: COLORS.textTertiary, marginBottom: 2 },
  asgnDueRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  asgnSubmitted: { fontSize: 10, color: COLORS.green, fontWeight: FONT.semiBold },
  asgnOverdue:   { fontSize: 10, color: COLORS.red,   fontWeight: FONT.semiBold },

  asgnFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  pts: { fontSize: 12, fontWeight: FONT.semiBold, color: COLORS.orange },
  asgnActions: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  btnView: {
    backgroundColor: COLORS.primary3, paddingVertical: 5, paddingHorizontal: 12,
    borderRadius: RADIUS.full,
  },
  btnViewText:   { fontSize: 10, fontWeight: FONT.semiBold, color: COLORS.primary },
  btnSubmit: {
    backgroundColor: COLORS.primary, paddingVertical: 5, paddingHorizontal: 12,
    borderRadius: RADIUS.full,
  },
  btnSubmitText: { fontSize: 10, fontWeight: FONT.semiBold, color: '#fff' },
  btnReup:       { fontSize: 10, color: COLORS.textTertiary },

  emptyText: {
    textAlign: 'center', color: COLORS.textTertiary, marginTop: 40, fontSize: 13,
  },
});
