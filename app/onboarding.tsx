import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

const slides = [
  {
    icon: '🌙',
    title: '집 가는 길에 잠들었나요?',
    subtitle: 'WakeMe가 심야 통근길에서 안전하게 지켜드립니다',
    visual: 'bus',
  },
  {
    icon: '📍',
    title: 'WakeMe가 위치를 추적합니다',
    subtitle: '스마트 GPS가 현재 위치를 정확히 파악합니다',
    visual: 'map',
  },
  {
    icon: '🔔',
    title: '도착 전에 깨워드립니다',
    subtitle: '강력한 알림으로 절대 정류장을 놓치지 않습니다',
    visual: 'alarm',
  },
];

function BusIllustration() {
  return (
    <View style={styles.illustrationWrap}>
      <View style={[styles.illustrationGlow, styles.secondaryGlow]} />
      <View style={styles.busInner}>
        <Text style={styles.busEmoji}>😴</Text>
        <View style={styles.busBar}>
          <View style={styles.busBarSmall} />
          <View style={styles.busBarLarge} />
        </View>
      </View>
    </View>
  );
}

function MapIllustration() {
  return (
    <View style={styles.illustrationWrap}>
      <View style={[styles.illustrationGlow, styles.primaryGlow]} />
      <View style={styles.mapBox}>
        <View style={styles.gridHorizontal1} />
        <View style={styles.gridHorizontal2} />
        <View style={styles.gridHorizontal3} />
        <View style={styles.gridHorizontal4} />
        <View style={styles.gridVertical1} />
        <View style={styles.gridVertical2} />
        <View style={styles.gridVertical3} />
        <View style={styles.gridVertical4} />
        <Text style={styles.mapPin}>📍</Text>
      </View>
    </View>
  );
}

function AlarmIllustration() {
  return (
    <View style={styles.illustrationWrap}>
      <View style={styles.alarmRing1} />
      <View style={styles.alarmRing2} />
      <Text style={styles.alarmBell}>🔔</Text>
    </View>
  );
}

function Illustration({ visual }: { visual: string }) {
  if (visual === 'bus') return <BusIllustration />;
  if (visual === 'map') return <MapIllustration />;
  return <AlarmIllustration />;
}

export default function OnboardingScreen() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < 2) {
      setCurrent(current + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const skip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.screen}>
      {/* Skip */}
      <View style={styles.topRow}>
        {current < 2 ? (
          <Pressable onPress={skip}>
            <Text style={styles.skipText}>건너뛰기</Text>
          </Pressable>
        ) : (
          <View />
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Illustration visual={slides[current].visual} />

        <View style={styles.textGroup}>
          <Text style={styles.title}>{slides[current].title}</Text>
          <Text style={styles.subtitle}>{slides[current].subtitle}</Text>
        </View>
      </View>

      {/* Dots + CTA */}
      <View style={styles.bottomArea}>
        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === current ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <Pressable style={styles.ctaButton} onPress={next}>
          <Text style={styles.ctaText}>
            {current === 2 ? 'WakeMe 시작하기' : '계속'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1220',
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 40,
  },
  topRow: {
    width: '100%',
    alignItems: 'flex-end',
    minHeight: 24,
  },
  skipText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textGroup: {
    marginTop: 32,
    alignItems: 'center',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
    maxWidth: 280,
    lineHeight: 24,
  },
  bottomArea: {
    width: '100%',
    alignItems: 'center',
    gap: 28,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
  dotActive: {
    width: 32,
    backgroundColor: '#4F46E5',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#334155',
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  illustrationWrap: {
    width: 192,
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustrationGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
  },
  primaryGlow: {
    backgroundColor: 'rgba(79,70,229,0.06)',
    borderColor: 'rgba(79,70,229,0.12)',
  },
  secondaryGlow: {
    backgroundColor: 'rgba(103,232,249,0.06)',
    borderColor: 'rgba(103,232,249,0.12)',
  },

  busInner: {
    alignItems: 'center',
  },
  busEmoji: {
    fontSize: 72,
    marginBottom: 14,
  },
  busBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30,41,59,0.8)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  busBarSmall: {
    width: 20,
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(103,232,249,0.35)',
    marginRight: 6,
  },
  busBarLarge: {
    width: 48,
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(103,232,249,0.18)',
  },

  mapBox: {
    width: 128,
    height: 128,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridHorizontal1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '20%',
    height: 1,
    backgroundColor: 'rgba(103,232,249,0.25)',
  },
  gridHorizontal2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '40%',
    height: 1,
    backgroundColor: 'rgba(103,232,249,0.25)',
  },
  gridHorizontal3: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '60%',
    height: 1,
    backgroundColor: 'rgba(103,232,249,0.25)',
  },
  gridHorizontal4: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '80%',
    height: 1,
    backgroundColor: 'rgba(103,232,249,0.25)',
  },
  gridVertical1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '20%',
    width: 1,
    backgroundColor: 'rgba(103,232,249,0.25)',
  },
  gridVertical2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '40%',
    width: 1,
    backgroundColor: 'rgba(103,232,249,0.25)',
  },
  gridVertical3: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '60%',
    width: 1,
    backgroundColor: 'rgba(103,232,249,0.25)',
  },
  gridVertical4: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '80%',
    width: 1,
    backgroundColor: 'rgba(103,232,249,0.25)',
  },
  mapPin: {
    fontSize: 40,
  },

  alarmRing1: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: 'rgba(79,70,229,0.20)',
  },
  alarmRing2: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 2,
    borderColor: 'rgba(79,70,229,0.12)',
  },
  alarmBell: {
    fontSize: 56,
  },
});