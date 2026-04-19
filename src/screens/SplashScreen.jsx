import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Line, Rect, G, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// ─── Animated SVG Logo ───────────────────────────────────────────────────────
const UniMateLogo = ({ glowOpacity }) => (
  <Svg width={160} height={160} viewBox="0 0 160 160" fill="none">
    <Defs>
      <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
        <Stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.6" />
        <Stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
      </RadialGradient>
    </Defs>

    {/* Ambient glow circle */}
    <Circle cx="80" cy="80" r="78" fill="url(#glow)" opacity={0.5} />

    {/* Monitor base */}
    <Rect x="62" y="118" width="36" height="8" rx="4" fill="white" opacity={0.9} />
    <Rect x="74" y="110" width="12" height="10" rx="2" fill="white" opacity={0.9} />

    {/* Monitor frame */}
    <Path
      d="M28 38 L28 108 Q28 114 34 114 L126 114 Q132 114 132 108 L132 38 Q132 32 126 32 L34 32 Q28 32 28 38Z"
      stroke="white"
      strokeWidth="5"
      fill="none"
      strokeLinejoin="round"
    />

    {/* Open book - left page */}
    <Path
      d="M80 52 C80 52 60 56 44 68 L44 102 C60 90 80 88 80 88 L80 52Z"
      fill="white"
      opacity={0.95}
    />
    {/* Left page lines */}
    <Line x1="52" y1="76" x2="72" y2="72" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
    <Line x1="52" y1="84" x2="72" y2="80" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
    <Line x1="52" y1="92" x2="72" y2="88" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />

    {/* Open book - right page */}
    <Path
      d="M80 52 C80 52 100 56 116 68 L116 102 C100 90 80 88 80 88 L80 52Z"
      fill="white"
      opacity={0.95}
    />
    {/* Right page lines */}
    <Line x1="108" y1="76" x2="88" y2="72" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
    <Line x1="108" y1="84" x2="88" y2="80" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
    <Line x1="108" y1="92" x2="88" y2="88" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />

    {/* Book spine */}
    <Path d="M80 52 L80 88" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />

    {/* AI node - top right */}
    <Circle cx="124" cy="32" r="5" fill="white" opacity={0.9} />
    <Circle cx="138" cy="22" r="3.5" fill="white" opacity={0.7} />
    <Line x1="124" y1="32" x2="138" y2="22" stroke="white" strokeWidth="1.5" opacity={0.5} />

    {/* AI node - top left */}
    <Circle cx="36" cy="30" r="3.5" fill="white" opacity={0.7} />
    <Line x1="36" y1="30" x2="48" y2="38" stroke="white" strokeWidth="1.5" opacity={0.5} />

    {/* AI node - bottom */}
    <Circle cx="80" cy="90" r="3" fill="#C4B5FD" opacity={0.8} />
  </Svg>
);

