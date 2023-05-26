import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooking = createAsyncThunk(
  "booking-slice/fetchBooking",
  async (username) => {
    const data = await fetch(`http://localhost:9000/package`);
    const jsonData = await data.json();
    return jsonData;
  }
);

export const bookingSlice = createSlice({
  name: "booking-slice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooking.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const bookingReducer = bookingSlice.reducer;
