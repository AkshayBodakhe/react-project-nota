/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import CustomFormLabel from "../../../../components/common/custom-form-label";
import { adminConstants } from "../../../../constants/admin";
import {
  usePermissionControllerServiceGetAllPermissions,
  useRoleControllerServiceAddRole,
  useRoleControllerServiceUpdateRole,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  commonWidget,
  dialogClose,
  dialogTitle,
  formButtonStyle,
} from "../../../../styles/common";
import Loading from "../../../../components/common/spinner/loading";
// import { setAlert } from "../../../../redux/actions/snackbar/alert.action";
import { useDispatch } from "react-redux";
import ActiveInactiveSwitch from "../../../../components/common/custom-switch";
import { alertAction } from "../../../../store/features/common-actions/snackbar/alertSlice";
import { useSelector } from "react-redux";
import { UserControllerService } from "../../../../sdk/thinkemr-core-0.0.1/requests";
import { setDetailData } from "../../../../store/features/common-actions/user-detail/userDetailSlice";
import { isNavalaCare } from "../../../../components/common/helper";

export const useStyles = makeStyles(() => {
  return {
    mainContainer: {
      padding: "0px 0px 0px 0px",
      //marginTop: "-50px !important",
    },
    body: {
      width: "auto",
      height: "auto",
      overflowY: "auto", // Enable vertical scrolling
      scrollbarWidth: "thin", // For Firefox
      scrollbarColor: "transparent transparent", // For Firefox
      "&::-webkit-scrollbar": {
        width: "0px", // Adjust the width as needed
      },
      "&::-webkit-scrollbar-thumb": {
        background: "transparent",
      },
    },
    typoTableHeading: {
      marginTop: "20px !important",
      color: "#1B5984 !important",
      fontWeight: "bold !important",
      fontSize: "16px !important",
      marginBottom: "20px !important",
    },
    typoTables: {
      color: "#1A1A1A !important",
      fontWeight: "bold !important",
      fontSize: "16px !important",
      marginBottom: "20px !important",
      marginTop: "20px !important",
    },
    tableRow: {
      background: "#DAEAF8 0% 0% no-repeat padding-box",
    },
    tableCell: {
      color: "#1A1A1A99 !important",
      fontWeight: "bold !important",
      fontSize: "14px !important",
    },
    tableCellValue: {
      fontSize: "14px !important",
      padding: "5px 10px !important",
    },
    buttonBase: {
      height: "30px",
      width: "70px",
      color: "#0097F0 !important",
      border: "1px solid #0097F0 !important",
      borderRadius: "5px !important",
    },
    buttonBaseDisable: {
      height: "30px",
      width: "70px",
      color: "#FFFFFF !important",
      background: "#0097F0 !important",
      border: "1px solid #0097F0 !important",
      borderRadius: "5px !important",
    },
    enablegreen: {
      color: "#00B917",
    },
    disablered: {
      color: "#FF3939",
    },
    addUserRoleBtnTypo: {
      color: "#ffffff !important",
      display: "flex",
    },
  };
});

interface SectionTitleProps {
  title: string;
  classProperties: any;
}

const {
  PERMISSION,
  DESCRIPTION,
  STATUS,
  status,
  SAVE,
  ROLE_NAME,
  ENTER_ROLE_NAME,
} = adminConstants;

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  classProperties,
}) => {
  return <Typography className={classProperties}>{title}</Typography>;
};

