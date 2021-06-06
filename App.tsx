import React from 'react';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';

import { AppNavigator } from '&screens/AppNavigator';

enableScreens();

const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <AppNavigator />
    </React.Fragment>
  );
};

export { App };
