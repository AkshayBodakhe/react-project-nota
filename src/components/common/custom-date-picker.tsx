import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
type ChangeDateFn = (date: Date | null) => void;

interface CustomDatePickerProps {
  value: any;
  changeDate: ChangeDateFn;
  label?: any;
  width?: string;
  height?: string;
  disableFuture?: boolean;
  disablePast?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  changeDate,
  width,
  height,
  disableFuture,
  disablePast,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture={disableFuture}
        disablePast={disablePast}
        sx={{
          width: `${width || "100%"}`,
          height: `${height || "100%"}`,
          "& input::placeholder": {
            fontSize: "12px !important",
          },
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
            padding: "10px 14px !important",
            font: "revert",
          },
          "& .css-1vvkud8-MuiInputBase-input-MuiOutlinedInput-input ": {
            padding: "8.5px 14px !important",
            fontSize: "14px !important",
          },
        }}
        slotProps={{
          field: {
            readOnly: false,
          },
        }}
        value={value}
        onChange={changeDate}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
