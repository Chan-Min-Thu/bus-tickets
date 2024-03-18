import { FacebookRounded, Opacity } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Box } from "@mui/material";

const Contact = () => {
  return (
    <Box
      sx={{
        width: 300,
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
      }}
    >
      <Box>
        <FacebookRounded sx={{ fontSize: 80, color: "#0072ff" }} />
        <AddIcon sx={{ fontSize: 50, color: "#0072ff" }} />{" "}
        <LocalPhoneIcon sx={{ fontSize: 80, color: "#0072ff" }} />
      </Box>
    </Box>
  );
};

export default Contact;
