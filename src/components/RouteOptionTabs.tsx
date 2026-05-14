import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

// 탭 타입 정의
export type RouteOption = 'recommend' | 'shortest' | 'cheapest';

interface RouteOptionTabsProps {
  selectedOption: RouteOption;
  onSelect: (option: RouteOption) => void;
}

const RouteOptionTabs: React.FC<RouteOptionTabsProps> = ({ selectedOption, onSelect }) => {
  const options: { id: RouteOption; label: string }[] = [
    { id: 'recommend', label: '종합 추천' },
    { id: 'shortest', label: '최단 거리' },
    { id: 'cheapest', label: '최저가' },
  ];

  return (
    <View style={styles.tabContainer}>
      {options.map((option) => {
        const isSelected = selectedOption === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[styles.tabItem, isSelected && styles.selectedTabItem]}
            onPress={() => onSelect(option.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightgray, // 하단 전체 구분선
    paddingHorizontal: 22,
  },
  tabItem: {
    paddingBottom: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent', // 비활성 상태일 땐 투명
  },
  selectedTabItem: {
    borderBottomColor: COLORS.primary, // 활성 상태일 때 강조 색상 하단바
  },
  tabText: {
    fontSize: 14,
    fontWeight: '300',
    color: COLORS.darkgray,
  },
  selectedTabText: {
    color: COLORS.primary, // 활성 상태일 때 텍스트 색상
    fontWeight: '700',
  },
});

export default RouteOptionTabs;
