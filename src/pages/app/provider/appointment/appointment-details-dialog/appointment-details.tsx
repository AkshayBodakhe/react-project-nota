import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { commonWidget, formButtonStyle } from "../../../../../styles/common";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useEffect, useState } from "react";
import { formatDateMMDDYYWithoutTz } from "../complete-check-in/complete-check-in";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import { EncounterRequest } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import {
  useAppointmentControllerServiceNoShowAppointment,
  useAppointmentControllerServiceUpdateAppointmentStatus,
  useEncounterControllerServiceCreateEncounter,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { ErrorResponseEntity } from "../../../../../components/common/enums-and-interfaces/interfaces";
import avatar_01 from "../../../../../assets/other/avatar_01.jpg";
import { calculateDOB, transformText } from "../../../../../components/common/helper";

interface apptProps {
  open: boolean;
  onClose: any;
  setCancelAppointment: any;
  setRescheduledAppointment: any;
  appointmentDetails: any;
  setCallGetAllAptList: any;
}

export const imgBox = {
  height: "90px",
  width: "90px",
  border: "1px solid gray",
  borderRadius: "5px",
};

export const container = {
  display: "flex",
  flexDirection: "column",
  rowGap: "20px",
};

export const childContainer = {
  borderRadius: "5px",
  background: "#eaeaea",
  width: "70%",
  p: "10px",
};

export const mainContainer = {
  display: "grid",
  gridTemplateColumns: "3% 1fr",
  gap: "30px",
  py: "15px",
  px: "2px",
};

export const heading2 = {
  fontFamily: "32px",
  fontWeight: "600",
};

export const iconStyle = { fontSize: "30px", color: "#2c57b3" };

export const apptMenu = [
  { id: 1, name: "Scheduled" },
  { id: 2, name: "Check In" },
  { id: 4, name: "Rescheduled" },
  { id: 5, name: "Cancelled" },
  { id: 6, name: "No Show" },
];

function AppointmentDetails(props: apptProps) {
  const classes = commonWidget();
  const {
    open,
    onClose,
    setCancelAppointment,
    setRescheduledAppointment,
    appointmentDetails,
    setCallGetAllAptList,
  } = props;
  const dispatch = useDispatch();

  const [dropDownValue, setDropDownValue] = useState(false);

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

  const {
    mutateAsync: callNoShowAppointment,
    isError: isNoShowError,
    error: noShowError,
  } = useAppointmentControllerServiceNoShowAppointment();

  const handleNoShowAppointment = () => {
    callNoShowAppointment({
      id: appointmentDetails?.appointmentId,
    }).then((res: any) => {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res.message,
          severity: "success",
        })
      );
      setCallGetAllAptList(true);
      onClose();
    });
  };

  useEffect(() => {
    if ((noShowError as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (noShowError as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
    // handleCheckInDialog();
  }, [isNoShowError]);

  const { mutateAsync: notConfirmedToScheduled } =
    useAppointmentControllerServiceUpdateAppointmentStatus();

  const handledNotConfirmed = () => {
    notConfirmedToScheduled({
      appointmentUuid: appointmentDetails?.appointmentUuid,
      appointmentStatus: "SCHEDULED",
    }).then((res: any) => {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res.message,
          severity: "success",
        })
      );
      setCallGetAllAptList(true);
      onClose();
    });
  };

  const handleDropDownVal = (item: string) => {
    if (item === "Cancelled") {
      setCancelAppointment(true);
      onClose();
    } else if (item === "Rescheduled") {
      setRescheduledAppointment(true);
      onClose();
    } else if (item === "Check In") {
      handleCloseCheckIn();
    } else if (item === "No Show") {
      handleNoShowAppointment();
    } else if (item === "Scheduled") {
      handledNotConfirmed();
    }
  };

  const {
    mutateAsync: callCheckIn,
    isError,
    error,
  } = useEncounterControllerServiceCreateEncounter();

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
  }, [isError]);

  const handleCloseCheckIn = async () => {
    const currDate = new Date();
    const requestBody = {
      appointmentId: appointmentDetails.appointmentId,
      status: EncounterRequest.status.CHECK_IN,
      serviceDate: currDate as any,
      note: "",
    };

    await callCheckIn({ requestBody: requestBody }).then((res: any) => {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res.message,
          severity: "success",
        })
      );
      setCallGetAllAptList(true);
      onClose();
    });
  };

  return (
    <>
      <Dialog open={open} fullWidth onClose={onClose} maxWidth="sm">
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            background: "#F5F6F9",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3">{"APPOINTMENT DETAILS"}</Typography>
          <Close sx={{ cursor: "pointer" }} onClick={onClose} />
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "20% 1fr",
            }}
          >
            <Grid>
              {/* <Box sx={imgBox}> */}
              <img
                style={{ height: "80px", width: "80px" }}
                src={appointmentDetails?.avatar || avatar_01}
              />
              {/* </Box> */}
            </Grid>
            <Grid container flexDirection={"column"} rowGap={1}>
              <Typography fontWeight={"600"}>
                {appointmentDetails?.patientName}
              </Typography>
              <Box display={"flex"} gap={4}>
                <Typography>
                  {formatDateMMDDYYWithoutTz(appointmentDetails?.dob)}
                </Typography>
                <Typography>{calculateDOB(appointmentDetails?.dob)}</Typography>
                <Typography>{transformText(appointmentDetails?.patientGender)}</Typography>
              </Box>
              <Box display={"grid"} gridTemplateColumns={"8% 35% 8% 45%"}>
                <PhoneIphoneIcon />
                <Typography>{appointmentDetails?.contactNumber}</Typography>
                <MailOutlineIcon />
                <Typography
                  sx={{ cursor: "pointer" }}
                  noWrap
                  title={appointmentDetails?.patientEmail}
                >
                  {appointmentDetails?.patientEmail}
                </Typography>
              </Box>
            </Grid>
          </Box>
          <Box>
            <Grid sx={mainContainer}>
              <PermContactCalendarOutlinedIcon sx={iconStyle} />
              <Box sx={container}>
                <Box pt={0.5}>
                  <Typography sx={heading2}>
                    {toCamelCase(appointmentDetails?.appointmentType)}
                  </Typography>
                </Box>
                <Box sx={childContainer}>
                  <Typography variant="h5">
                    {formatDateMMDDYYWithoutTz(
                      appointmentDetails?.appointmentDate
                    ) +
                      " at " +
                      appointmentDetails?.startTime}
                  </Typography>
                  <Typography mt={1.5} variant="h4" fontWeight={"600"}>
                    {appointmentDetails?.providerName}
                  </Typography>
                  <Typography variant="h5">
                    {appointmentDetails?.clinicName}
                  </Typography>
                </Box>
                <Box>
                  <CustomFormLabel label={"Status"} />
                  <Select
                    className={classes.selectInputStyle}
                    name={
                      "subjective.historyOfPresentIllness.patientFamilyHistory.relative"
                    }
                    // value={
                    //   formikData?.values?.subjective?.historyOfPresentIllness
                    //     ?.patientFamilyHistory?.relative
                    // }
                    onChange={(e) => {
                      handleDropDownVal(e.target.value as string);
                    }}
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
                              Select Relative
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{""}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {apptMenu.map((data) => {
                      return (
                        <MenuItem
                          value={data.name}
                          className={classes.menuItemColorStyle}
                        >
                          {data.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box>
            <Grid sx={mainContainer}>
              <LocationOnOutlinedIcon sx={iconStyle} />
              <Box pt={0.5}>
                <Typography sx={heading2}>
                  {toCamelCase(appointmentDetails?.presentType)}
                </Typography>
              </Box>
            </Grid>
          </Box>
          <Box>
            <Grid sx={mainContainer}>
              <DescriptionOutlinedIcon sx={iconStyle} />
              <Grid>
                <Box
                  pt={0.5}
                  display={"grid"}
                  gridTemplateColumns={"10% 2% 20% 1fr"}
                  alignItems={"center"}
                >
                  <Typography sx={heading2}>{"Forms"}</Typography>
                  <Typography sx={heading2}>{":"}</Typography>
                  <Typography sx={heading2}>{"Incomplete"}</Typography>
                  <InfoOutlinedIcon sx={{ color: "#2c57b3" }} />
                </Box>
                <Box py={1}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#2c57b3",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {"Resend"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <ButtonBase
            type="submit"
            sx={formButtonStyle.saveButtonStyle}
            onClick={onClose}
          >
            <Typography color={"#fff"}>{"Start Visit Note"}</Typography>
          </ButtonBase> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppointmentDetails;
