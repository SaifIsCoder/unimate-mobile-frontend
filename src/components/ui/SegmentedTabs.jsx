// ─── SEGMENTED TABS ───────────────────────────────────────────────────────────
// Pill-style segmented control. Generalizes the hand-rolled 2-button tab
// switchers (Updates, Grades, Community).
//
// `tabs` is an array of { key, label }.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT } from '../../theme';

export const SegmentedTabs = ({ tabs = [], active, onChange, style }) => (
  <View style={[styles.wrap, style]}>
    {tabs.map((tab) => {
      const isActive = active === tab.key;
      return (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, isActive && styles.tabActive]}
          onPress={() => onChange(tab.key)}
          activeOpacity={0.8}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive }}
        >
          <Text style={[styles.label, isActive && styles.labelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: COLORS.card + '95',
    borderRadius: 50,
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 50,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: FONT.semiBold,
    color: COLORS.textTertiary,
  },
  labelActive: {
    color: '#fff',
  },
});

export default SegmentedTabs;
