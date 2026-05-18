// ─── ANNOUNCEMENTS TAB ───────────────────────────────────────────────────────
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { COLORS, RADIUS, FONT } from "../../theme/theme";
import { FilterPill } from "../../components/SharedComponents";
import { LinearGradient } from "expo-linear-gradient";

const TYPE_CONFIG = {
  important: {
    label: "Important",
    emoji: "⚠️",
    color: COLORS.red || "#DC2626",
  },
  event: { label: "Event", emoji: "🎉", color: COLORS.primary },
  general: { label: "Notice", emoji: "📢", color: COLORS.textSecondary },
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

const AnnouncementCard = ({ item }) => {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
  const scopeCfg = SCOPE_CONFIG[item.scope] || SCOPE_CONFIG.department;
  return (
    <View style={s.card}>
      <View style={s.cardHeader}>
        <Text style={s.emoji}>{cfg.emoji}</Text>
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
      {/* {item.image && (
        <Image source={{ uri: item.image }} style={s.cardImage} resizeMode="cover" />
      )} */}
      {/* <TouchableOpacity>
        <Text style={s.viewDetails}>View Details</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// ─── AI ANNOUNCEMENTS SUMMARY ────────────────────────────────────────────────
const AiAnnouncementsSummary = () => (
  <View style={s.aiCard}>
    <View style={s.aiHeaderRow}>
      <Text style={s.aiIcon}>✨</Text>
      <Text style={s.aiLabel}>TODAY'S PRIORITIES</Text>
    </View>
    <Text style={s.aiBody}>
      Focus on the final exam schedule released 30 mins ago. Your Math exam is scheduled for next Monday. Prepare early!
    </Text>
  </View>
);

export default function AnnouncementsTab() {
  const [activeType, setActiveType] = useState("All");
  const [activeScope, setActiveScope] = useState("All");
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

      {/* AI Summary: Today's Priorities */}
      <AiAnnouncementsSummary />

      <FlatList
        style={{ flex: 1 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filtered.length === 0
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : { paddingVertical: 10 }
        }
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={s.emptyIcon}>📭</Text>
            <Text style={s.emptyTitle}>No Announcements</Text>
            <Text style={s.emptySub}>No announcements match your filters.</Text>
          </View>
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  aiCard: {
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
    borderTopWidth: 4,
    borderTopColor: "#6063ee",
    borderWidth: 1,
    borderColor: "#6063ee",
    padding: 14,
    gap: 10,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  aiHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  aiIcon: { fontSize: 16 },
  aiLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4648d4",
    letterSpacing: 1,
  },
  aiBody: { fontSize: 14, fontWeight: "500", color: "#1e1b4b", lineHeight: 21 },
  filterScroll: { flexGrow: 0, flexShrink: 0 },
  filterBar: { paddingHorizontal: 16, paddingVertical: 6, gap: 6 },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
  },
  emoji: { fontSize: 26, marginTop: 2 },
  headerText: { flex: 1 },
  title: { fontSize: 15, fontWeight: FONT.bold, color: COLORS.textPrimary },
  date: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  tagRow: { flexDirection: "row", gap: 6, marginBottom: 8 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: RADIUS.sm },
  tagText: { fontSize: 10, fontWeight: FONT.semiBold },
  message: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: RADIUS.md,
    marginBottom: 12,
    backgroundColor: COLORS.bg,
  },
  viewDetails: {
    fontSize: 13,
    fontWeight: FONT.semiBold,
    color: COLORS.primary,
    textAlign: "right",
  },
  empty: { alignItems: "center", paddingHorizontal: 40 },
  emptyIcon: { fontSize: 36, marginBottom: 10 },
  emptyTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emptySub: { fontSize: 11, color: COLORS.textSecondary, textAlign: "center" },
});
