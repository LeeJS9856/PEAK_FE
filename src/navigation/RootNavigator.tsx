import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExploreScreen from '../pages/Explore/ExploreScreen';
import MyVehicleScreen from '../pages/MyVehicle/MyVehicleScreen';
import MyInfoScreen from '../pages/Info/InfoScreen';

const MyTabs = createBottomTabNavigator({
  screens: {
    Explore: {
      screen: ExploreScreen,
      options: {
        title: '탐색',
        tabBarLabel: '탐색',
      },
    },
    MyVehicle: {
      screen: MyVehicleScreen,
      options: {
        title: '내 차량',
        tabBarLabel: '내 차량',
      },
    },
    MyInfo: {
      screen: MyInfoScreen,
      options: {
        title: '내 정보',
        tabBarLabel: '내 정보',
      },
    },
  },
  screenOptions: {
    headerShown: true,
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#ffffff',
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: 18,
    },
    tabBarStyle: {
      backgroundColor: '#ffffff',
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
    },
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: '#999999',
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return <Navigation />;
}
