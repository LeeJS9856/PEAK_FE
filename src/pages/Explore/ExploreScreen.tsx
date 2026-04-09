import React, { useRef } from 'react';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { useLocation } from '../../hooks/useLocation';

const ExploreScreen = () => {
  const webViewRef = useRef(null);
  const { initialLocation, loading } = useLocation();

  const source = Platform.select({
    ios: require('./naver_map.html'),
    android: require('./naver_map.html'),
     //android: { uri: 'file:///android_asset/naver_map.html' },
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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={source}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccess={true}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExploreScreen;
