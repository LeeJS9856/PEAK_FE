import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const ExploreScreen = () => {
  const webViewRef = useRef(null);

  // GitHub Pages URL로 변경
  const source = {
    uri: 'https://leeJS9856.github.io/PEAK_FE/index.html',
  };

  const onMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log("선택한 좌표:", data);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={source}
        javaScriptEnabled={true}
        domStorageEnabled={true}
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