const tableHeaderData = [
  {
    value: PERMISSION,
    width: "250px",
  },
  {
    value: DESCRIPTION,
    width: "600px",
  },
  {
    value: STATUS,
    width: "100px",
  },
];
const SectionTableHeader: React.FC = () => {
  const classes = useStyles();
  const customWidget = commonWidget();
  return (
    <TableHead>
      <TableRow className={customWidget.tableHeadRowContainer}>
        {tableHeaderData.map((data, index) => {
          return (
            <TableCell
              key={index}
              className={classes.tableCell}
              sx={{
                width: data.width,
              }}
              // align={data.value == 'Status' ? 'center' : "left"}
            >
              {data.value}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

//BODY
interface SectionTableBodyProps {
  data: any;
  stateChange?: any;
  editRoles: boolean;
  onDataFromChild: any;
}

const SectionTableBody: React.FC<SectionTableBodyProps> = ({
  data,
  //stateChange,
  editRoles,
  onDataFromChild,
}) => {
  const classes = useStyles();
  const customWidget = commonWidget();
  const [tableData, setTableData] = useState([]);

  const updateRoles = (id: string) => {
    onDataFromChild(id);
  };

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  return (
    <TableBody className={customWidget.tableHeadRowContainer}>
      {tableData.map((row: any, index: number) => {
        const { id, ...otherFields } = row;
        return (
          <TableRow
            key={index}
            sx={{ "&:nth-child(2)": { background: "#EAF4FF80" } }}
          >
            {Object.keys(otherFields).map((value) => {
              return (
                <TableCell className={classes.tableCellValue}>
                  {value === status && editRoles ? (
                    <Grid
                      container
                      sx={{
                        background: "#1A1A1A0F 0% 0% no-repeat padding-box",
                        borderRadius: "13px",
                        opacity: 1,
                        padding: "0px 3px",
                        cursor: "pointer",
                        width: "99px",
                        alignItems: "center",
                      }}
                    >
                      {/* <Switch
                        size="small"
                        checked={row[value]}
                        color="success"
                        onClick={() => updateRoles(row.id)}
                      />
                      <Typography variant="h5">
                        {row[value] ? "Enable" : "Disable"}
                      </Typography> */}
                      <ActiveInactiveSwitch
                        role={true}
                        state={row[value]}
                        onChange={() => updateRoles(row.id)}
                      />
                    </Grid>
                  ) : value === status && !editRoles ? (
                    <Typography
                      variant="h5"
                      sx={{
                        color: row[value] ? "#00B917" : "#FF3939",
                      }}
                    >
                      {row[value] ? "Enable" : "Disable"}
                    </Typography>
                  ) : (
                    row[value]
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
interface RolesAndResponsibilityProps {
  isEditRole: boolean;
  permissionByRole?: any;
  editPermissionByRole?: any;
  open: boolean;
  setOpen?: any;
  scroll?: string;
  title: string;
  getList?: () => void;
}

function RolesAndResponsibility({
  isEditRole,
  permissionByRole,
  editPermissionByRole,
  open,
  setOpen,
  title,
  getList,
}: RolesAndResponsibilityProps) {
  const providerGroupUuid = useSelector(
    (state: any) => state.commonReducer.userDetail?.data?.providerGroup
  );
  const classes = useStyles();
  const customWidget = commonWidget();
  const [rolesList, setrolesList] = useState<any>([]);
  const [rolesKeys, setRolesKeys] = useState<any>([]);
  const [updatedRoles, setUpdatesRoles] = useState<any>([]);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [roleNameError, setRoleNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [permissionsError, setPermissionsError] = useState("");
  // const [isValid, setIsValid] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [permissions, setPermission] = useState<any>(null);

  const { data } = usePermissionControllerServiceGetAllPermissions({
    accessCategory:
      sessionStorage.getItem("role") === "SUPER_ADMIN" ||
      sessionStorage.getItem("role") === "ADMIN"
        ? "ADMIN"
        : isNavalaCare()
        ? "CARE_PROVIDER"
        : "GLOBAL_PROVIDER",
    page: 0,
    size: 100000,
    sortBy: "id",
    sortDirection: "desc",
  });

  const [isLoading, setsLoading] = useState(true);
  const dispatch = useDispatch();
  const { mutateAsync, isSuccess } = useRoleControllerServiceAddRole();
  const { mutateAsync: update, isSuccess: updateSuccess } =
    useRoleControllerServiceUpdateRole();

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      setOpen(false);
      if (getList) {
        getList();
      }
    }
  }, [updateSuccess, isSuccess]);

  useEffect(() => {
    if (!!data?.data?.content) {
      if (permissionByRole) {
        data?.data?.content.forEach((element: any) => {
          element.status = getStatus(element.permissionKey);
          const isElementExist = updatedRoles.some(
            (el: any) => el.id === element.id
          );

          if (element.status && !isElementExist) {
            updatedRoles.push(element);
          }
        });
      }
      setPermission(data?.data?.content);
      getGroupData(data?.data?.content);
    }
  }, [data, permissionByRole]);

  const getGroupData = async (data: any) => {
    const groupedData = await data?.reduce((acc: any, item: any) => {
      const { module, ...rest } = item;
      if (!acc[module]) {
        acc[module] = [];
      }
      acc[module].push(rest);

      return acc;
    }, {});

    const roleObject = groupedData;
    setrolesList(roleObject);
    setRolesKeys(Object.keys(roleObject));
    setsLoading(false);
  };

  useEffect(() => {
    if (editPermissionByRole) {
      setDescription(editPermissionByRole?.description);
      setRoleName(editPermissionByRole?.name);
    }
  }, [editPermissionByRole]);

  const getStatus = (permissionKey: string) => {
    const hasPermission = permissionByRole
      ? permissionByRole?.permissions?.some(
          (permission: any) => permission.permissionKey === permissionKey
        )
      : false;
    return hasPermission;
  };

  const updateRoles = (permissionId: any) => {
    const updatedRows = permissions?.map((row: any) =>
      row.id === permissionId ? { ...row, status: !row.status } : row
    );
    setPermission(updatedRows);
    getGroupData(updatedRows);

    const newUpdatedRoles = [...updatedRoles];

    const newlyMatchedRows = updatedRows.filter(
      (row: any) => row.id === permissionId && row.status
    );

    const isElementExist = newUpdatedRoles.some(
      (el: any) => el.id === permissionId && el.status
    );

    if (newlyMatchedRows.length > 0 && !isElementExist) {
      newUpdatedRoles.push(...newlyMatchedRows);
    } else if (newlyMatchedRows.length === 0 && isElementExist) {
      const indexToRemove = newUpdatedRoles.findIndex(
        (el: any) => el.id === permissionId && el.status
      );
      if (indexToRemove !== -1) {
        newUpdatedRoles.splice(indexToRemove, 1);
      }
    }
    setUpdatesRoles(newUpdatedRoles);
  };

  useEffect(() => {
    if (isSubmit) {
      if (updatedRoles.length === 0) {
        setPermissionsError("At least one permission is required");
      } else {
        setPermissionsError("");
      }
    }
  }, [updatedRoles]);

  const validateField = async (value: any, fieldName: any, setError: any) => {
    if (!value) {
      setError(`Please enter the ${fieldName}`);
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleKeyPress = (e: any) => {
    const key = e.key;
    if (/^\d$/.test(key)) {
      e.preventDefault();
    }
  };

  const inputChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "roleName") {
      setRoleName(value);
      if (!value.trim()) {
        setRoleNameError("Please enter the role name");
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setRoleNameError("Please enter the valid role name");
      } else {
        setRoleNameError(""); // Clear the error if the value is valid
      }
    } else if (name == "description") {
      setDescription(value);
      setDescriptionError(value ? "" : "Please enter the description");
    }
  };
  const getLoginnedUserDetails = async () => {
    const data = await UserControllerService.getUsersProfileDetails();
    dispatch(setDetailData(data?.data));
    sessionStorage.setItem("loginUser", JSON.stringify(data?.data));
  };

  const handleFormSubmit = async () => {
    setIsSubmit(true);
    let valid = await validateField(roleName, "Role Name", setRoleNameError);

    let validDescription = await validateField(
      description,
      "Description",
      setDescriptionError
    );

    if (updatedRoles.length === 0) {
      setPermissionsError("Please select at least one permission");
    } else {
      setPermissionsError("");
    }

    if (valid && updatedRoles.length > 0) {
      let requestBody = {
        uuid: editPermissionByRole?.uuid || "",
        name: roleName.toUpperCase(),
        description: description,
        permissions: updatedRoles,
        status: true,
      };
      if (!editPermissionByRole?.id) {
        try {
          mutateAsync({
            requestBody: requestBody,
            providerGroupUuid: providerGroupUuid,
          })
            .then((res: any) => {
              dispatch(
                alertAction.setAlert({
                  open: true,
                  message: res.message,
                  severity: "success",
                })
              );
            })
            .catch((error) => {
              dispatch(
                alertAction.setAlert({
                  open: true,
                  message: error.body.message,
                  severity: "error",
                })
              );
            });
        } catch (error: any) {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: error.body.message,
              severity: "error",
            })
          );
        }
      } else if (editPermissionByRole.id) {
        try {
          update({
            requestBody: requestBody,
            providerGroupUuid: providerGroupUuid,
          })
            .then((res: any) => {
              dispatch(
                alertAction.setAlert({
                  open: true,
                  message: res.message,
                  severity: "success",
                })
              );
              getLoginnedUserDetails();
            })
            .catch((error) => {
              dispatch(
                alertAction.setAlert({
                  open: true,
                  message: error.body.message,
                  severity: "error",
                })
              );
            });
        } catch (error: any) {
          dispatch(
            alertAction.setAlert({
              open: true,
              message: error.body.message,
              severity: "error",
            })
          );
        }
      }
      setIsSubmit(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function convertToCamelCase(input: string) {
    return input
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
    >
      <DialogTitle
        id="scroll-dialog-title"
        sx={{
          ...dialogTitle,
          textAlign: "left",
          padding: "10px 20px !important",
        }}
      >
        {title}
        <Close sx={dialogClose} onClick={handleClose} />
      </DialogTitle>
      <DialogContent>
        <Grid container>
          {isEditRole && (
            <Grid item xs={12} mt={1}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CustomFormLabel label={ROLE_NAME} />
                  <InputBase
                    fullWidth
                    size="small"
                    name="roleName"
                    type="text"
                    placeholder={ENTER_ROLE_NAME}
                    classes={{
                      root: customWidget.textFieldRoot,
                      input: customWidget.textFieldInput,
                      focused: customWidget.textFieldActive,
                      error: customWidget.inputBoxError,
                    }}
                    value={roleName}
                    onChange={(e) => inputChange(e)}
                    onKeyPress={(e) => handleKeyPress(e)}
                  />
                  <FormHelperText error>{roleNameError}</FormHelperText>
                </Grid>
                <Grid item xs={8}>
                  <CustomFormLabel label="Description" />
                  <InputBase
                    fullWidth
                    size="small"
                    name="description"
                    type="text"
                    placeholder={ENTER_ROLE_NAME}
                    classes={{
                      root: customWidget.textFieldRoot,
                      input: customWidget.textFieldInput,
                      focused: customWidget.textFieldActive,
                      error: customWidget.inputBoxError,
                    }}
                    value={description}
                    onChange={(e) => inputChange(e)}
                    onKeyPress={(e) => {
                      handleKeyPress(e);
                    }}
                  />
                  <FormHelperText error>{descriptionError}</FormHelperText>
                </Grid>
              </Grid>
            </Grid>
          )}
          {!isEditRole && (
            <Grid item xs={12} mt={1}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Grid xs={12}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Role Name
                    </Typography>
                  </Grid>
                  <Grid xs={12} mt={1}>
                    <Typography variant="h5">
                      {roleName
                        .toLowerCase()
                        .replace(/(?:^|\s)\S/g, function (a) {
                          return a.toUpperCase();
                        })}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  <Grid xs={12}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Description
                    </Typography>
                  </Grid>
                  <Grid xs={12} mt={1}>
                    <Typography variant="h5">{description}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            {isLoading && <Loading />}
            <Grid className={classes.body}>
              {rolesKeys.map((key: any) => {
                return (
                  <>
                    <SectionTitle
                      title={convertToCamelCase(key)}
                      classProperties={classes.typoTableHeading}
                    />
                    <TableContainer component={Paper}>
                      <Table>
                        <SectionTableHeader />
                        <SectionTableBody
                          editRoles={isEditRole}
                          onDataFromChild={(permissionId: any) =>
                            updateRoles(permissionId)
                          }
                          data={rolesList[key].map((role: any) => {
                            return {
                              id: role.id,
                              permission: role.permissionName,
                              description: role.description,
                              status: role.status,
                            };
                          })}
                        />
                      </Table>
                    </TableContainer>
                  </>
                );
              })}
            </Grid>
          </Grid>
          <FormHelperText error>{permissionsError}</FormHelperText>
        </Grid>
        {isEditRole && (
          <DialogActions>
            <ButtonBase
              sx={formButtonStyle.saveButtonStyle}
              type="submit"
              onClick={handleFormSubmit}
            >
              <Typography className={classes.addUserRoleBtnTypo}>
                {SAVE}
              </Typography>
            </ButtonBase>
          </DialogActions>
        )}
      </DialogContent>
    </Dialog>
  );
}
export default RolesAndResponsibility;
