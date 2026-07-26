// ─── AI BRIEF CARD ────────────────────────────────────────────────────────────
// Gradient "AI insight" card. Accepts either a string or { summary, tags }.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme';

export const AIBriefCard = ({ data }) => {
  const summary = typeof data === 'string' ? data : data?.summary;
  const tags = Array.isArray(data?.tags) ? data.tags : [];

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={COLORS.gradientPurple}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.glowCircle} />

        <View style={styles.headerRow}>
          <View style={styles.iconWrap}>
            <MaterialIcons name="psychology" size={14} color="#FFFFFF" />
          </View>
          <Text style={styles.label}>AI INSIGHT · TODAY</Text>
        </View>

        <Text style={styles.body}>{summary}</Text>

        {tags.length > 0 && (
          <View style={styles.tagsRow}>
            {tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <View style={styles.tagContent}>
                  <MaterialIcons name="auto-awesome" size={10} color="#FFFFFF" />
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 18,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  card: {
    borderRadius: 18,
    padding: 16,
    overflow: 'hidden',
  },
  glowCircle: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    top: -40,
    right: -40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  iconWrap: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  body: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  tagContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AIBriefCard;
