import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Paper,
  InputBase,
  ButtonBase,
  InputAdornment,
  Autocomplete,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { columns } from "./user-table";
import {
  commonWidget,
  formButtonStyle,
  iconArrowWort,
  navigateToDetails,
} from "../../../../../../styles/common";
import { adminConstants } from "../../../../../../constants/admin";
import ActiveInactiveSwitch from "../../../../../../components/common/custom-switch";
import { epochToDateConverter } from "../../../../../../components/common/epoch-to-date-converter";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddEditUserModal from "../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import AddEditProviderUser from "../../../../../../components/core/add-edit-provider-user/add-edit-provider-user";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import theme from "../../../../../../theme";
import SearchIcon from "@mui/icons-material/Search";
import providerGroupService from "../../../../../../service/provider-group--service";
import Loading from "../../../../../../components/common/spinner/loading";
import { Enums } from "../../common-files/enums";
import { User } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CustomPagination from "../../../../../../components/common/pagination";
import { DeleteDialog } from "../../../../../../components/core/delete-dialog";
import { buttonBaseStyle } from "../../../../../../components/core/view-provider-details/provider-profile-details";
import { useDispatch } from "react-redux";
// import { setAlert } from "../../../../../../redux/actions/snackbar/alert.action";
import { capitalizeFirstLetter } from "../../common-files/functions";
import { useContext } from "react";
import { ProviderGroupUuidContext } from "../provider-groups/provider-groups-admin";
import {
  useProviderGroupControllerServiceGetProviderGroupById,
  useUserControllerServiceSearchLocationUser,
} from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { alertAction } from "../../../../../../store/features/common-actions/snackbar/alertSlice";
import { PaginationState } from "../../../../../../components/common/enums-and-interfaces/interfaces";
import { useSelector } from "react-redux";
import { checkActiveProviderGroup } from "../../../../../../components/common/helper";

const {
  ADD_USER,
  PROVIDER_USER,
  STAFF_USER,
  ChECK_PROVIDER,
  CHECK_STAFF,
  ADMIN,
  ADD_STAFF_USER,
  EDIT_STAFF_USER,
  ADD_PROVIDER_USER,
  EDIT_PROFILE,
  SEARCH_HERE,
} = adminConstants;

const providerGroupUsersStyles = {
  tableContainer: {
    overflowX: "auto",
    width: "100% !important",
    background: "white",
    marginTop: "20px",
    maxHeight: "350px !important",
    overflowY: "scroll !important",
  },

  tablePagination: {
    border: "none !important",
    background: "white",
  },

  tableCell2: {
    align: "left",
    paddingBottom: "16px",
    paddingLeft: "9px",
    backgroundColor: "#DAEAF8 !important",
    position: "relative",
  },

  actionIcon: {
    cursor: "pointer",
  },

  providerContainer: {
    margin: "10px 0",
    display: "flex",
    justifyContent: "end",
    gap: "5%",
  },

  actionButton: {
    textTransform: "initial",
  },

  tableBodycell: {
    // color: "#1A1A1A80",
    // fontSize: "16px",
    fontSize: "0.875rem",
    fontWeight: "600",
    padding: "5px 10px !important",
    cursor: "pointer",
    color: "#1A1A1ACC !important",
  },

  tableHeadRowContainer: {
    // backgroundColor: "#4C4C4C1A !important",

    "& th": {
      // color: "#1A1A1A",
      backgroundColor: "#DAEAF8 !important",
      borderBottom: "none",
      fontSize: "14px",
      fontWeight: "500",
      padding: "10px 10px !important",
    },
  },

  addButtonTypo: {
    color: "#36588C !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "12px",
  },
};

