// ─── NOTIFICATION BELL ────────────────────────────────────────────────────────
// Reusable bell icon with unread count badge.
// Reads state from NotificationContext — replaces duplicated bell code in screens.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT } from '../theme/theme';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationBell() {
  const navigation = useNavigation();
  const { unreadCount, hasNew } = useNotifications();

  return (
    <TouchableOpacity
      style={styles.bellBtn}
      onPress={() => navigation.navigate('Notifications')}
      activeOpacity={0.7}
    >
      <Feather name="bell" size={16} color={COLORS.textSecondary} />

      {/* Unread count badge */}
      {unreadCount > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </Text>
        </View>
      )}

      {/* New indicator dot (shows even if count badge is hidden) */}
      {hasNew && unreadCount === 0 && <View style={styles.dot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  countBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF4757',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: COLORS.bg,
  },

  countText: {
    fontSize: 8,
    fontWeight: FONT.bold,
    color: '#fff',
  },

  dot: {
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
});
