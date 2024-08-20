import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Link,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import ZoomVideo, {
  ChatFileDownloadStatus,
  ChatFileUploadStatus,
  ChatMessage,
  FileInfo,
  Participant,
  Stream,
  VideoPlayer,
  VideoPlayerContainer,
  VideoQuality,
} from "@zoom/videosdk";
import { Howl } from "howler";
import {
  ChangeEvent,
  DOMAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classes from "../_waitRoom.module.scss";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import joindialogMp3 from "../../../../../../../assets/sounds/dialog.mp3";
import ShareScreen from "./share-screen";
import VideoFooter from "./video-footer";
import "./video.scss";
import ConfirmationDialog from "../confirmation-dialog";
import MinimizeMaximize from "../minimise-maximise";
import theme from "../../../../../../../theme";
import { useUnmount } from "../hooks/useUnmount";
import { useParticipantsChange } from "../hooks/useParticipantsChange";
import { usePrevious } from "../hooks/usePrevious";
import { ChatClient } from "../index-types";
import { useReduxSelector } from "../../../../../../../store/rootReducers";
import Loading from "../../../../../../../components/common/spinner/loading";
import StartIcon from "@mui/icons-material/Start";
import { ZoomControllerService } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests/services/ZoomControllerService";
import { formButtonStyle } from "../../../../../../../styles/common";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useEncounterControllerServiceCreateEncounter } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { EncounterRequest } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { ErrorResponseEntity } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import Loader from "../../../../../../../components/common/spinner/loader";
import moment from "moment";
import { setEncounterData } from "../../../../../../../store/features/provider-actions/provider-encounter/providerEncounter";
import { setIsMeeting } from "../../../../../../../store/features/common-actions/room-action/room-action";
import { API_BASE_URL } from "../../../../../../../interceptor/interceptor";

export type MediaStream = typeof Stream;
export const SELF_VIDEO_ID = "ZOOM_WEB_SDK_SELF_VIDEO";
export const subscriptionUrl = `${API_BASE_URL}/api/master/event/subscribe`;

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["video-player"]: DetailedHTMLProps<
        HTMLAttributes<VideoPlayer>,
        VideoPlayer
      > & {
        class?: string;
      };
      ["video-player-container"]: CustomElement<VideoPlayerContainer> & {
        class?: string;
      };
    }
  }
}

