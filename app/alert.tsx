import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function AlertScreen() {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = () => {
    setHolding(true);
    setProgress(0);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const endHold = () => {
    setHolding(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress((prev) => (prev < 100 ? 0 : prev));
  };

  useEffect(() => {
    if (progress >= 100) {
      router.push('/');
    }
  }, [progress]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <View style={styles.screen}>
      {/* Flash overlay 느낌 */}
      <View style={styles.flashOverlay} />

      {/* Pulsing rings 느낌 */}
      <View style={styles.ringWrap}>
        <View style={[styles.ring, styles.ring1]} />
        <View style={[styles.ring, styles.ring2]} />
        <View style={[styles.ring, styles.ring3]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.warningEmoji}>⚠️</Text>
        <Text style={styles.title}>일어나세요!</Text>
        <Text style={styles.subtitle}>정류장이 가까워지고 있습니다</Text>

        <View style={styles.distanceCard}>
          <Text style={styles.distanceText}>300m 남음</Text>
        </View>
      </View>

      {/* Dismiss Button */}
      <View style={styles.bottomWrap}>
        <View style={styles.buttonOuter}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />

          <Pressable
            style={styles.holdButton}
            onPressIn={startHold}
            onPressOut={endHold}
          >
            <Text style={styles.holdButtonText}>
              {holding ? '계속 누르세요...' : '일어났어요'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.hint}>해제하려면 2초간 길게 누르세요</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1220',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(239,68,68,0.12)',
  },
  ringWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
  },
  ring1: {
    borderColor: 'rgba(239,68,68,0.35)',
  },
  ring2: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderColor: 'rgba(239,68,68,0.25)',
  },
  ring3: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderColor: 'rgba(239,68,68,0.15)',
  },
  content: {
    alignItems: 'center',
    gap: 18,
    zIndex: 2,
  },
  warningEmoji: {
    fontSize: 72,
    marginBottom: 4,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 38,
    fontWeight: '900',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 18,
    textAlign: 'center',
  },
  distanceCard: {
    marginTop: 10,
    backgroundColor: 'rgba(239,68,68,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.35)',
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  distanceText: {
    color: '#EF4444',
    fontSize: 24,
    fontWeight: '800',
  },
  bottomWrap: {
    position: 'absolute',
    left: 32,
    right: 32,
    bottom: 64,
    alignItems: 'center',
    zIndex: 3,
  },
  buttonOuter: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(248,250,252,0.18)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(79,70,229,0.25)',
  },
  holdButton: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  holdButtonText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  hint: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 12,
  },
});