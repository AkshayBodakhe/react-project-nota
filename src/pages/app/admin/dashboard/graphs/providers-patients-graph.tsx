import {
  Autocomplete,
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { DateRange } from "react-date-range";
import { Line } from "react-chartjs-2";
import {
  useAnalyticsControllerServiceGetAllProviderPatientStats,
  useProviderGroupControllerServiceGetAllProviderGroups,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import moment from "moment";
import { addDays } from "date-fns";
import { selectInputStyle } from "../../../../../pages/app/admin/new-master/data-import/view-patient-record";
import { navbarStyles } from "./provider-group-graph";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
import { multiSelectDropDown } from "../../../provider/patient/add-new-patient";
import { patientStyle } from "../../../provider/patient/style/commonStyle";
import { ProviderGroupControllerService } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import dayjs from "dayjs";
import { formButtonStyle } from "../../../../../styles/common";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CalendarConst } from "../../../provider/home/provider-dashboard-const";
import CloseIcon from "@mui/icons-material/Close";

export const style = makeStyles(() => ({
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
}));

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
  graphContainer: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 0px 6px #00000029",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    width: "35rem",
  },
};

function ProvidersAndPatientsGraph() {
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
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [providerGrp, setProviderGrp] = useState<any>(null);
  const [providergroupOptions, setProviderGroupOption] = useState([]);
  const ref = useRef<HTMLInputElement | null>(null);
  const [pagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    status: true,
    state: "",
    totalPages: 0,
    totalElements: 0,
  });
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  const getSearchInput = (inputSearch: string) => {
    getProviderList(inputSearch);
  };

  const getProviderList = async (searchString?: string) => {
    let providerGroupData =
      await ProviderGroupControllerService.getAllProviderGroups(
        0,
        10,
        "created",
        "desc",
        searchString
      );
    setProviderGroupOption(providerGroupData?.data?.content);
  };

  useEffect(() => {
    getProviderList();
  }, []);

  const { data: lineGraphData } =
    useAnalyticsControllerServiceGetAllProviderPatientStats({
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
      providerGroupUuid: providerGrp?.uuid || "",
    });

  const { data: providerGrpList } =
    useProviderGroupControllerServiceGetAllProviderGroups({
      page: pagination?.page,
      size: pagination?.size,
      sortBy: pagination?.sortBy,
      sortDirection: pagination?.sortDirection,
      searchString: pagination?.searchString,
      status: pagination?.status,
      state: pagination?.state,
    });
  const styles = patientStyle();

  const defaultProps = {
    options: searchResult,
    getOptionLabel: (option: any) => option?.name,
  };

  const [data, setData] = useState({
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
        label: "Patients",
        data: [],
        fill: true,
        borderColor: "#02A1FF95",
        backgroundColor: "rgba(2, 161, 255, 0.1)",
        tension: 0.4,
      },
      {
        label: "Providers",
        data: [],
        fill: true,
        borderColor: "#5610F59D",
        backgroundColor: "rgba(2, 101, 255, 0.1)",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (lineGraphData?.data?.length) {
      const providerData: any[] = [];
      const patientData: any[] = [];
      const sortedData: any[] = getValues(lineGraphData);
      const testArray: any[] = sortedData?.map((month: any) => month.count);
      testArray.map((count: any) => {
        if (count) {
          providerData.push(count?.providerCount);
          patientData.push(count?.patientCount);
        } else {
          providerData.push(0);
          patientData.push(0);
        }
      });
      setData((prevState: any) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: patientData,
          },
          {
            ...prevState.datasets[1],
            data: providerData,
          },
        ],
      }));
    } else {
      setData((prevState: any) => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: [],
          },
          {
            ...prevState.datasets[1],
            data: [],
          },
        ],
      }));
    }
  }, [lineGraphData?.data, startDate, endDate]);

  useEffect(() => {
    if (providerGrpList?.data && providerGrpList.data?.content) {
      setSearchResult(providerGrpList.data.content);
    }
  }, [providerGrpList?.data]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
      const yearDiff = moment(endDate).diff(startDate, "years");
      if (yearDiff === 1) {
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
    const monthCounts = new Map<string, Object>();
    apiData.data.forEach((entry: any) => {
      const monthIndex = monthsOrder.indexOf(entry.month);
      if (monthIndex !== -1) {
        monthCounts.set(entry.month, {
          providerCount: entry.providerCount,
          patientCount: entry.patientCount,
        });
      }
    });
    const sortedData = monthsOrder.map((month) => ({
      month,
      count: monthCounts.get(month) || {},
    }));
    return sortedData;
  }

  const handleSelect = (value: any) => {
    setProviderGrp(value);
  };

  const handleStartDateChange = (date: any) => {
    setIsHovered(true);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setStartDate(formattedDate);
  };

  const handleChangeEndDate = (date: any) => {
    setIsHovered(true);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setEndDate(formattedDate);
  };

  const handleOpenDialog = () => {
    setOpenDialog((item) => !item);
  };

  return (
    <>
      <Box sx={sxs.graphContainer}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Providers & Patients
          </Typography>
          <Box sx={sxs.filterContainer}>
            {/* <Box width={"15rem"}>
            <Autocomplete
              {...defaultProps}
              sx={{
                ...selectInputStyle,
                "& .MuiInput-root .MuiInput-input": {
                  padding: "4px 4px 4px 4px !important",
                },
                height: "30px",
              }}
              id="controlled-demo"
              value={providerGrp}
              onChange={(event: any, newValue: any) => {
                console.log(event);
                setProviderGrp(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // onChange={(e) => seacrhProviderGroup(e.target.value)}
                  placeholder="Provider Group"
                  variant="standard"
                />
              )}
            />
          </Box> */}
            <Box width={"15rem"}>
              <Autocomplete
                sx={multiSelectDropDown}
                multiple={false}
                id="tags-standard"
                options={providergroupOptions || []}
                getOptionLabel={(option: any) => option.groupName}
                onChange={(_, value) => handleSelect(value)}
                // disableCloseOnSelect
                renderOption={(props, option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    // sx={{ background:"#F1F1F1 !important"}}
                    {...props}
                  >
                    {option.name}
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField
                    classes={{ root: styles.customTextField }}
                    {...params}
                    variant="outlined"
                    placeholder="Search By Provider Group"
                  />
                )}
                onInputChange={(_event, inputValue) => {
                  // Call your function with the inputValue
                  getSearchInput(inputValue);
                }}
              />
            </Box>
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
                    right: "2% !important",
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
                </Box> */}
                  {/* <DateRange
                  onChange={(item: any) => handleDateChange(item)}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  maxDate={new Date()}
                  selectsRange={""}
                  sx={{
                    ".css-11fnehd-MuiGrid-root": {
                      padding: "0 !important",
                      right: "2% !important",
                    },
                  }}
                  showDateDisplay={false}
                  ranges={state}
                  direction="horizontal"
                  preventSnapRefocus={true}
                  calendarFocus="backwards"
                  showMonthAndYearPickers={true}
                /> */}
                  {startDate + " To " + endDate}
                  <ButtonBase
                    sx={formButtonStyle.saveButtonStyle}
                    onClick={handleOpenDialog}
                  >
                    <Typography color={"#fff"}>{"Select Date"}</Typography>
                  </ButtonBase>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <Line
          data={data}
          options={{
            scales: {
              x: {
                type: "category",
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
                  text: "Count Of Provider And Patient",
                  padding: { top: 0, bottom: 5 },
                  font: {
                    weight: 600,
                    size: 14,
                  },
                  color: "#1A1A1A99",
                },

                // font: 12,
                // color: '#1A1A1A99'
              },
            },
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
                align: "end",
                labels: {
                  boxWidth: 10,
                  font: {
                    weight: 600,
                  },
                },
              },
            },
            layout: {
              padding: {
                left: 5,
                right: 0,
                top: 10,
                bottom: 0,
              },
            },
            elements: {
              arc: {
                circular: true,
              },
            },
          }}
          height={"170px !important"}
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
              mt={3}
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

export default ProvidersAndPatientsGraph;
