import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { dupilcated } from "@/util/general";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface Props {
  name: string;
  cars: string[];
  point: string;
  setChange: (e: any) => void;
}
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};
const InputTag = ({ name, cars, point, setChange }: Props) => {
  return (
    <FormControl
      sx={{ my: 1, width: { xs: 230, sm: 300 } }}
      // color="success"
    >
      <InputLabel sx={{ color: "#000000" }} id="demo-multiple-name-label">
        {String(name)}
      </InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        defaultValue={point}
        sx={{ color: "#000000" }}
        onChange={setChange}
        input={<OutlinedInput label={name} />}
        MenuProps={MenuProps}
      >
        {cars &&
          cars.length &&
          dupilcated(cars).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default InputTag;
