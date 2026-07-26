// ─── NOTIFICATIONS SCREEN ─────────────────────────────────────────────────────
// Displays all notifications grouped by priority.
// Reads from NotificationContext — CRITICAL → HIGH → MEDIUM → LOW.

import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { COLORS, FONT } from '../theme';
import { Avatar } from '../components/ui';
import { styles } from './NotificationsScreen.styles';
import { getRelativeTime } from '../utils/format';
import { useNotifications } from '../context/NotificationContext';
import {
  PRIORITY_CONFIG,
  ENTITY_ICON_MAP,
  NOTIFICATION_PRIORITIES,
} from '../constants/notificationConstants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// ── Priority Section Header ──────────────────────────────────────────────────
const PriorityHeader = ({ priority }) => {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.MEDIUM;

  return (
    <View style={styles.priorityHeader}>
      <MaterialIcons name={config.icon} size={14} color={config.color} />
      <Text style={[styles.priorityLabel, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
};

// ── Notification Card ────────────────────────────────────────────────────────
const NotifCard = React.memo(({ item, onPress }) => {
  const config = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.MEDIUM;
  const entityIcon = ENTITY_ICON_MAP[item.entityType] || 'campaign';

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
        <MaterialIcons name={entityIcon} size={18} color={config.color} />
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
});

// ── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <View style={styles.emptyState}>
    <MaterialIcons name="notifications-off" size={40} color={COLORS.textTertiary} />
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
        keyExtractor={(item) => String(item.id)}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={9}
        removeClippedSubviews
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
