// ─── SCHEDULE SCREEN ──────────────────────────────────────────────────────────

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
import { StatusBarRow, Avatar } from '../components/SharedComponents';
import { CLASSES, WEEK_DAYS } from '../data/mockData';
import Entypo from '@expo/vector-icons/Entypo';
// ── Day Chip ──────────────────────────────────────────────────────────────────
const DayChip = ({ day, active, onPress }) => (
  <TouchableOpacity
    style={[styles.dayChip, active && styles.dayChipActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.dayName, active && styles.dayTextActive]}>{day.name}</Text>
    <Text style={[styles.dayNum, active && styles.dayTextActive]}>{day.num}</Text>
  </TouchableOpacity>
);

// ── Class Card ────────────────────────────────────────────────────────────────
const ClassCard = ({ item }) => {
  const accentColor = ACCENT[item.accent] || ACCENT.purple;
  return (
    <View style={[styles.classCard, { borderLeftColor: accentColor.border }]}>
      <Text style={styles.classTime}>🕘 {item.time}</Text>
      <Text style={styles.className}>{item.name}</Text>
      <Text style={styles.classCode}>{item.code}</Text>
      <View style={styles.classMeta}>
        <Text style={styles.classMetaText}>📍 {item.room}</Text>
        <Text style={styles.classMetaText}>👤 {item.teacher}</Text>
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState(3); // Thu index

  return (
    <View style={styles.screen}>
      {/* <StatusBarRow /> */}

      {/* ── Page Header ── */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Schedule</Text>
        <Avatar label="S" size={36} />
      </View>

      {/* ── Month Navigation ── */}
      <View style={styles.monthNav}>
        <TouchableOpacity style={styles.monthBtn} activeOpacity={0.7}>
          <Text style={styles.monthBtnText}><Entypo name="chevron-left" size={23} color="black" /></Text>
        </TouchableOpacity>
        <Text style={styles.monthLabel}>April 2026</Text>
        <TouchableOpacity style={styles.monthBtn} activeOpacity={0.7}>
          <Text style={styles.monthBtnText}><Entypo name="chevron-right" size={23} color="black" /></Text>
        </TouchableOpacity>
      </View>

      {/* ── Week Strip ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekStrip}
      >
        {/* {WEEK_DAYS.map((day, i) => (
          <DayChip
            key={i}
            day={day}
            active={selectedDay === i}
            onPress={() => setSelectedDay(i)}
          />
        ))} */}
      </ScrollView>

      <Text style={styles.dateHeading}>Thursday, April 16, 2026</Text>

      {/* ── Class List ── */}
      <FlatList
        data={CLASSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ClassCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, paddingVertical: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pageTitle: { fontSize: 22, fontWeight: FONT.bold, color: COLORS.textPrimary },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  monthLabel: { fontSize: 14, fontWeight: FONT.semiBold, color: COLORS.textPrimary },
  monthBtn: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
  },
  monthBtnText: { fontSize: 14, color: COLORS.textSecondary },

  weekStrip: { paddingHorizontal: 16, gap: 4 },
  dayChip: {
    alignItems: 'center', paddingVertical: 6, paddingHorizontal: 8,
    borderRadius: RADIUS.sm, minWidth: 38, height: 45,
  },
  dayChipActive: { backgroundColor: COLORS.primary },
  dayName: { fontSize: 9, color: COLORS.textTertiary, fontWeight: FONT.medium, marginBottom: 2 },
  dayNum: { fontSize: 14, fontWeight: FONT.semiBold, color: COLORS.textSecondary },
  dayTextActive: { color: '#fff' },

  dateHeading: {
    fontSize: 12, color: COLORS.textSecondary,
    paddingHorizontal: 16, paddingBottom: 8, fontWeight: FONT.medium,
  },

  classCard: {
    marginHorizontal: 16, marginBottom: 10,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
    borderLeftWidth: 3,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Android
    elevation: 2,
  },
  classTime: { fontSize: 10, color: COLORS.textTertiary, fontWeight: FONT.medium, marginBottom: 4 },
  className: { fontSize: 14, fontWeight: FONT.bold, color: COLORS.textPrimary, marginBottom: 2 },
  classCode: { fontSize: 10, color: COLORS.textTertiary, marginBottom: 8 },
  classMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  classMetaText: { fontSize: 10, color: COLORS.textSecondary },
});
