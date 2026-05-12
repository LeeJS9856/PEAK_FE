// src/pages/Explore/StationDetailScreen.tsx
import React, { useRef } from 'react';
import { StyleSheet, View, Platform, ActivityIndicator, Text } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useLocation } from '../../hooks/useLocation';
import { useRoute, RouteProp } from '@react-navigation/native';
import FloatingActionButton from '../../components/FloatingActionButton';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import RouteSearchBar from '../../components/RouteSearchBar';

type ParamList = {
  StationDetail: {
    station: any;
    startLocation: string;
    endLocation: string;
  };
};

const StationDetailScreen = () => {
    const route = useRoute<RouteProp<ParamList, 'StationDetail'>>();
    const webViewRef = useRef<WebView>(null);
    const { initialLocation, loading } = useLocation();

    const { station, startLocation, endLocation } = route.params;

    const source = Platform.select({
        ios: require('../Explore/naver_map.html'),
        android: require('../Explore/naver_map.html'),
    });

  // 위치 정보 초기 주입
  const injectedJavaScript = initialLocation
    ? `window.initialLocation = {latitude: ${initialLocation.latitude}, longitude: ${initialLocation.longitude}};`
    : '';

  // 지도에서 선택한 좌표 수신
  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('📨 WebView에서 받은 메시지:', data);
  };

  // 플로팅 버튼 클릭 - 지도 갱신 및 중앙 이동
  const handleFloatingButtonPress = () => {
    if (initialLocation && webViewRef.current) {
      console.log('🎯 현재 위치로 이동:', initialLocation);
      
      const script = `
        window.initialLocation = {latitude: ${initialLocation.latitude}, longitude: ${initialLocation.longitude}};
        (function() {
          if (window.map) {
            const location = new naver.maps.LatLng(${initialLocation.latitude}, ${initialLocation.longitude});
            window.map.setCenter(location);
            window.map.setZoom(16);
          }
        })();
        true;
      `;
      
      webViewRef.current.injectJavaScript(script);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View
      style={styles.container}>
       
      <WebView
        ref={webViewRef}
        source={source}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccess={true}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        style={styles.webview}
      />
      <RouteSearchBar 
            startLocation={startLocation} 
            endLocation={endLocation} 
        />
      <View>
        <Text>출발지: {startLocation}</Text>
        <Text>도착지: {endLocation}</Text>
        <Text>선택된 주유소: {station.name}</Text>
        <Text>가격: {station.pricePerLiter}원</Text>
      </View>

      
      
      <FloatingActionButton
        position="bottom-right"
        onPress={handleFloatingButtonPress}
        backgroundColor={COLORS.white}
        size="medium"
      >
        <Icon name="crosshair" size={28} color={COLORS.black} />
      </FloatingActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StationDetailScreen;
