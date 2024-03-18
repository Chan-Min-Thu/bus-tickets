import { GetRouteOption } from "@/type/route";
import { config } from "@/util/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { resolve } from "path";
import { setCar } from "./carSlice";
import { OrderSearch } from "@/type/orderSearch";
import { act } from "react-dom/test-utils";

const initialState = {
  init: false,
  isLoading: false,
  error: null,
};

export const getRoute = createAsyncThunk(
  "order/getRoute",
  async (option: GetRouteOption, thunkAPI) => {
    const { onSuccess, isError } = option;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order`);
      const { expressCar } = await response.json();
      thunkAPI.dispatch(setInit(true));
      thunkAPI.dispatch(setCar(expressCar));
      onSuccess && onSuccess(expressCar);
    } catch (err) {
      isError && isError(err);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setInit: (state, action) => {
      state.init = action.payload;
    },
  },
});

export const { setInit } = orderSlice.actions;

export default orderSlice.reducer;
