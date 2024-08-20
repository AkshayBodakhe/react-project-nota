import {
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { adminConstants } from "../../../../../../../../constants/admin";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../../styles/common";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  useMedicalHistoryControllerServiceAddMedicalHistory,
  useMedicalHistoryControllerServiceUpdateMedicalHistory,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import moment from "moment";
import dayjs from "dayjs";
import * as Yup from "yup";
import { alertAction } from "../../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import CustomFormLabel from "../../../../../../../../components/common/custom-form-label";
import CloseIcon from "@mui/icons-material/Close";
export interface DialogProps {
  open: boolean;
  title: string;
  patientDetails: any;
  onClose: () => void;
  medicalHistory?: any;
  setRefetchData?: () => void;
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
}));

function AddEditPastMedicalHistory(props: DialogProps) {
  const [onsetDate, setOnsetDate] = useState<any>(dayjs(null));
  const { onClose, open, title, setRefetchData } = props;
  const { ADD, CANCEL, SAVE } = adminConstants;
  const [initialValues] = useState({
    id: "",
    uuid: "",
    name: "",
    onsetDate: "",
    patient: {
      uuid: props?.patientDetails?.uuid,
    },
    note: "",
  });
  const close = () => {
    onClose();
  };
  const classes = labStyle();
  const commonStyle = commonWidget();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"), // Name field is required
    // onsetDate: Yup.date().nullable().required("Onset date is required"), // Onset date field is required
    // note: Yup.string().required("Note is required"), // Note field is optional
  });

  const { mutateAsync } = props.medicalHistory
    ? useMedicalHistoryControllerServiceUpdateMedicalHistory()
    : useMedicalHistoryControllerServiceAddMedicalHistory();

  useEffect(() => {
    if (props.medicalHistory) {
      patchEditData(props.medicalHistory);
    }
  }, [props]);

  function patchEditData(data: any) {
    Object.keys(data).map((key) => {
      formik.setFieldValue(key, data[key]);
    });
    setOnsetDate(dayjs(data.onsetDate));
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
            <CustomFormLabel label="Condition Name" isRequired={true} />
            <InputBase
              placeholder="Enter Condition Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.name && !!formik.errors.name}
              style={{ width: "100%" }}
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
            <CustomFormLabel label=" Onset Date" isRequired={false} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                value={onsetDate}
                onChange={(event: any) => {
                  const date = moment(event.$d).format("yyyy-MM-DD");
                  setOnsetDate(dayjs(date));
                  formik.setFieldValue("onsetDate", date);
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
                    // border: formik.touched.onsetDate && formik.errors.onsetDate ? "1px solid red" : "",
                  },
                }}
              />
            </LocalizationProvider>
            {/* {formik.touched.onsetDate && formik.errors.onsetDate && (
              <FormHelperText error>{formik.errors.onsetDate}</FormHelperText>
            )} */}
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography variant="h5" className={classes.label}>
              Note
            </Typography>
            <InputBase
              placeholder="Type here"
              multiline={true}
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
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
          {title === "Edit Past Medical History" ? SAVE : ADD}
        </ButtonBase>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditPastMedicalHistory;
