import { Box, Checkbox, MenuItem, Select, Typography } from "@mui/material";
import React, {
  ChangeEvent,
  useCallback,
  useState,
  CSSProperties,
} from "react";
import { CalendarView } from "./CalendarView";
import theme from "../../../../../theme";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { format } from "date-fns";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface CalendarHeaderProps {
  source: string;
  onViewChange?: (view: CalendarView) => void;
  view: any;
  getWeekRange: any;
  onDatePrev: any;
  date: any;
  onDateNext: any;
}
const styleForYear: CSSProperties = {
  color: `${theme.palette.grey[700]}`,
  fontSize: "20px",
  fontWeight: 600,
};

const styleForMonth: CSSProperties = {
  fontWeight: 600,
  fontSize: "20px",
  color: `${theme.palette.grey[700]}`,
};
interface ViewOption {
  label: string;
  value: CalendarView;
}
const viewOptions: ViewOption[] = [
  {
    label: "Month",
    value: "dayGridMonth",
  },
  {
    label: "Week",
    value: "timeGridWeek",
  },
  {
    label: "Day",
    value: "timeGridDay",
  },
  {
    label: "Agenda",
    value: "listWeek",
  },
];
const getMonthName = (date: string) => {
  const monthNumber = new Date(date).getMonth();
  const options: any = { month: "long" };
  const monthName = new Date(0, monthNumber, 1).toLocaleString(
    "en-US",
    options
  );
  return monthName;
};

const CalendarHeader = (props: CalendarHeaderProps) => {
  const {
    source,
    onViewChange,
    view,
    getWeekRange,
    date,
    onDatePrev,
    onDateNext,
  } = props;
  const [selectedValue, setSelectedValue] = useState("Day");
  const [virtualChecked, setVirtualChecked] = useState(false);
  const [inPersonCheck, setInPersonCheck] = useState(false);
  const startYear = new Date(getWeekRange?.start).getFullYear();
  const endYear = new Date(getWeekRange?.end).getFullYear();
  const startDay = new Date(getWeekRange?.start).getDate();
  const endDay = new Date(getWeekRange?.end).getDate();
  const startMonthName = getMonthName(getWeekRange?.start);
  const endMonthName = getMonthName(getWeekRange?.end);
  const handleVirtualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVirtualChecked(event.target.checked);
    //setSelectedLocations([]);
  };

  const handleInPersonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInPersonCheck(event.target.checked);
  };
  const handleViewChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      onViewChange?.(event.target.value as CalendarView);
    },
    [onViewChange]
  );

  const dateMonth = format(date, "MMMM");
  const dateDay = format(date, "dd");
  const dateYear = format(date, "y");
  const syntheticEventMonth: ChangeEvent<HTMLInputElement> = {
    target: {
      value: viewOptions[0].value,
    },
  } as ChangeEvent<HTMLInputElement>;
  const syntheticEventWeek: ChangeEvent<HTMLInputElement> = {
    target: {
      value: viewOptions[1].value,
    },
  } as ChangeEvent<HTMLInputElement>;

  const syntheticEventDay: ChangeEvent<HTMLInputElement> = {
    target: {
      value: viewOptions[2].value,
    },
  } as ChangeEvent<HTMLInputElement>;

  const handleSelectOption = (value: string) => {
    setSelectedValue(value);
    if (value === "Month") {
      handleViewChange(syntheticEventMonth);
    } else if (value === "Week") {
      handleViewChange(syntheticEventWeek);
    } else {
      handleViewChange(syntheticEventDay);
    }
  };
  return (
    <>
      {source === "calendar" && (
        <Box
          sx={{
            p: 2,
            alignItems: "flex-end",
            display: "flex",
            float: "right",
          }}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <IconButton onClick={onDatePrev}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <Typography variant="h5">
              {view === "timeGridWeek" ? (
                startYear !== endYear ? (
                  <>
                    <span
                      style={styleForMonth}
                    >{`${startDay} ${startMonthName} `}</span>
                    <span style={styleForYear}>{startYear}</span>
                    <span
                      style={styleForMonth}
                    >{`-${endDay} ${endMonthName} `}</span>
                    <span style={styleForYear}>{endYear}</span>
                  </>
                ) : startMonthName !== endMonthName ? (
                  <>
                    <span
                      style={styleForMonth}
                    >{`${startDay} ${startMonthName}-${endDay} ${endMonthName} `}</span>
                    <span style={styleForYear}>{startYear}</span>
                  </>
                ) : (
                  <>
                    <span
                      style={styleForMonth}
                    >{`${startDay}-${endDay} ${startMonthName} `}</span>
                    <span style={styleForYear}>{startYear}</span>
                  </>
                )
              ) : view === "timeGridDay" ? (
                <>
                  <span style={styleForMonth}>{dateDay}</span>{" "}
                  <span style={styleForMonth}>{dateMonth}</span>{" "}
                  <span style={styleForYear}>{dateYear}</span>
                </>
              ) : (
                <>
                  <span style={styleForMonth}>{dateMonth}</span>{" "}
                  <span style={styleForYear}>{dateYear}</span>
                </>
              )}
            </Typography>

            <IconButton onClick={onDateNext}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Select
            displayEmpty
            name=""
            size="small"
            value={selectedValue}
            placeholder="S"
            onChange={(e) => handleSelectOption(e.target.value)}
            renderValue={(selected) => {
              return (
                <Typography variant="h5" display="flex" alignItems="center">
                  {selected}
                </Typography>
              );
            }}
          >
            {["Day", "Week", "Month"]?.map((option, optionIndex) => (
              <MenuItem key={optionIndex} value={option}>
                <Typography variant="h5">{option}</Typography>
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </>
  );
};

export default CalendarHeader;
