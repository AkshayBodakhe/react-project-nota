import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Button, Drawer, Grid, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import DepartmentModal from "../../../../../../components/common/modal/department-modal";
import LocationModal from "../../../../../../components/common/modal/location-modal";
import AddEditProviderUser from "../../../../../../components/core/add-edit-provider-user/add-edit-provider-user";
import { adminConstants } from "../../../../../../constants/admin";
import { formButtonStyle } from "../../../../../../styles/common";
import ProviderGroupDepartment, {
  Departments,
} from "../../../../admin/provider-groups/details/provider-group-department/provider-group-department";
import ProviderGroupLocations from "../../../../admin/provider-groups/details/provider-group-location/provider-group-location";
import UserFilter from "../../../../admin/settings/admin-user/admin-user-filter";
import UsersCard from "../../../../admin/settings/admin-user/users-card";
import RolesAndResponsibility from "../../../../admin/settings/roles-and-responsibility";
import RolesResponsibilityTable from "../../../../admin/settings/roles-responsibility/roles-responsibility-table";
import AddStaffUser from "./add-staff-user";
import GroupInfoForLocationAndDepartment from "./groupInfo-locationDepartment";
import ProviderProfile from "./provider-profile";
import { HeaderTabs } from "../provider-setting-constats";
import { useParams } from "react-router-dom";
import providerGroupService from "../../../../../../service/provider-group--service";
import { useSelector } from "react-redux";
import { useProviderGroupControllerServiceGetProviderGroupById } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { ProviderGroupUuidContext } from "../../../../admin/provider-groups/details/provider-groups/provider-groups-admin";
import { Enums } from "../../../../admin/provider-groups/common-files/enums";
import AddEditProviderGroupData from "../../account-settings/provider-group/add-edit-provider-group";
import { getLoggedInUser } from "../../../../../../components/common/enums-and-interfaces/common-functions";
import useHasPermission from "../../../../../../components/common/useHasPermission";
import { Permission } from "../../../../../../components/common/enums-and-interfaces/enums";
const { ADD_PROVIDER_USER, PROVIDER } = adminConstants;

export const style = makeStyles(() => ({
  tab: {
    // fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  tabSwitchGrid: {
    width: "inherit",
    height: "64vh",
    // overflowY: "scroll",
  },
  addButtonTypo: {
    color: "#ffffff !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "2px",
    opacity: 0.9,
  },
  addUserRoleBtnTypo: {
    color: "#ffffff",
    display: "flex",
    // paddingRight: "12px",
  },
}));

interface ProviderOptionProps {
  setIsSetting?: any;
  selectedIndex?: number;
}

