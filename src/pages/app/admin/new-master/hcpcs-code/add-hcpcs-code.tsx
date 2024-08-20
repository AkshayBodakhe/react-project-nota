/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import CommonSnackbar from "../../../../../components/common/commonSnackBar/snackBar";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { adminConstants } from "../../../../../constants/admin";
import {
  useMedicalCodeControllerServiceAddBillingCodes,
  useMedicalCodeControllerServiceUpdateBillingCodes,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { BillingCodes } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../styles/common";
// import { setAlert } from "../../../../../redux/actions/snackbar/alert.action";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";

export const addLabCatalog = makeStyles(() => ({
  masterFormLongInputField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
  },
  inputBoxActive2: {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: `0px 0px 6px #0097F002 !important`,
    border: `1px solid #0097F0 !important`,
    borderRadius: "4px !important",
  },

  inputBoxError: {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: "0px 0px 6px #ef53502 !important",
    border: "1px solid #ef5350 !important",
    borderRadius: "4px !important",
  },
  inputBoxText2: {
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  providerTextAreaField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    size: "small",
    textAlign: "center",
    padding: "10px 0px 10px 10px !important",
    fontSize: "16px",
    minHeight: "81px",
  },
}));

interface AddMasterModelProps {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  HCPCSData?: any;
  getHCPCSData?: any;
  providerGroupUuid?: string;
}

function AddHcpcsCode(props: AddMasterModelProps) {
  const {
    //source,
    open,
    setOpen,
    scroll,
    title,
    HCPCSData,
    getHCPCSData,
    providerGroupUuid,
  } = props;
  const { ADD, CHANGE } = adminConstants;
  const classes = addLabCatalog();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    testname: Yup.string()
      .required("Please enter the code")
      .matches(/^[a-zA-Z0-9]*$/, "Please enter the valid code")
      .min(5, "Code must be at least 5 characters")
      .max(5, "Code must not exceed 5 characters"),
    description: Yup.string().required("Please enter the description"),
    providerGroupUuid: Yup.string(),
  });
  const initialVal = { testname: "", description: "" };
  const [initialValues, setInitailValues] = useState({ ...initialVal });
  const [openAlert, setOpenAlert] = React.useState(false);

  const { mutateAsync, isSuccess } =
    useMedicalCodeControllerServiceAddBillingCodes();

  const { mutateAsync: editHCPCS, isSuccess: suceessEditHCPCS } =
    useMedicalCodeControllerServiceUpdateBillingCodes();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setOpenAlert(true);
      getHCPCSData();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (suceessEditHCPCS) {
      setOpen(false);
      setOpenAlert(true);
      getHCPCSData();
    }
  }, [suceessEditHCPCS]);

  useEffect(() => {
    setInitailValues((prevValues) => ({
      ...prevValues,
      testname: HCPCSData?.code || "",
      description: HCPCSData?.description || "",
      providerGroupUuid: providerGroupUuid || "",
    }));
  }, [HCPCSData]);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleCloseBar = () => {
  //   setOpenAlert(false);
  // };

  const handleFormSubmit = (values: any) => {
    const requestBody: any = {
      id: undefined,
      uuid: HCPCSData?.uuid ? HCPCSData?.uuid : "",
      type: BillingCodes.type.HCPCS,
      code: values.testname,
      description: values.description,
      source: undefined,
      active: true,
      archive: false,
      providerGroupUuid: providerGroupUuid || "",
    };
    if (title === "Add HCPCS Code") {
      try {
        mutateAsync({ requestBody: requestBody })
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
    } else if (title === "Edit HCPCS Code") {
      try {
        editHCPCS({ requestBody: requestBody })
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
      {({ values, errors, touched, submitForm, setFieldValue, handleBlur }) => {
        return (
          <Form>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle
                id="scroll-dialog-title"
                sx={{ marginBottom: "15px" }}
              >
                <Grid container alignItems={"center"}>
                  <Grid item xs={11}>
                    <Typography sx={formTitle}>{title}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{ display: "flex", justifyContent: "end" }}
                  >
                    <ButtonBase onClick={handleClose}>
                      <CloseIcon />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent
                dividers={scroll === "paper"}
                sx={{ width: "450px" }}
              >
                <Box>
                  <Box>
                    <Grid container mb={1}>
                      <Grid item xs={12}>
                        <CustomFormLabel
                          label={"HCPCS Code Name"}
                          source={CHANGE}
                          isRequired={true}
                        />
                      </Grid>
                    </Grid>
                    <InputBase
                      fullWidth
                      placeholder={title}
                      name="testname"
                      value={values.testname}
                      classes={{
                        root: classes.masterFormLongInputField,
                        input: classes.inputBoxText2,
                        focused: classes.inputBoxActive2,
                        error: classes.inputBoxError,
                      }}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("testname", e.target.value)
                      }
                      error={!!touched.testname && !!errors.testname}
                    />
                    {touched.testname && errors.testname && (
                      <FormHelperText error>{errors?.testname}</FormHelperText>
                    )}
                  </Box>
                  <Box sx={{ marginTop: "20px !important" }}>
                    <Grid container mb={1}>
                      <Grid item xs={12}>
                        <CustomFormLabel
                          label={"Description"}
                          source={CHANGE}
                          isRequired={true}
                        />
                      </Grid>
                    </Grid>
                    <InputBase
                      fullWidth
                      id="document-name-label"
                      role="textbox"
                      multiline={true}
                      rows="3"
                      placeholder="Description"
                      type="text"
                      name="description"
                      value={values.description}
                      classes={{
                        root: classes.providerTextAreaField,
                        input: classes.inputBoxText2,
                        focused: classes.inputBoxActive2,
                        error: classes.inputBoxError,
                      }}
                      onBlur={handleBlur}
                      onChange={(e) =>
                        setFieldValue("description", e.target.value)
                      }
                      error={!!touched.description && !!errors.description}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error>
                        {errors?.description}
                      </FormHelperText>
                    )}
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions
                sx={{
                  paddingRight: "20px !important",
                  gap: "10px",
                  ...formBottom,
                }}
              >
                {/* <ButtonBase
                  onClick={handleClose}
                  sx={formButtonStyle.cancelButtonStyle}
                >
                  {CANCEL}
                </ButtonBase> */}
                <ButtonBase
                  type="submit"
                  sx={formButtonStyle.saveButtonStyle}
                  // disabled={isSubmitting || !isValid}
                  onClick={submitForm}
                >
                  {ADD}
                </ButtonBase>
              </DialogActions>
            </Dialog>
            <CommonSnackbar
              open={openAlert}
              message={
                title === "Add HCPCS Code"
                  ? "Data Added Sucessfully"
                  : "Data Updated Successfully"
              }
              severity="success"
              // onClose={handleCloseBar}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default React.memo(AddHcpcsCode);
