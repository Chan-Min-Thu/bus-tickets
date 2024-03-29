import { config } from "@/util/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookingType, CreateBooking, GetBooking } from "@/type/booking";
import { setSeats } from "./seatSlice";
import { setCar } from "./carSlice";
import { act } from "react-dom/test-utils";
import Error from "next/error";
import { stat } from "fs";

const initialState: BookingType = {
  items: [] || {},
  isLoading: false,
  error: null,
};
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (payload: CreateBooking, thunkAPI) => {
    const {
      name,
      expressCarId,
      date,
      seats,
      bookingId,
      isLocal,
      gender,
      onSuccess,
      isError,
    } = payload;
    // console.log(name, seats);
    try {
      const response = await fetch(`${config.apiBaseUrl}/order/booking`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          expressCarId,
          date,
          seats,
          bookingId,
          isLocal,
          gender,
        }),
      });
      const { booking, seat } = await response.json();
      thunkAPI.dispatch(setBooking(booking));
      thunkAPI.dispatch(setSeats(seat));
      onSuccess && onSuccess({});
    } catch (err) {
      isError && isError(err);
    }
  }
);

export const getBooking = createAsyncThunk(
  "booking/getBooking",
  async (payload: GetBooking, thunkApi) => {
    const { bookingId, onSuccess, isError } = payload;

    console.log("bookingId", bookingId);
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/order/booking/${bookingId}`
      );
      const { booking, seats } = await response.json();
      thunkApi.dispatch(setBooking(booking));
      thunkApi.dispatch(setSeats(seats));
      // thunkApi.dispatch(setCar(car));
      // console.log(booking, seats);
      onSuccess && onSuccess(booking);
    } catch (err) {
      isError && isError(err);
      throw err;
    }
  }
);
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooking.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getBooking.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getBooking.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.items = [];
      } else {
        state.error;
      }
      state.isLoading = false;
    });
  },
});
export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
