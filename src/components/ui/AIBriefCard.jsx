// ─── AI BRIEF CARD ────────────────────────────────────────────────────────────
// Gradient "AI insight" card. Accepts either a string or { summary, tags }.

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../theme';

// Required for LayoutAnimation on the old Android architecture; a no-op elsewhere.
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
const Skeleton = () => {
  const pulse = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.8,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.35,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <View style={styles.skeletonWrap}>
      <Animated.View style={[styles.skeletonBar, { opacity: pulse }]} />
      <Animated.View
        style={[styles.skeletonBar, styles.skeletonBarShort, { opacity: pulse }]}
      />
    </View>
  );
};

export const AIBriefCard = ({
  data,
  loading = false,
  error = null,
  onRetry,
  collapsible = true,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const summary = typeof data === 'string' ? data : data?.summary;
  const tags = Array.isArray(data?.tags) ? data.tags : [];

  // Collapsing is only meaningful once there is content to hide
  const canCollapse = collapsible && !loading && !error && !!summary;
  const showBody = !canCollapse || expanded;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((v) => !v);
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={COLORS.gradientPurple}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.glowCircle} />

        <TouchableOpacity
          activeOpacity={canCollapse ? 0.8 : 1}
          onPress={canCollapse ? toggle : undefined}
          disabled={!canCollapse}
          accessibilityRole={canCollapse ? 'button' : undefined}
          accessibilityLabel={
            canCollapse
              ? `AI insight, ${expanded ? 'expanded' : 'collapsed'}`
              : undefined
          }
          style={styles.headerRow}
        >
          <View style={styles.iconWrap}>
            <MaterialIcons name="psychology" size={14} color="#FFFFFF" />
          </View>
          <Text style={styles.label}>AI INSIGHT · TODAY</Text>
          {canCollapse && (
            <MaterialIcons
              name={expanded ? 'expand-less' : 'expand-more'}
              size={20}
              color="#FFFFFF"
            />
          )}
        </TouchableOpacity>

        {loading ? (
          <Skeleton />
        ) : error ? (
          <View style={styles.errorRow}>
            <MaterialIcons name="error-outline" size={16} color="#FFFFFF" />
            <Text style={styles.errorText}>Couldn't load AI insight</Text>
            {onRetry && (
              <TouchableOpacity onPress={onRetry} activeOpacity={0.8}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <Text style={styles.body} numberOfLines={showBody ? undefined : 1}>
              {summary}
            </Text>

            {showBody && tags.length > 0 && (
              <View style={styles.tagsRow}>
                {tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <View style={styles.tagContent}>
                      <MaterialIcons
                        name="auto-awesome"
                        size={10}
                        color="#FFFFFF"
                      />
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
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
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  skeletonWrap: { gap: 8 },
  skeletonBar: {
    height: 11,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  skeletonBarShort: { width: '65%' },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  retryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textDecorationLine: 'underline',
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
