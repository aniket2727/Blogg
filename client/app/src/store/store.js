

// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../features/email/emailSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
  },
});
