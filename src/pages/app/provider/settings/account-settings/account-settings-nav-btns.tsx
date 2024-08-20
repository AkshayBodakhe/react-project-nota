import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
    Button,
    ButtonBase,
    Drawer,
    Grid,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { formButtonStyle } from "../../../../../styles/common";
import NotificationPage from "./notification";
import ProfilePage from "./profile";
import EditProfile from "./profile/add-edit-profile";
import ProviderGroupSettingPage from "./provider-group";
import AddEditProviderGroupData from "./provider-group/add-edit-provider-group";

export const masterStyle = makeStyles(() => ({
  heading: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0px",
  },
  buttonActive: {
    fontSize: "14px !important",
    background: "#36588C 0% 0% no-repeat padding-box !important",
    borderRadius: "5px !important",
    width: "168px",
    height: "32px",
    margin: "5px 3px !important",
  },
  buttonTypoActive: {
    fontSize: "14px !important",
    color: "#FFFF !important",
  },
  buttonTypoDeactive: { color: "#1A1A1A66" },
  buttonGrid1: {
    borderRadius: "5px",
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
  },

  buttonDeactive: {
    borderRadius: "5px !important",
    background: "#1A1A1A1A 0% 0% no-repeat padding-box !important",
    width: "168px",
    height: "32px",
    margin: "5px 3px !important",

    "&:hover": {
      background: "#DAEAF8 !important",
      color: "#36588C !important",
    },
  },
  mySetting: {
    color: "#1A1A1ACC !important",
    fontSize: "18px !important",
    fontWeight: "bold !important",
    opacity: 1,
  },
  icon: {
    fontSize: "20px !important",
  },
}));

function AccountSettingsNavBtns() {
  const classes = masterStyle();
  const [value, setValue] = React.useState("1");
  const [open, setOpen] = useState(false);
  const [isAdminEditProviderModalOpen, setIsAdminEditProviderModalOpen] =
    useState(false);
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const editProviderDetails = () => {
    if (value === "1") setIsAdminEditProviderModalOpen(true);
    else if (value === "2") setOpen(true);
  };

  const closeProviderEdit = () => {
    setIsAdminEditProviderModalOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Typography className={classes.mySetting}>
                  My Settings
                </Typography>
              </Grid>
              {value == "3" && (
                <Grid item>
                  <Grid container gap={"10px"}>
                    <Grid item>
                      <ButtonBase
                        sx={{
                          ...formButtonStyle.defaultBtn,
                          fontWeight: "bold",
                        }}
                      >
                        Default
                      </ButtonBase>
                    </Grid>
                    <Grid item>
                      <ButtonBase sx={formButtonStyle.disableBtn}>
                        Save
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#1B5984",
                    },
                  }}
                >
                  <Tab
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold !important",
                      fontSize: "16px",
                      color: "#1B5984 !important",
                    }}
                    value="1"
                    label="Profile"
                  />
                  <Tab
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold !important",
                      fontSize: "16px",
                      color: "#1B5984 !important",
                    }}
                    value="2"
                    label="Provider Group"
                  />
                  <Tab
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold !important",
                      fontSize: "16px",
                      color: "#1B5984 !important",
                    }}
                    value="3"
                    label="Notification"
                  />
                </Tabs>
              </Grid>
              {value != "3" && (
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      ...formButtonStyle.saveButtonStyle,
                      "&:hover": { backgroundColor: "#1B5984" },
                    }}
                    onClick={editProviderDetails}
                    type="submit"
                  >
                    <EditOutlinedIcon className={classes.icon} />
                    &nbsp;Edit Profile
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {value == "1" && <ProfilePage />}
            {value == "2" && <ProviderGroupSettingPage />}
            {value == "3" && <NotificationPage />}
          </Grid>
        </Grid>
      </Grid>
      <Drawer
        anchor="right"
        open={isAdminEditProviderModalOpen}
        onClose={closeProviderEdit}
      >
        <Grid
          style={{
            width: "65vw",
            overflowX: "hidden",
            height: "100vh",
            backgroundColor: "#F5F6F9",
          }}
        >
          <EditProfile onCloseDrawer={closeProviderEdit} />
        </Grid>
      </Drawer>

      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Grid
          style={{
            width: "65vw",
            overflowX: "hidden",
            height: "100vh",
            backgroundColor: "#F5F6F9",
          }}
        >
          <AddEditProviderGroupData onCloseDrawer={handleClose}  title={'Edit Provider Group Profile'} source={'Edit'}/>
        </Grid>
      </Drawer>
    </>
  );
}

export default AccountSettingsNavBtns;
