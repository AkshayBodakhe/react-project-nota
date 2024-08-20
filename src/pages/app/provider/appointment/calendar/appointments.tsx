import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker, DateCalendar } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";
import {
  Typography,
  Grid,
  IconButton,
  Select,
  MenuItem,
  InputBase,
  Autocomplete,
  TextField,
  Box,
  ButtonBase,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import AppoinmentsWithLocation from "./appointmentWithLocations";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Calendar from "./calendar";
import dayjs from "dayjs";
import ScheduleNewAppointment from "../../../../../components/common/drawer/Appointment/scheduleAppointment";
import { formButtonStyle } from "../../../../../styles/common";
import ScheduleAppointment from "./scheduleAppointment";
import CalendarView from "./CalendarView";
import {
  AppointmentListLocationRequest,
  AppointmentListRequest,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  useAppointmentControllerServiceGetAppointmentList,
  useLocationControllerServiceGetAllLocations,
  useProviderControllerServiceGetAllProviders,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
const { appointmentType } = AppointmentListRequest;
const { availabilityPresenceType } = AppointmentListLocationRequest;

export interface SearchCriteria {
  selectStatus: any;
  searchProvider: any[];
  searchLocation: string;
  appointmentType: any;
  availabilityPresenceType: any;
  locationUuid: string[];
  patientSearch: string;
  allProvider: boolean;
}
const status: any[] = [
  { value: "", label: "All", color: "" },
  { value: "COMPLETED", label: "Completed", color: "#000000" },
  { value: "CHECKED_IN", label: "Checked In", color: "#XXXXXX" },
  // { value: "WAITING_ROOM", label: "Waiting Room", color: "#XXXXXX" },
  // { value: "IN_EXAM_ROOM", label: "In Exam Room", color: "#XXXXXX" },
  { value: "SCHEDULED", label: "Scheduled", color: "#XXXXXX" },
  { value: "NOT_CONFIRMED", label: "Not Confirmed", color: "#XXXXXX" },
  // { value: "CONFIRMED", label: "Confirmed", color: "#XXXXXX" },
  { value: "CANCELLED", label: "Cancelled", color: "#XXXXXX" },
  { value: "RE_SCHEDULED", label: "Rescheduled", color: "#XXXXXX" },
  { value: "NO_SHOW", label: "No Show", color: "#XXXXXX" },
  // { value: "PENDING", label: "Pending", color: "#XXXXXX" },
  // { value: "ENCOUNTERED", label: "Encountered", color: "#XXXXXX" },
  // { value: "RE_SCHEDULED", label: "Re-scheduled", color: "#XXXXXX" },
  // { value: "SEEN", label: "Seen", color: "#XXXXXX" },
  // { value: "SINGED_OFF", label: "Signed Off", color: "#XXXXXX" },
  // { value: "DECLINE", label: "Decline", color: "#XXXXXX" },
];

const appointmentTypes = [
  { value: appointmentType.FOLLOW_UP, label: "Follow Up" },
  { value: appointmentType.INITIAL, label: "Initial" },
  { value: "", label: "All" },
];
const availabilityPresenceTypes = [
  { value: availabilityPresenceType.IN_PERSON, label: "In Person" },
  { value: availabilityPresenceType.VIRTUAL, label: "Virtual" },
];

export const availabilityStyles = makeStyles(() => ({
  inputStyleInitial: {
    fontSize: "14px !important",
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    padding: "12px 10px 12px 10px",
    color: `#1A1A1A7F !important`,
    height: "40px !important",
    width: "100%",
  },
  select: {
    width: "100%",
    ".MuiOutlinedInput-notchedOutline": {
      border: "none",
      fontSize: "16px !important",
    },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    fontSize: "16px",
    background: "white",
    //height: "38px",
    "@media (max-width: 1280px)": {
      width: "100% !important",
      fontSize: "16px !important",
    },
    height: "50px !important",
    // border: "none",
    "& fieldset": { fontSize: "16px " },
    // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    // marginTop: "8px",
  },
  sideBarButton: {
    height: "40px",
    background: "#004186 0% 0% no-repeat padding-box !important",
    borderRadius: " 5px !important",
    color: "#fff !important",
    display: "flex",
    justifyContent: "space-evenly !important",
    boxShadow: "0px 0px 8px #00000029",
    alignItems: "center !important",
    border: "1px solid #004186 !important",
    padding: "0 10px !important",
  },
  whiteText: {
    color: "#FFFFFF !important",
    fontWeight: "bold !important",
    textTransform: "initial",
  },
  addButtonTypo: {
    color: "#ffffff !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "2px",
    opacity: 0.9,
  },
  AddressFormLongtInputField2: {
    background: "#ffffff",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #C4C4C4 !important",
    //border: "none",
    //"& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "50px",
    textAlign: "center",
    padding: "13px 0px 10px 6px",
    fontSize: "14px",
    alignItems: "center",
    "& input::placeholder": {
      alignItems: "center",
      fontSize: "16px",
    },
    "@media (max-width: 820px)": {
      width: "100%",
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  inputBoxText2: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "1rem !important",
    lineHeight: "140%",
    //color: "#000000",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive2: {
    background: "#FFFFFF 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 6px #00418602 !important",
    border: "2px solid #36588C !important",
    borderRadius: "4px !important",
  },
  calendarStyle: {
    margin: "10px 0px 0px 0px !important",
    "@media (max-width: 1600px)": {
      margin: "35px 0px 30px 0px !important",
      //height:'50px !important'
    },
  },
}));

export const multiSelectDropDown = {
  borderRadius: "5px",
  background: "#ffffff",
  marginTop: "15px",
  //border: "none",
  //"& fieldset": { border: "none" },
  //".MuiOutlinedInput-notchedOutline": { border: "none" },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  ".MuiOutlinedInput-root": {
    padding: "5px 2px 7px !important",
    height: "auto !important",
  },
  // ".MuiChip-root": {
  //     height: "28px !important",
  // },
};

const sxs = {
  mainButtonStyle: {
    backgroundColor: "#DAEAF8",
    textTransform: "initial",
    fontSize: "14px",
    // fontWeight: "bold",
    color: "#36588C",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    borderRadius: "4px",
  },
  addButtonIcon: {
    color: "#36588C !important",
    display: "flex",
    paddingRight: "12px",
    opacity: 0.7,
  },
  calendarListOuter: {
    display: "flex",
    flexDirection: "row",
    background: "#ffffff",
    justifyContent: "center",
    borderRadius: "5px",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    alignItems: "center",
    padding: "3px",
    gap: 1,
  },
  activeItem: {
    background: "#36588C",
    color: "#ffffff",
    alignItems: "center",
    display: "flex",
    padding: "1px",
    borderRadius: "3px",
  },
  inActiveItem: {
    background: "#ffffff",
    color: "#36588C",
    alignItems: "center",
    display: "flex",
    padding: "1px",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

function ProviderSchedulingAppointments() {
  const classes = availabilityStyles();
  const [isScheduleNewAppoinmentOpen, setScheduleNewAppoinment] =
    useState(false);
  const [scheduleAppointment, setScheduleAppointment] = useState(false);
  const [inpersonRows, setInpersonRows] = useState<any>();
  const [virtualRows, setVirtualRows] = useState<any>();

  const [filterBySearch, setFilterBySearch] = useState<SearchCriteria>({
    selectStatus: "",
    searchProvider: [],
    searchLocation: "",
    appointmentType: null,
    availabilityPresenceType: null,
    locationUuid: [],
    patientSearch: "",
    allProvider: false,
  });
  const [selectedItem, setSelectedItem] = useState("list");
  const defaultDate = dayjs();
  const [currentDate, setCurrentDate] = useState(defaultDate);
  const [providerList, setProviderList] = useState([
    { userUuid: "all", name: "All Providers" },
  ]);
  const [isShortView, setIsShortView] = useState(false);
  const [locationList, setLocationList] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(false);

  // useEffect(() => {
  //   const someDiv = document.getElementById("iFrame");
  //   if (someDiv) {
  //     someDiv.style.display = "none";
  //     const uRl = `/`;
  //     someDiv.setAttribute("src", uRl);
  //   }

  //   const frame = window.parent.document.getElementById("iFrame");
  //   const draggable = window.parent.document.getElementById("parent");

  //   if (frame && draggable) {
  //     const uRl = ``;
  //     frame.setAttribute("src", uRl);
  //     frame.setAttribute("data", uRl);
  //     frame.style.display = "none";
  //     draggable.style.display = "none";
  //   }
  // });

  setTimeout(() => {
    setShowLoader(false);
  }, 3000);
  const userDetail = useSelector(
    (state: any) => state.commonReducer.userDetail?.data
  );
  const {
    data: providerListData,
    refetch,
    isLoading,
  } = useProviderControllerServiceGetAllProviders({
    providerGroupUuid: userDetail?.providerGroup,
    page: 0,
    size: 100,
  });
  // const providerGroupUuid = userDetail?.providerGroup;

  const {
    data: locationListData,
    refetch: locationRefetch,
    isLoading: locationListLoading,
  } = useLocationControllerServiceGetAllLocations({
    providerGroupUuid: userDetail?.providerGroup,
  });

  const setLocationData = (data: any[]) => {
    const appointmentList = data?.map((item: any) => {
      return {
        name: item?.name,
        uuid: item?.uuid,
      };
    });
    setLocationList(appointmentList);
  };

  const handleFilterChange = (event: any, filterKey: string) => {
    setFilterBySearch((prev) => {
      return {
        ...prev,
        [filterKey]: event,
      };
    });
  };

  const handleProviderSelect = (_e: any, selected: any) => {
    setFilterBySearch((prev: any) => {
      const isAllProviderSelected = selected?.some(
        (item: any) => item.userUuid === "all"
      );
      return {
        ...prev,
        searchProvider: isAllProviderSelected
          ? []
          : selected?.map((item: any) => item.userUuid),
        allProvider: isAllProviderSelected,
      };
    });
  };

  const handleLocationChange = (_e: any, selected: any) => {
    setFilterBySearch((prev: any) => {
      return {
        ...prev,
        locationUuid: selected?.map((item: any) => item.uuid),
      };
    });
  };
  const handlePatientChange = (e: any) => {
    setFilterBySearch((prev: any) => {
      return {
        ...prev,
        patientSearch: e?.target.value,
      };
    });
  };
  const handleDateChange = (newDate: any) => {
    setCurrentDate(newDate);
  };
  const handleClick = () => {
    setScheduleAppointment((item) => !item);
  };

  const onSelectionItemChange = (value: string) => {
    setSelectedItem(value);
    //setSelectedCalendarValue("Day")
  };

  useEffect(() => {
    if (locationListData) {
      setLocationData(locationListData?.data?.content || []);
    }
  }, [locationListData]);

  useEffect(() => {
    if (providerListData) {
      setProviderList([
        { userUuid: "all", name: "All Providers" },
        ...providerListData?.data?.content?.map((provider: any) => {
          return {
            userUuid: provider?.userUuid,
            name: `${provider?.firstName} ${provider?.lastName}`,
          };
        }),
      ]);
    }
  }, [providerListData]);

  useEffect(() => {
    // Add an event listener to check window dimensions and update the view
    const handleResize = () => {
      setIsShortView(window.innerWidth <= 1600); // Adjust the breakpoint as needed
    };

    // Initial check
    handleResize();

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { mutateAsync: getAppointmentReq, data: appointmentList } =
    useAppointmentControllerServiceGetAppointmentList();

  const getAppointmentList = () => {
    setShowLoader(true);
    getAppointmentReq({
      requestBody: {
        appointmentStatus: filterBySearch.selectStatus?.value
          ? [filterBySearch.selectStatus?.value]
          : [],
        appointmentType: filterBySearch.appointmentType?.value || null,
        date: dayjs(currentDate).format("YYYY-MM-DD"),
        providerUuid: filterBySearch?.searchProvider || [],
        patientUserUuid: undefined,
        appointmentListLocationRequest: {
          locationUuid: filterBySearch?.locationUuid,
          availabilityPresenceType: undefined,
          // visitType === "In Person"
          //   ? availabilityPresenceType.IN_PERSON
          //   : availabilityPresenceType.VIRTUAL,
        },
        patientSearch: filterBySearch?.patientSearch,
        allProvider: filterBySearch.allProvider,
      },
    })
      .then(async (data: any) => {
        if (data.data && data.data.length === 0) {
          await setInpersonRows(null);
          await setVirtualRows(null);
        } else {
          let inpersonRows = null;
          let virtualRows = null;

          data.data.forEach((item: any) => {
            if (item.locationName === "IN_PERSON") {
              inpersonRows = item;
            } else if (item.locationName === "VIRTUAL") {
              virtualRows = item;
            }
          });

          await setInpersonRows(inpersonRows);
          await setVirtualRows(virtualRows);
        }
      })
      .catch((_er) => {})
      .finally(() => setShowLoader(false));
  };

  useEffect(
    () => {
      getAppointmentList();
    },
    [filterBySearch, currentDate, scheduleAppointment]
    // [callGetAllAptList, cancelAppointment]
  );

  return (
    <div>
      <Grid
        container
        spacing={2}
        lg={12}
        sx={{ margin: "0px 0px !important", display: "flex" }}
      >
        <Grid item lg={2} sx={{ paddingLeft: "0px !important" }}>
          <Typography
            variant="h2"
            sx={{
              //textAlign: "left",
              fontWeight: "bold !important",
              letterSpacing: "0.22px !important",
              color: "#1A1A1A",
            }}
          >
            {selectedItem !== "calendar" ? "Appointments List" : "Calendar"}
          </Typography>
          <Grid container lg={12} mt={4}>
            {selectedItem !== "calendar" && (
              <Grid item lg={12} className={classes.calendarStyle}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {isShortView ? (
                    <DatePicker
                      value={currentDate}
                      onChange={handleDateChange}
                      sx={{ width: "100%", background: "#ffffff" }}
                    />
                  ) : (
                    <DateCalendar
                      value={currentDate}
                      onChange={handleDateChange}
                      sx={{ width: "100%" }}
                    />
                  )}
                </LocalizationProvider>
              </Grid>
            )}
            <Grid item lg={12}>
              <InputBase
                classes={{
                  root: classes.AddressFormLongtInputField2,
                  input: classes.inputBoxText2,
                  focused: classes.inputBoxActive2,
                }}
                value={filterBySearch.patientSearch}
                onChange={handlePatientChange}
                placeholder="Search Patient Name"
                endAdornment={
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                }
                inputProps={{ fontSize: "1rem !important" }}
              />
            </Grid>
            <Grid item lg={12} mt={2}>
              <Autocomplete
                sx={multiSelectDropDown}
                multiple
                id="tags-standard"
                options={providerList}
                getOptionLabel={(option: any) => option?.name}
                onChange={handleProviderSelect}
                renderOption={(props, option: any) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{ justifyContent: "space-between" }}
                    {...props}
                  >
                    {option?.name}
                  </MenuItem>
                )}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder={
                        filterBySearch?.searchProvider.length
                          ? ""
                          : "Select Provider"
                      }
                    />
                  );
                }}
              />
            </Grid>
            <Grid item lg={12} mt={2}>
              <Autocomplete
                sx={multiSelectDropDown}
                id="tags-standard"
                options={locationList}
                multiple
                getOptionLabel={(option) => option?.name}
                onChange={handleLocationChange}
                disableCloseOnSelect
                renderOption={(props, option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{ justifyContent: "space-between" }}
                    {...props}
                  >
                    {option?.name}
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={
                      filterBySearch?.locationUuid.length
                        ? ""
                        : "Select Location"
                    }
                  />
                )}
              />
            </Grid>

            <Grid item lg={12} mt={3}>
              <Select
                value={filterBySearch.selectStatus}
                onChange={(e) =>
                  handleFilterChange(e.target.value, "selectStatus")
                }
                className={classes.select}
                displayEmpty
                renderValue={(selected: any) => {
                  if (!selected) {
                    return (
                      <span
                        style={{
                          fontSize: "16px !important",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#1a1a1a66",
                          }}
                        >
                          Status
                        </Typography>
                      </span>
                    );
                  }
                  return (
                    <Typography variant="h4">{selected?.label}</Typography>
                  );
                }}
              >
                {status.map((option: any) => (
                  <MenuItem key={option.value} value={option}>
                    <div style={{ color: option.color }}></div>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={12} mt={3}>
              <Select
                value={filterBySearch.appointmentType}
                onChange={(e) =>
                  handleFilterChange(e.target.value, "appointmentType")
                }
                className={classes.select}
                displayEmpty
                renderValue={(selected: any) => {
                  if (!selected) {
                    return (
                      <span
                        style={{
                          fontSize: "16px !important",
                        }}
                      >
                        <Typography sx={{ color: "#1a1a1a66" }}>
                          Appointment Type
                        </Typography>
                      </span>
                    );
                  }
                  return (
                    <Typography variant="h4">{selected?.label}</Typography>
                  );
                }}
              >
                {appointmentTypes.map((option: any) => (
                  <MenuItem key={option?.label} value={option}>
                    {option?.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {false && (
              <Grid item lg={12} mt={3}>
                <Select
                  value={filterBySearch.availabilityPresenceType}
                  onChange={(e) =>
                    handleFilterChange(
                      e.target.value,
                      "availabilityPresenceType"
                    )
                  }
                  className={classes.select}
                  displayEmpty
                  renderValue={(selected: any) => {
                    if (!selected) {
                      return (
                        <span>
                          <Typography
                            variant="h5"
                            sx={{
                              marginTop: "4px !important",
                              color: "#1A1A1A80",
                            }}
                          >
                            Availability Present Type
                          </Typography>
                        </span>
                      );
                    }
                    return (
                      <Typography variant="h4">{selected?.label}</Typography>
                    );
                  }}
                >
                  {availabilityPresenceTypes.map((option: any) => (
                    <MenuItem key={option?.label} value={option}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item lg={10}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              {/* <KeyboardArrowLeftIcon
                                style={{ cursor: "pointer" }}
                                onClick={handlePreviousDate}
                            />
                            <KeyboardArrowRightIcon
                                style={{ cursor: "pointer" }}
                                onClick={handleNextDate}
                            />
                            <Typography variant="h4">
                                {formattedDate}
                            </Typography> */}
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                justifyContent: "flex-end",
                gap: 2,
                height: "35px",
              }}
            >
              <Box sx={sxs.calendarListOuter}>
                <Box
                  onClick={() => onSelectionItemChange("list")}
                  sx={
                    selectedItem !== "calendar"
                      ? sxs.activeItem
                      : sxs.inActiveItem
                  }
                >
                  <ListAltOutlinedIcon />
                </Box>
                <Box
                  onClick={() => onSelectionItemChange("calendar")}
                  sx={
                    selectedItem === "calendar"
                      ? sxs.activeItem
                      : sxs.inActiveItem
                  }
                >
                  <CalendarMonthOutlinedIcon />
                </Box>
              </Box>
              <ButtonBase
                sx={{
                  ...formButtonStyle.saveButtonStyle,
                  width: "auto !important",
                  padding: "0px 10px",
                }}
                // aria-controls={open ? "basic-menu" : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <span className={classes.addButtonTypo}>
                  <Add />
                </span>
                Schedule Appoinment
              </ButtonBase>
              {/* <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <Box sx={{ width: '14.7rem' }}>
                                    <MenuItem sx={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif' }} onClick={() => handleScheduleAppointnemt("new_appoinment")}>
                                        New Appointment
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: '14px', fontFamily: 'Roboto, sans-serif' }} onClick={() => handleScheduleAppointnemt("instant_appoinment")}>
                                        Instant Appointment
                                    </MenuItem>
                                </Box>
                            </Menu> */}
            </Box>
          </Box>
          <Box>
            {selectedItem === "calendar" ? (
              <CalendarView
                selectedItem={selectedItem}
                filter={filterBySearch}
              />
            ) : (
              <>
                <Grid>
                  <AppoinmentsWithLocation
                    filter={filterBySearch}
                    currentDate={currentDate}
                    visitType="In Person"
                    callGetApt={scheduleAppointment}
                    tableData={[inpersonRows]}
                    isLoader={showLoader}
                    getAppointmentList={getAppointmentList}
                  />

                  <AppoinmentsWithLocation
                    filter={filterBySearch}
                    currentDate={currentDate}
                    visitType="Virtual"
                    callGetApt={scheduleAppointment}
                    tableData={[virtualRows]}
                    isLoader={showLoader}
                    getAppointmentList={getAppointmentList}
                  />
                </Grid>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      {scheduleAppointment && (
        <ScheduleAppointment
          open={scheduleAppointment}
          onClose={() => setScheduleAppointment(false)}
          title="Schedule Appointment"
        />
      )}
      {isScheduleNewAppoinmentOpen && (
        <ScheduleNewAppointment
          open={isScheduleNewAppoinmentOpen}
          handleClose={() => setScheduleNewAppoinment(false)}
          // onSave={() => {
          //     setScheduleNewAppoinment(false);
          //     setOpenSuccessModal(true);
          // }}
        />
      )}
      {/*
      {isScheduleInstantAppoinmentOpen && (
        <InstandAppointmentDialog
          open={isScheduleInstantAppoinmentOpen}
          setOpen={() => setScheduleInstantAppoinment(false)}
          onSave={() => {
            setScheduleInstantAppoinment(false);
            setOpenSuccessModal(true);
          }}
        />
      )}
      {openSuccessModal && (
        <EventSucessModal
          message="Appointment Scheduled Successfully!"
          onClose={() => setOpenSuccessModal(false)}
        />
      )} */}
    </div>
  );
}

export default ProviderSchedulingAppointments;
