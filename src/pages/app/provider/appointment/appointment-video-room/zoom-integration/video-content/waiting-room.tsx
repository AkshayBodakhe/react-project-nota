// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactPlayer1 from "react-player";
import {
  setIsMeeting,
  setLocalAudio,
  setLocalVideo,
} from "../../../../../../../store/features/common-actions/room-action/room-action";
import {
  useAppointmentControllerServiceGetAppointmentDetails,
  useZoomControllerServiceGetAuthToken,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { ZoomControllerService } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import Loader from "../../../../../../../components/common/spinner/loader";
import moment from "moment";

function WaitingRoom() {
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const getParam = useLocation();
  const { appointmentId } = useParams();
  const [alertText, setAlertText] = useState("");
  const [showRequestDeniedAlert, setShowRequestDeniedAlert] = useState(false);
  const [authTok, setAuthTok] = useState();
  const [appointmentInfo, setAppointmentDetails] = useState<any>();
  const [isEnable, setIsEnable] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCameraAndMicDisable = () => {
    setAlertText("Please give permission to camera and microphone");
    setShowRequestDeniedAlert(true);
  };
  const { uuid, apptId } = useParams();
  // const appointmentInfo = getParam?.state?.row;

  const { data } = useAppointmentControllerServiceGetAppointmentDetails({
    id: apptId as any,
  });

  useEffect(() => {
    // if (data && data) {
    setAppointmentDetails(data?.data);
    // }
  }, [uuid, data]);

  const { data: videoCallToken } = useZoomControllerServiceGetAuthToken({
    appointmentUuid: uuid as string,
  });

  useEffect(() => {
    setAuthTok(videoCallToken && videoCallToken?.data?.authToken);
  }, [videoCallToken, uuid]);

  const handleJoinVideoCall = () => {
    if (videoCallToken?.data?.authToken) {
      const signature = videoCallToken?.data?.authToken;
      // const signature = "cc03b96c-1d0b-4270-8759-7132d203e3ac";
      stream && stream.getVideoTracks()[0].stop();
      stream && stream.getAudioTracks()[0].stop();
      navigateToJoinRoom(signature);
    }
  };

  const navigateToJoinRoom = async (signature: any) => {
    const appointment = appointmentInfo;
    dispatch(setIsMeeting(true));
    navigate(`/provider/join-room/${uuid}`, {
      state: { appointment, signature },
    });
  };

  const ReactPlayer = ReactPlayer1;

  async function stopVideoOnly(stream: MediaStream | null) {
    if (!stream) {
      return;
    }

    setVideo((prev) => !prev);
    dispatch(setLocalVideo(!video));

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
    dispatch(setLocalAudio(!audio));
    stream.getTracks().forEach(function (track) {
      if (track.readyState == "live" && track.kind === "audio") {
        track.stop();
      }
    });
  }

  const handleEnableMicAndCamera = async (stream: MediaStream | null) => {
    if (!stream) {
      return;
    }
    await setAudio((prev) => !prev);
    dispatch(setLocalAudio(!audio));
    stream.getTracks().forEach(function (track) {
      if (track.readyState == "live" && track.kind === "audio") {
        track.stop();
      }
    });

    setIsEnable((item) => !item);
    await setVideo((prev) => !prev);
    dispatch(setLocalVideo(!video));

    if (video) {
      stream.getVideoTracks().map((track) => (track.enabled = false));
    } else {
      stream.getVideoTracks().map((track) => (track.enabled = true));
    }
  };

  useEffect(() => {
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
        // setModalOpen(true);
      });
  }, []);

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

  const handleBack = () => {
    // setVideo(false);
    // setAudio(false);

    // closeDialog();
    const someDiv = document.getElementById("iFrame");
    if (someDiv) {
      someDiv.style.display = "none";
      const uRl = `/`;
      someDiv.setAttribute("src", uRl);
    }

    const frame = window.parent.document.getElementById("iFrame");
    const draggable = window.parent.document.getElementById("parent");

    if (frame && draggable) {
      const uRl = ``;
      frame.setAttribute("src", uRl);
      frame.setAttribute("data", uRl);
      frame.style.display = "none";
      draggable.style.display = "none";
    }
    navigate("/provider/appointment/calendar");
  };

  return (
    <>
      <Grid
        sx={{ background: "#fff", height: "100vh" }}
        p={2}
        position={"relative"}
      >
        <Box display={"flex"} gap={1} mt={2}>
          <Grid onClick={handleBack}>
            <ArrowBackIcon sx={{ cursor: "pointer" }} />
          </Grid>
          <Grid>
            <Typography variant="h4" fontWeight={"500"}>
              {appointmentInfo &&
                appointmentInfo?.patient?.user?.firstName +
                  " " +
                  appointmentInfo?.patient?.user?.lastName +
                  " Appointment With " +
                  appointmentInfo?.provider?.firstName +
                  " " +
                  appointmentInfo?.provider?.lastName}
            </Typography>
            <Typography variant="h6" fontWeight={"500"} mt={1}>
              {appointmentInfo &&
                moment(appointmentInfo?.appointmentDate).format("MM-DD-yyyy") +
                  " At " +
                  appointmentInfo?.startTime}
            </Typography>
          </Grid>
        </Box>
        <Box sx={{ opacity: "0.3" }}>
          <hr />
        </Box>
        <Box display={"flex"} py={25} px={20}>
          {!isEnable && (
            <>
              <Grid
                container
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={2}
                gap={"28px"}
                padding={"5rem"}
                sx={{
                  background: "#373737",
                  width: "70vw",
                  height: "25vw",
                }}
              >
                <Box>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="125"
                    height="125"
                    viewBox="0 0 234 230"
                    fill="none"
                  >
                    <path
                      d="M116.619 229.663C181.025 229.663 233.237 178.251 233.237 114.832C233.237 51.4119 181.025 0 116.619 0C52.2119 0 0 51.4119 0 114.832C0 178.251 52.2119 229.663 116.619 229.663Z"
                      fill="black"
                    />
                    <g opacity="0.43">
                      <path
                        d="M115.995 60.8621C119.734 60.8612 123.388 61.9535 126.497 64.0009C129.606 66.0482 132.029 68.9587 133.46 72.3641C134.891 75.7696 135.266 79.5171 134.537 83.1327C133.809 86.7483 132.009 90.0696 129.366 92.6766C126.723 95.2835 123.355 97.059 119.689 97.7785C116.023 98.498 112.222 98.1292 108.768 96.7187C105.315 95.3082 102.363 92.9194 100.286 89.8544C98.2086 86.7894 97.1001 83.1859 97.1001 79.4995C97.0996 74.5572 99.09 69.8171 102.634 66.322C106.177 62.8268 110.983 60.8628 115.995 60.8621ZM115.995 140.737C142.726 140.737 170.898 153.695 170.898 159.374V169.135H61.0996V159.374C61.0996 153.695 89.2698 140.737 116.002 140.737M115.995 44C108.875 44 101.915 46.082 95.9951 49.9828C90.075 53.8835 85.4608 59.4278 82.7361 65.9145C80.0114 72.4012 79.2985 79.5389 80.6875 86.4252C82.0766 93.3114 85.5052 99.6368 90.5398 104.602C95.5745 109.566 101.989 112.947 108.972 114.317C115.955 115.687 123.194 114.984 129.772 112.297C136.35 109.61 141.972 105.06 145.928 99.222C149.884 93.3842 151.995 86.5207 151.995 79.4995C151.996 74.8373 151.066 70.2206 149.257 65.913C147.448 61.6055 144.797 57.6916 141.454 54.3949C138.11 51.0982 134.141 48.4834 129.773 46.6998C125.405 44.9162 120.723 43.9988 115.995 44ZM115.995 123.875C91.9703 123.875 44 135.767 44 159.374V186H188V159.374C188 135.767 140.03 123.875 115.995 123.875Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </Box>
              </Grid>
              <Grid
                container
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {stream && (
                  <Grid
                    container
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    rowGap={0.5}
                  >
                    <Typography
                      sx={{
                        //   color: "#F8F8F8",
                        fontFamily: "Figtree",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "150%",
                        letterSpacing: "0.24px",
                      }}
                    >
                      Camera & Microphone Needed
                    </Typography>
                    <Typography
                      sx={{
                        //   color: "#F8F8F8",
                        fontFamily: "Figtree",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "150%",
                        letterSpacing: "0.24px",
                      }}
                    >
                      Get ready for your close up
                    </Typography>
                  </Grid>
                )}
                <Box mt={6}>
                  <ButtonBase
                    sx={{
                      borderRadius: "8px",
                      color: "#F8F8F8",
                      fontSize: "13px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      paddingX: "20px",
                      textTransform: "capitalize",
                      fontFamily: "Roboto, sans-serif !important",
                      backgroundColor: "#3165b0",
                      height: "35px",
                      "&:hover": {
                        backgroundColor: "#2C57B3",
                      },
                    }}
                    onClick={
                      !stream
                        ? handleCameraAndMicDisable
                        : () => handleEnableMicAndCamera(stream)
                    }
                  >
                    Enable Mic & Camera
                  </ButtonBase>
                </Box>
              </Grid>
            </>
          )}
          {isEnable && (
            <>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "48vh",
                }}
              >
                {isEnable ? (
                  <ReactPlayer
                    playing={true}
                    muted
                    height={"100%"}
                    width={"100%"}
                    url={stream as MediaStream}
                    style={{
                      // border: "1px solid gray",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(50, 50, 50, 0.5)",
                    }}
                  />
                ) : (
                  ""
                )}
                {!video && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      position: "absolute",
                      zIndex: "9999",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: "20%",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="200"
                      height="200"
                      viewBox="0 0 234 230"
                      fill="none"
                      style={{
                        boxShadow: "0px 0px 0px rgba(200, 500, 500, 0.7)",
                        borderRadius: "50%",
                      }}
                    >
                      <path
                        d="M116.619 229.663C181.025 229.663 233.237 178.251 233.237 114.832C233.237 51.4119 181.025 0 116.619 0C52.2119 0 0 51.4119 0 114.832C0 178.251 52.2119 229.663 116.619 229.663Z"
                        fill="white"
                      />
                      <g opacity="0.43">
                        <path
                          d="M115.995 60.8621C119.734 60.8612 123.388 61.9535 126.497 64.0009C129.606 66.0482 132.029 68.9587 133.46 72.3641C134.891 75.7696 135.266 79.5171 134.537 83.1327C133.809 86.7483 132.009 90.0696 129.366 92.6766C126.723 95.2835 123.355 97.059 119.689 97.7785C116.023 98.498 112.222 98.1292 108.768 96.7187C105.315 95.3082 102.363 92.9194 100.286 89.8544C98.2086 86.7894 97.1001 83.1859 97.1001 79.4995C97.0996 74.5572 99.09 69.8171 102.634 66.322C106.177 62.8268 110.983 60.8628 115.995 60.8621ZM115.995 140.737C142.726 140.737 170.898 153.695 170.898 159.374V169.135H61.0996V159.374C61.0996 153.695 89.2698 140.737 116.002 140.737M115.995 44C108.875 44 101.915 46.082 95.9951 49.9828C90.075 53.8835 85.4608 59.4278 82.7361 65.9145C80.0114 72.4012 79.2985 79.5389 80.6875 86.4252C82.0766 93.3114 85.5052 99.6368 90.5398 104.602C95.5745 109.566 101.989 112.947 108.972 114.317C115.955 115.687 123.194 114.984 129.772 112.297C136.35 109.61 141.972 105.06 145.928 99.222C149.884 93.3842 151.995 86.5207 151.995 79.4995C151.996 74.8373 151.066 70.2206 149.257 65.913C147.448 61.6055 144.797 57.6916 141.454 54.3949C138.11 51.0982 134.141 48.4834 129.773 46.6998C125.405 44.9162 120.723 43.9988 115.995 44ZM115.995 123.875C91.9703 123.875 44 135.767 44 159.374V186H188V159.374C188 135.767 140.03 123.875 115.995 123.875Z"
                          fill="black"
                        />
                      </g>
                    </svg>
                  </Box>
                )}
                <Grid
                  container
                  justifyContent={"center"}
                  gap={"25px"}
                  sx={{
                    position: "absolute",
                    zIndex: "9999",
                    top: "70%",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: "center",
                  }}
                >
                  <Tooltip
                    title={audio ? "Turn off microphone" : "Turn on microphone"}
                  >
                    <IconButton
                      sx={{
                        color: "black",
                        padding: "12px",
                        background: audio ? "white" : "white",
                        boxShadow: "0px 0px 0px rgba(200, 500, 500, 0.7)",
                        "&:hover": {
                          background: audio ? "white" : "white",
                        },
                      }}
                      aria-label="mic"
                      onClick={() => stopAudioOnly(stream)}
                    >
                      {audio ? (
                        <MicIcon sx={{ color: "#7b7b7b" }} />
                      ) : (
                        <MicOffIcon sx={{ color: "#7b7b7b" }} />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={video ? "Turn off video" : "Turn on video"}>
                    <IconButton
                      sx={{
                        color: "black",
                        padding: "12px",
                        background: video ? "white" : "white",
                        boxShadow: "0px 0px 0px rgba(200, 500, 500, 0.7)",
                        "&:hover": {
                          background: video ? "white" : "white",
                        },
                      }}
                      onClick={() => stopVideoOnly(stream)}
                      aria-label="video"
                    >
                      {video ? (
                        <VideocamIcon sx={{ color: "#7b7b7b" }} />
                      ) : (
                        <VideocamOffIcon sx={{ color: "#7b7b7b" }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Box>
              <Grid
                container
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {stream && (
                  <Grid
                    container
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    rowGap={0.5}
                  >
                    <Typography
                      sx={{
                        //   color: "#F8F8F8",
                        // fontFamily: "Figtree",
                        fontSize: "32px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "150%",
                        letterSpacing: "0.24px",
                      }}
                    >
                      Ready to join?
                    </Typography>
                    {/* <Typography
                      mt={2}
                      sx={{
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "150%",
                        letterSpacing: "0.24px",
                      }}
                    >
                      No one else is here
                    </Typography> */}
                    <Typography
                      mt={1}
                      sx={{
                        color: "#939393",
                        fontFamily: "Figtree",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "150%",
                        letterSpacing: "0.24px",
                      }}
                    >
                      {appointmentInfo &&
                        "Scheduled at : Today " +
                          appointmentInfo?.startTime +
                          " - " +
                          appointmentInfo?.endTime}
                    </Typography>
                  </Grid>
                )}
                <Box mt={6}>
                  <ButtonBase
                    sx={{
                      marginTop: "10px",
                      borderRadius: "8px",
                      color: "#F8F8F8",
                      fontSize: "13px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      paddingX: "20px",
                      textTransform: "capitalize",
                      fontFamily: "Roboto, sans-serif !important",
                      backgroundColor: "#3165b0",
                      height: "35px",
                      "&:hover": {
                        backgroundColor: "#2C57B3",
                      },
                    }}
                    onClick={handleJoinVideoCall}
                  >
                    Start appointment
                  </ButtonBase>
                </Box>
              </Grid>
            </>
          )}
        </Box>
      </Grid>
    </>
  );
}

export default WaitingRoom;
