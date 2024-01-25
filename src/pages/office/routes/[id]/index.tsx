import NewRoute from "@/components/route/NewRoute";
import { useAppSelector } from "@/store/hook";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const RouteDetails = () => {
    const router = useRouter();
    const [open,setOpen] = useState(true);
    const routeId = Number(router.query.id)
    const cars = useAppSelector((state)=>state.car.items)
    const car = cars.find(item=> item.id === routeId);
  return (
  <Box sx={{width:"100vw",display:"flex",justifyContent:"center",mx:"auto",position:"relative"}}>
     <Box
        sx={{
          width: "90vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          pt: 3,
          position:"absolute",
          zIndex:5
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "fit-content", mr: 3 }}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Box>
      <Box></Box>
    <NewRoute open={open} setOpen={setOpen} car={car} id={routeId}/>
  </Box>);
};
export default RouteDetails;
