import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user-slice";
import { bookingReducer } from "./slices/booking-slice";
import { bookingPackageReducer } from "./slices/booking-package";

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    bookingPackage: bookingPackageReducer,
  },
});
