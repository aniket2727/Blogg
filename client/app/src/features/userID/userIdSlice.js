// userIdSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userIdSlice = createSlice({
  name: 'userId',
  initialState: null, // Adjust the initial state as per your requirement
  reducers: {
    setUserId: (state, action) => action.payload,
    clearUserId: () => null,
  },
});

export const { setUserId, clearUserId } = userIdSlice.actions;
export const selectuserid = (state) => state.userId;
export default userIdSlice.reducer;
