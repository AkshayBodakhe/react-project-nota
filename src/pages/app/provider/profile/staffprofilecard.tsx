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
  
  import { formButtonStyle } from "../../../../styles/common";
import { Roles } from "../../../../sdk/thinkemr-core-0.0.1/requests";
import ChangePasswordModal from "../../admin/settings/change-password";
  
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
  
  interface ProfileDetails {
    staffProfile: User | undefined;
    source?: string;
    refetch: any;
    providerGroupId?: string;
  }
  
  
  function StaffProfileCard({ source, staffProfile, refetch }: ProfileDetails) {
    const classes = profileStyle();
    const [openChangePasswordModal, setChangePasswordModal] = useState(false);
    const [staffProfileImage, setstaffProfileImage] = useState<User>();
    const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

    const handleChangePassOpen = () => {
      setChangePasswordModal(true);
      setScroll("paper");
    };
  
    useEffect(() => {
      setstaffProfileImage(staffProfile as User);
    }, [staffProfile]);
  
    return (
      <Grid>
        <Grid className={classes.parentbox}>
          <Grid xs={12} className={classes.boxContainer}>
            <Grid className={classes.childBox}>
              <Grid container className={classes.containerAvatar}>
                <Grid className={classes.avatarGrid} item xs={6}>
                  <Avatar
                    src={staffProfileImage?.avatar || ""}
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
                        {`${staffProfileImage?.firstName || ""} ${
                          staffProfileImage?.lastName || "-"
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
                        title={staffProfileImage?.email}
                        className={classes.value}
                      >
                        {staffProfileImage?.email || "-"}
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
                        {staffProfileImage?.phone || "-"}
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
                        {toCamelCase(staffProfileImage?.roleType as string) ||
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
                        {toCamelCase(staffProfileImage?.role?.name as string) ||
                          toCamelCase(staffProfileImage?.roleType as string) ||
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
            editData={staffProfileImage}
            title="Edit Staff Profile"
            profileDetails={staffProfileImage}
            setrefetchData={refetch}
            setAdminProfile={setstaffProfileImage}
            open={openEditProfileModal}
            setOpen={setOpenEditProfileModal}
            scroll="auto"
          />
        )}
      </Grid>
    );
  }
  
  export default StaffProfileCard;
  