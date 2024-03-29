import { GetSeat, SeatType } from "@/type/seat";
import { config } from "@/util/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: SeatType = {
  items: [],
  isLoading: false,
  error: null,
};
export const getSeats = createAsyncThunk(
  "seats/getSeat",
  async (payload: GetSeat, thunkApi) => {
    const { date, carId, onSuccess, isError } = payload;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/order/seats/?carId=${carId}?date=${date}`
      );
      const { seats } = await response.json();
      thunkApi.dispatch(setSeats(seats));
    } catch (err) {
      isError && isError(err);
    }
  }
);
const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    setSeats: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setSeats } = seatSlice.actions;
export default seatSlice.reducer;
