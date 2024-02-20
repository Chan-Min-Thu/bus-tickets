import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/order/Header";
import SearchOrder from "@/components/order/SearchOrder";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { ExpressCar } from "@prisma/client";
import { useEffect, useState } from "react";
import { getRoute } from "@/store/slice/orderSlice";
import Hero from "@/components/order/Hero";

export default function Home() {
  const expressCars = useAppSelector((state) => state.car.items);
  const init = useAppSelector((state)=> state.order.init)
  const expressCar = expressCars.map(item=>item)
  const dispatch = useAppDispatch();
  const [express, setExpress] = useState<ExpressCar[]>();
  useEffect(() => {
    dispatch(getRoute({}))
    // console.log(expressCars)
    if (expressCars && expressCars?.length > 0,init) {
      setExpress(expressCars);
    }
  }, [init,express]);
  
  return (
    <Box sx={{ position: "relative", width: "100vw", mx: "auto" }}>
      <Header />
      <Box
        sx={{
          position: "absolute",
          zIndex: 5,
          top: 150,
          width: "100vw",
          mx: "auto",
        }}
      >
       {express && express?.length > 0 && <Hero express={express} />}
      </Box>
    </Box>
  );
}
