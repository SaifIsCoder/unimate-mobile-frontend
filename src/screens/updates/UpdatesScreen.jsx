// ─── UPDATES SCREEN (PARENT) ─────────────────────────────────────────────────
// Owns the header + tab switcher.
// Renders AnnouncementsTab or CommunityTab based on the active tab.

import React, { useState } from "react";
import { ScreenScaffold } from "../../components/layout";
import { SegmentedTabs } from "../../components/ui";
import AnnouncementsTab from "./AnnouncementsTab";
import CommunityTab from "./CommunityTab";

const TABS = [
  { key: "announcements", label: "Announcements" },
  { key: "community", label: "Community" },
];

export default function UpdatesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("announcements");

  return (
    <ScreenScaffold headerTitle="Updates">
      <SegmentedTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "announcements" ? (
        <AnnouncementsTab />
      ) : (
        <CommunityTab navigation={navigation} />
      )}
    </ScreenScaffold>
  );
}
