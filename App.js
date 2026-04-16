// ─── APP.JS — UniMate Student App ─────────────────────────────────────────────
// Entry point. Manages tab state and renders the active screen inside a
// SafeAreaView + BottomNav wrapper.
//
// Dependencies to install:
//   expo install expo-linear-gradient
//   npx expo install react-native-safe-area-context
//   npx expo install @expo/vector-icons   (bundled with Expo SDK, no extra install)

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from "./src/theme/theme"
import { BottomNav } from './src/components/SharedComponents';
import HomeScreen          from './src/screens/HomeScreen';
import ScheduleScreen      from './src/screens/ScheduleScreen';
import AssignmentsScreen   from './src/screens/AssignmentsScreen';
import GradesScreen        from './src/screens/GradesScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen       from './src/screens/ProfileScreen';

// Tab key → component map
const SCREENS = {
  Home:          HomeScreen,
  Schedule:      ScheduleScreen,
  Tasks:         AssignmentsScreen,
  Grades:        GradesScreen,
  Notifications: NotificationsScreen, // accessible via bell icon, not bottom nav
  Profile:       ProfileScreen,
};

// Bottom nav tabs (Notifications is NOT a bottom-nav tab; it's reached from Home)
const BOTTOM_TABS = ['Home', 'Schedule', 'Tasks', 'Grades', 'Profile'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  // Allow screens to push a "tab" (including Notifications) 
  const handleNavigate = (screenKey) => setActiveTab(screenKey);

  const ActiveScreen = SCREENS[activeTab] || HomeScreen;

  // Decide which bottom-nav item is "active".
  // If we're on Notifications (accessed from Home), keep Home highlighted.
  const bottomActiveTab = BOTTOM_TABS.includes(activeTab) ? activeTab : 'Home';

  return (
    // edges prop prevents SafeAreaView from adding top inset — we handle
    // the status-bar area manually inside each screen for design consistency.
    <SafeAreaView style={styles.root} edges={['bottom', 'left', 'right']}>
      <StatusBar style="dark" />

      {/* ── Active Screen ── */}
      <View style={styles.screenWrap}>
        <ActiveScreen onNavigate={handleNavigate} />
      </View>

      {/* ── Bottom Navigation ── */}
      <BottomNav
        activeTab={bottomActiveTab}
        onTabPress={(tab) => setActiveTab(tab)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  screenWrap: {
    flex: 1,
    // On Android we add a small top padding to clear the system status bar.
    // On iOS, the SafeAreaView + StatusBar handle this automatically.
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
});
