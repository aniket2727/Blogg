// src/features/token/tokenSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = '';
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

// Optional: Create a selector to get the token
export const selectToken = (state) => state.token.token;

export default tokenSlice.reducer;