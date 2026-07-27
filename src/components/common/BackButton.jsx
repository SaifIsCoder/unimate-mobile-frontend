// ─── BACK BUTTON ──────────────────────────────────────────────────────────────
// Standalone back affordance for screens that don't render the shared Header
// (Profile's gradient hero, Notifications, CreateCommunityPost). Screens that do
// use Header should pass `showBack` instead.

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../theme';

export const BackButton = ({ onPress, variant = 'default', style }) => {
  const navigation = useNavigation();
  const handlePress = () => (onPress ? onPress() : navigation.goBack());
  const isLight = variant === 'light';

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={[styles.btn, isLight && styles.btnLight, style]}
    >
      <MaterialIcons
        name="arrow-back"
        size={20}
        color={isLight ? COLORS.white : COLORS.textPrimary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Mirrors styles.backBtn in components/layout/Header.styles.js
  btn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // For use over gradients (Profile hero)
  btnLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
});

export default BackButton;
