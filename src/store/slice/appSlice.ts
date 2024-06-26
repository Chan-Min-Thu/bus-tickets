import { AppType, AppSliceOptions } from "@/type/app";
import { config } from "@/util/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { setCar } from "./carSlice";
import { setBooking } from "./bookingSlice";
import { setSeats } from "./seatSlice";

const initialState: AppType = {
  init: false,
  isLoading: false,
  error: null,
};
export const getData = createAsyncThunk(
  "car/getData",
  async (payload: AppSliceOptions, thunkAPI) => {
    const { onSuccess, isError } = payload;
    try {
      const response = await fetch(`${config.apiBaseUrl}/office/app`);
      const { expressCar, bookings, seat } = await response.json();
      console.log(expressCar);
      thunkAPI.dispatch(setInit(true));
      thunkAPI.dispatch(setCar(expressCar));
      thunkAPI.dispatch(setBooking(bookings));
      thunkAPI.dispatch(setSeats(seat));
      onSuccess && onSuccess(expressCar);
    } catch (err) {
      isError && isError(err);
    }
  }
);
const appSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setInit: (state, action) => {
      state.init = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
  },
});
export const { setInit } = appSlice.actions;
export default appSlice.reducer;
