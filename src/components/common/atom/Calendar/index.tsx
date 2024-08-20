import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect } from "react";
import Label from "../Label";
import { Box, Typography } from "@mui/material";
import { commonWidget } from "../../../../styles/common";

const Calendar = ({
  label,
  isRequired,
  format,
  error,
  isError,
  name,
  value,
  onChange,
  disableFuture,
  disablePast,
  minDate,
  isReadOnly,
}: any) => {
  const classes = commonWidget();
  useEffect(() => {}, [value]);
  return (
    <React.Fragment key={"Calendar"}>
      <Label label={label} isRequired={isRequired} />
      <Box className={isError && error ? classes.inputBoxError : ""}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{ textField: { size: "small" } }}
            disableFuture={disableFuture}
            disablePast={disablePast}
            minDate={minDate}
            value={dayjs(value)}
            readOnly={isReadOnly}
            onChange={(e: any) => {
              let date;
              switch (format) {
                case "ISO":
                  date = moment(e.$d).toISOString();
                  break;
                case "UTC":
                  date = new Date(e.$d).toUTCString();
                  break;
                default:
                  date = moment(e.$d).format("yyyy-MM-DD");
                  break;
              }
              let obj = {
                target: {
                  name: name,
                  value: date,
                },
              };
              onChange(obj);
            }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "14px !important",
              },
              width: "100%",
              "& fieldset": { border: "none" },
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
              "& label": {
                color: "#1A1A1A80 !important",
                fontSize: "14px !important",
              },
            }}
          />
        </LocalizationProvider>
      </Box>
      {isError && error && (
        <Typography color="error" sx={{ mt: 1 }} variant="body2">
          {error}
        </Typography>
      )}
    </React.Fragment>
  );
};

export default Calendar;
