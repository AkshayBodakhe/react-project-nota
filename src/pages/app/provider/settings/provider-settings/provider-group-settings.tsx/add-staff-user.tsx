import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import ImageSelector from "../../../../../../components/common/image-upload";
import providerGroupService from "../../../../../../service/provider-group--service";
import { formButtonStyle, formTitle } from "../../../../../../styles/common";
import { test } from "../../../../admin/new-master/drug-catalog/add-drug-catalog2";
import { Enums } from "../../../../admin/provider-groups/common-files/enums";
import { patientStyle } from "../../../patient/style/commonStyle";
import { commonWidget } from "../../../../../../styles/common";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import { useUserControllerServiceAddUser } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { User } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { useSelector } from "react-redux";
import { alertAction } from "../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";

interface AddUserProps {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  editData?: any;
  setRefetchUsers?: any;
}

export const STAFF = "STAFF";

function AddStaffUser(props: AddUserProps) {
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
  const dispatch = useDispatch();
  const classes = patientStyle();
  const { open, setOpen, title, setRefetchUsers } = props;
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .min(2, "First Name must be at least two characters long")
      .required("Please enter the first name")
      .matches(/^[A-Za-z]+$/, "Please enter the valid first name"),
    lastName: Yup.string()
      .trim()
      .min(2, "Last Name must be at least two characters long")
      .required("Please enter the last name")
      .matches(/^[A-Za-z]+$/, "Please enter the valid last name"),
    email: Yup.string()
      .email("Please enter the valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter the valid email"
      )
      .required("Please enter the valid email"),
    phone: Yup.string()
      .required("Please enter the valid contact number")
      .matches(/^\d+$/, "Please enter the valid contact number")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits"),
    role: Yup.object({
      uuid: Yup.string().required("Please select the role"),
    }),
    roleType: Yup.string(),
    providerGroupUuid: Yup.string(),
    avatar: Yup.mixed(),
  });

  const [genderOptions] = useState(["Male", "Female", "Other"]);
  const initialVal = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: {
      uuid: "",
    },
    roleType: "",
    providerGroupUuid: "",
    avatar: "",
  };
  const style = commonWidget();
  const [initialValues, setInitialValues] = useState({ ...initialVal });
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );

  let { id } = useParams();

  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  id = id ? id : providerGroupUuid;
  const [userRoleList, setUserRoleList] = useState<any[]>([]);
  const { mutateAsync } = useUserControllerServiceAddUser();
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const handleFormSubmit = async (values: any) => {
    // Handle form submission logic here
    const imgData = await handleImageData(values?.avatar);
    const requestBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: {
        uuid: values.role.uuid,
      },
      roleType: STAFF,
      providerGroupUuid: userDetails?.data?.providerGroup as string,

      avatar: imgData,
    };

    if (STAFF === "STAFF") {
      try {
        mutateAsync({ requestBody: requestBody as unknown as User })
          .then((res: any) => {
            setRefetchUsers(true);
            handleClose();
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
          })
          .catch((error: any) => {
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useUserControllerServiceAddUser

  const inputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInitialValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllRolesWithDefault();
  }, []);

  const getAllRolesWithDefault = () => {
    providerGroupService
      .getAllRolesWithDefault(providerGroupSchema, 0, 10, id)
      .then((list: any) => {
        if (list?.data?.data && list?.data?.data?.content) {
          setUserRoleList(list.data.data.content);
        }
      });
  };

  // const setProfileImage = (e: any) => {

  // };

  const handleImageData = (event: any) => {
    const cleanedImageData = event.substring(event.indexOf(",") + 1);
    return cleanedImageData;
  };

  return (
    <Formik
      onSubmit={(values) => {
        handleFormSubmit(values);
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, errors, touched, submitForm, setFieldValue, handleBlur }) => (
        <Form>
          <Dialog open={open} onClose={handleClose} sx={test}>
            <DialogTitle id="scroll-dialog-title" sx={{ marginBottom: "15px" }}>
              <Grid container>
                <Grid
                  item
                  xs={11}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography sx={formTitle}>{title}</Typography>
                </Grid>
                <Grid item display={"flex"} justifyContent={"end"} xs={1}>
                  <ButtonBase onClick={handleClose}>
                    <CloseIcon />
                  </ButtonBase>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Grid pl={4}>
                    <Typography fontSize={"14px"}>{"Profile Photo"}</Typography>
                  </Grid>
                  <ImageSelector
                    existingProfileImage={values.avatar}
                    setProfileImage={(e: any) => {
                      setFieldValue("avatar", e);
                    }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {/* <Typography
                        variant="h5"
                        sx={{
                          color: "#1A1A1A !important",
                        }}
                      >
                        First Name
                      </Typography> */}
                      <CustomFormLabel label="First Name" isRequired={true} />

                      <InputBase
                        value={values.firstName}
                        name="firstName"
                        fullWidth
                        placeholder="Enter Name"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        error={!!touched.firstName && !!errors.firstName}
                        onChange={(e) =>
                          setFieldValue("firstName", e.target.value)
                        }
                        onBlur={handleBlur}
                      />
                      {touched.firstName && errors.firstName && (
                        <FormHelperText error>
                          {errors.firstName}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Last Name" isRequired={true} />
                      <InputBase
                        value={values.lastName}
                        name="lastName"
                        fullWidth
                        placeholder="Enter Name"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        error={!!touched.lastName && !!errors.lastName}
                        onBlur={handleBlur}
                        onChange={(e) =>
                          setFieldValue("lastName", e.target.value)
                        }
                      />
                      {touched.lastName && errors.lastName && (
                        <FormHelperText error>{errors.lastName}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Email" isRequired={true} />
                      <InputBase
                        value={values.email}
                        name="email"
                        fullWidth
                        placeholder="Enter Email"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        error={!!touched.email && !!errors.email}
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error>{errors.email}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel
                        label="Contact Number"
                        isRequired={true}
                      />
                      <InputBase
                        value={values.phone}
                        name="phone"
                        fullWidth
                        placeholder="Enter Number"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        error={!!touched.phone && !!errors.phone}
                        onBlur={handleBlur}
                        onChange={(e) => setFieldValue("phone", e.target.value)}
                      />
                      {touched.phone && errors.phone && (
                        <FormHelperText error>{errors.phone}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <CustomFormLabel label="Role" isRequired={true} />
                      <Select
                        className={classes.selectInputStyle}
                        // className={errors.role ? style.inputBoxError : ""}
                        value={values.role.uuid}
                        name="role.uuid"
                        onBlur={handleBlur}
                        onChange={(e: any) =>
                          setFieldValue("role.uuid", e.target.value.uuid)
                        }
                        renderValue={(selected) => {
                          const selectedVal = userRoleList.find(
                            (item) => item.uuid === selected
                          );

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
                          return (
                            <Typography variant="h5">
                              {selectedVal.name}
                            </Typography>
                          );
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {userRoleList
                          ?.filter((item) =>
                            title === "Add Staff User"
                              ? item.name !== "PROVIDER"
                              : ""
                          )
                          .map((data) => {
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
                      {touched.role && errors.role && (
                        <FormHelperText error>
                          {errors.role.uuid}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "end" }}
                >
                  {" "}
                  <Grid pr={2}>
                    <ButtonBase
                      sx={formButtonStyle.cancelButtonStyle}
                      onClick={handleClose}
                    >
                      Cancel
                    </ButtonBase>
                  </Grid>
                  <Button
                    sx={formButtonStyle.saveButtonStyle}
                    onClick={submitForm}
                    // onClick={handleClickOpen}
                  >
                    <Typography
                      variant="h5"
                      sx={{ textTransform: "capitalize", fontWeight: 600 }}
                    >
                      Add
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
}

export default AddStaffUser;
