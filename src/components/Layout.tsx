import { useRouter } from "next/router";
import { ReactNode } from "react";
import OfficeLayout from "./office/OfficeLayout";
import { Box } from "@mui/material";
import OrderLayout from "./order/OrderLayout";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const isOffice = router.pathname.includes("office");
  const isOrder = router.pathname.includes("order");
  if (isOffice) {
    return (
      <Box>
        <OfficeLayout>{children}</OfficeLayout>
      </Box>
    );
  }
  if(isOrder){
    return(
      <Box>
        <OrderLayout>{children}</OrderLayout>
      </Box>
    )
  }
  return <Box>{children}</Box>;
};
export default Layout;