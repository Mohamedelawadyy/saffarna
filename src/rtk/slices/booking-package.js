import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBookingPackage = createAsyncThunk(
  "booking-slice/fetchBooking",
  async (username) => {}
);

export const bookingPackageSlice = createSlice({
  name: "booking-slice",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookingPackage.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export const bookingPackageReducer = bookingPackageSlice.reducer;
