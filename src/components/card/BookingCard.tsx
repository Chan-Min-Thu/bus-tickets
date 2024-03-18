import { Box, CardContent, Typography } from "@mui/material";
import { Booking } from "@prisma/client";
import { memo } from "react";

interface Props {
  item: Booking;
}
const BookingCard = memo(({ item }: Props) => {
  //   console.log(item);
  return (
    <Box sx={{ mt: 30 }}>
      <Box>
        <Typography>Heloo</Typography>
      </Box>
    </Box>
  );
});
export default BookingCard;
