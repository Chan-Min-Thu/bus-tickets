import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice/appSlice";
import carReducer from "./slice/carSlice";
import orderReducer from "./slice/orderSlice";
import BookingReducer from "./slice/bookingSlice";
import SeatReducer from "./slice/seatSlice";
// ...
const store = configureStore({
  reducer: {
    app: appReducer,
    car: carReducer,
    order: orderReducer,
    booking: BookingReducer,
    seat: SeatReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