const { ADD_STAFF_USER } = adminConstants;
function ProviderGroupOptions(props: ProviderOptionProps) {
  const classes = style();
  const [value, setValue] = React.useState(props.selectedIndex || 0);
  const [open, setOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [openDepartment, setOpenDepartment] = useState(false);
  const [isgetDepartment, setIsGetDepartment] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openAddProviderUser, setOpenAddProviderUser] = useState(false);
  const [openAddNewRoleModal, setOpenAddNewRoleModal] = useState(false);
  const [roles, setUserRoles] = useState([]);
  const [providerGroupSpecialities, setProviderGroupSpecialities] = useState<
    any[]
  >([]);
  const [refetchUsers, setRefetchUsers] = useState(false);
  const [providerLicensedStateList, setProviderLicensedStateList] = useState<
    any[]
  >([]);
  const [providerWorkLocationList, setProviderWorkLocationList] = useState<
    any[]
  >([]);
  const [tenantId] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const [refetch, setRefetch] = useState(false);
  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };
  const { id } = useParams();
  let providerGroupUuid = (id as string) || getLoggedInUser().providerGroup;

  let npi = useProviderGroupControllerServiceGetProviderGroupById({
    uuid: providerGroupUuid || "",
  })?.data?.data?.npi;

  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
    npi = providerInfo.npi;
  }
  const canViewUser = useHasPermission(Permission.USER);
  const canViewLocation = useHasPermission(Permission.LOCATIONS);
  const canViewDepartment = useHasPermission(Permission.DEPARTMENT);
  const canViewRolesAndResponsibilities = useHasPermission(
    Permission.ROLES_AND_RESPONSIBILITIES
  );

  const providerGrpUuid = useContext(ProviderGroupUuidContext);
  const handleClickOpen = () => {
    if (value == 1) setOpen(true);
    else if (value == 2) setOpenDepartment(true);
    else if (value == 4) setOpenAddNewRoleModal(true);
  };

  const provider = useSelector(
    (state: any) => state.commonReducer.userDetail?.data
  );
  const providerDetails = {
    uuid: provider.userUuid,
  };

  const getAllRolesWithDefault = () => {
    try {
      providerGroupService
        .getAllRolesWithDefault("", 0, 50, providerGroupUuid)
        .then((roles: any) => {
          if (roles?.data && roles.data?.data) {
            setUserRoles(roles.data.data.content);
          }
        });
    } catch (error) {}
  };

  const getAllLicensedStates = async () => {
    try {
      await providerGroupService
        .getAllLicensedStates(tenantId)
        .then((states: any) => {
          if (states?.data && states.data?.data) {
            setProviderLicensedStateList(states.data.data.content);
          }
        });
    } catch (_error) {}
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog((item) => !item);
  };

  const providerGroup = useProviderGroupControllerServiceGetProviderGroupById({
    uuid: providerGrpUuid || "",
  })?.data?.data;

  const getAllSpecialities = async () => {
    await providerGroupService
      .getAllSpecialities(tenantId, 0, 10)
      .then((specialities: any) => {
        if (specialities?.data && specialities.data?.data) {
          setProviderGroupSpecialities(specialities.data.data.content);
        }
      });
  };

  useEffect(() => {
    getAllRolesWithDefault();
    getAllSpecialities();
    getAllLicensedStates();
  }, []);
  return (
    <Grid
      container
      sx={{
        background: "#fff",
        boxShadow: "0px 0px 8px #00000029",
        borderRadius: "5px",
        opacity: 1,
        padding: "10px",
      }}
    >
      <Grid item xs={12}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item sx={{ display: "flex", gap: "8px", color: "#004186" }}>
            <ArrowBackOutlinedIcon
              sx={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => props.setIsSetting()}
            />
            <Typography variant="h2" sx={{ fontWeight: 600 }}>
              Provider Group
            </Typography>
          </Grid>
          {value == 0 && (
            <Grid item>
              <Button
                sx={formButtonStyle.editProfileBtn}
                onClick={() => handleOpenDialog()}
              >
                <EditOutlinedIcon sx={{ color: "#1B5984", fontSize: "18px" }} />
                &nbsp;
                <Typography
                  variant="h5"
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  Edit Profile
                </Typography>
              </Button>
            </Grid>
          )}
          {value == 1 && canViewLocation && (
            <Grid item>
              <Button
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleClickOpen}
              >
                <AddOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
                &nbsp;
                <Typography
                  variant="h5"
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  Add Location
                </Typography>
              </Button>
            </Grid>
          )}
          {value == 2 && canViewDepartment && (
            <Grid item>
              <Button
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleClickOpen}
              >
                <AddOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
                &nbsp;
                <Typography
                  variant="h5"
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  Add Department
                </Typography>
              </Button>
            </Grid>
          )}
          {value == 4 && (
            <Grid item>
              <Button
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleClickOpen}
              >
                <AddOutlinedIcon sx={{ color: "#fff", fontSize: "20px" }} />
                &nbsp;
                <Typography
                  variant="h5"
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  Add New Role
                </Typography>
              </Button>
            </Grid>
          )}

          {value == 3 && canViewUser && (
            <Grid
              item
              sx={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              {/* <Grid item>
                <Button
                  sx={formButtonStyle.editProfileBtn}
                  onClick={() => setShowFilter(true)}
                >
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                    Filters
                  </Typography>
                </Button>
              </Grid> */}
              <Grid item>
                <Button
                  sx={formButtonStyle.editProfileBtn}
                  onClick={() => setOpenAddProviderUser(!openAddProviderUser)}
                >
                  <AddOutlinedIcon sx={{ fontSize: "16px" }} />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                    Add Provider User
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  sx={formButtonStyle.editProfileBtn}
                  onClick={() => {
                    setOpenAddUser(true);
                  }}
                >
                  <AddOutlinedIcon sx={{ fontSize: "16px" }} />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                    Add Staff User
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {HeaderTabs.map((tab: any) => {
                return (
                  <Tab
                    key={tab.label}
                    className={classes.tab}
                    sx={{ textTransform: "capitalize" }}
                    label={tab.label}
                  />
                );
              })}
            </Tabs>
          </Grid>
          {(value == 1 || value == 2) && (
            <Grid item xs={12} mt={2}>
              <GroupInfoForLocationAndDepartment />
            </Grid>
          )}
          {showFilter && (
            <UserFilter setClose={() => setShowFilter(!showFilter)} />
          )}
          <Grid item xs={12} mt={2}>
            {value == 0 && (
              <ProviderProfile refetchData={refetch} callApi={!openDialog} />
            )}
            {value == 1 &&
              (!canViewLocation ? (
                <>You do not have access to see Location</>
              ) : (
                <ProviderGroupLocations searchInput={true} />
              ))}
            {value == 2 &&
              (!canViewDepartment ? (
                <>You do not have access to see Department</>
              ) : (
                <ProviderGroupDepartment
                  searchInput={true}
                  isgetDepartment={isgetDepartment}
                  type={Departments.ALL_DEPARTMENT}
                />
              ))}
            {value == 3 &&
              (!canViewUser ? (
                <>You do not have access to see Users</>
              ) : (
                <UsersCard refetchUsers={refetchUsers} headerHide={true} />
              ))}
            {value == 4 &&
              (!canViewRolesAndResponsibilities ? (
                <>You do not have access to see Roles and Responsibilities</>
              ) : (
                <RolesResponsibilityTable headerHide={true} />
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Grid
          style={{
            width: "65vw",
            overflowX: "hidden",
            height: "100vh",
            backgroundColor: "#F5F6F9",
          }}
        >
          <LocationModal
            onCloseDrawer={handleClose}
            dialogTitle={"Add Location"}
            buttonTitle={"Save"}
            providerGroupUuid={providerGroupUuid}
          />
        </Grid>
      </Drawer>
      <Drawer anchor="right" open={openDialog} onClose={handleClose}>
        <AddEditProviderGroupData
          onCloseDrawer={() => {
            handleClose();
            setRefetch(true);
          }}
          title={"Edit Provider Group"}
          providerGroupUuid={providerGroupUuid}
          source={"Edit"}
        />
      </Drawer>
      <DepartmentModal
        open={[openDepartment, setOpenDepartment]}
        onClose={() => setIsGetDepartment(true)}
        providerGroupUuid={providerGroupUuid}
      />
      {openAddProviderUser && (
        <AddEditProviderUser
          providerGrpNpi={npi}
          setRefetchUsers={setRefetchUsers}
          userRolesList={roles}
          // insuranceAcceptedList={insuranceAcceptedList}
          providerGroupSpecialities={[]}
          providerLicensedStateList={[]}
          providerWorkLocationList={[]}
          title={ADD_PROVIDER_USER}
          source={PROVIDER}
          open={openAddProviderUser}
          // refetch={getAllUsers}
          setOpen={setOpenAddProviderUser}
          scroll="auto"
        />
      )}
      {openAddNewRoleModal && (
        <RolesAndResponsibility
          open={openAddNewRoleModal}
          setOpen={setOpenAddNewRoleModal}
          scroll="auto"
          isEditRole={true}
          title="Add New Role"
          // getList={() => refetch()}
        />
      )}
      {openAddUser && (
        <AddStaffUser
          title={ADD_STAFF_USER}
          source="Add"
          open={openAddUser}
          setOpen={setOpenAddUser}
          setRefetchUsers={setRefetchUsers}
        />
      )}
      <Grid>
        {/* <AddEditProviderUser
          providerGrpNpi={providerGroup?.npi || ""}
          userRolesList={roles}
          providerGroupSpecialities={providerGroupSpecialities}
          providerLicensedStateList={providerLicensedStateList}
          providerWorkLocationList={providerWorkLocationList}
          title={"Edit Profile"}
          providerUuid={providerDetails}
          source={"Provider"}
          open={openDialog}
          setOpen={setOpenDialog}
          scroll="auto"
        /> */}
      </Grid>
    </Grid>
  );
}

export default ProviderGroupOptions;
