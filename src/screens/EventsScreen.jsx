import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import API_ENDPOINTS from "../config/api";
import { apiRequest } from "../services/apiClient";
import { events as mockEvents } from "../data/events";

const categories = ["All", "University", "Department", "Class"];

export default function EventsScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // const response = await apiRequest(API_ENDPOINTS.EVENTS.ALL);
      // const eventsData = response?.data || [];

      // Hardcoded substitution
      const eventsData = mockEvents || [];

      const mappedEvents = eventsData.map((event) => ({
        id: event.id || event._id,
        name: event.name || event.title,
        category: event.category || (event.scope ? event.scope.charAt(0).toUpperCase() + event.scope.slice(1) : "University"),
        date: event.date || (event.startDate ? new Date(event.startDate).toLocaleDateString() : "TBD"),
        time: event.time || (event.startDate && event.endDate
          ? `${new Date(event.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${new Date(event.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
          : "TBD"),
        place: event.place || (event.scope === "class" ? "Class" : event.scope === "department" ? "Department" : "Campus"),
        organizer: event.organizer || "UniMate",
        description: event.description,
        image: event.image,
      }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error loading events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View >
        {/* CATEGORY FILTERS */}
      <View style={styles.filterRow}>
        {categories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text
                style={[styles.filterText, active && styles.filterTextActive]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* EVENT LIST */}
      {filteredEvents.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎉</Text>
          <Text style={styles.emptyTitle}>No events found</Text>
          <Text style={styles.emptySubtitle}>
            Check back later for upcoming events.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          contentContainerStyle={{ paddingBottom: 135 }}
        />
      )}
      </View>
    </SafeAreaView>
  );
}

/* ---------------- EVENT CARD COMPONENT ---------------- */

function EventCard({ event }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <View style={styles.card}>
      {/* IMAGE */}
      {event.image && (
        <View style={styles.imageContainer}>
          {imageLoading && !imageError && (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={48} color="#9CA3AF" />
              <Text style={styles.placeholderText}>Loading image...</Text>
            </View>
          )}
          {!imageError && (
            <Image 
              source={{ uri: event.image }} 
              style={[styles.cardImage, imageLoading && { display: 'none' }]}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
              }}
            />
          )}
          {imageError && (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={48} color="#9CA3AF" />
              <Text style={styles.placeholderText}>Image not available</Text>
            </View>
          )}
        </View>
      )}

      <View style={{ padding: 12 }}>
        {/* TITLE */}
        <Text style={styles.eventName}>{event.name}</Text>

        {/* CATEGORY BADGE */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{event.category}</Text>
        </View>

        {/* DATE + TIME */}
        <Text style={styles.eventInfo}>
          📅 {event.date} ⏰ {event.time}
        </Text>

        {/* LOCATION */}
        <Text style={styles.eventInfo}>📍 {event.place}</Text>

        {/* ORGANIZER */}
        <Text style={styles.organizer}>🎤 Organized by: {event.organizer}</Text>

        {/* DESCRIPTION PREVIEW */}
        {event.description && (
          <Text numberOfLines={2} style={styles.description}>
            {event.description}
          </Text>
        )}

        {/* Button */}
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filterRow: {
    paddingTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  filterChipActive: {
    backgroundColor: "#1565C0",
  },
  filterText: { fontSize: 14, color: "#374151" },
  filterTextActive: { color: "white", fontWeight: "600" },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  /* CARD */
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 20,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 160,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "100%",
    height: 160,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  eventName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 5,
  },
  badge: {
    backgroundColor: "#EEF2FF",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
  },
  badgeText: { color: "#4F46E5", fontSize: 12, fontWeight: "600" },
  eventInfo: { fontSize: 14, color: "#6B7280", marginBottom: 3 },
  organizer: { fontSize: 14, color: "#374151", marginBottom: 10 },
  description: {
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 12,
  },
  detailsButton: {
    backgroundColor: "#1565C0",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
