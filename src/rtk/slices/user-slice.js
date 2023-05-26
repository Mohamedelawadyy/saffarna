import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "userSlice/fetchUser",
  async (username) => {
    const data = await fetch(`http://localhost:9000/users/${username}`);
    const jsonData = await data.json();
    return jsonData;
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const userReducer = userSlice.reducer;
