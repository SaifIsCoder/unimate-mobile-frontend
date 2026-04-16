// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, FONT } from '../theme/theme';
import { StatusBarRow } from '../components/SharedComponents';
import { STUDENT } from '../data/mockData';

// ── Info Row ──────────────────────────────────────────────────────────────────
const InfoRow = ({ label, value, highlight }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoVal, highlight && { color: COLORS.primary }]}>
      {value}
    </Text>
  </View>
);

// ── Info Section ──────────────────────────────────────────────────────────────
const InfoSection = ({ title, rows }) => (
  <View style={styles.infoSection}>
    <Text style={styles.infoSectionTitle}>{title}</Text>
    {rows.map((row, i) => (
      <InfoRow key={i} label={row.label} value={row.value} highlight={row.highlight} />
    ))}
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const handleLogout = () =>
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive' },
    ]);

  return (
    <ScrollView
      style={styles.screen}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 16 }}
    >
      {/* ── Status bar with dark/purple bg ── */}
      <LinearGradient
        colors={COLORS.gradientProfile}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        {/* <StatusBarRow dark /> */}

        {/* Decorative circle (replicates ::before pseudo-element) */}
        <View style={styles.heroCircle} />

        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={[COLORS.primary, '#9C6CF8']}
            style={styles.profAvatar}
          >
            <Text style={styles.profAvatarText}>S</Text>
          </LinearGradient>
        </View>

        <Text style={styles.profName}>{STUDENT.name}</Text>
        <Text style={styles.profEmail}>{STUDENT.email}</Text>

        <View style={styles.profTags}>
          <View style={styles.profTag}>
            <Text style={styles.profTagText}>Roll #{STUDENT.rollNo}</Text>
          </View>
          <View style={styles.profTag}>
            <Text style={styles.profTagText}>{STUDENT.semester}</Text>
          </View>
        </View>

        {/* White curve at bottom of hero — achieved via a tall rounded View */}
        <View style={styles.heroCurve} />
      </LinearGradient>

      {/* ── GPA & Attendance tiles ── */}
      <View style={styles.statGrid}>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: COLORS.primary }]}>{STUDENT.gpa}</Text>
          <Text style={styles.statLbl}>Current GPA</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNum, { color: COLORS.green }]}>{STUDENT.attendance}</Text>
          <Text style={styles.statLbl}>Attendance</Text>
        </View>
      </View>

      <InfoSection
        title="Academic Info"
        rows={[
          { label: 'Program',    value: STUDENT.program    },
          { label: 'Department', value: STUDENT.department },
          { label: 'Session',    value: STUDENT.session    },
          { label: 'Section',    value: STUDENT.section    },
          { label: 'Semester',   value: STUDENT.semester   },
        ]}
      />

      <InfoSection
        title="Personal Info"
        rows={[
          { label: 'Gender',        value: STUDENT.gender },
          { label: 'Date of Birth', value: STUDENT.dob    },
          { label: 'Email',         value: STUDENT.email, highlight: true },
          { label: 'Phone',         value: STUDENT.phone  },
        ]}
      />

      <InfoSection
        title="Guardian"
        rows={[
          { label: 'Name',     value: STUDENT.guardian.name     },
          { label: 'Relation', value: STUDENT.guardian.relation },
          { label: 'Phone',    value: STUDENT.guardian.phone    },
        ]}
      />

      {/* ── Logout Button ── */}
      <LinearGradient
        colors={COLORS.gradientRed}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.logoutBtn}
      >
        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.85}
          style={styles.logoutTouchable}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  heroGradient: { paddingBottom: 40, position: 'relative', overflow: 'hidden' },
  heroCircle: {
    position: 'absolute', top: -20, right: -10,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  // Rounded white arc at hero bottom
  heroCurve: {
    position: 'absolute', bottom: -30, left: 0, right: 0,
    height: 60, backgroundColor: COLORS.bg, borderRadius: 30,
  },

  avatarWrap: { alignItems: 'center', marginTop: 12, marginBottom: 10 },
  profAvatar: {
    width: 64, height: 64, borderRadius: 32,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  profAvatarText: { color: '#fff', fontSize: 22, fontWeight: FONT.bold },
  profName:  { color: '#fff', fontSize: 18, fontWeight: FONT.bold, textAlign: 'center', marginBottom: 2 },
  profEmail: { color: 'rgba(255,255,255,0.7)', fontSize: 11, textAlign: 'center', marginBottom: 10 },
  profTags:  { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  profTag:   {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 4, paddingHorizontal: 10, borderRadius: RADIUS.full,
  },
  profTagText: { color: '#fff', fontSize: 10, fontWeight: FONT.medium },

  statGrid: {
    flexDirection: 'row', gap: 10,
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8,
  },
  statCard: {
    flex: 1, backgroundColor: COLORS.card,
    borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  statNum: { fontSize: 24, fontWeight: FONT.bold },
  statLbl: { fontSize: 10, color: COLORS.textTertiary, fontWeight: FONT.medium, marginTop: 2 },

  infoSection: {
    marginHorizontal: 16, marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  infoSectionTitle: {
    fontSize: 11, fontWeight: FONT.bold, color: COLORS.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  infoLabel: { fontSize: 12, color: COLORS.textTertiary, fontWeight: FONT.medium },
  infoVal:   { fontSize: 12, color: COLORS.textPrimary, fontWeight: FONT.medium, textAlign: 'right' },

  logoutBtn: {
    marginHorizontal: 16, marginBottom: 16,
    borderRadius: 14, overflow: 'hidden',
  },
  logoutTouchable: { paddingVertical: 12, alignItems: 'center' },
  logoutText: { fontSize: 13, fontWeight: FONT.bold, color: '#fff' },
});
