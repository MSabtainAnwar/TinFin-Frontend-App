// redux/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import userSlice from './slices/userSlice';
// import socketSlice from './slices/socketSlice';
import chatSlice from './slices/chatSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userSlice,
  // socket: socketSlice,
  chat: chatSlice
}); 

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store); 

export { store, persistor };
