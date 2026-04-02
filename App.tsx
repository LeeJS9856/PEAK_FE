import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <RootNavigator />
    </SafeAreaView>
  );
};

export default App;
