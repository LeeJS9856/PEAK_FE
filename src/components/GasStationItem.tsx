import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { COLORS } from '../constants/colors';
import { GasStation } from '../constants/gasStations';
import { BRAND_ICONS } from '../constants/brandIcons';

interface GasStationItemProps {
  station: GasStation;
}

const GasStationItem: React.FC<GasStationItemProps> = ({ station }) => {
  // 브랜드 매핑이 없으면 기본 로고 사용
  const brandIcon = BRAND_ICONS[station.brand] || require('../assets/images/sk.png');

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.headerRow}>
          {/* 에러가 발생하던 이미지 스타일 적용 부분 */}
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
          <View
            style={styles.tagBadge}>
            <Text style={styles.tagText}>{station.tag}</Text>
          </View>
        )}
        <Text style={styles.totalPriceText}>
          총 {station.totalPrice.toLocaleString()}원
        </Text>
      </View>
    </View>
  );
};

// 각 스타일 객체에 명확한 타입을 지정하여 'No overload matches this call' 에러 방지
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingHorizontal:23,
    borderBottomWidth: 10,
    borderBottomColor: COLORS.lightgray,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  } as ViewStyle, // 명시적 ViewStyle 지정

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
  } as ImageStyle, // ★ 핵심: Image 전용 스타일임을 명시

  stationName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  } as TextStyle,

  fuelTypeText: {
    fontSize: 12,
    fontWeight:'300',
    marginTop:5,
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
    fontWeight: '800',
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
    fontWeight: '700', // 'Bold' 대신 숫자나 'bold' 사용 (타입 오류 예방)
  } as TextStyle,

  totalPriceText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom:10,
  } as TextStyle,
});

export default GasStationItem;
