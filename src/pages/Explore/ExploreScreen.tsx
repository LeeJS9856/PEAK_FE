import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NaverMapView } from '@mj-studio/react-native-naver-map';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <NaverMapView/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default ExploreScreen;
