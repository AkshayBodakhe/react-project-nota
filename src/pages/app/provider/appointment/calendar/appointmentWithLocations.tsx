import {
  Box,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonBase,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { appointmentList } from "../../../../../mock-data/appoinmentList";
import theme from "../../../../../theme";
import {
  Column,
  ErrorResponseEntity,
} from "../../../../../components/common/enums-and-interfaces/interfaces";
import {
  useAppointmentControllerServiceGetAppointmentList,
  useEncounterControllerServiceCreateEncounter,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import moment from "moment";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { mappedAppointmentListData } from "./mapper";
import { SearchCriteria } from "./appointments";
import {
  isNavalaCare,
  transformText,
} from "../../../../../components/common/helper";
import { getActionColor } from "./helper";
import {
  AppointmentListLocationRequest,
  EncounterRequest,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { useNavigate } from "react-router-dom";
import { formButtonStyle, formTitle } from "../../../../../styles/common";
//   import AppoinmentAction from "../../../../components/core/view-appoinment-action-details/appoinment-action";
//   import AppoinmentNotConfirmedAction from "../../../../components/core/patient-details/appoinment-not-confirmed-action";
//   import CollectPayment from "../../../../components/core/collect-payment/collect-payment";
//   import EventSucessModal from "../../../../components/common/success-modal";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AppoinmentNotConfirmedAction from "../../../../../components/core/layout/individual-patient-details/appoinment-not-confirmed-action";
import AppointmentDetails from "../appointment-details-dialog/appointment-details";
import CancelAppointment from "../appointment-details-dialog/cancel-appoitment";
import RescheduledAppointment from "../appointment-details-dialog/rescheduled-appointment";
import ScheduleAppointment from "./scheduleAppointment";
import EncounterView from "../../unsigned-visit/encounter-view";
import EncounterCareView from "../../unsigned-visit/encounterCareView";
import Loading, { sxs } from "../../../../../components/common/spinner/loading";
import ChangeStatusCheckIn from "./check-in-dialog";
import { useReduxSelector } from "../../../../../store/rootReducers";
import AddPayment from "../../../../../components/common/modal/payment/add-payment-modal";

const { availabilityPresenceType } = AppointmentListLocationRequest;

interface Row {
  [key: string]: string | JSX.Element;
}

export const statusColStyle = {
  display: "flex",
  gap: "4px",
  alignItems: "center",
  border: "1px solid #0097F0",
  borderRadius: "5px",
  px: "5px",
  py: "3px",
  background: "#e1effb",
  maxWidth: "fit-content",
  cursor: "pointer",
};

export const RESCHEDULE_APPT = "Reschedule Appointment";

export const columns: Column[] = [
  { id: "time", label: "Time" },
  { id: "patientName", label: "Patient Name" },
  { id: "providerName", label: "Provider" },
  { id: "appointmentType", label: "Appointment Type" },
  { id: "reasonOfVisit", label: "Reason For Visit" },
  { id: "intakeFormStatus", label: "Intake Form Status" },
  // { id: "copayAmount", label: "Copay" },
  { id: "appointmentStatus", label: "Status" },
  { id: "action", label: "Action" },
];

export const tableUseStyles = makeStyles(
  (theme) => ({
    tableContainer: {
      width: "100%",
      marginTop: "20px",
    },

    key: {
      color: "#7b7b7b",
      fontSize: "16px !important",
    },
    value: {
      color: "#1A1A1ACC",
      fontWeight: "bold !important",
    },
    tableHeaderCell: {
      padding: "10px !important",
      background: "#DAEAF8 0% 0% no-repeat padding-box !important",
      color: "#000",
      boxShadow: "none !important",
      opacity: 1,
    },
    tableHeadCellRoot: {
      padding: "0.550rem !important",
    },
    checkBoxColor: {
      color: "#004186 !important",
    },
    tableRowCell: {
      padding: "5px 10px !important",
      [theme.breakpoints.down("xl")]: {
        padding: "5px 10px !important",
      },
    },
    tableBodyRow: {
      backgroundColor: "#ffffff",
      "&:nth-of-type(odd)": {
        backgroundColor: "#ffffff",
      },
    },
    pagination: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 16,
    },
    paginatioUL: {
      border: "1px solid red",
    },

    root: {
      "& .MuiPaginationItem-root": {
        color: "#000",
        "&:hover": {
          backgroundColor: "#ccc",
        },

        "&.Mui-selected": {
          backgroundColor: "#004186 !important",
          color: "#fff",
        },
      },

      "& .MuiPaginationItem-icon": {
        color: "#004186 !important",
      },
    },
    defaultText: {
      color: "#000000 !important",
      //fontWeight: "bold !important",
    },
    contactText: {
      color: "#000000 !important",
      //fontWeight: "600 !important",
    },
    copayAmountNegativeText: {
      //fontWeight: "600 !important",
      width: "auto",
      //border: "1px solid #FF3939",
      color: "#FF3939 !important",
      // background: "#FF39390D",
      // textAlign: "center",
      // borderRadius: "5px",
      padding: "2px",
    },
    copayAmountPositiveText: {
      //fontWeight: "600 !important",
      width: "auto",
      //border: "1px solid #00B917",
      color: "#00B917 !important",
      //background: "#00B9170D",
      //textAlign: "center",
      //borderRadius: "5px",
      padding: "2px",
    },

    patientInfo: {
      display: "flex !important",
      alignItems: "center !important",
      gap: "20px !important",
    },
    avatarStyle: {
      width: "32px !important",
      height: "32px !important",
    },
    subAppoinmentInfo: {
      color: "#000000 !important",
      // fontSize: "14px !important",
      //fontWeight: "600 !important",
    },
    menuItemColorStyle: {
      color: "#1A1A1A7F",
    },
    subAppoinmentInfo2: {
      color: "#000000 !important",
      textDecoration: "underline",
      // fontSize: "14px !important",
      //fontWeight: "600 !important",
      cursor: "pointer",
    },
    selectInputStyle: {
      ".MuiOutlinedInput-notchedOutline": { border: 0 },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      border: "none",
      "& fieldset": { border: "none" },
      height: "42px !important",
      width: "100%",
    },

    tableHeadingTypo: {
      color: "#000000 !important",
      //fontWeight: "600 !important",
    },
    paginationBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    TabelheadingTypo: {
      color: "#000000 !important",
    },
    headingBackground: {
      background: "#DAEAF8 0% 0% no-repeat padding-box !important",
    },
    checkIcon: {
      color: "#00B917",
    },
    warningIcon: {
      color: "#FF3939",
    },
    paperSearch: {
      padding: "4px",
      display: "flex",
      alignItems: "center",
      height: "42px",
      border: "none",
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
    },
    inputBase: {
      marginLeft: "2px !important",
      flex: 1,
    },
    iconButton: {
      padding: "10px",
    },
  }),
  { defaultTheme: theme }
);

export const VIRTUAL_CONST = "VIRTUAL";
export const IN_PERSON_CONST = "IN_PERSON";
export const CHECK_IN_TITLE = "Check In";

export const commonButtonStyle = {
  backgroundColor: "#DAEAF8",
  textTransform: "initial",
  fontSize: "14px",
  color: "#36598c",
  boxShadow: "none !important",
  padding: "8px 16px !important",
  border: "1px solid #36598c",
  borderRadius: "4px",
};

interface AppoinmentsWithLocationProps {
  filter: SearchCriteria;
  currentDate: any;
  visitType: string;
  callGetApt: boolean;
  tableData: any[];
  isLoader?: boolean;
  getAppointmentList: any;
}
function AppoinmentsWithLocation(props: AppoinmentsWithLocationProps) {
  const {
    filter,
    currentDate,
    visitType,
    callGetApt,
    tableData,
    isLoader,
    getAppointmentList,
  } = props;
  const dispatch = useDispatch();
  const classes = tableUseStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerAction, setDrawerAction] = useState("");
  const [appoinmentList] = useState<any[]>(tableData);
  const [inpersonRows, setInpersonRows] = useState<any[]>([]);
  const [virtualRows, setVirtualRows] = useState<any[]>([]);
  const [openNotConfirmedDialog, setOpenNotConfirmedDialog] = useState(false);
  const [openCollectPayment, setOpenCollectPayment] = useState(false);
  const [showLoader, setShowLoader] = useState(isLoader);
  const [, setRowData] = useState<any>();
  const navigate = useNavigate();
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<any>();
  const [openAppointmentDetails, setOpenAppointmentDetails] = useState(false);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [callGetAllAptList, setCallGetAllAptList] = useState(false);
  const [openRescheduledAppointment, setRescheduledAppointment] =
    useState(false);
  const [openEncounterView, setOpenEncounterView] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  const handleCancelDialog = () => {
    setCancelAppointment(false);
  };

  const handleRescheduledAppointment = () => {
    setRescheduledAppointment(false);
  };

  const handleCheckInDialog = () => {
    setOpenCheckIn((item) => !item);
  };

  let isAudioEnable = useReduxSelector(
    (state) => state.roomReducer.localAudio
  ) as boolean;

  let isVideoEnable = useReduxSelector(
    (state) => state.roomReducer.localVideo
  ) as boolean;

  let isVideoOn = useReduxSelector((state) => state.roomReducer);

  // const handleCloseCheckIn = async () => {
  //   const currDate = new Date();
  //   const requestBody = {
  //     appointmentId: appointmentDetails.appointmentId,
  //     status: EncounterRequest.status.CHECK_IN,
  //     serviceDate: currDate as any,
  //     note: "",
  //   };

  //   await callCheckIn({ requestBody: requestBody }).then((res: any) => {
  //     dispatch(
  //       alertAction.setAlert({
  //         open: true,
  //         message: res.message,
  //         severity: "success",
  //       })
  //     );
  //     setOpenCheckIn((item) => !item);
  //     getAppointmentList();
  //   });
  // };

  if (showLoader) {
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }
  const userDetail = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const handleAction = (row: any) => {
    setAppointmentDetails(row);
    if (row.appointmentStatus === "SCHEDULED") {
      handleOpenCloseApptDetails();
    } else if (row?.appointmentStatus === "NOT_CONFIRMED") {
      handleOpenCloseApptDetails();
    }
  };

  const handleOpenCloseApptDetails = () => {
    setOpenAppointmentDetails((item) => !item);
  };

  const handlePaymentAction = (action: string) => {
    if (action === "Collect Payment") {
      setOpenCollectPayment(true);
    }
  };

  const handleViewEncounterDetails = () => {
    setOpenEncounterView((item) => !item);
  };

  const getEncouterDetails = (rowData: any) => {
    if (
      rowData.appointmentStatus === "CANCELLED" ||
      rowData.appointmentStatus === "NO_SHOW" ||
      rowData.appointmentStatus === "NOT_CONFIRMED"
    )
      return "";

    return (
      <Box sx={statusColStyle}>
        {rowData.appointmentStatus === "COMPLETED" ? (
          <RemoveRedEyeOutlinedIcon
            style={{ fontSize: "18px", color: "#2c57b3" }}
          />
        ) : (
          <ExitToAppIcon style={{ fontSize: "17px", color: "#2c57b3" }} />
        )}
        {
          <Typography
            variant="h5"
            sx={{
              color: "#2c57b3",
              textDecorationColor: "#000000",
              cursor: "pointer",
            }}
          >
            {rowData.appointmentStatus === "COMPLETED" ? "View" : "Start"}
          </Typography>
        }
      </Box>
    );
  };

  // <Typography
  //   variant="h5"
  //   onClick={() => {
  //     handleAction(row.action);
  //   }}
  //   sx={{
  //     color: getActionColor(row[column.id]),
  //     textDecorationColor: "#000000",
  //   }}
  // >
  //   {transformText(row[column.id])}
  // </Typography>;

  // const { mutateAsync: getAppointmentReq, data: appointmentList } =
  //   useAppointmentControllerServiceGetAppointmentList();

  // const getAppointmentList = () => {
  //   setShowLoader(true);
  //   getAppointmentReq({
  //     requestBody: {
  //       appointmentStatus: filter.selectStatus?.value
  //         ? [filter.selectStatus?.value]
  //         : [],
  //       appointmentType: filter.appointmentType?.value || null,
  //       date: dayjs(currentDate).format("YYYY-MM-DD"),
  //       providerUuid: filter?.searchProvider || [],
  //       patientUserUuid: undefined,
  //       appointmentListLocationRequest: {
  //         locationUuid: filter?.locationUuid,
  //         availabilityPresenceType: undefined,
  //       },
  //       patientSearch: filter?.patientSearch,
  //     },
  //   })
  //     .then((data: any) => {
  //       data.data.map((item: any) =>
  //         item.locationName === "IN_PERSON"
  //           ? setInpersonRows(item.appointmentListResponses)
  //           : setVirtualRows(item.appointmentListResponses)
  //       );
  //       setAppoinmentList(data?.data?.map(mappedAppointmentListData));
  //     })
  //     .catch((er) => console.log(er))
  //     .finally(() => setShowLoader(false));
  // };

  const getAppointmentListData = (data: any[]) => {
    const appointmentListData: any[] = [];
    data?.forEach((appointmentData: any) => {
      appointmentData?.appointmentListResponses?.forEach((appointment: any) => {
        // appointment["locationName"] = appointmentData?.locationName;
        appointmentListData.push(appointment);
      });
    });
    return appointmentListData;
  };
  useEffect(() => {
    getAppointmentList();
  }, [callGetAllAptList, cancelAppointment]);

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
        row?.appointmentStatus === "RE_SCHEDULED" ||
        row?.appointmentStatus === "SCHEDULED"
      ) {
        const currDate = new Date();
        const requestBody = {
          appointmentId: row.appointmentId,
          status: EncounterRequest.status.CHECK_IN,
          serviceDate: currDate as any,
          note: "",
        };
        await callCheckIn({ requestBody: requestBody }).then((res: any) => {
          const encounterUuid = res.data?.encounterUuid;
          navigate("/provider/appointment/calendar/complete-intake", {
            state: { row, encounterUuid },
          });
        });
        // await setAppointmentDetails(row);
        // await handleCompleteCheckIn();
      } else {
        navigate("/provider/appointment/calendar/complete-intake", {
          state: { row },
        });
      }
    }
  };

  const handleStartVideo = () => {
    setOpenVideoDialog((item) => !item);
  };

  const handleEncounter = async (row: any) => {
    await setAppointmentDetails(row);
    // const appointmentId = row?.appointmentUuid;
    if (row?.presentType === VIRTUAL_CONST) {
      if (
        row?.appointmentStatus === "COMPLETED" &&
        row?.presentType === VIRTUAL_CONST
      ) {
        handleViewEncounterDetails();
      } else if (
        row?.appointmentStatus !== "COMPLETED" &&
        row?.appointmentStatus !== "CHECKED_IN"
      ) {
        // startAppointment(row);
        handleStartVideo();
      } else if (row?.appointmentStatus === "CHECKED_IN") {
        startAppointment(row);
      }
    } else if (
      row?.presentType === IN_PERSON_CONST &&
      row?.appointmentStatus !== "COMPLETED" &&
      row?.appointmentStatus !== "CHECKED_IN"
    ) {
      handleCheckInDialog();
    } else if (row?.appointmentStatus === "CHECKED_IN") {
      navigate("/provider/appointment/calendar/complete-intake", {
        state: { row },
      });
    } else if (row?.appointmentStatus === "COMPLETED") {
      handleViewEncounterDetails();
    } else if (row?.appointmentStatus === "NOT_CONFIRMED") {
      handleViewEncounterDetails();
    }
  };

  const titleData = CHECK_IN_TITLE;

  const handleEditDemographics = () => {
    navigate("/provider/add-patient", {
      state: { titleData, appointmentDetails },
    });
  };

  const handleNavigateToVideo = () => {
    if (appointmentDetails) {
      startAppointment(appointmentDetails);
    }
  };

  const handleCompleteCheckIn = async () => {
    const currDate = new Date();
    const requestBody = {
      appointmentId: appointmentDetails.appointmentId,
      status: EncounterRequest.status.CHECK_IN,
      serviceDate: currDate as any,
      note: "",
    };
    currentDate;
    await callCheckIn({ requestBody: requestBody }).then((res: any) => {
      // dispatch(
      //   alertAction.setAlert({
      //     open: true,
      //     message: res.message,
      //     severity: "success",
      //   })
      // );
      const encounterUuid = res.data?.encounterUuid;
      navigate("/provider/appointment/calendar/complete-intake", {
        state: { appointmentDetails, encounterUuid },
      });
    });
  };

  const handlePatientCharting = () => {
    navigate("/provider/patient-details", { state: { appointmentDetails } });
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

  const setStartEndTime = (timeSlot: any) => {
    if (!timeSlot) return;
    return timeSlot.startTime + "-" + timeSlot.endTime;
  };

  const handleCollectPayment = () => {
    setOpenPaymentDialog((item) => !item);
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          marginTop: "20px !important",
          //color: "#1A1A1A",
        }}
      >
        {props.visitType}
      </Typography>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow className={classes.headingBackground}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  className={classes.tableHeaderCell}
                  // classes={{ root: classes.tableHeadCellRoot }}
                >
                  <Typography variant="h5" className={classes.TabelheadingTypo}>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isLoader && (
            <TableBody>
              {getAppointmentListData(tableData && tableData)?.map(
                (row: any, index: any) => {
                  //   const isRowSelected = isSelected(row.Patient_ID);
                  // setRowData(row as any);
                  return (
                    <TableRow
                      key={index}
                      className={classes.tableBodyRow}
                      hover
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          className={classes.tableRowCell}
                          //classes={{ root: classes.tableHeadCellRoot }}
                        >
                          {column.id === "time" ? (
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{ color: "#000000" }}
                              >
                                {row[column.id]}
                              </Typography>
                              <Typography
                                variant="h5"
                                noWrap={true}
                                className={classes.subAppoinmentInfo}
                              >
                                {setStartEndTime(row)}
                              </Typography>
                            </Box>
                          ) : column.id === "patientName" ? (
                            <Box className={classes.patientInfo}>
                              <Avatar
                                className={classes.avatarStyle}
                                alt={row.Patient_Name}
                                src={row.patientImage}
                              />
                              <Box>
                                <Typography
                                  variant="h5"
                                  noWrap={true}
                                  className={classes.tableHeadingTypo}
                                >
                                  {row[column.id]}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  className={classes.subAppoinmentInfo}
                                >
                                  {transformText(row.patientGender)}
                                </Typography>
                              </Box>
                            </Box>
                          ) : column.id === "providerName" ? (
                            <Box>
                              <Typography
                                variant="h5"
                                className={classes.contactText}
                              >
                                {row[column.id]}
                              </Typography>
                              <Typography
                                variant="h5"
                                noWrap={true}
                                className={classes.subAppoinmentInfo}
                              >
                                {row.providerSpeciality}
                              </Typography>
                            </Box>
                          ) : column.id === "intakeFormStatus" ? (
                            <Box>
                              <Typography
                                variant="h5"
                                className={classes.contactText}
                              >
                                {row[column.id]}
                              </Typography>
                              <Typography
                                variant="h5"
                                noWrap={true}
                                className={classes.subAppoinmentInfo2}
                              >
                                {row.intakeFormSubStatus}
                              </Typography>
                            </Box>
                          ) : column.id === "copayAmount" ? (
                            <Box>
                              <Typography
                                variant="h5"
                                className={`${
                                  row.copayAmountStatus === "Collect Payment"
                                    ? classes.copayAmountNegativeText
                                    : classes.copayAmountPositiveText
                                }`}
                              >
                                {row[column.id]}
                              </Typography>
                              <Typography
                                variant="h5"
                                noWrap={true}
                                className={classes.subAppoinmentInfo2}
                                onClick={() =>
                                  handlePaymentAction(row.copayAmountStatus)
                                }
                              >
                                {row.copayAmountStatus}
                              </Typography>
                            </Box>
                          ) : column.id === "appointmentStatus" ? (
                            <Box sx={{ width: "90px" }}>
                              <Typography
                                variant="h5"
                                onClick={() => {
                                  handleAction(row);
                                }}
                                sx={{
                                  color: getActionColor(row[column.id]),
                                  textDecorationColor: "#000000",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                {transformText(row[column.id])}
                              </Typography>
                            </Box>
                          ) : column.id === "action" ? (
                            <Box>
                              <Typography onClick={() => handleEncounter(row)}>
                                {getEncouterDetails(row)}
                              </Typography>
                            </Box>
                          ) : column.id === "reasonOfVisit" ? (
                            <Box width={"150px"}>
                              {/* <Typography onClick={() => handleEncounter(row)}>
                              {getEncouterDetails(row)}
                            </Typography> */}
                              <Typography
                                variant="h5"
                                className={classes.defaultText}
                                noWrap
                                sx={{ cursor: "pointer" }}
                                title={row[column.id]}
                              >
                                {transformText(row[column.id])}
                              </Typography>
                            </Box>
                          ) : (
                            <Box>
                              <Typography
                                variant="h5"
                                className={classes.defaultText}
                              >
                                {transformText(row[column.id])}
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          )}
        </Table>
        {!isLoader && tableData[0] === null && (
          <Grid
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Typography variant="h5">No Data Found</Typography>
          </Grid>
        )}
        {isLoader && <Loading />}
      </TableContainer>
      {/* <AppoinmentAction
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          getAppoinmentAction={drawerAction}
        /> */}
      {/* {openNotConfirmedDialog && (
        <AppoinmentNotConfirmedAction
          openDialog={openNotConfirmedDialog}
          setOpenDialog={setOpenNotConfirmedDialog}
          onClose={() => {
            setOpenNotConfirmedDialog(false);
          }}
        />
      )} */}
      {/*
        {openCollectPayment && (
          <CollectPayment
            open={openCollectPayment}
            onClose={() => setOpenCollectPayment(false)}
            onSave={() => {
              setOpenCollectPayment(false);
              setOpenSuccessModal(true);
            }}
          ></CollectPayment>
        )}
        {openSuccessModal && (
          <EventSucessModal
            message="Payment Successfully Added"
            onClose={() => setOpenSuccessModal(false)}
          />
        )} */}
      {openAppointmentDetails && (
        <AppointmentDetails
          open={openAppointmentDetails}
          onClose={handleOpenCloseApptDetails}
          setCancelAppointment={setCancelAppointment}
          setRescheduledAppointment={setRescheduledAppointment}
          appointmentDetails={appointmentDetails}
          setCallGetAllAptList={setCallGetAllAptList}
        />
      )}
      {cancelAppointment && (
        <CancelAppointment
          open={cancelAppointment}
          onClose={handleCancelDialog}
          appointmentDetails={appointmentDetails}
        />
      )}
      {openRescheduledAppointment && (
        <ScheduleAppointment
          open={openRescheduledAppointment}
          onClose={handleRescheduledAppointment}
          title={RESCHEDULE_APPT}
          appointmentDetails={appointmentDetails}
        />
      )}
      {openCheckIn && (
        <ChangeStatusCheckIn
          open={openCheckIn}
          onClose={handleCheckInDialog}
          appointmentDetails={appointmentDetails}
          handleEditDemographics={handleEditDemographics}
          handleCompleteCheckIn={handleCompleteCheckIn}
          handlePatientCharting={handlePatientCharting}
        />
      )}
      {openPaymentDialog && (
        <AddPayment
          open={openPaymentDialog}
          onClose={handleCollectPayment}
          appointmentDetails={appointmentDetails}
        />
      )}
      <Grid>
        <Dialog open={openVideoDialog} fullWidth maxWidth="md">
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
                <CloseIcon onClick={handleStartVideo} />
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
                  {appointmentDetails?.appointmentType || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Appointment Date & Time"}
                </Typography>
                <Typography className={classes.value}>
                  {appointmentDetails?.appointmentDate +
                    " " +
                    appointmentDetails?.startTime || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Rendering Provider"}
                </Typography>
                <Typography className={classes.value}>
                  {appointmentDetails?.providerName || "-"}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>{"Location"}</Typography>
                <Typography className={classes.value}>
                  {appointmentDetails?.locationName}
                </Typography>
              </Grid>
              <Grid display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                <Typography className={classes.key}>
                  {"Chief Complaint"}
                </Typography>
                <Typography
                  noWrap
                  sx={{ cursor: "pointer" }}
                  title={appointmentDetails?.reasonOfVisit}
                  className={classes.value}
                >
                  {appointmentDetails?.reasonOfVisit || "-"}
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
            {!isNavalaCare() && (
              <ButtonBase onClick={handleCollectPayment} sx={commonButtonStyle}>
                {"Collect Payment"}
              </ButtonBase>
            )}
            <ButtonBase
              onClick={handleNavigateToVideo}
              sx={formButtonStyle.saveButtonStyle}
            >
              {appointmentDetails?.presentType === "VIRTUAL"
                ? "Start Virtual Encounter"
                : "Complete Check In"}
            </ButtonBase>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid>
        {!isNavalaCare() ? (
          <EncounterView
            open={openEncounterView}
            onClose={handleViewEncounterDetails}
            appointmentDetails={appointmentDetails}
          />
        ) : (
          <EncounterCareView
            open={openEncounterView}
            onClose={handleViewEncounterDetails}
            appointmentDetails={appointmentDetails}
          />
        )}
      </Grid>
    </>
  );
}

export default AppoinmentsWithLocation;
