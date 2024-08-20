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

import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../../../src/styles/common";
// import { setAlert } from "../../../../../redux/actions/snackbar/alert.action";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import CustomFormLabel from "../../../../../../../../components/common/custom-form-label";
import { adminConstants } from "../../../../../../../../constants/admin";
import { usePatientSocialHistoryControllerServiceCreatePatientSocialHistory } from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { alertAction } from "../../../../../../../../store/features/common-actions/snackbar/alertSlice";

export const style = makeStyles(() => ({
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
export const actionButtonClose = {
  color: "#36588C !important",
  textTransform: "initial",
  border: "1px solid #36588C !important",
};
export const modalTitle = {
  marginBottom: "30px !important",
  fontWeight: "400 !important",
  textAlign: "center",
};
export const actionButtonAdd = {
  color: "#FFFF !important",
  textTransform: "initial",
  background: "#36588C !important",
};

interface AddMasterModelProps {
  source?: string;
  open: boolean;
  setOpen: any;
  title?: string;
  patientData: any;
  socialHistoryType: any;
  refetch: () => void;
}

// interface payload {
//   id?: number;
//   uuid?: string;
//   type?: BillingCodes.type;
//   code?: string;
//   description?: string;
//   source?: number;
//   active?: boolean;
//   archive?: boolean;
// }

function AddNewSocialHistory(props: AddMasterModelProps) {
  const {
    //source,
    open,
    setOpen,
    title,
    patientData,
    socialHistoryType,
    refetch,
  } = props;

  const { ADD, CHANGE } = adminConstants;
  const classes = style();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter the name"),
    description: Yup.string().required("Please enter the description"),
  });
  const initialVal = { name: "", description: "" };
  const [initialValues, setInitailValues] = useState({ ...initialVal });

  const { mutateAsync, isSuccess } =
    usePatientSocialHistoryControllerServiceCreatePatientSocialHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    const requestBody: any = {
      name: values.name,
      description: values.description,
      socialHistoryType: socialHistoryType,
      patientUuid: patientData?.uuid,
    };
    try {
      mutateAsync({ requestBody: requestBody })
        .then((res: any) => {
          refetch();
          resetForm();
          handleClose();
          setInitailValues({ ...initialVal });
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
  };

  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        handleFormSubmit(values, { resetForm });
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        submitForm,
        setFieldValue,
        handleSubmit,
        handleBlur,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle
                id="scroll-dialog-title"
                sx={{ marginBottom: "15px" }}
              >
                <Grid container alignItems={"center"}>
                  <Grid
                    item
                    xs={11}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
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
              <DialogContent sx={{ width: "450px" }}>
                <Box>
                  <Box>
                    <Grid container mb={1}>
                      <Grid item xs={12}>
                        <CustomFormLabel
                          label="Name"
                          source={CHANGE}
                          isRequired={true}
                        />
                      </Grid>
                    </Grid>
                    <InputBase
                      fullWidth
                      placeholder={title}
                      name="name"
                      value={values?.name}
                      classes={{
                        root: classes.masterFormLongInputField,
                        input: classes.inputBoxText2,
                        focused: classes.inputBoxActive2,
                        error: classes.inputBoxError,
                      }}
                      onBlur={handleBlur}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                      error={!!touched.name && !!errors.name}
                    />
                    {!!touched.name && !!errors.name && (
                      <FormHelperText error>{errors?.name}</FormHelperText>
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
                      value={values?.description}
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
                    {!!touched.description && !!errors.description && (
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
                  sx={formButtonStyle.saveButtonStyle}
                  // disabled={isSubmitting || !isValid}
                  onClick={submitForm}
                >
                  {ADD}
                </ButtonBase>
              </DialogActions>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}

export default React.memo(AddNewSocialHistory);
