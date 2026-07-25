// ─── EVENTS SCREEN ────────────────────────────────────────────────────────
// Shows past & current events with status + category filters.

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, RADIUS, FONT, ACCENT } from "../theme/theme";
import Header from "../components/Header";
import Background from "../components/Background";
import { FilterPill } from "../components/SharedComponents";
import { EVENTS, EVENT_CATEGORIES } from "../data/mockData";

const STATUS_FILTERS = ["All", "Current", "Past"];
const CATEGORY_FILTERS = ["All", ...Object.keys(EVENT_CATEGORIES)];

// An event stays "Current" for its whole calendar day, even after its time has passed.
const getEventStatus = (datetime) => {
  const eventDay = new Date(datetime);
  eventDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDay >= today ? "Current" : "Past";
};

const EventCard = ({ event }) => {
  const cfg = EVENT_CATEGORIES[event.category];
  const accent = ACCENT[cfg.accent];
  const isPast = getEventStatus(event.datetime) === "Past";

  return (
    <View style={[s.card, isPast && s.cardPast]}>
      <View style={[s.iconCircle, { backgroundColor: accent.bg }]}>
        <MaterialIcons name={cfg.icon} size={20} color={accent.text} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={s.titleRow}>
          <Text style={s.title} numberOfLines={1}>
            {event.title}
          </Text>
          {isPast && (
            <View style={s.pastBadge}>
              <Text style={s.pastBadgeText}>Past</Text>
            </View>
          )}
        </View>

        <View style={s.metaRow}>
          <MaterialIcons name="event" size={12} color={COLORS.textTertiary} />
          <Text style={s.metaText}>
            {event.date} · {event.time}
          </Text>
        </View>
        <View style={s.metaRow}>
          <MaterialIcons name="place" size={12} color={COLORS.textTertiary} />
          <Text style={s.metaText}>{event.location}</Text>
        </View>

        <View style={[s.categoryTag, { backgroundColor: accent.bg }]}>
          <Text style={[s.categoryTagText, { color: accent.text }]}>
            {cfg.label}
          </Text>
        </View>
      </View>
    </View>
  );
};

const EmptyState = () => (
  <View style={s.emptyWrap}>
    <MaterialIcons name="event-busy" size={36} color={COLORS.textTertiary} />
    <Text style={s.emptyTitle}>No events found</Text>
    <Text style={s.emptySub}>Try changing your filters</Text>
  </View>
);

export default function EventsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      const st = statusFilter === "All" || getEventStatus(e.datetime) === statusFilter;
      const cat = categoryFilter === "All" || e.category === categoryFilter;
      return st && cat;
    }).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  }, [statusFilter, categoryFilter]);

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <Background />
      <Header title="Events" showBack onBack={() => navigation.goBack()} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterBar}
        style={s.filterScroll}
      >
        {STATUS_FILTERS.map((f) => (
          <FilterPill
            key={"st" + f}
            label={f}
            active={statusFilter === f}
            onPress={() => setStatusFilter(f)}
          />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterBar}
        style={s.filterScroll}
      >
        {CATEGORY_FILTERS.map((f) => (
          <FilterPill
            key={"cat" + f}
            label={f === "All" ? "All Categories" : EVENT_CATEGORIES[f].label}
            active={categoryFilter === f}
            onPress={() => setCategoryFilter(f)}
          />
        ))}
      </ScrollView>

      <FlatList
        style={{ flex: 1 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filtered.length === 0
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : s.listContent
        }
        ListEmptyComponent={<EmptyState />}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  filterScroll: { flexGrow: 0, flexShrink: 0 },
  filterBar: { paddingHorizontal: 16, paddingVertical: 6, gap: 6 },

  listContent: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 25 },

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  cardPast: { opacity: 0.6 },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { flex: 1, fontSize: 14, fontWeight: FONT.bold, color: COLORS.textPrimary },

  pastBadge: {
    backgroundColor: COLORS.bg,
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pastBadgeText: { fontSize: 9, fontWeight: FONT.c, color: COLORS.textSecondary },

  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  metaText: { fontSize: 11, color: COLORS.textSecondary },

  categoryTag: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  categoryTagText: { fontSize: 10, fontWeight: FONT.c },

  emptyWrap: { alignItems: "center", gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: FONT.bold, color: COLORS.textPrimary },
  emptySub: { fontSize: 12, color: COLORS.textSecondary },
});
