// App.js
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigations/AppNavigator';
import customTheme from './src/theme';
import { ActivityIndicator } from 'react-native';
import { io } from 'socket.io-client';
// import { setSocket } from './src/redux/slices/socketSlice'; 
import { setOnlineUsers } from './src/redux/slices/chatSlice'; 
const AppContent = () => {
  const user = useSelector(state => state.user.users); 
  const dispatch = useDispatch(); 

  useEffect(() => {
    let socket;

    if (user) {
      socket = io('http://10.0.2.2:8000');

      // Dispatch the socket instance to Redux
      // dispatch(setSocket(socket));

      // Join the socket with the userId
      socket.emit('join', { userId: user._id });

      // Listen for the 'online-users' event and dispatch the online users to Redux
      socket.on('online-users', (onlineUsers) => {
        console.log('Online Users:', onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));

      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user, dispatch]);

  return <AppNavigator />;
};

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" color="#0000ff" />} 
        persistor={persistor}
      >
        <NativeBaseProvider theme={customTheme}>
          <AppContent />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  </SafeAreaProvider>
);

export default App;
