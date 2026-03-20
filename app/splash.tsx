import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.glow} />

      <View style={styles.content}>
        <Text style={styles.logo}>
          Wake<Text style={styles.logoAccent}>Me</Text>
        </Text>

        <View style={styles.line} />

        <Text style={styles.subtitle}>정류장 도착 전에 깨워드립니다</Text>
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
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(103,232,249,0.10)',
    shadowColor: '#67E8F9',
    shadowOpacity: 0.35,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  content: {
    zIndex: 2,
    alignItems: 'center',
  },
  logo: {
    color: '#F8FAFC',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoAccent: {
    color: '#4F46E5',
  },
  line: {
    marginTop: 14,
    width: 80,
    height: 2,
    borderRadius: 999,
    backgroundColor: 'rgba(79,70,229,0.4)',
  },
  subtitle: {
    marginTop: 14,
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
});