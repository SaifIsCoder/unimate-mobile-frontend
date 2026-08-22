// API Configuration
// IMPORTANT: For physical Android device, you need to use your computer's IP address
// Find your IP: Run 'ipconfig' in terminal and look for IPv4 Address (usually 192.168.x.x)
// Then change EXPO_PUBLIC_API_BASE_URL in .env to: http://YOUR_IP:3000

import { Platform } from "react-native";

// For Android emulator: http://10.0.2.2:3000
// For iOS simulator: http://localhost:3000
// For physical device: http://YOUR_COMPUTER_IP:3000 (e.g., http://192.168.1.100:3000)

// Get API URL from environment variable or use defaults
// Set EXPO_PUBLIC_API_BASE_URL in .env file
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  (Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://localhost:5000");

const API_VERSION = "v1";

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/${API_VERSION}/auth/login`,
    REFRESH: `${API_BASE_URL}/api/${API_VERSION}/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/api/${API_VERSION}/auth/logout`,
  },
  USERS: {
    ME: `${API_BASE_URL}/api/${API_VERSION}/users/me`,
  },
  COURSES: {
    ROOT: `${API_BASE_URL}/api/${API_VERSION}/courses`,
  },
  OFFERINGS: {
    ROOT: `${API_BASE_URL}/api/${API_VERSION}/offerings`,
  },
  ENROLLMENTS: {
    MY: `${API_BASE_URL}/api/${API_VERSION}/enrollments/my`,
    ROOT: `${API_BASE_URL}/api/${API_VERSION}/enrollments`,
  },
  SCHEDULES: {
    MY: `${API_BASE_URL}/api/${API_VERSION}/schedules`,
    MY_TODAY: `${API_BASE_URL}/api/${API_VERSION}/schedules/my/today`,
  },
  ASSIGNMENTS: {
    ROOT: `${API_BASE_URL}/api/${API_VERSION}/assignments`,
    MY: `${API_BASE_URL}/api/${API_VERSION}/assignments/my`,
    MY_SUBMISSIONS: `${API_BASE_URL}/api/${API_VERSION}/assignments/my/submissions`,
    BY_ID: (id) => `${API_BASE_URL}/api/${API_VERSION}/assignments/${id}`,
    SUBMIT: (id) => `${API_BASE_URL}/api/${API_VERSION}/assignments/${id}/submit`,
  },
  EVENTS: {
    ROOT: `${API_BASE_URL}/api/${API_VERSION}/events`,
    UPCOMING: `${API_BASE_URL}/api/${API_VERSION}/events/upcoming`,
    BY_ID: (id) => `${API_BASE_URL}/api/${API_VERSION}/events/${id}`,
  },
  ANNOUNCEMENTS: {
    ROOT: `${API_BASE_URL}/api/${API_VERSION}/announcements`,
    BY_ID: (id) => `${API_BASE_URL}/api/${API_VERSION}/announcements/${id}`,
    READ: (id) => `${API_BASE_URL}/api/${API_VERSION}/announcements/${id}/read`,
  },
  ATTENDANCE: {
    MY: `${API_BASE_URL}/api/${API_VERSION}/attendance/my`,
  },
  GRADES: {
    MY: `${API_BASE_URL}/api/${API_VERSION}/grades/my`,
    MY_SUMMARY: `${API_BASE_URL}/api/${API_VERSION}/grades/my/summary`,
    MY_ALL_SEMESTERS: `${API_BASE_URL}/api/${API_VERSION}/grades/my/all-semesters`,
  },
  COMMUNITY: {
    ROOT: `${API_BASE_URL}/api/${API_VERSION}/community/posts`,
    LIKE: (id) => `${API_BASE_URL}/api/${API_VERSION}/community/posts/${id}/like`,
    COMMENTS: (id) => `${API_BASE_URL}/api/${API_VERSION}/community/posts/${id}/comments`,
  },
  NOTIFICATIONS: {
    MY: `${API_BASE_URL}/api/${API_VERSION}/notifications/my`,
    READ: (id) => `${API_BASE_URL}/api/${API_VERSION}/notifications/${id}/read`,
  },
  AI: {
    BRIEF: (topic) => `${API_BASE_URL}/api/${API_VERSION}/ai/brief?topic=${topic}`,
  },
  UPLOADS: {
    ROOT: `${API_BASE_URL}/api/${API_VERSION}/uploads`,
  }
};

export default API_ENDPOINTS;
