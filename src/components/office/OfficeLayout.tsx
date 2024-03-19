import { Box } from "@mui/material";
import TopBar from "../TopBar";
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignIn from "../Signin";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getData, setInit } from "@/store/slice/appSlice";

interface Props {
  children: ReactNode;
}

const OfficeLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { init, isLoading } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (session && !init) {
      dispatch(getData({}));
    }
  }, [session, init]);
  useEffect(() => {
    if (!session) {
      router.push("/office");
    }
  }, [session]);
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "fixed", zIndex: 5, top: 0, minWidth: "100vw" }}>
        <TopBar />
      </Box>
      {!session ? <SignIn /> : <Box sx={{ mt: 10 }}>{children}</Box>}
    </Box>
  );
};

export default OfficeLayout;
