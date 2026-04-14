// src/pages/Explore/ExploreScreen.tsx
import React, { useRef } from 'react';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useLocation } from '../../hooks/useLocation';
import FloatingActionButton from '../../components/FloatingActionButton';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';

const ExploreScreen = () => {
  const webViewRef = useRef(null);
  const { initialLocation, loading } = useLocation();

  const source = Platform.select({
    ios: require('./naver_map.html'),
    android: require('./naver_map.html'),
  });

  // 위치 정보 주입
  const injectedJavaScript = initialLocation
    ? `window.initialLocation = {latitude: ${initialLocation.latitude}, longitude: ${initialLocation.longitude}};`
    : '';

  // 지도에서 선택한 좌표 수신
  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log('📨 WebView에서 받은 메시지:', data);
  };

  // 플로팅 버튼 클릭 핸들러
  const handleFloatingButtonPress = () => {
    console.log('🎯 플로팅 버튼 클릭됨!');
    // 여기에 원하는 기능 추가
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
      
      {/* 플로팅 버튼 - 왼쪽 아래 배치 */}
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

export default ExploreScreen;
