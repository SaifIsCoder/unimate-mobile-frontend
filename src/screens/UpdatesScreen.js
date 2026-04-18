// ─── UPDATES SCREEN ──────────────────────────────────────────────────────────
// Announcements with type + scope filtering.

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, RADIUS, FONT } from '../theme/theme';
import { Avatar, FilterPill } from '../components/SharedComponents';
import NotificationBell from '../components/NotificationBell';
import { ANNOUNCEMENTS } from '../data/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ── TYPE CONFIG ─────────────────────────────────────────────
const TYPE_CONFIG = {
  important: { label: 'Important', color: COLORS.red },
  event: { label: 'Event', color: COLORS.primary },
  general: { label: 'Notice', color: COLORS.textSecondary },
};

// ── SCOPE CONFIG ────────────────────────────────────────────
const SCOPE_CONFIG = {
  class: { label: 'My Class', color: COLORS.blue },
  department: { label: 'Department', color: COLORS.green },
};

// ── FILTERS ─────────────────────────────────────────────────
const TYPE_FILTERS = ['All', 'important', 'event', 'general'];
const SCOPE_FILTERS = ['All', 'class', 'department'];

// ── CARD ────────────────────────────────────────────────────
const AnnouncementCard = ({ item }) => {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
  const scopeCfg = SCOPE_CONFIG[item.scope] || SCOPE_CONFIG.department;

  return (
    <View style={styles.card}>
      
      {/* IMAGE */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}

      {/* HEADER */}
      <View style={styles.cardHeader}>
        <View style={styles.badgeRow}>
          <Text style={[styles.badge, { color: cfg.color }]}>
            {cfg.label}
          </Text>
          <View style={[styles.scopeBadge, { backgroundColor: scopeCfg.color + '18' }]}>
            <Text style={[styles.scopeBadgeText, { color: scopeCfg.color }]}>
              {scopeCfg.label}
            </Text>
          </View>
        </View>

        <Text style={styles.date}>{item.date}</Text>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>{item.title}</Text>

      {/* MESSAGE */}
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );
};

// ── MAIN ────────────────────────────────────────────────────
export default function UpdatesScreen({ navigation }) {
  const [activeTypeFilter, setActiveTypeFilter] = useState('All');
  const [activeScopeFilter, setActiveScopeFilter] = useState('All');
  const insets = useSafeAreaInsets();

  const filteredData = useMemo(() => {
    return ANNOUNCEMENTS.filter((a) => {
      const typeMatch = activeTypeFilter === 'All' || a.type === activeTypeFilter;
      const scopeMatch = activeScopeFilter === 'All' || a.scope === activeScopeFilter;
      return typeMatch && scopeMatch;
    });
  }, [activeTypeFilter, activeScopeFilter]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16, paddingBottom: 40 }]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Updates</Text>
        <View style={styles.headerRight}>
          <NotificationBell />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TYPE FILTER PILLS */}
      <View style={styles.filterBar}>
        {TYPE_FILTERS.map((f) => (
          <FilterPill
            key={`type-${f}`}
            label={f === 'All' ? 'All Types' : TYPE_CONFIG[f]?.label || f}
            active={activeTypeFilter === f}
            onPress={() => setActiveTypeFilter(f)}
          />
        ))}
      </View>

      {/* SCOPE FILTER PILLS */}
      <View style={styles.filterBar}>
        {SCOPE_FILTERS.map((f) => (
          <FilterPill
            key={`scope-${f}`}
            label={f === 'All' ? 'All Scopes' : SCOPE_CONFIG[f]?.label || f}
            active={activeScopeFilter === f}
            onPress={() => setActiveScopeFilter(f)}
          />
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filteredData.length === 0
            ? { flex: 1, justifyContent: 'center', alignItems: 'center' }
            : { paddingBottom: 16 }
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No Announcements</Text>
            <Text style={styles.emptySub}>
              No announcements match your filters.
            </Text>
          </View>
        }
      />
    </View>
  );
}

// ── STYLES ──────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 16,
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

  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 6,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  image: {
    width: '100%',
    height: 140,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 4,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  badge: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
  },

  scopeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },

  scopeBadgeText: {
    fontSize: 9,
    fontWeight: FONT.semiBold,
  },

  date: {
    fontSize: 10,
    color: COLORS.textTertiary,
  },

  title: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: 12,
    marginBottom: 4,
  },

  message: {
    fontSize: 11,
    color: COLORS.textSecondary,
    paddingHorizontal: 12,
    paddingBottom: 12,
    lineHeight: 16,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyIcon: { fontSize: 36, marginBottom: 10 },

  emptyTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  emptySub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});