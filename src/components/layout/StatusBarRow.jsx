// ─── STATUS BAR ROW ───────────────────────────────────────────────────────────
// Decorative faux system status bar (time + battery) used at the top of screens.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT } from '../../theme';

export const StatusBarRow = ({ dark = false }) => (
  <View style={styles.statusBar}>
    <Text style={[styles.statusText, dark && styles.statusTextDark]}>9:41</Text>
    <Text style={[styles.statusText, dark && styles.statusTextDark]}>●●● 100%</Text>
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: FONT.semiBold,
    color: COLORS.textPrimary,
  },
  statusTextDark: {
    color: '#fff',
  },
});

export default StatusBarRow;
