import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getBooking } from "@/store/slice/bookingSlice";
import { compareValue } from "@/util/general";

import { CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import { useRouter } from "next/router";
import { useEffect } from "react";

const BookingId = () => {
  const booking = useAppSelector((state) => state.booking.items);

  const cars = useAppSelector((state) => state.car.items);
  const seats = useAppSelector((state) => state.seat.items);

  const { query, ...router } = useRouter();
  const dispatch = useAppDispatch();
  const { bookingId, name, carId, startFrom, arrivedTo, isLocal, date, price } =
    query;
  const id = Number(carId);
  const car = cars.find((item) => item.id === id);
  const time = new Date(car?.departureTime).getHours();
  const min = new Date(car?.departureTime).getMinutes();
  const d = new Date(Number(date)).getDate();
  const m = new Date(Number(date)).getMonth();
  const y = new Date(Number(date)).getFullYear();

  console.log(d);
  useEffect(() => {
    if (booking && booking.length === 0 && bookingId !== undefined) {
      dispatch(getBooking({ bookingId: String(bookingId) }));
    }
  }, [bookingId]);

  return (
    <Box
      sx={{ mt: 15, mx: "auto", px: "auto", width: { sm: "90vw", md: "50vw" } }}
    >
      <Card
        sx={{
          maxWidth: { sm: "80vw", md: "30vw" },
          mx: "auto",
          borderTopRightRadius: 2,
          borderTopLeftRadius: 2,
        }}
      >
        <CardContent sx={{ bgcolor: "#e0e0e0" }}>
          <Typography variant="h6">Passenger Details</Typography>
        </CardContent>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              borderBottom: "0.5px solid ",
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              BookingId :
            </Typography>
            <Typography variant="h6">{bookingId}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              borderBottom: "0.5px solid ",
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              Name :
            </Typography>
            <Typography variant="h6">{name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              borderBottom: "0.5px solid ",
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              Express-Name :
            </Typography>
            <Typography variant="h6">{car?.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              borderBottom: "0.5px solid ",
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              Departure Time :
            </Typography>
            <Typography variant="h6">
              {time > 12 ? "0" + (time - 12) : time}:
              {min < 10 ? "0" + min : min}{" "}
              {time > 12 || time === 12 ? "PM" : "AM"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              borderBottom: "0.5px solid ",
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              Trip :
            </Typography>
            <Typography variant="h6">
              {startFrom} <span style={{ fontWeight: "bold" }}>To</span>
              {arrivedTo}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              borderBottom: "0.5px solid ",
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              Price :
            </Typography>
            <Typography variant="h6">{price} Kyats</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              borderBottom: "0.5px solid ",
            }}
          >
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              Departure Date:
            </Typography>
            <Typography variant="h6">
              {compareValue(d)}/{compareValue(m)}/{y}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
            <Typography variant="h6" sx={{ fontStyle: "italic" }}>
              Seats :
            </Typography>
            <Typography variant="h6">
              {seats.map((item) => item.seatNo).toString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingId;
