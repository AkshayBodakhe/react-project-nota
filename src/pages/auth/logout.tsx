/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, Typography, Fade, Grid, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router";
// import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useUserControllerServiceUserLogout } from "../../sdk/thinkemr-core-0.0.1/queries";
import { ClearSessionStorage } from "./removeSessionStorage";

// import { useState } from "react";
interface LogOutModalProps {
  logoutSource?: string;
  openLogoutModal: boolean;
  setOpenLogoutModal?: any;
}

export const loginStyle = makeStyles(() => ({
  logoutModalStyle: {
    width: "500px",
    height: "auto",
    maxWidth: "500px",
    minWidth: "auto",
    background: "#FFFFFF",
    boxShadow: "0px 0px 16px #00000029",
    borderRadius: "6px",
    opacity: 1,
    outline: "none",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    WebkitTransform: "translate(-50%, -50%)",
    WebkitTransition: "opacity 0.3s",
    padding: "20px",
  },
}));
export const logoutModalTitle = {
  textAlign: "center",
  color: "#000000",
};

export const logoutConfirmationButtons = {
  width: "100%",
  marginTop: "1rem",
  background: "#1B5984 0% 0% no-repeat padding-box",
  height: "auto",
  paddingTop: "10px",
  paddingBottom: "10px",
  borderRadius: "5px",
};
export const logoutCancelButtons = {
  width: "100%",
  marginTop: "1rem",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: "1px solid #36588C",
  height: "auto",
  paddingTop: "10px",
  paddingBottom: "10px",
  borderRadius: "5px",
  boxShadow: "0px 0px 8px #00000029",
};
export const logoutModalButtonLabels = () => {
  return {
    color: "#F8F8F8",
    fontSize: "14px !important",
  };
};

interface payload {
  refreshToken: string;
}

function LogoutPage(props: LogOutModalProps) {
  const {
    //logoutSource,
    openLogoutModal,
    setOpenLogoutModal,
  } = props;

  const classes = loginStyle();
  const navigate = useNavigate();
  const { mutateAsync, isSuccess, data } = useUserControllerServiceUserLogout();

  useEffect(() => {
    if (isSuccess) {
      ClearSessionStorage();
      navigate("/auth/login");
    }
  }, [isSuccess, data]);

  const handleLogOut = () => {
    const requestBody: payload = {
      refreshToken: sessionStorage.getItem("refreshToken") || "",
    };
    try {
      mutateAsync({ requestBody: requestBody });
    } catch (_error) {}
  };

  return (
    <div>
      <Modal open={openLogoutModal} closeAfterTransition>
        <Fade in={openLogoutModal}>
          <Grid
            classes={{
              root: classes.logoutModalStyle,
            }}
          >
            <Typography sx={logoutModalTitle} variant="h2">
              Are you sure you want to log out ?
            </Typography>
            <ButtonBase sx={logoutConfirmationButtons} onClick={handleLogOut}>
              <Typography sx={logoutModalButtonLabels} variant="body2">
                Yes, Log me out
              </Typography>
            </ButtonBase>
            <ButtonBase
              sx={logoutCancelButtons}
              onClick={() => setOpenLogoutModal(false)}
            >
              <Typography sx={{ fontSize: "14px !important" }} variant="body2">
                No
              </Typography>
            </ButtonBase>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}

export default LogoutPage;
