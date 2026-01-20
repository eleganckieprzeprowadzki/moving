import 'react-native-gesture-handler'; // MUSI BYĆ PIERWSZY!
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
