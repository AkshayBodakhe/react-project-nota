import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ButtonBase, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Mask from "../../../../assets/other/setting-background.svg";
import AddEditUserModal, { toCamelCase } from "../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
import {  Roles, UserControllerService } from "../../../../sdk/thinkemr-core-0.0.1/requests";
import { PROVIDER } from "../documents/documents-constant/documents-common-const";
import ProfileCard, { adminprofile } from "../../admin/settings/profilecard";
import StaffProfileCard from "./staffprofilecard";
const { ADMIN, ADMIN_PROFILE } = adminConstants;

export const settingStyle = makeStyles(() => ({
  mainGrid: {
    padding: "20px",
    background: "#fff !important",
    height: "100%",
  },
  editButton: {
    backgroundColor: "#DAEAF8 !important",
    textTransform: "initial",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    borderRadius: "8px !important",
  },
  editTypo: {
    color: "#36588C !important",
    display: "flex",
  },
  bold: {
    padding: "8px 0px",
    color: "#004186",
  },
  bodyGrid: {
    //height: "auto !important",
    display: "flex",
    justifyContent: "center",
  },
  childImageGrid: {
    marginTop: "2rem !important",
    width: "100% !important",
    height: "auto !important",
  },
  editProfileButton: {
    display: "flex",
    justifyContent: "flex-end",
  },
  editProfile: {
    background: "#CCECFF80 0% 0% no-repeat padding-box !important",
    border: "1px solid #004186 !important",
    borderRadius: "5px !important",
    opacity: 1,
    color: "#004186 !important",
    padding: "5px !important",
    fontWeight: "600px !important",
    height: "30px !important",
  },
}));

export interface User {
    id?: number;
    uuid?: string;
    iamId?: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password?: string;
    active?: boolean;
    archive?: boolean;
    avatar?: string;
    newAvatar?: string;
    role?: Roles;
    tenantKey?: string;
    lastLogin?: number;
    roleType: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    departmentName?: Array<string>;
    patientPortal?: boolean;
    portal?: string;
    permissions?: Array<Permissions>;
    providerGroupUuid?: string;
    providerGroup?: string;
  }

function StaffSettingsPage() {
  const classes = settingStyle();
  const [staffprofile, setStaffProfile] = useState<User | any>();
  const [providerId, setProviderId] = useState("");
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  useEffect(() => {
    const encodedData = sessionStorage.getItem("loginUser");
    const providerData = encodedData ? JSON.parse(encodedData) : null;
    setProviderId(providerData?.uuid);
  }, []);

  useEffect(() => {
    if (providerId) getUserById(providerId);
  }, [providerId]);

  const handleEditButton = () => {
    setOpenEditProfileModal(true);
  };

  const getUserById = async (userUuid: string) => {
    let data = await UserControllerService.getUserById1(userUuid);
    setStaffProfile(data?.data as User);
  };

  return (
    <Grid className={classes.mainGrid}>
      <Grid container>
        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" className={classes.bold}>
            {toCamelCase(staffprofile?.role?.name)+" " + "Profile"}
          </Typography>
          <ButtonBase
            className={classes.editProfile}
            onClick={handleEditButton}
          >
            <EditOutlinedIcon sx={{ color: "#004186", fontSize: "18px" }} />
            &nbsp;
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Edit Profile
            </Typography>
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid container className={classes.bodyGrid}>
        <img src={Mask} alt="Mask Profile" className={classes.childImageGrid} />
        <StaffProfileCard
          source={ADMIN}
          staffProfile={staffprofile}
          refetch={() => getUserById(providerId)}
        />
      </Grid>
      {openEditProfileModal && (
        <AddEditUserModal
          source="edit"
          editData={staffprofile}
          title="Edit Staff Profile"
          profileDetails={staffprofile}
          setrefetchData={() => getUserById(providerId)}
          setAdminProfile={setStaffProfile}
          open={openEditProfileModal}
          setOpen={setOpenEditProfileModal}
          scroll="auto"
        />
      )}
    </Grid>
  );
}

export default AppLayout(StaffSettingsPage, { source: PROVIDER });
