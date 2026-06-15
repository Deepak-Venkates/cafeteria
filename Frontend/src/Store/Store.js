import { configureStore } from '@reduxjs/toolkit';
import { persistStore , persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import CartReducer from './CartSlice';

const persistConfig = {
  key : 'root',
  storage
}

const rootReducer = combineReducers({
  Cart: CartReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
  reducer : persistedReducer
});

const persistor = persistStore(store);

export {store , persistor};