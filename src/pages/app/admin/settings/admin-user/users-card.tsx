import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  ButtonBase,
  Dialog,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedInUser } from "../../../../../components/common/enums-and-interfaces/common-functions";
import { findUnionById } from "../../../../../components/common/helper";
import Loading from "../../../../../components/common/spinner/loading";
import AddEditProviderUser from "../../../../../components/core/add-edit-provider-user/add-edit-provider-user";
import AddEditUserModal, {
  toCamelCase,
} from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import {
  useProviderGroupControllerServiceGetProviderGroupById,
  useUserControllerServiceActivateUser,
  useUserControllerServiceGetUsers,
  useUserControllerServiceSendEmailForSetPassword,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import providerGroupService from "../../../../../service/provider-group--service";
import { formButtonStyle } from "../../../../../styles/common";
import { Enums } from "../../provider-groups/common-files/enums";
import { ProviderGroupUuidContext } from "../../provider-groups/details/provider-groups/provider-groups-admin";
import UserProfileDialog from "../view-profile";
import moment from "moment";

export const userCardStyles = makeStyles(() => {
  return {
    grid: {
      overflow: "hidden",
    },
    body: {
      //height: "120px",
    },
    buttonBaseViewProfle: {
      height: "60px",
      width: "50%",
      // borderTop: "2px solid #1A1A1A1A !important",
      // borderLeft: "none !important",
      // borderBottom: "none !important",
    },
    viewTypo: {
      color: "#004186 !important",
    },
    roleGrid: {
      display: "flex",
      justifyContent: "end",
      marginBottom: "10px !important",
    },
    roleGridSub1: {
      width: "100px !important",
      backgroundColor: "#DAEAF8 !important",
      padding: "2px 5px",
      borderRadius: "14px",
      display: "flex",
      justifyContent: "center",
    },
    roleGridSub2: {
      display: "flex",
      justifyContent: "center",
    },
    resentLink: {
      color: "#36588C !important",
      textDecorationLine: "underline !important",
    },
    buttonBaseEditProfle: {
      height: "60px",
      width: "50%",
      // border: "2px solid #1A1A1A1A !important",
      // borderLeft: "none !important",
      // borderRight: "none !important",
      // borderBottom: "none !important",
    },
    email: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "#1A1A1ACC !important",
    },
    typoField: {
      color: "#1A1A1A80 !important",
      fontSize: "14px !important",
      fontWeight: "bold !important",
      lineHeight: "2rem !important",
    },
    typoValue: {
      color: "#1A1A1ACC !important",
      fontSize: "14px !important",
      lineHeight: "2rem !important",
      fontWeight: "bold !important",
      opacity: 1,
    },
    colonStyle: {
      display: "flex",
    },
    avatarGrid: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "15px !important",
      borderLeft: "none !important",
      borderRight: "none !important",
      borderBottom: "none !important",
      border: " 2px solid #1A1A1A1A !important",
    },
    avatarStyle: {
      height: "100px !important",
      width: "100px !important",
      marginTop: "10px !important",
    },
    role: {
      color: "#36588C !important",
    },
    cardGrid: {
      padding: "15px 15px 0px",
      border: "1px solid #1A1A1A33 !important",
      borderRadius: "10px",
      background: "white !important",
    },
    mainGrid: {
      //margin: "0px 20px 20px 13px !important",
    },
    activeCard: {
      background: "#1A1A1A0F",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      padding: "2px",
      justifyContent: "center",
      cursor: "pointer",
      color: "#00B917 !important",
    },
    inactiveCard: {
      background: "#1A1A1A0F",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      padding: "2px",
      justifyContent: "center",
      cursor: "pointer",
    },
    notActiveCard: {
      background: "#1A1A1A0F",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      padding: "2px",
      justifyContent: "center",
      fontSize: "12px !important",
    },
    activeText: {
      fontSize: "12px !important",
      color: "#00B917 !important",
      fontWeight: "bold",
    },
    notActivatedText: {
      fontSize: "12px !important",
      color: "#000000 !important",
      fontWeight: "bold",
    },
    inactiveText: {
      fontSize: "12px !important",
      color: "#000000 !important",
      fontWeight: "bold",
    },
    title: {
      color: "#1B5984 !important",
      fontWeight: "bold !important",
    },
    addButtonTypo: {
      color: "#ffffff !important",
      display: "flex",
      paddingRight: "2px",
      cursor: "pointer",
      opacity: 0.9,
    },
    addUserRoleBtnTypo: {
      color: "#ffffff",
      display: "flex",
    },
  };
});

