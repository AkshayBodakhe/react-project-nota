import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { Bar } from "react-chartjs-2";
import { addDays } from "date-fns";
import { useProviderGroupControllerServiceGetAllProviderGroupStats } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarConst } from "../../../provider/home/provider-dashboard-const";
import dayjs from "dayjs";
import { formButtonStyle } from "../../../../../styles/common";
import CloseIcon from "@mui/icons-material/Close";

interface Datasets {
  label: string;
  barThickness: number;
  data: any[];
}
interface GraphData {
  labels: string[];
  datasets: Datasets[];
}

const sxs = {
  btnDeactive: {
    background: "#F1F1F1",
    padding: "7px 20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  btnActive: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    outline: "1px solid #1A1A1A33",
    padding: "5px 20px",
    color: "#1B5984",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};

export const navbarStyles = {
  activePopButtons: {
    fontSize: "14px",
    padding: "6px 15px",
    color: "#36588C",
    fontWeight: "700",
  },
  menuMouseEvents: {
    pointerEvents: "none",
    marginTop: "4px",
  },
  parentGridList: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: " 0px 0px 8px #00000029",
    borderRadius: "5px",
    pointerEvents: "auto",
    position: "absolute !important",
  },
  popButtons: {
    fontSize: "14px",
    padding: "4px",
    color: "#1A1A1A99",
    cursor: "pointer",
  },
};

