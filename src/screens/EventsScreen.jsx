// ─── EVENTS SCREEN ────────────────────────────────────────────────────────
// Shows past & current events with status + category filters.

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, ACCENT } from "../theme";
import Header from "../components/layout/Header";
import Background from "../components/layout/Background";
import { FilterPill } from "../components/ui";
import { EVENT_CATEGORIES } from "../data/mockData";
import { s } from "./EventsScreen.styles";

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

const EventCard = React.memo(({ event }) => {
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
});

const EmptyState = () => (
  <View style={s.emptyWrap}>
    <MaterialIcons name="event-busy" size={36} color={COLORS.textTertiary} />
    <Text style={s.emptyTitle}>No events found</Text>
    <Text style={s.emptySub}>Try changing your filters</Text>
  </View>
);

export default function EventsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { listEvents } = require("../services/communicationService");
        const res = await listEvents();
        
        // Map backend to UI schema
        const mapped = res.map(e => ({
          id: String(e.id),
          category: e.category || "academic",
          title: e.title,
          datetime: e.start_time,
          date: new Date(e.start_time).toLocaleDateString(),
          time: new Date(e.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          location: e.location || "TBA",
        }));
        
        setEvents(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const st = statusFilter === "All" || getEventStatus(e.datetime) === statusFilter;
      const cat = categoryFilter === "All" || e.category === categoryFilter;
      return st && cat;
    }).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  }, [events, statusFilter, categoryFilter]);

  if (loading) {
    return (
      <View style={[s.screen, { paddingTop: insets.top, justifyContent: "center", alignItems: "center" }]}>
        <Background />
        <Header title="Events" showBack />
        <Text style={{ color: COLORS.textSecondary }}>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <Background />
      <Header title="Events" showBack />

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
            label={f === "All" ? "All Categories" : EVENT_CATEGORIES[f]?.label || f}
            active={categoryFilter === f}
            onPress={() => setCategoryFilter(f)}
          />
        ))}
      </ScrollView>

      <FlatList
        style={{ flex: 1 }}
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <EventCard event={item} />}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
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

