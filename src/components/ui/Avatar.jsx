// ─── AVATAR ───────────────────────────────────────────────────────────────────
// Circular initial badge with a small notification dot.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT } from '../../theme';

export const Avatar = ({ label = 'S', size = 36 }) => (
  <View
    style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
  >
    <Text style={[styles.avatarText, { fontSize: size * 0.38 }]}>{label}</Text>
    <View style={styles.notifDot} />
  </View>
);

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#fff',
    fontWeight: FONT.bold,
  },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4757',
    borderWidth: 1.5,
    borderColor: COLORS.bg,
  },
});

export default Avatar;
