import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './src/constants/colors';
const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <RootNavigator />
    </SafeAreaView>
  );
};

export default App;
