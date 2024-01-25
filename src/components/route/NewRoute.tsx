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
import { Router, useRouter } from "next/router";
import { useState } from "react";

interface Props {
  id?: number;
  car?: CreateCarOption | undefined;
  open: boolean;
  setOpen: (value: boolean) => void;
}
const NewRoute = ({ open, setOpen, car, id }: Props) => {
  const defaultData = {
    name: "",
    startFrom: "",
    arrivedTo: "",
    duration: 0,
    departureTime: 0,
    arrivedTime: 0,
    price: 0,
    isVIP: false,
    seats: 0,
  };
  const [data, setData] = useState<CreateCarOption>(car ? car : defaultData);
  const router = useRouter();
  const isDetail = router.pathname.includes(`routes/${car?.id}`);
  const dispatch = useAppDispatch();
  //create fun;
  const handleCreateCar = () => {
    dispatch(createCar(data));
    setData(defaultData);
    setOpen(false);
    router.push("/office/routes");
  };
  //update fun;
  const handleUpdateCar = () => {
    dispatch(updateCar(data));
    setData(defaultData);
    setOpen(false);
    router.push("/office/routes");
  };
  const handleDeleteCar = () => {
    if (car) {
      dispatch(deleteCar({ id }));
      router.push("/office/routes");
    }
  };
  if (!car && isDetail) return null;

  //update Car and Create Car UI
  return (
    // <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Dialog
      sx={{ maxWidth: 500, mx: "auto" }}
      open={open}
      onClose={() => setOpen(car ? true : false)}
      // TransitionComponent={CSSTransition}sd
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", m: 1 }}>
        <DialogTitle>{car ? "Update" : "Create"} Routes</DialogTitle>
        <Box sx={{alignItems:"center",mt:2,mr:2}}>
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
          variant="standard"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          sx={{ width: 300, mt: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TextField
            id="standard-basic"
            label="From"
            defaultValue={car ? car.startFrom : defaultData.startFrom}
            variant="standard"
            onChange={(e) => setData({ ...data, startFrom: e.target.value })}
            sx={{ width: 100 }}
          />
          <TextField
            id="standard-basic"
            label="To"
            variant="standard"
            defaultValue={car ? car.arrivedTo : defaultData.arrivedTo}
            onChange={(e) => setData({ ...data, arrivedTo: e.target.value })}
            sx={{ width: 100 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TextField
            id="standard-basic"
            label="Depature"
            defaultValue={car ? car.departureTime : defaultData.departureTime}
            variant="standard"
            onChange={(e) =>
              setData({
                ...data,
                departureTime: Number(e.target.value) as Number,
              })
            }
            sx={{ width: 100 }}
          />
          <TextField
            id="standard-basic"
            label="Arrived"
            defaultValue={car ? car.arrivedTime : defaultData.arrivedTime}
            variant="standard"
            onChange={(e) =>
              setData({ ...data, arrivedTime: Number(e.target.value) })
            }
            sx={{ width: 100 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TextField
            id="standard-basic"
            label="Price"
            defaultValue={car ? car.price : defaultData.price}
            variant="standard"
            onChange={(e) =>
              setData({ ...data, price: Number(e.target.value) })
            }
            sx={{ width: 100 }}
          />
          <TextField
            id="standard-basic"
            label="Duration"
            defaultValue={car ? car.duration : defaultData.duration}
            variant="standard"
            onChange={(e) =>
              setData({ ...data, duration: Number(e.target.value) })
            }
            sx={{ width: 100 }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <TextField
            id="standard-basic"
            label="Seats"
            defaultValue={car ? car.seats : defaultData.seats}
            variant="standard"
            onChange={(e) =>
              setData({ ...data, seats: Number(e.target.value) })
            }
            sx={{ width: 100 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Is VIP"
            defaultChecked={car ? car.isVIP : defaultData.isVIP}
            onChange={(e, value) => setData({ ...data, isVIP: value })}
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
