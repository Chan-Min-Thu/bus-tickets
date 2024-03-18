import { config } from "@/util/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookingType, CreateBooking, GetBooking } from "@/type/booking";
import { setSeats } from "./seatSlice";
import { setCar } from "./carSlice";

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
      const data = await response.json();
      thunkApi.dispatch(setBooking(data.booking));
      thunkApi.dispatch(setSeats(data.seats));
      // thunkApi.dispatch(setCar(car));
      // console.log(booking, seats);
      onSuccess && onSuccess(data);
    } catch (err) {
      isError && isError(err);
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
});
export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
