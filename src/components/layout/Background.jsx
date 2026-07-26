import { StyleSheet, View } from "react-native";
import React from "react";

const Background = () => {
  return (
    <View>
      <View style={styles.blob1} />
      <View style={styles.blob2} />
      <View style={styles.blob3} />
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  blob1: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#5508dbff",
    opacity: 0.15,
  },
  blob2: {
    position: "absolute",
    top: 60,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#a78bfa",
    opacity: 0.05,
  },
  blob3: {
    position: "absolute",
    bottom: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#6d28d9",
    opacity: 0.10,
  },
});