import { Box, Button, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ExpressCar } from "@prisma/client";
import SearchOrder from "./SearchOrder";
import Footer from "../Footer";
import { SetStateAction, useState } from "react";

interface Props {
  express: ExpressCar[];
}

const Hero = ({ express }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  if (!express) return null;
  return (
    <Box
      sx={{
        height: { xs: "88vh", md: "84vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: { sm: "100vw", lg: "90vw", xl: "80vw" },
          mx: "auto",
          display: "flex",
          justifyContent: { xs: "center", sm: "space-around" },
          flexDirection: { sm: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: "40vw",
            height: 400,
            display: { xs: "none", sm: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              mx: "auto",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              height: 200,
              ml: { xs: 0, sm: 5 },
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#EEEEEE", fontFamily: "monospace" }}
            >
              Travel Safety And Move Faster.
            </Typography>
            <Typography sx={{ color: "#ffe972" }}>
              The leading bus ticketing system in Myanmar. Find the best price
              for your bus tickets.
            </Typography>
            <Box
              sx={{
                width: "25vw",
                height: 40,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 30,
                  color: "success.main",
                  ":hover": { bgcolor: "secondary.main", border: "#3B3480" },
                  bgcolor: "#3B3486",
                  border: "1px #3B3455 solid",
                }}
                startIcon={<CheckCircleIcon />}
              >
                70 Operators
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "90vw", md: "50vw" },
            mx: { sm: "auto" },
          }}
        >
          <SearchOrder express={express} open={true} setOpen={setOpen} />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Hero;
