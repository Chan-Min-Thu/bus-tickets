import SignIn from "@/components/Signin";
import Cart from "@/components/card/Cart";
import NewRoute from "@/components/route/NewRoute";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getData } from "@/store/slice/appSlice";
import { CreateCarOption } from "@/type/car";
import { Box, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Routes = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const expressCars = useAppSelector((state) => state.car.items);
  // const [cars,setCars] = useState<CreateCarOption[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (expressCars) {
      dispatch(getData({}));
    }
  }, []);
  //   if(!session){
  //     return(
  //         <SignIn/>
  //     )
  // }
  if (!expressCars) return null;
  return (
    <Box sx={{ width: "90vw", position: "relative",mx:"auto" }}>
      <Box
        sx={{
          width: "90vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          pt: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "fit-content", mr: 3 }}
          onClick={() => setOpen(true)}
        >
          Create
        </Button>
      </Box>
      <Box>

        <Box
          sx={{
            my: 2,
            mx: "auto",
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {expressCars.length > 0 && expressCars
            ? expressCars.map((item: CreateCarOption) => {
                return (
                  <Box key={item?.id} sx={{ m: 2 }}>
                    <Cart item={item}/>
                  </Box>
                );
              })
            : null}
        </Box>
      </Box>
      <Box sx={{ minWidth: "80vw",position: "absolute", zIndex: 4 }}>
        <Box sx={{mx:"auto"}}>
          <NewRoute open={open} setOpen={setOpen} />
        </Box>
      </Box>
    </Box>
  );
};
export default Routes;
