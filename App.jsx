import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider, Box, Text } from 'native-base';
import LoginPage from './src/screens/login';
import customTheme from './src/theme';
import AppNavigator from './src/navigations/AppNavigator';


const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={customTheme}>
        <AppNavigator />
        {/* <LoginPage /> */}
        {/* <Text>Hellow</Text> */}
       {/* <LoginScreen /> */}
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