const commonDepartmentWidget = makeStyles(
  () => ({
    providerFormShortInputField: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "42px !important",
      textAlign: "center",
      padding: "13px 0px 10px 16px",
      fontSize: "16px",
      width: "20.773rem !important",
      "@media (max-width: 820px)": {
        width: "100% !important",
      },
    },
    searchBoxWidth: {
      width: "24rem",
      background: "white",
      "@media (max-width: 820px)": {
        width: "100% !important",
      },
      "@media (max-width: 768px)": {
        width: "100% !important",
      },
    },
    AddressFormLongtInputField2: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "38px",
      textAlign: "center",
      padding: "13px 0px 10px 16px",
      fontSize: "16px",
      alignItems: "center",
      "& input::placeholder": {
        alignItems: "center",
        fontSize: "12.5px",
      },
      "@media (max-width: 820px)": {
        width: "100%",
      },
      "@media (max-width: 768px)": {
        width: "100%",
      },
    },
    inputBoxText2: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: "14px !important",

      lineHeight: "140%",
      color: "",
      width: "100%",
      resize: "vertical",
      minHeight: "15px",
    },
    inputBoxActive2: {
      background: "#FFFFFF 0% no-repeat padding-box !important",
      boxShadow: "0px 0px 6px #00418602 !important",
      border: "1px solid #36588C!important",
      borderRadius: "4px !important",
    },
    addButtonTypo: {
      color: "#ffffff !important",
      display: "flex",
      // paddingLeft: "12px",
      paddingRight: "2px",
      opacity: 0.9,
    },
  }),
  { defaultTheme: theme }
);

export enum USERS {
  LOCATION_USERS = "Location Users",
  ALL_USERS = "All Users",
}

type Users = {
  type: USERS;
  locationUuid?: string;
  hideAction?: boolean;
};

