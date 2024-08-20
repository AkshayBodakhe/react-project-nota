import { Grid, IconButton, Tooltip } from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import MinimizeIcon from "@mui/icons-material/Minimize";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

type MinimizeMaximizeProps = {
  isMinimize: boolean;
  maximizeCall: () => void;
  minimizeCall: () => void;
};

const MinimizeMaximize = (props: MinimizeMaximizeProps) => {
  const { isMinimize, maximizeCall, minimizeCall } = props;

  return (
    <Grid
      item
      sx={{
        position: "absolute",
        top: isMinimize ? 0 : 75,
        right: isMinimize ? 0 : 20,
      }}
    >
      {isMinimize && (
        <Tooltip title={"Maximize"}>
          <IconButton
            sx={{
              background: "#fff",
              "&:hover": { background: "#fff" },
              padding: "5px",
              margin: "5px",
            }}
            onClick={() => {
              maximizeCall();
            }}
            aria-label="video"
          >
            <FullscreenIcon />
          </IconButton>
        </Tooltip>
      )}
      {!isMinimize && (
        <Tooltip title={"Minimize"}>
          <IconButton
            sx={{
              background: "#fff",
              "&:hover": { background: "#fff" },
              padding: "5px",
              margin: "5px",
            }}
            onClick={() => {
              minimizeCall();
            }}
            aria-label="video"
          >
            <FullscreenExitIcon />
          </IconButton>
        </Tooltip>
      )}
    </Grid>
  );
};

export default MinimizeMaximize;
