import { useRouter } from "next/router";
import { ReactNode } from "react";
import OfficeLayout from "./office/OfficeLayout";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  const router = useRouter();
  const isOffice = router.pathname.includes("office");
  if (isOffice) {
    return (
      <Box>
        <OfficeLayout>{children}</OfficeLayout>
      </Box>
    );
  }
  return <Box>{children}</Box>;
};
export default Layout;