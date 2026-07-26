// ─── FAB ──────────────────────────────────────────────────────────────────────
// Floating action button (e.g. "+ Share"). Supports an icon and/or a label.

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, FONT } from '../../theme';

export const Fab = ({ label, icon = 'add', onPress, style, accessibilityLabel }) => (
  <TouchableOpacity
    style={[styles.fab, style]}
    onPress={onPress}
    activeOpacity={0.85}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel || label}
  >
    {icon ? <MaterialIcons name={icon} size={20} color="#fff" /> : null}
    {label ? <Text style={styles.label}>{label}</Text> : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: FONT.semiBold,
  },
});

export default Fab;
