import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

interface CalendarProps {
  onDateSelect?: (startDate: Date, endDate: Date) => void;
}

const CalendarPrime: React.FC<CalendarProps> = () => {
  const defaultDate = dayjs();
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const handleDatePickerChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            width: "100%",
            maxWidth: "185px",
            backgroundColor: "white",
          }}
          openTo="month"
          views={["year", "month"]}
          slotProps={{ textField: { size: "small" } }}
          value={selectedDate}
          onChange={handleDatePickerChange}
          onViewChange={(_view) => {}}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CalendarPrime;
