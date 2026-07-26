// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
// Shared empty-list placeholder (emoji or MaterialIcon + title + subtitle).
// Replaces the hand-built empty views duplicated across list screens.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONT, SPACING } from '../../theme';

export const EmptyState = ({ emoji, icon, title, subtitle, style }) => (
  <View style={[styles.container, style]}>
    {emoji ? (
      <Text style={styles.emoji}>{emoji}</Text>
    ) : icon ? (
      <MaterialIcons name={icon} size={40} color={COLORS.textTertiary} />
    ) : null}
    {title ? <Text style={styles.title}>{title}</Text> : null}
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  emoji: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: FONT.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default EmptyState;
