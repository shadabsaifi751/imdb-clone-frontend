import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import authReducer from './authSlice';
import sidebarReducer from './sidebarSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    sidebar: sidebarReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;