import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
