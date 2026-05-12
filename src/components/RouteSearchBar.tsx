import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

interface RouteSearchBarProps {
  startLocation: string;
  endLocation: string;
}

const RouteSearchBar: React.FC<RouteSearchBarProps> = ({ startLocation, endLocation }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {/* 1. 왼쪽 뒤로가기 버튼 */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color={COLORS.black} />
        </TouchableOpacity>

        {/* 2. 중앙 경로 정보 영역 */}
        <View style={styles.contentWrapper}>
          <View style={styles.textSection}>
            <Text 
              style={styles.locationText} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {startLocation || '출발지'}
            </Text>
          </View>

          {/* 중앙 화살표를 위한 빈 공간 확보 (30px) */}
          <View style={{ width: 30 }} />

          <View style={styles.textSection}>
            <Text 
              style={styles.locationText} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {endLocation || '도착지'}
            </Text>
          </View>
        </View>

        {/* 3. 정확한 중앙에 위치하는 화살표 아이콘 */}
        <View style={styles.absoluteCenterArrow} pointerEvents="none">
          <Icon name="arrow-forward" size={16} color={COLORS.gray} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 56,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    padding: 8,
    zIndex: 11,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  textSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
  },
  absoluteCenterArrow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
});

export default RouteSearchBar;
