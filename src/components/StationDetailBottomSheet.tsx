import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform, Image
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/colors';
import { useBottomSheet } from '../hooks/useBottomSheet';
import { BRAND_ICONS } from '../constants/brandIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_SHEET_HEIGHT = SCREEN_HEIGHT * 0.35; // 디자인이 커졌으므로 기본높이 약간 조절
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT * 0.8;

interface Props {
  station: any;
  onClose?: () => void;
}


const StationDetailBottomSheet: React.FC<Props> = ({ station }) => {
  const brandIcon = BRAND_ICONS[station.brand] || require('../assets/images/sk.png');
  const { panY, panHandlers } = useBottomSheet({
    minHeight: MIN_SHEET_HEIGHT,
    maxHeight: MAX_SHEET_HEIGHT,
  });

  return (
    <Animated.View
      style={[styles.bottomSheet, { top: panY }]}
      {...panHandlers}
    >
      <View style={styles.handleBar} />

      <View style={styles.sheetContent}>
        {/* 1. 최상단: 브랜드아이콘 - 주유소이름 - 거리 */}
        <View style={styles.topHeader}>
          <Image source={brandIcon} style={styles.brandIcon} />
          <Text style={styles.stationName}>{station.name || '피크 주유소'}</Text>
          <Text style={styles.distanceBadge}>{station.distance || '1.8km'}</Text>
        </View>

        {/* 2. 길안내 - 공유 버튼 세로 구분선 없이 가로 나열 */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.mainActionButton}>
            <Ionicon name="navigate" size={20} color={COLORS.white} />
            <Text style={[styles.actionText, { color: COLORS.white }]}>길안내</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subActionButton}>
            <Ionicon name="share-outline" size={20} color={COLORS.black} />
            <Text style={styles.actionText}>공유</Text>
          </TouchableOpacity>
        </View>

        {/* 3. 주유 가격 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주유 가격</Text>
          <View style={styles.grayBox}>
            <Text style={styles.priceLabel}>휘발유</Text>
            <Text style={styles.priceValue}>
              <Text style={styles.boldText}>{station.pricePerLiter || '1,865'}</Text>원
            </Text>
          </View>
        </View>

        {/* 4. 주유 정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주유 정보</Text>
          <View style={[styles.grayBox, { flexDirection: 'column', gap: 12 }]}>
            <View style={styles.infoRow}>
              <Text style={styles.infoDesc}>주유소를 경유하는데 생긴 추가 거리</Text>
              <Text style={styles.infoVal}>10km</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoDesc}>주유소를 경유하는데 걸리는 비용</Text>
              <Text style={styles.infoVal}>약 950원</Text>
            </View>
            <View style={[styles.infoRow, styles.topBorder]}>
              <Text style={styles.totalLabel}>총 주유 비용</Text>
              <Text style={styles.totalVal}>약 55,850원</Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    zIndex: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: { elevation: 20 },
    }),
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.lightgray,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  sheetContent: { flex: 1 },
  // 1. 헤더 스타일
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  distanceBadge: {
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 6,
  },
  // 2. 버튼 스타일
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },
  mainActionButton: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  subActionButton: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.black,
  },
  // 3. 섹션 공통
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  grayBox: {
    backgroundColor: COLORS.backgroundgray,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 15,
    color: COLORS.black,
  },
  priceValue: {
    fontSize: 16,
    color: COLORS.black,
  },
  boldText: {
    fontSize: 20,
    fontWeight: '800', // 더 강조된 볼드
    color: COLORS.primary,
  },
  // 4. 정보 박스 상세 정렬
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoDesc: {
    fontSize: 14,
    color: COLORS.darkgray,
    textAlign: 'left',
    marginRight: 15,
    flex: 1,
  },
  infoVal: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '600',
    textAlign: 'right',
  },
  topBorder: {
    marginTop: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightgray,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 20,
  },
  totalVal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  brandIcon: {
      width: 20,
      height: 20,
      marginRight: 12,
    }
});

export default StationDetailBottomSheet;
