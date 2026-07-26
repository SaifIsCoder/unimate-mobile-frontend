// ─── CARD ─────────────────────────────────────────────────────────────────────
// Generic surface container. Pass `accent` (a theme.ACCENT key) for a left-border
// accented variant used by class / assignment / announcement cards.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, RADIUS, ACCENT } from '../../theme';

export const Card = ({ accent, style, children, ...rest }) => {
  const accentStyle = accent && ACCENT[accent]
    ? { borderLeftWidth: 4, borderLeftColor: ACCENT[accent].border }
    : null;

  return (
    <View style={[styles.card, accentStyle, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
});

export default Card;
