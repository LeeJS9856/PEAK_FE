import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getFilteredData, SearchResult } from '../../utils/SearchUtils';

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState<string>('');
  const [filteredDataSource, setFilteredDataSource] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. lodash 대신 사용할 타이머 참조 변수
  // ReturnType<typeof setTimeout>을 사용하면 Node/Browser 환경 차이 없이 정확한 타입을 가집니다.
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * 2. 실제 검색을 수행하는 로직
   */
  const performSearch = async (text: string) => {
    if (!text.trim()) {
      setFilteredDataSource([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const newData = await getFilteredData(text);
      setFilteredDataSource(newData);
    } catch (error) {
      console.error('Search Error:', error);
      setFilteredDataSource([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 3. 입력값이 변경될 때 호출되는 핸들러 (직접 구현한 디바운스 로직)
   */
  const onChangeText = (text: string) => {
    setQuery(text);

    // 이전 타이머가 작동 중이라면 취소 (글자를 계속 치는 동안은 검색 실행 안함)
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!text.trim()) {
      setFilteredDataSource([]);
      setIsLoading(false);
      return;
    }

    // 500ms 동안 입력이 멈추면 검색 실행
    debounceTimer.current = setTimeout(() => {
      performSearch(text);
    }, 500);
  };

  /**
   * 4. 컴포넌트 언마운트 시 타이머 정리 (메모리 누수 방지)
   */
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // ... (renderItem, renderEmptyState, return 부분은 이전과 동일)

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => console.log('Selected:', item.name)}
    >
      <View style={styles.iconCircle}>
        <Icon name="location-sharp" size={18} color={COLORS.darkgray} />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemAddress} numberOfLines={1}>{item.address}</Text>
      </View>
      <Text style={styles.itemCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={COLORS.black} />
          <Text style={styles.emptyText}>검색 중...</Text>
        </View>
      );
    }
    if (query.trim() && filteredDataSource.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Icon name="search" size={48} color={COLORS.lightgray} />
          <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.layout}>
        <View style={styles.searchBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={20} color={COLORS.black} style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={query}
            placeholder="장소, 주소 검색"
            placeholderTextColor={COLORS.placeholder || '#999'}
            autoFocus={true}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => onChangeText('')}>
              <Icon name="close-circle" size={20} color={COLORS.placeholder} />
            </TouchableOpacity>
          )}
        </View>
        {filteredDataSource.length > 0 ? (
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
          />
        ) : (
          renderEmptyState()
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // 기존 스타일 유지
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  layout: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.lightgray,
  },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: COLORS.black, paddingVertical: 0 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: COLORS.lightgray },
  iconCircle: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemTextContainer: { flex: 1 },
  itemName: { fontSize: 16, color: COLORS.black },
  itemAddress: { fontSize: 13, color: COLORS.darkgray },
  itemCategory: { fontSize: 12, color: COLORS.darkgray, marginLeft: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 14, color: COLORS.darkgray, marginTop: 12 },
});

export default SearchScreen;
