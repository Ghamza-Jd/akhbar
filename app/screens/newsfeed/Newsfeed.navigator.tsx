import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { Newsfeed } from '&screens/newsfeed/Newsfeed';
import { News } from '&screens/news/News';

const { Screen, Navigator } = createNativeStackNavigator();

export const NewsfeedNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={Newsfeed} name="newsfeed/index" />
      <Screen component={News} name="newsfeed/news" />
    </Navigator>
  );
};
