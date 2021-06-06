import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { Historyfeed } from '&screens/history/Historyfeed';
import { News } from '&screens/news/News';

const { Screen, Navigator } = createNativeStackNavigator();

export const HistoryfeedNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={Historyfeed} name="history/index" />
      <Screen component={News} name="history/news" />
    </Navigator>
  );
};
