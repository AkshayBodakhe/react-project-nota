import {
  Avatar,
  Box,
  ButtonBase,
  DialogProps,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import AddEditUserModal, {
  toCamelCase,
} from "../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import { adminConstants } from "../../../../constants/admin";
const {
  NAME,
  EMAIL_ID,
  ROLE,
  PHONE_NUMBER,
  USER_TYPE,
  CHANGE_PASSWORD,
  CHANGE,
  ADMIN,
} = adminConstants;

import ChangePasswordModal from "../settings/change-password";
import { formButtonStyle } from "../../../../styles/common";

export const profileStyle = makeStyles(() => ({
  parentbox: {
    display: "flex !important",
    justifyContent: "center !important",
    marginTop: "-50px",
    //height: "100%",
    width: "515px",
    // "@media (min-width: 760px) and (max-width: 820px)": {},
  },

  mainGrid: {
    overflow: "hidden",
    padding: "20px",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    color: "#1A1A1A",
    fontWeight: "bold !important",
    width: "173px",
    height: "34px",
  },
  boxContent: {
    textAlign: "start",
    padding: "1rem ",
  },
  childImageGrid: {
    marginTop: "2rem",
    width: "100%",
    height: "auto",
  },

  boxContainer: {
    background: "white",
    boxShadow: "0px 0px 8px #00000029",
    borderRadius: "13px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center ",
    width: "78vh !important",
  },
  childBox: {
    height: "100%",
  },

  gridDetails: {
    paddingLeft: "4rem",
    rowGap: "15px !important",
    textAlign: "left",
    "@media (min-width: 760px) and (max-width: 820px)": {
      paddingLeft: "0px !important",
    },
  },

  containerAvatar: {
    marginTop: "-100px",
    justifyContent: "center ",
    alignItems: "center",
  },
  avatarGrid: {
    display: "flex",
    justifyContent: "center",
  },

  button: {
    margin: "2rem",
    display: "flex",
    justifyContent: "space-evenly",
    gap: "10px",
  },
  buttonBaseChangePass: {
    width: "11rem",
    backgroundColor: "#DAEAF8 !important",
    textTransform: "initial",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    borderRadius: "8px !important",
  },

  buttonBaseTypo: {
    color: "#fff !important",
    display: "flex",
  },
  field: {
    color: "#000000 !important",
    fontSize: "14px !important",
    fontWeight: "bold !important",
    lineHeight: "2rem !important",
  },
  value: {
    color: "#000000 !important",
    fontSize: "14px !important",
    lineHeight: "2rem !important",
  },
  ava: {
    height: "770px ",
    width: "700px",
    "@media (min-width: 760px) and (max-width: 820px)": {
      width: "20vw !important",
      marginTop: "35px",
    },
  },
  avatarStyle: {
    height: "200px !important",
    width: "200px !important",
    "@media (min-width: 760px) and (max-width: 820px)": {
      width: "20vw !important",
      marginTop: "35px",
    },
  },
}));

interface ProfileDetails {
  adminProfile: adminprofile | undefined;
  source?: string;
  refetch: any;
  providerGroupId?: string;
}

export interface adminprofile {
  active: boolean;
  archive: boolean;
  avatar: string | null;
  email: string;
  emailVerified: boolean;
  firstName: string;
  iamId: string;
  id: number;
  lastLogin: string | null;
  lastName: string;
  newAvatar: string | null;
  phone: string;
  phoneVerified: boolean;
  role: {
    id: string;
    name: string;
  };
  roleType: string;
  tenantKey: string | null;
  uuid: string;
}

function ProfileCard({ source, adminProfile, refetch }: ProfileDetails) {
  const classes = profileStyle();
  const [openChangePasswordModal, setChangePasswordModal] = useState(false);
  const [adminprofileImage, setAdminProfileImage] = useState<adminprofile>();
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  const handleChangePassOpen = () => {
    setChangePasswordModal(true);
    setScroll("paper");
  };

  useEffect(() => {
    setAdminProfileImage(adminProfile as adminprofile);
  }, [adminProfile]);

  return (
    <Grid>
      <Grid className={classes.parentbox}>
        <Grid xs={12} className={classes.boxContainer}>
          <Grid className={classes.childBox}>
            <Grid container className={classes.containerAvatar}>
              <Grid className={classes.avatarGrid} item xs={6}>
                <Avatar
                  src={adminprofileImage?.avatar || ""}
                  alt="profile photo"
                  className={classes.avatarStyle}
                />
              </Grid>
            </Grid>
            <Grid className="mainBoxContent">
              <Box className={classes.boxContent}>
                <Grid container rowGap={3} className={classes.gridDetails}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" className={classes.field}>
                      {NAME}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="subtitle2" className={classes.value}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="subtitle2" className={classes.value}>
                      {`${adminprofileImage?.firstName || ""} ${
                        adminprofileImage?.lastName || "-"
                      }`}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle2" className={classes.field}>
                      {EMAIL_ID}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="subtitle2" className={classes.value}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography
                      variant="subtitle2"
                      title={adminprofileImage?.email}
                      className={classes.value}
                    >
                      {adminprofileImage?.email || "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle2" className={classes.field}>
                      {PHONE_NUMBER}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="subtitle2" className={classes.value}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="subtitle2" className={classes.value}>
                      {adminprofileImage?.phone || "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle2" className={classes.field}>
                      {USER_TYPE}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="subtitle2" className={classes.value}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="subtitle2" className={classes.value}>
                      {toCamelCase(adminprofileImage?.roleType as string) ||
                        "-"}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="subtitle2" className={classes.field}>
                      {ROLE}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="subtitle2" className={classes.value}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="subtitle2" className={classes.value}>
                      {toCamelCase(adminprofileImage?.role?.name as string) ||
                        toCamelCase(adminprofileImage?.roleType as string) ||
                        "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Grid className={classes.button}>
                {source === ADMIN && (
                  <ButtonBase
                    sx={formButtonStyle.saveButtonStyle}
                    onClick={handleChangePassOpen}
                  >
                    <Typography className={classes.buttonBaseTypo}>
                      {CHANGE_PASSWORD}
                    </Typography>
                  </ButtonBase>
                )}
                {/* <ButtonBase
                  className={classes.buttonBaseChangePass}
                  onClick={handleEditButton}
                >
                  <Typography className={classes.buttonBaseTypo}>
                    {EDIT_PROFILE}
                  </Typography>
                </ButtonBase> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openChangePasswordModal && (
        <ChangePasswordModal
          source={CHANGE}
          open={openChangePasswordModal}
          setOpen={setChangePasswordModal}
          scroll={scroll || "paper"}
          openChangePasswordModal={openChangePasswordModal}
          setChangePasswordModal={setChangePasswordModal}
        />
      )}
      {openEditProfileModal && (
        <AddEditUserModal
          editData={adminprofileImage}
          title="Edit Admin Profile"
          profileDetails={adminprofileImage}
          setrefetchData={refetch}
          setAdminProfile={setAdminProfileImage}
          open={openEditProfileModal}
          setOpen={setOpenEditProfileModal}
          scroll="auto"
        />
      )}
    </Grid>
  );
}

export default ProfileCard;
