// ─── FILTER ROW ───────────────────────────────────────────────────────────────
// Horizontal, scrollable row of FilterPills. Replaces the repeated
// <ScrollView horizontal>{options.map(<FilterPill/>)}</ScrollView> blocks.
//
// `options` accepts strings or { label, value } objects.

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FilterPill } from './FilterPill';

const getValue = (opt) => (typeof opt === 'string' ? opt : opt.value);
const getLabel = (opt) => (typeof opt === 'string' ? opt : opt.label);

export const FilterRow = ({ options = [], selected, onSelect, style, contentStyle }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={style}
    contentContainerStyle={[styles.content, contentStyle]}
  >
    {options.map((opt) => {
      const value = getValue(opt);
      return (
        <FilterPill
          key={value}
          label={getLabel(opt)}
          active={selected === value}
          onPress={() => onSelect(value)}
        />
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});

export default FilterRow;
