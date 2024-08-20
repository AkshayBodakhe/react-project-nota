import { useEffect, useState } from "react";

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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import {
  useMacrosControllerServiceCreateMacros,
  useMacrosControllerServiceUpdateMacros,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { Macros } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import {
  actionBtns,
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../styles/common";
import { validationSchema } from "./validation";

export const style = makeStyles(() => ({
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
}));

interface AddEditMacrosProps {
  dialogTitle: string;
  buttonTitle: string;
  open: boolean;
  editData: any;
  handleClose: () => void;
  isShow?: boolean;
  refetch?: any;
}
const AddEditMacros = (props: AddEditMacrosProps) => {
  const { open, dialogTitle, handleClose, isShow, refetch, editData } = props;
  const classes = commonWidget();
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const [resetFormData, setResetForm] = useState(false);
  const dispatch = useDispatch();
  const providerGroupUuid = providerDetail?.providerGroup || "";
  const initialValues = {
    id: "",
    uuid: "",
    templateName: "",
    description: "",
  };

  const { mutateAsync: createMacros } =
    useMacrosControllerServiceCreateMacros();

  const { mutateAsync: updateMacros } =
    useMacrosControllerServiceUpdateMacros();

  const handleFormSubmit = async (values: any) => {
    values.providerGroupUuid = providerGroupUuid;
    const requestBodyForCreate = {
      templateName: values.templateName,
      description: values.description,
      providerGroupUuid: providerGroupUuid,
    };

    try {
      if (!editData) {
        createMacros({ requestBody: requestBodyForCreate as Macros })
          .then((res: any) => {
            handleClose();
            setResetForm(true);
            refetch();
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
      }
    } catch (error: any) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: error.body.message,
          severity: "error",
        })
      );
    }

    const requestBodyForUpdate = {
      id: values.id,
      uuid: values.uuid,
      templateName: values.templateName,
      description: values.description,
      providerGroupUuid: providerGroupUuid,
    };

    try {
      if (editData) {
        updateMacros({ requestBody: requestBodyForUpdate as Macros })
          .then((res: any) => {
            handleClose();
            refetch();
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
      }
    } catch (error: any) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: error.body.message,
          severity: "error",
        })
      );
    }
    setResetForm((item) => !item);
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
      {({
        values,
        errors,
        touched,
        submitForm,
        setFieldValue,
        setValues,
        handleBlur,
        resetForm,
      }) => (
        useEffect(() => {
          if (editData) {
            setValues(props.editData || {});
          } else {
            resetForm();
          }
        }, [editData]),
        (useEffect(() => {
          if (resetFormData) {
            resetForm();
          }
        }, [resetFormData]),
        (
          <Form>
            <Dialog
              open={open}
              onClose={handleClose}
              scroll={"paper"}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              maxWidth="sm"
              fullWidth={true}
            >
              <DialogTitle id="scroll-dialog-title" sx={formTitle}>
                <Grid container alignItems={"center"}>
                  <Grid
                    item
                    xs={11}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {dialogTitle}
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{ display: "flex", justifyContent: "end" }}
                  >
                    <ButtonBase
                      onClick={() => {
                        resetForm();
                        handleClose();
                      }}
                    >
                      <CloseIcon />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <Box width={"100%"} p={1}>
                    <CustomFormLabel label="Title" isRequired={true} />
                    <InputBase
                      fullWidth
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue("templateName", e.target.value);
                      }}
                      error={!!(errors.templateName && touched.templateName)}
                      disabled={!!isShow}
                      name="templateName"
                      value={values.templateName}
                      placeholder="Enter macros name"
                      classes={{
                        root: classes.textFieldRoot,
                        input: classes.textFieldInput,
                        focused: classes.textFieldActive,
                        error: classes.inputBoxError,
                      }}
                    />
                    {touched.templateName && errors.templateName && (
                      <FormHelperText error>
                        {errors.templateName}
                      </FormHelperText>
                    )}
                    <Grid item xs={12} mt={2}>
                      <CustomFormLabel label="Description" isRequired={true} />
                      <InputBase
                        fullWidth
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue("description", e.target.value);
                        }}
                        error={!!(errors.description && touched.description)}
                        disabled={!!isShow}
                        name="description"
                        multiline={true}
                        rows={3}
                        value={values.description}
                        placeholder="Enter Description"
                        classes={{
                          root: classes.providerTextAreaField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                          error: classes.inputBoxError,
                        }}
                      />
                      {touched.description && errors.description && (
                        <FormHelperText error>
                          {errors.description}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Box>
                </Box>
              </DialogContent>
              {!isShow && (
                <DialogActions sx={formBottom}>
                  <Grid sx={actionBtns} p={1}>
                    <ButtonBase
                      onClick={() => {
                        resetForm();
                        handleClose();
                      }}
                      sx={formButtonStyle.cancelButtonStyle}
                    >
                      Cancel
                    </ButtonBase>
                    <ButtonBase
                      type="submit"
                      sx={formButtonStyle.saveButtonStyle}
                      // disabled={formik.isSubmitting || !formik.isValid}
                      onClick={submitForm}
                    >
                      {props?.editData ? "Save" : "Add"}
                    </ButtonBase>
                  </Grid>
                </DialogActions>
              )}
            </Dialog>
          </Form>
        ))
      )}
    </Formik>
  );
};

export default AddEditMacros;
