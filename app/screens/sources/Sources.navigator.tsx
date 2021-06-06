import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { Sources } from '&screens/sources/Sources';
import { Newsfeed } from '&screens/sources/Newsfeed';
import { News } from '&screens/news/News';

const { Screen, Navigator } = createNativeStackNavigator();

export const SourcesNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={Sources} name="sources/index" />
      <Screen component={Newsfeed} name="sources/newsfeed" />
      <Screen component={News} name="sources/news" />
    </Navigator>
  );
};
