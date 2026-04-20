import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, RADIUS, FONT } from "../theme/theme";
import {
  Avatar,
  FilterPill,
  SectionTitle,
} from "../components/SharedComponents";
import NotificationBell from "../components/NotificationBell";
import { GRADES_BY_SEMESTER, STUDENT } from "../data/mockData";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Background from "../components/Background";
const GRADE_FILTERS = ["Current Sem", "All Semesters", "Transcript"];

// ── GPA HERO ─────────────────────────────────────────────
// Shows pending state if final numbers are NOT updated.
const GpaHero = ({ semester }) => {
  const isPending = !semester?.finalNumbersUpdated;

  return (
    <LinearGradient
      colors={isPending ? ["#F59E0B", "#EF4444"] : COLORS.gradientGreen}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gpaHero}
    >
      <View>
        <Text style={styles.gpaLabel}>
          {isPending ? "Semester GPA" : "Current CGPA"}
        </Text>

        {isPending ? (
          <>
            <Text style={styles.gpaPending}>Pending Result</Text>
            <Text style={styles.gpaPendingSub}>
              GPA will be calculated after{"\n"}final numbers are updated
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.gpaNumber}>{STUDENT.gpa}</Text>
            <Text style={styles.gpaSub}>8th Semester · Fall 2019</Text>
          </>
        )}
      </View>

      <View style={styles.gpaRight}>
        {isPending ? (
          <>
            <Text style={styles.pendingIcon}>⏳</Text>
            <Text style={styles.attLabel}>Awaiting</Text>
          </>
        ) : (
          <>
            <Text style={styles.attNum}>{STUDENT.attendance}</Text>
            <Text style={styles.attLabel}>Attendance</Text>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

// ── SEMESTER CARD (NEW) ──────────────────────────────────
const SemesterCard = ({ item, onPress }) => {
  const isPending = !item.finalNumbersUpdated;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={isPending ? ["#F59E0B", "#EF4444"] : COLORS.gradientPurple}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.semHero}
      >
        <View>
          <Text style={styles.semLabel}>Semester</Text>
          <Text style={styles.semTitle}>{item.title}</Text>
          <Text style={styles.semSub}>{item.totalCredits} Credits</Text>
        </View>

        <View style={styles.semRight}>
          {isPending ? (
            <>
              <Text style={styles.semPendingText}>Pending</Text>
              <Text style={styles.semGpaLabel}>Result</Text>
            </>
          ) : (
            <>
              <Text style={styles.semGpa}>{item.gpa}</Text>
              <Text style={styles.semGpaLabel}>GPA</Text>
            </>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// ── PROGRESS BAR ─────────────────────────────────────────
const ProgressBar = ({ progress, variant }) => {
  const colors = {
    green: ["#1DB87A", "#0EA5E9"],
    purple: [COLORS.primary, "#9C6CF8"],
    orange: [COLORS.orange, COLORS.red],
  };

  return (
    <View style={styles.progressTrack}>
      <LinearGradient
        colors={colors[variant] || colors.purple}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${progress}%` }]}
      />
    </View>
  );
};

// ── GRADE BADGE ──────────────────────────────────────────
const GradeLetter = ({ letter, variant }) => {
  const map = {
    green: { bg: COLORS.green2, color: COLORS.green },
    purple: { bg: COLORS.primary3, color: COLORS.primary },
    orange: { bg: COLORS.orange2, color: COLORS.orange },
  };

  const cfg = map[variant] || map.green;

  return (
    <View style={[styles.gradeLetter, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.gradeLetterText, { color: cfg.color }]}>
        {letter}
      </Text>
    </View>
  );
};

// ── GRADE CARD ───────────────────────────────────────────
const GradeCard = ({ item }) => (
  <View style={styles.gradeCard}>
    <View style={styles.gradeHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.gradeCourse}>{item.course}</Text>
        <Text style={styles.gradeCode}>{item.code}</Text>
      </View>

      <GradeLetter letter={item.letter} variant={item.letterVariant} />
    </View>

    <ProgressBar progress={item.progress} variant={item.progressVariant} />

    <View style={styles.gradeBreakdown}>
      <Text style={styles.gradeItem}>
        Midterm: <Text style={styles.gradeItemStrong}>{item.midterm}</Text>
      </Text>
      <Text style={styles.gradeItem}>
        Assignments:{" "}
        <Text style={styles.gradeItemStrong}>{item.assignments}</Text>
      </Text>
      <Text style={styles.gradeItem}>
        Final: <Text style={styles.gradeItemStrong}>—</Text>
      </Text>
      <Text style={styles.gradeItem}>
        Total: <Text style={styles.gradeItemStrong}>{item.total}</Text>
      </Text>
    </View>
  </View>
);

// ── MAIN SCREEN ──────────────────────────────────────────
export default function GradesScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState("Current Sem");
  const [selectedSemester, setSelectedSemester] = useState(null);
  const insets = useSafeAreaInsets();

  const currentSemester = GRADES_BY_SEMESTER[0];

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + 16, paddingBottom: 40 },
      ]}
    >
      <Background />
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Grades</Text>
        <View style={styles.headerRight}>
          <NotificationBell />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar label="S" size={36} />
          </TouchableOpacity>
        </View>
      </View>

      <GpaHero semester={currentSemester} />

      {/* FILTER */}
      <View style={styles.filterBar}>
        {GRADE_FILTERS.map((f) => (
          <FilterPill
            key={f}
            label={f}
            active={activeFilter === f}
            onPress={() => {
              setActiveFilter(f);
              setSelectedSemester(null);
            }}
          />
        ))}
      </View>

      {/* CURRENT SEM */}
      {activeFilter === "Current Sem" && (
        <>
          <SectionTitle>{currentSemester.title}</SectionTitle>

          <FlatList
            data={currentSemester.grades}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <GradeCard item={item} />}
          />
        </>
      )}

      {/* ALL SEMESTERS */}
      {activeFilter === "All Semesters" && !selectedSemester && (
        <FlatList
          data={GRADES_BY_SEMESTER}
          keyExtractor={(item) => item.semesterId}
          renderItem={({ item }) => (
            <SemesterCard
              item={item}
              onPress={() => setSelectedSemester(item)}
            />
          )}
        />
      )}

      {/* SEM DETAIL */}
      {activeFilter === "All Semesters" && selectedSemester && (
        <>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setSelectedSemester(null)}
          >
            <FontAwesome name="long-arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <SectionTitle>{selectedSemester.title}</SectionTitle>

          <FlatList
            data={selectedSemester.grades}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <GradeCard item={item} />}
          />
        </>
      )}

      {/* TRANSCRIPT */}
      {activeFilter === "Transcript" && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Transcript Coming Soon</Text>
          <Text style={styles.emptySub}>
            You will be able to download it later
          </Text>
        </View>
      )}
    </View>
  );
}

// ── STYLES ───────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg, paddingVertical: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },

  gpaHero: {
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 20,
    borderRadius: RADIUS.xl,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  gpaLabel: { fontSize: 11, color: "#fff" },
  gpaNumber: { fontSize: 36, fontWeight: FONT.bold, color: "#fff" },
  gpaSub: { fontSize: 11, color: "#eee" },

  gpaPending: {
    fontSize: 22,
    fontWeight: FONT.bold,
    color: "#fff",
    marginTop: 4,
  },

  gpaPendingSub: {
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
    lineHeight: 15,
  },

  gpaRight: { alignItems: "flex-end", justifyContent: "center" },
  attNum: { fontSize: 28, fontWeight: FONT.bold, color: "#fff" },
  attLabel: { fontSize: 10, color: "#eee" },

  pendingIcon: { fontSize: 28, marginBottom: 2 },

  filterBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    gap: 8,
  },

  // SEM CARD
  semHero: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: RADIUS.xl,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  semLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
  },

  semTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: "#fff",
  },

  semSub: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    marginTop: 4,
  },

  semRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  semGpa: {
    fontSize: 26,
    fontWeight: FONT.bold,
    color: "#fff",
  },

  semPendingText: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: "#fff",
  },

  semGpaLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.7)",
  },

  backBtn: {
    marginHorizontal: 16,
    marginBottom: 6,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: 3,
    width: 60,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: FONT.semiBold,
  },

  gradeCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  gradeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  gradeCourse: {
    fontSize: 16,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  gradeCode: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },

  gradeLetter: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  gradeLetterText: {
    fontSize: 18,
    fontWeight: FONT.bold,
  },

  progressTrack: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginBottom: 8,
  },

  progressFill: {
    height: "100%",
    borderRadius: 3,
  },

  gradeBreakdown: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  gradeItem: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },

  gradeItemStrong: {
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
  },

  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: FONT.bold,
    color: COLORS.textPrimary,
  },

  emptySub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
