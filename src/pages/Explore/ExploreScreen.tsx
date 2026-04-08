import React, { useRef } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const ExploreScreen = () => {
  const webViewRef = useRef(null);

  // 안드로이드와 iOS 경로 처리
  const source = Platform.select({
    ios: require('./naver_map.html'), // iOS는 파일 상대경로
    android: { uri: 'file:///android_asset/naver_map.html' }, // 안드로이드는 assets 경로
  });

  const onMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log("선택한 좌표:", data);
  };

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
        onMessage={onMessage} // 지도에서 보낸 데이터 수신
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
