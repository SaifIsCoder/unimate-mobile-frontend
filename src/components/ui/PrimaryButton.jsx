// ─── PRIMARY BUTTON ───────────────────────────────────────────────────────────
// Solid or gradient CTA button with optional loading + disabled states.

import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, FONT } from '../../theme';

export const PrimaryButton = ({
  label,
  onPress,
  gradient = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const content = loading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={[styles.label, textStyle]}>{label}</Text>
  );

  if (gradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled }}
        style={[isDisabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={COLORS.gradientPurple}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      style={[styles.button, styles.solid, isDisabled && styles.disabled, style]}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  solid: {
    backgroundColor: COLORS.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: FONT.semiBold,
  },
});

export default PrimaryButton;
