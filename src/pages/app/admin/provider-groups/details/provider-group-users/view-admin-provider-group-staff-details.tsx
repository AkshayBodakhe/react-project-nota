import { ButtonBase, Grid, Typography } from "@mui/material";
import { adminConstants } from "../../../../../../constants/admin";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import Mask from "../../../../../../assets/other/setting-background.svg";
import Profilecard, { adminprofile } from "../../../settings/profilecard";
import AppLayout from "../../../../../../components/core/layout/layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useEffect, useState } from "react";
import providerGroupService from "../../../../../../service/provider-group--service";
import { Enums } from "../../common-files/enums";
import AddEditUserModal from "../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";

const { ADMIN, STAFF_USER_PROFILE } = adminConstants;

export const settingStyle = makeStyles(() => ({
  mainGrid: {
    padding: "10px",
    backgroundColor: '#FFFFFF',
    height: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // padding: '0px 15px 15px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 0px 8px #00000029',
    borderRadius: '5px',
    opacity: 1
  },
  editButton: {
    height: "34px !important",
    width: " 120px  !important",
    background: "#0097F0 0% 0% no-repeat padding-box  !important",
    borderRadius: "5px  !important",
  },
  // editTypo: {
  //   color: "#FFFFFF !important",
  //   fontWeight: "bold !important",
  // },
  bold: {
    fontWeight: "bold !important",
  },
  bodyGrid: {
    height: "auto !important",
    display: "flex",
    justifyContent: "center",
  },
  childImageGrid: {
    marginTop: "2rem !important",
    // width: "100% !important",
    height: "auto !important",
  },
}));

const sxs = {
  buttonBaseChangePass: {
    width: "9rem",
    backgroundColor: "#DAEAF8 !important",
    textTransform: "initial",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    border: '1px solid #004186',
    color: '#004186',
    borderRadius: "5px !important",
    display: 'flex',
    justifyContent: 'space-around'
  },
  buttonBaseTypo: {
    display: "flex",
    color: '#004186'
  },
}

const { EDIT_PROFILE } = adminConstants;

function ViewAdminProviderGroupStaffDetails() {

  const location = useLocation();
  const classes = settingStyle();
  const navigation = useNavigate();
  const [adminprofile, setAdminProfile] = useState<adminprofile>();
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [tenantId] = useState<any>(localStorage.getItem(Enums.PROVIDER_GROUP_KEY));
  const providerId = location && location.state && location.state.providerId;

  useEffect(() => {
    if (providerId) getUserById(providerId);
  }, [providerId])

  const handleEditButton = () => {
    setOpenEditProfileModal(true);
  }

  const onBackClick = () => {
    navigation(-1);
  };

  const getUserById = (userUuid: string) => {
    try {
      providerGroupService.getUserById(tenantId, userUuid).then((user: any) => {
        if (user?.data && user.data?.data) {
          setAdminProfile(user.data?.data as adminprofile);
        }
      })
    } catch (error) {

    }
  }

  return (
    <Grid className={classes.mainGrid}>
      <Grid container>
        <Grid item sx={{ display: "flex",color: '#004186'}} xs={11}>
          <ArrowBackIcon onClick={onBackClick} sx={{ marginRight: '5px', cursor: 'pointer',fontSize:"20px" }} ></ArrowBackIcon>
          <Typography variant="h3" className={classes.bold}>
            {STAFF_USER_PROFILE}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          {/* <Typography onClick={onBackClick}>{'Back'}</Typography> */}
          <ButtonBase sx={sxs.buttonBaseChangePass}
            onClick={handleEditButton}
          >
            <ModeEditOutlineOutlinedIcon sx={{ width: '0.8em' }} />
            <Typography sx={sxs.buttonBaseTypo}>
              {EDIT_PROFILE}
            </Typography>
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid container className={classes.bodyGrid}>
        <img src={Mask} alt="Mask Profile" className={classes.childImageGrid} />
        <Profilecard adminProfile={adminprofile} refetch={() => getUserById(providerId)} />
      </Grid>
      {openEditProfileModal && (
        <AddEditUserModal
          isRolePresent={true}
          editData={adminprofile}
          title="Edit Admin Profile"
          profileDetails={adminprofile}
          setrefetchData={() => getUserById(providerId)}
          setAdminProfile={setAdminProfile}
          open={openEditProfileModal}
          setOpen={setOpenEditProfileModal}
          scroll="auto"
        />
      )}
    </Grid>
  );
}

export default AppLayout(ViewAdminProviderGroupStaffDetails, { source: ADMIN });
