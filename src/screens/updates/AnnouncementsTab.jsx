// ─── ANNOUNCEMENTS TAB ───────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../theme";
import { FilterPill, AIBriefCard } from "../../components/ui";
import { useAIBrief } from "../../hooks/useAIBrief";
import { s } from "./AnnouncementsTab.styles";
const TYPE_CONFIG = {
  important: {
    label: "Important",
    icon: "warning",
    color: COLORS.red || "#DC2626",
  },
  event: { label: "Event", icon: "celebration", color: COLORS.primary },
  general: { label: "Notice", icon: "campaign", color: COLORS.textSecondary },
};
const SCOPE_CONFIG = {
  class: { label: "My Class", color: COLORS.blue || "#2563EB" },
  department: { label: "Department", color: COLORS.green || "#059669" },
};
const TYPE_FILTERS = ["All", "important", "event", "general"];
const SCOPE_FILTERS = ["All", "class", "department"];

const ANNOUNCEMENTS = [
  {
    id: "a1",
    type: "important",
    scope: "department",
    title: "Final Exam Schedule Released",
    message: "The final exam schedule has been released. Check Now.",
    date: "30 mins ago",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "a2",
    type: "event",
    scope: "department",
    title: "Course Registration Opens Tomorrow",
    message:
      "Course registration for next semester starts tomorrow at 9:00 AM. Make sure to register early.",
    date: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "a3",
    type: "event",
    scope: "class",
    title: "Workshop: Machine Learning with Python",
    message:
      "Thursday at 2 PM, Room 20\nJoin us for a workshop on machine learning using Python. All students are welcome!",
    date: "1 day ago",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "a4",
    type: "general",
    scope: "department",
    title: "Library Timings Updated",
    message:
      "The library will remain open until 9 PM on weekdays starting this week.",
    date: "2 days ago",
  },
];

const AnnouncementCard = React.memo(({ item }) => {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
  const scopeCfg = SCOPE_CONFIG[item.scope] || SCOPE_CONFIG.department;
  return (
    <View style={s.card}>
      <View style={s.cardHeader}>
        <MaterialIcons name={cfg.icon} size={26} color={cfg.color} style={s.emoji} />
        <View style={s.headerText}>
          <Text style={s.title}>{item.title}</Text>
          <Text style={s.date}>{item.date}</Text>
        </View>
      </View>
      <View style={s.tagRow}>
        <View style={[s.tag, { backgroundColor: cfg.color + "18" }]}>
          <Text style={[s.tagText, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
        <View style={[s.tag, { backgroundColor: scopeCfg.color + "18" }]}>
          <Text style={[s.tagText, { color: scopeCfg.color }]}>
            {scopeCfg.label}
          </Text>
        </View>
      </View>
      <Text style={s.message}>{item.message}</Text>
    </View>
  );
});

export default function AnnouncementsTab() {
  const [activeType, setActiveType] = useState("All");
  const [activeScope, setActiveScope] = useState("All");
  const aiBrief = useAIBrief("announcements");
  const filtered = useMemo(
    () =>
      ANNOUNCEMENTS.filter((a) => {
        const t = activeType === "All" || a.type === activeType;
        const sc = activeScope === "All" || a.scope === activeScope;
        return t && sc;
      }),
    [activeType, activeScope],
  );
  return (
    <View style={s.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterBar}
        style={s.filterScroll}
      >
        {TYPE_FILTERS.map((f) => (
          <FilterPill
            key={"t" + f}
            label={f === "All" ? "All Types" : TYPE_CONFIG[f]?.label || f}
            active={activeType === f}
            onPress={() => setActiveType(f)}
          />
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterBar}
        style={s.filterScroll}
      >
        {SCOPE_FILTERS.map((f) => (
          <FilterPill
            key={"sc" + f}
            label={f === "All" ? "All Scopes" : SCOPE_CONFIG[f]?.label || f}
            active={activeScope === f}
            onPress={() => setActiveScope(f)}
          />
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 16, marginTop: 6 }}>
        <AIBriefCard
          data={aiBrief.data}
          loading={aiBrief.loading}
          error={aiBrief.error}
          onRetry={aiBrief.refresh}
        />
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <AnnouncementCard item={item} />}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filtered.length === 0
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : { paddingVertical: 10 }
        }
        ListEmptyComponent={
          <View style={s.empty}>
            <MaterialIcons name="mail-outline" size={36} color={COLORS.textTertiary} style={s.emptyIcon} />
            <Text style={s.emptyTitle}>No Announcements</Text>
            <Text style={s.emptySub}>No announcements match your filters.</Text>
          </View>
        }
      />
    </View>
  );
}

