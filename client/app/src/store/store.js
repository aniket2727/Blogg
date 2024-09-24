// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../features/email/emailSlice';
import tokenReducer from '../features/token/tokenSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    token: tokenReducer,
  },
});