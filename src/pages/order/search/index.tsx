import {
  Button,
  Card,
  CardContent,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getBooking } from "@/store/slice/bookingSlice";
import { useRouter } from "next/router";
import { Booking, ExpressCar, Seats } from "@prisma/client";
import PassengerInfo from "@/components/card/PassengerInfo";

const Search = () => {
  const { items: bookings } = useAppSelector((state) => state.booking);
  const seats = useAppSelector((state) => state.seat.items);
  const cars = useAppSelector((state) => state.car.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  //useState
  const [bookingId, setBookingId] = useState<string>("");
  const [booking, setBooking] = useState<Booking[]>();
  const [seat, setSeat] = useState<Seats>();
  const [car, setCar] = useState<ExpressCar[]>([]);
  useEffect(() => {
    if (bookings && cars) {
      setBooking(bookings);
      setCar(cars);
    }
  }, [cars, bookings, seats, bookingId]);
  //handleSubmit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(getBooking({ bookingId }));
    router.push(
      bookingId === ""
        ? { pathname: "/order/search" }
        : { pathname: "/order/search", query: bookingId }
    );
  };
  return (
    <Box sx={{ mt: 20 }}>
      <Paper
        component="form"
        typeof="submit"
        sx={{
          p: "2px 4px",
          mx: "auto",
          mb: 3,
          display: "flex",
          alignItems: "center",
          width: { xs: "90vw", sm: 400 },
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search BookingId"
          value={bookingId}
          inputProps={{ "aria-label": "Search BookingId" }}
          onChange={(e) => setBookingId(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <Button type="submit">Search</Button>
      </Paper>

      {booking && <PassengerInfo item={booking} seats={seats} cars={car} />}
    </Box>
  );
};
export default Search;
