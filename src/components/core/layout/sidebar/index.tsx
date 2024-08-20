import React from "react";
import { Box } from "@mui/material";
import { useStyles } from "../styles";
//import AdminNavigationStructure from "./admin-navigation";
//import { navigationData } from "./navigation-list";
import { adminConstants } from "../../../../constants/admin";
interface SidebarProps {
  source: string;
  isMobile: boolean;
  auth: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ source, isMobile, auth }) => {
  const classes = useStyles();
  const { ADMIN, PROVIDER } = adminConstants;

  return (
    <Box
      className={`${classes.sideBarContainer} 
      ${isMobile && !auth ? classes.mobileWidth : classes.otherTab} `}
    >
      {source === ADMIN ? (
      null
      ) : source === PROVIDER ? null : null}
    </Box>
  );
};

export default Sidebar;
