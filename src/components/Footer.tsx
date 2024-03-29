import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#3c3942",
        width: "100vw",
        color: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: 310,
          mx: "auto",
          my: 3,
          justifyContent: "space-between",
        }}
      >
        <FacebookIcon sx={{ ":hover": { color: "#0072ff" } }} />
        <TwitterIcon sx={{ ":hover": { color: "#0072ff" } }} />
        <LinkedInIcon sx={{ ":hover": { color: "#0072ff" } }} />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", m: 1, opacity: 0.6 }}
      >
        {" "}
        <Typography>@CopyRight Trippy From MMBusTicket</Typography>
      </Box>
    </Box>
  );
};
export default Footer;
