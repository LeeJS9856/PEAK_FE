import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DUMMY_STATIONS } from '../../constants/gasStations'; // 데이터 로드
import { useRefuel } from '../../contexts/RefuelContext';
import LocationInputSection from '../../components/LocationInputSection';
import RouteOptionTabs, { RouteOption } from '../../components/RouteOptionTabs';
import GasStationItem from '../../components/GasStationItem'; // 컴포넌트 로드
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import FloatingActionButton from '../../components/FloatingActionButton';
import GasIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  Recommand: {
    selectedPlace?: string;
    type?: 'start' | 'end';
  };
};

const RecommandScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<RouteOption>('recommend');
  const route = useRoute<RouteProp<RootStackParamList, 'Recommand'>>();
  const { refuelData } = useRefuel();

  
  const handleFloatingButtonPress = () => {
    navigation.navigate('RefuelInfo');
  };

  useEffect(() => {
    const { selectedPlace, type } = route.params ?? {};
    if (selectedPlace) {
      if (type === 'start') setStartLocation(selectedPlace);
      else if (type === 'end') setEndLocation(selectedPlace);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <LocationInputSection
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        endLocation={endLocation}
        setEndLocation={setEndLocation}
      />

      <RouteOptionTabs 
        selectedOption={selectedOption} 
        onSelect={setSelectedOption} 
      />

      {/* 주유소 리스트 영역 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {DUMMY_STATIONS.map((station) => (
          <GasStationItem key={station.id} station={station} />
        ))}

        {/* 기존 주유 조건 텍스트는 리스트 하단이나 적절한 곳에 배치 가능 */}
        {refuelData && (
          <View style={styles.infoContainer}>
            <View style={styles.refuelInfoTextContent}>
              <Text style={styles.descText}>• 차량: {refuelData.car.name} ({refuelData.fuelAmount}L)</Text>
              <Text style={styles.descText}>• 목표금액: {refuelData.targetPrice}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <FloatingActionButton
        position="bottom-right"
        onPress={() => navigation.navigate('RefuelInfo')}
        backgroundColor={COLORS.primary}
        size="medium"
      >
        <GasIcon name="gas-station-outline" size={35} color={COLORS.white} />
      </FloatingActionButton>
      {/* FAB 생략 */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: {
    paddingBottom: 100, // FAB 등에 마스크되지 않도록 여백
  },
  infoContainer: {
    margin: 16,
  },
  refuelInfoTextContent: {
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.gray,
  },
  descText: {
    fontSize: 13,
    color: COLORS.darkgray, // 리스트를 해치지 않게 조금 더 연하게
    lineHeight: 20,
  },
});

export default RecommandScreen;
