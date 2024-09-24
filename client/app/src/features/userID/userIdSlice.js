import { createSlice } from "@reduxjs/toolkit";

const userIdSlice = createSlice({
    name: "userId",
    initialState: {
        userId: ''
    },
    reducers: {
        setid(state, action) {
            state.userId = action.payload;
        },
        clearid(state) {
            state.userId = '';
        },
    },
});

// Corrected action names
export const { setid, clearid } = userIdSlice.actions;

// Optional: Create a selector to get the user ID
export const selectuserid = (state) => state.userId.userId;

export default userIdSlice.reducer;
