import { compareValue } from "@/util/general";
import { ResetTvOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Booking, ExpressCar, Seats } from "@prisma/client";
import { memo } from "react";

interface Props {
  item: Booking;
  seats?: Seats[];
  cars?: ExpressCar[];
}
const PassengerInfo = memo(({ item, seats, cars }: Props) => {
  // const booking = item;
  const car = cars?.find((i) => i.id === item.expressCarId) as ExpressCar;
  console.log("i", car);
  const dep = car?.departureTime as Date;
  const h = new Date(dep).getHours();
  const m = new Date(dep).getMinutes();
  const d = compareValue(new Date(item?.date).getDate());
  console.log(d);
  const mon = compareValue(new Date(item?.date).getMonth());
  const y = compareValue(new Date(item.date).getFullYear());
  if (!car || !item.bookingId || !seats)
    return (
      <Card sx={{ minWidth: "100vw", mx: "auto", bgcolor: "white-gray" }}>
        <CardContent sx={{ mx: "auto", width: 300, p: 20 }}>
          <Typography variant="h5">There is no search lists.</Typography>
        </CardContent>
      </Card>
    );
  return (
    <Card
      sx={{
        maxWidth: { xs: "90vw", sm: "30vw" },
        mx: "auto",
        my: 2,
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
      }}
    >
      <CardContent sx={{ bgcolor: "#e0e0e0" }}>
        <Typography variant="h6">Passenger Info</Typography>
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
          <Typography variant="h6">{item?.bookingId}</Typography>
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
          <Typography variant="h6">{item.name}</Typography>
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
            Departure Date :
          </Typography>
          <Typography variant="h6">
            {d}/{mon}/{y}
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
            Gender :
          </Typography>
          <Typography variant="h6">{item && item.gender}</Typography>
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
            Seat :
          </Typography>
          <Typography variant="h6">
            {seats.map((item) => item.seatNo).toString()}
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
            Total Price :
          </Typography>
          <Typography variant="h6">{car?.price * seats.length}</Typography>
        </Box>
      </CardContent>
      <CardContent sx={{ bgcolor: "#e0e0e0" }}>
        <Typography variant="h6">Express Car Info</Typography>
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
            Car Name :
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
            {h > 12 ? "0" + (h - 12) : h}:{m < 10 ? "0" + m : m}{" "}
            {h > 12 || h === 12 ? "PM" : "AM"}
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
            {car?.startFrom} <span style={{ fontWeight: "bold" }}> To </span>
            {car?.arrivedTo}
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
            Duration :
          </Typography>
          <Typography variant="h6">{car?.duration} hrs</Typography>
        </Box>
      </CardContent>
    </Card>
  );
});
export default PassengerInfo;
