// src/pages/Explore/StationDetailScreen.tsx
import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useLocation } from '../../hooks/useLocation';
import { useRoute, RouteProp } from '@react-navigation/native';
import FloatingActionButton from '../../components/FloatingActionButton';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import RouteSearchBar from '../../components/RouteSearchBar';
import StationDetailBottomSheet from '../../components/StationDetailBottomSheet';

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

  // ---------- WebView ----------
  const source = Platform.select({
    ios: require('../Explore/naver_map.html'),
    android: require('../Explore/naver_map.html'),
  });

  const injectedJavaScript = initialLocation
    ? `window.initialLocation = {latitude: ${initialLocation.latitude}, longitude: ${initialLocation.longitude}};`
    : '';

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('📨 WebView에서 받은 메시지:', data);
  };

  const handleFloatingButtonPress = () => {
    if (initialLocation && webViewRef.current) {
      const script = `
        if (window.map) {
          const location = new naver.maps.LatLng(${initialLocation.latitude}, ${initialLocation.longitude});
          window.map.setCenter(location);
          window.map.setZoom(16);
        }
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
    <View style={styles.container}>
      {/* 지도 */}
      <WebView
        ref={webViewRef}
        source={source}
        javaScriptEnabled
        domStorageEnabled
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        style={styles.webview}
      />

      {/* 상단 검색 바 */}
      <RouteSearchBar startLocation={startLocation} endLocation={endLocation} />

      {/* 현재 위치 버튼 (바텀시트 위에 겹치지 않게) */}
      <View style={styles.fabWrapper}>
        <FloatingActionButton
          position="bottom-right"
          onPress={handleFloatingButtonPress}
          backgroundColor={COLORS.white}
          size="medium"
        >
          <Icon name="crosshair" size={28} color={COLORS.black} />
        </FloatingActionButton>
      </View>

      {/* 하단 BottomSheet */}
      <StationDetailBottomSheet station={station} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  webview: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  // 버튼을 BottomSheet 최소 높이 위에 위치시키기 위한 offset
  fabWrapper: {
    position: 'absolute',
    bottom: (Dimensions.get('window').height * 0.3) + 20,
    right: 0,
    zIndex: 9,
  },
});

export default StationDetailScreen;