interface UserData {
  id: number;
  uuid: string;
  iamId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  active: boolean;
  archive: boolean;
  avatar: string | null;
  newAvatar: string | null;
  role: {
    name: "";
  };
  tenantKey: string | null;
  lastLogin: string | null;
  roleType: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface UersCardProps {
  headerHide?: any;
  refetchUsers?: any;
}

function UsersCard(props: UersCardProps) {
  const classes = userCardStyles();
  const [openEditProfileCardModal, setOpenEditProfileCardModal] =
    useState(false);
  const [openProviderEditModal, setOpenProviderEditModal] = useState(false);
  const [providerData, setProviderData] = useState<UserData>();
  const [openUserProfile, setUserProfile] = useState(false);
  const [show, setShow] = useState(false);
  const [refetchData] = useState(false);
  const [profileOpen, setProfileOpen] = useState<UserData>();
  const [profileData, setProfileData] = useState<UserData>();
  const [userData, setUserData] = useState<UserData[]>();
  const pageable = {
    page: 0,
    size: 10,
    sort: ["descending"],
  };
  const navigate = useNavigate();
  const [pageableData, setPageableData] = useState(pageable);
  const { data, refetch: recallGetUsers } = useUserControllerServiceGetUsers({
    ...pageableData,
    providerGroupUuid: getLoggedInUser()?.providerGroup,
  });

  const { mutateAsync, isSuccess } = useUserControllerServiceActivateUser();
  const [openAddNewUserModal, setOpenAddNewUserModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const sentinelRef = useRef(null);

  const { mutateAsync: sendLink } =
    useUserControllerServiceSendEmailForSetPassword();

  const setUsersCard = async (userDataList: any) => {
    await setUserData(findUnionById(userData, userDataList, "uuid"));
  };

  useEffect(() => {
    if (!!data) {
      const userDataList = data?.data?.content || [];
      setUsersCard(userDataList);
      setLoading(false);
    }
  }, [data, !openProviderEditModal]);

  useEffect(() => {
    if (props.headerHide) {
      setShow(true);
    }
  }, [props.headerHide]);

  useEffect(() => {
    if (isSuccess) {
      recallGetUsers();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (props?.refetchUsers) recallGetUsers();
  }, [props?.refetchUsers]);

  useEffect(() => {
    if (refetchData) recallGetUsers();
  }, [refetchData]);

  let { id } = useParams();
  let providerGroupUuid = (id as string) || getLoggedInUser().providerGroup;
  const providerGrpUuid = useContext(ProviderGroupUuidContext);
  const [userRoles, setUserRoles] = useState<any[]>([]);

  const providerGroup = useProviderGroupControllerServiceGetProviderGroupById({
    uuid: providerGroupUuid || "",
  })?.data?.data;

  const provider = useSelector(
    (state: any) => state.commonReducer.userDetail?.data
  );

  const [tenantId] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );

  const [providerGroupSpecialities, setProviderGroupSpecialities] = useState<
    any[]
  >([]);
  const [providerLicensedStateList, setProviderLicensedStateList] = useState<
    any[]
  >([]);
  const [providerWorkLocationList, setProviderWorkLocationList] = useState<
    any[]
  >([]);

  const getWorkLocations = async () => {
    await providerGroupService
      .getAllLocations(
        tenantId,
        0,
        10,
        "created",
        "desc",
        "",
        providerGroupUuid
      )
      .then((res: any) => {
        if (res?.data?.data && res.data.data.content) {
          setProviderWorkLocationList(res.data.data.content);
        }
      });
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

  const getAllSpecialities = async () => {
    await providerGroupService
      .getAllSpecialities(tenantId, 0, 10)
      .then((specialities: any) => {
        if (specialities?.data && specialities.data?.data) {
          setProviderGroupSpecialities(specialities.data.data.content);
        }
      });
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

  useEffect(() => {
    getWorkLocations();
    getAllLicensedStates();
    getAllSpecialities();
    getAllRolesWithDefault();
  }, []);

  const handleEditProfileButton = (data: UserData) => {
    if (data.roleType === "STAFF" || data.roleType === "ADMIN") {
      setOpenEditProfileCardModal(true);
      setProfileData(data);
    } else if (data.roleType === "PROVIDER") {
      setOpenProviderEditModal((item) => !item);
      setProviderData(data);
    }
  };

  const handleProfile = (user: UserData) => {
    if (user.roleType === "STAFF" || user.roleType === "ADMIN") {
      setProfileOpen(user);
      setUserProfile(true);
    } else if (user.roleType === "PROVIDER") {
      const ProviderUuid = user.uuid;
      navigate("/provider/settings/provider-profile", {
        state: { uuid: ProviderUuid },
      });
    }
  };

  const handleActivateUser = (user: UserData) => {
    mutateAsync({ email: user?.email, active: !user?.active });
    recallGetUsers();
  };

  const handleAddNewUserButton = () => {
    setOpenAddNewUserModal(true);
  };

  const resendLink = (user: any) => {
    let requestBody = {
      email: user?.email || "",
      name: `${user?.firstName} ${user?.lastName}`,
      uuid: user?.uuid,
    };
    sendLink({ requestBody: requestBody });
  };
  const handleScroll = () => {
    const sentinelElement: any = sentinelRef.current;
    if (!sentinelElement) return;

    const scrollPosition =
      sentinelElement.scrollTop + sentinelElement.clientHeight;
    const triggerPosition = sentinelElement.scrollHeight;

    if (scrollPosition >= triggerPosition) {
      setPageableData((prevPage) => {
        return {
          ...prevPage,
          page: prevPage.page + 1,
        };
      });
    }
  };

  useEffect(() => {
    const sentinelElement = sentinelRef.current as any;
    if (!sentinelElement) return;

    // Attach the scroll event listener to the div element
    sentinelElement.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      sentinelElement.removeEventListener("scroll", handleScroll);
    };
  }, [sentinelRef]);

  const convertSecondsToDate = (lastTime: any) => {
    if (!lastTime) return "";
    const lastLogin = moment(lastTime).format("MM-DD-yyyy hh:mm");
    return lastLogin;
  };

  return (
    <Grid className={classes.grid}>
      {!show && (
        <Grid item mb={2}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h3" className={classes.title}>
              Admin Users
            </Typography>
            <Grid item sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleAddNewUserButton}
              >
                <span className={classes.addButtonTypo}>
                  <AddIcon />
                </span>
                <Typography className={classes.addUserRoleBtnTypo} variant="h5">
                  Add User
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      )}
      {loading && <Loading />}
      <div ref={sentinelRef} style={{ height: "49rem", overflow: "auto" }}>
        <Grid
          container
          className={classes.mainGrid}
          columnGap={"1.55%"}
          rowGap={2}
        >
          {userData?.length !== 0 &&
            userData?.map((user: UserData) => (
              <>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2.86}
                  className={classes.cardGrid}
                  key={user.uuid}
                >
                  <Grid container spacing={1}>
                    <Grid item lg={8} md={8} sm={8}>
                      <Typography variant="h2">
                        {`${user.firstName || ""} ${user.lastName || ""}  `}
                      </Typography>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4}>
                      <Box
                        className={`${
                          !user.emailVerified
                            ? classes.notActiveCard
                            : user.active
                            ? classes.activeCard
                            : classes.inactiveCard
                        }`}
                        onClick={() => handleActivateUser(user)}
                      >
                        <Typography
                          // className={`${
                          //   !user.emailVerified
                          //   ?  classes.notActiveCard
                          //   : !user.active
                          //   ? classes.inactiveCard
                          //   :classes.activeCard
                          // }`}
                          sx={
                            user?.active && user?.emailVerified
                              ? { fontSize: "12px", color: "#00B917" }
                              : !user?.emailVerified
                              ? { fontSize: "12px" }
                              : { fontSize: "12px", color: "#ff0000" }
                          }
                        >
                          {!user?.emailVerified
                            ? "Not Activated"
                            : user.active
                            ? "Active"
                            : "Inactive"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      display={"flex"}
                      justifyContent={"space-between"}
                      className={classes.roleGrid}
                    >
                      <Typography
                        fontSize={"12px"}
                        fontWeight={"bold"}
                        sx={{ background: "#e7f8ff" }}
                        border={"1px solid #e7f8ff"}
                        borderRadius={"10px"}
                        px={2}
                        py={"0.5px"}
                      >
                        {user?.role?.name}
                      </Typography>
                      {/* {user?.role?.name && (<Grid item className={classes.roleGridSub1}>
                      {" "}
                      <Typography variant="body2" className={classes.role}>
                        {user?.role?.name}
                      </Typography>
                    </Grid>)} */}
                      {!user?.emailVerified && (
                        <Grid item lg={4} className={classes.roleGridSub2}>
                          <ButtonBase
                            className={classes.resentLink}
                            onClick={() => resendLink(user)}
                          >
                            Resend Link
                          </ButtonBase>
                        </Grid>
                      )}
                    </Grid>

                    <Grid item xs={12} className={classes.avatarGrid}>
                      <Avatar
                        src={user?.avatar || undefined}
                        className={classes.avatarStyle}
                      ></Avatar>
                    </Grid>

                    <Grid item lg={12}>
                      <Grid container>
                        <Grid container xs={12}>
                          <Grid
                            item
                            md={4}
                            container
                            className={classes.colonStyle}
                          >
                            <Typography
                              //variant="h4"
                              className={classes.typoField}
                            >
                              Last Login
                            </Typography>
                          </Grid>
                          <Grid item md={1}>
                            <Typography className={classes.typoValue}>
                              :
                            </Typography>
                          </Grid>
                          <Grid item md={7}>
                            <Typography
                              // variant="subtitle1"
                              className={classes.typoValue}
                            >
                              {convertSecondsToDate(user.lastLogin)}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container xs={12}>
                          <Grid
                            item
                            md={4}
                            container
                            className={classes.colonStyle}
                          >
                            <Typography
                              //variant="h4"
                              className={classes.typoField}
                            >
                              Contact
                            </Typography>
                            {/* <Typography className={classes.typoValue}>
                            :
                          </Typography> */}
                          </Grid>
                          <Grid item md={1}>
                            <Typography className={classes.typoValue}>
                              :
                            </Typography>
                          </Grid>
                          <Grid item md={7}>
                            <Typography
                              // variant="subtitle1"
                              className={classes.typoValue}
                            >
                              {user.phone || "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container xs={12}>
                          <Grid
                            item
                            xs={4}
                            container
                            className={classes.colonStyle}
                          >
                            <Typography
                              //variant="h4"
                              className={classes.typoField}
                            >
                              Email Id
                            </Typography>
                            {/* <Typography className={classes.typoValue}>
                            :
                          </Typography> */}
                          </Grid>
                          <Grid item xs={1}>
                            <Typography className={classes.typoValue}>
                              :
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography
                              // variant="subtitle1"
                              className={classes.typoValue}
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {user.email || "-"}
                            </Typography>
                          </Grid>
                        </Grid>
                        {/* <Grid container xs={12}>
                          <Grid
                            item
                            xs={4}
                            container
                            className={classes.colonStyle}
                          >
                            <Typography className={classes.typoField}>
                              Role Type
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography className={classes.typoValue}>
                              :
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography
                              className={classes.typoValue}
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {toCamelCase(user.roleType) || "-"}
                            </Typography>
                          </Grid>
                        </Grid> */}
                        {/* <Grid item lg={4} md={4}>
                        <Typography
                          // variant="h4"
                          className={classes.typoField}
                        >
                          Contact
                        </Typography>
                      </Grid>
                      <Grid item lg={7} md={8}>
                        <Typography
                          // variant="subtitle1"
                          className={classes.typoValue}
                        >
                          {user.phone || "-"}
                        </Typography>
                      </Grid>

                      <Grid item lg={4} md={4}>
                        <Typography
                          // variant="h4"
                          className={classes.typoField}
                        >
                          Email Id
                        </Typography>
                      </Grid>
                      <Grid item lg={7} md={8}>
                        <Typography
                          // variant="subtitle1"
                          title={user.email}
                          className={classes.typoValue}
                        >
                          {user.email || "-"}
                        </Typography>
                      </Grid> */}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} mt={1}>
                      <Divider></Divider>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", paddingTop: "0px !important" }}
                    >
                      <ButtonBase
                        className={classes.buttonBaseViewProfle}
                        onClick={() => handleProfile(user)}
                      >
                        <Typography className={classes.viewTypo}>
                          View Profile
                        </Typography>
                      </ButtonBase>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <ButtonBase
                        className={classes.buttonBaseEditProfle}
                        onClick={() => handleEditProfileButton(user)}
                        disabled={!user?.active}
                      >
                        <Typography className={classes.viewTypo}>
                          Edit Profile
                        </Typography>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ))}
          {userData?.length == 0 && (
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              pt={5}
            >
              <Typography variant="h3">Users Not Available!</Typography>
            </Grid>
          )}
        </Grid>
      </div>
      {openEditProfileCardModal && (
        <AddEditUserModal
          title={
            profileData?.roleType === "ADMIN"
              ? "Edit Admin Profile"
              : "Edit Staff Profile"
          }
          open={openEditProfileCardModal}
          source="edit"
          setOpen={setOpenEditProfileCardModal}
          profileDetails={profileData}
          setrefetchData={() => recallGetUsers()}
          scroll="auto"
          isActivateUserPresent={true}
        />
      )}
      {openAddNewUserModal && (
        <AddEditUserModal
          title="Add New Admin User"
          open={openAddNewUserModal}
          user={"admin"}
          setOpen={setOpenAddNewUserModal}
          setrefetchData={() => recallGetUsers()}
          scroll="auto"
          isRolePresent={true}
        />
      )}
      <Dialog
        open={openUserProfile}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <UserProfileDialog
          open={openUserProfile}
          setOpen={setUserProfile}
          usersettingcardsdata={profileOpen}
        />
      </Dialog>
      <Grid>
        <AddEditProviderUser
          providerGrpNpi={providerGroup?.npi || ""}
          userRolesList={userRoles}
          providerGroupSpecialities={providerGroupSpecialities}
          providerLicensedStateList={providerLicensedStateList}
          providerWorkLocationList={providerWorkLocationList}
          title={"Edit Provider User"}
          providerUuid={providerData}
          refetchProviderUser={recallGetUsers}
          source={"Provider"}
          open={openProviderEditModal}
          setOpen={setOpenProviderEditModal}
          scroll="auto"
        />
      </Grid>
    </Grid>
  );
}
export default UsersCard;
