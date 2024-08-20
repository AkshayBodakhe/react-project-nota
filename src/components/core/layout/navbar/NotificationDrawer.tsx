import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import {
  notificationContainer,
  notificationContainerUnseen,
} from "./navbar.widget";
import {
  useAppointmentControllerServiceUpdateAppointmentStatus,
  useNotificationsControllerServiceGetProviderNotifications,
  useNotificationsControllerServiceMarkNotificationAsSeen,
  useNotificationsControllerServiceRejectAppointmentRequest,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { alertAction } from "../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import Loading from "../../../common/spinner/loading";
import { formButtonStyle } from "../../../../styles/common";
import moment from "moment";
import { toCamelCase } from "../../add-edit-staff-user/add-edit-staff-user";
import BookAppointmentForm from "../../../../pages/app/provider/appointment/calendar/bookAppointmentForm";
import { formatDate } from "../../../common/enums-and-interfaces/common-functions";

interface notificationProps {
  notificationCounter: (no: number) => void;
  providerGroupUuid: string;
}

function Notification(props: notificationProps) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [concatNotificationPayload, setConcatNotificationPayload] =
    React.useState<any[]>([]);
  const [notificationLength, setNotificationLength] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(
    null
  );
  const [openBookAppointment, setOpenBookAppointment] = useState(false);

  const { data, isLoading, isSuccess, refetch, isRefetching, isError } =
    useNotificationsControllerServiceGetProviderNotifications({
      providerGroupUuid: props.providerGroupUuid,
    });

  const { mutateAsync: mutateAsyncUpdateNotification, isSuccess: isUpdating } =
    useNotificationsControllerServiceMarkNotificationAsSeen();

  const {
    mutateAsync: mutateAsyncRejectNotification,
    isSuccess: isRejectSuccess,
  } = useNotificationsControllerServiceRejectAppointmentRequest();

  const {
    mutateAsync: mutateAsyncBookApponitment,
    isSuccess: isBookApponitmentSuccess,
  } = useAppointmentControllerServiceUpdateAppointmentStatus();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  useEffect(() => {
    if (isError) {
      // dispatch(
      //   alertAction.setAlert({
      //     open: true,
      //     message: data.message as any,
      //     severity: "error",
      //   })
      // );
    }
  }, [isError, dispatch]);

  const handleOpenBookAppointment = () => {
    setOpenBookAppointment(false);
  };

  const setNotificationConsumed = async (notificationData: any) => {
    await mutateAsyncUpdateNotification({
      notificationId: notificationData?.id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const response = data;
      const notificationDetails = response?.data;

      // setTotalPages(response.totalPages);

      // setNotificationPayload(notificationDetails);
      setConcatNotificationPayload((prev) => {
        const prevUUids = prev.map((item) => item.uuid);

        const filtered = notificationDetails?.filter(
          (item: any) => !prevUUids.includes(item.uuid)
        );

        return [...prev, ...filtered];
      });
      const notificationCount = concatNotificationPayload.filter(
        (data) => data.consumed === false
      );
      props.notificationCounter(notificationDetails?.length);
      setNotificationLength(notificationDetails?.length);
    }
  }, [data, isSuccess, isRefetching, refetch]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
  };

  const handleDecline = async (notificationId: any) => {
    await mutateAsyncRejectNotification({ id: notificationId })
      .then((res: any) => {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: res.message as any,
            severity: "success",
          })
        );
      })
      .catch((_err) => {
        // dispatch(
        //   alertAction.setAlert({
        //     open: true,
        //     message: err.message as any,
        //     severity: "error",
        //   })
        // );
      })
      .finally(() => {
        refetch();
        setSelectedNotification(null);
      });
  };

  const handleBookAppointment = async (appointmentUuid: string, e: any) => {
    await mutateAsyncBookApponitment({
      appointmentUuid: appointmentUuid,
      appointmentStatus: "SCHEDULED",
    })
      .then((res: any) => {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: res.message as any,
            severity: "success",
          })
        );
        setNotificationConsumed(e);
      })
      .catch((_err) => {
        // dispatch(
        //   alertAction.setAlert({
        //     open: true,
        //     message: err.message as any,
        //     severity: "error",
        //   })
        // );
      })
      .finally(() => {
        refetch();
        setSelectedNotification(null);
      });
  };

  return (
    <>
      <Box
        sx={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          "&::-webkit-scrollbar-button": {
            display: "block",
          },
        }}
      >
        <InfiniteScroll
          dataLength={10}
          height={"80vh"}
          next={fetchMoreData}
          hasMore={page + 1 < totalPages}
          loader={
            !isLoading ? (
              ""
            ) : (
              <Typography variant="body1">
                <Loading />
              </Typography>
            )
          }
          // initialScrollY={notificationLength}
          endMessage={
            !isLoading && notificationLength === 0 ? (
              <Box style={{ textAlign: "center" }}>
                <Typography variant="body1" fontWeight={"700"}>
                  No notification available
                </Typography>
              </Box>
            ) : (
              !isLoading && (
                <Box style={{ textAlign: "center" }}>
                  <Typography variant="body1" fontWeight={"700"}>
                    Well done! You've viewed it all!
                  </Typography>
                </Box>
              )
            )
          }
        >
          {isLoading ? (
            <Loading />
          ) : (
            concatNotificationPayload.map((e, index) => {
              return (
                <React.Fragment key={index}>
                  {selectedNotification?.id === e?.id &&
                  e?.type === "APPOINTMENT_REQUEST" ? (
                    <Box
                      mt={2}
                      sx={{
                        ...notificationContainer,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Divider />
                      <Box p={2}>
                        <Typography variant="subtitle1" pb={2}>
                          Appointment Request:
                        </Typography>
                        <Typography variant="subtitle1" pb={2}></Typography>

                        <Typography variant="body1" pb={1}>
                          Appointment Date:{" "}
                          {moment(e?.appointmentDate).format("MM-DD-YYYY")}{" "}
                          {e?.appointmentStatTime}
                          <br />
                        </Typography>
                        <Typography pb={1}>
                          Status: {toCamelCase(e?.appointmentStatus)}
                          <br />
                        </Typography>
                        <Typography pb={1}>
                          Visit Type: {toCamelCase(e?.visitType)}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        {/* <Button
                          variant="outlined"
                          sx={{
                            ...FilterSearch,
                            width: "7.625rem",
                            height: "35px",
                          }}
                          onClick={handleReschedule}
                        >
                          Reschedule
                        </Button> */}
                        <Box></Box>
                        <Box>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              handleDecline(e?.id);
                            }}
                          >
                            Decline
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              ...formButtonStyle.saveButtonStyle,
                              width: "4.625rem",
                              marginLeft: "20px",
                            }}
                            onClick={() => {
                              setOpenBookAppointment(true);
                            }}
                          >
                            Accept
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ) : selectedNotification?.id === e?.id &&
                    e?.type === "BOOKED_APPOINTMENT" ? (
                    <Box
                      mt={2}
                      sx={{
                        ...notificationContainer,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Divider />
                      <Box p={2}>
                        <Typography variant="subtitle1" pb={2}>
                          Booked Appointment:
                        </Typography>
                        <Typography variant="subtitle1" pb={2}></Typography>

                        <Typography variant="body1" pb={1}>
                          Appointment Date:{" "}
                          {moment(e?.appointmentDate).format("MM-DD-YYYY")}{" "}
                          {e?.appointmentStatTime}
                          <br />
                        </Typography>
                        <Typography pb={1}>
                          Status: {toCamelCase(e?.appointmentStatus)}
                          <br />
                        </Typography>
                        <Typography pb={1}>
                          Visit Type: {toCamelCase(e?.visitType)}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        {/* <Button
                          variant="outlined"
                          sx={{
                            ...FilterSearch,
                            width: "7.625rem",
                            height: "35px",
                          }}
                          onClick={handleReschedule}
                        >
                          Reschedule
                        </Button> */}
                        <Box></Box>
                        <Box>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              handleDecline(e?.id);
                            }}
                          >
                            Decline
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              ...formButtonStyle.saveButtonStyle,
                              width: "4.625rem",
                              marginLeft: "20px",
                            }}
                            onClick={() => {
                              handleBookAppointment(e?.appointmentUuid, e);
                            }}
                          >
                            Confirm
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Grid
                      key={index}
                      container
                      sx={
                        !e?.consumed
                          ? notificationContainerUnseen
                          : notificationContainer
                      }
                      onClick={() => {
                        setSelectedNotification(e);
                      }}
                    >
                      <Box
                        pl={1}
                        pr={1}
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        pb={2}
                        alignItems={"center"}
                      >
                        {e?.title === "Patient booked appointment" ? (
                          <Typography variant="title1">
                            {e?.patientName + " " + "booked the appointment"}
                          </Typography>
                        ) : (
                          <Typography variant="title1">
                            {e?.patientName + " " + e?.title}
                          </Typography>
                        )}
                        <Typography variant="title1"></Typography>
                      </Box>
                      <Typography variant="title1" pl={1} pr={1}>
                        {"Created Date : " + formatDate(e?.date)}
                      </Typography>
                    </Grid>
                  )}
                </React.Fragment>
              );
            })
          )}
        </InfiniteScroll>
      </Box>
      <Dialog
        onClose={handleOpenBookAppointment}
        open={openBookAppointment}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ padding: "10px 10px 0px 10px!important" }}>
          {/* <Grid className={commonStyle.dialogTitle}>
            <Grid>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            </Grid>
            <Grid style={{ cursor: "pointer" }}>
              <CloseIcon onClick={close} />
            </Grid>
          </Grid> */}
        </DialogTitle>
        <DialogContent></DialogContent>
        <BookAppointmentForm
          patientName={selectedNotification?.patientName}
          patientUuid={selectedNotification?.patientUuid}
          visitType={selectedNotification?.visitType}
          appointmentType={selectedNotification?.appointmentType}
          appointmentDate={selectedNotification?.appointmentDate}
          appointmentStatTime={selectedNotification?.appointmentStatTime}
          appointmentEndTime={selectedNotification?.appointmentEndTime}
          notificationId={selectedNotification?.id}
          close={handleOpenBookAppointment}
        />
      </Dialog>
    </>
  );
}

export default Notification;
