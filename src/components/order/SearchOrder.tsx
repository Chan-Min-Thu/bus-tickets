import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
// import InputTag from "../InputTag";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { ExpressCar } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputTag from "../InputTag";
import MuiDatePicker from "../DatePicker";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { SearchCarOption } from "@/type/car";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "@/store/hook";
import { useRouter } from "next/router";
import { compareValue } from "@/util/general";

interface Props {
  express: ExpressCar[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchOrder = ({ express, setOpen }: Props) => {
  const router = useRouter();
  const isOrder = router.pathname.includes("order");
  const startFrom = router.query.startFrom as string;
  const arrivedTo = router.query.arrivedTo as string;
  const date = Number(router.query.date);
  const seats = Number(router.query.seats);
  const isLocal = router.query.isLocal;
  const From = "From";
  const To = "To";
  const startFromCars =
    express && express.length && express.map((item) => item.startFrom);

  const arrivedToCars =
    express && express.length && express.map((item) => item.arrivedTo);
  const defaultData = {
    startFrom: isOrder ? startFrom : "",
    arrivedTo: isOrder ? arrivedTo : "",
    date: isOrder ? date : null,
    traveller: isOrder ? isLocal : "Local",
    seats: isOrder ? seats : 1,
  };
  const [data, setData] = useState<SearchCarOption>(defaultData);
  const d = dayjs(data.date).utc().format().toString() as string;

  const handleUpdateSearch = () => {
    setData({ ...data });
    const time = dayjs(data.date).utc().format().toString() as string;
    const date = new Date(time).getTime();
    router.push({
      pathname: "search-routes",
      query: {
        startFrom: data.startFrom,
        arrivedTo: data.arrivedTo,
        date,
        seats: data.seats,
        isLocal: data.traveller,
      },
    });
    isOrder ? setOpen(false) : setOpen(true);
  };
  const handleSearch = () => {
    setData({ ...data });
    const time = dayjs(data.date).utc().format().toString() as string;
    const date = new Date(time).getTime();
    router.push({
      pathname: "order/search-routes",
      query: {
        startFrom: data.startFrom,
        arrivedTo: data.arrivedTo,
        date,
        seats: data.seats,
        isLocal: data.traveller,
      },
    });
  };
  if (!express) return null;
  return (
    <Box
      sx={{
        mx: "auto",
        width: { xs: 300, sm: 400 },
        borderRadius: 2,
        bgcolor: "#594b66",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ my: 2, mx: "auto", color: "#EEEEEE" }}>
        Search Trip
      </Typography>
      {startFromCars && startFromCars.length > 0 && (
        <InputTag
          name={From}
          cars={startFromCars}
          point={isOrder ? startFrom : data.startFrom}
          setChange={(e: any) =>
            setData({ ...data, startFrom: e.target.value })
          }
        />
      )}
      {arrivedToCars && arrivedToCars.length > 0 && (
        <InputTag
          name={To}
          cars={arrivedToCars}
          point={isOrder ? arrivedTo : data.arrivedTo}
          setChange={(e: any) =>
            setData({ ...data, arrivedTo: e.target.value })
          }
        />
      )}

      <Box sx={{ width: { xs: 230, sm: 300 }, my: 1, color: "success.main" }}>
        <MuiDatePicker
          date={isOrder ? date : data.date}
          handleDate={(newValue) => setData({ ...data, date: newValue })}
          isPast={true}
        />
      </Box>
      <Box sx={{ width: { xs: 230, sm: 300 }, my: 1 }}>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() =>
              setData({
                ...data,
                seats: (isOrder ? seats : data.seats) + 1,
              })
            }
          >
            <AddIcon />
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: 1,
              p: 1,
              color: "#ffffff",
            }}
          >
            <Typography>{compareValue(data.seats)}</Typography>
          </Box>
          <Button
            onClick={() =>
              setData({
                ...data,
                seats: data.seats === 1 ? 1 : data.seats - 1,
              })
            }
          >
            <RemoveIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ my: 1 }}>
        <FormControl>
          <RadioGroup
            sx={{ display: "flex", flexDirection: "row" }}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={isOrder ? isLocal : data.traveller}
            onChange={(e) => setData({ ...data, traveller: e.target.value })}
            name="radio-buttons-group"
            row
          >
            <FormControlLabel value="Local" control={<Radio />} label="Local" />
            <FormControlLabel
              value="Foreign"
              control={<Radio />}
              label="Foreigner"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {isOrder ? (
        <Button
          onClick={handleUpdateSearch}
          variant="contained"
          sx={{ m: 1, px: 2, py: 1 }}
        >
          Update Searching
        </Button>
      ) : (
        <Button
          onClick={handleSearch}
          variant="contained"
          disabled={!data.arrivedTo || !data.startFrom || !data.date}
          sx={{ width: { xs: 100 }, my: 1, px: 2, py: 1 }}
        >
          Search
        </Button>
      )}
    </Box>
  );
};

export default SearchOrder;
