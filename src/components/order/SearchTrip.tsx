import { compareValue } from "@/util/general";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ExpressCar } from "@prisma/client";
import { useRouter } from "next/router";
import { memo } from "react";

interface Props {
  searchedCar: ExpressCar;
  time: number;
  seats: number;
  isLocal: string;
}
const SearchTrip = memo(({ searchedCar, time, seats, isLocal }: Props) => {
  const router = useRouter();

  const departure = new Date(searchedCar.departureTime);
  const arrivedTime = new Date(searchedCar.arrivedTime);
  const arrHour = arrivedTime.getHours();
  const arrMin = arrivedTime.getMinutes();
  const date = new Date(time).getUTCDate();
  const month = new Date(time).getUTCMonth() + 1;
  const year = new Date(time).getUTCFullYear();
  const day = compareValue(date + 1) + "/" + compareValue(month) + "/" + year;
  const hour = departure.getHours();
  const min = departure.getMinutes();
  return (
    <Box
      sx={{
        width: { xs: "80vw", sm: "40vw" },
        mt: 5,
        bgcolor: "#e8e5e5",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          mt: 2,
        }}
      >
        <Typography sx={{ fontSize: { xs: 18, md: 30 } }}>
          {searchedCar.name} ({compareValue(hour)}:{compareValue(min)}{" "}
          {hour >= 12 ? "PM" : "AM"})
        </Typography>
        <Typography sx={{ fontSize: { xs: 18, md: 30 } }}>
          {searchedCar.price}Ks
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: { xs: 18, md: 30 } }}>
          {searchedCar.startFrom} to {searchedCar.arrivedTo}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          mt: 2,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "gray",
            marginRight: "5px",
            fontFamily: "monospace",
          }}
        >
          Departure Date{" "}
        </span>{" "}
        : <Typography sx={{ ml: 5 }}>{day}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 2,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "gray",
            marginRight: "5px",
            fontFamily: "monospace",
          }}
        >
          Arrive Time{" "}
        </span>{" "}
        :{" "}
        <Typography sx={{ ml: 5 }}>
          {compareValue(arrHour)}:{compareValue(arrMin)}{" "}
          {arrHour < 12 ? "AM" : "PM"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          mt: 2,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "gray",
            marginRight: "5px",
            fontFamily: "monospace",
          }}
        >
          Duration{" "}
        </span>{" "}
        : <Typography sx={{ ml: 5 }}> {searchedCar.duration} hours</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            mt: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "gray",
              marginRight: "5px",
              fontFamily: "monospace",
            }}
          >
            No. Seats
          </span>
          : <Typography sx={{ ml: 5 }}> {searchedCar.seats} Seats</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              router.push({
                pathname: "/order/trips",
                query: {
                  id: searchedCar.id,
                  date: time,
                  seats: seats,
                  isLocal,
                },
              });
            }}
            sx={{ bgcolor: "secondary.main" }}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Box>
  );
});
export default SearchTrip;
