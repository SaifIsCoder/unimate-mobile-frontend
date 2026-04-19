// ─── UPDATES SCREEN (PARENT) ─────────────────────────────────────────────────
// Owns the header + tab switcher.
// Renders AnnouncementsTab or CommunityTab based on active tab.

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, RADIUS, FONT } from "../../theme/theme";
import NotificationBell from "../../components/NotificationBell";
import { Avatar } from "../../components/SharedComponents";
import AnnouncementsTab from "./AnnouncementsTab";
import CommunityTab from "./CommunityTab";

// ── TAB SWITCHER ─────────────────────────────────────────────
const TabSwitcher = ({ activeTab, onTabChange }) => (
  <View style={ts.wrap}>
    <TouchableOpacity
      style={[ts.tab, activeTab === "announcements" && ts.tabActive]}
      onPress={() => onTabChange("announcements")}
      activeOpacity={0.8}
    >
      <Text style={[ts.label, activeTab === "announcements" && ts.labelActive]}>
        Announcements
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[ts.tab, activeTab === "community" && ts.tabActive]}
      onPress={() => onTabChange("community")}
      activeOpacity={0.8}
    >
      <Text style={[ts.label, activeTab === "community" && ts.labelActive]}>
        Community
      </Text>
    </TouchableOpacity>
  </View>
);

const ts = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: COLORS.border + "55",
    borderRadius: 50,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 50,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textTertiary,
  },
  labelActive: {
    color: "#fff",
  },
});

// ── MAIN ─────────────────────────────────────────────────────
export default function UpdatesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("announcements");

  return (
    <View style={[s.screen, { paddingTop: insets.top + 16 }]}>

      {/* HEADER */}
      <View style={s.header}>
        <Text style={s.pageTitle}>Updates</Text>
        <View style={s.headerRight}>
          <NotificationBell />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TAB SWITCHER */}
      <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {/* TAB CONTENT */}
      {activeTab === "announcements"
        ? <AnnouncementsTab />
        : <CommunityTab navigation={navigation} />
      }
    </View>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
