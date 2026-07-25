// ─── ATTENDANCE ALERT SCREEN ──────────────────────────────────────────────
// Full attendance breakdown per subject, filterable by alert status.

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
import { ATTENDANCE_SUBJECTS } from "../data/mockData";

const STATUS_FILTERS = ["All", "Critical", "Warning", "Safe"];

const getAttendanceStatus = (pct) => {
  if (pct < 75) return { label: "Critical", ...ACCENT.red };
  if (pct < 85) return { label: "Warning", ...ACCENT.orange };
  return { label: "Safe", ...ACCENT.green };
};

const SubjectRow = ({ subject }) => {
  const pct = Math.round((subject.attended / subject.total) * 100);
  const st = getAttendanceStatus(pct);
  const needed = Math.max(0, Math.ceil(0.75 * subject.total - subject.attended));

  return (
    <View style={s.row}>
      <View style={[s.bar, { backgroundColor: st.text }]} />
      <View style={{ flex: 1 }}>
        <Text style={s.subName}>{subject.name}</Text>
        <Text style={s.subMeta}>
          {subject.code} · {subject.attended}/{subject.total} classes
          {needed > 0 ? ` · need ${needed} more to be safe` : " · on track"}
        </Text>

        <View style={s.track}>
          <View style={[s.fill, { width: `${pct}%`, backgroundColor: st.text }]} />
          <View style={s.marker} />
        </View>
      </View>

      <View style={s.right}>
        <Text style={[s.pct, { color: st.text }]}>{pct}%</Text>
        <View style={[s.badge, { backgroundColor: st.bg, borderColor: st.border }]}>
          <Text style={[s.badgeText, { color: st.text }]}>{st.label}</Text>
        </View>
      </View>
    </View>
  );
};

const EmptyState = () => (
  <View style={s.emptyWrap}>
    <MaterialIcons name="fact-check" size={36} color={COLORS.textTertiary} />
    <Text style={s.emptyTitle}>No subjects found</Text>
    <Text style={s.emptySub}>Try changing your filter</Text>
  </View>
);

export default function AttendanceScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [statusFilter, setStatusFilter] = useState("All");

  const withStatus = useMemo(
    () =>
      ATTENDANCE_SUBJECTS.map((subj) => {
        const pct = Math.round((subj.attended / subj.total) * 100);
        return { ...subj, pct, status: getAttendanceStatus(pct).label };
      }).sort((a, b) => a.pct - b.pct),
    []
  );

  const filtered = useMemo(
    () =>
      statusFilter === "All"
        ? withStatus
        : withStatus.filter((s) => s.status === statusFilter),
    [withStatus, statusFilter]
  );

  const atRiskCount = withStatus.filter((s) => s.status !== "Safe").length;

  return (
    <View style={[s.screen, { paddingTop: insets.top }]}>
      <Background />
      <Header title="Attendance" showBack onBack={() => navigation.goBack()} />

      <View style={s.summaryRow}>
        <Text style={s.summaryText}>
          {atRiskCount > 0
            ? `${atRiskCount} of ${withStatus.length} subjects need attention`
            : `All ${withStatus.length} subjects are on track`}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterBar}
        style={s.filterScroll}
      >
        {STATUS_FILTERS.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={statusFilter === f}
            onPress={() => setStatusFilter(f)}
          />
        ))}
      </ScrollView>

      <FlatList
        style={{ flex: 1 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SubjectRow subject={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          filtered.length === 0
            ? { flex: 1, justifyContent: "center", alignItems: "center" }
            : s.listContent
        }
        ListEmptyComponent={<EmptyState />}
        ListFooterComponent={
          filtered.length > 0 ? (
            <Text style={s.footnote}>Min. required attendance: 75% per subject</Text>
          ) : null
        }
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },

  summaryRow: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 2 },
  summaryText: { fontSize: 12, fontWeight: FONT.medium, color: COLORS.textSecondary },

  filterScroll: { flexGrow: 0, flexShrink: 0 },
  filterBar: { paddingHorizontal: 16, paddingVertical: 6, gap: 6 },

  listContent: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 25 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 10,
    gap: 10,
  },
  bar: { width: 3, alignSelf: "stretch", minHeight: 44, borderRadius: 2 },

  subName: { fontSize: 13, fontWeight: FONT.c, color: COLORS.textPrimary },
  subMeta: { fontSize: 10.5, color: COLORS.textSecondary, marginTop: 2, marginBottom: 6 },

  track: {
    height: 5,
    backgroundColor: COLORS.bg,
    borderRadius: 3,
    overflow: "visible",
    position: "relative",
  },
  fill: { height: "100%", borderRadius: 3, position: "absolute", top: 0, left: 0 },
  marker: {
    position: "absolute",
    left: "75%",
    top: -2,
    width: 1.5,
    height: 9,
    backgroundColor: COLORS.textTertiary,
    borderRadius: 1,
  },

  right: { alignItems: "flex-end", gap: 4, minWidth: 62 },
  pct: { fontSize: 18, fontWeight: FONT.bold },
  badge: { borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1 },
  badgeText: { fontSize: 10, fontWeight: FONT.c },

  footnote: {
    fontSize: 10.5,
    color: COLORS.textTertiary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 8,
  },

  emptyWrap: { alignItems: "center", gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: FONT.bold, color: COLORS.textPrimary },
  emptySub: { fontSize: 12, color: COLORS.textSecondary },
});
