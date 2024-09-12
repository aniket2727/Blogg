
// src/features/email/emailSlice.js
import { createSlice } from '@reduxjs/toolkit';

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    email: '',
  },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    clearEmail(state) {
      state.email = '';
    },
  },
});

export const { setEmail, clearEmail } = emailSlice.actions;

export default emailSlice.reducer;
