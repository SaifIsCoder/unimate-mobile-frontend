// ─── FILTER PILL ──────────────────────────────────────────────────────────────
// Single selectable chip. Compose several via <FilterRow />.

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, RADIUS, FONT } from '../../theme';

export const FilterPill = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.filterPill, active && styles.filterPillActive]}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityState={{ selected: !!active }}
    accessibilityLabel={label}
  >
    <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  filterPill: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginRight: 6,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: FONT.medium,
    color: COLORS.textSecondary,
  },
  filterPillTextActive: {
    color: '#fff',
  },
});

export default FilterPill;
