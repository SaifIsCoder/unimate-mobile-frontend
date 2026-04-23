import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const TYPES = [
  { id: "internship", label: "Internship", emoji: "💼" },
  { id: "competition", label: "Competition", emoji: "🏆" },
  { id: "gpa", label: "GPA", emoji: "⭐" },
  { id: "project", label: "Project", emoji: "🚀" },
  { id: "cert", label: "Certification", emoji: "📜" },
  { id: "custom", label: "Custom", emoji: "🎯" },
];

export default function AchievementSelector({ selected, onSelect }) {
  return (
    <View style={styles.grid}>
      {TYPES.map((item) => {
        const active = selected === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id)}
            style={[styles.item, active && styles.active]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.text}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    width: "30%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  active: {
    borderColor: "#1A56DB",
    backgroundColor: "#E8F0FF",
  },
  emoji: {
    fontSize: 20,
  },
  text: {
    marginTop: 4,
    fontSize: 12,
  },
});