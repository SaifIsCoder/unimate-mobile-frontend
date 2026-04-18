// ─── NOTIFICATIONS SCREEN ─────────────────────────────────────────────────────
// Displays all notifications grouped by priority.
// Reads from NotificationContext — CRITICAL → HIGH → MEDIUM → LOW.

import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { COLORS, RADIUS, FONT } from '../theme/theme';
import { Avatar } from '../components/SharedComponents';
import { useNotifications } from '../context/NotificationContext';
import {
  PRIORITY_CONFIG,
  ENTITY_ICON_MAP,
  NOTIFICATION_PRIORITIES,
} from '../constants/notificationConstants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// ── Relative time helper ─────────────────────────────────────────────────────
const getRelativeTime = (dateString) => {
  try {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
};

// ── Priority Section Header ──────────────────────────────────────────────────
const PriorityHeader = ({ priority }) => {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.MEDIUM;

  return (
    <View style={styles.priorityHeader}>
      <Text style={styles.priorityIcon}>{config.icon}</Text>
      <Text style={[styles.priorityLabel, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
};

// ── Notification Card ────────────────────────────────────────────────────────
const NotifCard = ({ item, onPress }) => {
  const config = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.MEDIUM;
  const entityIcon = ENTITY_ICON_MAP[item.entityType] || '📣';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.notifCard,
        !item.isRead && styles.notifCardUnread,
        {backgroundColor: item.isRead ? COLORS.card : config.bgColor },
      ]}
    >
      {/* Unread indicator dot on left edge */}
      {!item.isRead && (
        <View style={[styles.unreadDot, { backgroundColor: config.color }]} />
      )}

      {/* Entity icon */}
      <View
        style={[
          styles.notifIcon,
          {
            backgroundColor:
              item.priority === 'CRITICAL'
                ? '#FFE5E5'
                : item.priority === 'HIGH'
                ? '#FFF0E0'
                : item.priority === 'MEDIUM'
                ? '#EEF0FF'
                : '#F0F1F5',
          },
        ]}
      >
        <Text style={{ fontSize: 18 }}>{entityIcon}</Text>
      </View>

      {/* Content */}
      <View style={styles.notifBody}>
        <View style={styles.notifTitleRow}>
          <Text
            style={[
              styles.notifTitle,
              !item.isRead && { fontWeight: FONT.bold },
            ]}
            numberOfLines={1}
          >
            {item.title || 'Notification'}
          </Text>
          <Text style={styles.notifTime}>
            {getRelativeTime(item.createdAt)}
          </Text>
        </View>

        <Text style={styles.notifMsg} numberOfLines={2}>
          {item.body || ''}
        </Text>

        {/* Priority tag for CRITICAL / HIGH */}
        {(item.priority === 'CRITICAL' || item.priority === 'HIGH') && (
          <View
            style={[
              styles.priorityTag,
              { backgroundColor: config.color + '18' },
            ]}
          >
            <Text style={[styles.priorityTagText, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyIcon}>🔔</Text>
    <Text style={styles.emptyTitle}>No Notifications</Text>
    <Text style={styles.emptySub}>
      You're all caught up! We'll notify you when something new arrives.
    </Text>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function NotificationsScreen({ navigation }) {
  const {
    notifications,
    unreadCount,
    markAllRead,
    markAllSeen,
    markAsRead,
  } = useNotifications();
  const insets = useSafeAreaInsets();

  // Mark all as seen (clears isNew dot on bell) when screen opens
  useEffect(() => {
    markAllSeen();
  }, [markAllSeen]);

  // Build grouped list data: insert section headers before each priority group
  const listData = useMemo(() => {
    if (!notifications.length) return [];

    const result = [];
    let lastPriority = null;

    notifications.forEach((n) => {
      const priority = n.priority || 'MEDIUM';
      if (priority !== lastPriority) {
        result.push({
          type: 'header',
          id: `header-${priority}`,
          priority,
        });
        lastPriority = priority;
      }
      result.push({ type: 'notif', ...n });
    });

    return result;
  }, [notifications]);

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + 16, paddingBottom: 40 },
      ]}
    >
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Notifications</Text>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllRead} activeOpacity={0.7}>
              <Text style={styles.markRead}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headerRight}>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>
                {unreadCount} unread
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── List ── */}
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.type === 'header' ? (
            <PriorityHeader priority={item.priority} />
          ) : (
            <NotifCard
              item={item}
              onPress={() => markAsRead(item.id)}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          listData.length === 0
            ? { flex: 1, justifyContent: 'center' }
            : { paddingBottom: 16 }
        }
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
}

// ── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, paddingVertical: 16 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  markRead: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: FONT.semiBold,
    marginTop: 2,
  },

  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  unreadBadge: {
    backgroundColor: COLORS.primary3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },

  unreadBadgeText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
    color: COLORS.primary,
  },

  // ── Priority section header ────────────────────────────────────────────────
  priorityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },

  priorityIcon: { fontSize: 10 },

  priorityLabel: {
    fontSize: 11,
    fontWeight: FONT.semiBold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Notification card ──────────────────────────────────────────────────────
  notifCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    flexDirection: 'row',
    gap: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  notifCardUnread: {
    borderColor: '#DDE0F5',
  },

  unreadDot: {
    position: 'absolute',
    top: 6,
    left: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    zIndex: 1,
  },

  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  notifBody: { flex: 1 },

  notifTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },

  notifTitle: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },

  notifMsg: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 15.4,
    marginBottom: 4,
  },

  notifTime: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },

  priorityTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: RADIUS.sm,
    marginTop: 2,
  },

  priorityTagText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
  },

  // ── Empty state ────────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },

  emptyIcon: { fontSize: 40, marginBottom: 12 },

  emptyTitle: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  emptySub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
