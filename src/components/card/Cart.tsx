import { CreateCarOption } from "@/type/car";
import { Box, Button, Card, Typography } from "@mui/material";
import { ExpressCar } from "@prisma/client";
import { useRouter } from "next/router";
import { memo } from "react";

interface Props {
  item: CreateCarOption;
}
const Cart = memo(({ item }: Props) => {
  const router = useRouter();
  const t = item.departureTime as Date;
  const date = item.departureTime && new Date(t);
  const departure =
    date &&
    date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
  return (
    <Box>
      <Card sx={{ minWidth: 300, padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item?.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }}>
            {departure} hrs
            {/* {Number(item?.departureTime?.getHours())}:{Number(item?.departureTime?.getMinutes())} hr */}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            my: 2,
          }}
        >
          <Typography variant="h6" sx={{ mr: 1 }} component="div">
            {item?.startFrom}
          </Typography>
          to
          <Typography variant="h6" sx={{ ml: 1 }} component="div">
            {item?.arrivedTo}
          </Typography>
        </Box>
        <Typography sx={{ my: 2 }} color="text.secondary">
          Price - {Number(item?.price)}
        </Typography>
        <Typography variant="body2">Seats - {Number(item?.seats)}</Typography>
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => {
            router.push(`routes/${item?.id}`);
          }}
        >
          Details
        </Button>
      </Card>
    </Box>
  );
});
export default Cart;
