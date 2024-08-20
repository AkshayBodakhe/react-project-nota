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
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { adminConstants } from "../../../../../../../../constants/admin";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../../styles/common";
import {
  useFamilyHistoryControllerServiceAddPatientsFamilyHistory,
  useFamilyHistoryControllerServiceUpdatePatientsFamilyHistory,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useFormik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import { alertAction } from "../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import CustomFormLabel from "../../../../../../../../components/common/custom-form-label";
import CloseIcon from "@mui/icons-material/Close";
export interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  patientData: any;
  familyHistory?: any;
  setRefetchData?: () => void;
}

interface RenderButtonProps {
  name: string;
  label: boolean;
  btnActive?: boolean;
}

export const labStyle = makeStyles(() => ({
  textFieldFullWidth: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    width: "100%",
  },
  label: {
    color: "#1A1A1A !important",
    marginBottom: "10px !important",
    fontSize: "14px !important",
  },
  dropZone: {
    minHeight: "200px !important",
  },
  uploadIcon: {
    fill: "#1A1A1A66",
  },
  textUploadZone: {
    color: "#1A1A1A",
    fontSize: "12px !important",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    border: "none",
    "& fieldset": { border: "none" },
    height: "42px !important",
    width: "100%",
    // marginTop: "10px",
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  keyStyle: {
    color: "#1A1A1A;",
    // marginTop: "24px",
    // marginBottom: "12px",
  },
  buttonActive: {
    fontSize: "16px !important",
    padding: "5px 10px!important",
    border: "1px solid #004186  !important",
    borderRadius: "5px !important",
    background: "#004186 !important",
    marginRight: "10px !important",
    width: "90px",
    height: "40px",
  },
  buttonTypoActive: {
    color: "#FFFFFF !important",
  },
  buttonTypoDeactive: { color: "#1A1A1A99" },
  buttonGrid1: {
    maxHeight: "40px",
    marginTop: "6px !important",
  },

  buttonDeactive: {
    padding: "5px 10px !important",
    border: "1px solid #00000029 !important",
    borderRadius: "5px !important",
    width: "90px",
    height: "40px",
    marginRight: "10px !important",
  },
}));

export const selectStatus = [
  {
    label: true,
    name: "Yes",
  },
  {
    label: false,
    name: "No",
  },
];

