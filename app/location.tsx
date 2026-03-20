import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    Alert,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

interface Place {
  icon: 'home' | 'work' | 'pin';
  label: string;
  address: string;
  lat?: number;
  lng?: number;
}

const defaultPlaces: Place[] = [
  { icon: 'home', label: '집', address: '서울시 강남구 테헤란로 123', lat: 37.5012, lng: 127.0396 },
  { icon: 'work', label: '회사', address: '서울시 종로구 세종대로 456', lat: 37.572, lng: 126.9769 },
];

const mockSearchPool: Place[] = [
  { icon: 'pin', label: '강남역', address: '서울 강남구 강남대로 396', lat: 37.4979, lng: 127.0276 },
  { icon: 'pin', label: '서울역', address: '서울 중구 한강대로 405', lat: 37.5547, lng: 126.9706 },
  { icon: 'pin', label: '홍대입구역', address: '서울 마포구 양화로 160', lat: 37.5572, lng: 126.9254 },
  { icon: 'pin', label: '서울시 마포구', address: '서울특별시 마포구', lat: 37.5663, lng: 126.9019 },
];

function getPlaceIcon(icon: Place['icon']) {
  if (icon === 'home') return '🏠';
  if (icon === 'work') return '💼';
  return '📍';
}

export default function LocationScreen() {
  const [savedPlaces, setSavedPlaces] = useState<Place[]>(defaultPlaces);
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceAddress, setNewPlaceAddress] = useState('');
  const [newPlaceIcon, setNewPlaceIcon] = useState<Place['icon']>('pin');
  const [mapCenter, setMapCenter] = useState({ lat: 37.5665, lng: 126.978 });

  const hasSearchQuery = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return mockSearchPool.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectPlace = (place: Place) => {
    if (place.lat && place.lng) {
      setMapCenter({ lat: place.lat, lng: place.lng });
    }
    Alert.alert('목적지 선택', `${place.label}\n${place.address}`, [
      {
        text: '확인',
        onPress: () => router.push('/transit'),
      },
    ]);
  };

  const handleMapClickMock = () => {
    const mockAddress = '서울시 중구 세종대로 110';
    setMapCenter({ lat: 37.5663, lng: 126.9779 });
    setNewPlaceAddress(mockAddress);
    Alert.alert('위치 선택됨', mockAddress);
  };

  const handleAddPlace = () => {
    if (!newPlaceName.trim() || !newPlaceAddress.trim()) {
      Alert.alert('입력 오류', '장소 이름과 주소를 모두 입력해주세요.');
      return;
    }

    const newPlace: Place = {
      icon: newPlaceIcon,
      label: newPlaceName.trim(),
      address: newPlaceAddress.trim(),
      lat: mapCenter.lat,
      lng: mapCenter.lng,
    };

    setSavedPlaces((prev) => [...prev, newPlace]);
    setAddDialogOpen(false);
    setNewPlaceName('');
    setNewPlaceAddress('');
    setNewPlaceIcon('pin');

    Alert.alert('장소 추가 완료', `${newPlace.label}이(가) 저장되었습니다.`);
  };

  const handleUseCurrentLocation = () => {
    Alert.alert('현재 위치 사용', '실제 GPS 연동은 다음 단계에서 붙입니다.', [
      {
        text: '확인',
        onPress: () => router.push('/transit'),
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>목적지 설정</Text>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="주소 또는 장소 검색 (예: 강남역, 서울시 마포구)"
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Text style={styles.clearText}>✕</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Search Results */}
        {hasSearchQuery && (
          <View style={styles.resultsWrap}>
            <Text style={styles.sectionLabel}>검색 결과 ({searchResults.length})</Text>

            {searchResults.length > 0 ? (
              <View style={styles.resultList}>
                {searchResults.map((place, idx) => (
                  <Pressable
                    key={`${place.address}-${idx}`}
                    onPress={() => handleSelectPlace(place)}
                    style={styles.resultCard}
                  >
                    <View style={styles.resultIconBox}>
                      <Text style={styles.resultIcon}>📍</Text>
                    </View>
                    <View style={styles.resultBody}>
                      <Text style={styles.resultTitle} numberOfLines={1}>
                        {place.label}
                      </Text>
                      <Text style={styles.resultSubtitle} numberOfLines={1}>
                        {place.address}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
                <Text style={styles.emptySubText}>다른 키워드로 검색해보세요</Text>
              </View>
            )}
          </View>
        )}

        {/* Map Placeholder */}
        <View style={styles.mapWrap}>
          <Pressable style={styles.mapBox} onPress={handleMapClickMock}>
            <Text style={styles.mapTitle}>지도 영역</Text>
            <Text style={styles.mapSubText}>실제 지도는 다음 단계에서 연결</Text>
            <Text style={styles.mapCoordText}>
              lat {mapCenter.lat.toFixed(4)} / lng {mapCenter.lng.toFixed(4)}
            </Text>
            <Text style={styles.mapTapHint}>탭해서 위치 선택 테스트</Text>
          </Pressable>
        </View>

        {/* Current Location */}
        {!hasSearchQuery && (
          <View style={styles.currentLocationWrap}>
            <Pressable onPress={handleUseCurrentLocation} style={styles.currentLocationButton}>
              <Text style={styles.currentLocationIcon}>🧭</Text>
              <Text style={styles.currentLocationText}>현재 위치 사용</Text>
            </Pressable>
          </View>
        )}

        {/* Saved Places */}
        <View style={styles.savedWrap}>
          <Text style={styles.sectionLabel}>저장된 장소</Text>

          <View style={styles.savedList}>
            {savedPlaces.map((place, idx) => (
              <Pressable
                key={`${place.label}-${idx}`}
                onPress={() => handleSelectPlace(place)}
                style={styles.savedCard}
              >
                <View style={styles.savedIconBox}>
                  <Text style={styles.savedIcon}>{getPlaceIcon(place.icon)}</Text>
                </View>
                <View style={styles.savedBody}>
                  <Text style={styles.savedTitle}>{place.label}</Text>
                  <Text style={styles.savedSubtitle}>{place.address}</Text>
                </View>
              </Pressable>
            ))}

            <Pressable onPress={() => setAddDialogOpen(true)} style={styles.addCard}>
              <Text style={styles.addIcon}>＋</Text>
              <Text style={styles.addText}>새 장소 추가</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Add Place Modal */}
      <Modal
        visible={addDialogOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setAddDialogOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>새 장소 추가</Text>

            <Text style={styles.modalLabel}>아이콘</Text>
            <View style={styles.iconSelectorRow}>
              {(['home', 'work', 'pin'] as const).map((iconKey) => {
                const active = newPlaceIcon === iconKey;
                return (
                  <Pressable
                    key={iconKey}
                    onPress={() => setNewPlaceIcon(iconKey)}
                    style={[styles.iconSelectButton, active && styles.iconSelectButtonActive]}
                  >
                    <Text style={styles.iconSelectText}>{getPlaceIcon(iconKey)}</Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.modalLabel}>장소 이름</Text>
            <TextInput
              placeholder="예: 학교, 헬스장"
              placeholderTextColor="#94A3B8"
              value={newPlaceName}
              onChangeText={setNewPlaceName}
              style={styles.modalInput}
            />

            <Text style={styles.modalLabel}>주소 (지도 탭 후 자동 입력 가능)</Text>
            <TextInput
              placeholder="예: 서울시 마포구 ..."
              placeholderTextColor="#94A3B8"
              value={newPlaceAddress}
              onChangeText={setNewPlaceAddress}
              style={styles.modalInput}
            />

            <Pressable onPress={handleAddPlace} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>장소 저장</Text>
            </Pressable>

            <Pressable onPress={() => setAddDialogOpen(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#F8FAFC',
    fontSize: 28,
    lineHeight: 28,
    marginTop: -2,
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  searchWrap: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBox: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
  },
  clearText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  resultsWrap: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  resultList: {
    gap: 8,
    maxHeight: 240,
  },
  resultCard: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  resultIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultIcon: {
    fontSize: 18,
  },
  resultBody: {
    flex: 1,
  },
  resultTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  resultSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
  },
  emptyCard: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
  },
  emptySubText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  mapWrap: {
    marginHorizontal: 24,
    height: 208,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1F2937',
    marginBottom: 16,
  },
  mapBox: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mapTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  mapSubText: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 8,
  },
  mapCoordText: {
    color: '#CBD5E1',
    fontSize: 12,
    marginBottom: 8,
  },
  mapTapHint: {
    color: '#4F46E5',
    fontSize: 12,
    fontWeight: '600',
  },
  currentLocationWrap: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  currentLocationButton: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currentLocationIcon: {
    fontSize: 18,
  },
  currentLocationText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  savedWrap: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  savedList: {
    gap: 10,
  },
  savedCard: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1F2937',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  savedIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedIcon: {
    fontSize: 18,
  },
  savedBody: {
    flex: 1,
  },
  savedTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  savedSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
  },
  addCard: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#334155',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addIcon: {
    color: '#94A3B8',
    fontSize: 18,
  },
  addText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(2,6,23,0.72)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#0F172A',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  modalLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  iconSelectorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  iconSelectButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  iconSelectButtonActive: {
    borderColor: '#4F46E5',
    backgroundColor: 'rgba(79,70,229,0.12)',
  },
  iconSelectText: {
    fontSize: 20,
  },
  modalInput: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#F8FAFC',
    fontSize: 14,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  closeButton: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#1E293B',
  },
  closeButtonText: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '600',
  },
});