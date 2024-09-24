// tokenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: '', // Adjust the initial state as per your requirement
  reducers: {
    setToken: (state, action) => action.payload,
    clearToken: () => null,
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export const selectToken = (state) => state.token;
export default tokenSlice.reducer;
