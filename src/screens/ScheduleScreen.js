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
import { Avatar } from '../components/SharedComponents';
import { CLASSES, WEEK_DAYS } from '../data/mockData';
import Entypo from '@expo/vector-icons/Entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";
import Background from '../components/Background';

// ── Day Chip ─────────────────────────────────────────────────────────────
const DayChip = ({ day, active, onPress }) => (
  <TouchableOpacity
    style={[styles.dayChip, active && styles.dayChipActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.dayName, active && styles.dayTextActive]}>
      {day.name}
    </Text>
    <Text style={[styles.dayNum, active && styles.dayTextActive]}>
      {day.num}
    </Text>
  </TouchableOpacity>
);

// ── Class Card ───────────────────────────────────────────────────────────
const ClassCard = ({ item, index }) => {
  const accentColor = ACCENT[item.accent] || ACCENT.purple;

  const status =
    index === 0 ? 'now' : index === 1 ? 'next' : null;

  return (
    <View
      style={[
        styles.classCard,
        { borderLeftColor: accentColor.border },
        status === 'now' && styles.nowCard,
      ]}
    >
      {status && (
        <Text style={styles.statusBadge}>
          {status === 'now' ? 'Now' : 'Next'}
        </Text>
      )}

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

// ── MAIN SCREEN ──────────────────────────────────────────────────────────
export default function ScheduleScreen({ navigation }) {
  const [selectedDay, setSelectedDay] = useState(3);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16, paddingBottom: 40 }]}>
<Background />
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Schedule</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.bellBtn}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Feather name="bell" size={16} color={COLORS.textSecondary} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.monthNavContainer}>

        {/* ── Month Navigation ── */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.monthBtn}>
            <Entypo name="chevron-left" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.monthLabel}>April 2026</Text>

          <TouchableOpacity style={styles.monthBtn}>
            <Entypo name="chevron-right" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── Week Strip ── */}
        <ScrollView
          // style={styles.weekStripContainer}
          horizontal
          style={{ height: 60, flexGrow: 0 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekStrip}
        >
          {WEEK_DAYS.map((day, i) => (
            <DayChip
              key={i}
              day={day}
              active={selectedDay === i}
              onPress={() => setSelectedDay(i)}
            />
          ))}
        </ScrollView>
      </View>
      {/* ── Date Heading ── */}
      <Text style={styles.dateHeading}>
        Thursday, April 16, 2026
      </Text>

      {/* ── Class List / Empty State ── */}
      {CLASSES.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No classes today</Text>
          <Text style={styles.emptySub}>
            You have time to relax or plan ahead
          </Text>
        </View>
      ) : (
        <FlatList
          data={CLASSES}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ClassCard item={item} index={index} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

// ── STYLES ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },

  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  bellDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4757",
    borderWidth: 1.5,
    borderColor: COLORS.bg,
  },

  monthNavContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    paddingTop: 10
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  monthLabel: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
  },

  monthBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  weekStrip: {
    paddingHorizontal: 16,
    gap: 6,
  },

  dayChip: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    minWidth: 42,
    height: 45,
  },

  dayChipActive: {
    backgroundColor: COLORS.primary,
  },

  dayName: {
    fontSize: 9,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },

  dayNum: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textSecondary,
  },

  dayTextActive: {
    color: '#fff',
  },

  dateHeading: {
    fontSize: 12,
    color: COLORS.textSecondary,
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontWeight: FONT.medium,
  },

  classCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    elevation: 2,
  },

  nowCard: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },

  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    fontSize: 10,
    fontWeight: FONT.bold,
    color: COLORS.primary,
  },

  classTime: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 4,
  },

  className: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },

  classCode: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: 8,
  },

  classMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  classMetaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  emptySub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});