import InputTag from "@/components/InputTag";
import SearchOrder from "@/components/order/SearchOrder";
import SearchTrip from "@/components/order/SearchTrip";
import { useAppSelector } from "@/store/hook";
import { Elderly } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ExpressCar } from "@prisma/client";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Anytime");
  const startFrom = router.query.startFrom as string;
  const arrivedTo = router.query.arrivedTo as string;
  const time = Number(router.query.date);
  const seats = Number(router.query.seats);
  const isLocal = router.query.isLocal as string;
  const isOrder = router.pathname.includes("order");

  const expressCars = useAppSelector((state) => state.car.items);
  const [searchedCars, setSearchedCars] = useState<ExpressCar[]>([]);
  const [order, setOrder] = useState(false);
  // console.log(expressCars);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (expressCars && expressCars.length > 0) {
      setOrder(isOrder);
      const express = expressCars.filter(
        (item) => item.startFrom === startFrom && item.arrivedTo === arrivedTo
      );
      setSearchedCars(express);
    }
    // console.log(expressCars)
  }, [expressCars, startFrom, arrivedTo]);

  useEffect(() => {
    const car = expressCars.filter((item) => {
      const isDay = new Date(item.departureTime).getHours() < 14 ? true : false;
      const hour = new Date(item.departureTime);
      if (selectedTime === "Day") {
        const goInDayCar = expressCars.find(
          (i) =>
            i.startFrom === startFrom &&
            i.arrivedTo === arrivedTo &&
            new Date(i.departureTime).getHours() < 14
        );
        return goInDayCar?.id === item.id;
      } else if (selectedTime === "Night") {
        const goInNigthCar = expressCars.find(
          (i) =>
            i.startFrom === startFrom &&
            i.arrivedTo === arrivedTo &&
            new Date(i.departureTime).getHours() > 15
        );
        if (goInNigthCar) {
          return goInNigthCar?.id === item.id;
        }
      } else {
        return item.startFrom === startFrom && item.arrivedTo === arrivedTo;
      }
    });
    setSearchedCars(car);
  }, [selectedTime]);

  return (
    <Box sx={{ width: "90vw", my: 15, mx: "auto" }}>
      <Dialog onClose={handleClose} open={open}>
        <SearchOrder express={expressCars} open={open} setOpen={setOpen} />
      </Dialog>
      <Box sx={{ my: 10 }}>
        <Box
          sx={{
            bgcolor: "#e8e5e5",
            px: 2,
            py: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: { xs: 20, sm: 30 } }}>
            Search Trip
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Update
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: { xs: "center", sm: "space-around" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {searchedCars.map((item: ExpressCar) => (
              <Box key={item.id}>
                <SearchTrip
                  searchedCar={item}
                  time={time}
                  seats={seats}
                  isLocal={isLocal}
                />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: { xs: 250, md: "20vw" },
              bgcolor: "#e8e5e5",
              mt: 5,
              height: { md: 200 },
              borderRadius: 2,
              py: 3,
              px: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Typography variant="h5">Departure Time</Typography>
            </Box>

            <FormControl
              sx={{
                m: 1,
              }}
            >
              <RadioGroup
                sx={{
                  width: { xs: 250 },
                  display: "flex",
                  flexDirection: { xs: "row", sm: "row", md: "column" },
                }}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Anytime"
                onChange={(e) => setSelectedTime(e.target.value)}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Anytime"
                  control={<Radio />}
                  label="Anytime"
                />
                <FormControlLabel value="Day" control={<Radio />} label="Day" />
                <FormControlLabel
                  value="Night"
                  control={<Radio />}
                  label="Night"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Search;
