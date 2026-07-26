// ─── ROUTE NAMES ──────────────────────────────────────────────────────────────
// Centralized navigation route names. Values are byte-identical to the previously
// hardcoded strings so existing navigation.navigate(...) calls keep working.

export const ROUTES = {
  // Root / auth
  LOGIN: 'Login',
  SET_PASSWORD: 'SetPassword',
  MAIN_TABS: 'MainTabs',

  // Tab container
  TABS: 'Tabs',

  // Bottom tabs
  HOME: 'Home',
  SCHEDULE: 'Schedule',
  UPDATES: 'Updates',
  TASKS: 'Tasks',
  GRADES: 'Grades',

  // Stack screens (reachable from tabs, hidden from the tab bar)
  NOTIFICATIONS: 'Notifications',
  PROFILE: 'Profile',
  CREATE_COMMUNITY_POST: 'CreateCommunityPost',
  SET_GPA_GOAL: 'SetGPAGoal',
  ALL_SEMESTERS: 'AllSemestersScreen',
  EVENTS: 'Events',
  ATTENDANCE: 'Attendance',
};

export default ROUTES;
