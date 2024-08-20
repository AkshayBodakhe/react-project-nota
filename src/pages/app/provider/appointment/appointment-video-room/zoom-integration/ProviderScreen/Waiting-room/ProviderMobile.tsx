import { Backdrop, Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useLayoutEffect, useState } from "react";
import ReactPlayer1 from "react-player";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
// @ts-ignore
// import NoUser from '../../../../../assets/noUserProfile.svg';
// @ts-ignore
import classess from "../../mobile.module.scss";
import VideoAudioControls from "../../video-content/audioVideoControls";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  width: "100vw",
  height: "100vh",
};

const ReactPlayer = ReactPlayer1;

type ResponseTypeForAuthToken = {
  authToken?: string;
  errorMessage?: string;
};

const ProviderMobileWaitingRoom = () => {
  const [, setModalOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { appointmentUuid, roomName } = useParams();
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [showRequestDeniedAlert, setShowRequestDeniedAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setNameEntered] = useState(true);
  const [appointment, setAppointment] = useState<any>();
  const isPatient = true;
  const callGetAppointment = async () => {
    let appointment = {} as any;

    // try {
    //   const res = await AppointmentControllerService.getAppointmentById(appointmentUuid || "");
    //   if (res.data) {
    //     appointment = res.data as any;
    //   }
    // } catch {
    //   appointment = {} as any;
    // }

    setAppointment(appointment);
  };

  useEffect(() => {
    if (appointmentUuid) {
      callGetAppointment();
    }
  }, [appointmentUuid]);

  const handleStartButton = async () => {
    setRequesting(true);
    // await VideoControllerService.emit(`${appointmentUuid}_REQUEST`);
  };

  useEffect(() => {
    const handleJoinRoom = async () => {
      if (isPatient) {
        let signature = "";
        if (!roomName) {
          return;
        }
        // const eventSource = new EventSource(`${SSE_URL}/${appointmentUuid}_ACCEPT`);
        // eventSource.onmessage = async () => {
        //   if (isPatient) {
        //     const res = await VideoControllerService.getAuthToken(roomName);
        //     const response = res.data as ResponseTypeForAuthToken;
        //     if (response.authToken) {
        //       stream && stream.getVideoTracks()[0].stop();
        //       stream && stream.getAudioTracks()[0].stop();
        //       signature = response.authToken;
        //       navigate(`/join-room/${roomName}`, {
        //         state: { appointment: appointment, signature: signature }
        //       });
        //     }
        //   }
      }
      // eventSource.onerror = (_event) => {
      //   setTimeout(handleJoinRoom, 3000);
      // };
      // return () => eventSource.close();
      // }
    };
    handleJoinRoom();
  }, []);

  useEffect(() => {
    const handleDenyEvent = () => {
      // if (isPatient) {
      // const eventSource = new EventSource(`${SSE_URL}/${appointmentUuid}_DENY`);
      // eventSource.onmessage = async () => {
      //   if (isPatient) {
      //     setRequesting(false);
      //     setAlertText("Request denied to join Appointment, click on join now to rejoin");
      //     setShowRequestDeniedAlert(true);
      //   }
      // };
      // eventSource.onerror = (event) => {
      //   event;
      //   handleDenyEvent();
      // };
      // return () => eventSource.close();
    };
    // };
    // handleDenyEvent();
  }, []);

  const [
    joinRoomResponse,
    joinRoomError,
    joinRoomLoading,
    joinRoomHookHandler,
  ] = [{}, {}, {}, {}] as any;

  ///Here call get auth token api
  const handleCreateButton = async () => {
    let signature = "";
    try {
      // if (!roomName) {
      //   return;
      // }
      joinRoomHookHandler(null);

      //   const res = await VideoControllerService.getAuthToken(roomName);
    } catch {}

    // setNameEntered(true);
  };

  useLayoutEffect(() => {
    handleJoinRoom();
  }, [joinRoomResponse, joinRoomError]);

  const handleJoinRoom = () => {
    let signature = "";
    if (joinRoomResponse?.statusCode === 200) {
      const response = joinRoomResponse?.data as ResponseTypeForAuthToken;
      if (response?.authToken) {
        stream && stream.getVideoTracks()[0].stop();
        stream && stream.getAudioTracks()[0].stop();
        signature = response.authToken;
        navigate(
          `/trackboards/join-room/55c1c716-5d13-4b03-a36e-c400a5a3f7c4`,
          {
            state: { signature: signature },
          }
        );
      }
    }
  };

  const handleCameraAndMicDisable = () => {
    setAlertText("Please give permission to camera and microphone");
    setShowRequestDeniedAlert(true);
  };

  async function stopVideoOnly(stream: MediaStream | null) {
    if (!stream) {
      return;
    }

    setVideo((prev) => !prev);
    // dispatch(setVideoEnable(!video));

    if (video) {
      stream.getVideoTracks().map((track) => (track.enabled = false));
    } else {
      stream.getVideoTracks().map((track) => (track.enabled = true));
    }
  }

  function stopAudioOnly(stream: MediaStream | null) {
    if (!stream) {
      return;
    }

    setAudio((prev) => !prev);
    // dispatch(setAudioEnable(!audio));
    stream.getTracks().forEach(function (track) {
      if (track.readyState == "live" && track.kind === "audio") {
        track.stop();
      }
    });
  }

  useLayoutEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(async (stream: MediaStream) => {
        setStream(stream);
      })
      .catch((err) => {
        err;
        setModalOpen(true);
      });
  }, []);

  useLayoutEffect(() => {
    const frame = window.parent.document.getElementById("iFrame");
    if (stream && frame && !frame.getAttribute("src")) {
      stream.getVideoTracks().forEach((track) => track.stop());
      stream.getAudioTracks().forEach((track) => track.stop());
    }
  }, [stream]);

  const closeDialog = () => {
    const frame = window.parent.document.getElementById("iFrame");
    const draggable = window.parent.document.getElementById("parent");

    if (frame && draggable) {
      stream && stream.getVideoTracks()[0].stop();
      stream && stream.getAudioTracks()[0].stop();
      const uRl = ``;
      frame.setAttribute("data", uRl);
      frame.style.display = "none";
      draggable.style.display = "none";
    }
  };
  const playerStyle = {
    overflow: "hidden",
  };

  const responsiveStyles = {
    height: "100vh",
    width: "100vw",
  };

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        display: "flex",
        flexDirection: "row",
        height: "100%",
        border: "2px solid #000",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        boxShadow: 24,
        overflow: "hidden",
      }}
      open={true}
    >
      <Box sx={style}>
        <Box sx={style}>
          <Box sx={{ ...playerStyle, ...responsiveStyles }}>
            {video ? (
              <>
                <ReactPlayer
                  width={"100%"}
                  height="100%"
                  playing={true}
                  className={classess?.player}
                  muted
                  url={stream as MediaStream}
                />
                <Backdrop
                  open={true}
                  sx={{
                    position: "absolute",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              </>
            ) : (
              <Box
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                }}
              >
                <img src={"NoUser"} width="25%" alt="No User" />
              </Box>
            )}
            <Box
              sx={{
                position: "absolute",
                color: "white",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
              }}
            >
              <Stack spacing={2} textAlign={"center"}>
                <Typography variant="h4">Ready to join?</Typography>
                <Typography variant="h5">No one else is here</Typography>
              </Stack>
            </Box>
            <Box
              sx={{
                position: "absolute",
                color: "white",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                "@media (max-width: 900px)": {
                  transform: "translate(-50%, -70%)",
                },
              }}
            >
              <VideoAudioControls
                video={video}
                audio={audio}
                onVideoChange={stopVideoOnly}
                onAudioChange={stopAudioOnly}
                stream={stream}
                handleCreateButton={handleCreateButton}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default ProviderMobileWaitingRoom;
