import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/layout/Header";
import Background from "../../components/layout/Background";
import { AIBriefCard } from "../../components/ui";
import { useAIBrief } from "../../hooks/useAIBrief";
import { styles, COLORS, RADIUS, FONT } from "./GradesScreen.styles";

// ── PROGRESS BAR ──────────────────────────────────────────
const ProgressBar = ({ progress, colors }) => (
  <View style={styles.progressTrack}>
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.progressFill, { width: `${progress}%` }]}
    />
  </View>
);

// ── COURSE CARD ───────────────────────────────────────────
// Mirrors: <div class="bg-white rounded-[14px] border ...">
const CourseCard = ({ item }) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => setSelected((v) => !v)}
      style={[
        styles.courseCard,
        selected && {
          borderColor: `${COLORS.primary}33`,
          borderWidth: 2,
        },
      ]}
    >
      {/* Card header row */}
      <View style={styles.courseHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.courseName}>{item.name}</Text>
          <Text style={styles.courseCode}>
            {item.code} • {item.credits} Credits
          </Text>
        </View>

        {/* Grade circle */}
        <View
          style={[styles.gradeCircle, { borderColor: item.gradeBorderColor }]}
        >
          <Text style={[styles.gradeText, { color: item.gradeColor }]}>
            {item.grade}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabelRow}>
          <Text style={styles.progressLabel}>COURSE PROGRESS</Text>
          <Text style={styles.progressLabel}>{item.progress}%</Text>
        </View>
        <ProgressBar progress={item.progress} colors={item.progressColors} />
      </View>

      {/* Stat pills */}
      <View style={styles.statRow}>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{item.statLabel1}</Text>
          <Text style={styles.statValue}>{item.statValue1}</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{item.statLabel1}</Text>
          <Text style={styles.statValue}>{item.statValue1}</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{item.statLabel1}</Text>
          <Text style={styles.statValue}>{item.statValue1}</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statLabel}>{item.statLabel2}</Text>
          <Text style={styles.statValue}>{item.statValue2}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function GradesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const aiBrief = useAIBrief("grades");

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchGrades = async () => {
      try {
        const { getMyGradesSummary } = require("../../services/gradeService");
        const res = await getMyGradesSummary();
        setSummary(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, []);

  if (loading) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <Background />
        <Header title="Grades" />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: COLORS.textSecondary }}>Loading grades...</Text>
        </View>
      </View>
    );
  }

  const courses = (summary?.courses || []).map((c) => ({
    id: String(c.offering_id || c.course_code),
    name: c.course_title,
    code: c.course_code,
    credits: c.credit_hours,
    grade: c.grade || "N/A",
    progress: c.marks || 0,
    gradeColor: COLORS.primary,
    gradeBorderColor: `${COLORS.primary}1A`,
    progressColors: ["#6b38d4", "#9C6CF8"],
    statLabel1: "TOTAL MARKS",
    statValue1: c.marks ? `${c.marks}/100` : "-",
    statLabel2: "GPA",
    statValue2: c.gpa ? c.gpa.toFixed(1) : "-",
  }));

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Background />

      <Header title="Grades" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 30 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {summary && (
          <View style={styles.gpaHeroWrapper}>
            <View style={styles.gpaHero}>
              <View style={styles.gpaContent}>
                <Text style={styles.gpaLabel}>CURRENT SEMESTER GPA</Text>
                <View style={styles.gpaRow}>
                  <Text style={styles.gpaNumber}>{summary.sgpa?.toFixed(2) || "0.00"}</Text>
                  <Text style={styles.gpaOutOf}>/ 4.0</Text>
                </View>
              </View>

              <View style={styles.gpaFooter}>
                <View style={styles.gpaFooterLeft}>
                  <MaterialIcons
                    name="trending-up"
                    size={18}
                    color={COLORS.primaryFixed}
                  />
                  <Text style={styles.gpaFooterText}>CGPA: {summary.cgpa?.toFixed(2) || "0.00"}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.goalButton}
                onPress={() => navigation.navigate("SetGPAGoal")}
                activeOpacity={0.85}
              >
                <MaterialIcons name="emoji-events" size={14} color={COLORS.primary} />
                <Text style={styles.goalButtonText}>Set CGPA Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <AIBriefCard
          data={aiBrief.data}
          loading={aiBrief.loading}
          error={aiBrief.error}
          onRetry={aiBrief.refresh}
        />

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingVertical: 10,
            backgroundColor: "#ffffff",
            borderRadius: RADIUS.full,
            borderWidth: 1,
            borderColor: COLORS.primary,
          }}
          activeOpacity={0.7}
          onPress={() => navigation.navigate("AllSemestersScreen")}
        >
          <MaterialIcons name="history" size={20} color={COLORS.primary} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: COLORS.primary,
            }}
          >
            View All Semester History
          </Text>
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Course Performance</Text>
        </View>

        {courses.map((course) => (
          <CourseCard key={course.id} item={course} />
        ))}
      </ScrollView>
    </View>
  );
}

// ── STYLES ────────────────────────────────────────────────