function ProviderGroupsGraph() {
  const [providerGrpFilter, setproviderGroupfilter] =
    useState<string>("thisYear");
  const [filterYear, setFilterYear] = useState<any>(
    moment().toDate().getFullYear()
  );

  const [openDialog, setOpenDialog] = useState(false);
  const firstDay = new Date(new Date().getFullYear(), 0, 1);
  const lastDay = new Date(new Date().getFullYear() + 1, 0, 1);

  const [startDate, setStartDate] = useState<any>(
    dayjs(firstDay).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<any>(
    dayjs(lastDay).format("YYYY-MM-DD")
  );
  const [selectedDate, setSelectedDate] = useState<any[]>([]);
  const { data: barGraphData } =
    useProviderGroupControllerServiceGetAllProviderGroupStats({
      year: filterYear,
      startDate:
        (providerGrpFilter !== "lastMonth" &&
          providerGrpFilter !== "thisYear" &&
          startDate) ||
        "",
      endDate:
        (providerGrpFilter !== "lastMonth" &&
          providerGrpFilter !== "thisYear" &&
          endDate) ||
        "",
    });
  const [error, setError] = useState(false);
  const [data, setData] = useState<GraphData>({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Provider Groups",
        barThickness: 20,
        data: [],
      },
    ],
  });

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (barGraphData?.data?.length) {
      const sortedData: any[] = getValues(barGraphData);
      const testArray: any[] = sortedData.map((month: any) => month.count);
      setData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: testArray,
          },
        ],
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: [],
          },
        ],
      }));
    }
  }, [barGraphData?.data, startDate, endDate]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDateChange = (item: any) => {
    setState([item.selection]);
    let date: any;
    date = moment(item.selection?.startDate).format("yyyy-MM-DD") + " - ";
    if (
      new Date(item.selection.startDate).getDate() !=
      new Date(item.selection.endDate).getDate()
    ) {
      date = date + moment(item.selection.endDate).format("yyyy-MM-DD");
    }

    if (date) {
      const startDate = item.selection.startDate;
      const endDate = item.selection.endDate;
      const yearDiff = moment(endDate).diff(startDate, "months");
      if (yearDiff === 11) {
        // console.log("startDate :: ", moment(startDate).format('yyyy-MM-DD'), "endDate ::", moment(endDate).format('yyyy-MM-DD'));
        const obj = [
          moment(startDate).format("yyyy-MM-DD"),
          moment(endDate).format("yyyy-MM-DD"),
        ];
        setError(false);
        setFilterYear("");
        setSelectedDate(obj);
        setIsHovered(false);
      } else setError(true);
    }
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current?.contains(event.target)) {
      setIsHovered(false);
      setState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 0),
          key: "selection",
        },
      ]);
      setSelectedDate([]);
    }
  };

  const handleFilter = (filter: string) => {
    setproviderGroupfilter(filter);
    switch (filter) {
      case "lastMonth":
        setFilterYear(moment().toDate().getFullYear() - 1);
        setSelectedDate([]);
        setState([
          {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: "selection",
          },
        ]);
        setIsHovered(false);
        break;
      case "thisYear":
        setFilterYear(moment().toDate().getFullYear());
        setSelectedDate([]);
        setState([
          {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: "selection",
          },
        ]);
        setIsHovered(false);
        break;
      case "custom":
        // setIsHovered(true);
        handleOpenDialog();
        break;
      default:
        break;
    }
  };

  function getValues(apiData: any) {
    const monthsOrder = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    const monthCounts = new Map();
    apiData.data.forEach((entry: any) => {
      const monthIndex = monthsOrder.indexOf(entry.month);
      if (monthIndex !== -1) {
        monthCounts.set(entry.month, entry.count);
      }
    });
    const sortedData = monthsOrder.map((month) => ({
      month,
      count: monthCounts.get(month) || null,
    }));
    return sortedData;
  }

  const handleStartDateChange = (date: any) => {
    setIsHovered(true);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setStartDate(formattedDate);
  };

  const handleChangeEndDate = (date: any) => {
    setIsHovered(true);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setEndDate(formattedDate);
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setOpenDialog((item) => !item);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 0px 6px #00000029",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Provider Groups
          </Typography>
          <Box>
            <Grid ref={ref}>
              <ButtonBase
                sx={
                  providerGrpFilter === "lastMonth"
                    ? sxs.btnActive
                    : sxs.btnDeactive
                }
                onClick={() => handleFilter("lastMonth")}
              >
                Last Year
              </ButtonBase>
              <ButtonBase
                sx={
                  providerGrpFilter === "thisYear"
                    ? sxs.btnActive
                    : sxs.btnDeactive
                }
                onClick={() => handleFilter("thisYear")}
              >
                This Year
              </ButtonBase>
              <ButtonBase
                sx={
                  providerGrpFilter === "custom"
                    ? sxs.btnActive
                    : sxs.btnDeactive
                }
                onClick={() => handleFilter("custom")}
              >
                Custom
              </ButtonBase>
              {isHovered && (
                <Grid
                  sx={{
                    ...navbarStyles.parentGridList,
                    ml: "60px",
                    mt: "20px",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                    alignItems: "center",
                    p: "10px",
                  }}
                >
                  {/* <Box sx={{ color: "red" }} display={error ? "flex" : "none"}>
                  Please select a date range of exactly one year.
                </Box>
                <DateRange
                  onChange={(item: any) => handleDateChange(item)}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  maxDate={new Date()}
                  selectsRange
                  showDateDisplay={false}
                  ranges={state}
                  direction="horizontal"
                  preventSnapRefocus={true}
                  calendarFocus="backwards"
                  showMonthAndYearPickers={true}
                /> */}

                  {startDate + " To " + endDate}
                  {/* <ButtonBase
                    sx={formButtonStyle.saveButtonStyle}
                    onClick={handleOpenDialog}
                  >
                    <Typography color={"#fff"}>{"Select Date"}</Typography>
                  </ButtonBase> */}
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <Bar
          data={data}
          options={{
            scales: {
              x: {
                grid: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Months",
                  font: {
                    weight: 600,
                    size: 13,
                  },
                  color: "#1A1A1A99",
                },
              },
              y: {
                ticks: {
                  stepSize: 50,
                },
                grid: {
                  display: false,
                },
                beginAtZero: true,
                title: {
                  display: true,
                  text: "No Of Provider Groups",
                  padding: { top: 0, bottom: 5 },
                  font: {
                    weight: 600,
                    size: 14,
                  },
                  color: "#1A1A1A99",
                },
              },
            },
            responsive: true,
            plugins: {
              legend: {
                display: false,
                // position: 'bottom',
                // labels: {
                //     boxWidth: 0,
                //     font: {
                //         weight: 600
                //     }
                // },
              },
            },
            layout: {
              padding: {
                left: 5,
                right: 0,
                top: 20,
                bottom: 0,
              },
            },
            elements: {
              bar: {
                backgroundColor: "#006BB5",
                borderRadius: 5,
              },
            },
          }}
          height={"172px !important"}
          width={"500px !important"}
        />
      </Box>
      <Box>
        <Dialog
          open={openDialog}
          onClose={handleOpenDialog}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth="md"
        >
          <DialogTitle id="scroll-dialog-title" sx={{ background: "#F5F6F9" }}>
            <Grid container justifyContent={"space-between"}>
              <Typography variant="h3">{"Select Date"}</Typography>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={handleOpenDialog}
              />
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Box
              pt={3}
              sx={{
                display: "flex",
                gap: "15px",
              }}
            >
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
          </DialogContent>
          <DialogActions>
            <ButtonBase
              sx={formButtonStyle.saveButtonStyle}
              onClick={handleOpenDialog}
            >
              <Typography color={"#fff"}>{"Apply Date"}</Typography>
            </ButtonBase>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default ProviderGroupsGraph;
