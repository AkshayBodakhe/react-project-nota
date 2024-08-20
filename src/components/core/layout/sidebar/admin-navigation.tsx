/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@mui/material";
import { useStyles, listText } from "../styles";
import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import { iconMapping } from "./navigation-list";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutPage from "../../../../pages/auth/logout";
import { useSelector } from "react-redux";
// import { postSublist } from "../../../../redux/actions/navbarAction";
import {useState} from 'react';

interface adminData {
  path: string;
  name: string;
  icon: string;
  sublist?: SublistData[];
}
interface SublistData {
  path: string;
  name: string;
  icon: string;
}

interface AdminNavigationProps {
  barData: adminData[];
  auth: boolean;
  isMobile: boolean;
  source?: string;
}

interface SliderProps {
  children: React.ReactNode;
}

const AdminNavigationComponent: React.FC<AdminNavigationProps> = (props) => {
  const { barData, auth, isMobile, source 
  } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogOutModal, setOpenLogOutModal] = useState(false);
  const handleLogutModal = () => {
    setOpenLogOutModal(true);
    
  };
  const subListInfo = useSelector((state: any) => state.navBarReducer);

  const Slider: React.FC<SliderProps> = ({ children }) => {
    if (isMobile) {
      return (
        <Slide timeout={500} direction="right" in={auth}>
          {children as React.ReactElement}
        </Slide>
      );
    } else {
      return <>{children}</>;
    }
  };

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

  return (
    <>
      <List classes={{ root: classes.listRoot }}>
        {barData.map((list) => {
          const IconMapping = iconMapping[list.icon];
          const sublistLength = list.sublist?.length || 0;
          return (
            <div key={list.path}>
              <ListItem
                onClick={() =>
                  handleComponentNavigation(list.path, list.sublist)
                }
                classes={{
                  root: `${classes.listItemRoot} ${
                    location.pathname === list.path
                      ? classes.activeList
                      : subListInfo.child &&
                        subListInfo.activeParent === list.path
                      ? classes.activeList
                      : null
                  }`,
                }}
              >
                <ListItemIcon
                  className={`${
                    location.pathname === list.path
                      ? classes.iconStyle
                      : subListInfo.child &&
                        subListInfo.activeParent === list.path
                      ? classes.iconStyle
                      : null
                  }`}
                  sx={{ minWidth: listText.gapBetweenIcon.minWidth }}
                >
                  <IconMapping />
                </ListItemIcon>
                <Slider
                  children={
                    <ListItemText
                      primaryTypographyProps={{
                        ...(location.pathname === list.path
                          ? listText.activeListTextAdmin
                          : listText.deActiveListTextAdmin),
                      }}
                      className={classes.listItemTextRoot}
                    >
                      {list.name}
                    </ListItemText>
                  }
                />
                {sublistLength !== 0 &&
                  (subListInfo.state &&
                  subListInfo.activeParent === list.path ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItem>

              {sublistLength !== 0 && (
                <Collapse
                  in={
                    subListInfo.state && list.path === subListInfo.activeParent
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {list?.sublist?.map((child) => {
                      const ChildIconMapping = iconMapping[child.icon];
                      return (
                        <ListItem
                          className={`${classes.listItemRoot} ${
                            location.pathname === `${list.path}${child.path}`
                              ? classes.activeList
                              : null
                          }`}
                          sx={{ pl: 4 }}
                          onClick={() => {
                            handleChildComponentNavigation(
                              list.path,
                              child.path
                            );
                          }}
                          key={child.path}
                        >
                          <ListItemIcon
                            className={`${
                              location.pathname ===
                                `${list.path}${child.path}` &&
                              classes.iconStyleAdmin
                            }`}
                            sx={listText.gapBetweenIcon}
                          >
                            <ChildIconMapping />
                          </ListItemIcon>
                          <Slider
                            children={
                              <ListItemText
                                className={classes.listItemTextRoot}
                                primaryTypographyProps={{
                                  ...(location.pathname ===
                                  list.path + child.path
                                    ? listText.activeListTextAdmin
                                    : listText.deActiveListTextAdmin),
                                }}
                              >
                                {child.name}
                              </ListItemText>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
      <Box p={1}>
        <ListItem
          classes={{
            root: classes.listItemRoot,
          }}
          onClick={() => handleLogutModal()}
        >
          <ListItemIcon className={classes.iconStyleAdmin}>
            <Logout />
          </ListItemIcon>
          <Slider
            children={
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ ...listText.deActiveListTextAdmin }}
              />
            }
          />
        </ListItem>
        {/* {openLogOutModal && ( */}
          <LogoutPage
            logoutSource={source}
            openLogoutModal={openLogOutModal}
            setOpenLogoutModal={setOpenLogOutModal}
          />
        {/* )} */}
      </Box>
    </>
  );
};

const AdminNavigationStructure = React.memo(AdminNavigationComponent);

export default AdminNavigationStructure;
