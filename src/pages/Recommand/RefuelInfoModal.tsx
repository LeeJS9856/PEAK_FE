import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { CAR_LIST } from '../../constants/cars';
import { useRefuel } from '../../contexts/RefuelContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const RefuelInfoModal = () => {
  const navigation = useNavigation<any>(); 
  
  // 상태 관리
  const [selectedCar, setSelectedCar] = useState(CAR_LIST[0]);
  const [showSelector, setShowSelector] = useState(false); // 셀렉터 노출 여부
  const [fuelAmount, setFuelAmount] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const { setRefuelData } = useRefuel();

  // 애니메이션 관련
  const fadeAnim = useRef(new Animated.Value(0)).current; // 전체 배경 Fade
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current; // 메인 모달 Slide
  const selectorAnim = useRef(new Animated.Value(300)).current; // 셀렉터 Slide (높이 300에서 시작)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();
  }, []);

  // 셀렉터 열기/닫기 애니메이션
  const toggleSelector = (show: boolean) => {
    setShowSelector(show);
    Animated.timing(selectorAnim, {
      toValue: show ? 0 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: SCREEN_HEIGHT, duration: 300, useNativeDriver: true }),
    ]).start(() => navigation.goBack());
  };

  const addPrice = (amount: number | 'full') => {
    if (amount === 'full') { setTargetPrice('가득'); return; }
    const current = parseInt(targetPrice.replace(/[^0-9]/g, '')) || 0;
    setTargetPrice(`${(current + amount).toLocaleString()}원`);
  };

  const handleApply = () => {
  // 전역 상태에 저장
  setRefuelData({
    car: selectedCar,
    fuelAmount,
    targetPrice,
  });

  // 애니메이션 후 무조건 goBack
  Animated.parallel([
    Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    Animated.timing(slideAnim, { toValue: SCREEN_HEIGHT, duration: 300, useNativeDriver: true }),
  ]).start(() => navigation.goBack());
};

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 뒷배경 (Dim) */}
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Pressable style={styles.outside} onPress={handleClose} />
      </Animated.View>

      {/* 2. 메인 모달 바디 */}
      <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>차량 및 주유 정보</Text>
            <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={28} color={COLORS.black} />
            </TouchableOpacity>
        </View>

        <View style={styles.form}>
            <Text style={styles.label}>차량 선택</Text>
            <TouchableOpacity 
                style={styles.vehicleSelector} 
                onPress={() => toggleSelector(true)}
            >
                <Text style={styles.vehicleName}>{selectedCar.name}</Text>
                <Ionicons name="chevron-down" size={20} color={COLORS.gray} />
            </TouchableOpacity>

            <Text style={styles.label}>잔여 연료량 (L)</Text>
            <TextInput 
                style={styles.input}
                placeholder="잔여 연료량을 입력하세요"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="numeric"
                value={fuelAmount}
                onChangeText={setFuelAmount}
            />

            <Text style={styles.label}>목표 주유 금액</Text>
            <TextInput 
                style={styles.input}
                placeholder="금액을 입력하세요"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="numeric"
                value={targetPrice}
                onChangeText={setTargetPrice}
            />

            <View style={styles.priceTagContainer}>
                {['+1만원', '+3만원', '+5만원', '가득'].map((label) => (
                    <TouchableOpacity 
                        key={label} 
                        style={styles.priceTag}
                        onPress={() => {
                            if(label === '가득') addPrice('full');
                            else addPrice(parseInt(label.replace(/[^0-9]/g, '')) * 10000);
                        }}
                    >
                        <Text style={styles.priceTagText}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>적용하기</Text>
            </TouchableOpacity>
        </View>

        {/* 3. 차량 선택 셀렉터 레이어 (모달 안의 모달 느낌) */}
        {showSelector && (
            <View style={StyleSheet.absoluteFill}>
                <Pressable style={styles.selectorOverlay} onPress={() => toggleSelector(false)} />
                <Animated.View style={[styles.selectorSheet, { transform: [{ translateY: selectorAnim }] }]}>
                    <ScrollView style={styles.selectorList}>
                        {CAR_LIST.map((item) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={[styles.selectorItem, selectedCar.id === item.id && styles.selectedItem]}
                                onPress={() => {
                                    setSelectedCar(item);
                                    toggleSelector(false); // 선택 즉시 닫으려면 주석 해제
                                }}
                            >
                                <Text style={[styles.itemText, selectedCar.id === item.id && styles.selectedItemText]}>
                                    {item.name}
                                </Text>
                                {selectedCar.id === item.id && (
                                    <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Animated.View>
            </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  outside: { flex: 1 },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
    overflow: 'hidden', // 셀렉터가 모달 밖으로 나가지 않게 함
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  form: { marginTop: 10 },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 15 },
  vehicleSelector: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#EEE', borderRadius: 10, padding: 15, backgroundColor: COLORS.white,
  },
  vehicleName: { fontSize: 16, color: COLORS.black },
  input: {
    borderWidth: 1, borderColor: '#EEE', borderRadius: 10, padding: 15, fontSize: 16,
    color: COLORS.black, backgroundColor: COLORS.white,
  },
  priceTagContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  priceTag: {
    flex: 1, borderWidth: 1, borderColor: '#EEE', borderRadius: 8, paddingVertical: 10,
    alignItems: 'center', marginHorizontal: 3, backgroundColor: COLORS.white,
  },
  priceTagText: { fontSize: 13, color: '#666' },
  applyButton: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  applyButtonText: { color: COLORS.white, fontSize: 17, fontWeight: 'bold' },

  /* --- 셀렉터 전용 스타일 --- */
  selectorOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  selectorSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 320,
    backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    elevation: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1, shadowRadius: 10, paddingHorizontal: 20,
  },
  selectorHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  selectorTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  doneText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  selectorList: { marginVertical: 10 },
  selectorItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 15, paddingHorizontal: 5,
  },
  itemText: { fontSize: 16, color: '#333' },
  selectedItemText: { color: COLORS.primary, fontWeight: 'bold' },
  selectedItem: { backgroundColor: '#F8F9FF', borderRadius: 8 },
});

export default RefuelInfoModal;
