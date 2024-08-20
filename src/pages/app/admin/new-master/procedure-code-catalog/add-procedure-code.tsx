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
import CloseIcon from "@mui/icons-material/Close";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { adminConstants } from "../../../../../constants/admin";
import {
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../styles/common";
import { useMedicalCodeControllerServiceAddBillingCodes } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { BillingCodes } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
// import { setAlert } from "../../../../../redux/actions/snackbar/alert.action";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";

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
  scroll?: string;
  title?: string;
  columns?: any;
  editData?: any;
  setIsDataAdded?: any;
  providerGroupUuid?: string;
}

// interface payload {
//   id?: number;
//   uuid?: string;
//   type: BillingCodes.type;
//   code: string;
//   description?: string;
//   source?: number;
//   active?: boolean;
//   archive?: boolean;
// }

function AddProcedureMaster(props: AddMasterModelProps) {
  const {
    //source,
    open,
    setOpen,
    scroll,
    title,
    editData,
    setIsDataAdded,
    providerGroupUuid,
  } = props;
  // const UIClasses = patientStyle();
  const { ADD, CHANGE } = adminConstants;
  const classes = style();
  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 50,
  //     },
  //   },
  // };
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required("Please enter the code")
      .matches(/^[a-zA-Z0-9]*$/, "Please enter the valid code")
      .min(5, "Code must be at least 5 characters")
      .max(5, "Code must not exceed 5 characters"),
    description: Yup.string().required("Please enter the description"),
    providerGroupUuid: Yup.string(),
  });
  const initialVal = { code: "", description: "", providerGroupUuid: "" };
  const [initialValues, setInitailValues] = useState({ ...initialVal });
  // const [openAlert] = React.useState(false);
  const {
    mutateAsync: add,
    isSuccess,
    data,
  } = useMedicalCodeControllerServiceAddBillingCodes();

  useEffect(() => {
    if (isSuccess && !!data) {
      setOpen(false);
      setIsDataAdded(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    setInitailValues((prevValues) => ({
      ...prevValues,
      code: editData?.code || "",
      description: editData?.description || "",
      providerGroupUuid: "",
    }));
  }, [editData]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (values: any) => {
    const requestBody: any = {
      id: undefined,
      uuid: editData?.uuid ? editData?.uuid : "",
      type: BillingCodes.type.CPT,
      code: values?.code,
      description: values.description,
      source: undefined,
      active: true,
      archive: false,
      providerGroupUuid: providerGroupUuid || "",
    };
    try {
      add({ requestBody: requestBody })
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
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
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
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box>
                        <Grid container mb={1}>
                          <Grid item xs={12}>
                            <CustomFormLabel
                              label="CPT Code Name"
                              source={CHANGE}
                              isRequired={true}
                            />
                          </Grid>
                        </Grid>
                        <InputBase
                          fullWidth
                          placeholder={title}
                          name="code"
                          value={values?.code}
                          classes={{
                            root: classes.masterFormLongInputField,
                            input: classes.inputBoxText2,
                            focused: classes.inputBoxActive2,
                            error: classes.inputBoxError,
                          }}
                          onBlur={handleBlur}
                          onChange={(e) =>
                            setFieldValue("code", e.target.value)
                          }
                          error={!!touched.code && !!errors.code}
                        />
                        {touched.code && errors.code && (
                          <FormHelperText error>{errors?.code}</FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    {/* <Grid item xs={6}>
                      <Box>
                        <Grid container mb={1}>
                          <Grid item xs={12}>
                            <CustomFormLabel
                              label="Code Type"
                              source={CHANGE}
                            />
                          </Grid>
                        </Grid>
                        <Select
                          className={UIClasses.selectInputStyle}
                          sx={{ marginTop: "0px !important" }}
                          value={values.type}
                          name="type"
                          onChange={(e: any) => handleSelectOption(e)}
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
                                    Select
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
                          {codeType?.map((data: any) => {
                            return (
                              <MenuItem
                                key={data}
                                value={data}
                                className={UIClasses.menuItemColorStyle}
                              >
                                {data}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {touched.code && errors.code && (
                          <FormHelperText error>{errors?.code}</FormHelperText>
                        )}
                      </Box>
                    </Grid> */}
                  </Grid>
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
                  {openAlert} {CANCEL}
                </ButtonBase> */}
                <ButtonBase
                  sx={formButtonStyle.saveButtonStyle}
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

export default React.memo(AddProcedureMaster);
