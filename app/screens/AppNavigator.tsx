import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NewsfeedNavigator } from '&screens/newsfeed/Newsfeed.navigator';
import { HistoryfeedNavigator } from '&screens/history/Historyfeed.navigator';
import { SourcesNavigator } from '&screens/sources/Sources.navigator';

const { Screen, Navigator } = createBottomTabNavigator();

export const AppNavigator = () => {
  const screenOptions = ({ route }: any): BottomTabNavigationOptions => ({
    tabBarIcon: ({ color, size }) => {
      let iconName = '';

      switch (route.name) {
        case 'newsfeed':
          iconName = 'home';
          break;
        case 'history':
          iconName = 'history';
          break;
        case 'sources':
          iconName = 'newspaper';
          break;
        default:
          iconName = 'cancel';
          break;
      }

      return (
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      );
    },
  });
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={screenOptions}
        backBehavior="initialRoute"
        tabBarOptions={{ showLabel: false }}>
        <Screen component={NewsfeedNavigator} name="newsfeed" />
        <Screen component={HistoryfeedNavigator} name="history" />
        <Screen component={SourcesNavigator} name="sources" />
      </Navigator>
    </NavigationContainer>
  );
};
