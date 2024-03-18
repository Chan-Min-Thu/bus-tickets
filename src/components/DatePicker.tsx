import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  date: null | Date;
  isPast: boolean;
  handleDate: (e: any) => void;
}

export default function MuiDatePicker({ handleDate, date, isPast }: Props) {
  // console.log(DatePicker);
  return (
    <Box sx={{ my: 1 }}>
      {/* <DemoItem label="Responsive variant"> */}
      <DatePicker
        label="Date picker"
        defaultValue={date}
        onChange={handleDate}
        disablePast={isPast}
        sx={{ width: { xs: 230, sm: 300 }, color: "#FFFFFF" }}
      />
      {/* </DemoItem> */}
    </Box>
  );
}
