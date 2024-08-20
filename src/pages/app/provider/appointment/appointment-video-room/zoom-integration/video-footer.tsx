import CallEndIcon from "@mui/icons-material/CallEnd";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ChatIcon from "@mui/icons-material/Chat";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { Grid, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import theme from "../../../../../../theme";

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

  const belowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      item
      sx={{
        position: "absolute",
        bottom: "2rem",
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
      <Tooltip title={isStartedVideo ? "Turn off video" : "Turn on video"}>
        <IconButton
          sx={{
            color: isStartedVideo ? "black" : "white",
            padding: "12px",
            background: isStartedVideo ? "white" : "red",
            mr: "10px",
            "&:hover": { background: isStartedVideo ? "white" : "red" },
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
      <Tooltip title={!isMuted ? "Turn off microphone" : "Turn on microphone"}>
        <IconButton
          sx={{
            color: !isMuted ? "black" : "white",
            padding: "12px",
            mr: "10px",
            background: !isMuted ? "white" : "red",
            "&:hover": { background: !isMuted ? "white" : "red" },
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
      <Tooltip title={isScreenSharing ? "Stop screen share" : "Share screen"}>
        <IconButton
          disabled={isScreenSharingDisable}
          sx={{
            color: isScreenSharing ? "black" : "white",
            padding: "12px",
            mr: "10px",
            background: isScreenSharing ? "white" : "red",
            "&:hover": { background: isScreenSharing ? "white" : "red" },
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
            <PresentToAllIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          ) : (
            <CancelPresentationIcon
              sx={{
                "@media (min-width: 200px) and (max-width: 450px)": {
                  fontSize: "16px",
                },
              }}
            />
          )}
        </IconButton>
      </Tooltip>
      {!belowMd && !isMinimize && (
        <Tooltip
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
              color: isChatStarted ? "black" : "white",
              padding: "12px",
              mr: "10px",
              background: isChatStarted ? "white" : "red",
              "&:hover": { background: isChatStarted ? "white" : "red" },
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
              <MarkEmailUnreadIcon
                sx={{
                  "@media (min-width: 200px) and (max-width: 450px)": {
                    fontSize: "16px",
                  },
                }}
              />
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
      <Tooltip title="Leave call">
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
