import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogContent,
  DialogContentText,
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
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  useContactDirectoryControllerServiceCreateContactDirectory,
  useContactDirectoryControllerServiceUpdateContactDirectory,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { ContactDirectory } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { commonWidget, formButtonStyle } from "../../../../../styles/common";
import { style } from "../../referral/style/common-style";
import { useSelector } from "react-redux";
import { handleKeyPress } from "../../../../../components/common/enums-and-interfaces/common-functions";
import CustomFormLabel from "../../../../../components/common/custom-form-label";

interface Props {
  title: string;
  onClose: () => void;
  open: boolean;
  refetch: () => {};
  editData?: any;
}

function AddEditContact(props: Props) {
  const { onClose, open, title, refetch, editData } = props;
  const classes = commonWidget();
  const commonStyle = style();
  const dispatch = useDispatch();
  const [contactType, setContactType] = useState<any>(null);
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup || "";
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter the full name").matches(/^[A-Za-z\s]+$/, "Please enter the valid full name"),
    contactType: Yup.string().required("Please select the contact type"),
    email: Yup.string()
      .required("Please enter the email")
      .matches(
        /^[a-zA-Z0-9._+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Please enter the valid email"
      ),
    contact: Yup.string()
      .required("Please enter the contact number")
      .matches(/^\d+$/, "Please enter the valid contact number")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits"),
    fax: Yup.string().nullable().matches(/^[\d-]*$/, "Please enter the valid fax number"),
    address: Yup.object().shape({
      line1: Yup.string().required("Please enter the address"),
      // line2: Yup.string().required("Address Line 2 is required"),
      city: Yup.string().required("Please enter the city name").matches(/^[A-Za-z\s]+$/, "Please enter the valid city name"),
      state: Yup.string().required("Please enter the state name").matches(/^[A-Za-z\s]+$/, "Please enter the valid state name"),
      country: Yup.string().required("Please enter the country name").matches(/^[A-Za-z\s]+$/, "Please enter the valid country name"),
      // zipcode: Yup.string().required("Please enter the zip code"),
    }),
  });

  const initialVal = {
    id: null,
    uuid: "",
    name: "",
    contactType: "",
    email: "",
    contact: "",
    fax: "",
    address: {
      id: null,
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
    },
  };

  const [initialValues, setInitailValues] = useState({ ...initialVal });
  const { mutateAsync, isSuccess } =
    useContactDirectoryControllerServiceCreateContactDirectory();
  const { mutateAsync: editDictionary, isSuccess: edit } =
    useContactDirectoryControllerServiceUpdateContactDirectory();
  const state = ["Maharashtra", "Kerala"];
  const country = ["India"];

  useEffect(() => {
    const type = Object.values(ContactDirectory.contactType) as string[];
    setContactType(type);
  }, []);

  useEffect(() => {
    if (isSuccess || edit) {
      refetch();
      onClose();
    }
  }, [isSuccess, edit]);

  useEffect(() => {
    if (editData) {
      setInitailValues((prevValues) => ({
        ...prevValues,
        id: editData.id,
        uuid: editData.uuid,
        name: editData.name,
        contactType: editData.type,
        email: editData.email,
        contact: editData.contact,
        fax: editData.fax,
        address: {
          id: editData?.address?.id,
          line1: editData?.address?.line1,
          line2: editData?.address?.line2,
          city: editData?.address?.city,
          state: editData?.address?.state,
          country: editData?.address?.country,
          zipcode: editData?.address?.zipcode,
        },
      }));
    }
  }, [editData]);

  const close = () => {
    onClose();
  };

  const handleFormSubmit = (values: any) => {
    values.providerGroupUuid = providerGroupUuid;
    if (!editData?.uuid) {
      try {
        mutateAsync({ requestBody: values })
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
    } else {
      try {
        editDictionary({ requestBody: values })
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
    }
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
      {({ values, errors, touched, submitForm, handleBlur }) => {
        return (
          <Form>
            <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
              <DialogTitle>
                <Grid className={commonStyle.dialogTitle}>
                  <Grid>
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                      {title}
                    </Typography>
                  </Grid>
                  <Grid style={{ cursor: "pointer" }}>
                    <CloseIcon onClick={close} />
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="scroll-dialog-description"
                  // ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <CustomFormLabel
                        label="Select Contact Type"
                        isRequired={true}
                      />
                      <Select
                        className={[
                          commonStyle.selectInputStyle,
                          errors.contactType ? classes.inputBoxError : "",
                          
                        ].join(" ")}
                        value={values.contactType}
                        name="contactType"
                        onChange={(e: any) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            contactType: e.target.value,
                          }))
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
                                  Select Type
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
                        {contactType?.map((data: any) => {
                          return (
                            <MenuItem
                              value={data}
                              className={commonStyle.menuItemColorStyle}
                            >
                              {data}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {!!touched.contactType && !!errors.contactType && (
                        <FormHelperText error>
                          {errors?.contactType}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={8}>
                      <CustomFormLabel label="Full Name" isRequired={true} />
                      <InputBase
                        type="text"
                        placeholder="Enter Full Name"
                        name="name"
                        onChange={(e) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            name: e.target.value,
                          }))
                        }
                        onKeyPress={(e) => {
                          handleKeyPress(e);
                        }}
                        error={!!touched.name && !!errors.name}
                        value={values.name}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched.name && !!errors.name && (
                        <FormHelperText error>{errors?.name}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel
                        label="Contact Number"
                        isRequired={true}
                      />
                      <InputBase
                        type="text"
                        placeholder="Enter Contact Number"
                        name="contact"
                        onChange={(e) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            contact: e.target.value,
                          }))
                        }
                        onKeyPress={(e) => {
                          if (!/\d/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        inputProps={{ maxLength: 10, pattern: "[0-9]*" }}          
                        error={!!touched.contact && !!errors.contact}
                        value={values.contact}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched.contact && !!errors.contact && (
                        <FormHelperText error>{errors?.contact}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel label="Fax Number"/>
                      <InputBase
                        type="text"
                        placeholder="Enter Fax Number"
                        name="fax"
                        onChange={(e) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            fax: e.target.value,
                          }))
                        }
                        error={!!touched.fax && !!errors.fax}
                        value={values.fax}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched.fax && !!errors.fax && (
                        <FormHelperText error>{errors?.fax}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel label="Email ID" isRequired={true} />
                      <InputBase
                        type="text"
                        placeholder="Enter Email ID"
                        name="email"
                        onChange={(e) =>
                          setInitailValues((prevValues) => ({
                            ...prevValues,
                            email: e.target.value,
                          }))
                        }
                        error={!!touched.email && !!errors.email}
                        value={values.email}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched.email && !!errors.email && (
                        <FormHelperText error>{errors?.email}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel
                        label="Address Line 1"
                        isRequired={true}
                      />
                      <InputBase
                        type="text"
                        placeholder="Enter Address Line 1"
                        name="line1"
                        onChange={(e) =>
                          setInitailValues((prevValues: any) => ({
                            ...prevValues,
                            address: {
                              ...prevValues.address,
                              line1: e.target.value,
                            },
                          }))
                        }
                        onKeyPress={(e) => {
                          handleKeyPress(e);
                        }}
                        error={
                          !!touched.address?.line1 && !!errors?.address?.line1
                        }
                        value={values.address.line1}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched?.address?.line1 &&
                        !!errors?.address?.line1 && (
                          <FormHelperText error>
                            {errors?.address?.line1}
                          </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel
                        label="Address Line 2"
                        isRequired={false}
                      />
                      <InputBase
                        type="text"
                        placeholder="Enter Address Line 1"
                        name="line2"
                        onChange={(e) =>
                          setInitailValues((prevValues: any) => ({
                            ...prevValues,
                            address: {
                              ...prevValues.address,
                              line2: e.target.value,
                            },
                          }))
                        }
                        onKeyPress={(e) => {
                          handleKeyPress(e);
                        }}
                        error={
                          !!touched.address?.line2 && !!errors?.address?.line2
                        }
                        value={values.address.line2}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched?.address?.line2 &&
                        !!errors?.address?.line2 && (
                          <FormHelperText error>
                            {errors?.address?.line2}
                          </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel label="City" isRequired={true} />
                      <InputBase
                        type="text"
                        placeholder="Enter City"
                        name="city"
                        onChange={(e) =>
                          setInitailValues((prevValues: any) => ({
                            ...prevValues,
                            address: {
                              ...prevValues.address,
                              city: e.target.value,
                            },
                          }))
                        }
                        onKeyPress={(e) => {
                          handleKeyPress(e);
                        }}
                        error={
                          !!touched.address?.city && !!errors?.address?.city
                        }
                        value={values.address.city}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched?.address?.city && !!errors?.address?.city && (
                        <FormHelperText error>
                          {errors?.address?.city}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel label="State" isRequired={true} />
                      <InputBase
                        type="text"
                        placeholder="Enter State"
                        name="state"
                        onChange={(e) =>
                          setInitailValues((prevValues: any) => ({
                            ...prevValues,
                            address: {
                              ...prevValues.address,
                              state: e.target.value,
                            },
                          }))
                        }
                        onKeyPress={(e) => {
                          handleKeyPress(e);
                        }}
                        error={
                          !!touched.address?.state && !!errors?.address?.state
                        }
                        value={values.address.state}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched?.address?.state &&
                        !!errors?.address?.state && (
                          <FormHelperText error>
                            {errors?.address?.state}
                          </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel label="Country" isRequired={true} />
                      <InputBase
                        type="text"
                        placeholder="Enter Country"
                        name="country"
                        onChange={(e) =>
                          setInitailValues((prevValues: any) => ({
                            ...prevValues,
                            address: {
                              ...prevValues.address,
                              country: e.target.value,
                            },
                          }))
                        }
                        onKeyPress={(e) => {
                          handleKeyPress(e);
                        }}
                        error={
                          !!touched.address?.country &&
                          !!errors?.address?.country
                        }
                        value={values.address.country}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched.address?.country &&
                        !!errors.address?.country && (
                          <FormHelperText error>
                            {errors?.address?.country}
                          </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                      <CustomFormLabel label="Zip Code" isRequired={false} />
                      <InputBase
                        type="text"
                        placeholder="Enter Zip Code"
                        name="zipcode"
                        onChange={(e) =>
                          setInitailValues((prevValues: any) => ({
                            ...prevValues,
                            address: {
                              ...prevValues.address,
                              zipcode: e.target.value,
                            },
                          }))
                        }
                        onKeyPress={(e) => {
                          if (!/\d/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        inputProps={{ maxLength: 5, pattern: "[0-9]*" }}                        
                        error={
                          !!touched.address?.zipcode &&
                          !!errors?.address?.zipcode
                        }
                        value={values.address.zipcode}
                        onBlur={handleBlur}
                        style={{ width: "100%" }}
                        classes={{
                          root: classes.textFieldFullWidth,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {!!touched?.address?.zipcode &&
                        !!errors?.address?.zipcode && (
                          <FormHelperText error>
                            {errors?.address?.zipcode}
                          </FormHelperText>
                        )}
                    </Grid>
                  </Grid>
                </DialogContentText>
                <Grid className={commonStyle.footer}>
                  <Grid className={commonStyle.footerBtn}>
                  <ButtonBase
                      onClick={close}
                      sx={formButtonStyle.cancelButtonStyle}
                    >
                      Cancel
                    </ButtonBase>
                    <ButtonBase
                      sx={formButtonStyle.saveButtonStyle}
                      // type="submit"
                      onClick={submitForm}
                    >
                      {title == "Edit Contact" ? "Save" : "Add"}
                    </ButtonBase>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddEditContact;
