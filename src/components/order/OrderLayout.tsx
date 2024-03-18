import Box from "@mui/material/Box";
import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import { ExpressCar } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getRoute } from "@/store/slice/orderSlice";
import Footer from "../Footer";

interface Props {
  children: ReactNode;
}
const OrderLayout = ({ children }: Props) => {
  const expressCars = useAppSelector((state) => state.car.items);
  const init = useAppSelector((state) => state.order.init);
  // const expressCar = expressCars.map(item=>item)
  const dispatch = useAppDispatch();
  const [express, setExpress] = useState<ExpressCar[]>();
  useEffect(() => {
    dispatch(getRoute({}));
    setExpress(expressCars);
  }, [init, express]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};
export default OrderLayout;
