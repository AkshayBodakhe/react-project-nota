import {
  AppBar,
  Avatar,
  ButtonBase,
  Grid,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useStyles } from "../styles";
import { admindata } from "../../../../mock-data/admindetails";
// import Logo from "../../../core/logo";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PersonOutline,
  PowerSettingsNew,
} from "@mui/icons-material";
// import theme from "../../../../theme";
import Ecarehealth from "../../logo";
import {
  toolBarStyleProvider,
  providerAppBarOptions,
  arrowDropDownOptions,
  betweenGridMargin,
  // iconStyle,
  logutModal,
  menuCursor,
  subGrid,
  topGridMargin,
} from "../styles";
// import { postSublist } from "../../../../redux/actions/navbarAction";
import { useLocation, useNavigate } from "react-router-dom";
import { adminConstants } from "../../../../constants/admin";
import { useState } from "react";
import DropDownComponent from "./navbar-dropdown";
import LogoutPage from "../../../../pages/auth/logout";
import { navigationData } from "../sidebar/navigation-list";
import { useSelector } from "react-redux";
import useHasPermission from "../../../common/useHasPermission";
// import SearchIcon from "@mui/icons-material/Search";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface IAdminNavbarProps {
  source: string;
  isMobile: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isXSMobile?: boolean;
}

const AdminNavbar: React.FunctionComponent<IAdminNavbarProps> = (props) => {
  const {
    source,
    isMobile,
    //isXSMobile,
    setAuth,
  } = props;
  const classes = useStyles();

  // const classes = useStyles();
  const navigate = useNavigate();
  // const subListInfo = useSelector((state: any) => state.navBarReducer);
  const { PROFILE, LOGOUT } = adminConstants;
  const [anchorEl, setAnchorEl] = useState(null);
  const [dynamicData, setDynamicData] = useState({ path: "", sublist: [] });
  const currentPath = useLocation().pathname;
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
    setOpenLogOutModal(true);
  };
  const handleProfileClick = () => {
    navigate("/admin/settings/profile");
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "child-list-popover" : undefined;

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
                  <Ecarehealth source={source} />
                </Grid>
                <Grid>
                  <Grid container>
                    {!isMobile &&
                      navigationData.adminNavigationData.map(
                        (data: any, index: number) => {
                          if(data.permission!=="" && !useHasPermission(data.permission)){
                            return null
                          }
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
                                currentPath.includes(
                                  String(data.path).toLowerCase()
                                )
                                  ? classes.buttonActive
                                  : classes.buttonDeactive
                              }
                            >
                              <Typography
                                variant="h5"
                                sx={providerAppBarOptions}
                              >
                                {data.name}
                              </Typography>
                            </ButtonBase>
                          );
                        }
                      )}

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
                    {/* <IconButton
                      type="button"
                      aria-label="search"
                      style={iconStyle}
                    >
                      <NotificationsOutlined />
                    </IconButton> */}
                    <Avatar
                      src={userDetails?.data?.avatar || ""}
                      // src={admindata?.avatar || ""}
                      alt="profile photo"
                      sx={{ height: "25px", width: "25px" }}
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
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AdminNavbar;
