import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TransitScreen() {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          Wake<Text style={styles.logoAccent}>Me</Text>
        </Text>

        <View style={styles.activeWrap}>
          <View style={styles.activeDot} />
          <Text style={styles.activeText}>활성</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>이동 중입니다</Text>

      {/* Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📍</Text>
          <Text style={styles.statNumber}>1.2</Text>
          <Text style={styles.statLabel}>km 남음</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🕒</Text>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>분 예상</Text>
        </View>
      </View>

      {/* Map Preview */}
      <View style={styles.mapCard}>
        <View style={styles.gridOverlay}>
          <View style={[styles.hLine, { top: '15%' }]} />
          <View style={[styles.hLine, { top: '30%' }]} />
          <View style={[styles.hLine, { top: '45%' }]} />
          <View style={[styles.hLine, { top: '60%' }]} />
          <View style={[styles.hLine, { top: '75%' }]} />

          <View style={[styles.vLine, { left: '20%' }]} />
          <View style={[styles.vLine, { left: '40%' }]} />
          <View style={[styles.vLine, { left: '60%' }]} />
          <View style={[styles.vLine, { left: '80%' }]} />
        </View>

        <View style={styles.routeWrap}>
          <Text style={styles.routeText}>출발지 ─────── 도착지</Text>
          <Text style={styles.routeSubText}>실제 이동 경로 시각화는 다음 단계에서 연결</Text>
        </View>

        <View style={styles.mapBadge}>
          <Text style={styles.mapBadgeText}>📍 집 — 1.2 km</Text>
        </View>
      </View>

      {/* Destination Info */}
      <View style={styles.destinationCard}>
        <View style={styles.destinationIconBox}>
          <Text style={styles.destinationIcon}>📍</Text>
        </View>

        <View style={styles.destinationBody}>
          <Text style={styles.destinationTitle}>집</Text>
          <Text style={styles.destinationSubtitle}>서울시 강남구 테헤란로 123</Text>
        </View>

        <View style={styles.alertInfo}>
          <Text style={styles.alertInfoIcon}>🔔</Text>
          <Text style={styles.alertInfoText}>500m 알림</Text>
        </View>
      </View>

      <View style={styles.spacer} />

      {/* Actions */}
      <View style={styles.actionRow}>
        <Pressable style={styles.testButton} onPress={() => router.push('/alert')}>
          <Text style={styles.testButtonText}>알람 테스트</Text>
        </Pressable>

        <Pressable style={styles.stopButton} onPress={() => router.push('/')}>
          <Text style={styles.stopButtonIcon}>✕</Text>
          <Text style={styles.stopButtonText}>중지</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1220',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
  },
  logoAccent: {
    color: '#4F46E5',
  },
  activeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
    marginRight: 8,
  },
  activeText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 28,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    color: '#F8FAFC',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  mapCard: {
    height: 192,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  hLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#4F46E5',
  },
  vLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#4F46E5',
  },
  routeWrap: {
    alignItems: 'center',
  },
  routeText: {
    color: '#67E8F9',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  routeSubText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  mapBadge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(15,23,42,0.85)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mapBadgeText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },
  destinationCard: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  destinationIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(79,70,229,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  destinationIcon: {
    fontSize: 18,
  },
  destinationBody: {
    flex: 1,
  },
  destinationTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  destinationSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
  },
  alertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertInfoIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  alertInfoText: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '700',
  },
  spacer: {
    flex: 1,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  testButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(79,70,229,0.35)',
    backgroundColor: 'rgba(79,70,229,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '700',
  },
  stopButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.35)',
    backgroundColor: 'rgba(239,68,68,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  stopButtonIcon: {
    color: '#EF4444',
    fontSize: 14,
    marginRight: 6,
    fontWeight: '700',
  },
  stopButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },
});