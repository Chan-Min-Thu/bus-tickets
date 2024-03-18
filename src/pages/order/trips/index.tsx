import { useAppDispatch, useAppSelector } from "@/store/hook";
import { compareValue } from "@/util/general";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Booking, ExpressCar, Seats } from "@prisma/client";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState, useId } from "react";
import { CreateBooking } from "@/type/booking";
import SeatButton from "@/components/SeatsButton";
import {
  createBooking,
  getBooking,
  setBooking,
} from "@/store/slice/bookingSlice";
import { nanoid } from "nanoid";
import { getSeats } from "@/store/slice/seatSlice";

const Trips = () => {
  const router = useRouter();

  const expressCars = useAppSelector((state) => state.car.items);
  const bookedSeats = useAppSelector((state) => state.seat.items);
  console.log("bookedseats", bookedSeats);
  const id = Number(router.query.id);
  const date = Number(router.query.date);
  const seat = Number(router.query.seats);
  const isLocal = router.query.isLocal as string;
  const time = new Date(date);
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const dispatch = useAppDispatch();

  const defaultBooking: CreateBooking = {
    name: "",
    gender: "",
    bookingId: "",
    date: new Date(date),
    expressCarId: id,
    isLocal: isLocal,
    seats: [],
  };
  // const bookedSeats = [3, 4];
  const car = expressCars.find(
    (item: ExpressCar) => item.id === id
  ) as ExpressCar;
  const [seats, setSeats] = useState<number[]>();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [data, setData] = useState<CreateBooking>(defaultBooking);

  const handleBooking = async () => {
    const booking = {
      ...data,
      bookingId: nanoid(7),
      date: new Date(date),
      expressCarId: id,
      isLocal: isLocal,
      seats: selectedSeats,
    };
    // console.log(booking);
    setData(booking);
    dispatch(createBooking(booking));
    router.push({
      pathname: `bookings/${booking.bookingId}`,
      query: {
        name: data.name,
        carId: car.id,
        startFrom: car.startFrom,
        arrivedTo: car.arrivedTo,
        date,
        isLocal,
        price: car.price,
        seat,
      },
    });
  };

  let number: any[] = [];
  const seatfun = (a: number) => {
    for (let i = 0; i < a; i++) {
      let seat = i + 1;
      number = [...number, seat];
      setSeats(number);
    }
  };
  useEffect(() => {
    if (date > 0 && isLocal.length > 0 && id > 0) {
      dispatch(getSeats({ carId: car?.id, date: date }));
      seatfun(car.seats);
      setSeats(number);
      setData({
        ...data,
        date: new Date(date),
        isLocal,
        expressCarId: id,
        seats: selectedSeats,
      });
    }
  }, [car, selectedSeats, car]);
  return (
    <Box sx={{ width: { sm: "100vw", md: "95vw" } }}>
      <Box
        sx={{
          mt: 18,
          width: { sm: "100vw", md: "50vw" },
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { sm: "center", md: "space-between" },
        }}
      >
        <Box
          sx={{
            width: 250,
            mx: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <DirectionsBusIcon />
          <Typography sx={{ mx: 2, fontSize: 20, fontWeight: "bold" }}>
            {car?.startFrom}
          </Typography>
          <Typography sx={{ mx: 0.5 }}>To</Typography>
          <Typography sx={{ mx: 2, fontSize: 20, fontWeight: "bold" }}>
            {car?.arrivedTo}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 250,
            mx: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <EventIcon />
          <Typography sx={{ mx: 2 }}>
            {compareValue(day)}/{compareValue(month)}/{year}
          </Typography>
          <PersonIcon />
          <Typography sx={{ mx: 2 }}>{isLocal}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 3,
          mb: 2,
          mx: "auto",
          width: { sm: "90vw", md: "70vw" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ width: { sm: "100vw", md: "30vw" }, mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              width: { sm: "90vw", md: 400 },
              flexWrap: "wrap",
            }}
          >
            {seats &&
              seats.length > 0 &&
              seats.map((item: number) => {
                let isSelected = selectedSeats.find((i) => i === item);
                return (
                  <Box key={item}>
                    <Button
                      disabled={
                        (bookedSeats &&
                          bookedSeats.length > 0 &&
                          bookedSeats.find((i) => i.seatNo === item)) ||
                        data.seats.length === seat
                          ? selectedSeats.find((i) => i === item)
                            ? false
                            : true
                          : false
                      }
                      sx={{
                        width: 10,
                        height: 10,
                        p: 3,
                        m: 2,

                        "&:hover": {
                          backgroundColor: isSelected ? "#270a54" : "#5d4a72",
                          boxShadow: "none",
                        },
                        color: "#fcd200",
                        bgcolor: isSelected ? "#270a54" : "#5d4a72",
                      }}
                      onClick={() => {
                        isSelected
                          ? setSelectedSeats(
                              selectedSeats.filter((i) => i !== item)
                            )
                          : setSelectedSeats([...selectedSeats, item]);
                      }}
                    >
                      {item}
                    </Button>
                  </Box>
                );
              })}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: { sm: "90vw", md: "20vw" },
            flexDirection: "column",
            mt: 5,
            mx: "auto",
            gap: 4,
          }}
        >
          <TextField
            id="standard-basic"
            label="eg.Mg Mg"
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setData({ ...data, name: e.target.value as string })}
            variant="standard"
          />
          <Box>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                onChange={(e) => setData({ ...data, gender: e.target.value })}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Female-Only"
                  control={<Radio />}
                  label="Female Only"
                />
                <FormControlLabel
                  value="Male-Only"
                  control={<Radio />}
                  label="Male Only"
                />
                <FormControlLabel
                  value="Mixed"
                  control={<Radio />}
                  label="Mixed"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box sx={{ width: 80 }}>
              <Typography>Seats No.</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {selectedSeats.map((i) => (
                <Box
                  key={i}
                  sx={{
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                    color: "#fcd200",
                    bgcolor: "#270a54",
                  }}
                >
                  {i}
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box sx={{ width: 80 }}>
              <Typography>Price</Typography>
            </Box>
            <Box>
              <Typography>{car?.price * seat} Kyats</Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={handleBooking}
            disabled={!seats || !data.gender || !data.name}
            sx={{ width: "fix-content", p: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Trips;
