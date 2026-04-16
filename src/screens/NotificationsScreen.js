// ─── NOTIFICATIONS SCREEN ─────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { COLORS, RADIUS, FONT } from '../theme/theme';
import { StatusBarRow } from '../components/SharedComponents';
import { NOTIFICATIONS } from '../data/mockData';

// Map iconBg key → colour
const ICON_BG = {
  red:    COLORS.red2,
  green:  COLORS.green2,
  purple: COLORS.primary3,
  orange: COLORS.orange2,
  blue:   COLORS.blue2,
};

// ── Notification Card ─────────────────────────────────────────────────────────
const NotifCard = ({ item }) => (
  <View style={[styles.notifCard, item.unread && styles.notifCardUnread]}>
    {/* Unread indicator dot on left edge */}
    {item.unread && <View style={styles.unreadDot} />}

    <View style={[styles.notifIcon, { backgroundColor: ICON_BG[item.iconBg] || COLORS.primary3 }]}>
      <Text style={{ fontSize: 16 }}>{item.icon}</Text>
    </View>

    <View style={styles.notifBody}>
      <Text style={styles.notifTitle}>{item.title}</Text>
      <Text style={styles.notifMsg}>{item.msg}</Text>
      <Text style={styles.notifTime}>{item.time}</Text>
    </View>
  </View>
);

// ── Group Header ──────────────────────────────────────────────────────────────
const GroupHeader = ({ label }) => (
  <Text style={styles.groupHeader}>{label}</Text>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  // Build list items interleaving group headers
  const listData = [];
  let lastGroup = null;
  notifications.forEach((n) => {
    if (n.group !== lastGroup) {
      listData.push({ type: 'header', id: `h-${n.group}`, label: n.group });
      lastGroup = n.group;
    }
    listData.push({ type: 'notif', ...n });
  });

  return (
    <View style={styles.screen}>
      {/* <StatusBarRow /> */}

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead} activeOpacity={0.7}>
          <Text style={styles.markRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.type === 'header'
            ? <GroupHeader label={item.label} />
            : <NotifCard item={item} />
        }
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
  markRead:  { fontSize: 11, color: COLORS.primary, fontWeight: FONT.semiBold },

  groupHeader: {
    fontSize: 11, fontWeight: FONT.semiBold,
    color: COLORS.textTertiary,
    textTransform: 'uppercase', letterSpacing: 0.5,
    paddingHorizontal: 16, paddingVertical: 6,
  },

  notifCard: {
    marginHorizontal: 16, marginBottom: 8,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg, padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
    flexDirection: 'row', gap: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4,
    elevation: 1,
  },
  notifCardUnread: {
    backgroundColor: '#FAFBFF',
    borderColor: '#DDE0F5',
  },
  // The purple dot sits on the left edge, slightly outside the card
  unreadDot: {
    position: 'absolute', top: 16, left: -4,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderWidth: 2, borderColor: COLORS.bg,
    zIndex: 1,
  },
  notifIcon: {
    width: 36, height: 36, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  notifBody: { flex: 1 },
  notifTitle: { fontSize: 12, fontWeight: FONT.semiBold, color: COLORS.textPrimary, marginBottom: 2 },
  notifMsg:   { fontSize: 11, color: COLORS.textSecondary, lineHeight: 15.4, marginBottom: 4 },
  notifTime:  { fontSize: 10, color: COLORS.textTertiary },
});