// ─── Main Splash Screen ───────────────────────────────────────────────────────
export default function SplashScreen({ onFinish }) {
  // Animation values
  const fadeFromBlack   = useRef(new Animated.Value(0)).current;
  const logoScale       = useRef(new Animated.Value(0.72)).current;
  const logoOpacity     = useRef(new Animated.Value(0)).current;
  const glowOpacity     = useRef(new Animated.Value(0)).current;
  const sweepX          = useRef(new Animated.Value(-200)).current;
  const titleOpacity    = useRef(new Animated.Value(0)).current;
  const titleY          = useRef(new Animated.Value(18)).current;
  const taglineOpacity  = useRef(new Animated.Value(0)).current;
  const taglineY        = useRef(new Animated.Value(12)).current;
  const breatheAnim     = useRef(new Animated.Value(1)).current;
  const exitOpacity     = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const breathing = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, { toValue: 1.045, duration: 2200, useNativeDriver: true }),
        Animated.timing(breatheAnim, { toValue: 1.0,   duration: 2200, useNativeDriver: true }),
      ])
    );

    Animated.sequence([
      // 1. Fade in from black
      Animated.timing(fadeFromBlack, {
        toValue: 1, duration: 700, useNativeDriver: true,
      }),

      // 2. Logo scales + fades in
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 700, useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1, tension: 55, friction: 9, useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1, duration: 900, useNativeDriver: true,
        }),
      ]),

      // 3. Light sweep across logo
      Animated.timing(sweepX, {
        toValue: 240, duration: 800, useNativeDriver: true,
      }),

      // 4. Title fades up
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1, duration: 600, useNativeDriver: true,
        }),
        Animated.timing(titleY, {
          toValue: 0, duration: 600, useNativeDriver: true,
        }),
      ]),

      Animated.delay(200),

      // 5. Tagline fades up
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1, duration: 500, useNativeDriver: true,
        }),
        Animated.timing(taglineY, {
          toValue: 0, duration: 500, useNativeDriver: true,
        }),
      ]),

      // 6. Hold — breathe animation starts here
      Animated.delay(1800),

      // 7. Exit fade
      Animated.timing(exitOpacity, {
        toValue: 0, duration: 600, useNativeDriver: true,
      }),
    ]).start(() => {
      breathing.stop();
      onFinish?.();
    });

    // Start breathing mid-sequence (after logo appears)
    const breatheTimer = setTimeout(() => breathing.start(), 1600);
    return () => {
      clearTimeout(breatheTimer);
      breathing.stop();
    };
  }, []);

  return (
    <Animated.View style={[styles.root, { opacity: exitOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Base dark fade-in layer */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.blackBase, { opacity: fadeFromBlack }]}>
        <LinearGradient
          colors={['#0D0620', '#1A0A3C', '#2D1260', '#3B1F8C', '#4C2BAD']}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Subtle grid overlay */}
        <View style={styles.gridOverlay} pointerEvents="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={i} style={styles.gridLine} />
          ))}
        </View>

        {/* Noise/texture dots */}
        {Array.from({ length: 28 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.noiseDot,
              {
                top: Math.sin(i * 137.5) * height * 0.45 + height * 0.5,
                left: Math.cos(i * 137.5) * width * 0.45 + width * 0.5,
                opacity: 0.06 + (i % 5) * 0.015,
                width: 2 + (i % 3),
                height: 2 + (i % 3),
              },
            ]}
          />
        ))}
      </Animated.View>

      {/* ── Center content ── */}
      <View style={styles.centerContent}>

        {/* Glow halo behind logo */}
        <Animated.View style={[styles.glowHalo, { opacity: glowOpacity }]} />

        {/* Logo container with breathe + scale animations */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [
                { scale: Animated.multiply(logoScale, breatheAnim) },
              ],
            },
          ]}
        >
          {/* Light sweep overlay */}
          <Animated.View
            style={[
              styles.lightSweep,
              { transform: [{ translateX: sweepX }] },
            ]}
            pointerEvents="none"
          />
          <UniMateLogo glowOpacity={glowOpacity} />
        </Animated.View>

        {/* App name */}
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleY }],
            marginTop: 32,
          }}
        >
          <Text style={styles.appName}>
            uni<Text style={styles.appNameAccent}>Mate</Text>
          </Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View
          style={{
            opacity: taglineOpacity,
            transform: [{ translateY: taglineY }],
            marginTop: 10,
          }}
        >
          <Text style={styles.tagline}>Smarter Academics. Connected Students.</Text>
        </Animated.View>

        {/* AI badge */}
        {/* <Animated.View style={[styles.aiBadge, { opacity: taglineOpacity }]}>
          <View style={styles.aiBadgeDot} />
          <Text style={styles.aiBadgeText}>Powered by AI</Text>
        </Animated.View> */}
      </View>

      {/* Bottom wordmark */}
      <Animated.View style={[styles.bottomMark, { opacity: taglineOpacity }]}>
        <Text style={styles.bottomMarkText}>ACADEMIC INTELLIGENCE PLATFORM</Text>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  blackBase: {
    flex: 1,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-around',
    opacity: 0.04,
  },
  gridLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#C4B5FD',
  },
  noiseDot: {
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: '#C4B5FD',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  glowHalo: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'transparent',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
    elevation: 0,
    // Soft radial approximation with multiple layers
    borderWidth: 0,
  },
  logoWrapper: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    // Outer glow via shadow
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 40,
    elevation: 20,
  },
  lightSweep: {
    position: 'absolute',
    top: -20,
    left: -40,
    width: 60,
    height: 220,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.18)',
    transform: [{ rotate: '20deg' }],
    zIndex: 10,
  },
  appName: {
    fontSize: 42,
    fontWeight: '300',
    letterSpacing: 3,
    color: '#EDE9FE',
    fontFamily: 'System', // Replace with 'DM Sans' or 'Outfit' via expo-font
    textAlign: 'center',
  },
  appNameAccent: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: 13.5,
    fontWeight: '400',
    letterSpacing: 0.8,
    color: '#A78BFA',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'System',
    opacity: 0.9,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.3)',
    backgroundColor: 'rgba(124,58,237,0.12)',
    gap: 7,
  },
  aiBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A78BFA',
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.2,
    color: '#C4B5FD',
    textTransform: 'uppercase',
    fontFamily: 'System',
  },
  bottomMark: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomMarkText: {
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 3.5,
    color: 'rgba(167,139,250,0.4)',
    textTransform: 'uppercase',
    fontFamily: 'System',
  },
});