const JoinVideo = () => {
  let isAudioEnable = useReduxSelector(
    (state) => state.roomReducer.localAudio
  ) as boolean;
  let isVideoEnable = useReduxSelector(
    (state) => state.roomReducer.localVideo
  ) as boolean;

  let isVideoOn = useReduxSelector((state) => state.roomReducer.isMeeting);
  // console.log("join room==>", isVideoOn);

  // const { isPatient, isProvider } = useAuthority();
  const dispatch = useDispatch();
  const location = useLocation();
  const { appointment, signature } = location.state;
  const { uuid } = useParams();
  // const uuid = roomName;
  const zmClient = ZoomVideo.createClient();
  const [chatClient, setChatClient] = useState<ChatClient>();
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isStartedVideo, setIsStartedVideo] = useState(isVideoEnable);
  const [isStartedAudio, setIsStartedAudio] = useState(isAudioEnable);
  const [participantToShowInMinimize, setParticipantToShowInMinimize] =
    useState<Participant>();
  const [participants, setParticipants] = useState(zmClient.getAllUser());
  const [currentUser, setCurrentUser] = useState(zmClient.getCurrentUserInfo());
  const [openConsentDialog, setOpenConsentDialog] = useState(false);
  const [openUserAdmitDenyDialog, setOpenUserAdmitDenyDialog] = useState(false);
  const [incomingUserName, setIncomingUserName] = useState<string[]>([]);
  const [isLoadingVal, setIsLoadingVal] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isShareScreenForParticipants, setIsShareScreenForParticipants] =
    useState(false);
  const [, setIsLandscape] = useState<boolean>(
    window.innerWidth > window.innerHeight
  );
  const [sharedScreenUserId, setSharedScreenUserId] = useState<number>();
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>();
  const [typedMessage, setTypedMessage] = useState("");
  const [fileChatId, setFileChatId] = useState<string>();
  const [fileInfo, setFileInfo] = useState<FileInfo>();
  const [isFileSentOrDownloaded, setIsFileSentOrDownloaded] = useState("");
  const [isFileSizeMoreThan50MB, setIsFileSizeMoreThan50MB] = useState(false);
  const [progressOfFileUpload, setProgressOfFileUpload] = useState(0);
  const [doneEncounter, setDoneEncounter] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const belowLg1 = useMediaQuery(theme.breakpoints.down("lg"));
  const belowMd = useMediaQuery(theme.breakpoints.down("md"));

  const joindialogSound = new Howl({
    src: [joindialogMp3],
  });

  const playDialogJoinSound = () => {
    joindialogSound.play();
  };

  const [isMuted, setIsMute] = useState(!isAudioEnable);
  const [_isMicrophoneForbidden, setIsMicrophoneForbidden] = useState(false);
  const [subscribers, setSubscribers] = useState<number[]>([]);

  const videoPlayerListRef = useRef<Record<string, VideoPlayer>>({});
  const previousSubscribers = usePrevious(subscribers);

  useEffect(() => {
    if (!appointment) return;

    // AppointmentControllerService.addAppointmentForMeeting({
    //   appointmentUuid: appointment.uuid,
    //   status: true,
    // });
  }, []);

  useEffect(() => {
    if (zmClient.getCurrentUserInfo()) {
      setCurrentUser(zmClient.getCurrentUserInfo());
    }
  }, [participants, isMinimize]);

  useParticipantsChange(zmClient, (participants) => {
    let pageParticipants: Participant[] = [];
    if (participants?.length > 0) {
      if (participants?.length === 1) {
        pageParticipants = participants;
      } else {
        pageParticipants = participants
          .filter((user) => user.userId !== zmClient.getSessionInfo().userId)
          .sort(
            (user1, user2) => Number(user2.bVideoOn) - Number(user1.bVideoOn)
          );
        const currentUser = zmClient.getCurrentUserInfo();
        if (currentUser) {
          pageParticipants.splice(1, 0, currentUser);
        }
      }
    }
    setParticipants(pageParticipants);
    setSubscribers(
      pageParticipants.filter((user) => user.bVideoOn).map((u) => u.userId)
    );
  });

  const setVideoPlayerRef = (userId: number, element: VideoPlayer) => {
    if (element) {
      videoPlayerListRef.current[`${userId}`] = element;
    }
  };

  useEffect(() => {
    const addedUsers = subscribers.filter(
      (user) => !(previousSubscribers || []).includes(user)
    );
    const removedUsers = (previousSubscribers || []).filter(
      (user: any) => !subscribers.includes(user)
    );
    if (removedUsers?.length > 0) {
      removedUsers.forEach((userId: number) => {
        mediaStream?.detachVideo(userId);
      });
    }
    if (addedUsers?.length > 0) {
      addedUsers.forEach((userId) => {
        const attachment = videoPlayerListRef.current[`${userId}`];
        if (attachment) {
          mediaStream?.attachVideo(userId, VideoQuality.Video_360P, attachment);
        }
      });
    }
  }, [subscribers, previousSubscribers]);

  ///Init and join API : Start session and join session API
  useEffect(() => {
    /**preloadDependentAssets will make calling the join function must faster when the user joins the session, as the WebAssembly dependencies will already be ready. */
    ZoomVideo.preloadDependentAssets();

    if (!uuid || !signature) {
      return;
    }

    const init = async () => {
      setIsLoadingVal(true);
      try {
        await zmClient.init("en-US", "Global", {
          webEndpoint: "zoom.us",
          stayAwake: true,
          patchJsMedia: true,
          leaveOnPageUnload: false,
          // enforceVirtualBackground: true
        });

        await zmClient.join(uuid, signature, "P", "").catch((_e) => {});

        const stream = zmClient.getMediaStream();
        setChatClient(zmClient.getChatClient());

        if (document.querySelector("video-player-container")) {
          zmClient.getAllUser().forEach(async (user) => {
            if (user.bVideoOn) {
              const userVideo = (await stream.attachVideo(
                user.userId,
                VideoQuality.Video_720P
              )) as VideoPlayer;

              document
                .querySelector("video-player-container")
                ?.appendChild(userVideo);
            }
            if (user.sharerOn) {
              await stream.startShareView(
                document.querySelector(
                  "#participants-screen-share-content-canvas"
                ) as HTMLCanvasElement,
                user.userId
              );
              setIsShareScreenForParticipants(true);
            }
          });
        }
        setMediaStream(stream);
      } catch {
      } finally {
        setIsLoadingVal(false);
      }
    };

    init();
    return () => {
      ZoomVideo.destroyClient();
    };
  }, [zmClient, signature, appointment]);

  useEffect(() => {
    if (zmClient.getCurrentUserInfo()) {
      setCurrentUser(zmClient.getCurrentUserInfo());
    }
  }, [participants]);

  //Handle on or off camera action
  const handleCamera = async () => {
    if (!mediaStream) {
      return;
    }

    if (isStartedVideo && mediaStream) {
      await mediaStream?.stopVideo();
      setIsStartedVideo(false);
    } else {
      const startVideoOptions = {
        hd: true,
        fullHd: true,
        ptz: mediaStream?.isBrowserSupportPTZ(),
        originalRatio: true,
      };

      if (mediaStream?.isSupportVirtualBackground()) {
        Object.assign(startVideoOptions, {
          virtualBackground: { imageUrl: "blur" },
        });
      }

      await mediaStream?.startVideo(startVideoOptions);

      setIsStartedVideo(true);
    }
  };

  useEffect(() => {
    if (currentUser && mediaStream) {
      /**If user has switched on camera/audio in waiting room , it should switched on camera in joining room too*/

      /**Switch on/off camera */
      if (currentUser.bVideoOn !== isStartedVideo && mediaStream) {
        if (isStartedVideo) {
          const startVideoOptions = {
            hd: true,
            fullHd: true,
            ptz: mediaStream?.isBrowserSupportPTZ(),
            originalRatio: true,
          };

          if (mediaStream?.isSupportVirtualBackground()) {
            Object.assign(startVideoOptions, {
              virtualBackground: { imageUrl: "blur" },
            });
          }

          mediaStream?.startVideo(startVideoOptions);
        } else {
          mediaStream?.stopVideo();
        }
      }

      /**Switch on/off audio */
      if (!!currentUser.audio !== isStartedAudio && mediaStream) {
        if (isStartedAudio) {
          try {
            mediaStream?.startAudio();
            mediaStream?.unmuteAudio();
          } catch (e: any) {
            if (
              e.type === "INSUFFICIENT_PRIVILEGES" &&
              e.reason === "USER_FORBIDDEN_MICROPHONE"
            ) {
              setIsMicrophoneForbidden(true);
            }
            console.warn(e);
          }
        } else {
          if (!isMuted) {
            mediaStream?.unmuteAudio();
          } else {
            mediaStream?.muteAudio();
          }
        }
      }
    }
  }, [currentUser, mediaStream, isMinimize]);

  const handleAudio = async () => {
    if (isStartedAudio) {
      if (isMuted) {
        await mediaStream?.unmuteAudio();
        setIsMute(false);
      } else {
        await mediaStream?.muteAudio();
        setIsMute(true);
      }
    } else {
      try {
        await mediaStream?.startAudio();
        await mediaStream?.unmuteAudio();
        setIsMute(false);
      } catch (e: any) {
        if (
          e.type === "INSUFFICIENT_PRIVILEGES" &&
          e.reason === "USER_FORBIDDEN_MICROPHONE"
        ) {
          setIsMicrophoneForbidden(true);
        }
        console.warn(e);
      }
      setIsStartedAudio(true);
    }
  };

  zmClient.on("user-removed", (payload) => {
    const removedUserName = payload[0].userIdentity || "Participant";

    // dispatch(
    //     isSnackbarOpen: true,
    //     severity: AlertSeverity.INFO,
    //     message: `${removedUserName} has left the call.`
    // );
  });

  const handleScreenShare = async () => {
    if (!mediaStream) {
      return;
    }
    if (isScreenSharing) {
      setIsScreenSharing(false);
    } else {
      setIsScreenSharing(true);
    }
  };

  useEffect(() => {
    if (!mediaStream) {
      return;
    }

    if (isScreenSharing) {
      if (!document.querySelector("#my-screen-share-content-video")) return;

      mediaStream
        .startShareScreen(
          document.querySelector(
            "#my-screen-share-content-video"
          ) as HTMLVideoElement
        )
        .then()
        .catch(() => {
          // "User denied to screen share/ he clicks on cancel button  in the chrome screen sharing popup"
          if (isScreenSharing) {
            setIsScreenSharing(false);
          } else {
            setIsScreenSharing(true);
          }
        });
    } else {
      mediaStream.stopShareScreen();
      setIsShareScreenForParticipants(false);
    }
  }, [isScreenSharing, isMinimize]);

  useEffect(() => {
    function handleResize() {
      const newIsLandscape = window.innerWidth > window.innerHeight;
      setIsLandscape(newIsLandscape);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const addedUsers = subscribers.filter(
      (user) => !(previousSubscribers || []).includes(user)
    );
    const removedUsers = (previousSubscribers || []).filter(
      (user) => !subscribers.includes(user)
    );
    if (removedUsers?.length > 0) {
      removedUsers.forEach((userId) => {
        mediaStream?.detachVideo(userId);
      });
    }
    if (addedUsers?.length > 0) {
      addedUsers.forEach((userId) => {
        const attachment = videoPlayerListRef.current[`${userId}`];
        if (attachment) {
          mediaStream?.attachVideo(userId, VideoQuality.Video_360P, attachment);
        }
      });
    }
  }, [subscribers, previousSubscribers, isMinimize]);

  zmClient.on("active-share-change", async (payload) => {
    setSharedScreenUserId(payload.userId);

    if (payload.state === "Active") {
      setIsShareScreenForParticipants(true);
    } else if (payload.state === "Inactive") {
      setIsShareScreenForParticipants(false);
    }
  });

  useEffect(() => {
    if (isShareScreenForParticipants && sharedScreenUserId) {
      mediaStream?.startShareView(
        document.querySelector(
          "#participants-screen-share-content-canvas"
        ) as HTMLCanvasElement,
        sharedScreenUserId
      );
    } else if (!isShareScreenForParticipants) {
      mediaStream?.stopShareView();
    }
  }, [isShareScreenForParticipants, isMinimize]);

  zmClient.on("passively-stop-share", (payload) => {
    payload;
    if (isShareScreenForParticipants || isScreenSharing) {
      mediaStream?.stopShareScreen();
      setIsScreenSharing(false);
      setIsShareScreenForParticipants(false);
    }
  });

  const handleLeave = async () => {
    await zmClient.leave();
    handleCloseIframe();
  };

  const handleCloseIframe = async () => {
    setIsLoadingVal(true);
    if (appointment) {
      const someDiv = document.getElementById("iFrame");
      if (someDiv) {
        someDiv.style.display = "none";
        const uRl = `/`;
        someDiv.setAttribute("src", uRl);
        dispatch(setIsMeeting(false));
      }
      if (isMinimize) {
        maximizeCall();
      }
      const frame = window.parent.document.getElementById("iFrame");
      const draggable = window.parent.document.getElementById("parent");
      if (frame && draggable) {
        const uRl = ``;
        frame.setAttribute("src", uRl);
        frame.setAttribute("data", uRl);
        frame.style.display = "none";
        draggable.style.display = "none";
        dispatch(setIsMeeting(false));
      }
    }
  };

  const isCurrentUser = (userId: number) => {
    if (!userId) return false;
    return participants?.length !== 1 && userId === currentUser?.userId;
  };

  const handleChat = () => {
    setIsChatStarted((prev) => !prev);
    setNewMessageReceived(false);
  };

  const handleSendMessage = async () => {
    if (!typedMessage) {
      return;
    }

    await chatClient?.sendToAll(typedMessage);
    setTypedMessage("");
  };

  const handleAttachFile = () => {
    document.getElementById("fileInput")?.click();
  };

  zmClient.on("chat-on-message", (payload) => {
    const messages = chatClient?.getHistory();
    const messageClone = structuredClone(messages);
    const ids = messageClone?.map((message: any) => {
      return message.id;
    });

    if (!isChatStarted) {
      setNewMessageReceived(true);
    }

    if ((!ids?.includes(payload.id) || messages?.length === 0) && payload) {
      messageClone?.push(payload);
    }

    setChatHistory(messageClone);

    if (
      payload.file &&
      payload?.id &&
      payload?.sender?.userId !== currentUser?.userId
    ) {
      setFileInfo(payload.file || "");
      setFileChatId(payload.id);
    }
  });

  const handleInputFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsFileSizeMoreThan50MB(false);

    const file = (event.target.files && event.target.files[0]) || null;

    if (file?.size && file.size > 52428800) {
      setIsFileSizeMoreThan50MB(true);
      return;
    }

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSendSelectedFile = async () => {
    if (!selectedFile) {
      return;
    }
    await chatClient?.sendFile(selectedFile, 0);
    setSelectedFile(null);
    setTypedMessage("");
  };

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
    setTypedMessage("");
  };

  zmClient.on("chat-file-upload-progress", (payload) => {
    const { status, progress, fileName } = payload;
    setProgressOfFileUpload(progress);

    if (status === ChatFileUploadStatus.InProgress) {
      if (fileName && progress) {
        setIsFileSentOrDownloaded(`${fileName} upload is in progress.`);
      }
    } else if (status === ChatFileUploadStatus.Fail) {
      setIsFileSentOrDownloaded("Send file failed.");
    } else if (status === ChatFileUploadStatus.Cancel) {
      if (fileName) {
        setIsFileSentOrDownloaded("");
      }
    } else if (status === ChatFileUploadStatus.Success) {
      if (fileName) {
        setIsFileSentOrDownloaded("");
      }
    }
  });

  zmClient.on("chat-file-download-progress", (payload) => {
    const { fileName, progress, status } = payload;
    setProgressOfFileUpload(progress);
    if (status === ChatFileDownloadStatus.InProgress) {
      setIsFileSentOrDownloaded(fileName);
    } else if (status === ChatFileDownloadStatus.Fail) {
      setIsFileSentOrDownloaded("");
    } else if (status === ChatFileDownloadStatus.Cancel) {
      setIsFileSentOrDownloaded("");
    } else if (status === ChatFileDownloadStatus.Success) {
      setIsFileSentOrDownloaded("");
    }
  });

  const handleDownloadFile = () => {
    if (fileChatId && fileInfo?.fileUrl) {
      chatClient?.downloadFile(fileChatId, fileInfo.fileUrl);
    }
  };

  useEffect(() => {
    if (!isMinimize) return;

    const parent = window.parent.document.getElementById("parent");
    if (!parent) return;

    parent.style.height = "19rem";
    // parent.style.height = video ? "22rem" : "19rem";

    if (participants?.length > 0 && currentUser) {
      participants?.length === 1
        ? setParticipantToShowInMinimize(participants[0])
        : setParticipantToShowInMinimize(
            participants.find((user) => user.userId !== currentUser.userId)
          );
    }
  }, [isMinimize, participants]);

  const minimizeCall = () => {
    const parent = window.parent.document.getElementById("parent");
    const dragIcon = window.parent.document.getElementById("dragIcon");
    if (parent && dragIcon) {
      parent.style.display = "block";
      parent.style.width = "20rem";
      parent.style.height = "30%";
      parent.style.zIndex = "1000000";
      parent.style.position = "fixed";
      parent.style.bottom = "40%";
      parent.style.right = "3%";
      parent.style.transform = `translate(1rem, ${window.innerHeight - 320}px)`;
      dragIcon.style.display = "block";
      dragIcon.style.position = "absolute";
      dragIcon.style.top = "5px";
      dragIcon.style.left = "1px";
      dragIcon.style.zIndex = "1000000000000000";
      dragIcon.style.fontSize = "32px";
      setIsMinimize(true);
    }
  };

  const maximizeCall = () => {
    const parent = window.parent.document.getElementById("parent");
    const dragIcon = window.parent.document.getElementById("dragIcon");
    if (parent && dragIcon) {
      dragIcon.style.display = "none";
      parent.style.display = "block";
      parent.style.width = "100%";
      parent.style.zIndex = "1000000";
      parent.style.height = window.parent.location.pathname.includes("invite")
        ? "100vh"
        : "100%";
      parent.style.position = window.parent.location.pathname.includes("invite")
        ? "fixed"
        : "absolute";
      parent.style.border = "none";
      parent.style.bottom = "0";
      parent.style.right = "0";
      parent.style.transform = "translate(0px, 0px)";
      setIsMinimize(false);
    }
  };

  useUnmount(() => {
    if (isStartedAudio) {
      mediaStream?.stopAudio();
    }
    if (isStartedVideo) {
      mediaStream?.stopVideo();
    }
    mediaStream?.stopShareScreen();
  });

  useEffect(() => {
    if (!appointment) {
      return;
    }

    const handleUserAdmitDenyEvent = () => {
      const eventSource = new EventSource(
        `${subscriptionUrl}/${appointment?.apointmentUuid}_REQUEST`
      );

      eventSource.onmessage = async (event) => {
        if (!JSON.parse(event.data).response) {
          // handleUserAdmitDenyEvent();
          setOpenUserAdmitDenyDialog(true);
          playDialogJoinSound();
          setIncomingUserName((prev) => [
            ...prev,
            JSON.parse(event.data).patientName,
          ]);
        }
      };

      eventSource.onerror = (event) => {
        event;
        handleUserAdmitDenyEvent();
      };

      return () => eventSource.close(); // Close the event source when the component unmounts
    };

    // Call the function to initiate the event source
    handleUserAdmitDenyEvent();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      zmClient.leave();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  /**When the page is refreshed, the iframe closes, but the meeting continues. Therefore, before unloading the page, we programmatically exit the meeting to ensure it ends appropriately. */
  useEffect(() => {
    window.onbeforeunload = function () {
      zmClient.leave();
      if (isMinimize) {
        maximizeCall();
      }
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const getUserName = (userId: number) => {
    if (!userId) {
      return;
    }

    let name = "";
    participants.map((user) => {
      if (userId === user.userId) {
        if (!user.userIdentity) {
          return;
        }
        name = user.userIdentity;
      }
    });
    return name;
  };

  const getTimeOfMessageSent = (timestamp: number) => {
    if (!timestamp) {
      return;
    }
    var date = new Date(timestamp);

    var hours = date.getHours();
    var min = date.getMinutes();

    return hours && min ? `${hours}:${min}` : "";
  };

  // const {
  //   mutateAsync: callCheckIn,
  //   isError,
  //   error,
  // } = useEncounterControllerServiceCreateEncounter();

  const handleStartEncounter = async () => {
    minimizeCall();
    // const currDate = new Date();
    // const requestBody = {
    //   appointmentId: appointment.appointmentId,
    //   status: EncounterRequest.status.CHECK_IN,
    //   serviceDate: currDate as any,
    //   note: "",
    // };
    // await callCheckIn({ requestBody: requestBody }).then((res: any) => {
    //   console.log("");
    //   dispatch(setEncounterData(res?.data));
    //   setDoneEncounter(true);
    // });
  };

  // useEffect(() => {
  //   if ((error as ErrorResponseEntity)?.body.message)
  //     dispatch(
  //       alertAction.setAlert({
  //         open: true,
  //         message: (error as ErrorResponseEntity).body.message,
  //         severity: "error",
  //       })
  //     );
  // }, [isError]);

  return (
    <>
      {!currentUser ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader isLoading={true} />
        </Box>
      ) : (
        <Box bgcolor={"#fff"} mt={isMinimize ? 0 : 2} sx={{ height: "100vh" }}>
          {!isMinimize && (
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
              py={1}
              px={2}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: "18px", color: "#000" }}>
                  {appointment &&
                    appointment?.patient?.user?.firstName +
                      " " +
                      appointment?.patient?.user?.lastName +
                      " Appointment With " +
                      appointment?.provider?.firstName +
                      " " +
                      appointment?.provider?.lastName}
                </Typography>
                <Typography sx={{ fontSize: "16px" }}>
                  {appointment &&
                    moment(appointment?.appointmentDate).format("MM-DD-yyyy") +
                      " At " +
                      appointment?.startTime}
                </Typography>
              </Box>
              <Box>
                <ButtonBase
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    ...formButtonStyle.saveButtonStyle,
                  }}
                  onClick={handleStartEncounter}
                >
                  <StartIcon sx={{ color: "white" }} />
                  <Typography sx={{ color: "white" }}>
                    {"Start Encounter"}
                  </Typography>
                </ButtonBase>
              </Box>
            </Grid>
          )}
          <Grid
            display={"flex"}
            id="outer-cont"
            flexDirection={
              isScreenSharing || isShareScreenForParticipants || isChatStarted
                ? "row"
                : "column"
            }
            overflow={"hidden"}
            flexWrap={"nowrap"}
            justifyContent={"center"}
            style={{
              // transition: "2s",
              background: theme.palette.grey[900],
              height: isMinimize ? "100vh" : "89vh",
              borderRadius: isMinimize ? 0 : "15px",
              width: isMinimize ? "100%" : "99%",
              margin: "0 auto",
              boxShadow: "0px 0px 7px rgba(50, 50, 50, 0.6)",
            }}
          >
            <ShareScreen
              isChatStarted={isChatStarted}
              isMinimize={isMinimize}
              isScreenSharing={isScreenSharing}
              isShareScreenForParticipants={isShareScreenForParticipants}
            />
            <Grid
              item
              container
              id="inner-cont"
              flex={1}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {/* <video-player-container
                className={classes.custom}
                style={{ width: "100%", height: "100%" } as any}
              >
                <div
                  className="user-list"
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection:
                      isScreenSharing || isShareScreenForParticipants
                        ? "column"
                        : "row",
                  }}
                >
                  {participants.length > 0 &&
                    participants.map((user) => (
                      <div
                        className="video-cell"
                        key={user.userId}
                        style={{
                          height:
                            isScreenSharing || isShareScreenForParticipants
                              ? "100%"
                              : isCurrentUser(user?.userId)
                              ? "fit-content"
                              : "100%",
                          width:
                            isScreenSharing || isShareScreenForParticipants
                              ? "100%"
                              : isCurrentUser(user?.userId)
                              ? "20%"
                              : "100%",
                          position:
                            isScreenSharing || isShareScreenForParticipants
                              ? "relative"
                              : isCurrentUser(user?.userId)
                              ? "absolute"
                              : "relative",
                          bottom:
                            isScreenSharing || isShareScreenForParticipants
                              ? "0rem"
                              : isCurrentUser(user?.userId)
                              ? "1rem"
                              : "0rem",
                          right:
                            isScreenSharing || isShareScreenForParticipants
                              ? "0rem"
                              : isCurrentUser(user?.userId)
                              ? "1rem"
                              : "0rem",
                          padding: "10px",
                          zIndex:
                            isScreenSharing || isShareScreenForParticipants
                              ? 0
                              : isCurrentUser(user.userId)
                              ? 1
                              : 0,
                        }}
                      >
                        {user.bVideoOn && (
                          <div
                            style={{
                              height:
                                isScreenSharing || isShareScreenForParticipants
                                  ? "100%"
                                  : isCurrentUser(user?.userId)
                                  ? "fit-content"
                                  : "100%",
                              width: "100%",
                            }}
                          >
                            <video-player
                              class="video-player"
                              style={{ height: "100%" } as any}
                              ref={(element) => {
                                if (element) {
                                  setVideoPlayerRef(user.userId, element);
                                }
                              }}
                            />
                          </div>
                        )}
                        {!user.bVideoOn && (
                          <Grid
                            style={{
                              height:
                                isScreenSharing || isShareScreenForParticipants
                                  ? "100%"
                                  : isCurrentUser(user?.userId)
                                  ? "20vh"
                                  : "100%",
                              width: "100%",
                              border: isCurrentUser(user?.userId)
                                ? `2px solid ${theme.palette.grey[500]}`
                                : "none",
                              borderRadius: isCurrentUser(user.userId)
                                ? "16px"
                                : "0px",
                              background: theme.palette.grey[900],
                            }}
                            container
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Typography
                              variant="h2"
                              fontWeight={"500"}
                              sx={{
                                background: theme.palette.grey[300],
                                width: "3rem",
                                height: "3rem",
                                borderRadius: "100%",
                                padding: "5px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: theme.palette.primary.main,
                              }}
                            >
                              {user?.userIdentity &&
                              user?.userIdentity?.length > 0
                                ? user?.userIdentity[0].toUpperCase()
                                : "-"}
                            </Typography>
                          </Grid>
                        )}
                      </div>
                    ))}
                </div>
              </video-player-container> */}
              <video-player-container
                style={{ width: "100%", height: "100%" } as any}
              >
                <div
                  className="user-list"
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection:
                      isScreenSharing || isShareScreenForParticipants
                        ? "column"
                        : "row",
                  }}
                >
                  {participants.length > 0 &&
                    participants.map((user) => (
                      <div
                        className="video-cell"
                        key={user.userId}
                        style={{
                          height:
                            isScreenSharing || isShareScreenForParticipants
                              ? "100%"
                              : isCurrentUser(user?.userId)
                              ? "fit-content"
                              : "100%",
                          width:
                            isScreenSharing || isShareScreenForParticipants
                              ? "100%"
                              : isCurrentUser(user?.userId)
                              ? "20%"
                              : "100%",
                          position:
                            isScreenSharing || isShareScreenForParticipants
                              ? "relative"
                              : isCurrentUser(user?.userId)
                              ? "absolute"
                              : "relative",
                          bottom:
                            isScreenSharing || isShareScreenForParticipants
                              ? "0rem"
                              : isCurrentUser(user?.userId)
                              ? "1rem"
                              : "0rem",
                          right:
                            isScreenSharing || isShareScreenForParticipants
                              ? "0rem"
                              : isCurrentUser(user?.userId)
                              ? "1rem"
                              : "0rem",
                          padding: "10px",
                          zIndex:
                            isScreenSharing || isShareScreenForParticipants
                              ? 0
                              : isCurrentUser(user.userId)
                              ? 1
                              : 0,
                        }}
                      >
                        {user.bVideoOn && (
                          <div
                            style={{
                              height:
                                isScreenSharing || isShareScreenForParticipants
                                  ? "100%"
                                  : isCurrentUser(user?.userId)
                                  ? "fit-content"
                                  : "100%",
                              width: "100%",
                            }}
                          >
                            <video-player
                              class="video-player"
                              style={{ height: "100%" } as any}
                              ref={(element) => {
                                if (element) {
                                  setVideoPlayerRef(user.userId, element);
                                }
                              }}
                            />
                          </div>
                        )}
                        {!user.bVideoOn && (
                          <Grid
                            style={{
                              height:
                                isScreenSharing || isShareScreenForParticipants
                                  ? "100%"
                                  : isCurrentUser(user?.userId)
                                  ? "20vh"
                                  : "100%",
                              width: "100%",
                              border: isCurrentUser(user?.userId)
                                ? `2px solid white`
                                : "none",
                              borderRadius: isCurrentUser(user.userId)
                                ? "16px"
                                : "0px",
                              background: "gray",
                            }}
                            container
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Typography
                              variant="h3"
                              fontWeight={"500"}
                              sx={{
                                background: "#af6b6b",
                                width: !isMinimize ? "5rem" : "3rem",
                                height: !isMinimize ? "5rem" : "3rem",
                                borderRadius: "100%",
                                padding: "5px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: !isMinimize ? "25px" : "inherit",
                              }}
                            >
                              {user?.userIdentity &&
                              user?.userIdentity?.length > 0
                                ? user?.userIdentity[0].toUpperCase()
                                : "-"}
                            </Typography>
                          </Grid>
                        )}
                      </div>
                    ))}
                </div>
              </video-player-container>
            </Grid>
            {isChatStarted && !isMinimize && (
              <Grid
                width={"20%"}
                height={"100%"}
                bgcolor={theme.palette.common.white}
                sx={{ transition: "", borderRadius: "16px" }}
              >
                <Grid container flexDirection={"column"} item height={"100%"}>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    mt={4.5}
                    p={1.5}
                    alignItems={"center"}
                  >
                    <Grid item>
                      <Typography sx={{ fontSize: "18px", color: "#000" }}>
                        {"In-call messages"}
                      </Typography>
                    </Grid>
                    <Grid>
                      <IconButton onClick={() => handleChat()}>
                        <CloseOutlinedIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid
                    bgcolor={theme.palette.grey[200]}
                    p={1.5}
                    m={1}
                    borderRadius={"16px"}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontFamily: "cursive",
                        color: "#000",
                      }}
                    >
                      {
                        "Messages can only be seen by people in the call when the message is sent. All messages are deleted when the call ends."
                      }
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    justifyContent={"flex-end"}
                    flexDirection={"column"}
                    flex={1}
                    flexWrap={"nowrap"}
                    height={"100%"}
                    mb={1}
                    p={1}
                  >
                    <Grid
                      item
                      maxHeight={
                        belowMd
                          ? window.innerHeight * 0.34
                          : belowLg1
                          ? window.innerHeight * 0.45
                          : window.innerHeight * 0.65
                      }
                      overflow={"auto"}
                      container
                      flexWrap={"nowrap"}
                      rowGap={3}
                      p={1}
                      flexDirection={"column"}
                    >
                      {chatHistory?.map((messages, index) => (
                        <Grid key={index} item width={"80%"} maxWidth={"80%"}>
                          <Grid container flexDirection={"column"}>
                            <Grid container columnGap={2}>
                              <Typography
                                sx={{ fontSize: "1.2rem" }}
                                fontWeight={600}
                              >
                                {currentUser.userId === messages.sender.userId
                                  ? "You"
                                  : getUserName(messages.sender.userId)}
                              </Typography>
                              <Typography
                                sx={{ fontSize: "1.2rem", color: "#000" }}
                                color={theme.palette.grey[800]}
                              >
                                {getTimeOfMessageSent(messages.timestamp)}
                              </Typography>
                            </Grid>
                            {currentUser.userId === messages.sender.userId &&
                            messages?.file?.fileUrl ? (
                              <Link
                                style={{
                                  cursor: "pointer",
                                  color: theme.palette.common.black,
                                }}
                                onClick={() =>
                                  messages.id &&
                                  messages.file?.fileUrl &&
                                  chatClient?.downloadFile(
                                    messages.id,
                                    messages.file?.fileUrl
                                  )
                                }
                              >
                                <Tooltip title="Click to download the file.">
                                  <Typography sx={{ fontSize: "1rem" }}>
                                    {`Sent "${messages.file.name}".`}
                                  </Typography>
                                </Tooltip>
                              </Link>
                            ) : currentUser.userId !== messages.sender.userId &&
                              messages.file?.fileUrl ? (
                              <Link
                                style={{
                                  cursor: "pointer",
                                  color: theme.palette.common.black,
                                }}
                                onClick={() =>
                                  messages.id &&
                                  messages.file?.fileUrl &&
                                  chatClient?.downloadFile(
                                    messages.id,
                                    messages.file?.fileUrl
                                  )
                                }
                              >
                                <Tooltip title="Click to download the file.">
                                  <Typography sx={{ fontSize: "1rem" }}>
                                    {`Received "${messages.file.name}".`}
                                  </Typography>
                                </Tooltip>
                              </Link>
                            ) : (
                              messages.message
                            )}{" "}
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid item justifyContent={"flex-end"} width={"100%"}>
                      {isFileSentOrDownloaded && (
                        <Box width={"100%"} p={1}>
                          <LinearProgress
                            variant="determinate"
                            value={progressOfFileUpload}
                            color={"primary"}
                          />
                        </Box>
                      )}
                      {isFileSizeMoreThan50MB && (
                        <Alert
                          severity="error"
                          onClose={() => setIsFileSizeMoreThan50MB(false)}
                        >
                          Please upload a file that is under 50 megabytes in
                          size.
                        </Alert>
                      )}
                      <input
                        type="file"
                        id="fileInput"
                        onChange={handleInputFile}
                        style={{ display: "none" }}
                      />
                      <InputBase
                        fullWidth
                        value={selectedFile ? selectedFile.name : typedMessage}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                            return;
                          }
                        }}
                        placeholder="Send a message / file"
                        onChange={(e) => setTypedMessage(e.target.value)}
                        sx={{
                          height: "50px",
                          padding: "10px",
                          borderRadius: "16px",
                          background: theme.palette.grey[200],
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            {selectedFile && (
                              <Tooltip title="Remove selected file">
                                <IconButton
                                  onClick={() => handleRemoveSelectedFile()}
                                >
                                  {<ClearIcon />}
                                </IconButton>
                              </Tooltip>
                            )}
                            {fileInfo && (
                              <Tooltip title={"Download latest file."}>
                                <IconButton
                                  onClick={() => handleDownloadFile()}
                                >
                                  {<DownloadIcon />}
                                </IconButton>
                              </Tooltip>
                            )}

                            <IconButton onClick={() => handleAttachFile()}>
                              {<AttachFileIcon />}
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                selectedFile
                                  ? handleSendSelectedFile()
                                  : handleSendMessage()
                              }
                            >
                              {<SendIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                      ></InputBase>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <MinimizeMaximize
              maximizeCall={maximizeCall}
              minimizeCall={minimizeCall}
              isMinimize={isMinimize}
            />
            <VideoFooter
              isStartedVideo={isStartedVideo}
              handleCamera={handleCamera}
              handleAudio={handleAudio}
              handleLeave={() => setOpenConsentDialog(true)}
              isMuted={isMuted}
              handleShareScreen={handleScreenShare}
              isScreenSharing={isScreenSharing}
              isScreenSharingDisable={isShareScreenForParticipants}
              isChatStarted={isChatStarted}
              handleChat={handleChat}
              isMinimize={isMinimize}
              newMessageReceived={newMessageReceived}
            />
            <ConfirmationDialog
              onClose={() => setOpenConsentDialog(false)}
              open={openConsentDialog}
              handleConfirm={() => handleLeave()}
              message={
                false
                  ? "Are you sure you wish to conclude this call?"
                  : "Are you certain you want to end this encounter?"
              }
            />

            {/* Dialog to show admit/deny user */}
            <Box>
              <Dialog
                open={openUserAdmitDenyDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                BackdropProps={{
                  style: {
                    backgroundColor: "transparent",
                  },
                }}
                sx={{
                  "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
                    background: "#0000002b",
                    border: "1px solid #e6e6e6",
                    marginTop: !isMinimize ? "38%" : "",
                    marginLeft: !isMinimize ? "77%" : "",
                    backdropFilter: "blur(1px)",
                    width: "250px",
                  },
                  "& .css-uhb5lp": {
                    background: "#0000002b",
                    border: "1px solid #e6e6e6",
                    marginTop: !isMinimize ? "38%" : "",
                    marginLeft: !isMinimize ? "77%" : "",
                    backdropFilter: "blur(1px)",
                    width: "250px",
                  },
                }}
              >
                {/* <DialogTitle id="alert-dialog-title">Incoming user</DialogTitle> */}
                <Divider />
                {incomingUserName?.map((resp, index) => (
                  <Box key={index}>
                    <DialogContent>
                      <DialogContentText
                        id="alert-dialog-description"
                        sx={{ color: "#fff", fontWeight: "600" }}
                      >
                        {resp} is in waiting Room.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <ButtonBase
                        onClick={() => {
                          ZoomControllerService.emit(
                            `${appointment.apointmentUuid}_DENY`
                          );
                          const newArray = incomingUserName.filter(
                            (item) => item !== resp
                          );
                          setIncomingUserName(newArray);
                          setOpenUserAdmitDenyDialog(false);
                        }}
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          color: "#fff",
                          padding: "8px 12px",
                          "&:hover": {
                            background: "#FFF",
                            borderRadius: "5px",
                            color: "#E72929",
                          },
                        }}
                      >
                        Deny
                      </ButtonBase>
                      <ButtonBase
                        onClick={() => {
                          ZoomControllerService.emit(
                            `${appointment.apointmentUuid}_ACCEPT`
                          );
                          const newArray = incomingUserName.filter(
                            (item) => item !== resp
                          );
                          setIncomingUserName(newArray);
                          setOpenUserAdmitDenyDialog(false);
                        }}
                        autoFocus
                        sx={{
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          padding: "8px 12px",
                          color: "#fff",
                          "&:hover": {
                            background: "#FFF",
                            borderRadius: "5px",
                            color: "#40A578",
                          },
                        }}
                      >
                        Admit
                      </ButtonBase>
                    </DialogActions>
                    <Divider />
                  </Box>
                ))}
              </Dialog>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default JoinVideo;
