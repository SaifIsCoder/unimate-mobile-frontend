import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PostPreview({ type, title, body, user }) {
  return (
    <View style={styles.card}>
      <Text style={styles.user}>
        {user.name} • {user.semester}
      </Text>

      {type && <Text style={styles.type}>{type.toUpperCase()}</Text>}

      {title ? <Text style={styles.title}>{title}</Text> : null}

      {body ? <Text style={styles.body}>{body}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  user: {
    fontSize: 12,
    color: "#6B7280",
  },
  type: {
    marginTop: 6,
    fontSize: 12,
    color: "#1A56DB",
    fontWeight: "600",
  },
  title: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    marginTop: 4,
    color: "#374151",
  },
});