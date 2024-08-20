import React, { useEffect, useState } from "react";
import { Box, ButtonBase, Grid, Menu, Typography } from "@mui/material";
import { useStyles } from "../styles";
import useHasPermission from "../../../common/useHasPermission";
import { Permission } from "../../../common/enums-and-interfaces/enums";

interface NavbarProps {
  open: boolean;
  anchorEl: any;
  handleMouseLeave: any;
  dynamicData: any;
  handleChildComponentNavigation: any;
}

const DropDownComponent: React.FC<NavbarProps> = ({
  open,
  handleMouseLeave,
  anchorEl,
  dynamicData,
  handleChildComponentNavigation,
}) => {
  const classes = useStyles();
  const navbarStyles = {
    activePopButtons: {
      fontSize: "14px",
      padding: "6px 15px",
      color: "#36588C",
      fontWeight: "700",
    },
    menuMouseEvents: {
      pointerEvents: "none",
      marginTop: "4px",
    },
    parentGridList: {
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: " 0px 0px 8px #00000029",
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      pointerEvents: "auto",
      // width:'155px !important',
      padding: "6px 10px",
    },
    popButtons: {
      fontSize: "14px",
      padding: "4px",
      color: "#1A1A1A99",
      cursor: "pointer",
    },
  };
  const [count, setCount] = useState("");
  const canViewTasks = useHasPermission(Permission.TASK);
  const canViewGroupMessages=useHasPermission(Permission.GROUP_MESSAGE)
  const canViewContactDirectory = useHasPermission(Permission.CONTACT_DIRECTORY);
  const canViewAdminUsers=useHasPermission(Permission.ADMIN_USER)
  const canViewRolesAndRespomsibilities=useHasPermission(Permission.ROLES_AND_RESPONSIBILITIES);
  const canViewAuditLog = useHasPermission(Permission.AUDIT_LOG);
  

  useEffect(() => {
    const userDataString = sessionStorage.getItem("loginUser");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const taskCount = userData.openTaskCount;
      setCount(taskCount);
    }
  }, []);

  return (
    <Menu
      id="mouse-over-popover"
      sx={navbarStyles.menuMouseEvents}
      open={open}
      anchorEl={anchorEl}
      onClose={handleMouseLeave}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onMouseLeave={handleMouseLeave}
      classes={{ list: classes.paddinNone }}
    >
      <Grid sx={navbarStyles.parentGridList}>
        {dynamicData?.sublist?.map((item: any, index: number) => {
          if (item.name === "Tasks" && !canViewTasks) return null;
          if (item.name === "Group Messages" && !canViewGroupMessages) return null;
          if (item.name === "Admin User" && !canViewAdminUsers) return null;
          if (item.name === "Contact Directory" && !canViewContactDirectory) return null;
          if (item.name === "Audit Log" && !canViewAuditLog) return null;
          if (item.name === "Roles & Responsibility" && !canViewRolesAndRespomsibilities) return null;

          return item.supeListName ? (
            <ButtonBase key={index} sx={navbarStyles.activePopButtons}>
              {item.supeListName}
            </ButtonBase>
          ) : (
            <ButtonBase
              key={index}
              onClick={() => {
                handleChildComponentNavigation(dynamicData.path, item.path);
              }}
              sx={navbarStyles.popButtons}
            >
              {item.name === "Tasks" ? (
                <Typography variant="h5" sx={{ display: "flex" }}>
                  {item.name}&nbsp;&nbsp;
                  {/*<Box style={{background:"#1479FF",height:"20px",width:"20px",borderRadius:"50%",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{count}</Box>*/}
                </Typography>
              ) : (
                <Typography variant="h5">{item.name}</Typography>
              )}
            </ButtonBase>
          );
        })}
      </Grid>
    </Menu>
  );
};

export default DropDownComponent;
