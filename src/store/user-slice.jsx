import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Async actions
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const token = getAuthToken();
  const response = await fetch(`/api/v1/user/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.error("Session expired. Please login again.");
    navigate("/login");
    return;
  }

  // Handle other non-OK responses
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const res = await response.json();
  return res.data;
});

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
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setLoggedInUser } = userSlice.actions;

export default userSlice.reducer;
