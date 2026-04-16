// ─── HOME SCREEN ──────────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { COLORS, RADIUS, FONT } from '../theme/theme';
import { StatusBarRow, Avatar, SectionTitle} from '../components/SharedComponents';
import { STUDENT } from '../data/mockData';

// ── Banner Card ───────────────────────────────────────────────────────────────
const Banner = () => (
  <LinearGradient
    colors={COLORS.gradientPurple}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.banner}
  >
    {/* Decorative circles for depth */}
    <View style={styles.bannerCircle1} />
    <View style={styles.bannerCircle2} />
    <Text style={styles.bannerLabel}>📅 Today — Thursday</Text>
    <Text style={styles.bannerTitle}>3 Classes Today</Text>
    <Text style={styles.bannerSub}>Next: Web Dev at 9:00 AM → Room 15</Text>
  </LinearGradient>
);

// ── Quick Stat Tile ───────────────────────────────────────────────────────────
const StatTile = ({ bg, label, value, sub, borderColor }) => (
  <View style={[styles.statTile, { backgroundColor: bg, borderColor }]}>
    <Text style={[styles.statLabel, { color: borderColor }]}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statSub}>{sub}</Text>
  </View>
);

// ── Small Stat Card ───────────────────────────────────────────────────────────
const SmallCard = ({ icon, label, value }) => (
  <View style={styles.smallCard}>
    <View style={styles.smallCardIcon}>
      <Text style={{ fontSize: 14 }}>{icon}</Text>
    </View>
    <Text style={styles.smallCardLabel}>{label}</Text>
    <Text style={styles.smallCardValue}>{value}</Text>
  </View>
);

// ── Quick Link ────────────────────────────────────────────────────────────────
const QuickLink = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickLink} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.quickLinkText}>{icon} {label}</Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function HomeScreen({ onNavigate }) {
  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 16 }}
    >
      {/* <StatusBarRow /> */}

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.name}>{STUDENT.name}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.bellBtn}
            onPress={() => onNavigate('Notifications')}
            activeOpacity={0.7}
          >
            <Feather name="bell" size={16} color={COLORS.textSecondary} />
            {/* Unread dot */}
            <View style={styles.bellDot} />
          </TouchableOpacity>
          <Avatar label="S" size={36} />
        </View>
      </View>

      <Banner />

      {/* ── Attendance & GPA tiles ── */}
      <View style={styles.tileRow}>
        <StatTile
          bg={COLORS.green2}
          borderColor={COLORS.green}
          label="📊 Attendance"
          value={STUDENT.attendance}
          sub="This semester"
        />
        <StatTile
          bg={COLORS.primary3}
          borderColor={COLORS.primary}
          label="⭐ GPA"
          value={STUDENT.gpa}
          sub="Current CGPA"
        />
      </View>

      {/* ── Small stat cards ── */}
      <View style={styles.smallCardRow}>
        <SmallCard icon="📝" label="Assignments" value="1 Pending" />
        <SmallCard icon="❓" label="Quizzes"     value="No upcoming" />
      </View>

      <SectionTitle>Quick Links</SectionTitle>
      <View style={styles.quickLinks}>
        <QuickLink icon="📈" label="Grades"   onPress={() => onNavigate('Grades')}   />
        <QuickLink icon="🎉" label="Events"   onPress={() => onNavigate('Events')}   />
        <QuickLink icon="📅" label="Schedule" onPress={() => onNavigate('Schedule')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  greeting: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 1 },
  name:     { fontSize: 20, fontWeight: FONT.bold, color: COLORS.textPrimary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bellBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  bellDot: {
    position: 'absolute', top: -2, right: -2,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#FF4757',
    borderWidth: 1.5, borderColor: COLORS.bg,
  },
  banner: {
    marginHorizontal: 16, marginVertical: 8,
    borderRadius: RADIUS.xl, padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerCircle1: {
    position: 'absolute', top: -20, right: -20,
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bannerCircle2: {
    position: 'absolute', bottom: -15, right: 20,
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  bannerLabel: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginBottom: 4, fontWeight: FONT.medium },
  bannerTitle: { fontSize: 16, fontWeight: FONT.bold,  color: '#fff', marginBottom: 2 },
  bannerSub:   { fontSize: 11, color: 'rgba(255,255,255,0.75)' },

  tileRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 16, marginTop: 6,
  },
  statTile: {
    flex: 1, borderRadius: 14, padding: 12,
    borderWidth: 1,
  },
  statLabel: { fontSize: 10, fontWeight: FONT.medium, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: FONT.bold, color: COLORS.textPrimary },
  statSub:   { fontSize: 9, color: COLORS.textTertiary, marginTop: 2 },

  smallCardRow: {
    flexDirection: 'row', gap: 8,
    paddingHorizontal: 16, marginTop: 8,
  },
  smallCard: {
    flex: 1, backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
  },
  smallCardIcon: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: COLORS.orange2,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  smallCardLabel: { fontSize: 10, color: COLORS.textSecondary, marginBottom: 3, fontWeight: FONT.medium },
  smallCardValue: { fontSize: 14, fontWeight: FONT.bold, color: COLORS.textPrimary },

  quickLinks: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 },
  quickLink: {
    backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.md, paddingVertical: 8, paddingHorizontal: 14,
  },
  quickLinkText: { fontSize: 11, fontWeight: FONT.semiBold, color: COLORS.textSecondary },
});
