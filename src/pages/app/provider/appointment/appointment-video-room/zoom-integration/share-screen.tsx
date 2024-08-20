import { Grid } from "@mui/material";
import React from "react";

type ShareScreenProps = {
  isScreenSharing: boolean;
  isMinimize: boolean;
  isShareScreenForParticipants: boolean;
  isChatStarted: boolean;
};

const ShareScreen = (props: ShareScreenProps) => {
  const { isScreenSharing, isMinimize, isShareScreenForParticipants, isChatStarted } = props;

  return (
    <>
      {isScreenSharing && !isMinimize && (
        <Grid style={{ width: isChatStarted ? "60%" : "75%", height: "100%" }}>
          <video
            id="my-screen-share-content-video"
            height="100%"
            style={{ maxWidth: "100%", width: "100%" }}></video>
        </Grid>
      )}
      {!isMinimize && !isScreenSharing && isShareScreenForParticipants && (
        <Grid
          style={{ width: isChatStarted ? "60%" : "75%", height: "100%" }}
          container
          justifyContent={"center"}
          alignItems={"center"}>
          {
            <canvas
              id="participants-screen-share-content-canvas"
              height="100%"
              style={{ maxWidth: "100%", width: "100%" }}></canvas>
          }
        </Grid>
      )}
    </>
  );
};

export default ShareScreen;
