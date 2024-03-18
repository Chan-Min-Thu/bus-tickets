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
import Footer from "@/components/Footer";

export default function Home() {
  const expressCars = useAppSelector((state) => state.car.items);
  const init = useAppSelector((state) => state.order.init);
  const expressCar = expressCars.map((item) => item);
  const dispatch = useAppDispatch();
  const [express, setExpress] = useState<ExpressCar[]>();
  useEffect(() => {
    dispatch(getRoute({}));
    // console.log(expressCars)
    if ((expressCars && expressCars?.length > 0, init)) {
      setExpress(expressCars);
    }
  }, [init, express]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Header />
      <Box>
        <Box
          sx={{
            position: "absolute",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: "auto",
            top: { xs: 100, sm: 150, md: 100, lg: 150 },
            width: "100vw",
            mx: "auto",
          }}
        >
          {express && express?.length > 0 && <Hero express={express} />}
        </Box>
      </Box>
    </Box>
  );
}
