import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  ButtonBase,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputBase,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import patientImage from "../../../../../assets/other/patientImage.png";
import { patientStyle } from "../../patient/style/commonStyle";
import { ScheduleAppointmentStyle } from "./widget";
import { multiSelectDropDown } from "../../patient/add-new-patient";

import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import { formButtonStyle } from "../../../../../styles/common";
import { style } from "../../referral/style/common-style";

import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { useFormik } from "formik";
import bookAppointmentRequestSchema from "./validation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { everyInterval, everyNo, morningSlots, weekLetters } from "./constat";
import {
  useAppointmentControllerServiceBookAppointment,
  useAppointmentControllerServiceGetSlotsFromConfiguration,
  useAppointmentControllerServiceRescheduleAppointment,
  useCustomFormControllerServiceGetAllCustomForms,
  useNotificationsControllerServiceAcceptAppointmentRequest,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import dayjs from "dayjs";
import SlotGrid from "./slotGrid";
import { mapFields } from "./mapper";
import { green, grey } from "@mui/material/colors";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { RESCHEDULE_APPT } from "./appointmentWithLocations";
import {
  Appointment,
  LocationControllerService,
  ProviderControllerService,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";

interface BookAppointmentForm {
  patientList?: [];
  locationOptions?: any[];
  patientName?: string;
  patientUuid?: string;
  appointmentType?: string;
  appointmentDate?: string;
  appointmentStatTime?: string;
  appointmentEndTime?: string;
  notificationId?: number;
  visitType?: string;
  providerOptions?: any[];
  setAddPatient?: (data: any) => void;
  appointmentOption?: [];
  close: () => void;
  setSearchBy?: any;
  appointmentDetails?: any;
  setSearchPatient?: any;
}

const BookAppointmentForm = (props: BookAppointmentForm) => {
  const {
    patientList,
    locationOptions,
    providerOptions,
    setAddPatient,
    appointmentOption,
    close,
    setSearchBy,
    appointmentDetails,
    setSearchPatient,
  } = props;
  const classes = patientStyle();
  const UIStyle = ScheduleAppointmentStyle();
  const dispatch = useDispatch();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const [showRepeat, setShowRepeat] = useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<any>("");
  const [openSlot, setOpenSlot] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(
    appointmentDetails
      ? appointmentDetails?.startTime + "-" + appointmentDetails?.endTime
      : props?.appointmentStatTime
      ? props?.appointmentStatTime + "-" + props?.appointmentEndTime
      : ""
  );
  const [appointmentStartDate, setAppointmentStartDate] = useState(
    appointmentDetails
      ? appointmentDetails?.appointmentDate
      : props?.appointmentDate
      ? props?.appointmentDate
      : ""
  );
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [appntEndDate, setAppointmentEndDate] = useState<any>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [intakeTabData, setIntakeTabData] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<{
    morningSlots: string[];
    eveningSlots: string[];
    afternoonSlots: string[];
  }>({
    morningSlots: [],
    eveningSlots: [],
    afternoonSlots: [],
  });
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const [locationOptions1, setLocationOptions] = useState<any>(null);
  const [providerOptions1, setProviderOptions] = useState<any>(null);
  const [appointmentOption1, setAppointmentOption] = useState<any>(null);
  const [searchRecord, setSearchRecord] = useState("");

  const getLocationList = async () => {
    const locationList = await LocationControllerService.getAllLocations(
      userDetails?.data?.providerGroup
    );
    setLocationOptions(locationList?.data?.content);
  };
  const getProviderList = async () => {
    const providerList = await ProviderControllerService.getAllProviders(
      userDetails?.data?.providerGroup,
      0,
      100
    );
    setProviderOptions(providerList?.data?.content);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearchPatient(searchRecord);
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  });

  useEffect(() => {
    const type = Object.values(Appointment.type) as string[];
    setAppointmentOption(type);
    // getPatientList();
    getProviderList();
    getLocationList();
  }, []);

  const { data: intakeFormData } =
    useCustomFormControllerServiceGetAllCustomForms({
      type: "INTAKE_FORM",
      providerGroupUuid: userDetails?.data?.providerGroup,
      // ...pagination,
    });

  useEffect(() => {
    if (userDetails?.data?.providerGroup) {
      const optionData =
        intakeFormData &&
        intakeFormData?.data?.content.map((item: any) => {
          return {
            id: item.uuid,
            name: item.title,
          };
        });
      setIntakeTabData(optionData);
    }
  }, [intakeFormData]);

  const [formOptions] = useState<any>([
    "Medical Brief Intake Form",
    "Nutrition Forms",
  ]);

  let getPatient = {};
  let getProvider = {};
  useEffect(() => {
    const patientPayload =
      patientList &&
      patientList?.filter(
        (item: any) => item?.uuid === appointmentDetails?.patientUuid
      );
    const getPatient = patientPayload && patientPayload[0];

    const providerList =
      providerOptions &&
      providerOptions.filter(
        (item: any) => item.uuid === appointmentDetails?.providerUuid
      );
    getProvider = providerList && providerList[0];

    searchRecord ? "" : formik.setFieldValue("patient", getPatient);
    searchRecord ? "" : formik.setFieldValue("provider", getProvider);
  }, [patientList, providerOptions]);

  const [scheduleAppointment, setScheduleAppointment] = useState({
    id: "",
    provider: getProvider || undefined,
    location: undefined,
    visitType: "",
    appointmentType: "",
    appointmentDate: "",
    patient: getPatient || props?.patientUuid,
    startTime: "",
    endTime: "",
    visitReason: "",
    encounterTypeUuid: "",
    providerEntity: "",
    patientEntity: "",
    locationEntity: "",
    availabilityEntity: "",
    isRepeated: false,
    repeatInterval: "",
    repeatUnit: "",
    repeatDays: "",
    repeatEndDate: "",
    numberOfAppointment: "",
    intakeForms: [],
  });

  useEffect(() => {
    // formik.setFieldValue("patient", findPatient);
    // formik.setFieldValue("provider",appointmentDetails?.)
    appointmentDetails && appointmentDetails
      ? formik.setFieldValue("visitType", appointmentDetails?.presentType)
      : "";
    // formik.setFieldValue(
    //   "locationUUID",
    //   ""
    // );
    // formik.setFieldValue(
    //   "providerUUID",
    //   ""
    // );
    appointmentDetails && appointmentDetails
      ? formik.setFieldValue(
          "appointmentType",
          appointmentDetails?.appointmentType
        )
      : "";
    appointmentDetails && appointmentDetails
      ? formik.setFieldValue("visitReason", appointmentDetails?.reasonOfVisit)
      : "";
    appointmentDetails && appointmentDetails
      ? formik.setFieldValue("startTime", appointmentDetails?.startTime)
      : "";
    appointmentDetails && appointmentDetails
      ? formik.setFieldValue("endTime", appointmentDetails?.endTime)
      : "";
    formik.setFieldValue(
      "appointmentDate",
      appointmentDetails?.appointmentDate
    );
  }, [appointmentDetails]);

  const {
    mutateAsync: bookAppointment,
    data: bookedAppointmentData,
    error: errorsData,
  } = useAppointmentControllerServiceBookAppointment();

  const {
    mutateAsync: bookAppointmentByNotification,
    data: bookedAppointmentByNotificationData,
    error: errorsByNotificationData,
  } = useNotificationsControllerServiceAcceptAppointmentRequest();

  const { mutateAsync: updatedAppointment } =
    useAppointmentControllerServiceRescheduleAppointment();

  const handleFormSubmit = (values: any) => {
    const formValForIntake = values?.intakeForms?.map((item: any) => {
      return {
        uuid: item.id,
      };
    });
    setLoading(true);
    const apiData = mapFields(values, appointmentDetails);
    const [startTime, endTime] = selectedSlot.split("-");
    apiData.startTime = startTime;
    apiData.endTime = endTime;
    apiData.appointmentDate = appointmentStartDate;
    apiData.repeatEndDate = appntEndDate;
    apiData.repeatDays = weekDays;
    apiData.intakeForms = formValForIntake;
    if (props?.notificationId) {
      apiData.patientUserUuid = props?.patientUuid;
      bookAppointmentByNotification({
        id: props?.notificationId,
        requestBody: apiData,
      })
        .then((res: any) => {
          close();
          dispatch(
            alertAction.setAlert({
              open: true,
              message: res.message,
              severity: "success",
            })
          );
        })
        .catch((err) => {
          setErrorMsg(err?.body?.message);
          dispatch(
            alertAction.setAlert({
              open: true,
              message: err.body.message,
              severity: "error",
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }
    appointmentDetails
      ? updatedAppointment({
          requestBody: apiData,
          id: appointmentDetails?.appointmentId,
        })
          .then((res: any) => {
            close();
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((err) => {
            setErrorMsg(err?.body?.message);
            dispatch(
              alertAction.setAlert({
                open: true,
                message: err.body.message,
                severity: "error",
              })
            );
          })
          .finally(() => {
            setLoading(false);
          })
      : bookAppointment({
          requestBody: apiData,
        })
          .then((res: any) => {
            close();
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((err) => {
            setErrorMsg(err?.body?.message);
            dispatch(
              alertAction.setAlert({
                open: true,
                message: err.body.message,
                severity: "error",
              })
            );
          })
          .finally(() => {
            setLoading(false);
          });
  };
  const formik = useFormik({
    initialValues: scheduleAppointment,
    validationSchema: bookAppointmentRequestSchema,
    onSubmit: handleFormSubmit,
  });

  const { values, handleSubmit, errors, touched } = formik;
  useEffect(() => {
    props?.visitType ? formik.setFieldValue("visitType", props?.visitType) : "";
    props?.appointmentType
      ? formik.setFieldValue("appointmentType", props?.appointmentType)
      : "";
    // formik.setFieldValue("visitReason", appointmentDetails?.reasonOfVisit);
    props?.appointmentStatTime
      ? formik.setFieldValue("startTime", props?.appointmentStatTime)
      : "";
    props?.appointmentEndTime
      ? formik.setFieldValue("endTime", props?.appointmentEndTime)
      : "";
    props?.appointmentDate
      ? formik.setFieldValue("appointmentDate", props?.appointmentDate)
      : "";
    props?.patientUuid
      ? formik.setFieldValue("patient", props?.patientUuid)
      : "";
  }, [
    props?.visitType,
    props?.appointmentType,
    props?.appointmentDate,
    props?.appointmentStatTime,
    props?.appointmentEndTime,
    props?.patientUuid,
  ]);

  const openSlotSection = () => {
    setOpenSlot(!openSlot);
  };

  const handleOnSelectWeekDay = (selectedDay: string) => {
    const existingWeekdays = new Set(weekDays);
    if (existingWeekdays.has(selectedDay)) {
      existingWeekdays.delete(selectedDay);
    } else {
      existingWeekdays.add(selectedDay);
    }
    setWeekDays(Array.from(existingWeekdays));
  };

  const { mutateAsync: getSlot, data: slotData } =
    useAppointmentControllerServiceGetSlotsFromConfiguration();

  const getSlotList = async (selectedDate: any) => {
    setLoading(true);
    const date = dayjs(selectedDate).format("YYYY-MM-DD");
    setAppointmentStartDate(date);
    const formValues = values as any;
    getSlot({
      requestBody: {
        appointmentDate: date,
        appointmentType: formValues?.appointmentType,
        visitType: formValues?.visitType,
        locationUUID: formValues?.location?.uuid,
        providerUUID: formValues?.provider?.userUuid,
      },
    });
  };
  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  const commonStyle = style();
  const formatDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const calculateDOB = (dob: any) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${age} yrs`;
  };

  const categorizeTimings = (
    timeIntervalSet: { from: string; to: string }[]
  ) => {
    const formatTimeRange = (from: string, to: string) => `${from} - ${to}`;

    const timeIntervalsWithDates = timeIntervalSet.map(({ from, to }) => ({
      from: new Date(`2000-01-01T${from}`),
      to: new Date(`2000-01-01T${to}`),
    }));

    timeIntervalsWithDates.sort((a, b) => a.from.getTime() - b.from.getTime());

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: false, // Use 24-hour format
    };

    const morningTimings = timeIntervalsWithDates
      .filter(({ from }) => from.getHours() < 12)
      .map(({ from, to }) =>
        formatTimeRange(
          from.toLocaleTimeString("en-US", timeOptions),
          to.toLocaleTimeString("en-US", timeOptions)
        )
      );

    const afternoonTimings = timeIntervalsWithDates
      .filter(
        ({ from }) =>
          from.getHours() >= 12 &&
          from.getMinutes() >= 0 &&
          from.getHours() < 17
      )
      .map(({ from, to }) =>
        formatTimeRange(
          from.toLocaleTimeString("en-US", timeOptions),
          to.toLocaleTimeString("en-US", timeOptions)
        )
      );

    const eveningTimings = timeIntervalsWithDates
      .filter(
        ({ from }) =>
          (from.getHours() === 17 && from.getMinutes() > 0) ||
          from.getHours() > 17
      )
      .map(({ from, to }) =>
        formatTimeRange(
          from.toLocaleTimeString("en-US", timeOptions),
          to.toLocaleTimeString("en-US", timeOptions)
        )
      );
    return {
      morning: morningTimings,
      afternoon: afternoonTimings,
      evening: eveningTimings,
    };
  };
  const sortTimes = (times: any[]) => {
    return times.sort((a, b) => a.localeCompare(b));
  };

  const classifySlots = (slots: any[]) => {
    const morningSlots: any = [];
    const afternoonSlots: any = [];
    const eveningSlots: any = [];

    // Define the boundaries for morning, afternoon, and evening
    const morningBoundary = "12:00";
    const afternoonBoundary = "18:00";

    // Helper function to format time
    const formatTime = (time: any) => {
      return time.split(":").map((part: any) => parseInt(part));
    };

    // Helper function to check if a slot falls within a range
    const isWithinRange = (time: any, start: any, end: any) => {
      const [hour, minute] = formatTime(time);
      const [startHour, startMinute] = formatTime(start);
      const [endHour, endMinute] = formatTime(end);

      if (hour > startHour && hour < endHour) {
        return true;
      } else if (hour === startHour && minute >= startMinute) {
        return true;
      } else if (hour === endHour && minute < endMinute) {
        return true;
      }

      return false;
    };

    // Iterate through each slot and classify them
    slots.forEach((slot) => {
      const { from, to } = slot;
      if (isWithinRange(from, "00:00", morningBoundary)) {
        morningSlots.push(`${from} - ${to}`);
      } else if (isWithinRange(from, morningBoundary, afternoonBoundary)) {
        afternoonSlots.push(`${from} - ${to}`);
      } else {
        eveningSlots.push(`${from} - ${to}`);
      }
    });
    return {
      morning: morningSlots,
      afternoon: afternoonSlots,
      evening: eveningSlots,
    };
  };

  useEffect(() => {
    if (slotData) {
      const { morning, afternoon, evening } = classifySlots(
        slotData?.data?.timeIntervalSet
      );
      setAvailableSlots({
        morningSlots: sortTimes(morning),
        afternoonSlots: sortTimes(afternoon),
        eveningSlots: sortTimes(evening),
      });
      setLoading(false);
    }
  }, [slotData]);

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          // ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container columnSpacing={2}>
                <Grid item xs={10.2}>
                  <CustomFormLabel label="Patient Name" isRequired={true} />
                  <Autocomplete
                    sx={{ ...multiSelectDropDown }}
                    limitTags={2}
                    id="tags-standard"
                    options={patientList || []}
                    disableCloseOnSelect
                    value={formik?.values?.patient || props?.patientUuid}
                    getOptionLabel={(option: any) =>
                      option?.legalFirstName
                        ? option?.legalFirstName + " " + option?.legalLastName
                        : props?.patientName
                        ? props?.patientName
                        : ""
                    }
                    onChange={(_e, values) => {
                      formik.setFieldValue("patient", values);
                    }}
                    onInputChange={(_e, v) => {
                      setSearchRecord(v);
                    }}
                    renderOption={(props, option: any) => (
                      <MenuItem
                        {...props}
                        key={option.id}
                        value={option.id}
                        className={classes.menuItemColorStyle}
                      >
                        <Grid container spacing={2}>
                          <Grid item>
                            <Avatar
                              className={classes.avatarStyle}
                              src={option?.avatar}
                            />
                          </Grid>
                          <Grid
                            item
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <Grid item>
                              <Grid container>
                                <Typography
                                  variant="h5"
                                  sx={{ color: "#1A1A1ACC" }}
                                >
                                  {option?.legalFirstName}{" "}
                                  {option?.legalLastName} (
                                  {formatDate(option?.birthDate)} ,{" "}
                                  {calculateDOB(option?.birthDate)},
                                  {option?.gender?.charAt(0)})
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  sx={{
                                    display: "flex",
                                    gap: "5px",
                                    color: "#1A1A1ACC",
                                  }}
                                >
                                  <AccountBoxOutlinedIcon
                                    sx={{
                                      color: "#1A1A1A99 !important",
                                      fontSize: "18px",
                                    }}
                                  />
                                  <Typography variant="h5">
                                    {option?.id}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  sx={{
                                    display: "flex",
                                    gap: "5px",
                                    color: "#1A1A1ACC",
                                  }}
                                >
                                  <PhoneIphoneOutlinedIcon
                                    sx={{
                                      color: "#1A1A1A99 !important",
                                      fontSize: "18px",
                                    }}
                                  />
                                  <Typography variant="h5">
                                    {option.contactNumber}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  sx={{
                                    display: "flex",
                                    gap: "5px",
                                    color: "#1A1A1ACC",
                                  }}
                                >
                                  <EmailOutlinedIcon
                                    sx={{
                                      color: "#1A1A1A99 !important",
                                      fontSize: "18px",
                                    }}
                                  />
                                  <Typography variant="h5">
                                    {option.email}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    )}
                    onBlur={formik.handleBlur}
                    renderInput={(params) => (
                      <TextField
                        //classes={{ root: styles.customTextField }}
                        {...params}
                        variant="outlined"
                        placeholder={"Select Patient"}
                      />
                    )}
                  />
                  {touched.patient && errors.patient && (
                    <FormHelperText error>{errors.patient}</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <FormControl>
                  <CustomFormLabel label="Appointment Mode" isRequired={true} />
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    className={UIStyle.FormControlLabel}
                    name="visitType"
                    value={values.visitType || props.visitType}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="IN_PERSON"
                      control={<Radio />}
                      label={
                        <Typography className={UIStyle.FormControlLabel}>
                          In-Person
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="VIRTUAL"
                      control={<Radio />}
                      label={
                        <Typography className={UIStyle.FormControlLabel}>
                          Virtual
                        </Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {touched.visitType && errors.visitType && (
                <FormHelperText error>{errors.visitType}</FormHelperText>
              )}
            </Grid>
            {values?.visitType === "IN_PERSON" && (
              <Grid item xs={6}>
                <CustomFormLabel label="Location" isRequired={true} />
                <Select
                  className={classes.selectInputStyle}
                  sx={{
                    marginTop: "10px !important",
                    height: "37px !important",
                    width: "100% !important",
                  }}
                  value={values.location}
                  name="location"
                  onChange={formik.handleChange}
                  renderValue={(selected: any) => {
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
                      <Typography variant="h5">{selected?.name}</Typography>
                    );
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {locationOptions
                    ? locationOptions
                        ?.filter((item: any) => item.active !== false)
                        .map((value: any) => {
                          return (
                            <MenuItem
                              key={value.id}
                              value={value}
                              className={classes.menuItemColorStyle}
                            >
                              {"  "} {value?.name} {"  "}
                            </MenuItem>
                          );
                        })
                    : locationOptions1?.map((value: any) => {
                        return (
                          <MenuItem
                            key={value.id}
                            value={value}
                            className={classes.menuItemColorStyle}
                          >
                            {"  "} {value?.name} {"  "}
                          </MenuItem>
                        );
                      })}
                </Select>
              </Grid>
            )}

            <Grid item xs={6}>
              <CustomFormLabel label="Provider" isRequired={true} />
              <Select
                className={classes.selectInputStyle}
                sx={{
                  marginTop: "10px !important",
                  height: "37px !important",
                  width: "100% !important",
                }}
                value={values.provider}
                onChange={formik.handleChange}
                name="provider"
                renderValue={(selected: any) => {
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
                  return (
                    <Typography variant="h5">{`${selected?.firstName || ""} ${
                      selected?.lastName || ""
                    }`}</Typography>
                  );
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {providerOptions
                  ? providerOptions?.map((data: any) => {
                      return (
                        <MenuItem
                          key={data.id}
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data.firstName} {data.lastName}
                        </MenuItem>
                      );
                    })
                  : providerOptions1?.map((data: any) => {
                      return (
                        <MenuItem
                          key={data.id}
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          {data.firstName} {data.lastName}
                        </MenuItem>
                      );
                    })}
              </Select>
              {touched.provider && errors.provider && (
                <FormHelperText error>{errors.provider}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <CustomFormLabel label="Appointment Type" isRequired={true} />
              <Select
                className={classes.selectInputStyle}
                sx={{
                  marginTop: "10px !important",
                  height: "37px !important",
                  width: "100% !important",
                }}
                value={values.appointmentType || props?.appointmentType}
                name="appointmentType"
                onChange={formik.handleChange}
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
                          Select Type
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {appointmentOption
                  ? appointmentOption?.map((data: any) => {
                      return (
                        <MenuItem
                          key={data}
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          <Typography variant="h5">{data}</Typography>
                        </MenuItem>
                      );
                    })
                  : appointmentOption1?.map((data: any) => {
                      return (
                        <MenuItem
                          key={data}
                          value={data}
                          className={classes.menuItemColorStyle}
                        >
                          <Typography variant="h5">{data}</Typography>
                        </MenuItem>
                      );
                    })}
              </Select>
              {touched.appointmentType && errors.appointmentType && (
                <FormHelperText error>{errors.appointmentType}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <CustomFormLabel label="Date & Time" isRequired={true} />
              <Grid
                item
                className={UIStyle.slotContainer}
                onClick={openSlotSection}
                sx={{ marginTop: "10px", cursor: "pointer" }}
              >
                <EventOutlinedIcon sx={{ color: "#1A1A1A99 !important" }} />
                <Typography variant="h5" className={UIStyle.chooseLabel}>
                  {`${appointmentStartDate} ${selectedSlot}` || "Choose"}
                </Typography>
              </Grid>
              {formik.submitCount > 0 &&
                (!appointmentStartDate || !selectedSlot) && (
                  <FormHelperText error>
                    {"Please select date and slot"}
                  </FormHelperText>
                )}
            </Grid>
            {openSlot && (
              <Grid item xs={12} sx={{ display: "flex", gap: "20px" }}>
                <Grid item xs={6} className={UIStyle.calenderUI}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      showDaysOutsideCurrentMonth
                      fixedWeekNumber={6}
                      onChange={(e: any) => {
                        setSelectedDate(e);
                        setSelectedSlot("");
                        setAvailableSlots({
                          morningSlots: [],
                          afternoonSlots: [],
                          eveningSlots: [],
                        });
                        getSlotList(e);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    height: "100%",
                    paddingLeft: "1px",
                    overflowY: "scroll",
                    paddingBottom: "1px",
                  }}
                >
                  <Grid item mt={2}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography
                          variant="h5"
                          sx={{ color: "#1A1A1A", fontWeight: "bold" }}
                        >
                          Morning slots
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        {availableSlots?.morningSlots.map(
                          (slot: any, index) => (
                            <SlotGrid
                              index={index}
                              slot={slot}
                              setSelectedSlot={setSelectedSlot}
                              selectedSlot={selectedSlot}
                            />
                          )
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item mt={2}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography
                          variant="h5"
                          sx={{ color: "#1A1A1A", fontWeight: "bold" }}
                        >
                          Afternoon slots
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        {availableSlots?.afternoonSlots.map((slot, index) => (
                          <SlotGrid
                            index={index}
                            slot={slot}
                            setSelectedSlot={setSelectedSlot}
                            selectedSlot={selectedSlot}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item mt={2}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Typography
                          variant="h5"
                          sx={{ color: "#1A1A1A", fontWeight: "bold" }}
                        >
                          Evening slots
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        {availableSlots?.eveningSlots.map((slot, index) => (
                          <SlotGrid
                            index={index}
                            slot={slot}
                            setSelectedSlot={setSelectedSlot}
                            selectedSlot={selectedSlot}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {/* <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                sx={{
                  color: "#1A1A1A33",
                  padding: "0px !important",
                }}
                checked={values.isRepeated}
                name="isRepeated"
                onChange={(e: any) => {
                  formik.handleChange(e);
                  setShowRepeat(!showRepeat);
                }}
              />
              <Typography variant="h5" className={classes.label}>
                &nbsp;Repeat
              </Typography>
            </Grid>
            {showRepeat && (
              <Grid item xs={12}>
                <Grid item xs={12} className={UIStyle.repeatDiv}>
                  <Typography variant="h5" className={classes.label}>
                    Every
                  </Typography>
                  <Grid item xs={2}>
                    <Select
                      className={classes.selectInputStyle}
                      value={values.repeatInterval}
                      name="repeatInterval"
                      onChange={formik.handleChange}
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
                        return <Typography variant="h5">{selected}</Typography>;
                      }}
                      MenuProps={MenuProps}
                      displayEmpty
                    >
                      {everyNo.map((data) => {
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
                  <Grid item xs={2}>
                    <Select
                      className={classes.selectInputStyle}
                      value={values.repeatUnit}
                      name="repeatUnit"
                      onChange={formik.handleChange}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span>
                              <Typography
                                variant="h5"
                                sx={{
                                  color: "#1A1A1A80 !important",
                                }}
                              ></Typography>
                            </span>
                          );
                        }
                        return <Typography variant="h5">{selected}</Typography>;
                      }}
                      MenuProps={MenuProps}
                      displayEmpty
                    >
                      {everyInterval.map((data) => {
                        return (
                          <MenuItem
                            key={data.key}
                            value={data.value}
                            className={classes.menuItemColorStyle}
                          >
                            {data.key}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", gap: "5px" }} mt={2}>
                  {weekLetters.map((data, index) => (
                    <Box sx={{cursor:'pointer'}} onClick={() => handleOnSelectWeekDay(data.value)} key={index}>
                    <Typography key={index} className={UIStyle.weekLetters} sx={{
                      background:weekDays.includes(data.value) ? '#cccc' : '#FFFFFF 0% 0% no-repeat padding-box'
                    }}>
                      {data.key}
                    </Typography>
                    </Box>
                  ))}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "baseline",
                  }}
                  mt={2}
                >
                  <Typography variant="h5" className={classes.label}>
                    End On
                  </Typography>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                          // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <DatePicker
                          value={appntEndDate}
                          slotProps={{ textField: { size: "small" } }}
                          onChange={(e:any) => {                            
                            console.log('e: ', e);
                            setAppointmentEndDate(dayjs(e).format("YYYY-MM-DD"));
                          }}
                        />
                      </Box>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item>
                  <InputBase
                value={values.numberOfAppointment}
                onChange={formik.handleChange}
                name="numberOfAppointment"
                fullWidth
                placeholder="Appointment"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
              />
                  </Grid>
                  <Typography variant="h5" className={classes.label}>
                    Appointments
                  </Typography>
                </Grid>
              </Grid>
            )} */}
            <Grid item xs={12}>
              <CustomFormLabel label="Chief Complaint" isRequired={true} />

              <InputBase
                value={values.visitReason}
                onChange={formik.handleChange}
                name="visitReason"
                fullWidth
                placeholder="Reason"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
              />
              {touched.visitReason && errors.visitReason && (
                <FormHelperText error>{errors.visitReason}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                sx={{
                  color: "#1A1A1A !important",
                }}
              >
                Send Forms
              </Typography>
              <Autocomplete
                sx={{ ...multiSelectDropDown, mt: "8px" }}
                multiple
                options={intakeTabData || []}
                getOptionLabel={(option: any) => option.name}
                value={formik.values.intakeForms}
                // onChange={formik.handleChange}
                onChange={(_, values) => {
                  formik.setFieldValue("intakeForms", values);
                }}
                disableCloseOnSelect
                renderOption={(props, option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      justifyContent: "space-between",
                      fontSize: "14px !important",
                    }}
                    {...props}
                  >
                    &nbsp;
                    {option?.name}
                  </MenuItem>
                )}
                renderInput={(params) => (
                  <TextField
                    classes={{ root: classes.customTextField }}
                    {...params}
                    variant="outlined"
                    placeholder="Search And Select Forms"
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContentText>
        <Grid className={commonStyle.footer}>
          <Grid
            sx={{
              color: "red",
            }}
          >
            {errorMsg}
          </Grid>
          <Grid className={commonStyle.footerBtn}>
            <ButtonBase sx={formButtonStyle.cancelButtonStyle} onClick={close}>
              Cancel
            </ButtonBase>
          </Grid>
          <Grid className={commonStyle.footerBtn}>
            <ButtonBase sx={formButtonStyle.saveButtonStyle} type="submit">
              Save
            </ButtonBase>
          </Grid>
        </Grid>
      </DialogContent>
      {loading && (
        <CircularProgress
          size={50}
          sx={{
            color: grey[500],
            zIndex: "999",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </form>
  );
};

export default BookAppointmentForm;
