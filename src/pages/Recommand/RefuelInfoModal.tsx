import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const RefuelInfoModal = () => {
  const navigation = useNavigation();
  
  // 애니메이션 값 설정
  const fadeAnim = useRef(new Animated.Value(0)).current; // 배경 투명도
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current; // 모달 위치 (화면 밖에서 시작)

  useEffect(() => {
    // 배경 페이드인 + 모달 슬라이드업 동시 실행
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    // 닫을 때는 반대로 실행 후 navigation.goBack()
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 배경: 점점 어두워지는 효과 (Fade) */}
      <Animated.View 
        style={[
          styles.overlay, 
          { opacity: fadeAnim }
        ]} 
      >
        <Pressable style={styles.outside} onPress={handleClose} />
      </Animated.View>

      {/* 2. 모달 컨텐츠: 아래에서 올라오는 효과 (Slide) */}
      <Animated.View 
        style={[
          styles.modalContent,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <View style={styles.handle} />
        
        <View style={styles.header}>
          <Text style={styles.title}>주유 및 차량 정보</Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            현재 차량의 주유 상태와 목표 주유량을 입력해주세요.
          </Text>
          
          <TouchableOpacity style={styles.confirmButton} onPress={handleClose}>
            <Text style={styles.confirmText}>설정 완료</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // 전체 화면을 다 차지해야 함
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  overlay: {
    // 배경만 어둡게
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  outside: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: 300, // 높이는 내용에 맞게 조절 가능
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: COLORS.lightgray,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RefuelInfoModal;
