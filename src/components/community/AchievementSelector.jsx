import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TYPES = [
  { id: "internship", label: "Internship", icon: "work" },
  { id: "competition", label: "Competition", icon: "emoji-events" },
  { id: "gpa", label: "GPA", icon: "star" },
  { id: "project", label: "Project", icon: "rocket-launch" },
  { id: "cert", label: "Certification", icon: "workspace-premium" },
  { id: "custom", label: "Custom", icon: "track-changes" },
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
            <MaterialIcons
              name={item.icon}
              size={20}
              color={active ? "#1A56DB" : "#374151"}
            />
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
  text: {
    marginTop: 4,
    fontSize: 12,
  },
});