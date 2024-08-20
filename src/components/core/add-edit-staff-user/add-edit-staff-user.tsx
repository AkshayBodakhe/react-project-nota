//import React, { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { adminConstants } from "../../../constants/admin";
import { Enums } from "../../../pages/app/admin/provider-groups/common-files/enums";
// import { setAlert } from "../../../redux/actions/snackbar/alert.action";
import {
  User,
  UserControllerService,
} from "../../../sdk/thinkemr-core-0.0.1/requests";
import providerGroupService from "../../../service/provider-group--service";
import {
  actionBtns,
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../styles/common";
import CustomFormLabel from "../../common/custom-form-label";
import ImageSelector from "../../common/image-upload";
import { onlyNumber } from "../../common/validation/onlyNumber";
import { alertAction } from "../../../store/features/common-actions/snackbar/alertSlice";
import { capitalizeFirstLetter } from "../../common/enums-and-interfaces/common-functions";
import { useLocation, useParams } from "react-router-dom";
import { setDetailData } from "../../../store/features/common-actions/user-detail/userDetailSlice";
import { patientStyle } from "../../../pages/app/provider/patient/style/commonStyle";

export const EDIT_STAFF_USER = "Edit Staff User";

export const addEditUserStyle = {
  selectPlaceHolderStyle: {
    fontSize: "14px !important",
    color: "#1A1A1A7F",
  },

  inputFieldGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
    gap: "10px",
    marginTop: "20px !important",
  },

  inputError: {
    border: "1px solid #ef5350 !important",
  },

  dialogClose: {
    position: "absolute",
    right: "28px",
    cursor: "pointer",
  },

  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "100%",
    fontSize: "14px !important",
  },

  dialogTitle: {
    textAlign: "center",
    fontSize: "20px !important",
    color: "black",
    background: "#F5F6F9",
    // fontWeight: "600",
    fontFamily: "Roboto,sans-serif !important",
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  adminSelectStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px",
    maxHeight: "42px",
    width: "20.773rem !important",
    "@media (max-width: 820px)": {
      width: "100% !important",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
    },
  },
};

export const toCamelCase = (value: string): string => {
  if (!value) {
    return "";
  }
  value = value.replace("_", " ").trim();
  return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
};

interface AddEditUserModal {
  title: string;
  profileDetails?: any;
  source?: string;
  open: boolean;
  setOpen?: any;
  scroll?: string;
  editData?: any;
  setAdminProfile?: any;
  setrefetchData?: any;
  isRolePresent?: boolean;
  isActivateUserPresent?: boolean;
  user?: string;
}

// interface payload {
//   id?: number;
//   uuid?: string;
//   iamId?: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   password?: string;
//   active?: boolean;
//   archive?: boolean;
//   avatar?: string;
//   newAvatar?: string;
//   role: string;
//   tenantKey?: string;
//   lastLogin?: number;
//   roleType: User.roleType;
//   emailVerified?: boolean;
//   phoneVerified?: boolean;
// }

const {
  PROFILE_PHOTO,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  CONTACT_NUMBER,
  ROLE,
  ENTER_FIRST_NAME,
  ENTER_LAST_NAME,
  ENTER_CONTACT_NUMBER,
  ENTER_EMAIL,
  SELECT,
  STATUS,
  SAVE,
  ADD,
} = adminConstants;

