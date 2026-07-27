// ─── SEMESTER DETAIL SCREEN ───────────────────────────────────────────────────
// Drill-down from AllSemesters: every subject taken in a given semester with its
// credit hours, letter grade and marks breakdown.

import React from "react";
import { View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

import Header from "../../components/layout/Header";
import Background from "../../components/layout/Background";
import { EmptyState } from "../../components/common";
import { COLORS, ACCENT } from "../../theme";
import { SEMESTER_HISTORY } from "../../data/mockData";
import { styles } from "./SemesterDetailScreen.styles";

// ── Summary card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ semester, totalCredits }) => (
  <LinearGradient
    colors={COLORS.gradientPurple}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.summaryCard}
  >
    <View style={styles.summaryOrb} />

    <View style={styles.summaryTopRow}>
      <View>
        <Text style={styles.summaryTerm}>{semester.term.toUpperCase()}</Text>
        <View style={styles.summaryGpaRow}>
          <Text style={styles.summaryGpa}>{semester.gpa}</Text>
          <Text style={styles.summaryGpaOutOf}>GPA</Text>
        </View>
      </View>

      <View style={styles.statusChip}>
        <MaterialIcons
          name={semester.isCurrent ? "school" : "check-circle"}
          size={12}
          color={COLORS.white}
        />
        <Text style={styles.statusChipText}>
          {semester.isCurrent ? "In Progress" : "Completed"}
        </Text>
      </View>
    </View>

    <View style={styles.summaryStatsRow}>
      <View style={styles.summaryStat}>
        <Text style={styles.summaryStatNum}>{semester.courses.length}</Text>
        <Text style={styles.summaryStatLabel}>COURSES</Text>
      </View>
      <View style={styles.summaryDivider} />
      <View style={styles.summaryStat}>
        <Text style={styles.summaryStatNum}>{totalCredits}</Text>
        <Text style={styles.summaryStatLabel}>CREDIT HOURS</Text>
      </View>
    </View>

    {!semester.finalNumbersUpdated && (
      <View style={styles.pendingBanner}>
        <MaterialIcons name="info-outline" size={14} color={COLORS.white} />
        <Text style={styles.pendingText}>
          Final results pending — GPA is provisional.
        </Text>
      </View>
    )}
  </LinearGradient>
);

// ── Course card ──────────────────────────────────────────────────────────────
const MarkCell = ({ label, value }) => (
  <View style={styles.markCell}>
    <Text style={styles.markLabel}>{label}</Text>
    <Text style={styles.markValue}>{value}</Text>
  </View>
);

const CourseCard = ({ course }) => {
  const letter = ACCENT[course.letterVariant] || ACCENT.purple;
  const bar = ACCENT[course.progressVariant] || letter;

  return (
    <View style={[styles.courseCard, { borderLeftColor: letter.border }]}>
      {/* Title + letter grade */}
      <View style={styles.courseTopRow}>
        <View style={styles.courseTitleWrap}>
          <Text style={styles.courseName} numberOfLines={2}>
            {course.name}
          </Text>
          <Text style={styles.courseMeta} numberOfLines={1}>
            {course.code} · {course.teacher}
          </Text>
        </View>

        <View style={styles.gradeBlock}>
          <View style={[styles.gradeBadge, { backgroundColor: letter.bg }]}>
            <Text style={[styles.gradeLetter, { color: letter.text }]}>
              {course.letter}
            </Text>
          </View>
          <Text style={styles.creditText}>{course.creditHours} CR</Text>
        </View>
      </View>

      {/* Marks breakdown */}
      <View style={styles.marksRow}>
        <MarkCell label="MIDTERM" value={course.midterm} />
        <MarkCell label="ASSIGNMENTS" value={course.assignments} />
        <MarkCell label="TOTAL" value={course.total} />
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${course.progress}%`, backgroundColor: bar.border },
          ]}
        />
      </View>
    </View>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
export default function SemesterDetailScreen({ route }) {
  const insets = useSafeAreaInsets();
  const semesterId = route?.params?.semesterId;
  const semester = SEMESTER_HISTORY.find((s) => s.id === semesterId);

  if (!semester) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <Background />
        <Header title="Semester" showBack />
        <EmptyState
          icon="history-edu"
          title="Semester not found"
          subtitle="This semester is no longer part of your academic record."
        />
      </View>
    );
  }

  const totalCredits = semester.courses.reduce(
    (sum, c) => sum + c.creditHours,
    0
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Background />

      <Header title={semester.name} showBack />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 30 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <SummaryCard semester={semester} totalCredits={totalCredits} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Subjects</Text>
          <Text style={styles.sectionCount}>
            {semester.courses.length} COURSES
          </Text>
        </View>

        {semester.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </ScrollView>
    </View>
  );
}
