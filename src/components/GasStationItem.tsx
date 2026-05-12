import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from 'react-native'; // TouchableOpacity 추가
import { COLORS } from '../constants/colors';
import { GasStation } from '../constants/gasStations';
import { BRAND_ICONS } from '../constants/brandIcons';

interface GasStationItemProps {
  station: GasStation;
  onPress: () => void; // ★ onPress prop 타입 정의 추가
}

const GasStationItem: React.FC<GasStationItemProps> = ({ station, onPress }) => {
  // 브랜드 매핑이 없으면 기본 로고 사용
  const brandIcon = BRAND_ICONS[station.brand] || require('../assets/images/sk.png');

  return (
    // ★ View를 TouchableOpacity로 변경하고 onPress 연결
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={styles.headerRow}>
          <Image source={brandIcon} style={styles.brandIcon} />
          <Text style={styles.stationName}>{station.name}</Text>
        </View>

        <Text style={styles.fuelTypeText}>{station.fuelType}</Text>

        <View style={styles.priceDistanceRow}>
          <Text style={styles.pricePerLiterText}>
            {station.pricePerLiter.toLocaleString()}원
          </Text>
          <Text style={styles.distanceText}>{station.distance}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        {station.tag && (
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{station.tag}</Text>
          </View>
        )}
        <Text style={styles.totalPriceText}>
          총 {station.totalPrice.toLocaleString()}원
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingHorizontal: 23,
    borderBottomWidth: 10,
    borderBottomColor: COLORS.lightgray,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  } as ViewStyle,

  leftContent: {
    flex: 1,
  } as ViewStyle,

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  } as ViewStyle,

  brandIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  } as ImageStyle,

  stationName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  } as TextStyle,

  fuelTypeText: {
    fontSize: 12,
    fontWeight: '300',
    marginTop: 5,
    color: COLORS.darkgray,
  } as TextStyle,

  priceDistanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  } as ViewStyle,

  pricePerLiterText: {
    lineHeight: 26,
    textAlignVertical: 'center',
    fontSize: 24,
    fontWeight: '800', // 가독성을 위해 FontWeight 타입 준수
    color: COLORS.black,
    marginRight: 12,
  } as TextStyle,

  distanceText: {
    fontSize: 14,
    color: COLORS.darkgray,
    fontWeight: '400',
  } as TextStyle,

  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  } as ViewStyle,

  tagBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    marginBottom: 6,
  } as ViewStyle,

  tagText: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: '700',
  } as TextStyle,

  totalPriceText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 10,
  } as TextStyle,
});

export default GasStationItem;
