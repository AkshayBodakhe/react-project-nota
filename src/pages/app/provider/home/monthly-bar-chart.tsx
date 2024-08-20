import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useAppointmentControllerServiceGetAppointmentCountByProvider } from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import CustomFormLabel from "../../../../components/common/custom-form-label";
import CustomDatePicker from "../../../../components/common/custom-date-picker";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarConst } from "./provider-dashboard-const";
import moment from "moment";
import { ErrorResponseEntity } from "../../../../components/common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyBarChart = () => {
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const firstDay = new Date(new Date().getFullYear(), 0, 1);
  const lastDay = new Date(new Date().getFullYear() + 1, 0, 1);
  const [graphsDemo, setGraphData] = useState<any>();
  const [startDate, setStartDate] = useState<any>(
    dayjs(firstDay).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<any>(
    dayjs(lastDay).format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();

  const handleStartDateChange = (date: any) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      const oneYearFromToday = dayjs(date).add(1, "year").format("YYYY-MM-DD");
      setStartDate(formattedDate);
      setEndDate(oneYearFromToday);
    } else {
      setStartDate(null);
    }
  };

  const handleChangeEndDate = (date: any) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setEndDate(formattedDate);
    } else {
      setEndDate(null);
    }
  };

  const {
    data: graphData,
    isError,
    error,
  } = useAppointmentControllerServiceGetAppointmentCountByProvider({
    providerUuid: userDetails?.data?.uuid,
    startDate: startDate,
    endDate: endDate,
  });

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity)?.body.message,
          severity: "error",
        })
      );
    }
  }, [isError]);

  useEffect(() => {
    setGraphData(graphData && graphData?.data);
  }, [graphData, startDate, endDate]);

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Cancelled",
        data: [
          graphsDemo?.CANCELLED?.JANUARY,
          graphsDemo?.CANCELLED?.FEBRUARY,
          graphsDemo?.CANCELLED?.MARCH,
          graphsDemo?.CANCELLED?.APRIL,
          graphsDemo?.CANCELLED?.MAY,
          graphsDemo?.CANCELLED?.JUNE,
          graphsDemo?.CANCELLED?.JULY,
          graphsDemo?.CANCELLED?.AUGUST,
          graphsDemo?.CANCELLED?.SEPTEMBER,
          graphsDemo?.CANCELLED?.OCTOBER,
          graphsDemo?.CANCELLED?.NOVEMBER,
          graphsDemo?.CANCELLED?.DECEMBER,
        ],
        backgroundColor: "#dc3545",
      },
      {
        label: "No show",
        data: [
          graphsDemo?.NO_SHOW?.JANUARY,
          graphsDemo?.NO_SHOW?.FEBRUARY,
          graphsDemo?.NO_SHOW?.MARCH,
          graphsDemo?.NO_SHOW?.APRIL,
          graphsDemo?.NO_SHOW?.MAY,
          graphsDemo?.NO_SHOW?.JUNE,
          graphsDemo?.NO_SHOW?.JULY,
          graphsDemo?.NO_SHOW?.AUGUST,
          graphsDemo?.NO_SHOW?.SEPTEMBER,
          graphsDemo?.NO_SHOW?.OCTOBER,
          graphsDemo?.NO_SHOW?.NOVEMBER,
          graphsDemo?.NO_SHOW?.DECEMBER,
        ],
        backgroundColor: "#623ab2",
      },
      {
        label: "Not Confirmed",
        data: [
          graphsDemo?.NOT_CONFIRMED?.JANUARY,
          graphsDemo?.NOT_CONFIRMED?.FEBRUARY,
          graphsDemo?.NOT_CONFIRMED?.MARCH,
          graphsDemo?.NOT_CONFIRMED?.APRIL,
          graphsDemo?.NOT_CONFIRMED?.MAY,
          graphsDemo?.NOT_CONFIRMED?.JUNE,
          graphsDemo?.NOT_CONFIRMED?.JULY,
          graphsDemo?.NOT_CONFIRMED?.AUGUST,
          graphsDemo?.NOT_CONFIRMED?.SEPTEMBER,
          graphsDemo?.NOT_CONFIRMED?.OCTOBER,
          graphsDemo?.NOT_CONFIRMED?.NOVEMBER,
          graphsDemo?.NOT_CONFIRMED?.DECEMBER,
        ],
        backgroundColor: "#fde0a6f2",
      },
      {
        label: "Rescheduled",
        data: [
          graphsDemo?.RE_SCHEDULED?.JANUARY,
          graphsDemo?.RE_SCHEDULED?.FEBRUARY,
          graphsDemo?.RE_SCHEDULED?.MARCH,
          graphsDemo?.RE_SCHEDULED?.APRIL,
          graphsDemo?.RE_SCHEDULED?.MAY,
          graphsDemo?.RE_SCHEDULED?.JUNE,
          graphsDemo?.RE_SCHEDULED?.JULY,
          graphsDemo?.RE_SCHEDULED?.AUGUST,
          graphsDemo?.RE_SCHEDULED?.SEPTEMBER,
          graphsDemo?.RE_SCHEDULED?.OCTOBER,
          graphsDemo?.RE_SCHEDULED?.NOVEMBER,
          graphsDemo?.RE_SCHEDULED?.DECEMBER,
        ],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
      {
        label: "Scheduled",
        data: [
          graphsDemo?.SCHEDULED?.JANUARY,
          graphsDemo?.SCHEDULED?.FEBRUARY,
          graphsDemo?.SCHEDULED?.MARCH,
          graphsDemo?.SCHEDULED?.APRIL,
          graphsDemo?.SCHEDULED?.MAY,
          graphsDemo?.SCHEDULED?.JUNE,
          graphsDemo?.SCHEDULED?.JULY,
          graphsDemo?.SCHEDULED?.AUGUST,
          graphsDemo?.SCHEDULED?.SEPTEMBER,
          graphsDemo?.SCHEDULED?.OCTOBER,
          graphsDemo?.SCHEDULED?.NOVEMBER,
          graphsDemo?.SCHEDULED?.DECEMBER,
        ],
        backgroundColor: "#078cc3",
      },
      {
        label: "Check In",
        data: [
          graphsDemo?.CHECKED_IN?.JANUARY,
          graphsDemo?.CHECKED_IN?.FEBRUARY,
          graphsDemo?.CHECKED_IN?.MARCH,
          graphsDemo?.CHECKED_IN?.APRIL,
          graphsDemo?.CHECKED_IN?.MAY,
          graphsDemo?.CHECKED_IN?.JUNE,
          graphsDemo?.CHECKED_IN?.JULY,
          graphsDemo?.CHECKED_IN?.AUGUST,
          graphsDemo?.CHECKED_IN?.SEPTEMBER,
          graphsDemo?.CHECKED_IN?.OCTOBER,
          graphsDemo?.CHECKED_IN?.NOVEMBER,
          graphsDemo?.CHECKED_IN?.DECEMBER,
        ],
        backgroundColor: "#dc78e1",
      },
      {
        label: "Completed",
        data: [
          graphsDemo?.COMPLETED?.JANUARY,
          graphsDemo?.COMPLETED?.FEBRUARY,
          graphsDemo?.COMPLETED?.MARCH,
          graphsDemo?.COMPLETED?.APRIL,
          graphsDemo?.COMPLETED?.MAY,
          graphsDemo?.COMPLETED?.JUNE,
          graphsDemo?.COMPLETED?.JULY,
          graphsDemo?.COMPLETED?.AUGUST,
          graphsDemo?.COMPLETED?.SEPTEMBER,
          graphsDemo?.COMPLETED?.OCTOBER,
          graphsDemo?.COMPLETED?.NOVEMBER,
          graphsDemo?.COMPLETED?.DECEMBER,
        ],
        backgroundColor: "#198754",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Data with Multiple Colored Bars",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "#ccc", // Customize grid line color
          lineWidth: 1, // Customize grid line width
        },
      },
      y: {
        grid: {
          display: true,
          color: "#ccc", // Customize grid line color
          lineWidth: 1, // Customize grid line width
        },
      },
    },
  };

  return (
    <Grid width={"100%"} display={"flex"} flexDirection={"column"} px={2}>
      <Box sx={{ display: "flex", justifyContent: "end", gap: "20px" }}>
        <Grid>
          <CustomFormLabel label={"Start Date"} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={handleStartDateChange}
              value={""}
              slotProps={{
                textField: { size: "small" },
              }}
              sx={CalendarConst}
            />
          </LocalizationProvider>
        </Grid>
        <Grid>
          <CustomFormLabel label={"End Date"} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={handleChangeEndDate}
              value={""}
              slotProps={{
                textField: { size: "small" },
              }}
              sx={CalendarConst}
            />
          </LocalizationProvider>
        </Grid>
      </Box>
      <Box width={"100%"} height={"80%"}>
        <Bar data={data} options={options} width={"70%"} height={"20%"} />
      </Box>
    </Grid>
  );
};

export default MonthlyBarChart;
