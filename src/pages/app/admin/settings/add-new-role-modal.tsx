import { Close, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import {
  commonWidget,
  dialogClose,
  dialogTitle,
  selectInputStyle,
} from "../../../../../src/styles/common";
import CustomFormLabel from "../../../../components/common/custom-form-label";
import { adminConstants } from "../../../../constants/admin";
import {
  usePermissionControllerServiceGetAllPermissions,
  useRoleControllerServiceAddRole,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";

export const addNewRoleStyles = makeStyles(() => ({
  inputFieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
    marginTop: "20px",
  },
  selectPlaceHolderStyle: {
    fontSize: "14px",
    color: "#1A1A1A7F",
  },
  saveButtonBase: {
    marginTop: "10px !important",
    height: "40px !important",
    width: "120px !important",
    background: "#1B5984 !important",
    borderRadius: "5px !important",
  },
  close: {
    position: "absolute",
    right: "28px",
    cursor: "pointer",
  },
  saveButtonBaseTypo: {
    color: "#FFFFFF !important",
    fontSize: "14px !important",
    fontWeight: "bold !important",
  },
  select: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    padding: "13px 0px 10px 16px",
    fontSize: "14px !important",
    width: "20.773rem !important",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
  },
  selectError: {
    borderRadius: "5px",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    padding: "13px 0px 10px 16px",
    fontSize: "14px !important",
    width: "20.773rem !important",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
    border: "red 1px solid",
  },

  selectMaster: {
    width: "100%",
    height: "40px !important",
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    padding: "13px 0px 10px 0px",
  },
}));

interface AddNewRoleModal {
  source?: string;
  open: boolean;
  setOpen?: any;
  scroll?: string;
}

function AddNewRole(props: AddNewRoleModal) {
  const { open, setOpen, scroll } = props;
  const {
    SAVE,
    SELECT,
    ROLE_NAME,
    ENTER_ROLE_NAME,
    PERMISSION,
  } = adminConstants;

  const classes = commonWidget();
  const roleClasses = addNewRoleStyles();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };

  const [permissionOption, setPermissionOption] = React.useState<any>([]);
  const [permissionData, setPermissionData] = useState<any>(null);
  const [roleName, setRoleName] = useState('');

  const { mutateAsync, isSuccess } = useRoleControllerServiceAddRole();
  const { data } = usePermissionControllerServiceGetAllPermissions({
    accessCategory: sessionStorage.getItem('role')  as "ADMIN" | "PROVIDER" | "BOTH",
    page: 0,
    size: 10,
    sortBy: "id",
    sortDirection: "desc",
  });

  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!!data) {
      setPermissionData(data?.data?.content);
    }
  }, [data]);

  const handlePermissionChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setPermissionOption(value);
  };

  const handleFormSubmit = () => {
    let requestBody = {
      name: roleName,
      permissions: permissionOption,
      status: true,
      archive: false,
    };
    mutateAsync({ requestBody: requestBody });
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (

          <Dialog
            open={open}
            onClose={handleClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="lg"
          >
            <DialogTitle id="scroll-dialog-title" sx={dialogTitle}>
              Add New Role
              <Close sx={dialogClose} onClick={handleClose} />
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr",
                  gap: "20px !important",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "2fr 2fr",
                      gap: "10px",
                    }}
                  >
                    <Box>
                      <CustomFormLabel label={ROLE_NAME} isRequired={true} />
                      <InputBase
                        fullWidth
                        size="small"
                        name="roleName"
                        type="text"
                        placeholder={ENTER_ROLE_NAME}
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                        value={roleName}
                        onChange={(e) =>
                          setRoleName(e.target.value)
                        }
                      />
                      {/* {errors.roleName && (
                        <FormHelperText error>{errors.roleName}</FormHelperText>
                      )} */}
                    </Box>
                  </Box>

                  <Box className={roleClasses.inputFieldGrid}>
                    <Box>
                      <CustomFormLabel label={PERMISSION} isRequired={true} />
                      <Select
                        name="permission"
                        type="text"
                        IconComponent={KeyboardArrowDown}
                        sx={selectInputStyle}
                        multiple
                        value={permissionOption}
                        onChange={handlePermissionChange}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return (
                              <span
                                className={roleClasses.selectPlaceHolderStyle}
                              >
                                {`${SELECT} ${PERMISSION}`}
                              </span>
                            );
                          }

                          return selected
                            .map(
                              (selectedData: any) => selectedData.permissionName
                            )
                            .join(", ");
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {permissionData?.map((data: any) => (
                          <MenuItem key={data.id} value={data}>
                            <Checkbox
                              checked={permissionOption.some(
                                (selected: any) => selected.id === data.id
                              )}
                            />
                            <ListItemText primary={data.permissionName} />
                          </MenuItem>
                        ))}
                      </Select>

                      {/* {errors.permission && (
                        <FormHelperText error>
                          {errors.permission}
                        </FormHelperText>
                      )} */}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <DialogActions>
                <ButtonBase
                  className={roleClasses.saveButtonBase}
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  <Typography className={roleClasses.saveButtonBaseTypo}>
                    {SAVE}
                  </Typography>
                </ButtonBase>
              </DialogActions>
            </DialogContent>
          </Dialog>
       
  );
}
export default AddNewRole;
