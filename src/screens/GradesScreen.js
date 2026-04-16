// ─── GRADES SCREEN ────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, FONT } from '../theme/theme';
import { StatusBarRow, Avatar, FilterPill, SectionTitle } from '../components/SharedComponents';
import { GRADES, STUDENT } from '../data/mockData';

const GRADE_FILTERS = ['Current Sem', 'All Semesters', 'Transcript'];

// ── GPA Hero Card ─────────────────────────────────────────────────────────────
const GpaHero = () => (
  <LinearGradient
    colors={COLORS.gradientGreen}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.gpaHero}
  >
    <View style={styles.heroBubble} />
    <View>
      <Text style={styles.gpaLabel}>Current CGPA</Text>
      <Text style={styles.gpaNumber}>{STUDENT.gpa}</Text>
      <Text style={styles.gpaSub}>8th Semester · Fall 2019</Text>
    </View>
    <View style={styles.gpaRight}>
      <Text style={styles.attNum}>{STUDENT.attendance}</Text>
      <Text style={styles.attLabel}>Attendance</Text>
    </View>
  </LinearGradient>
);

// ── Progress Bar ──────────────────────────────────────────────────────────────
const ProgressBar = ({ progress, variant }) => {
  const colors = {
    green:  ['#1DB87A', '#0EA5E9'],
    purple: [COLORS.primary, '#9C6CF8'],
    orange: [COLORS.orange, COLORS.red],
  };
  const gradColors = colors[variant] || colors.purple;

  return (
    <View style={styles.progressTrack}>
      <LinearGradient
        colors={gradColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${progress}%` }]}
      />
    </View>
  );
};

// ── Grade Letter Badge ────────────────────────────────────────────────────────
const GradeLetter = ({ letter, variant }) => {
  const map = {
    green:  { bg: COLORS.green2,  color: COLORS.green  },
    purple: { bg: COLORS.primary3, color: COLORS.primary },
    orange: { bg: COLORS.orange2, color: COLORS.orange  },
  };
  const cfg = map[variant] || map.green;
  return (
    <View style={[styles.gradeLetter, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.gradeLetterText, { color: cfg.color }]}>{letter}</Text>
    </View>
  );
};

// ── Grade Card ────────────────────────────────────────────────────────────────
const GradeCard = ({ item }) => (
  <View style={styles.gradeCard}>
    <View style={styles.gradeHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.gradeCourse}>{item.course}</Text>
        <Text style={styles.gradeCode}>{item.code}</Text>
      </View>
      <GradeLetter letter={item.letter} variant={item.letterVariant} />
    </View>

    <ProgressBar progress={item.progress} variant={item.progressVariant} />

    <View style={styles.gradeBreakdown}>
      <Text style={styles.gradeItem}>Midterm: <Text style={styles.gradeItemStrong}>{item.midterm}</Text></Text>
      <Text style={styles.gradeItem}>Assignments: <Text style={styles.gradeItemStrong}>{item.assignments}</Text></Text>
      <Text style={styles.gradeItem}>Final: <Text style={styles.gradeItemStrong}>—</Text></Text>
      <Text style={styles.gradeItem}>Total: <Text style={styles.gradeItemStrong}>{item.total}</Text></Text>
    </View>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function GradesScreen() {
  const [activeFilter, setActiveFilter] = useState('Current Sem');

  return (
    <View style={styles.screen}>
      {/* <StatusBarRow /> */}

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Grades</Text>
        <Avatar label="S" size={36} />
      </View>

      <GpaHero />

      {/* ── Filter Pills ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
      >
        {GRADE_FILTERS.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={activeFilter === f}
            onPress={() => setActiveFilter(f)}
          />
        ))}
      </ScrollView>

      <SectionTitle>Semester 8 — 2026</SectionTitle>

      <FlatList
        data={GRADES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GradeCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
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

  gpaHero: {
    marginHorizontal: 16, marginBottom: 4,
    borderRadius: RADIUS.xl, padding: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    overflow: 'hidden', position: 'relative',
  },
  heroBubble: {
    position: 'absolute', top: -20, right: -10,
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  gpaLabel:  { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  gpaNumber: { fontSize: 36, fontWeight: FONT.bold, color: '#fff', lineHeight: 40 },
  gpaSub:    { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  gpaRight:  { alignItems: 'flex-end' },
  attNum:    { fontSize: 28, fontWeight: FONT.bold, color: '#fff' },
  attLabel:  { fontSize: 10, color: 'rgba(255,255,255,0.7)' },

  filterBar: { paddingHorizontal: 16, paddingVertical: 8 },

  gradeCard: {
    marginHorizontal: 16, marginBottom: 10,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4,
    elevation: 2,
  },
  gradeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  gradeCourse: { fontSize: 13, fontWeight: FONT.bold, color: COLORS.textPrimary },
  gradeCode:   { fontSize: 10, color: COLORS.textTertiary, marginTop: 2 },
  gradeLetter: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  gradeLetterText: { fontSize: 14, fontWeight: FONT.bold },

  progressTrack: {
    height: 6, backgroundColor: COLORS.border,
    borderRadius: 3, marginBottom: 8, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },

  gradeBreakdown: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gradeItem:      { fontSize: 10, color: COLORS.textTertiary },
  gradeItemStrong: { fontWeight: FONT.semiBold, color: COLORS.textPrimary },
});
