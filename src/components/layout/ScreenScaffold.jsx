// ─── SCREEN SCAFFOLD ──────────────────────────────────────────────────────────
// Standard screen shell: safe-area top padding + optional decorative Background +
// optional Header. Collapses the `<View><Background /><Header .../>...` wrapper
// repeated across most screens.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../theme';
import Background from './Background';
import Header from './Header';

export const ScreenScaffold = ({
  children,
  headerTitle,
  headerProps,
  showHeader = true,
  showBackground = true,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }, style]}>
      {showBackground ? <Background /> : null}
      {showHeader ? <Header title={headerTitle} {...headerProps} /> : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});

export default ScreenScaffold;