function AddEditUserModal(props: AddEditUserModal) {
  const {
    open,
    setOpen,
    scroll,
    title,
    profileDetails,
    setAdminProfile,
    setrefetchData,
    isRolePresent,
    isActivateUserPresent,
    source,
    user,
  } = props;

  const style = commonWidget();

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
  const classes = commonWidget();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .min(2, "Must contain at least two characters value")
      .required("Please enter the first name")
      .matches(/^[A-Za-z ]+$/, "Please enter the valid first name"),
    lastName: Yup.string()
      .trim()
      .min(2, "Must contain at least two characters value")
      .required("Please enter the last name")
      .matches(/^[A-Za-z ]+$/, "Please enter the valid last name"),
    email: Yup.string()
      .email("Please enter the valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter the valid email"
      )
      .required("Please enter the valid email"),
    phone: Yup.string()
      .required("Please enter the contact number")
      .matches(/^\d{10}$/, "Contact number should be at least 10 digits"),
    role: Yup.object().when("showRoleType", {
      is: true,
      then: (schema) =>
        schema.shape({
          uuid: Yup.string().required("Role is required "),
        }),
    }),
    //  Yup.object({
    //   uuid: Yup.string().when(["showRoleType"], {
    //     is: true,
    //     then: (schema) => schema.required(),
    //   }),
    // }),
  });
  const initialVal = {
    id: "",
    uuid: "",
    firstName: "",
    lastName: "",
    role: {
      uuid: "",
    },
    avatar: null,
    newAvatar: null,
    iamId: "",
    email: "",
    phone: "",
    password: "",
    active: "",
    archive: false,
    tenantKey: "",
    lastLogin: 0,
    roleType: "",
    emailVerified: false,
    phoneVerified: false,
    showRoleType: isRolePresent,
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userRoleList, setUserRoleList] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [initialValues] = useState({ ...initialVal });
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  const [statusList] = useState(["Active", "Inactive"]);
  const [profileImage, setProfileImage] = useState<any>(null);
  // const [existingProfileImage, setExistingProfileImage] = useState<any>(null);
  const [selectedUserRole, setSelectedUserRoleList] = useState("");

  useEffect(() => {
    getAllRolesWithDefault();
  }, []);

  useEffect(() => {
    const editData = props.editData;
    if (editData) {
      Object.keys(editData).map((res: any) => {
        formik.setFieldValue(res, props.editData[res]);
      });
    } else if (profileDetails) {
      // setExistingProfileImage(profileDetails.avatar);
      Object?.keys(profileDetails).forEach((res: any) => {
        if (res === "active") {
          formik.setFieldValue(
            "active",
            profileDetails?.active ? "Active" : "Inactive"
          );
        } else {
          formik.setFieldValue(res, profileDetails[res]);
        }
      });
    }
  }, [profileDetails]);

  useEffect(() => {
    if (isSuccess) {
      setrefetchData(true);
      handleClose();
    }
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleCloseBar = () => {
  //   setOpenAlert(false);
  // };
  //const onImageSelect = (selectedImage: any) => {};

  const handleFormSubmit = (values: any) => {
    // if (values?.role?.name) {
    switch (selectedUserRole) {
      case "BILLER":
        values.roleType = User.roleType.STAFF;
        break;
      case "NURSE":
        values.roleType = User.roleType.STAFF;
        break;
      case "PROVIDER":
      case "PROVIDER_ADMIN":
        values.roleType = User.roleType.STAFF;
        break;
      case "STAFF":
        values.roleType = User.roleType.STAFF;
        break;
      case "PATIENT":
        values.roleType = User.roleType.PATIENT;
        break;
      default:
        values.roleType = User.roleType.ADMIN;
        break;
    }
    // }
    if (values.active === "Inactive") {
      values.active = false;
    } else if (values.active === "Active") {
      values.active = true;
    }
    values.providerGroupUuid = id;
    // if (title.includes("Add")) {
    //   formik.setFieldValue("avatar", profileImage);
    //   values.avatar = profileImage;
    //   // values.newAvatar = profileImage;
    // } else if (title.includes("Edit")) {
    //   formik.setFieldValue("newAvatar", profileImage);
    //   values.newAvatar = profileImage;
    // }
    if (title === "Add Staff User") {
      try {
        providerGroupService
          .addUpdateUser(providerGroupSchema, values, "ADD", "user")
          .then((res: any) => {
            if (res) {
              if (res?.status >= 200 && res.status <= 299) {
                setrefetchData(true);
                handleClose();
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
                    message: res.data?.message || "",
                    severity: "error",
                  })
                );
            }
          })
          .catch((_err) => {});
      } catch (err) {
        // setErrorMessage(ENTER_VALID_CREDS);
      }
    } else {
      const tenanId: string =
        title === "Add New Admin User" ||
        title === "Edit Admin User" ||
        title === "Edit Staff Profile"
          ? ""
          : providerGroupSchema;
      const request = title === "Add New Admin User" ? "ADD" : "UPDATE";

      try {
        providerGroupService
          .addUpdateUser(tenanId, values, request, "user")
          .then((res: any) => {
            if (res) {
              if (res?.status >= 200 && res.status <= 299) {
                setIsSuccess(true);
                setrefetchData(true);
                handleClose();
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
                    message: res.data?.message || "",
                    severity: "error",
                  })
                );
            }
          })
          .catch((err) => {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: err.body.message,
                severity: "error",
              })
            );
          });
      } catch (err: any) {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: err.body.message,
            severity: "error",
          })
        );
      }
      setAdminProfile({ ...values });
      getLoginnedUserDetails();
    }
  };

  const getLoginnedUserDetails = async () => {
    const data = await UserControllerService.getUsersProfileDetails();
    dispatch(setDetailData(data?.data));
  };

  const getAllRolesWithDefault = () => {
    providerGroupService
      .getAllRolesWithDefault(providerGroupSchema, 0, 10, id)
      .then((list: any) => {
        if (list?.data?.data && list?.data?.data?.content) {
          const filteredRole =
            list?.data &&
            list?.data?.data?.content?.filter(
              (item: any) => item.name !== "PROVIDER"
            );
          setUserRoleList(filteredRole);
        }
      });
  };

  const handleKeyPress = (e: any) => {
    const key = e.key;
    if (/^\d$/.test(key)) {
      e.preventDefault();
    }
  };

  const handleImageChange = (event: any) => {
    const cleanedImageData = event.substring(event.indexOf(",") + 1);
    formik.setFieldValue(
      title.includes("Add") ? "avatar" : "newAvatar",
      cleanedImageData
    );
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  });

  return (
    <form action="">
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="scroll-dialog-title" sx={formTitle}>
          <Grid container>
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ textTransform: "capitalize", fontWeight: "bold" }}
              >
                {/* {toCamelCase(`Edit ${profileDetails?.roleType || ""} user`)} */}
                {title}
              </Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase onClick={handleClose}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          sx={{ padding: "10px !important" }}
        >
          <Grid display={"grid"} gap={3} gridTemplateColumns={"20% 1fr"}>
            <Box mt={3}>
              <Grid container alignItems={"end"}>
                <Typography
                  sx={{
                    color: "#000000",
                    fontFamily: "Roboto,sans-serif!important",
                    fontSize: "14px!important",
                    fontWeight: "550!important",
                  }}
                  pl={3}
                >
                  {PROFILE_PHOTO}
                </Typography>
              </Grid>
              <Grid>
                <ImageSelector
                  existingProfileImage={formik.values.avatar}
                  setProfileImage={handleImageChange}
                />
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              {/* <Box>
              <Typography
                sx={{
                  color: "#000000",
                  fontFamily: "Roboto,sans-serif!important",
                  fontSize: "14px!important",
                  fontWeight: "550!important",
                  marginLeft: "8px",
                  marginBottom: "0px",
                }}
              >
                {PROFILE_PHOTO}
              </Typography>
              <ImageSelector
                setProfileImage={setProfileImage}
                existingProfileImage={formik.values.avatar || ""}
              />
            </Box> */}

              <Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <CustomFormLabel label={FIRST_NAME} isRequired={true} />
                    <InputBase
                      fullWidth
                      size="small"
                      name="firstName"
                      type="text"
                      placeholder={ENTER_FIRST_NAME}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={
                        !!formik.touched.firstName && !!formik.errors.firstName
                      }
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyPress={(e) => handleKeyPress(e)}
                      // onChange={(e) =>
                      //   formik.setFieldValue("firstName", e.target.value)
                      // }
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <FormHelperText error>
                        {formik.errors?.firstName}
                      </FormHelperText>
                    )}
                  </Box>
                  <Box>
                    <CustomFormLabel label={LAST_NAME} isRequired={true} />
                    <InputBase
                      fullWidth
                      name="lastName"
                      type="text"
                      placeholder={ENTER_LAST_NAME}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={
                        !!(formik.touched.lastName && formik.errors.lastName)
                      }
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyPress={(e) => handleKeyPress(e)}
                      // onChange={(e) =>
                      //   formik.setFieldValue("lastName", e.target.value)
                      // }
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <FormHelperText error>
                        {formik.errors.lastName}
                      </FormHelperText>
                    )}
                  </Box>
                </Box>

                <Box sx={addEditUserStyle.inputFieldGrid}>
                  <Box>
                    <CustomFormLabel label={EMAIL} isRequired={true} />
                    <InputBase
                      fullWidth
                      name="email"
                      type="email"
                      placeholder={ENTER_EMAIL}
                      disabled={source === "edit" ? true : false}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={!!(formik.touched.email && formik.errors.email)}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      // onChange={(e) =>
                      //   formik.setFieldValue("email", e.target.value)
                      // }
                    />
                    {formik.touched.email && formik.errors.email && (
                      <FormHelperText error>
                        {formik.errors.email}
                      </FormHelperText>
                    )}
                  </Box>
                  <Box>
                    <CustomFormLabel label={CONTACT_NUMBER} isRequired={true} />
                    <InputBase
                      fullWidth
                      name="phone"
                      type="text"
                      placeholder={ENTER_CONTACT_NUMBER}
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                      error={!!(formik.touched.phone && formik.errors.phone)}
                      value={formik.values.phone}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const limitedInput = onlyNumber(inputValue);
                        formik.setFieldValue("phone", limitedInput);
                        // user === "admin"
                        //   ? formik.setFieldValue(
                        //       "roleType",
                        //       User.roleType.ADMIN
                        //     )
                        //   : formik.setFieldValue(
                        //       "roleType",
                        //       User.roleType.STAFF
                        //     );
                      }}
                      // Use the pattern attribute to enforce numeric input
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <FormHelperText error>
                        {formik.errors.phone}
                      </FormHelperText>
                    )}
                  </Box>
                </Box>
                {isActivateUserPresent && (
                  <Box sx={addEditUserStyle.inputFieldGrid}>
                    <Box>
                      <CustomFormLabel label={STATUS} isRequired={true} />
                      <Select
                        sx={addEditUserStyle.selectInputStyle}
                        value={formik.values.active}
                        name="active"
                        onChange={(e) =>
                          formik.setFieldValue("active", e.target.value)
                        }
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
                                  Status
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
                        {statusList.map((data) => {
                          return (
                            <MenuItem
                              key={data}
                              value={data}
                              sx={addEditUserStyle.menuItemColorStyle}
                            >
                              {data}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.active && formik.errors.active && (
                        <FormHelperText error>
                          {formik.errors.active}
                        </FormHelperText>
                      )}
                    </Box>
                    <Grid>
                      <CustomFormLabel label={ROLE} isRequired={true} />
                      <Select
                        fullWidth
                        displayEmpty
                        disabled={source === "edit" ? true : false}
                        value={formik.values.roleType}
                        name="roleType"
                        size="small"
                        error={
                          !!(formik.touched.roleType && formik.errors.roleType)
                        }
                        onBlur={formik.handleBlur}
                        classes={{
                          error: classes.inputBoxError,
                        }}
                        onChange={formik.handleChange}
                        // onChange={(e) =>
                        //   Formik.setFieldValue("adminId", e.target.value)
                        // }
                        renderValue={(selected: any) => {
                          if (selected.id === "") {
                            return (
                              <span
                                style={{
                                  fontSize: "14px",
                                }}
                              >
                                Select Role
                              </span>
                            );
                          } else {
                            return `${selected}`;
                          }
                        }}
                        sx={{
                          ...addEditUserStyle.adminSelectStyle,
                          ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              padding: "8px 14px",
                            },
                        }}
                        MenuProps={{
                          PaperProps: { sx: { maxHeight: 300 } },
                        }}
                      >
                        {userRoleList.map((data: any) => {
                          return (
                            <MenuItem value={data.name}>{data.name}</MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.roleType && formik.errors.roleType && (
                        <FormHelperText error>
                          {formik.errors.roleType}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Box>
                )}

                {title === "Edit Admin Profile" && (
                  <Grid sx={addEditUserStyle.inputFieldGrid}>
                    <Grid>
                      <CustomFormLabel label={ROLE} isRequired={true} />
                      <Select
                        fullWidth
                        displayEmpty
                        disabled={source === "edit" ? true : false}
                        value={formik.values.roleType}
                        name="roleType"
                        size="small"
                        error={
                          !!(formik.touched.roleType && formik.errors.roleType)
                        }
                        onBlur={formik.handleBlur}
                        classes={{
                          error: classes.inputBoxError,
                        }}
                        onChange={formik.handleChange}
                        // onChange={(e) =>
                        //   Formik.setFieldValue("adminId", e.target.value)
                        // }
                        renderValue={(selected: any) => {
                          if (selected.id === "") {
                            return (
                              <span
                                style={{
                                  fontSize: "14px",
                                }}
                              >
                                Select Role
                              </span>
                            );
                          } else {
                            return `${selected}`;
                          }
                        }}
                        sx={{
                          ...addEditUserStyle.adminSelectStyle,
                          ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              padding: "8px 14px",
                            },
                        }}
                        MenuProps={{
                          PaperProps: { sx: { maxHeight: 300 } },
                        }}
                      >
                        {userRoleList.map((data: any) => {
                          return (
                            <MenuItem value={data.name}>{data.name}</MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.roleType && formik.errors.roleType && (
                        <FormHelperText error>
                          {formik.errors.roleType}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                )}
                {isRolePresent && (
                  <Box sx={addEditUserStyle.inputFieldGrid}>
                    {/* <Box>
                      <CustomFormLabel label={ROLE} isRequired={true} />
                      <Select
                        name="role"
                        type="text"
                        IconComponent={KeyboardArrowDown}
                        displayEmpty
                        size="small"
                        disabled={!!props.editData}
                        sx={addEditUserStyle.selectInputStyle}
                        renderValue={(selected: any) => {
                          if (!selected) {
                            return (
                              <span
                                style={addEditUserStyle.selectPlaceHolderStyle}
                              >
                                {`${SELECT} ${ROLE}`}
                              </span>
                            );
                          }
                          return (
                            userRoleList.find(
                              (option: any) => option.name === selected.name
                            )?.name || ""
                          );
                        }}
                        value={formik.values.role}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={
                          formik.errors.role ? style.inputBoxError : ""
                        }
                        MenuProps={MenuProps}
                      >
                        {userRoleList.map((option: any) => (
                          <MenuItem key={option.roleName} value={option}>
                            {capitalizeFirstLetter(
                              option.name.replace("_", " ") || option.name
                            )}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.role && formik.errors.role && (
                        <FormHelperText error>
                          {formik.errors.role}
                        </FormHelperText>
                      )}
                    </Box> */}

                    <Grid item xs={12}>
                      <CustomFormLabel label="Role" isRequired={true} />
                      <Select
                        // className={classes.selectInputStyle}
                        // className={
                        //   formik.errors.role
                        //     ? style.inputBoxError
                        //     : classes.selectInputStyle
                        // }
                        sx={{ width: "100%", height: "42px !important" }}
                        value={formik.values.role.uuid}
                        name="role.uuid"
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.role && formik.errors.role)}
                        onChange={(e: any) =>
                          formik.setFieldValue("role.uuid", e.target.value.uuid)
                        }
                        disabled={title === EDIT_STAFF_USER ? true : false}
                        renderValue={(selected) => {
                          const selectedVal = userRoleList?.find(
                            (item) => item.uuid === selected
                          );
                          let name = [];
                          name.push(selectedVal);
                          const val = name?.map((item) => item?.name);
                          setSelectedUserRoleList(val[0]);
                          if (!selected) {
                            return (
                              <span>
                                <Typography
                                  variant="h5"
                                  className={classes.label}
                                >
                                  Select
                                </Typography>
                              </span>
                            );
                          }
                          return <Typography variant="h5">{val}</Typography>;
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {userRoleList?.map((data) => {
                          return (
                            <MenuItem
                              key={data}
                              value={data}
                              className={classes.menuItemColorStyle}
                            >
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {formik.touched.role && formik.errors.role && (
                        <FormHelperText error>
                          {formik.errors.role.uuid}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions sx={formBottom}>
          <Grid sx={actionBtns}>
            <ButtonBase
              onClick={handleClose}
              sx={formButtonStyle.cancelButtonStyle}
            >
              Cancel
            </ButtonBase>
            <ButtonBase
              type="submit"
              sx={formButtonStyle.saveButtonStyle}
              // disabled={formik.isSubmitting || !formik.isValid}
              onClick={formik.submitForm}
            >
              {props.editData || props.profileDetails ? SAVE : ADD}
            </ButtonBase>
          </Grid>
        </DialogActions>
      </Dialog>
    </form>
  );
}

export default AddEditUserModal;
