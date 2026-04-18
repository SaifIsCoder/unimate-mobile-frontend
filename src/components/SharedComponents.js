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
import { Feather } from '@expo/vector-icons';
import { COLORS, RADIUS, FONT } from '../theme/theme';

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
  { key: 'Home',     label: 'Home',     icon: 'home'       },
  { key: 'Schedule', label: 'Schedule', icon: 'calendar'   },
  { key: 'Tasks',    label: 'Tasks',    icon: 'file-text'  },
  { key: 'Grades',   label: 'Grades',   icon: 'activity'   },
  { key: 'Profile',  label: 'Profile',  icon: 'user'       },
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
          <Feather
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
    fontSize: 13,
    fontWeight: FONT.semiBold,
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
