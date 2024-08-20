import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CHECK_IN_TITLE,
  commonButtonStyle,
  tableUseStyles,
} from "./appointmentWithLocations";
import { formButtonStyle, formTitle } from "../../../../../styles/common";
import { useEffect, useState } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import moment from "moment";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEncounterControllerServiceCreateEncounter } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { EncounterRequest } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { ErrorResponseEntity } from "../../../../../components/common/enums-and-interfaces/interfaces";
import AddPayment from "../../../../../components/common/modal/payment/add-payment-modal";

export const saveButtonStyle = {
  fontFamily: "Roboto, sans-serif !important",
  width: "11rem",
  backgroundColor: "#2C57B3",
  height: "35px",
  fontSize: "14px",
  color: "#ffffff",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#2C57B3",
  },
};

const CalenderAppointmentDetails = ({ event, handleDialogOpen }: any) => {
  const theme = useTheme();
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState();
  const removeSeconds = (timeStr: string): string => {
    if (timeStr.length === 8 && timeStr[2] === ":" && timeStr[5] === ":") {
      return timeStr.slice(0, -3);
    } else {
      return timeStr;
    }
  };
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  useEffect(() => {
    setAppointmentDetails(event && event?.extendedProps);
  }, [event?.extendedProps]);

  const classes = tableUseStyles();

  const handleOpenCheckIn = () => {
    setOpenCheckIn((item) => !item);
  };

  const {
    mutateAsync: callCheckIn,
    isError,
    error,
  } = useEncounterControllerServiceCreateEncounter();

  const handleCompleteCheckIn = async () => {
    const currDate = new Date();
    const requestBody = {
      appointmentId: event?.extendedProps?.appointmentId,
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
      handleOpenCheckIn();
      // const encounterUuid = res.data?.encounterUuid;
      // navigate("/provider/appointment/calendar/complete-intake", {
      //   state: { appointmentDetails, encounterUuid },
      // });
    });
  };

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
      handleOpenCheckIn();
    }
  }, [isError]);

  const handleStartVideo = () => {
    if (event?.extendedProps?.visitType === "VIRTUAL") {
      startAppointment(appointmentDetails);
    }
  };

  const startAppointment = async (row: any) => {
    const uuid = row?.appointmentUuid;
    const apptId = row?.appointmentId;
    const someDiv = document.getElementById("iFrame");
    const parent = document.getElementById("parent");
    if (someDiv && parent) {
      someDiv.style.display = "block";
      someDiv.style.width = "100%";
      someDiv.style.height = "100%";
      someDiv.style.zIndex = "10000";
      parent.style.display = "block";
      parent.style.width = "100%";
      parent.style.height = "100%";
      parent.style.zIndex = "10000";
      const uRl = `/provider/waiting-room/${uuid}/${apptId}`;
      someDiv.setAttribute("src", uRl);
      if (
        row?.appointmentStatus === "CHECKED_IN" ||
        row?.appointmentStatus === "RE_SCHEDULED" ||
        row?.appointmentStatus === "SCHEDULED"
      ) {
        await handleCompleteCheckIn();
        await navigate("/provider/appointment/calendar/complete-intake", {
          state: { row },
        });
      }
      // else if (
      //   row?.appointmentStatus === "RE_SCHEDULED" ||
      //   row?.appointmentStatus === "SCHEDULED"
      // ) {
      //   await setAppointmentDetails(row);
      //   await handleCompleteCheckIn();
      // }
    }
  };

  const handleEditDemographics = () => {
    const titleData = CHECK_IN_TITLE;
    navigate("/provider/add-patient", {
      state: { titleData, appointmentDetails },
    });
  };

  const handlePatientCharting = () => {
    if (appointmentDetails) {
      navigate("/provider/patient-details", { state: { appointmentDetails } });
    }
  };

  const handleCollectPayment = () => {
    handleOpenCheckIn();
    setOpenPaymentDialog((item) => !item);
  };

  const handleOpenEncounter = () => {
    const row = appointmentDetails;
    navigate("/provider/appointment/calendar/complete-intake", {
      state: { row },
    });
  };

  return (
    <>
      <Box
        sx={{
          border:
            event?.extendedProps?.appointmentStatus === "CANCELLED"
              ? `1px solid ${theme.palette.error.main} !important`
              : event?.extendedProps?.visitType === "VIRTUAL"
              ? "1px solid #087DB0 !important"
              : `1px solid ${theme.palette.success.main} !important`,
          cursor: "pointer",
          background:
            event?.extendedProps?.appointmentStatus === "CANCELLED"
              ? `${theme.palette.error.dark} !important`
              : event?.extendedProps?.visitType === "VIRTUAL"
              ? "#E7F6FD !important"
              : "#ECFDF3 !important",
          color:
            event?.extendedProps?.appointmentStatus === "CANCELLED"
              ? `${theme.palette.error.main} !important`
              : event?.extendedProps?.visitType === "VIRTUAL"
              ? "#00478D !important"
              : "#039855 !important",
          borderRadius: "3px",
          display: "flex",
          padding: "2px",
          fontWeight: "600",
        }}
        onClick={() => {
          if (event?.extendedProps?.visitType === "IN_PERSON") {
            if (event?.extendedProps?.appointmentStatus === "CHECKED_IN") {
              handleOpenEncounter();
            } else {
              handleDialogOpen(
                event?.extendedProps?.appointmentId,
                event?.extendedProps
              );
            }
          } else {
            handleOpenCheckIn();
          }
        }}
      >
        <Tooltip
          title={`${removeSeconds(
            event?.extendedProps?.startTime
          )} to ${removeSeconds(event?.extendedProps?.endTime)}\n${
            event?.extendedProps?.patientName
          }`}
        >
          <Button
            sx={{
              cursor: "pointer",
              background:
                event?.extendedProps?.appointmentStatus === "CANCELLED"
                  ? `${theme.palette.error.dark} !important`
                  : event?.extendedProps?.visitType === "VIRTUAL"
                  ? "#E7F6FD !important"
                  : "#ECFDF3 !important",
              color:
                event?.extendedProps?.appointmentStatus === "CANCELLED"
                  ? `${theme.palette.error.main} !important`
                  : event?.extendedProps?.visitType === "VIRTUAL"
                  ? "#00478D !important"
                  : "#039855 !important",
              borderRadius: "3px",
              display: "flex",
              padding: "0px  !important",
              fontWeight: "600",
              textTransform: "none",
            }}
          >
            <Typography variant="h5" fontWeight={"500"}>
              {removeSeconds(event?.extendedProps?.startTime)} to{" "}
              {removeSeconds(event?.extendedProps?.endTime)}
            </Typography>{" "}
            &nbsp;
            <Typography variant="h5" fontWeight={"500"}>
              {event?.extendedProps?.patientName}
            </Typography>
          </Button>
        </Tooltip>
      </Box>
      <Grid>
        <Dialog
          sx={{ zIndex: "99999", position: "absolute" }}
          open={openCheckIn}
          // onClose={handleOpenCheckIn}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle
            id="scroll-dialog-title"
            sx={{
              background: "#F5F6F9",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ ...formTitle, fontSize: "22px" }}>
              {CHECK_IN_TITLE}
            </Typography>
            <ButtonBase sx={{ display: "flex", gap: "20px" }}>
              <Box
                onClick={handlePatientCharting}
                display={"flex"}
                gap={1}
                sx={{ color: "#36598c" }}
              >
                <TrendingUpIcon />
                <Typography fontWeight={"600"} color={"#36598c"}>
                  {"Chart"}
                </Typography>{" "}
              </Box>
              <Box>
                <CloseIcon onClick={handleOpenCheckIn} />
              </Box>
            </ButtonBase>
          </DialogTitle>
          <DialogContent>
            <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} rowGap={2}>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Appointment Type"}
                </Typography>
                <Typography className={classes.value}>
                  {toCamelCase(event?.extendedProps?.appointmentType) || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Appointment Date & Time"}
                </Typography>
                <Typography className={classes.value}>
                  {moment(event?.extendedProps?.appointmentDate).format(
                    "MM-DD-yyyy"
                  ) +
                    " " +
                    event?.extendedProps?.startTime}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Rendering Provider"}
                </Typography>
                <Typography className={classes.value}>
                  {event?.extendedProps?.providerName || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>{"Location"}</Typography>
                <Typography className={classes.value}>
                  {event?.extendedProps?.locationName}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Chief Complaint"}
                </Typography>
                <Typography
                  noWrap
                  sx={{ cursor: "pointer" }}
                  title={event?.extendedProps?.chiefCompliant}
                  className={classes.value}
                >
                  {event?.extendedProps?.chiefCompliant}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Outstanding Balance"}
                </Typography>
                <Typography className={classes.value}>{"-- --"}</Typography>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ mt: "20px", mb: "5px" }}>
            <ButtonBase onClick={handleEditDemographics} sx={commonButtonStyle}>
              {"Edit Demographics"}
            </ButtonBase>
            <ButtonBase onClick={handleCollectPayment} sx={commonButtonStyle}>
              {"Collect Payment"}
            </ButtonBase>
            <ButtonBase
              onClick={handleCompleteCheckIn}
              // onClick={() => {
              //   console.log("Called*******************");
              // }}
              sx={formButtonStyle.saveButtonStyle}
            >
              {"Complete Check In"}
            </ButtonBase>
            <ButtonBase onClick={handleStartVideo} sx={saveButtonStyle}>
              {"Start Virtual Encounter"}
            </ButtonBase>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid>
        {openPaymentDialog && appointmentDetails && (
          <AddPayment
            open={openPaymentDialog}
            onClose={handleCollectPayment}
            appointmentDetails={appointmentDetails}
          />
        )}
      </Grid>
    </>
  );
};

export default CalenderAppointmentDetails;