function AddEditFamilyHistory(props: DialogProps) {
  const { onClose, open, title, setRefetchData } = props;
  const { ADD, CANCEL, SAVE } = adminConstants;
  const close = () => {
    onClose();
  };
  const classes = labStyle();
  const commonStyle = commonWidget();
  const dispatch = useDispatch();
  const RelationType = ["FATHER", "BROTHER", "MOTHER"];
  const [initialValues] = useState({
    id: "",
    uuid: "",
    name: "",
    patient: {
      uuid: props?.patientData?.uuid,
    },
    relative: "",
    onSetAge: "",
    died: false,
    diedDate: null,
    note: "",
    active: true,
    archive: false,
  });

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
    name: Yup.string().required("Name is required"),
    relative: Yup.string().required("Please enter relative name"),
    onSetAge: Yup.number()
      .typeError("Age must be a number")
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .required("Age is required"),
    // note: Yup.string().required("Note is required"),
  });

  const { mutateAsync } = props.familyHistory?.uuid
    ? useFamilyHistoryControllerServiceUpdatePatientsFamilyHistory()
    : useFamilyHistoryControllerServiceAddPatientsFamilyHistory();

  useEffect(() => {
    if (props.familyHistory) {
      patchEditData(props.familyHistory);
    }
  }, [props]);

  function patchEditData(data: any) {
    Object.keys(data).map((key) => {
      formik.setFieldValue(key, data[key]);
    });
  }

  const handleSubmit = (values: any) => {
    try {
      mutateAsync({ requestBody: values })
        .then((res: any) => {
          setRefetchData && setRefetchData();
          props.onClose();
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const RenderButton: React.FC<RenderButtonProps> = ({ label, name }) => {
    return (
      <ButtonBase
        className={
          formik.values.died === label
            ? classes.buttonActive
            : classes.buttonDeactive
        }
        onClick={() => {
          formik.setFieldValue("died", label);
          formik.setFieldValue("diedDate", "");
        }}
        focusRipple
      >
        <Typography
          variant="h5"
          className={
            formik.values.died === label
              ? classes.buttonTypoActive
              : classes.buttonTypoDeactive
          }
        >
          {name}
        </Typography>
      </ButtonBase>
    );
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle id="scroll-dialog-title" sx={{ marginBottom: "15px" }}>
        <Grid container alignItems={"center"}>
          <Grid item xs={11} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={formTitle}>{title}</Typography>
          </Grid>
          <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
            <ButtonBase onClick={close}>
              <CloseIcon />
            </ButtonBase>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <CustomFormLabel label="Problem Name" isRequired={true} />
            <InputBase
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Enter Problem Name"
              onBlur={formik.handleBlur}
              style={{ width: "100%" }}
              error={!!formik.touched.name && !!formik.errors.name}
              classes={{
                root: commonStyle.textFieldFullWidth,
                input: commonStyle.textFieldInput,
                focused: commonStyle.textFieldActive,
                error: commonStyle.inputBoxError,
              }}
            />
            {formik.touched.name && formik.errors.name && (
              <FormHelperText error>{formik.errors.name}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel label="Relative" isRequired={true} />
            <InputBase
              name="relative"
              value={formik.values.relative}
              onChange={formik.handleChange}
              placeholder="Enter Relative Name"
              onBlur={formik.handleBlur}
              style={{ width: "100%" }}
              error={!!formik.touched.relative && !!formik.errors.relative}
              classes={{
                root: commonStyle.textFieldFullWidth,
                input: commonStyle.textFieldInput,
                focused: commonStyle.textFieldActive,
                error: commonStyle.inputBoxError,
              }}
            />
            {formik.touched.relative && formik.errors.relative && (
              <FormHelperText error>{formik.errors.relative}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={6}>
            <CustomFormLabel label="Onset Age" isRequired={true} />
            <InputBase
              placeholder="Enter Age"
              name="onSetAge"
              style={{ width: "100%" }}
              value={formik.values.onSetAge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.onSetAge && !!formik.errors.onSetAge}
              classes={{
                root: commonStyle.textFieldFullWidth,
                input: commonStyle.textFieldInput,
                focused: commonStyle.textFieldActive,
                error: commonStyle.inputBoxError,
              }}
            />
            {formik.touched.onSetAge && formik.errors.onSetAge && (
              <FormHelperText error>{formik.errors.onSetAge}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" className={classes.keyStyle}>
              Deceased
            </Typography>
            <Box>
              <Box className={classes.buttonGrid1}>
                {selectStatus.map((data: any) => {
                  return (
                    <RenderButton
                      key={data.label}
                      label={data.label}
                      name={data.name}
                    />
                  );
                })}
              </Box>
            </Box>
          </Grid>
          {formik.values.died && (
            <Grid item xs={6}>
              <Typography variant="h5" className={classes.label}>
                Date
              </Typography>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    value={formik.values.diedDate}
                    onChange={(event: any) => {
                      const date = moment(event.$d).format("yyyy-MM-DD");
                      // setRecordedDate(dayjs(date));
                      formik.setFieldValue("diedDate", date);
                    }}
                    slotProps={{ textField: { size: "small" } }}
                    sx={{
                      width: "100%",
                      "& fieldset": { border: "none" },
                      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                      "& label": {
                        color: "#1A1A1A80 !important",
                        fontSize: "14px !important",
                      },
                      "& .MuiInputBase-root": {
                        height: "42px",
                        fontSize: "14px",
                        borderRadius: "5px",
                        // border: formik.errors.diedDate ? "1px solid red" : "",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} lg={12}>
            <Typography variant="h5" className={classes.label}>
              Note
            </Typography>
            <InputBase
              placeholder="Type here"
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              multiline={true}
              rows="3"
              onBlur={formik.handleBlur}
              // error={!!formik.touched.note && !!formik.errors.note}
              classes={{
                root: commonStyle.providerTextAreaField,
                input: commonStyle.textFieldInput,
                focused: commonStyle.textFieldActive,
                error: commonStyle.inputBoxError,
              }}
            />
            {/* {formik.touched.note && formik.errors.note && (
              <FormHelperText error>{formik.errors.note}</FormHelperText>
            )} */}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
      >
        <ButtonBase onClick={close} sx={formButtonStyle.cancelButtonStyle}>
          {CANCEL}
        </ButtonBase>
        <ButtonBase
          sx={formButtonStyle.saveButtonStyle}
          onClick={formik.submitForm}
        >
          {title === "Edit Family History" ? SAVE : ADD}
        </ButtonBase>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditFamilyHistory;
