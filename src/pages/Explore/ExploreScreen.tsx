// src/pages/Explore/ExploreScreen.tsx
import React, { useRef } from 'react';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useLocation } from '../../hooks/useLocation';
import FloatingActionButton from '../../components/FloatingActionButton';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import SearchBar from '../../components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExploreScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const { initialLocation, loading } = useLocation();

  const source = Platform.select({
    ios: require('./naver_map.html'),
    android: require('./naver_map.html'),
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
    <SafeAreaView 
      style={styles.container}
      edges={['top', 'left', 'right']}>
       
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
      <SearchBar
        placeholder="경로 검색"
        // onSearch={handleSearch}
      />
      
      <FloatingActionButton
        position="bottom-right"
        onPress={handleFloatingButtonPress}
        backgroundColor={COLORS.white}
        size="medium"
      >
        <Icon name="crosshair" size={28} color={COLORS.black} />
      </FloatingActionButton>
    </SafeAreaView>
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
