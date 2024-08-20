import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import {
  // useAvailabilityControllerServiceCreateSlots,
  useLocationControllerServiceGetAllLocations,
  useProviderControllerServiceGetAllProviders,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { formButtonStyle } from "../../../../../styles/common";
import { patientStyle } from "../../patient/style/commonStyle";
import { style } from "../../referral/style/common-style";
import { useSelector } from "react-redux";
// import { AvailabilityRequestResponse } from "../../../../../sdk/thinkemr-core-0.0.1/requests";

export const styleUI = makeStyles(() => ({
  intialCT: {
    background: "#F3F3F3",
    color: "#1A1A1A66",
    borderRight: "3px solid white",
    cursor: "pointer",
    width: "35px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedSlot: {
    background: "#1B5984",
    color: "white",
    borderRight: "3px solid white",
    cursor: "pointer",
    width: "35px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "37px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    width: "70px !important",
  },
  addButtonStyles: {
    display: "flex",
    justifyContent: "end",
  },
  availabilityOption: {
    border: "1px solid #1A1A1A99",
    borderRight: "none",
    borderRadius: "20px 0px 0px 20px",
    opacity: 1,
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80px",
  },
  selectOption: {
    border: "1px solid #1B5984",
    borderRadius: "20px",
    opacity: 1,
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80px",
  },
  availabilityOptionVirtual: {
    border: "1px solid #1A1A1A99",
    borderLeft: "none !important",
    borderRadius: "0px 20px 20px 0px",
    opacity: 1,
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80px",
  },
  optionContainer: {
    border: "1px solid #1A1A1A99",
    borderRadius: "20px",
    opacity: 1,
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80px",
  },
  switchContainer: {
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface Props {
  title: string;
  onClose: () => void;
  open: boolean;
}

// const name = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

function EditAvailability(props: Props) {
  const UIStyle = styleUI();
  const { onClose, open, title } = props;
  const commonStyle = style();
  const classes = patientStyle();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  const [selectProvider, setProvider] = useState<string>("");
  const [locationOptions, setLocationOptions] = useState<any>(null);
  const [providerOptions, setProviderOptions] = useState<any>(null);
  const [selectLocation, setSelectLocation] = useState<string[]>([]);
  // const [locationdBufferValue, setSelectedBufferValue] = useState<number | null>(
  //   null
  // );UUID, setLocationUUID] = useState("");
  // const [providerUUID, setProviderUUID] = useState("");
  const [showStartTime, SetShowStartTime] = useState<any>(null);
  const [showEndTime, SetShowEndTime] = useState<any>(null);
  const [showBlockStartTime, SetShowBlockStartTime] = useState<any>(null);
  const [showBlockEndTime, SetShowBlockEndTime] = useState<any>(null);
  // const [selectStartTime, SetStartTime] = useState<any>(null);
  // const [selectEndTime, SetEndTime] = useState<any>(null);
  // const [selectBlockStartTime, SetBlockStartTime] = useState<any>(null);
  // const [selectBlockEndTime, SetBlockEndTime] = useState<any>(null);
  const [day, setDay] = useState<any>("");
  const [selectBookingWindow, setBookingWindow] = useState<any>("");
  // const [payloadBookingWindow, setPayloadBookingWindow] = useState<any>("");
  const [selectTimeZone, setTimeZone] = useState<any>("");
  // const [calender, setCalender] = useState<any>(null);
  const [showCalender, setShowCalender] = useState<any>(null);
  const [shceduleNotice] = useState("");
  const [shceduleNoticeTime, setShceduleNoticeTime] = useState<number>(15);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  // const [selectedBufferValue, setSelectedBufferValue] = useState<number | null>(
  //   null
  // );
  const [selectedInitialItem, setSelectedInitialItem] = useState<number | null>(
    null
  );
  // const [selectedInitialItemValue, setSelectedInitialItemValue] = useState<
  //   number | null
  // >(null);
  const [isPerson, setIsPerson] = useState(true);
  const [selectedFollowUpItem, setselectedFollowUpItem] = useState<
    number | null
  >(null);
  // const [selectedFollowUpItemValue, setselectedFollowUpItemvalue] = useState<
  //   number | null
  // >(null);
  const [sections, setSections] = useState([{ id: 1 }]);
  const [blockDays, setBlockDays] = useState<any>([
    {
      date: "12 - 11 - 2022",
      time: "02:00 PM - 04:00 PM",
    },
    {
      date: "12 - 11 - 2022",
      time: "02:00 PM - 04:00 PM",
    },
  ]);

  const Pageable = {
    page: 0,
    size: 100,
  };
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  const { data, isSuccess } = useProviderControllerServiceGetAllProviders({
    providerGroupUuid,
    searchBy: "",
    sourceId: undefined,
    ...Pageable,
  });

  const { data: getLocationsData, isSuccess: getLocations } =
    useLocationControllerServiceGetAllLocations({
      providerGroupUuid,
    });

  // const { mutateAsync } =
  //   useAvailabilityControllerServiceCreateSlots();

  const addAvailability = () => {
    // let requestBody = {
    //   bookingWindow: payloadBookingWindow || undefined,
    //   timezone: selectTimeZone,
    //   availabilitySettingType: isPerson
    //     ? AvailabilityRequestResponse.availabilitySettingType.IN_PERSON
    //     : AvailabilityRequestResponse.availabilitySettingType.VIRTUAL,
    //   inPersonInitialConsultTime: selectedInitialItemValue || undefined,
    //   inPersonFollowupConsultTime: selectedFollowUpItemValue || undefined,
    //   bufferTime: selectedBufferValue || undefined,
    //   inPersonBookingIntervalTime: shceduleNoticeTime || undefined,
    //   provider: providerUUID,
    //   location: locationUUID,
    //   blockDays: [
    //     {
    //       date: calender,
    //       startTime: selectBlockStartTime,
    //       endTime: selectBlockEndTime,
    //     },
    //   ],
    //   daySlotCreations: [
    //     {
    //       day: day,
    //       startTime: selectStartTime,
    //       endTime: selectEndTime,
    //     },
    //   ],
    // };
    // mutateAsync({ requestBody: requestBody });
    close();
  };

  useEffect(() => {
    if (!!data && isSuccess) {
      setProviderOptions(data?.data?.content);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!!getLocationsData && getLocations) {
      setLocationOptions(getLocationsData?.data?.content);
    }
  }, [getLocations]);

  const handleToggleSection = () => {
    // Create a new section object with a unique ID
    const newSection = { id: sections.length + 1 };

    // Update the state to include the new section
    setSections([...sections, newSection]);
  };

  const handleItemClick = (index: number) => {
    // setSelectedBufferValue(eventBuffer[index]);
    setSelectedItem(index == selectedItem ? null : index);
  };

  const selectInitialConsultantTime = (index: number) => {
    // setSelectedInitialItemValue(InitialConsultantTime[index]);
    setSelectedInitialItem(index == selectedInitialItem ? null : index);
  };

  const selectFollowUpTime = (index: number) => {
    // setselectedFollowUpItemvalue(FollowupConsultantTime[index]);
    setselectedFollowUpItem(index == selectedFollowUpItem ? null : index);
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    if (Array.isArray(locationOptions)) {
      locationOptions.forEach((element: any) => {
        if (element.id == value) {
          const addressString = `${element?.billingAddress.line1 || ""} ${
            element?.billingAddress.line2 || ""
          } ${element?.billingAddress.city || ""} ${
            element?.billingAddress.state || ""
          } ${element?.billingAddress.country || ""} ${
            element?.billingAddress.zipcode || ""
          }`;
          setSelectLocation([addressString]);
          // setLocationUUID(element.uuid);
        }
      });
    }
  };

  const handleChangeprovider = (event: any) => {
    if (Array.isArray(providerOptions)) {
      providerOptions.forEach((element: any) => {
        if (element.id == event.target.value) {
          // setProviderUUID(element.uuid);
          const name = `${element.firstName || ""} ${element.lastName || ""}`;
          setProvider(name);
        }
      });
    }
  };

  const convert12HourTo24Hour = (inputTimeString: any) => {
    const match = inputTimeString.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
    let [, hours, minutes = "00", ampm] = match;
    // Convert to 24-hour format
    hours = (parseInt(hours) % 12) + (ampm.toLowerCase() === "pm" ? 12 : 0);
    // Pad with leading zeros
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.padStart(2, "0");
    return `${hours}:${minutes}:00`;
  };

  const handleSelectedOption = (e: any, name?: string) => {
    if (name == "startTime") {
      const inputTimeString = e.target.value;
      SetShowStartTime(inputTimeString);
      // const formattedTime = convert12HourTo24Hour(inputTimeString);
      // SetStartTime(formattedTime);
    } else if (name == "endTime") {
      const inputTimeString = e.target.value;
      SetShowEndTime(inputTimeString);
      // const formattedTime = convert12HourTo24Hour(inputTimeString);
      // SetEndTime(formattedTime);
    } else if (name == "bookingWindow") {
      setBookingWindow(e.target.value);
      const inputString = e.target.value;
      const numericValue = parseInt(inputString, 10);

      if (!isNaN(numericValue)) {
        // setPayloadBookingWindow(numericValue);
      }
    } else if (name == "day") {
      setDay(e.target.value);
    } else if (name == "timeZone") {
      setTimeZone(e.target.value);
    } else if (name == "blockStartTime") {
      const inputTimeString = e.target.value;
      SetShowBlockStartTime(inputTimeString);
      const formattedTime = convert12HourTo24Hour(inputTimeString);
      // SetBlockStartTime(formattedTime);
    } else if (name == "blockEndTime") {
      const inputTimeString = e.target.value;
      SetShowBlockEndTime(inputTimeString);
      // const formattedTime = convert12HourTo24Hour(inputTimeString);
      // SetBlockEndTime(formattedTime);
    }
  };

  const handleDateChange = (date: any) => {
    setShowCalender(date);
    // const inputDate = new Date(date);
    // const formattedDate = inputDate.toISOString().slice(0, 10);
    // setCalender(formattedDate);
  };

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue.trim(), 10);

    if (!isNaN(numericValue)) {
      setShceduleNoticeTime(numericValue);
    }
  };

  const deleteDaySlot = (id: number) => {
    const updatedSections = sections.filter((section) => section.id !== id);
    setSections(updatedSections);
  };

  const removeBlockedDays = (id: number) => {
    const blockDay = blockDays.filter((index: number) => index != id);
    setBlockDays(blockDay);
  };

  const close = () => {
    onClose();
  };

  const selectOption = () => {
    setIsPerson(!isPerson);
  };

  const days = [
    "MONDAY",
    "tuesday",
    "Wednsday",
    "Thuresday",
    "Friday",
    "Saturday",
    "Sunday",
    "Mon-Fri",
  ];
  const StartTime = ["12AM", "12:30AM"];
  const BookingWindow = [
    "1 Weeks",
    "2 Weeks",
    "3 Weeks",
    "4 Weeks",
    "5 Weeks",
    "6 Weeks",
    "12 Weeks",
    "26 Weeks",
    "52Weeks",
  ];
  const TimeZone = ["Central Time", "IST"];
  const InitialConsultantTime = [15, 30, 45, 60, 75, 90, 105, 120];
  const FollowupConsultantTime = [15, 30, 45, 60];
  const eventBuffer = [0, 15, 30, 45];
  const shcedulingNotice = ["Hours Away", "Day Away", "Minute Away"];
  const sxs = {
    activeSwitch: {
      border: "1px solid #36588C",
      borderRadius: "20px",
      padding: "5px 10px",
      color: "#36588C",
    },
    inActiveSwitch: { padding: "5px 10px" },
  };
  return (
    <div>
      <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
        <DialogTitle sx={{ padding: "15px 15px 8px " }}>
          <Grid className={commonStyle.dialogTitle}>
            <Grid>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", color: "#1A1A1A" }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid style={{ cursor: "pointer" }}>
              <CloseIcon onClick={close} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: "#1B5984" }}>
                Please Note: Changing availability settings may take several
                minutes to update.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <Select
                    className={classes.selectInputStyle}
                    sx={{
                      marginTop: "0px !important",
                      height: "37px !important",
                      width: "250px !important",
                    }}
                    value={selectProvider}
                    name="provider"
                    onChange={(e: any) => handleChangeprovider(e)}
                    renderValue={(selected) => {
                      if (!selected || selected.length === 0) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80 !important",
                              }}
                            >
                              Select Provider
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {providerOptions?.map((data: any) => {
                      return (
                        <MenuItem
                          key={data.id}
                          value={data.id}
                          className={classes.menuItemColorStyle}
                        >
                          {data.firstName} {data.lastName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item>
                  <Select
                    className={classes.selectInputStyle}
                    multiple
                    sx={{
                      marginTop: "0px !important",
                      height: "37px !important",
                      width: "250px !important",
                    }}
                    value={selectLocation}
                    name="locations"
                    onChange={(e: any) => handleChange(e)}
                    renderValue={(selected) => {
                      if (!selected || selected.length === 0) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80 !important",
                              }}
                            >
                              Select Locations
                            </Typography>
                          </span>
                        );
                      }
                      return (
                        <Typography variant="h5">
                          {selected.join(", ")}
                        </Typography>
                      );
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {locationOptions?.map((value: any) => {
                      return (
                        <MenuItem
                          key={value.id}
                          value={value.id}
                          className={classes.menuItemColorStyle}
                        >
                          {/* <Checkbox
                            checked={selectLocation.indexOf(data) > -1}
                          /> */}{" "}
                          <Typography className={classes.btnTextDropList}>
                            {"  "} {value?.billingAddress.line1} {"  "}
                            {value?.billingAddress.line2}
                            {"  "} {value?.billingAddress.city}
                            {"  "} {value?.billingAddress.state}
                            {"  "} {value?.billingAddress.country} {"  "}
                            {value?.billingAddress.zipcode}{" "}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={7}>
                  <Grid container gap={2}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        boxShadow: "0px 0px 6px #00000029",
                        borderRadius: "5px",
                        opacity: 1,
                        padding: "12px",
                      }}
                    >
                      <Grid container>
                        <Grid
                          xs={12}
                          item
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Day Slot Creation
                          </Typography>
                          <Grid
                            sx={{ display: "flex", cursor: "pointer" }}
                            onClick={handleToggleSection}
                          >
                            <AddIcon
                              sx={{ color: "#1B5984", fontSize: "18px" }}
                            />
                            <Typography variant="h6" sx={{ color: "#1B5984" }}>
                              &nbsp;Add
                            </Typography>
                          </Grid>
                        </Grid>
                        {sections.map((section: any) => (
                          <Grid item xs={12} mt={2}>
                            <Grid
                              key={section.id}
                              container
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Grid item sx={{ display: "flex", gap: "10px" }}>
                                <Grid item>
                                  <Typography
                                    variant="h5"
                                    className={classes.label}
                                  >
                                    Day
                                  </Typography>
                                  <Select
                                    className={classes.selectInputStyle}
                                    sx={{
                                      marginTop: "5px !important",
                                      height: "37px !important",
                                      width: "100px !important",
                                    }}
                                    value={day}
                                    name="day"
                                    onChange={(e: any) =>
                                      handleSelectedOption(e, "day")
                                    }
                                    renderValue={(selected) => {
                                      if (!selected) {
                                        return (
                                          <span>
                                            <Typography
                                              variant="h5"
                                              sx={{
                                                color: "#1A1A1A80 !important",
                                              }}
                                            >
                                              Select
                                            </Typography>
                                          </span>
                                        );
                                      }
                                      return (
                                        <Typography variant="h5">
                                          {selected}
                                        </Typography>
                                      );
                                    }}
                                    MenuProps={MenuProps}
                                    displayEmpty
                                  >
                                    {days.map((data) => {
                                      return (
                                        <MenuItem
                                          key={data}
                                          value={data}
                                          className={classes.menuItemColorStyle}
                                        >
                                          {data}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    variant="h5"
                                    className={classes.label}
                                  >
                                    Start Time
                                  </Typography>
                                  <Select
                                    className={classes.selectInputStyle}
                                    sx={{
                                      marginTop: "5px !important",
                                      height: "37px !important",
                                      width: "100px !important",
                                    }}
                                    value={showStartTime}
                                    name="startTime"
                                    onChange={(e: any) =>
                                      handleSelectedOption(e, "startTime")
                                    }
                                    renderValue={(selected) => {
                                      if (!selected) {
                                        return (
                                          <span>
                                            <Typography
                                              variant="h5"
                                              sx={{
                                                color: "#1A1A1A80 !important",
                                              }}
                                            >
                                              Select
                                            </Typography>
                                          </span>
                                        );
                                      }
                                      return (
                                        <Typography variant="h5">
                                          {selected}
                                        </Typography>
                                      );
                                    }}
                                    MenuProps={MenuProps}
                                    displayEmpty
                                  >
                                    {StartTime.map((data) => {
                                      return (
                                        <MenuItem
                                          key={data}
                                          value={data}
                                          className={classes.menuItemColorStyle}
                                        >
                                          {data}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    variant="h5"
                                    className={classes.label}
                                  >
                                    End Time
                                  </Typography>
                                  <Select
                                    className={classes.selectInputStyle}
                                    sx={{
                                      marginTop: "5px !important",
                                      height: "37px !important",
                                      width: "100px !important",
                                    }}
                                    value={showEndTime}
                                    name="endTime"
                                    onChange={(e: any) =>
                                      handleSelectedOption(e, "endTime")
                                    }
                                    renderValue={(selected) => {
                                      if (!selected) {
                                        return (
                                          <span>
                                            <Typography
                                              variant="h5"
                                              sx={{
                                                color: "#1A1A1A80 !important",
                                              }}
                                            >
                                              Select
                                            </Typography>
                                          </span>
                                        );
                                      }
                                      return (
                                        <Typography variant="h5">
                                          {selected}
                                        </Typography>
                                      );
                                    }}
                                    MenuProps={MenuProps}
                                    displayEmpty
                                  >
                                    {StartTime.map((data) => {
                                      return (
                                        <MenuItem
                                          key={data}
                                          value={data}
                                          className={classes.menuItemColorStyle}
                                        >
                                          {data}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid
                                  container
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                  gap={2}
                                >
                                  <Grid
                                    item
                                    sx={{
                                      display: "flex",
                                      border: "1px solid #1B5984",
                                      borderRadius: "3px",
                                      opacity: 1,
                                      padding: "2px",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <ModeEditOutlineOutlinedIcon
                                      sx={{
                                        color: "#1B5984",
                                        fontSize: "16px",
                                      }}
                                    />
                                    <Typography
                                      variant="h6"
                                      sx={{ color: "#1B5984" }}
                                    >
                                      Edit
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    sx={{
                                      display: "flex",
                                      border: "1px solid #FF3939",
                                      borderRadius: "3px",
                                      opacity: 1,
                                      padding: "2px",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => deleteDaySlot(section.id)}
                                  >
                                    <ModeEditOutlineOutlinedIcon
                                      sx={{
                                        color: "#FF3939",
                                        fontSize: "16px",
                                      }}
                                    />
                                    <Typography
                                      variant="h6"
                                      sx={{ color: "#FF3939" }}
                                    >
                                      Delete
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        boxShadow: "0px 0px 6px #00000029",
                        borderRadius: "5px",
                        opacity: 1,
                        padding: "12px",
                      }}
                    >
                      <Grid container>
                        <Grid
                          xs={12}
                          item
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Slot Creation Settings
                          </Typography>
                        </Grid>
                        <Grid item xs={12} mt={1}>
                          <Grid
                            container
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Grid item sx={{ display: "flex", gap: "10px" }}>
                              <Grid item>
                                <Typography
                                  variant="h5"
                                  className={classes.label}
                                >
                                  Booking Window
                                </Typography>
                                <Select
                                  className={classes.selectInputStyle}
                                  sx={{
                                    marginTop: "5px !important",
                                    height: "37px !important",
                                    width: "200px !important",
                                  }}
                                  value={selectBookingWindow}
                                  name="bookingWindow"
                                  onChange={(e: any) =>
                                    handleSelectedOption(e, "bookingWindow")
                                  }
                                  renderValue={(selected) => {
                                    if (!selected) {
                                      return (
                                        <span>
                                          <Typography
                                            variant="h5"
                                            sx={{
                                              color: "#1A1A1A80 !important",
                                            }}
                                          >
                                            Select
                                          </Typography>
                                        </span>
                                      );
                                    }
                                    return (
                                      <Typography variant="h5">
                                        {selected}
                                      </Typography>
                                    );
                                  }}
                                  MenuProps={MenuProps}
                                  displayEmpty
                                >
                                  {BookingWindow.map((data) => {
                                    return (
                                      <MenuItem
                                        key={data}
                                        value={data}
                                        className={classes.menuItemColorStyle}
                                      >
                                        {data}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="h5"
                                  className={classes.label}
                                >
                                  Time Zone
                                </Typography>
                                <Select
                                  className={classes.selectInputStyle}
                                  sx={{
                                    marginTop: "5px !important",
                                    height: "37px !important",
                                    width: "200px !important",
                                  }}
                                  value={selectTimeZone}
                                  name="timeZone"
                                  onChange={(e: any) =>
                                    handleSelectedOption(e, "timeZone")
                                  }
                                  renderValue={(selected) => {
                                    if (!selected) {
                                      return (
                                        <span>
                                          <Typography
                                            variant="h5"
                                            sx={{
                                              color: "#1A1A1A80 !important",
                                            }}
                                          >
                                            Select
                                          </Typography>
                                        </span>
                                      );
                                    }
                                    return (
                                      <Typography variant="h5">
                                        {selected}
                                      </Typography>
                                    );
                                  }}
                                  MenuProps={MenuProps}
                                  displayEmpty
                                >
                                  {TimeZone.map((data) => {
                                    return (
                                      <MenuItem
                                        key={data}
                                        value={data}
                                        className={classes.menuItemColorStyle}
                                      >
                                        {data}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        boxShadow: "0px 0px 6px #00000029",
                        borderRadius: "5px",
                        opacity: 1,
                        padding: "12px",
                      }}
                    >
                      <Grid container>
                        <Grid
                          xs={12}
                          item
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Block Days
                          </Typography>
                          <Grid sx={{ display: "flex", cursor: "pointer" }}>
                            <AddIcon
                              sx={{ color: "#1B5984", fontSize: "18px" }}
                            />
                            <Typography variant="h6" sx={{ color: "#1B5984" }}>
                              &nbsp;Add Block Days
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} mt={1}>
                          <Grid
                            container
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Grid item>
                              <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  <Typography
                                    variant="h5"
                                    className={classes.label}
                                  >
                                    Calender
                                  </Typography>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <Box
                                      sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        position: "relative",
                                        marginTop: "5px",
                                        // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                                      }}
                                    >
                                      <DatePicker
                                        onChange={(date) =>
                                          handleDateChange(date)
                                        }
                                        value={showCalender}
                                        slotProps={{
                                          textField: { size: "small" },
                                        }}
                                      />
                                    </Box>
                                  </LocalizationProvider>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    variant="h5"
                                    className={classes.label}
                                  >
                                    Start Time
                                  </Typography>
                                  <Select
                                    className={classes.selectInputStyle}
                                    sx={{
                                      marginTop: "5px !important",
                                      height: "37px !important",
                                      width: "100px !important",
                                    }}
                                    value={showBlockStartTime}
                                    name="blockStartTime"
                                    onChange={(e: any) =>
                                      handleSelectedOption(e, "blockStartTime")
                                    }
                                    renderValue={(selected) => {
                                      if (!selected) {
                                        return (
                                          <span>
                                            <Typography
                                              variant="h5"
                                              sx={{
                                                color: "#1A1A1A80 !important",
                                              }}
                                            >
                                              Select
                                            </Typography>
                                          </span>
                                        );
                                      }
                                      return (
                                        <Typography variant="h5">
                                          {selected}
                                        </Typography>
                                      );
                                    }}
                                    MenuProps={MenuProps}
                                    displayEmpty
                                  >
                                    {StartTime.map((data) => {
                                      return (
                                        <MenuItem
                                          key={data}
                                          value={data}
                                          className={classes.menuItemColorStyle}
                                        >
                                          {data}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    variant="h5"
                                    className={classes.label}
                                  >
                                    End Time
                                  </Typography>
                                  <Select
                                    className={classes.selectInputStyle}
                                    sx={{
                                      marginTop: "5px !important",
                                      height: "37px !important",
                                      width: "100px !important",
                                    }}
                                    value={showBlockEndTime}
                                    name="blockEndTime"
                                    onChange={(e: any) =>
                                      handleSelectedOption(e, "blockEndTime")
                                    }
                                    renderValue={(selected) => {
                                      if (!selected) {
                                        return (
                                          <span>
                                            <Typography
                                              variant="h5"
                                              sx={{
                                                color: "#1A1A1A80 !important",
                                              }}
                                            >
                                              Select
                                            </Typography>
                                          </span>
                                        );
                                      }
                                      return (
                                        <Typography variant="h5">
                                          {selected}
                                        </Typography>
                                      );
                                    }}
                                    MenuProps={MenuProps}
                                    displayEmpty
                                  >
                                    {StartTime.map((data) => {
                                      return (
                                        <MenuItem
                                          key={data}
                                          value={data}
                                          className={classes.menuItemColorStyle}
                                        >
                                          {data}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} mt={2}>
                              <Grid container>
                                <Grid
                                  item
                                  xs={5}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    sx={{ color: "#1B5984" }}
                                  >
                                    Date
                                  </Typography>
                                  <Typography
                                    variant="h5"
                                    sx={{ color: "#1B5984" }}
                                  >
                                    Time
                                  </Typography>
                                </Grid>
                                {blockDays.map((data: any, index: number) => (
                                  <Grid item xs={12} mt={1}>
                                    <Grid
                                      container
                                      key={index}
                                      justifyContent={"space-between"}
                                      alignItems={"center"}
                                    >
                                      <Grid item>
                                        <Typography variant="h5">
                                          {data.date}
                                        </Typography>
                                      </Grid>
                                      <Grid item>
                                        <Typography variant="h5">
                                          {data.time}
                                        </Typography>
                                      </Grid>
                                      <Grid item>
                                        <Grid
                                          container
                                          justifyContent={"center"}
                                          alignItems={"center"}
                                          gap={1}
                                        >
                                          <Grid
                                            item
                                            sx={{
                                              display: "flex",
                                              border: "1px solid #1B5984",
                                              borderRadius: "3px",
                                              opacity: 1,
                                              padding: "2px",
                                              alignItems: "center",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <ModeEditOutlineOutlinedIcon
                                              sx={{
                                                color: "#1B5984",
                                                fontSize: "16px",
                                              }}
                                            />
                                            <Typography
                                              variant="h6"
                                              sx={{ color: "#1B5984" }}
                                            >
                                              Edit
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            item
                                            sx={{
                                              display: "flex",
                                              border: "1px solid #FF3939",
                                              borderRadius: "3px",
                                              opacity: 1,
                                              padding: "2px",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              removeBlockedDays(index)
                                            }
                                          >
                                            <ModeEditOutlineOutlinedIcon
                                              sx={{
                                                color: "#FF3939",
                                                fontSize: "16px",
                                              }}
                                            />
                                            <Typography
                                              variant="h6"
                                              sx={{ color: "#FF3939" }}
                                            >
                                              Delete
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ))}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Availability Settings
                      </Typography>
                      <Grid className={UIStyle.switchContainer}>
                        <ButtonBase
                          onClick={selectOption}
                          sx={isPerson ? sxs.activeSwitch : sxs.inActiveSwitch}
                        >
                          <Typography variant="h4">In Person</Typography>
                        </ButtonBase>
                        <ButtonBase
                          onClick={selectOption}
                          sx={!isPerson ? sxs.activeSwitch : sxs.inActiveSwitch}
                        >
                          <Typography variant="h4">Virtual</Typography>
                        </ButtonBase>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Typography variant="h5">
                        {isPerson ? "In Person" : "Virtual"} • Initial Consult
                        Time (minutes)
                      </Typography>
                      <Grid container mt={1}>
                        {InitialConsultantTime.map(
                          (data: any, index: number) => (
                            <Typography
                              variant="h5"
                              key={index}
                              className={
                                selectedInitialItem === index
                                  ? UIStyle.selectedSlot
                                  : UIStyle.intialCT
                              }
                              onClick={() => selectInitialConsultantTime(index)}
                            >
                              {data}
                            </Typography>
                          )
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Typography variant="h5">
                        {isPerson ? "In Person" : "Virtual"} • Follow Up Consult
                        Time (minutes)
                      </Typography>
                      <Grid container mt={1}>
                        {FollowupConsultantTime.map(
                          (data: any, index: number) => (
                            <Typography
                              variant="h5"
                              key={index}
                              className={
                                selectedFollowUpItem === index
                                  ? UIStyle.selectedSlot
                                  : UIStyle.intialCT
                              }
                              onClick={() => selectFollowUpTime(index)}
                            >
                              {data}
                            </Typography>
                          )
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Typography variant="h5">
                        {isPerson ? "In Person" : "Virtual"} • Minimum
                        Scheduling Notice
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#1A1A1A7F" }}>
                        Prevents Appointments Less than
                      </Typography>
                      <Grid container mt={1} gap={2}>
                        <Grid item>
                          <InputBase
                            value={shceduleNoticeTime}
                            name="buffertime"
                            placeholder=""
                            classes={{
                              root: UIStyle.inputField,
                              input: classes.inputBoxText,
                              focused: classes.inputBoxActive,
                            }}
                            onChange={(e: any) => inputData(e)}
                          />
                        </Grid>
                        <Grid item>
                          <Select
                            className={classes.selectInputStyle}
                            sx={{
                              marginTop: "0px !important",
                              height: "37px !important",
                              width: "150px !important",
                            }}
                            value={shceduleNotice}
                            name="shceduleNotice"
                            onChange={(e: any) => handleSelectedOption(e)}
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      sx={{
                                        color: "#1A1A1A80 !important",
                                      }}
                                    >
                                      Select
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {shcedulingNotice.map((data) => {
                              return (
                                <MenuItem
                                  key={data}
                                  value={data}
                                  className={classes.menuItemColorStyle}
                                >
                                  {data}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Typography variant="h5">
                        {isPerson ? "In Person" : "Virtual"} • Event Buffer
                        (minutes)
                      </Typography>
                      <Grid container mt={1}>
                        {eventBuffer.map((data: any, index: number) => (
                          <Typography
                            variant="h5"
                            key={index}
                            className={
                              selectedItem === index
                                ? UIStyle.selectedSlot
                                : UIStyle.intialCT
                            }
                            onClick={() => handleItemClick(index)}
                          >
                            {data}
                          </Typography>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={UIStyle.addButtonStyles}>
              <ButtonBase
                type="submit"
                sx={{
                  ...formButtonStyle.mainButtonStyle,
                  color: "white",
                  background: "#36598C !important",
                }}
                onClick={addAvailability}
              >
                Add
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditAvailability;
