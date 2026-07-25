import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, RADIUS, FONT } from "../theme/theme";
import { Avatar } from "./SharedComponents";
import NotificationBell from "./NotificationBell";

const { height } = Dimensions.get("window");

export default function Header({ title, showBack = false, onBack }) {
  const navigation = useNavigation();
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [selectedChip, setSelectedChip] = useState("general");

  const handleBack = () => (onBack ? onBack() : navigation.goBack());

  const AI_INSIGHTS = {
    general: {
      title: "Today's Cognitive Overview",
      content: "Hello Saif! I'm your Unimate AI assistant. Based on your current calendar, you have a high cognitive load today with 3 classes and a database assignment. Let's optimize your day!",
      emoji: "🧠",
    },
    workload: {
      title: "Cognitive Load Forecast",
      content: "You have 3 classes today (Web Dev, Data Structures, Database Systems) and 1 urgent task due at 5:00 PM. I've calculated a high mental burden between 11 AM - 3 PM. Take a 15-minute break after your second class to stay sharp!",
      emoji: "📊",
    },
    gpa: {
      title: "GPA & Academic Analysis",
      content: "Outstanding job! Your current CGPA is 3.85. You have completed 100% of your tasks this week. If you maintain this submission streak, you are on track to graduate with first-class honors!",
      emoji: "📈",
    },
    attendance: {
      title: "Attendance & Class Safety",
      content: "Your attendance in Data Structures is currently at 70% (Critical). You need to attend today's session to raise it above the 75% safe threshold. I highly recommend not skipping any classes today!",
      emoji: "⏱",
    },
  };

  const currentInsight = AI_INSIGHTS[selectedChip] || AI_INSIGHTS.general;

  return (
    <View style={styles.header}>
      {/* LEFT SIDE: Back button or Avatar + Page Title */}
      <View style={styles.headerLeft}>
        {showBack ? (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            style={styles.backBtn}
          >
            <MaterialIcons name="arrow-back" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            activeOpacity={0.8}
          >
            <Avatar label="S" size={38} />
          </TouchableOpacity>
        )}
        <Text
          style={styles.pageTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>

      {/* RIGHT SIDE: Notification Bell + Sparkle AI Button */}
      <View style={styles.headerRight}>
        <NotificationBell />
        <TouchableOpacity
          style={styles.aiBtn}
          onPress={() => setAiModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.aiBtnIcon}>✨</Text>
        </TouchableOpacity>
      </View>

      {/* AI ASSISTANT BOTTOM-SHEET MODAL */}
      <Modal
        visible={aiModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAiModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setAiModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Drag Indicator */}
                <View style={styles.dragIndicator} />

                {/* Modal Header */}
                <View style={styles.modalHeader}>
                  <View style={styles.modalHeaderLeft}>
                    <LinearGradient
                      colors={COLORS.gradientPurple}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.aiIconBadge}
                    >
                      <Text style={styles.aiIconBadgeText}>✨</Text>
                    </LinearGradient>
                    <View>
                      <Text style={styles.modalTitle}>Unimate AI</Text>
                      <Text style={styles.modalSubtitle}>Smart Academic Copilot</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setAiModalVisible(false)}
                  >
                    <Text style={styles.closeBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>

                {/* AI Chat Bubble Container */}
                <View style={styles.aiBubbleContainer}>
                  <LinearGradient
                    colors={["#f3e8ff", "#ede9fe"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.aiBubble}
                  >
                    <Text style={styles.aiBubbleWatermark}>🧠</Text>
                    <View style={styles.aiBubbleHeader}>
                      <Text style={styles.aiBubbleEmoji}>{currentInsight.emoji}</Text>
                      <Text style={styles.aiBubbleTitle}>{currentInsight.title}</Text>
                    </View>
                    <Text style={styles.aiBubbleText}>{currentInsight.content}</Text>
                  </LinearGradient>
                </View>

                {/* Suggestions Section Label */}
                <Text style={styles.sectionLabel}>TAP AN INSIGHT HIGHLIGHT</Text>

                {/* Suggestion Chips Row */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipsRow}
                >
                  <TouchableOpacity
                    style={[
                      styles.chip,
                      selectedChip === "general" && styles.chipActive,
                    ]}
                    onPress={() => setSelectedChip("general")}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, selectedChip === "general" && styles.chipTextActive]}>
                      🧠 Overview
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.chip,
                      selectedChip === "workload" && styles.chipActive,
                    ]}
                    onPress={() => setSelectedChip("workload")}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, selectedChip === "workload" && styles.chipTextActive]}>
                      📊 Workload
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.chip,
                      selectedChip === "gpa" && styles.chipActive,
                    ]}
                    onPress={() => setSelectedChip("gpa")}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, selectedChip === "gpa" && styles.chipTextActive]}>
                      📈 GPA Forecast
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.chip,
                      selectedChip === "attendance" && styles.chipActive,
                    ]}
                    onPress={() => setSelectedChip("attendance")}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.chipText, selectedChip === "attendance" && styles.chipTextActive]}>
                      ⏱ Attendance Alert
                    </Text>
                  </TouchableOpacity>
                </ScrollView>

                {/* Modal Footer */}
                <View style={styles.modalFooter}>
                  <Text style={styles.footerText}>
                    💡 AI recommendations update automatically based on your real-time course grades and attendance.
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginRight: 16,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: -0.5,
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  aiBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#c4b5fd",
    // soft shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aiBtnIcon: {
    fontSize: 15,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 15, 26, 0.45)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
    maxHeight: height * 0.7,
    // strong shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#e5e7eb",
    alignSelf: "center",
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  aiIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  aiIconBadgeText: {
    fontSize: 20,
    color: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  modalSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "500",
    marginTop: 1,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "700",
  },

  // AI Bubble
  aiBubbleContainer: {
    marginBottom: 20,
  },
  aiBubble: {
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#e9e5ff",
    padding: 18,
    overflow: "hidden",
    position: "relative",
  },
  aiBubbleWatermark: {
    position: "absolute",
    right: -10,
    top: -10,
    fontSize: 100,
    opacity: 0.04,
  },
  aiBubbleHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  aiBubbleEmoji: {
    fontSize: 18,
  },
  aiBubbleTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#7c3aed",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  aiBubbleText: {
    fontSize: 14,
    color: "#1e1b4b",
    lineHeight: 22,
    fontWeight: "500",
  },

  // Suggestion Chips
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.textTertiary,
    letterSpacing: 1.2,
    marginBottom: 10,
    marginLeft: 4,
  },
  chipsRow: {
    paddingBottom: 16,
    gap: 8,
    paddingLeft: 2,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 6,
    // subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: "#fff",
  },

  // Footer
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
    marginTop: 6,
  },
  footerText: {
    fontSize: 11,
    color: COLORS.textTertiary,
    lineHeight: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
