// ─── STRINGS ──────────────────────────────────────────────────────────────────
// Centralized user-facing copy. Keeps text out of components and makes future
// i18n a single-file change. Group keys by screen / feature.

export const STRINGS = {
  screenTitles: {
    home: 'Home',
    schedule: 'Schedule',
    updates: 'Updates',
    tasks: 'Tasks',
    grades: 'Grades',
    attendance: 'Attendance',
    events: 'Events',
    notifications: 'Notifications',
    setGpaGoal: 'Set Your Goal',
  },

  updates: {
    tabAnnouncements: 'Announcements',
    tabCommunity: 'Community',
  },

  emptyStates: {
    noAnnouncements: 'No Announcements',
    noAnnouncementsSub: 'No announcements match your filters.',
    noEvents: 'No events found',
    noEventsSub: 'Try changing your filters',
    noSubjects: 'No subjects found',
    noSubjectsSub: 'Try changing your filter',
    noClasses: 'No classes today',
    noClassesSub: 'You have time to relax or plan ahead',
    noNotifications: 'No Notifications',
    noNotificationsSub:
      "You're all caught up! We'll notify you when something new arrives.",
    noAchievements: 'No achievements yet',
    noAchievementsSub: 'Be the first to share a win with your department.',
  },

  auth: {
    signIn: 'Sign In',
    signingIn: 'Signing In...',
    welcomeBack: 'Welcome Back, Scholar!',
    forgotPassword: 'Forgot Password?',
    keepSignedIn: 'Keep me signed in',
    emailPasswordRequired: 'Email and password are required.',
    invalidCredentials: 'Invalid credentials.',
  },

  common: {
    seeAll: 'See all →',
    viewAll: 'View All',
    logout: 'Logout',
    cancel: 'Cancel',
    post: 'Post',
    close: 'Close',
  },
};

export default STRINGS;
