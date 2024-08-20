import { useLocation, useParams } from "react-router-dom";
import { Grid, Typography, ButtonBase } from "@mui/material";
// import AppLayout from "../../../../../../components/core/layout/layout";
import ProviderProfile from "../../../../../../components/core/view-provider-details/provider-profile-details";
import { adminConstants } from "../../../../../../constants/admin";
// import getProviderUserDetails from "../../../../../../mock-data/getProviderUserDetails.json";
import { Enums } from "../../common-files/enums";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useNavigate } from "react-router-dom";
import providerGroupService from "../../../../../../service/provider-group--service";
import AppLayout from "../../../../../../components/core/layout/layout";
// import { formButtonStyle } from "../../../../../../styles/common";
import AddEditProviderUser from "../../../../../../components/core/add-edit-provider-user/add-edit-provider-user";
import { settingStyle } from "./view-admin-provider-group-staff-details";

const { ADMIN, EDIT_PROFILE } = adminConstants;

const sxs = {
  buttonBaseChangePass: {
    width: "9rem",
    backgroundColor: "#DAEAF8 !important",
    textTransform: "initial",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    border: "1px solid #004186",
    color: "#004186",
    borderRadius: "5px !important",
    display: "flex",
    justifyContent: "space-around",
  },
  buttonBaseTypo: {
    display: "flex",
    color: "#004186",
  },
};

function ViewAdminProviderGroupProviderDetails() {
  const location = useLocation();
  const navigation = useNavigate();
  const classes = settingStyle();
  const uuid = location && location.state && location.state.providerGroupUuid;
  const [isAdminEditProviderModalOpen, setIsAdminEditProviderModalOpen] =
    useState(false);
  const providerId = location && location.state && location.state.providerId;
  const [tenantId] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [providerDetails, setProviderDetails] = useState<{}>({});
  const [provider, setProvider] = useState<any>({
    uuid: "",
  });
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const { id: providerGroupUuid } = useParams();
  useEffect(() => {
    getUserById();
    getAllRolesWithDefault();
  }, []);

  const getUserById = () => {
    setIsLoading(true);
    setProvider((prev: any) => ({
      ...prev,
      uuid: providerId,
    }));
    try {
      providerGroupService
        .getProviderById(tenantId, providerId)
        .then((user: any) => {
          if (user?.data && user.data?.data) {
            setProviderDetails(user.data.data);
            setIsLoading(false);
          }
        });
    } catch (_error) {
      setIsLoading(false);
    }
  };

  const handleEditButton = () => {
    setIsAdminEditProviderModalOpen(true);
  };

  const onBackClick = () => {
    navigation(-1);
  };

  const getAllRolesWithDefault = () => {
    try {
      providerGroupService
        .getAllRolesWithDefault(tenantId, 0, 10, providerGroupUuid)
        .then((roles: any) => {
          if (roles?.data && roles.data?.data) {
            setUserRoles(roles.data.data.content);
          }
        });
    } catch (error) {}
  };

  return (
    <Grid className={classes.mainGrid}>
      <Grid container>
        <Grid
          item
          sx={{ display: "flex", alignItems: "center", color: "#004186" }}
          xs={11}
        >
          <ArrowBackIcon
            onClick={onBackClick}
            sx={{ cursor: "pointer", marginRight: "5px" }}
          ></ArrowBackIcon>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            {"Provider User"}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          {/* <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={() => setIsAdminEditProviderModalOpen(true)} >
            <Typography sx={{ color: 'white' }}>{'Edit Profile'}</Typography>
          </ButtonBase> */}
          <ButtonBase sx={sxs.buttonBaseChangePass} onClick={handleEditButton}>
            <ModeEditOutlineOutlinedIcon sx={{ width: "0.8em" }} />
            <Typography sx={sxs.buttonBaseTypo}>{EDIT_PROFILE}</Typography>
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid item>
        <ProviderProfile
          isLoading={isLoading}
          providerDetails={providerDetails}
          source={ADMIN}
          providerGroupId={uuid}
          providerId={providerId}
        />
      </Grid>
      {isAdminEditProviderModalOpen && (
        <AddEditProviderUser
          userRolesList={userRoles}
          // insuranceAcceptedList={[]}
          providerGroupSpecialities={[]}
          providerLicensedStateList={[]}
          providerWorkLocationList={[]}
          title={EDIT_PROFILE}
          providerUuid={provider}
          source={ADMIN}
          refetch={getUserById}
          open={isAdminEditProviderModalOpen}
          setOpen={() => setIsAdminEditProviderModalOpen(false)}
          scroll="auto"
        />
      )}
    </Grid>
  );
}

export default AppLayout(ViewAdminProviderGroupProviderDetails, {
  source: ADMIN,
});
