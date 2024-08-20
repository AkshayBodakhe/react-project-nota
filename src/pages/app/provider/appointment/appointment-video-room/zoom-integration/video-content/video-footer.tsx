import CallEndIcon from "@mui/icons-material/CallEnd";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { Badge, Grid, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";

type VideoFooterProps = {
  isStartedVideo: boolean;
  handleCamera: () => void;
  handleAudio: () => void;
  isMuted: boolean;
  handleLeave: () => void;
  isScreenSharing: boolean;
  handleShareScreen: () => void;
  isScreenSharingDisable: boolean;
  isChatStarted: boolean;
  handleChat: () => void;
  isMinimize: boolean;
  newMessageReceived: boolean;
};

const VideoFooter = (props: VideoFooterProps) => {
  const {
    isStartedVideo,
    handleCamera,
    isMuted,
    handleAudio,
    handleLeave,
    isScreenSharing,
    handleShareScreen,
    isScreenSharingDisable,
    handleChat,
    isChatStarted,
    isMinimize,
    newMessageReceived,
  } = props;

  return (
    <Grid
      item
      sx={{
        position: "absolute",
        bottom: isMinimize ? "0.7rem" : "3.5rem",
        left: "50%",
        translate: "-50% 0",
        borderRadius: "106px",
        border: "1px solid rgba(255, 255, 255, 0.32)",
        background: "rgba(89, 87, 87, 0.10)",
        backdropFilter: "blur(13px)",
        padding: "8px 12px",
        width: "max-content",
      }}
    >
      <Tooltip
        placement={"top-start"}
        title={isStartedVideo ? "Turn off video" : "Turn on video"}
      >
        <IconButton
          sx={{
            color: isStartedVideo ? "black" : "black",
            padding: "12px",
            background: "#fff",
            mr: "10px",
            "&:hover": { background: "#fff" },
            "@media (min-width: 200px) and (max-width: 450px)": {
              width: "30px",
              height: "30px",
            },
          }}
          onClick={() => {
            handleCamera();
          }}
          aria-label="video"
        >
          {isStartedVideo ? (
            <VideocamIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          ) : (
            <VideocamOffIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        placement={"top"}
        title={!isMuted ? "Turn off microphone" : "Turn on microphone"}
      >
        <IconButton
          sx={{
            color: !isMuted ? "black" : "black",
            padding: "12px",
            mr: "10px",
            background: "#fff",
            "&:hover": { background: "#fff" },
            "@media (min-width: 200px) and (max-width: 450px)": {
              width: "30px",
              height: "30px",
            },
          }}
          aria-label="mic"
          onClick={() => {
            handleAudio();
          }}
        >
          {!isMuted ? (
            <MicIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          ) : (
            <MicOffIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        placement={"top-start"}
        title={isScreenSharing ? "Stop screen share" : "Share screen"}
      >
        <IconButton
          disabled={isScreenSharingDisable}
          sx={{
            color: isScreenSharing ? "black" : "black",
            padding: "12px",
            mr: "10px",
            background: "#fff",
            "&:hover": { background: "#fff" },
            "@media (min-width: 200px) and (max-width: 450px)": {
              width: "30px",
              height: "30px",
            },
          }}
          aria-label="mic"
          onClick={() => {
            handleShareScreen();
          }}
        >
          {isScreenSharing ? (
            <CancelPresentationIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          ) : (
            <PresentToAllIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          )}
        </IconButton>
      </Tooltip>
      {!isMinimize && (
        <Tooltip
          placement={"top-start"}
          title={
            isChatStarted
              ? "Stop chat"
              : newMessageReceived
              ? "View received message"
              : "Start chat"
          }
        >
          <IconButton
            sx={{
              color: isChatStarted ? "black" : "black",
              padding: "12px",
              mr: "10px",
              background: "#fff",
              "&:hover": { background: "#fff" },
              "@media (min-width: 200px) and (max-width: 450px)": {
                width: "30px",
                height: "30px",
              },
            }}
            aria-label="mic"
            onClick={() => {
              handleChat();
            }}
          >
            {isChatStarted ? (
              <ChatIcon
                sx={{
                  "@media (min-width: 200px) and (max-width: 450px)": {
                    fontSize: "16px",
                  },
                }}
              />
            ) : newMessageReceived ? (
              <>
                <Badge
                  badgeContent={0}
                  overlap="circular"
                  color="error"
                  sx={{
                    borderRadius: "5px",
                    color: "red",
                    border: `1px solid red`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "36px",
                    height: "36px",
                    fontSize: "100px",
                    cursor: "pointer",
                  }}
                >
                  <ContactMailIcon
                    sx={{
                      color: "red",
                      "@media (min-width: 200px) and (max-width: 450px)": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Badge>
              </>
            ) : (
              <ChatBubbleIcon
                sx={{
                  "@media (min-width: 200px) and (max-width: 450px)": {
                    fontSize: "16px",
                  },
                }}
              />
            )}
          </IconButton>
        </Tooltip>
      )}
      <Tooltip placement={"top"} title="Leave call">
        <IconButton
          sx={{
            color: "white",
            padding: "12px",

            backgroundColor: "red",
            "&:hover": { background: "red" },
            "@media (min-width: 200px) and (max-width: 450px)": {
              width: "30px",
              height: "30px",
            },
          }}
          onClick={() => handleLeave()}
          aria-label="phone"
        >
          {
            <CallEndIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          }
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default VideoFooter;
