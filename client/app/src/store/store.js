// src/store/store.js
// store.js
import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from '../features/token/tokenSlice';
import userIdSlice from '../features/userID/userIdSlice';
import emailSlice from '../features/email/emailSlice';

const store = configureStore({
  reducer: {
    token: tokenSlice,
    userId: userIdSlice,
    useremail:emailSlice,
  },
});

export default store;
