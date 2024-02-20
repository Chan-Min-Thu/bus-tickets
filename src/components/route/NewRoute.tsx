import { useAppDispatch } from "@/store/hook";
import { createCar, deleteCar, updateCar } from "@/store/slice/carSlice";
import { CreateCarOption } from "@/type/car";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  id?: number;
  car?: CreateCarOption | undefined;
  open: boolean;
  setOpen: (value: boolean) => void;
}
const NewRoute = ({ open, setOpen, car, id }: Props) => {
  const date = new Date("October 13, 2023 12:00:00");
  const defaultData = {
    name: "",
    startFrom: "",
    arrivedTo: "",
    duration: 0,
    departureTime:null,
    arrivedTime: null,
    price: 0,
    isVIP: false,
    seats: 0,
  };
  const [data, setData] = useState<CreateCarOption>(defaultData);
  const router = useRouter();
  const isDetail = router.pathname.includes(`routes/${car?.id}`);
  const dispatch = useAppDispatch();
  //create fun;
  useEffect(()=>{
     setData(data)
  },[data])
  const handleCreateCar = () => {
    dispatch(createCar(data));
    setData(defaultData);
    setOpen(false);
    router.push("/office/routes");
  };
  //update fun;
  const handleUpdateCar = () => {
    dispatch(updateCar(data));
    // setData(defaultData);
    setOpen(false);
    router.push("/office/routes");
    
  };
  const handleDeleteCar = () => {
    if (car) {
      dispatch(deleteCar({ id }));
      router.push("/office/routes");
    }
  };
  const h =new Date("2024-02-09T01:00:00.000Z");
  const hour = h.getHours()
  if (!car && isDetail) return null;

  //update Car and Create Car UI
  return (
    // <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Dialog
      sx={{ minWidth: 600, mx: "auto" }}
      open={open}
      onClose={() => setOpen(car ? true : false)}
      // TransitionComponent={CSSTransition}sd
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
        <DialogTitle>{car ? "Update" : "Create"} Routes</DialogTitle>
        <Box sx={{ alignItems: "center", mt: 2, mr: 2 }}>
          <Button
            sx={{ display: car ? "fix-content" : "none" }}
            onClick={handleDeleteCar}
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </Box>
      <DialogContent>
        <TextField
          id="standard-basic"
          label="Name"
          defaultValue={car ? car.name : defaultData.name}
          variant="outlined"
          onChange={(e) => car?setData({...car,name:e.target.value}):setData({ ...data, name: e.target.value })}
          sx={{ width: 300, mt: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TextField
            id="standard-basic"
            label="From"
            defaultValue={car ? car.startFrom : defaultData.startFrom}
            variant="outlined"
            onChange={(e) => car?setData({...car,startFrom:e.target.value}):setData({ ...data, startFrom: e.target.value })}
            sx={{ width: 130 }}
          />
          <TextField
            id="standard-basic"
            label="To"
            variant="outlined"
            defaultValue={car ? car.arrivedTo : defaultData.arrivedTo}
            onChange={(e) => car? setData({ ...car, arrivedTo: e.target.value }):setData({ ...data, arrivedTo: e.target.value })}
            sx={{ width: 130 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TimePicker
            label="Departure"
            sx={{ width: 130, my: 1, border: "none" }}
            defaultValue={car ?dayjs(car.departureTime): defaultData.departureTime}
            onChange={(newValue) =>
            car? setData({...car,departureTime:newValue}):setData({...data,departureTime:newValue})
            }
          />
          <TimePicker
            label="Arrived"
            sx={{ width: 130, my: 1, border: "none" }}
            defaultValue={car ? dayjs(car.arrivedTime): defaultData.arrivedTime}
            onChange={(newValue) =>car? setData({...car,arrivedTime:newValue}): setData({ ...data, arrivedTime: newValue })}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TextField
            id="standard-basic"
            label="Price"
            defaultValue={car ? car.price : defaultData.price}
            variant="outlined"
            onChange={(e) =>
             car?setData({...car,price:Number(e.target.value)}): setData({ ...data, price: Number(e.target.value) })
            }
            sx={{ width: 130 }}
          />
          <TextField
            id="standard-basic"
            label="Duration"
            defaultValue={car ? car.duration : defaultData.duration}
            variant="outlined"
            onChange={(e) =>
             car? setData({...car,duration:Number(e.target.value)}): setData({ ...data, duration: Number(e.target.value) })
            }
            sx={{ width: 130 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TextField
            id="standard-basic"
            label="Seats"
            defaultValue={car ? car.seats : defaultData.seats}
            variant="outlined"
            onChange={(e) =>
             car?setData({...car,seats:Number(e.target.value)}):  setData({ ...data, seats: Number(e.target.value) })
            }
            sx={{ width: 130 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked={car ? car.isVIP : defaultData.isVIP} />}
            label="Is VIP"
            // defaultChecked={car ? car.isVIP : defaultData.isVIP}
            onChange={(e, value) =>car?setData({...car,isVIP:value}): setData({ ...data, isVIP: value })}
            sx={{ mt: 1 }}
          />
        </Box>
      </DialogContent>
      <DialogContent sx={{ display: "flex", justifyContent: "space-around" }}>
        {car ? (
          <Button
            variant="contained"
            onClick={() => router.push("/office/routes")}
          >
            Cancel
          </Button>
        ) : (
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        )}
        {car ? (
          <Button variant="contained" onClick={handleUpdateCar}>
            Update
          </Button>
        ) : (
          <Button variant="contained" onClick={handleCreateCar}>
            Create
          </Button>
        )}
      </DialogContent>
    </Dialog>
    // </Box>
  );
};

export default NewRoute;
