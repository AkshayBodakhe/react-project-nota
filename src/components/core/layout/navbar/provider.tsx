/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  Grid,
  IconButton,
  // InputBase,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  arrowDropDownOptions,
  betweenGridMargin,
  iconStyle,
  logutModal,
  menuCursor,
  providerAppBarOptions,
  subGrid,
  topGridMargin,
  useStyles,
} from "../styles";
import NAVALA from "../../logo";
import DropDownComponent from "../navbar/navbar-dropdown";
import {
  KeyboardArrowDown,
  NotificationsOutlined,
  PowerSettingsNew,
  PersonOutline,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import { adminConstants } from "../../../../constants/admin";

import { navigationData } from "../sidebar/navigation-list";
// import SearchIcon from "@mui/icons-material/Search";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { toolBarStyleProvider } from "../styles";
import { admindata } from "../../../../mock-data/admindetails";
// import { postSublist } from "../../../../redux/actions/navbarAction";
import LogoutPage from "../../../../pages/auth/logout";
import { useSelector } from "react-redux";
import { PORTAL } from "../../../../constants/provider";
import useHasPermission from "../../../common/useHasPermission";
import CommomDrawer from "../../../common/commonDrawer";
import Notification from "./NotificationDrawer";
import { badgeStyle, navBarStyles } from "./navbar.widget";
import {
  useNotificationsControllerServiceGetProviderNotifications,
  useNotificationsControllerServiceGetUnseenProviderNotificationsCount,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
interface IProviderNavbarProps {
  source: string;
  isMobile: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isXSMobile?: boolean;
}

const ProviderNavbar: React.FunctionComponent<IProviderNavbarProps> = (
  props
) => {
  const {
    isMobile,
    setAuth,
    //isXSMobile,
    source,
  } = props;
  const classes = useStyles();
  const navClasses = navBarStyles();

  const providerGroupUuid = useSelector(
    (state: any) => state.commonReducer.userDetail?.data?.providerGroup
  );

  const navigate = useNavigate();
  const [openNotification, setOpenNotification] = useState(false);
  const handleCloseDrawer = () => {
    setOpenNotification((prev) => !prev);
  };

  // const subListInfo = useSelector((state: any) => state.navBarReducer);
  const { PROFILE, LOGOUT } = adminConstants;
  const [anchorEl, setAnchorEl] = useState(null);
  const [dynamicData, setDynamicData] = useState({ path: "", sublist: [] });
  const currentPath = useLocation().pathname;
  const [NotificationCount, setNotificationCount] = useState<any>("");
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const handleMouseEnter = (event: any, data: any) => {
    setAnchorEl(event.currentTarget);
    data.sublist.length !== 0
      ? setDynamicData(data)
      : setDynamicData((prev: any) => ({ ...prev, sublist: [] }));
  };
  const [openLogOutModal, setOpenLogOutModal] = useState(false);
  const handleLogutModal = () => {
    //handlePopoverClose();
    setOpenLogOutModal(true);
  };
  const handleProfileClick = () => {
    //handlePopoverClose();
    navigate("/provider/profile", { state: { uuid: "" } });
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "child-list-popover" : undefined;

  const getNotificationNumbers = (notificationCount: number) => {
    setNotificationCount(notificationCount);
  };

  const { data: count } =
    useNotificationsControllerServiceGetUnseenProviderNotificationsCount({
      providerGroupUuid: providerGroupUuid,
    });

  useEffect(() => {
    if (!!count) {
      setNotificationCount(count?.data);
    }
  }, [count]);

  const handleComponentNavigation = (path: string, sublist: any) => {
    if (sublist.length !== 0) {
      // dispatch(
      //   postSublist({
      //     path: path,
      //     state: !subListInfo.state,
      //     activeParent: path,
      //     child: false,
      //   })
      // );
    } else {
      // dispatch(
      //   postSublist({
      //     ...subListInfo,
      //     activeParent: path,
      //     child: false,
      //   })
      // );
      navigate(path);
    }
  };

  const handleChildComponentNavigation = (
    parentPath: string,
    childPath: string
  ) => {
    // dispatch(
    //   postSublist({
    //     ...subListInfo,
    //     state: true,
    //     activeParent: `${parentPath}`,
    //     child: true,
    //   })
    // );
    navigate(`${parentPath}${childPath}`);
  };
  const handleOnEnter = (event: any, data: any) => {
    if (event.key !== "Enter") {
      return;
    } else {
      handleMouseEnter(event, data);
    }
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };
  const loginData = useSelector(
    (state: any) => state.commonReducer.loginReducer
  );
  const portal = loginData?.tokenData?.portal;
  const navbarPortal = navigationData?.providerNavigationData?.filter(
    (item: any) => {
      if (portal === PORTAL.PROVIDER) return item.name !== "Documents";
      return true;
    }
  );
  return (
    <>
      <AppBar
        color="transparent"
        className={classes.appBarContainer}
        position="static"
      >
        <Toolbar style={toolBarStyleProvider}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid>
              <Grid alignItems={"center"} container gap={2}>
                <Grid>
                  {isMobile && (
                    <IconButton
                      sx={{ color: "#FFFFFF" }}
                      onClick={() => setAuth((prev: boolean) => !prev)}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                </Grid>
                <Grid sx={{ marginRight: "50px" }}>
                  <NAVALA source={source} />
                </Grid>
                <Grid>
                  <Grid container>
                    {!isMobile &&
                      navbarPortal.map((data: any, index: number) => {
                        if (
                          data.permission !== "" &&
                          !useHasPermission(data.permission)
                        )
                          return null;
                        return (
                          <ButtonBase
                            onClick={() =>
                              handleComponentNavigation(data.path, data.sublist)
                            }
                            onMouseEnter={(e) => handleMouseEnter(e, data)}
                            onKeyDown={(e) => handleOnEnter(e, data)}
                            aria-describedby={id}
                            key={index}
                            focusRipple
                            className={
                              currentPath.includes(
                                String(data.path).toLowerCase()
                              )
                                ? classes.buttonActive
                                : classes.buttonDeactive
                            }
                          >
                            <Typography variant="h5" sx={providerAppBarOptions}>
                              {data.name}
                            </Typography>
                          </ButtonBase>
                        );
                      })}

                    {/* {source === PATIENT &&
                      !isMobile &&
                      navigationData.patientNavigationData.map(
                        (data: any, index: number) => {
                          return (
                            <ButtonBase
                              onClick={() =>
                                handleComponentNavigation(
                                  data.path,
                                  data.sublist
                                )
                              }
                              onMouseEnter={(e) => handleMouseEnter(e, data)}
                              onKeyDown={(e) => handleOnEnter(e, data)}
                              aria-describedby={id}
                              key={index}
                              focusRipple
                              className={
                                currentPath.includes(String(data.path).toLowerCase())
                                  ? classes.buttonActive
                                  : classes.buttonDeactive
                              }
                            >
                              <Typography sx={providerAppBarOptions}>
                                {data.name}
                              </Typography>
                            </ButtonBase>
                          );
                        }
                      )} */}
                    <DropDownComponent
                      open={open && dynamicData?.sublist.length !== 0}
                      handleMouseLeave={handleMouseLeave}
                      anchorEl={anchorEl}
                      dynamicData={dynamicData}
                      handleChildComponentNavigation={
                        handleChildComponentNavigation
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* <Grid>
                  {source === PROVIDER ? (
                    <InputBase
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputText,
                        focused: classes.inputBoxActive2,
                      }}
                      startAdornment={
                        <SearchIcon className={classes.searchIconStyle} />
                      }
                      placeholder="Search by patient name"
                    />
                  ) : null}
                  {source === PATIENT && (
                    <HelpOutlineIcon
                      sx={{ marginTop: "7px", color: "#fff", height: "30px" }}
                    />
                  )}
                </Grid> */}
                {!isMobile && (
                  <>
                    <IconButton
                      type="button"
                      aria-label="search"
                      style={iconStyle}
                    >
                      <Grid item lg={2} onClick={handleCloseDrawer}>
                        <Badge
                          badgeContent={NotificationCount?NotificationCount:0}
                          overlap="circular"
                          color="error"
                          classes={{ badge: navClasses.badge }}
                        >
                          <NotificationsOutlined />
                        </Badge>
                      </Grid>
                    </IconButton>
                    <Avatar
                      src={userDetails?.data?.avatar || ""}
                      alt="profile photo"
                      sx={{ height: "25px", width: "25px",ml:2 }}
                    />
                  </>
                )}
                <IconButton
                  type="button"
                  aria-label="search"
                  style={{ color: "#FFFFFF" }}
                  onClick={handlePopoverOpen}
                >
                  {!isPopoverOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                </IconButton>
                <Popover
                  open={isPopoverOpen}
                  anchorEl={document.getElementById("my-icon-button")}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{ marginTop: topGridMargin }}
                >
                  <Grid sx={logutModal}>
                    <Grid sx={subGrid}>
                      <Grid
                        container
                        style={{ cursor: menuCursor }}
                        onClick={handleProfileClick}
                      >
                        <PersonOutline
                          style={{
                            color: "#36588C",
                          }}
                        />
                        <Typography
                          sx={{
                            marginLeft: betweenGridMargin,
                            color: "#000000",
                          }}
                        >
                          {PROFILE}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid sx={arrowDropDownOptions}>
                      <Grid
                        container
                        style={{ cursor: menuCursor }}
                        onClick={handleLogutModal}
                      >
                        <PowerSettingsNew
                          style={{
                            color: "#36588C",
                          }}
                        />
                        <Typography
                          sx={{
                            marginLeft: betweenGridMargin,
                            color: "#000000",
                          }}
                        >
                          {LOGOUT}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* {openLogOutModal && ( */}
                    <LogoutPage
                      logoutSource={source}
                      openLogoutModal={openLogOutModal}
                      setOpenLogoutModal={setOpenLogOutModal}
                    />
                    {/* )} */}
                  </Grid>
                </Popover>
              </Grid>
            </Grid>
            <CommomDrawer
              anchor="right"
              open={openNotification}
              title="Notifications"
              drawerWidth="30vw"
              drawerPadding={"20px"}
              onClose={handleCloseDrawer}
              headerStyle={"15px"}
            >
              <Notification
                notificationCounter={getNotificationNumbers}
                providerGroupUuid={providerGroupUuid}
              />
            </CommomDrawer>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ProviderNavbar;
