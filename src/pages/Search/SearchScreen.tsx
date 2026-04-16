import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Text, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getFilteredData, SearchResult } from '../../utils/SearchUtils';

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState<string>('');
  const [filteredDataSource, setFilteredDataSource] = useState<SearchResult[]>([]);

  const searchFilterFunction = (text: string) => {
    setQuery(text);
    if (text) {
      const newData = getFilteredData(text);
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource([]);
    }
  };

  const renderItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => console.log(item.name)}
    >
      <View style={styles.iconCircle}>
        <Icon name="location-sharp" size={18} color={COLORS.darkgray} />
      </View>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemAddress}>{item.address}</Text>
      </View>
      <Text style={styles.itemCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.layout}>
        {/* 검색창 상단바 */}
        <View style={styles.searchBox}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Icon name="chevron-back" size={25} color={COLORS.black} style={styles.searchIcon} />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            onChangeText={(text) => searchFilterFunction(text)}
            value={query}
            placeholder="장소, 주소 검색"
            placeholderTextColor={COLORS.placeholder || '#999'}
            autoFocus={true}
          />

          {query.length > 0 && (
            <TouchableOpacity onPress={() => searchFilterFunction('')}>
              <Icon name="close-circle" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>

        {/* 자동완성 결과 리스트 */}
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled" // 리스트 클릭 시 키보드 닫힘 방지
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  layout: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.white,
  },
  searchBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.lightgray,
  },
  searchIcon: { marginRight: 8 },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 5,
  },
  listContainer: { paddingVertical: 10 },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.lightgray,
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemTextContainer: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '400', color: COLORS.black },
  itemAddress: { fontSize: 13, color: COLORS.darkgray, marginTop: 2 },
  itemCategory: { fontSize: 12, color: COLORS.darkgray, marginLeft: 10 },
});

export default SearchScreen;
