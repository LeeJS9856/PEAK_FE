import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants/colors';

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
      backgroundColor: COLORS.white,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightgrey,
    },
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: 18,
    },
    tabBarStyle: {
      backgroundColor: COLORS.white,
      borderTopWidth: 1,
      borderTopColor: COLORS.lightgrey,
    },
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.black,
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
