// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
// StatusBar, BottomNav, Avatar, SectionTitle, FilterPill

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, FONT } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';

// ── StatusBar Row (fake system status bar) ────────────────────────────────────
export const StatusBarRow = ({ dark = false }) => (
  <View style={styles.statusBar}>
    <Text style={[styles.statusText, dark && { color: '#fff' }]}>9:41</Text>
    <Text style={[styles.statusText, dark && { color: '#fff' }]}>●●● 100%</Text>
  </View>
);

// ── Avatar ────────────────────────────────────────────────────────────────────
export const Avatar = ({ label = 'S', size = 36 }) => (
  <View
    style={[
      styles.avatar,
      { width: size, height: size, borderRadius: size / 2 },
    ]}
  >
    <Text style={[styles.avatarText, { fontSize: size * 0.38 }]}>{label}</Text>
    {/* Red notification dot */}
    <View style={styles.notifDot} />
  </View>
);

// ── Section Title ─────────────────────────────────────────────────────────────
export const SectionTitle = ({ children, style }) => (
  <Text style={[styles.sectionTitle, style]}>{children}</Text>
);

// ── Filter Pill ───────────────────────────────────────────────────────────────
export const FilterPill = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterPill, active && styles.filterPillActive]}
    activeOpacity={0.7}
  >
    <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ── Bottom Navigation ─────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'Home', label: 'Home', icon: 'home-filled' },
  { key: 'Schedule', label: 'Schedule', icon: 'calendar-month' },
  { key: 'Tasks', label: 'Tasks', icon: 'task-alt' },
  { key: 'Grades', label: 'Grades', icon: 'query-stats' },
  { key: 'Profile', label: 'Profile', icon: 'person-outline' },
];

export const BottomNav = ({ activeTab, onTabPress }) => (
  <View style={styles.bottomNav}>
    {NAV_ITEMS.map((item) => {
      const isActive = activeTab === item.key;
      return (
        <TouchableOpacity
          key={item.key}
          style={styles.navItem}
          onPress={() => onTabPress(item.key)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={item.icon}
            size={20}
            color={isActive ? COLORS.primary : COLORS.textTertiary}
          />
          <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export const AIBriefCard = ({ data }) => {
  const summary = typeof data === 'string' ? data : data?.summary;
  const tags = Array.isArray(data?.tags) ? data.tags : [];

  return (
    <View style={briefStyles.wrapper}>
      <LinearGradient
        colors={COLORS.gradientPurple}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={briefStyles.card}
      >
        <View style={briefStyles.glowCircle} />

        <View style={briefStyles.headerRow}>
          <View style={briefStyles.iconWrap}>
            <MaterialIcons name="psychology" size={14} color="#FFFFFF" />
          </View>
          <Text style={briefStyles.label}>AI INSIGHT · TODAY</Text>
        </View>

        <Text style={briefStyles.body}>{summary}</Text>

        {tags.length > 0 && (
          <View style={briefStyles.tagsRow}>
            {tags.map((tag) => (
              <View key={tag} style={briefStyles.tag}>
                <View style={briefStyles.tagContent}>
                  <MaterialIcons name="auto-awesome" size={10} color="#FFFFFF" />
                  <Text style={briefStyles.tagText}>{tag}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </LinearGradient>
    </View>
  );
};





// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
  },
  avatar: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#fff',
    fontWeight: FONT.bold,
  },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4757',
    borderWidth: 1.5,
    borderColor: COLORS.bg,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  filterPill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginRight: 6,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: FONT.medium,
    color: COLORS.textSecondary,
  },
  filterPillTextActive: {
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10, // extra padding for iOS home indicator
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    // Android elevation
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.md,
  },
  navLabel: {
    fontSize: 9,
    fontWeight: FONT.medium,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: FONT.semiBold,
  },
});

const briefStyles = StyleSheet.create({
  wrapper: {

    borderRadius: 18,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: 18,
    padding: 16,
    overflow: "hidden",
  },
  glowCircle: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    top: -40,
    right: -40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  iconWrap: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  body: {
    fontSize: 13,
    fontWeight: "500",
    color: "#FFFFFF",
    lineHeight: 20,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
  },
  tag: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  tagContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
