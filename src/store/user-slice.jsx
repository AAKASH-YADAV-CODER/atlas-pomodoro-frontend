import { createSlice } from "@reduxjs/toolkit";

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    taskPoint: [],
    loggedInUser: null,
    error: null,
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { setLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
