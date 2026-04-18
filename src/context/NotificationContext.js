// ─── NOTIFICATION CONTEXT ─────────────────────────────────────────────────────
// Centralized notification state. Every module calls createNotification() here.
// UI reads from context — never depends on FCM to function.

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  safeType,
  safePriority,
  safeScope,
  safeEntityType,
  PRIORITY_ORDER,
} from '../constants/notificationConstants';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

const NotificationContext = createContext();

// ── ID Generator ─────────────────────────────────────────────────────────────
const generateId = () =>
  `notif-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

// ── Build Notification Object ────────────────────────────────────────────────
// Validates and normalises all fields. Unknown values get safe fallbacks.
const buildNotification = (payload) => ({
  id: generateId(),
  title: payload.title || 'Notification',
  body: payload.body || '',
  type: safeType(payload.type),
  scope: safeScope(payload.scope),
  priority: safePriority(payload.priority),
  entityType: safeEntityType(payload.entityType),
  entityId: payload.entityId || '',
  isRead: false,
  isNew: true,
  createdAt: new Date().toISOString(),
});

// ── Provider ─────────────────────────────────────────────────────────────────
export function NotificationProvider({ children }) {
  // Seed with mock data for development
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // ── Computed values ────────────────────────────────────────────────────────
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const hasNew = useMemo(
    () => notifications.some((n) => n.isNew),
    [notifications]
  );

  // ── Create Notification ────────────────────────────────────────────────────
  // This is the SINGLE entry point. All modules call this.
  const createNotification = useCallback((payload) => {
    const notification = buildNotification(payload);

    setNotifications((prev) => [notification, ...prev]);

    // 🔥 FCM HOOK — uncomment when backend is ready
    // sendPushNotification({
    //   token: userFCMToken,
    //   title: notification.title,
    //   body: notification.body,
    //   data: {
    //     entityType: notification.entityType,
    //     entityId: notification.entityId,
    //     priority: notification.priority,
    //   },
    // });

    return notification;
  }, []);

  // ── Mark single notification as read ───────────────────────────────────────
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  // ── Mark all as read ───────────────────────────────────────────────────────
  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  // ── Mark all as seen (clear isNew — called when Notifications screen opens)
  const markAllSeen = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false })));
  }, []);

  // ── Query: notifications for a specific entity ────────────────────────────
  const getByEntity = useCallback(
    (entityType, entityId) =>
      notifications.filter(
        (n) => n.entityType === entityType && n.entityId === entityId
      ),
    [notifications]
  );

  // ── Query: has unread notifications for entity (for dot indicators) ────────
  const hasUnreadForEntity = useCallback(
    (entityType, entityId) =>
      notifications.some(
        (n) =>
          n.entityType === entityType &&
          n.entityId === entityId &&
          !n.isRead
      ),
    [notifications]
  );

  // ── Sorted notifications (by priority order, then by date desc) ────────────
  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      const priorityDiff =
        (PRIORITY_ORDER[a.priority] ?? 99) - (PRIORITY_ORDER[b.priority] ?? 99);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [notifications]);

  // ── Context value ──────────────────────────────────────────────────────────
  const value = useMemo(
    () => ({
      notifications: sortedNotifications,
      unreadCount,
      hasNew,
      createNotification,
      markAsRead,
      markAllRead,
      markAllSeen,
      getByEntity,
      hasUnreadForEntity,
    }),
    [
      sortedNotifications,
      unreadCount,
      hasNew,
      createNotification,
      markAsRead,
      markAllRead,
      markAllSeen,
      getByEntity,
      hasUnreadForEntity,
    ]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return ctx;
}
