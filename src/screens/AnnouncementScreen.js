import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { COLORS, RADIUS, FONT } from '../theme/theme';
import { Avatar, FilterPill } from '../components/SharedComponents';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ── DATA ────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  {
    id: '1',
    type: 'important',
    title: 'New Attendance Policy',
    message: 'Minimum 75% attendance required.',
    date: 'Today',
  },
  {
    id: '2',
    type: 'event',
    title: 'React Workshop',
    message: 'Friday at 2 PM in Lab 3.',
    date: 'Tomorrow',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  },
  {
    id: '3',
    type: 'general',
    title: 'Library Timing Updated',
    message: 'Now open till 10 PM.',
    date: '2 days ago',
  },
];

// ── FILTERS ─────────────────────────────────────────────
const FILTERS = ['All', 'important', 'event', 'general'];

// ── TYPE CONFIG ─────────────────────────────────────────
const TYPE_CONFIG = {
  important: { label: 'Important', color: COLORS.red },
  event: { label: 'Event', color: COLORS.primary },
  general: { label: 'Notice', color: COLORS.textSecondary },
};

// ── CARD ────────────────────────────────────────────────
const AnnouncementCard = ({ item }) => {
  const cfg = TYPE_CONFIG[item.type];

  return (
    <View style={styles.card}>
      
      {/* IMAGE */}
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}

      {/* HEADER */}
      <View style={styles.cardHeader}>
        <Text style={[styles.badge, { color: cfg.color }]}>
          {cfg.label}
        </Text>

        <Text style={styles.date}>{item.date}</Text>
      </View>

      {/* TITLE */}
      <Text style={styles.title}>{item.title}</Text>

      {/* MESSAGE */}
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );
};

// ── MAIN ────────────────────────────────────────────────
export default function AnnouncementScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const insets = useSafeAreaInsets();

  const filteredData =
    activeFilter === 'All'
      ? ANNOUNCEMENTS
      : ANNOUNCEMENTS.filter((a) => a.type === activeFilter);

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 16, paddingBottom: 40 }]}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Announcements</Text>
        <Avatar label="S" size={36} />
      </View>

      {/* FILTER PILLS */}
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

      {/* LIST */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

// ── STYLES ──────────────────────────────────────────────
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

  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 8,
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
    padding: 12,
    paddingBottom: 4,
  },

  badge: {
    fontSize: 10,
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
  },
});