const ProviderGroupUsers = (props: Users) => {
  let { id } = useParams();
  let providerGroupUuid = id as string;

  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
  }

  //const tableClasses = useStyles();
  const navigation = useNavigate();
  const classes = commonDepartmentWidget();
  const dispatch = useDispatch();
  const customWidget = commonWidget();
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "",
    searchString: "",
    totalPages: 0,
    totalElements: 0,
    sortDirection: "",
    status: true,
    state: "",
  });
  // const [staffUsers, setStaffUsers] = useState<Row[]>([]);
  const providerGrpUuid = useContext(ProviderGroupUuidContext);
  const [isAdminAddProviderModalOpen, setIsAdminAddProviderModalOpen] =
    useState(false);
  const [isAdminEditProviderModalOpen, setIsAdminEditProviderModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsOpenDeleteModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [providerGroupUserList, setProviderGroupUserList] = useState<any[]>([]);
  const [provider, setProvider] = useState<any>({});

  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tenantId] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const [value, setValue] = useState<any>(null);
  const [userName, setUserName] = useState("");

  const [providerWorkLocationList, setProviderWorkLocationList] = useState<
    any[]
  >([]);
  const [providerLicensedStateList, setProviderLicensedStateList] = useState<
    any[]
  >([]);
  const [providerGroupSpecialities, setProviderGroupSpecialities] = useState<
    any[]
  >([]);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const providerGroup = useProviderGroupControllerServiceGetProviderGroupById({
    uuid: providerGrpUuid || "",
  })?.data?.data;

  const context = useOutletContext() as any[];

  const providerContextData = context && context[1];
  const isActiveProvider = checkActiveProviderGroup(providerContextData);

  const [allUserData, setAllUserData] = useState<any>();

  // const [insuranceAcceptedList, setInsuranceAcceptedList] = useState<any[]>([]);
  useEffect(() => {
    getWorkLocations();
    getAllLicensedStates();
    getAllSpecialities();
    getAllRolesWithDefault();
    // getAllInsuranceAccepted();
  }, []);

  useEffect(() => {
    if (pagination.searchString) {
      const timeOut = setTimeout(() => {
        getAllUsers();
      }, 3000);

      return () => {
        clearTimeout(timeOut);
      };
    } else {
      getAllUsers();
    }
  }, [pagination.searchString, pagination.page, pagination.size]);

  useEffect(() => {
    if (props.locationUuid && userName) {
      const timeOut = setTimeout(() => {
        searchLocationUser(props.locationUuid || "");
      }, 500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [userName]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const getAllUsers = async () => {
    let response: any;
    setIsLoading(true);
    if (props.type === USERS.LOCATION_USERS && props.locationUuid) {
      try {
        await providerGroupService
          .getLocationUsers(
            tenantId,
            props.locationUuid,
            pagination.page,
            pagination.size
          )
          .then((users: any) => {
            searchLocationUser(props.locationUuid || "");
            if (users?.data && users.data?.data) response = users.data.data;
          });
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      try {
        await providerGroupService
          .getAllUsers(
            tenantId,
            pagination.page,
            pagination.size,
            pagination.searchString,
            providerGroupUuid
          )
          .then((users: any) => {
            if (users?.data && users.data?.data) response = users.data.data;
          });
      } catch (_error) {
        setIsLoading(false);
      }
    }
    if (response) {
      const resultRows = response.content?.map((staffuser: any) => {
        return {
          id: staffuser.id,
          uuid: staffuser.uuid,
          avatar: staffuser.avatar,
          newAvatar: staffuser.newAvatar,
          userName: `${staffuser.firstName} ${staffuser.lastName}`,
          firstName: staffuser.firstName,
          lastName: staffuser.lastName,
          gender: staffuser.gender,
          departmentName:
            staffuser.departmentName?.length > 0
              ? staffuser.departmentName.join(", ")
              : ["-"],
          role: staffuser.role,
          roleType: staffuser.roleType,
          email: staffuser.email,
          phone: staffuser.phone,
          lastLogin: epochToDateConverter(staffuser.lastLogin),
          active: staffuser.active,
          portal: staffuser?.portal,
        };
      });
      setProviderGroupUserList(resultRows);
      setPagination((prev: any) => ({
        ...prev,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
      }));
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   setAllUsers();
  // }, []);

  // const { data: searchLocationData } =
  //   useUserControllerServiceSearchLocationUser({
  //     locationId: props.locationUuid || "",
  //     userName: userName,
  //     page: 0,
  //     size: 20,
  //   });

  // useEffect(() => {
  //   console.log("searchLocationData", [
  //     searchLocationData && searchLocationData.data,
  //   ]);
  //   setSearchResult([searchLocationData && searchLocationData?.data]);
  // }, [searchLocationData, userName]);

  // const setAllUsers = async () => {
  //   try {
  //     await providerGroupService
  //       .getAllUsers(
  //         tenantId,
  //         pagination.page,
  //         pagination.size,
  //         pagination.searchString,
  //         providerGroupUuid
  //       )
  //       .then((users: any) => {
  //         if (users?.data && users.data?.data) {
  //         }
  //         setAllUserData(users.data.data.content);
  //       });
  //   } catch (error) {
  //     console.log("Error while fetching users");
  //   }
  // };

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
        .getAllRolesWithDefault(tenantId, 0, 10, id)
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

  const getAllSpecialities = async () => {
    await providerGroupService
      .getAllSpecialities(tenantId, 0, 10)
      .then((specialities: any) => {
        if (specialities?.data && specialities.data?.data) {
          setProviderGroupSpecialities(specialities.data.data.content);
        }
      });
  };

  // const getAllInsuranceAccepted = async () => {
  //   await providerGroupService.getAllInsuranceAccepted(tenantId, 0, 10).then((insurances: any) => {
  //     if (insurances?.data && insurances.data?.data) {
  //       setInsuranceAcceptedList(insurances.data.data.content)
  //     }
  //   })
  // }

  useEffect(() => {
    searchLocationUser(props.locationUuid || "");
  }, [props.locationUuid]);

  const searchLocationUser = (uuid: string) => {
    try {
      providerGroupService
        .searchLocationUsers(
          tenantId,
          uuid,
          userName,
          pagination.page,
          pagination.size
        )
        .then((res) => {
          if (res?.data && res.data?.data) {
            setSearchResult(res.data.data?.content);
          }
        });
    } catch (error) {}
  };

  const handleClose = (user: string) => {
    setAnchorEl(null);
    if (user === CHECK_STAFF) {
      setIsStaffModalOpen(true);
    } else if (user === ChECK_PROVIDER) {
      setIsAdminAddProviderModalOpen(true);
    }
  };

  const handleEventSuccessModalOpen = () => {
    const type = provider?.roleType.toLowerCase();
    providerGroupService
      .deleteUser(
        tenantId,
        type === "provider" ? "provider" : "user",
        provider.uuid
      )
      .then(() => {});

    setIsOpenDeleteModalOpen(false);
    // setSuccessMessage("Allergy Deleted Successfully");
  };

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   console.log(event);
  //   setPagination((prev) => ({ ...prev, page: newPage }));
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPagination((prev) => ({ ...prev, page: 0 }));
  // };

  const viewUserDetails = (staffUser: any) => {
    if (props.type === USERS.LOCATION_USERS) return;
    if (staffUser.role?.name === User.roleType.PROVIDER) {
      navigation("provider-details", {
        state: {
          providerId: staffUser.uuid,
        },
      });
    } else {
      navigation("staff-details", {
        state: {
          providerId: staffUser.uuid,
        },
      });
    }
  };

  const checkSwitchStatus = (e: any, staffUser: any) => {
    setProviderGroupUserList((prev: any) => {
      return prev.map((res: any) => {
        if (res.uuid === staffUser.uuid) {
          return {
            ...res,
            active: e.target.checked,
          };
        }
        return res;
      });
    });

    try {
      providerGroupService
        .activateOrDeactivateUser(tenantId, e.target.checked, staffUser.email)
        .then((res: any) => {
          if (res?.status >= 200 && res.status <= 299) {
            getAllUsers();
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data.message,
                severity: "success",
              })
            );
          } else
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data?.message || res.data?.error,
                severity: "error",
              })
            );
        });
    } catch (error) {}
  };

  const editUserDetails = (staffUser: any) => {
    if (staffUser.role?.name === User.roleType.PROVIDER) {
      setProvider(staffUser);
      setIsAdminEditProviderModalOpen(true);
    } else {
      setProvider(staffUser);
      setIsEditStaffModalOpen(true);
    }
  };

  // const deleteUser = (staffUser: any) => {
  //   setIsOpenDeleteModalOpen(true);
  //   setProvider(staffUser);
  // }

  const handleSearchUsers = (result: string) => {
    setPagination((prev: any) => ({ ...prev, searchString: result }));
  };

  const defaultProps = {
    options: searchResult,
    getOptionLabel: (option: any) => `${option.firstName} ${option.lastName}`,
  };

  const handleAddUser = () => {
    if (value.uuid && props.locationUuid) {
      try {
        providerGroupService
          .assignLocationUser(tenantId, props.locationUuid, value.uuid)
          .then(() => {
            setValue(null);
            setSearchResult([]);
            getAllUsers();
          });
      } catch (_error) {}
    }
  };

  return (
    <React.Fragment>
      <Grid>
        {props.type === USERS.ALL_USERS && (
          <>
            <Box
              sx={{
                ...providerGroupUsersStyles.providerContainer,
                position: "relative",
              }}
            >
              <Paper component="form" className={classes.searchBoxWidth}>
                <InputBase
                  fullWidth
                  classes={{
                    root: classes.AddressFormLongtInputField2,
                    input: classes.inputBoxText2,
                    focused: classes.inputBoxActive2,
                  }}
                  placeholder={SEARCH_HERE}
                  onChange={(e) => handleSearchUsers(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </Paper>
              <ButtonBase
                sx={{
                  ...formButtonStyle.saveButtonStyle,
                  opacity: isActiveProvider ? 0.5 : 1,
                }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                disabled={isActiveProvider}
              >
                <span className={classes.addButtonTypo}>
                  <AddIcon />
                </span>
                {ADD_USER}
              </ButtonBase>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => handleClose(CHECK_STAFF)}>
                  {STAFF_USER}
                </MenuItem>
                <MenuItem onClick={() => handleClose(ChECK_PROVIDER)}>
                  {PROVIDER_USER}
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
        {props.type === USERS.LOCATION_USERS && (
          <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Paper
                sx={{
                  width: "25rem",
                  marginRight: "20px",
                  boxShadow: "0px 0px 8px #00000029",
                }}
              >
                <Autocomplete
                  {...defaultProps}
                  id="controlled-demo"
                  sx={{
                    "& .MuiInput-root .MuiInput-input": {
                      padding: "4px 4px 4px 14px !important",
                    },
                    height: "30px",
                    "& .css-19ssnuc-MuiInputBase-root-MuiInput-root:before ": {
                      borderBottom: "none !important",
                    },
                  }}
                  // options={
                  //   allUserData?.filter((user: any) => user?.active) || []
                  // }
                  value={value}
                  onChange={(_event: any, newValue: any) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search Here"
                      onChange={(e) => setUserName(e.target.value)}
                      variant="standard"
                    />
                  )}
                />
              </Paper>
              <ButtonBase
                sx={{
                  ...formButtonStyle.saveButtonStyle,
                  width: "7rem",
                  background: !value?.uuid ? "#1A1A1A66" : "#1B5984",
                }}
                aria-controls={open ? "basic-menu" : undefined}
                disabled={!value?.uuid}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleAddUser}
              >
                {/* <span className={classes.addButtonTypo}>
                  <AddIcon />
                </span> */}
                {"Add"}
              </ButtonBase>
            </Box>
          </>
        )}
      </Grid>
      {/* {providerGroupUserList.length !== 0 ? ( */}
      <Grid>
        <TableContainer sx={providerGroupUsersStyles.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead
              sx={{
                background: "#fff",
                position: "sticky",
                zIndex: 100,
                top: 0,
              }}
            >
              {props.hideAction && (
                <TableRow className={customWidget.tableHeadRowContainer}>
                  {columns
                    .filter((item) => props.hideAction && item.id !== "action")
                    .map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.label}
                        {column.displaySort && (
                          <SyncAltIcon sx={iconArrowWort} />
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              )}
              {!props.hideAction && (
                <TableRow className={customWidget.tableHeadRowContainer}>
                  {columns
                    // .filter((item) => props.hideAction && item.id !== "action")
                    .map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.label}
                        {column.displaySort && (
                          <SyncAltIcon sx={iconArrowWort} />
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              )}
            </TableHead>
            <TableBody className={customWidget.tableHeadRowContainer}>
              {!isLoading &&
                providerGroupUserList?.map((staffUser: any) => {
                  return (
                    <>
                      {props.hideAction && (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={staffUser?.id}
                        >
                          {columns
                            .filter(
                              (item) => props.hideAction && item.id !== "action"
                            )
                            .map((column) => {
                              if (column.id === "status") {
                                return (
                                  <TableCell
                                    align={column.align}
                                    key={column.id}
                                    sx={providerGroupUsersStyles}
                                    style={{
                                      cursor: "default",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    <ActiveInactiveSwitch
                                      state={staffUser.active}
                                      onChange={(event: any) =>
                                        checkSwitchStatus(event, staffUser)
                                      }
                                    />
                                  </TableCell>
                                );
                              } else if (column.id === "userName") {
                                return (
                                  <TableCell
                                    sx={providerGroupUsersStyles.tableBodycell}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span
                                        style={{
                                          ...navigateToDetails,
                                          textDecoration: "none",
                                        }}
                                        onClick={() =>
                                          viewUserDetails(staffUser)
                                        }
                                      >{`${staffUser.firstName || ""} ${
                                        staffUser.lastName || ""
                                      }`}</span>
                                    </div>
                                    <Typography>
                                      {staffUser.gender || ""}
                                    </Typography>
                                  </TableCell>
                                );
                              } else if (column.id === "phone") {
                                return (
                                  <TableCell
                                    sx={{
                                      ...providerGroupUsersStyles.tableBodycell,
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{ fontWeight: "600" }}
                                    >
                                      {staffUser[column.id] || "-"}
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          color: "#1A1A1A99 !important",
                                          letterSpacing: "0 !important",
                                        }}
                                      >
                                        {staffUser.email || ""}
                                      </Typography>
                                    </Typography>
                                  </TableCell>
                                );
                              } else if (column.id === "action") {
                                return (
                                  <TableCell
                                    align={column.align}
                                    key={column.id}
                                    sx={providerGroupUsersStyles.actionButton}
                                    style={{
                                      cursor: "pointer",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    <ButtonBase
                                      sx={buttonBaseStyle}
                                      style={{ width: "80px", height: "30px" }}
                                      disabled={!staffUser?.active}
                                      onClick={() => editUserDetails(staffUser)}
                                    >
                                      <span
                                        className={customWidget.addButtonTypo}
                                      >
                                        <ModeEditOutlineOutlinedIcon
                                          sx={{ width: "0.8em" }}
                                        />
                                      </span>
                                      <Typography
                                        variant="h5"
                                        className={
                                          customWidget.addUserRoleBtnTypo
                                        }
                                      >
                                        {"Edit"}
                                      </Typography>
                                    </ButtonBase>
                                  </TableCell>
                                );
                              } else if (column.id === "role") {
                                return (
                                  <TableCell
                                    align={column.align}
                                    key={column.id}
                                    sx={providerGroupUsersStyles.tableBodycell}
                                    style={{
                                      cursor: "pointer",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    {capitalizeFirstLetter(
                                      staffUser[column.id]?.name?.replace(
                                        "_",
                                        " "
                                      )
                                    ) ||
                                      capitalizeFirstLetter(staffUser.roleType)}
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell
                                    align={column.align}
                                    key={column.id}
                                    sx={providerGroupUsersStyles.tableBodycell}
                                    style={{
                                      cursor: "default",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    {staffUser[column.id] || "-"}
                                  </TableCell>
                                );
                              }
                            })}
                        </TableRow>
                      )}
                      {!props.hideAction && (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={staffUser?.id}
                        >
                          {columns
                            // .filter(
                            //   (item) => props.hideAction && item.id !== "action"
                            // )
                            .map((column) => {
                              if (column.id === "status") {
                                return (
                                  <TableCell
                                    align={column.align}
                                    key={column.id}
                                    sx={providerGroupUsersStyles}
                                    style={{
                                      cursor: "default",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    <ActiveInactiveSwitch
                                      state={staffUser.active}
                                      onChange={(event: any) =>
                                        checkSwitchStatus(event, staffUser)
                                      }
                                    />
                                  </TableCell>
                                );
                              } else if (column.id === "userName") {
                                return (
                                  <TableCell
                                    sx={providerGroupUsersStyles.tableBodycell}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span
                                        style={{
                                          ...navigateToDetails,
                                          textDecoration: "none",
                                        }}
                                        onClick={() =>
                                          viewUserDetails(staffUser)
                                        }
                                      >{`${staffUser.firstName || ""} ${
                                        staffUser.lastName || ""
                                      }`}</span>
                                    </div>
                                    <Typography>
                                      {staffUser.gender || ""}
                                    </Typography>
                                  </TableCell>
                                );
                              } else if (column.id === "phone") {
                                return (
                                  <TableCell
                                    sx={{
                                      ...providerGroupUsersStyles.tableBodycell,
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    <Typography
                                      variant="h5"
                                      sx={{ fontWeight: "600" }}
                                    >
                                      {staffUser[column.id] || "-"}
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          color: "#1A1A1A99 !important",
                                          letterSpacing: "0 !important",
                                        }}
                                      >
                                        {staffUser.email || ""}
                                      </Typography>
                                    </Typography>
                                  </TableCell>
                                );
                              } else if (column.id === "action") {
                                return (
                                  <TableCell
                                    align={column.align}
                                    key={column.id}
                                    sx={providerGroupUsersStyles.actionButton}
                                    style={{
                                      cursor: "pointer",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    <ButtonBase
                                      sx={buttonBaseStyle}
                                      style={{ width: "80px", height: "30px" }}
                                      disabled={!staffUser?.active}
                                      onClick={() => editUserDetails(staffUser)}
                                    >
                                      <span
                                        className={customWidget.addButtonTypo}
                                      >
                                        <ModeEditOutlineOutlinedIcon
                                          sx={{ width: "0.8em" }}
                                        />
                                      </span>
                                      <Typography
                                        variant="h5"
                                        className={
                                          customWidget.addUserRoleBtnTypo
                                        }
                                      >
                                        {"Edit"}
                                      </Typography>
                                    </ButtonBase>
                                  </TableCell>
                                );
                              } else if (column.id === "role") {
                                return (
                                  <TableCell
                                    align={column.align}
                                    key={column.id}
                                    sx={providerGroupUsersStyles.tableBodycell}
                                    style={{
                                      cursor: "pointer",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    {capitalizeFirstLetter(
                                      staffUser[column.id]?.name?.replace(
                                        "_",
                                        " "
                                      )
                                    ) ||
                                      capitalizeFirstLetter(staffUser.roleType)}
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell
                                    align={column.align}
                                    key={column.id}
                                    sx={providerGroupUsersStyles.tableBodycell}
                                    style={{
                                      cursor: "default",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    {staffUser[column.id] || "-"}
                                  </TableCell>
                                );
                              }
                            })}
                        </TableRow>
                      )}
                    </>
                  );
                })}
            </TableBody>
          </Table>
          {isLoading && <Loading />}
          {providerGroupUserList?.length === 0 && !isLoading && (
            <div className={customWidget.noDataMsg}>No Data Available</div>
          )}
        </TableContainer>
        {/* <TablePagination
          sx={providerGroupUsersStyles.tablePagination}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pagination.totalElements}
          rowsPerPage={rowsPerPage}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Grid>
      <CustomPagination pagination={pagination} setPagination={setPagination} />
      {isStaffModalOpen && (
        <AddEditUserModal
          user="Staff"
          isRolePresent={true}
          title={ADD_STAFF_USER}
          open={isStaffModalOpen}
          setrefetchData={getAllUsers}
          setOpen={setIsStaffModalOpen}
          scroll="auto"
        />
      )}
      {isAdminAddProviderModalOpen && (
        <AddEditProviderUser
          providerGrpNpi={providerGroup?.npi || ""}
          userRolesList={userRoles}
          // insuranceAcceptedList={insuranceAcceptedList}
          providerGroupSpecialities={providerGroupSpecialities}
          providerLicensedStateList={providerLicensedStateList}
          providerWorkLocationList={providerWorkLocationList}
          title={ADD_PROVIDER_USER}
          source={ADMIN}
          open={isAdminAddProviderModalOpen}
          refetch={getAllUsers}
          setOpen={setIsAdminAddProviderModalOpen}
          scroll="auto"
        />
      )}

      {isEditStaffModalOpen && (
        <AddEditUserModal
          isRolePresent={true}
          editData={provider}
          title={EDIT_STAFF_USER}
          setrefetchData={getAllUsers}
          open={isEditStaffModalOpen}
          setOpen={setIsEditStaffModalOpen}
          scroll="auto"
        />
      )}
      {isAdminEditProviderModalOpen && (
        <AddEditProviderUser
          providerGrpNpi={providerGroup?.npi || ""}
          userRolesList={userRoles}
          providerGroupSpecialities={providerGroupSpecialities}
          providerLicensedStateList={providerLicensedStateList}
          providerWorkLocationList={providerWorkLocationList}
          title={EDIT_PROFILE}
          providerUuid={provider}
          refetch={getAllUsers}
          source={ADMIN}
          open={isAdminEditProviderModalOpen}
          setOpen={setIsAdminEditProviderModalOpen}
          scroll="auto"
        />
      )}
      {isDeleteModalOpen && (
        <DeleteDialog
          open={isDeleteModalOpen}
          onClose={() => setIsOpenDeleteModalOpen(false)}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete the User"}
          message={`the ${(provider?.roleType || "user").toLowerCase()} `}
        />
      )}
    </React.Fragment>
  );
};

export default ProviderGroupUsers;
