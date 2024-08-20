/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button, Grid, Popover, Typography } from "@mui/material";
import DateRange from "../../../../../../src/assets/icon/date_range_black.png";
import { makeStyles } from "@mui/styles";
export const dashboardStyle = makeStyles(() => ({
  calendarButton: {
    width: "max-content",
    padding: "5px 4px !important",
    border: "1px solid rgba(0, 0, 0, 0.2) !important",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2) !important",
  },
  calendarImage: {
    height: "auto",
    width: "auto",
    paddingRight: "5px",
  },
  subtitle: {
    textAlign: "left",
    fontSize: "12px !important",
    letterSpacing: "0px !important",
    color: "#1A1A1A99",
  },
}));
interface CalendarProps {
  onDateSelect: (startDate: Date, endDate: Date) => void;
}

const DateRangeCalender: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const classes = dashboardStyle();

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    setSelectionRange(ranges.selection);

    const today = new Date();
    const clampedEndDate = endDate > today ? today : endDate;
    setSelectedStartDate(startDate);
    setSelectedEndDate(clampedEndDate);
    onDateSelect(startDate, clampedEndDate);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "calendar-popover" : undefined;

  const handleOkButtonClick = () => {
    handleClose();
    if (selectedStartDate) {
      const endDate = selectedEndDate || selectedStartDate;
      onDateSelect(selectedStartDate, endDate);
    }
  };

  const handleCancelButtonClick = () => {
    handleClose();
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    onDateSelect(new Date(), new Date());
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear().toString();
    return `${day} ${month} ${year}`;
  };

  const minYear = 2000;

  const yearOptions = {
    minDate: new Date(minYear, 0, 1),
    maxDate: new Date(),
  };

  return (
    <div>
      <Button onClick={handleClick} className={classes.calendarButton}>
        <img src={DateRange} alt="cal" className={classes.calendarImage} />
        <Typography className={classes.subtitle}>
          {selectedStartDate &&
          selectedEndDate &&
          selectedStartDate.getTime() !== selectedEndDate.getTime()
            ? `${formatDate(selectedStartDate)} - ${formatDate(
                selectedEndDate
              )}`
            : formatDate(selectedStartDate || new Date())}
        </Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Grid container sx={{ margin: "5px", marginLeft: "15px" }}>
        </Grid>
        <DateRangePicker
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={[selectionRange]}
          direction="horizontal"
          inputRanges={[]}
        //   staticRanges={staticRanges}
          {...yearOptions}
          maxDate={new Date()}
        />
        <Grid container sx={{ justifyContent: "end " }}>
          <Grid item sx={{ margin: "5px !important" }}>
            <Button
              variant="contained"
              onClick={handleCancelButtonClick}
              sx={{ background: "#0097F0 !important" }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item sx={{ margin: "5px !important", marginBottom: "5px" }}>
            <Button
              variant="contained"
              onClick={handleOkButtonClick}
              sx={{ background: "#0097F0 !important", marginBottom: "5px" }}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};

export default DateRangeCalender;
