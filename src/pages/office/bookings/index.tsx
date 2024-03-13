import MuiDatePicker from "@/components/DatePicker";
import InputTag from "@/components/InputTag";
import { useAppSelector } from "@/store/hook";
import { compareValue } from "@/util/general";
import { BookOnline } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  colors,
} from "@mui/material";
import { Booking, ExpressCar, Seats } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";

const Bookings = () => {
  const bookings = useAppSelector((state) => state.booking.items);
  const expressCars = useAppSelector((state) => state.car.items);

  const seats = useAppSelector((state) => state.seat.items);
  const [carName, setCarName] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [arrived, setArrived] = useState<string>("");
  const [date, setDate] = useState<null | Date>(null);
  const [time, setTime] = useState<string | Date>("");
  const [seat, setSeat] = useState<number[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seats[]>([]);
  const [collectedCar, setCollectedCar] = useState<ExpressCar[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking[]>([]);
  //car names
  const expressCarNames = expressCars.map((item) => item.name);

  //startFrom related car name
  const startFrom = expressCars
    .filter((item) => item.name === carName)
    .map((i) => i.startFrom);

  //arrivedTo related car name
  const arrivedTo = expressCars
    .filter((item) => item.name === carName)
    .map((i) => i.arrivedTo);

  //time collector
  const collectedCars = expressCars.filter(
    (item) =>
      item.name === carName &&
      item.startFrom === start &&
      item.arrivedTo === arrived
  );
  const collectedCarTime = collectedCars.map((i) => i.departureTime);
  let number: any = [];
  const seatfun = (a: number) => {
    for (let i = 0; i < a; i++) {
      let seat = i + 1;
      number = [...number, seat];
      setSeat(number);
    }
  };
  // auto refresh selectedBookings
  useEffect(() => {
    if (collectedCars) {
      const collected = collectedCars.filter(
        (item) =>
          item.name === carName &&
          item.startFrom === start &&
          item.arrivedTo === arrived &&
          new Date(item.departureTime).getTime() === new Date(time).getTime()
      );
      setCollectedCar(collected);
      collected && collected.length > 0 && seatfun(collected[0].seats);
      //   setSelectedBooking([]);
      console.log(collectedCar);

      const booked =
        collected &&
        collected.length > 0 &&
        date &&
        bookings.filter(
          (item) =>
            item.expressCarId === collected[0].id &&
            Number(new Date(item.date).getDate()) ===
              Number(new Date(date).getDate())
        );
      booked && booked.length > 0 && setSelectedBooking(booked);
      const selected = seats.filter(
        (item) =>
          booked &&
          booked.length > 0 &&
          booked?.find((i) => i.id === item.bookingId)
      );
      setSelectedSeat(selected);
      console.log(selectedSeat);
    }
  }, [carName, start, arrived, time, date]);

  return (
    <Box sx={{ width: "90vw", mx: "auto" }}>
      <Box sx={{ display: "flex", width: "80vw", mx: "auto" }}>
        <InputTag
          name="Car Name"
          cars={expressCarNames}
          point={carName}
          setChange={(e) => setCarName(e.target.value)}
        />
        <InputTag
          name="Start From"
          cars={startFrom}
          point={start}
          setChange={(e) => setStart(e.target.value)}
        />
        <InputTag
          name="Arrived To"
          cars={arrivedTo}
          point={arrived}
          setChange={(e) => setArrived(e.target.value)}
        />

        <FormControl sx={{ m: 1 }}>
          <RadioGroup
            sx={{ display: "flex", flexDirection: "row" }}
            aria-labelledby="demo-radio-buttons-group-label"
            onChange={(e) => setTime(e.target.value)}
            name="radio-buttons-group"
            row
          >
            {collectedCarTime &&
              collectedCarTime.length > 0 &&
              collectedCarTime.map((item, index) => (
                <Box key={index}>
                  <FormControlLabel
                    value={item}
                    control={<Radio />}
                    label={`${compareValue(
                      new Date(item).getHours()
                    )}:${compareValue(new Date(item).getMinutes())}`}
                  />
                </Box>
              ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <MuiDatePicker
          date={null}
          handleDate={(value) => setDate(value)}
          isPast={false}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box sx={{ display: "flex", width: 400, flexWrap: "wrap" }}>
            {seat &&
              seat.length > 0 &&
              selectedSeat &&
              selectedSeat.length > 0 &&
              seat.map((item: number) => {
                const isIncluded = selectedSeat.find((i) => i.seatNo === item);
                return (
                  <Box key={item}>
                    <Button
                      disabled={isIncluded ? false : true}
                      sx={{
                        width: 10,
                        height: 10,
                        p: 3,
                        m: 2,

                        "&:hover": {
                          backgroundColor: isIncluded ? "#270a54" : "#5d4a72",
                          boxShadow: "none",
                        },
                        color: "#fcd200",
                        bgcolor: isIncluded ? "#270a54" : "#5d4a72",
                      }}
                      //   onClick={() => {
                      //     isSelected
                      //       ? setSelectedSeats(
                      //           selectedSeats.filter((i) => i !== item)
                      //         )
                      //       : setSelectedSeats([...selectedSeats, item]);
                      //   }}
                    >
                      {item}
                    </Button>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Bookings;
