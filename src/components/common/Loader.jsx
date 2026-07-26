// ─── LOADER ───────────────────────────────────────────────────────────────────
// Centered activity indicator with an optional label.

import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, FONT, SPACING } from '../../theme';

export const Loader = ({ label, size = 'large', style }) => (
  <View style={[styles.container, style]}>
    <ActivityIndicator size={size} color={COLORS.primary} />
    {label ? <Text style={styles.label}>{label}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  label: {
    marginTop: SPACING.sm,
    fontSize: 13,
    fontWeight: FONT.medium,
    color: COLORS.textSecondary,
  },
});

export default Loader;
