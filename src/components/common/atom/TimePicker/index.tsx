import { Box } from "@mui/material";
import Label from "../Label";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useEffect } from "react";

export const css = {
  demoContainer: {
    paddingTop: "0px",
    marginTop: "10px",
    borderRadius: "5px",
    opacity: 1,
    boxShadow: "0px 0px 6px rgb(0 0 0 / 20%)",
    "& .MuiFormControl-root": { minWidth: "100% !important" },
    "& fieldset": {
      border: "0px solid rgba(0, 0, 0, 0.23)",
    },
  },
  timePicker: {
    " & .MuiOutlinedInput-root": { height: "40px" },
    "& input": {
      color: "black",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 400,
      padding: "0px 14px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "20px",
    },
  },
};

const CustomTimePicker = ({
  label,
  flexDirection,
  fullWidth,
  isRequired,
  value,
  onChange,
  format,
}: any) => {
  useEffect(() => {}, [value]);

  return (
    <Box flexDirection={flexDirection || "row"} width={fullWidth ? "100%" : "unset"}>
      <Label label={label} isRequired={isRequired} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]} sx={css.demoContainer}>
          <TimePicker
            value={dayjs(value, "HH:mm:ss")}
            onChange={(e: any) => {
              let date: any = dayjs(e.$d).format(format || "HH:mm:ss");
              onChange(format ? date : e.$d);
            }}
            sx={css.timePicker}
            views={["hours", "minutes"]}
            timeSteps={{ minutes: 30 }}
            ampm={false} 
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};

export default CustomTimePicker;
