import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, RADIUS, FONT } from "../../theme";
import { Avatar } from "../ui/Avatar";
import NotificationBell from "../common/NotificationBell";
import { getAICopilotInsight } from "../../services/aiService";
import { styles } from "./Header.styles";

const { height } = Dimensions.get("window");

export default function Header({ title, showBack = false, onBack }) {
  const navigation = useNavigation();
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [selectedChip, setSelectedChip] = useState("general");

  const handleBack = () => (onBack ? onBack() : navigation.goBack());

  // Header mounts on every screen, so the copilot only fetches once the sheet is
  // actually opened — and again when the user switches insight chips.
  const [currentInsight, setCurrentInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);

  useEffect(() => {
    if (!aiModalVisible) return;

    let active = true;
    setInsightLoading(true);

    getAICopilotInsight(selectedChip)
      .then((insight) => {
        if (active) setCurrentInsight(insight);
      })
      .finally(() => {
        if (active) setInsightLoading(false);
      });

    return () => {
      active = false;
    };
  }, [aiModalVisible, selectedChip]);

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
          <MaterialIcons name="auto-awesome" size={15} color="#7c3aed" />
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
                      <MaterialIcons name="auto-awesome" size={20} color="#fff" />
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
                    <MaterialIcons name="close" size={14} color={COLORS.textSecondary} />
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
                    <MaterialIcons
                      name="psychology"
                      size={100}
                      color="#7c3aed"
                      style={styles.aiBubbleWatermark}
                    />
                    {insightLoading || !currentInsight ? (
                      <View style={styles.aiBubbleLoading}>
                        <ActivityIndicator size="small" color="#7c3aed" />
                        <Text style={styles.aiBubbleLoadingText}>
                          Analyzing your academic data…
                        </Text>
                      </View>
                    ) : (
                      <>
                        <View style={styles.aiBubbleHeader}>
                          <MaterialIcons name={currentInsight.icon} size={18} color="#7c3aed" />
                          <Text style={styles.aiBubbleTitle}>{currentInsight.title}</Text>
                        </View>
                        <Text style={styles.aiBubbleText}>{currentInsight.content}</Text>
                      </>
                    )}
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
                    <View style={styles.chipContent}>
                      <MaterialIcons
                        name="psychology"
                        size={14}
                        color={selectedChip === "general" ? "#fff" : COLORS.textSecondary}
                      />
                      <Text style={[styles.chipText, selectedChip === "general" && styles.chipTextActive]}>
                        Overview
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.chip,
                      selectedChip === "workload" && styles.chipActive,
                    ]}
                    onPress={() => setSelectedChip("workload")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.chipContent}>
                      <MaterialIcons
                        name="bar-chart"
                        size={14}
                        color={selectedChip === "workload" ? "#fff" : COLORS.textSecondary}
                      />
                      <Text style={[styles.chipText, selectedChip === "workload" && styles.chipTextActive]}>
                        Workload
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.chip,
                      selectedChip === "gpa" && styles.chipActive,
                    ]}
                    onPress={() => setSelectedChip("gpa")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.chipContent}>
                      <MaterialIcons
                        name="trending-up"
                        size={14}
                        color={selectedChip === "gpa" ? "#fff" : COLORS.textSecondary}
                      />
                      <Text style={[styles.chipText, selectedChip === "gpa" && styles.chipTextActive]}>
                        GPA Forecast
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.chip,
                      selectedChip === "attendance" && styles.chipActive,
                    ]}
                    onPress={() => setSelectedChip("attendance")}
                    activeOpacity={0.8}
                  >
                    <View style={styles.chipContent}>
                      <MaterialIcons
                        name="timer"
                        size={14}
                        color={selectedChip === "attendance" ? "#fff" : COLORS.textSecondary}
                      />
                      <Text style={[styles.chipText, selectedChip === "attendance" && styles.chipTextActive]}>
                        Attendance Alert
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>

                {/* Modal Footer */}
                <View style={[styles.modalFooter, styles.footerRow]}>
                  <MaterialIcons name="lightbulb" size={14} color={COLORS.textTertiary} />
                  <Text style={styles.footerText}>
                    AI recommendations update automatically based on your real-time course grades and attendance.
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

