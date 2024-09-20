// App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigations/AppNavigator';
import customTheme from './src/theme';
import { ActivityIndicator } from 'react-native';


const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator size="large" color="#0000ff" />} persistor={persistor}>
          <NativeBaseProvider theme={customTheme}>
            <AppNavigator />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
