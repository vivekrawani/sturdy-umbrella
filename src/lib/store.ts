import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./features/counter/counterSlice";
import authReducer from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'



const persistConfigAuth = {
  key: 'auth', 
  storage,
};



const persistedReducer = persistReducer(
  persistConfigAuth,
  authReducer
);




export const store = configureStore({
  reducer: {
    countReducer,
    authReducer :persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
