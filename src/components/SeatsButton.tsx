import { Box, Button } from "@mui/material";

interface Props {
  selectedSeats: number;
  color: boolean;
  setSelectedSeats: (value: SVGAnimatedNumber) => void;
}
const SeatButton = ({ selectedSeats, color, setSelectedSeats }: Props) => {
  return (
    <Box>
      {/* <Button
        sx={{
          width: 10,
          height: 10,
          p: 3,
          m: 2,
          "&:hover": {
            backgroundColor: "#5d4a72",
            boxShadow: "none",
          },
          color: "#fcd200",
          bgcolor: isSelected && color === "#270a54" ? "#5d4a72" : "#270a54",
        }}
        onClick={() => {
          setColor(color === "#270a54" ? "#5d4a72" : "#270a54");
          isSelected
            ? setSelectedSeats(selectedSeats.filter((i) => i !== item))
            : setSelectedSeats([...selectedSeats, item]);
        }}
      >
        {item}
      </Button> */}
    </Box>
  );
};

export default SeatButton;
