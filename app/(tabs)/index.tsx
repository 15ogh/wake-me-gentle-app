import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [alertRange, setAlertRange] = useState(1);
  const [timeActive, setTimeActive] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [flash, setFlash] = useState(false);

  const ranges = ['300m', '500m', '1km'];
  const rangeDescriptions = [
    '도착 직전에 알림을 받습니다',
    '여유 있게 준비할 수 있습니다 (추천)',
    '넓은 범위로 일찍 알림을 받습니다',
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>
            Wake<Text style={styles.logoAccent}>Me</Text>
          </Text>

          <Pressable
            style={styles.iconButton}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.iconButtonText}>⚙️</Text>
          </Pressable>
        </View>

        {/* Destination */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>어디서 깨워드릴까요?</Text>

          <Pressable
            style={styles.cardButton}
            onPress={() => router.push('/location')}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>📍</Text>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>집</Text>
              <Text style={styles.cardSubtitle}>서울시 강남구 테헤란로 123</Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </View>

        {/* Alert Range */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>알림 범위</Text>

          <View style={styles.card}>
            <View style={styles.rangeRow}>
              {ranges.map((range, i) => {
                const active = alertRange === i;
                return (
                  <Pressable
                    key={range}
                    style={[styles.rangeButton, active && styles.rangeButtonActive]}
                    onPress={() => setAlertRange(i)}
                  >
                    <Text
                      style={[
                        styles.rangeButtonText,
                        active && styles.rangeButtonTextActive,
                      ]}
                    >
                      {range}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.helperText}>
              {rangeDescriptions[alertRange]}
            </Text>

            <View style={styles.radiusPreview}>
              <View
                style={[
                  styles.outerCircle,
                  alertRange === 0 && { width: 60, height: 60, borderRadius: 30 },
                  alertRange === 1 && { width: 80, height: 80, borderRadius: 40 },
                  alertRange === 2 && { width: 120, height: 120, borderRadius: 60 },
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    alertRange === 0 && { width: 30, height: 30, borderRadius: 15 },
                    alertRange === 1 && { width: 40, height: 40, borderRadius: 20 },
                    alertRange === 2 && { width: 60, height: 60, borderRadius: 30 },
                  ]}
                >
                  <View style={styles.centerDot} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Active Time */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>활성 시간</Text>

          <View style={styles.cardRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>🕒</Text>
              <Text style={styles.rowLabel}>22:00 ~ 04:00</Text>
            </View>
            <ToggleSwitch checked={timeActive} onChange={setTimeActive} />
          </View>
        </View>

        {/* Alarm Mode */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>알림 모드</Text>

          <View style={styles.card}>
            <AlarmRow
              icon="🔊"
              label="소리 (최대 볼륨)"
              checked={sound}
              onChange={setSound}
            />
            <AlarmRow
              icon="📳"
              label="진동 (강하게)"
              checked={vibration}
              onChange={setVibration}
            />
            <AlarmRow
              icon="⚡"
              label="플래시 (선택)"
              checked={flash}
              onChange={setFlash}
            />
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* CTA */}
      <View style={styles.ctaWrap}>
        <Pressable
          style={styles.ctaButton}
          onPress={() => router.push('/transit')}
        >
          <Text style={styles.ctaButtonText}>WakeMe 시작</Text>
        </Pressable>
        <Text style={styles.ctaHint}>정류장 도착 전에 깨워드립니다</Text>
      </View>
    </View>
  );
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={[styles.toggleTrack, checked && styles.toggleTrackActive]}
    >
      <View
        style={[
          styles.toggleThumb,
          checked ? { transform: [{ translateX: 20 }] } : undefined,
        ]}
      />
    </Pressable>
  );
}

function AlarmRow({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.alarmRow}>
      <View style={styles.rowLeft}>
        <Text style={styles.rowIcon}>{icon}</Text>
        <Text style={styles.rowLabelSmall}>{label}</Text>
      </View>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
  },
  logoAccent: {
    color: '#4F46E5',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonText: {
    fontSize: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#111827',
    borderColor: '#1F2937',
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
  },
  cardRow: {
    backgroundColor: '#111827',
    borderColor: '#1F2937',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardButton: {
    backgroundColor: '#111827',
    borderColor: '#1F2937',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(79,70,229,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardIconText: {
    fontSize: 22,
  },
  cardBody: {
    flex: 1,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 3,
  },
  cardSubtitle: {
    color: '#94A3B8',
    fontSize: 13,
  },
  chevron: {
    color: '#94A3B8',
    fontSize: 26,
    marginLeft: 10,
  },
  rangeRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rangeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  rangeButtonActive: {
    backgroundColor: '#4F46E5',
  },
  rangeButtonText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },
  rangeButtonTextActive: {
    color: '#FFFFFF',
  },
  helperText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 14,
  },
  radiusPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  outerCircle: {
    borderWidth: 2,
    borderColor: 'rgba(79,70,229,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    backgroundColor: 'rgba(79,70,229,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(79,70,229,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  rowLabel: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
  },
  rowLabelSmall: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '500',
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackActive: {
    backgroundColor: '#4F46E5',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  alarmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 42,
    marginBottom: 14,
  },
  ctaWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: 'rgba(11,18,32,0.96)',
  },
  ctaButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  ctaHint: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});