import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import API_ENDPOINTS from '../config/api';
import { apiRequest } from './apiClient';

const buildQuery = (params) => {
  if (!params) return "";
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });
  const str = query.toString();
  return str ? `?${str}` : "";
};

export const getMyNotifications = async (params = { page: 1, limit: 50 }) => {
  const res = await apiRequest(API_ENDPOINTS.NOTIFICATIONS.MY + buildQuery(params));
  return Array.isArray(res?.data) ? res.data : [];
};

export const markNotificationRead = (id) =>
  apiRequest(API_ENDPOINTS.NOTIFICATIONS.READ(id), { method: "PATCH" });

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Request notification permissions
 */
export const requestPermissions = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Notification permissions not granted');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
};

/**
 * Schedule a notification
 */
export const scheduleNotification = async (title, body, data = {}) => {
  try {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      console.log('Notification permissions not granted');
      return null;
    }

    // For Android, we need to create a channel
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
        sound: true,
      },
      trigger: null, // null means show immediately
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

/**
 * Schedule a notification after a delay (in seconds)
 */
export const scheduleDelayedNotification = async (title, body, seconds, data = {}) => {
  try {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      console.log('Notification permissions not granted');
      return null;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
        sound: true,
      },
      trigger: {
        seconds: seconds,
      },
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling delayed notification:', error);
    return null;
  }
};

/**
 * Cancel a scheduled notification
 */
export const cancelNotification = async (notificationId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};

/**
 * Cancel all scheduled notifications
 */
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
};

/**
 * Get all scheduled notifications
 */
export const getAllScheduledNotifications = async () => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
};

