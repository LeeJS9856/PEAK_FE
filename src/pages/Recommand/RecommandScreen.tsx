import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import FloatingActionButton from '../../components/FloatingActionButton';
import GasIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRefuel } from '../../contexts/RefuelContext';
import LocationInputSection from '../../components/LocationInputSection';
import RouteOptionTabs, { RouteOption } from '../../components/RouteOptionTabs'; // 추가

type RootStackParamList = {
  Recommand: {
    selectedPlace?: string;
    type?: 'start' | 'end';
  };
};

const RecommandScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'Recommand'>>();

  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<RouteOption>('recommend'); // 탭 상태 추가
  
  const { refuelData } = useRefuel();

  useEffect(() => {
    const { selectedPlace, type } = route.params ?? {};
    if (selectedPlace) {
      if (type === 'start') setStartLocation(selectedPlace);
      else if (type === 'end') setEndLocation(selectedPlace);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 위치 입력 섹션 (분리된 컴포넌트) */}
      <LocationInputSection
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        endLocation={endLocation}
        setEndLocation={setEndLocation}
      />

      {/* 2. 경로 옵션 탭 (새로 추가됨) */}
      <RouteOptionTabs 
        selectedOption={selectedOption} 
        onSelect={setSelectedOption} 
      />

      {/* 주유 정보 요약 */}
      {refuelData && (
        <View style={styles.infoContainer}>
          <View style={styles.refuelInfoTextContent}>
            <Text style={styles.descText}>• 차량: {refuelData.car.name}</Text>
            <Text style={styles.descText}>• 연료량: {refuelData.fuelAmount} L</Text>
            <Text style={styles.descText}>• 목표금액: {refuelData.targetPrice}</Text>
          </View>
        </View>
      )}

      <FloatingActionButton
        position="bottom-right"
        onPress={() => navigation.navigate('RefuelInfo')}
        backgroundColor={COLORS.primary}
        size="medium"
      >
        <GasIcon name="gas-station-outline" size={35} color={COLORS.white} />
      </FloatingActionButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  infoContainer: {
    paddingHorizontal: 16,
  },
  refuelInfoTextContent: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.gray,
  },
  descText: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 22,
  },
});

export default RecommandScreen;
