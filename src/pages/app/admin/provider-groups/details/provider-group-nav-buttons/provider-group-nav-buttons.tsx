import { ButtonBase, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Permission } from "../../../../../../components/common/enums-and-interfaces/enums";
import useHasPermission from "../../../../../../components/common/useHasPermission";
// import { navigationData } from "../../../../../../components/core/layout/sidebar/navigation-list";
// import AppLayout from "../../../../../../components/core/layout/layout";
// import { adminConstants } from "../../../../../../constants/admin";
// import ProviderGroupLocations from "../provider-group-location/provider-group-location";
// import ProiderGroupModal from "../../../../../../components/common/modal/provider-group-modal";
// const { ADMIN } = adminConstants;
export const masterStyle = makeStyles(() => ({
  heading: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0px",
  },
  buttonActive: {
    boxSizing: 'border-box',
    fontSize: "18px !important",
    // background: "#36588C 0% 0% no-repeat padding-box !important",
    borderBottom: "3px solid #004186 !important",
    // borderRadius: "5px !important",
    width: "130px",
    height: "32px",
    // margin: "5px 3px !important",
  },
  buttonTypoActive: {
    fontSize: "16px !important",
    color: "#004186 !important",
    fontWeight: 'bold !important'
  },
  buttonTypoDeactive: { 
    color: "#1A1A1A66",
    fontWeight: 'bold !important'
  },
  buttonGrid1: {
    borderRadius: "5px",
    border: "none",
    // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
  },

  buttonDeactive: {
    boxSizing: 'border-box',
    fontSize: "14px !important",
    // borderRadius: "5px !important",
    // background: "red 0% 0% no-repeat padding-box !important",
    width: "130px",
    height: "32px",
    // margin: "5px 3px !important",

    // "&:hover" : {
    //   background: '#DAEAF8 !important',
    //   color: '#36588C !important'
    // }
  },
}));

interface RenderButtonProps {
  name: string;
  label: string;
  btnActive?: boolean;
  path: string;
  permission?: string; 
}
const renderTabsData = [
  {
    name: "Profile",
    path: '/profile',
    lable: "profile", // isActive: checkMaster?.dataImport,
    permission: '',
  },
  {
    name: "Locations",
    path: "/locations",
    lable: "locations", // isActive: checkMaster?.labCatalog,
    permission: Permission.LOCATIONS,
  },
  {
    name: "Users",
    path: "/users",
    lable: "users", // isActive: checkMaster?.proceduralCode,
    permission: Permission.USER,
  },
  {
    name: "Departments",
    path: "/departments",
    lable: "departments", // isActive: checkMaster?.drugCatalog,
    permission: Permission.DEPARTMENT,
  },
  // {
  //   name: "Patients",
  //   path: "/patients",
  //   lable: "patients", // isActive: checkMaster?.diagnosisCode,
  // },
  
];

type Prop = {
  providerGroupUuid:string
}

function ProviderGroupNavButtons(props:Prop) {
  const classes = masterStyle();
  const currentPath = useLocation().pathname;

  // const [activeTab, setActiveTab] = useState("");
  // const handleUserSetting = (label: string) => {
  //   setActiveTab(label);
  // };

  const RenderButton: React.FC<RenderButtonProps> = ({
    label,
    // btnActive,
    name,
    path,
    permission
  }) => {
    const canAccess = permission === undefined || permission === '' || useHasPermission(permission); 
    if (!canAccess) return null; 
    const toPath = `/admin/provider-groups/${props.providerGroupUuid}/${label}`;
    return (
      <Link to={toPath}>
        <ButtonBase
          className={
            currentPath.includes(path) ? classes.buttonActive : classes.buttonDeactive
          }
          // onClick={() => handleUserSetting(label)}
          focusRipple
        >
          <Typography
            className={
              currentPath.includes(path)
                ? classes.buttonTypoActive
                : classes.buttonTypoDeactive
            }
          >
            {name}
          </Typography>
        </ButtonBase>
      </Link>
    );
  };
  return (
    <div>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container className={classes.heading} xs={12}>
          <Grid className={classes.buttonGrid1} item>
            {renderTabsData.map((data) => {
              return <RenderButton label={data.lable} name={data.name} path={data.path}  permission={data.permission}/>;
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProviderGroupNavButtons;
