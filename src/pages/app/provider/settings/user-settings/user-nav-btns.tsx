import AddIcon from "@mui/icons-material/Add";
import { ButtonBase, Drawer, Grid, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formButtonStyle } from "../../../../../styles/common";
import AddEditProviderGroupData from "../account-settings/provider-group/add-edit-provider-group";
import AddEditUserModal from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";

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
}));

function UserNavBtns() {
  const tabsData = [
    {
      label: "Users",
      path: "/provider/settings/user-settings/users",
    },
    {
      label: "roles & responsibility",
      path: "/provider/settings/user-settings/role-and-responsibility",
    },
  ];
  const classes = masterStyle();
  let currentPath = useLocation().pathname;
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [openEditProfileCardModal, setOpenEditProfileCardModal] =
    useState(false);
  const openModel = () => {
    setOpenEditProfileCardModal(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (currentPath === "/provider/settings/user-settings")
      currentPath = "/provider/settings/user-settings/users";
    setValue(currentPath);
  }, [currentPath]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} p={1}>
          <Typography sx={{fontWeight:"bold",color:"#1A1A1A",fontSize:"18px"}}>User Setting</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container mb={2} className={classes.heading} sx={{padding:"0px !important"}} justifyContent={"space-between"}>
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
                {tabsData.map((tab, index) => (
                  <Tab
                    key={index}
                    component={Link}
                    to={tab.path}
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold !important",
                      fontSize: "16px",
                      color: "#1B5984 !important",
                    }}
                    value={tab.path}
                    label={tab.label}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item>
              <Grid container gap={"10px"}>
                <Grid item>
                  <ButtonBase
                    sx={{ ...formButtonStyle.saveButtonStyle, height: "37px" }}
                    onClick={handleOpen}
                  >
                    <AddIcon />
                    Add Provider User
                  </ButtonBase>
                </Grid>
                <Grid item>
                  <ButtonBase
                    sx={{ ...formButtonStyle.saveButtonStyle, height: "37px" }}
                    onClick={openModel}
                  >
                    <AddIcon />
                    Add Staff User
                  </ButtonBase>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Grid
          style={{
            width: "65vw",
            overflowX: "hidden",
            height: "100vh",
            backgroundColor: "#F5F6F9",
          }}
        >
          <AddEditProviderGroupData
            onCloseDrawer={handleClose}
            title={"Add Provider User"}
          />
        </Grid>
      </Drawer>
      {openEditProfileCardModal && (
        <AddEditUserModal
          title="Add Staff Profile"
          open={openEditProfileCardModal}
          setOpen={setOpenEditProfileCardModal}
          scroll="auto"
        />
      )}
    </>
  );
}

export default UserNavBtns;
