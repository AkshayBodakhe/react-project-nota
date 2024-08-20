// import AppLayout from "../../../../components/core/layout/layout";
//import { adminConstants } from "../../../../constants/admin";
import AddIcon from "@mui/icons-material/Add";
import {
  ButtonBase,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEditUserModal from "../../../../components/core/add-edit-staff-user/add-edit-staff-user";
// import { toggleEdit } from "../../../../redux/actions/editToggleAction";
import { commonWidget, formButtonStyle } from "../../../../styles/common";
import AddNewRole from "./add-new-role-modal";
import UsersCard from "./admin-user/users-card";
import { RoleControllerService } from "../../../../sdk/thinkemr-core-0.0.1/requests";

export const userSettingStyles = makeStyles(() => ({
  heading: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0px",
  },
  main: {
    padding: "0px 0px",
  },
  buttonActive: {
    fontSize: "14px !important",
    background: "#36588C 0% 0% no-repeat padding-box !important",
    borderRadius: "5px !important",
    width: "168px",
    height: "32px",
    margin: "5px 3px !important",
  },
  buttonTypoActive: {
    color: "#FFFF !important",
  },
  buttonTypoDeactive: { color: "#1A1A1A66" },
  buttonGrid1: {
    borderRadius: "5px",
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
  },
  buttonDeactive: {
    borderRadius: "5px !important",
    background: "#1A1A1A1A 0% 0% no-repeat padding-box !important",
    width: "168px",
    height: "32px",
    margin: "5px 3px !important",
  },
  addButton: {
    backgroundColor: "#DAEAF8 !important",
    textTransform: "initial",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    borderRadius: "8px !important",
  },
  saveCancelEditButton: {
    border: `1px solid #36588C !important`,
    borderRadius: "5px !important",
    width: "80px",
    height: "38px",
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
  gridSearch: {
    marginTop: "15px !important",
  },
  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    width: 450,
    height: 32,
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
  },
  inputBase: {
    marginLeft: "2px !important",
    flex: 1,
  },
  Button: {
    padding: "10px",
  },
  typo: {
    fontWeight: "bold !important",
  },
  linkStyles: {
    textDecoration: "none",
  },
  filter: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    gap: "15px",
    alignItems: "center",
  },
  tab: {
    fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  tabSwitchGrid: {
    width: "inherit",
    height: "63vh",
    // overflowY: "scroll",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "220px",
    border: "none",
    "& fieldset": { border: "none" },
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
}));

function UserSettings() {
  const classes = userSettingStyles();
  const classes2 = commonWidget();
  const [value, setValue] = React.useState(0);

  const [openAddNewUserModal, setOpenAddNewUserModal] = useState(false);
  const handleAddNewUserButton = () => {
    setOpenAddNewUserModal(true);
  };
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [openAddNewRoleModal, setOpenAddNewRoleModal] = useState(false);
  const handleAddNewRoleButton = () => {
    setOpenAddNewRoleModal(true);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };

  const [roles ,setRoles ] = useState<any>(null);
  const [,setpermissionByRole] = useState<any>(null);
  const [editChange, seteditChange] = useState(false);
  const [selectOption, setSelectOption] = useState("");
  // const [permission] = useState<any>([]);

  const navigate = useNavigate();

  // const {mutateAsync , isSuccess} = useRoleControllerServiceUpdateRole();

  // useEffect(()=>{
  //   if(isSuccess){
  //     seteditChange((prev) => !prev);
  //     // setButtonDisabled(!isButtonDisabled);
  //   }
  // },[isSuccess]);
const providerGroupUuid = ""
  const getAllRoles = (async ()=>{
   let roles = await RoleControllerService.getAllRolesWithDefault(providerGroupUuid,0,20);
   setRoles(roles?.data?.content);
  });

  const editPermissionByRole = () => {
    // let requestBody = {
    //   name: selectOption,
    //   permissions:permission,
    //   status: true,
    //   archive: false
    // }
    
  };

  const handleEdit = () => {
    seteditChange((prev) => !prev);
  };

  const cancel = () => {
    seteditChange((prev) => !prev);
    // setButtonDisabled(!isButtonDisabled);
  };

  const handleOptionSelect = (e: any) => {
    roles.map((data:any)=>{
      if(data.uuid == e.target.value){
        setSelectOption(data.name);
        setButtonDisabled(false);
        getPermissionByRoleId(data.uuid)
      }
    });
    
  };

  const getPermissionByRoleId = (async (uuid:string)=>{
    let permissionsByRole = await RoleControllerService.getRoleByUuid(uuid);    
    setpermissionByRole(permissionsByRole?.data);    
  });

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
    if(newValue == 1) getAllRoles();
    switch (newValue) {
      case 0:
        navigate("users");
        break;
      case 1:
        navigate("roles-and-responsibilities");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Grid>
        {/* <Grid>
          <Typography
            variant="h2"
            className={classes.titleStyle}
          >
            {SETTINGS}
          </Typography>
        </Grid> */}
      </Grid>
      <Grid className={classes.main}>
        <Grid container className={classes.heading}>
          <Grid item>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                className={classes.tab}
                sx={{ textTransform: "capitalize" }}
                label="Admin User"
              />
              <Tab
                className={classes.tab}
                sx={{ textTransform: "capitalize" }}
                label="Roles & Responsibility"
              />
            </Tabs>
          </Grid>
          {/* {value == 1 && (
            <Grid item >
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "space-between ",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <Grid>
                  <Typography variant="h4" className={classes.typo}>
                    Search By Role
                  </Typography>
                </Grid>
                <Grid>
                  <Select
                    placeholder="Select Role"
                    sx={{ height: "40px", width: "25rem" }}
                  >
                    {roles.map((role) => (
                      <MenuItem
                        value={role}
                        onClick={() => {
                          handleOptionSelect(role);
                        }}
                        key={role}
                      >
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid>
                  <ButtonBase
                    className={classes.saveCancelEditButton}
                    onClick={handleEdit}
                  >
                    <Typography className={classes.addButtonTypo}>
                      {!editChange ? "Edit" : "Cancel"}
                    </Typography>
                  </ButtonBase>
                </Grid>
              </Grid>
            </Grid>
          )} */}
          <Grid item sx={{ display: "flex", justifyContent: "end" }}>
            {value == 0 ? (
              <ButtonBase
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleAddNewUserButton}
              >
                <span className={classes.addButtonTypo}>
                  <AddIcon />
                </span>
                <Typography className={classes.addUserRoleBtnTypo} variant="h5">
                  {`${"Add"} ${value == 0 ? " User" : null}`}
                </Typography>
              </ButtonBase>
            ) : null}
          </Grid>
        </Grid>
        <Grid sx={{ paddingTop: "10px" }}>
          {value == 1 && (
            <Grid container>
              <Grid item className={classes.filter}>
                {editChange && (
                  <Grid container className={classes.filter}>
                    <Grid item>
                      <Typography variant="h4" className={classes.typo}>
                        Selected Role Name
                      </Typography>
                    </Grid>
                    <Grid item>
                      <InputBase
                        sx={{ height: "40px", width: "20rem" }}
                        fullWidth
                        name="rolename"
                        value={selectOption}
                        classes={{
                          root: classes2.textFieldRoot,
                          input: classes2.textFieldInput,
                          focused: classes2.textFieldActive,
                          error: classes2.inputBoxError,
                        }}
                      />
                    </Grid>
                    <Grid item></Grid>
                    <Grid item>
                      <ButtonBase sx={formButtonStyle.cancelButtonStyle}>
                        <Typography
                          className={classes.addButtonTypo}
                          sx={{ color: "#004186 !important" }}
                          onClick={editPermissionByRole}
                        >
                          Save
                        </Typography>
                      </ButtonBase>
                      <ButtonBase
                        onClick={cancel}
                        sx={{
                          marginLeft: "10px",
                          ...formButtonStyle.cancelButtonStyle,
                        }}
                      >
                        <Typography
                          className={classes.addButtonTypo}
                          sx={{ color: "#004186 !important" }}
                        >
                          Cancel
                        </Typography>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                )}
                {!editChange && (
                  <Grid item>
                    <Grid container className={classes.filter}>
                      <Grid>
                        <Typography variant="h4" className={classes.typo}>
                          Search By Role
                        </Typography>
                      </Grid>
                      <Grid>
                        <Select
                          className={classes.selectInputStyle}
                          value={selectOption}
                          name="role"
                          onChange={(e: any) => handleOptionSelect(e)}
                          renderValue={(selected) => {
                            if (!selected) {
                              return (
                                <span>
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      color: "#1A1A1A80 !important",
                                    }}
                                  >
                                   Select Specialities
                                  </Typography>
                                </span>
                              );
                            }
                            return (
                              <Typography variant="h5">{selected}</Typography>
                            );
                          }}
                          MenuProps={MenuProps}
                          displayEmpty
                        >
                          {roles?.map((data: any) => {
                            return (
                              <MenuItem
                                key={data.uuid}
                                value={data.uuid}
                                className={classes.menuItemColorStyle}
                              >
                                {data.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>
                      <Grid>
                        <ButtonBase
                          disabled={isButtonDisabled}
                          sx={formButtonStyle.cancelButtonStyle}
                          onClick={handleEdit}
                        >
                          <Typography
                            className={classes.addButtonTypo}
                            sx={{ color: "#004186 !important" }}
                          >
                            Edit
                          </Typography>
                        </ButtonBase>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item sx={{ width: "10%" }}>
                  {value == 1 ? (
                    <ButtonBase
                      sx={formButtonStyle.saveButtonStyle}
                      onClick={handleAddNewRoleButton}
                    >
                      <span className={classes.addButtonTypo}>
                        <AddIcon />
                      </span>
                      <Typography
                        className={classes.addUserRoleBtnTypo}
                        variant="h5"
                      >
                        {`${"Add"} ${value == 1 ? "New Role" : null}`}
                      </Typography>
                    </ButtonBase>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} className={classes.tabSwitchGrid}>
        {value === 0 ? <UsersCard /> : null}
        {/* {value === 1 ? <RolesAndResponsibility permissionByRole={getPermissionByRole} editPermissionByRole={editPermissionByRole()}isEditRole={editChange}/> : null} */}
      </Grid>
        {openAddNewUserModal && (
          <AddEditUserModal
            title="Add Admin User"
            open={openAddNewUserModal}
            setOpen={setOpenAddNewUserModal}
            scroll="auto"
            isRolePresent={false}
          />
        )}
        {openAddNewRoleModal && (
          <AddNewRole
            open={openAddNewRoleModal}
            setOpen={setOpenAddNewRoleModal}
            scroll="auto"
          />
        )}
      </Grid>
    </div>
  );
}
export default UserSettings;


