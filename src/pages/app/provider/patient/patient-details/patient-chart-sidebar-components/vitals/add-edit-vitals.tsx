import CloseIcon from "@mui/icons-material/Close";
import {
  ButtonBase,
  Dialog,
  DialogActions,
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
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import { handleKeyPress } from "../../../../../../../components/common/enums-and-interfaces/common-functions";
import { useVitalControllerServiceAddPatientVitals } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../styles/common";
import { VitalTypes } from "../enums-interfaces/enums";
import { commonPorviderGroupWidget } from "../vaccine/add-edit-vaccine";
import { Payload } from "./payLoad";

export const mg = [
  {
    key: "MG",
    value: "mg",
  },
  {
    key: "TABLET",
    value: "Tablet(s)",
  },
];

export const route = [
  {
    key: "BUCCAL",
    value: "Buccal",
  },
  {
    key: "DENTAL",
    value: "Dental",
  },
  {
    key: "EPIDURAL",
    value: "Epidural",
  },
  {
    key: "INJECTION",
    value: "Injection",
  },
];

export const site = [
  {
    key: "ANKLE_LEFT",
    value: "Ankle, left",
  },
  {
    key: "ANKLE_RIGHT",
    value: "Ankle, right",
  },
  {
    key: "BLADDER",
    value: "Bladder",
  },
  {
    key: "ARM_LEFT_UPPER",
    value: "Arm,left,upper",
  },
];

export const multiSelectDropDown = {
  marginTop: "15px",
  border: "none",
  "& fieldset": { border: "none" },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",

  ".MuiOutlinedInput-root": {
    padding: "0px !important",
    height: "auto !important",
  },
  ".MuiChip-root": {
    height: "28px !important",
  },
};

export const medStyle = makeStyles({
  contentContainer: {
    display: "flex",
    justifyContent: "start",
    gap: "15px",
    alignItems: "end",
  },
});

interface AddEditVitalProps {
  title: string;
  onClose: () => void;
  open: boolean;
  patientData: any;
  refetch?: any;
}

export const vitalStyle = makeStyles({
  container: {
    display: "flex",
    gap: "1%",
    alignItems: "end",
  },
});

const styles = {
  key: {
    color: "#1A1A1A",
    //   fontWeight: "600",
    marginBottom: "12px",
  },
  btnStyle: {
    textTransform: "initial",
    padding: "8px 10px",
    //   fontWeight: "600",
    "&:hover": {
      backgroundColor: "#004186",
    },
  },
};

export const sitting = [
  {
    key: "regular",
    value: "Regular",
  },
  {
    key: "irregular",
    value: "Irregular",
  },
];

export interface VitalType {
  type: VitalTypes;
}

export default function AddEditVitals(props: AddEditVitalProps) {
  const classes = vitalStyle();
  const dispatch = useDispatch();
  const classDepartment = commonPorviderGroupWidget();
  const commonStyle = commonWidget();
  const { open, title, onClose, patientData, refetch } = props;
  const descriptionElementRef = useRef<HTMLElement>(null);
  const [initialValues, setInitailValues] = useState({
    uuid: "",
    recordedDate: "",
    vitalTime: "",
    systolic: "",
    diastolic: "",
    BPPosition: "",
    BPArea: "",
    BPM: "",
    respirationRate: "",
    oxygenSaturation: "",
    bodyMassIndex: "",
    heightFT: "",
    temperature: "",
    heightIN: "",
    weight: "",
    weightUnit: "",
    note: "",
    heightUnit: "",
    tempUnit: "",
    tempArea: "",
  });
  const [RecordedDate, setRecordedDate] = useState<any>(dayjs(""));
  const { mutateAsync } = useVitalControllerServiceAddPatientVitals();
  const [position] = useState(["Standing", "Sitting"]);
  const [area] = useState(["Left-arm", "Right-arm", "Wrist"]);
  const [heightOptions] = useState(["Feet", "Inches", "Meter", "Centimeters"]);
  const [tempOptions] = useState(["Celsius", "Fahrenheit"]);
  const [weightUnits] = useState(["g", "Kg"]);
  const [tempAreaOptions] = useState([
    "Oral",
    "Temporal",
    "Rectal",
    "Axilllary (underarms)",
    "Ear",
  ]);

  const [height, setHeight] = useState<any>(0);
  const [weight, setWeight] = useState<any>(0);
  const [bmi, setBMI] = useState("");

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
    recordedDate: Yup.string().required("Recorded date is required"),
    systolic: Yup.string().required("Systolic is required"),
    diastolic: Yup.string().required("Diastolic is required"),
    vitalTime: Yup.string().required("Vital time is required"),
  });

  useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  const combineDateTime = (selectedDate: any, selectedTime: any) => {
    // Convert selectedDate to Moment.js object
    const dateMoment = moment(selectedDate);

    // Combine date and time using Moment.js
    const dateTimeString = `${dateMoment.format("YYYY-MM-DD")}T${selectedTime}`;
    const combinedDateTime = moment(dateTimeString);

    return combinedDateTime;
  };

  const handleSubmit = (values: any) => {
    const recordedDate = combineDateTime(
      values?.recordedDate,
      values?.vitalTime
    );
    let requestBody: any = {
      patient: {
        uuid: patientData?.uuid,
      },
      note: values.note,
      recordedDate: recordedDate,
      patientVitals: Payload(values),
    };

    try {
      mutateAsync({ requestBody: requestBody })
        .then((res: any) => {
          refetch();
          handleClose();
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

  const handleChange = (
    formikValue: any[],
    type: any,
    name: string,
    value: any
  ) => {
    formikValue.map((vital: any) => {
      if (vital.name === type) {
        vital[name] = value;
        vital.recordedDate = RecordedDate;
      }
    });
    // }
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightFT = parseFloat(height);
      const weight1 = parseFloat(weight);
      const heightMeters = heightFT / 100;
      const bmiValue = (weight1 / (heightMeters * heightMeters)).toFixed(2);
      formik.setFieldValue("bodyMassIndex", bmiValue);
      setBMI(bmiValue);
    } else {
      formik.setFieldValue("bodyMassIndex", "");
      setBMI("");
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid container alignItems={"center"}>
            <Grid
              item
              xs={11}
              sx={{ display: "flex", justifyContent: "start" }}
            >
              <Typography sx={formTitle}>{title}</Typography>
            </Grid>
            <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
              <ButtonBase onClick={handleClose}>
                <CloseIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <CustomFormLabel label="Date" isRequired={false} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(date: any) => {
                      const newDate = new Date(date);
                      formik.setFieldValue("recordedDate", newDate);
                    }}
                    value={
                      formik.values.recordedDate
                        ? dayjs(formik.values.recordedDate)
                        : null
                    }
                    disableFuture={true}
                    slotProps={{
                      textField: { size: "small" },
                    }}
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
                        // color: "#1A1A1A7F !important",
                        border:
                          formik.touched.recordedDate &&
                          formik.errors.recordedDate
                            ? "1px solid red"
                            : "",
                        borderRadius: "5px",
                      },
                    }}
                  />
                </LocalizationProvider>
                {formik.touched.recordedDate && formik.errors.recordedDate && (
                  <FormHelperText error>
                    {formik.errors.recordedDate}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <CustomFormLabel label="Time" isRequired={false} />
                <InputBase
                  fullWidth
                  id="document-name-label"
                  name="vitalTime"
                  value={formik.values.vitalTime}
                  placeholder="Administered By"
                  type="time"
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: "5px !important",
                    },
                  }}
                  error={
                    !!formik.touched.vitalTime && !!formik.errors.vitalTime
                  }
                  onBlur={formik.handleBlur}
                  classes={{
                    root: classDepartment.AddressFormLongtInputField2,
                    // input: classDepartment.inputBoxText2,
                    focused: classDepartment.inputBoxActive2,
                    error: commonStyle.inputBoxError,
                  }}
                  onChange={(e) => {
                    formik.setFieldValue("vitalTime", e.target.value);
                  }}
                />
                {formik.touched.vitalTime && formik.errors.vitalTime && (
                  <FormHelperText error>
                    {formik.errors.vitalTime}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#1A1A1A" }}
                >
                  Blood Pressure (mmhg)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CustomFormLabel label="Systolic" isRequired={false} />
                <InputBase
                  type="text"
                  placeholder="Enter"
                  name="systolic"
                  onChange={(e) =>
                    formik.setFieldValue("systolic", e.target.value)
                  }
                  onKeyPress={(e: any) => {
                    handleKeyPress(e);
                  }}
                  error={!!formik.touched.systolic && !!formik.errors.systolic}
                  value={formik.values.systolic}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                  classes={{
                    root: commonStyle.textFieldFullWidth,
                    input: commonStyle.textFieldInput,
                    focused: commonStyle.textFieldActive,
                    error: commonStyle.inputBoxError,
                  }}
                />
                {formik.touched.systolic && formik.errors.systolic && (
                  <FormHelperText error>
                    {formik.errors.systolic}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <CustomFormLabel label="Daistolic" isRequired={false} />
                <InputBase
                  type="text"
                  placeholder="Enter"
                  name="Diastolic"
                  onChange={(e) =>
                    formik.setFieldValue("diastolic", e.target.value)
                  }
                  onKeyPress={(e: any) => {
                    handleKeyPress(e);
                  }}
                  error={
                    !!formik.touched.diastolic && !!formik.errors.diastolic
                  }
                  value={formik.values.diastolic}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                  classes={{
                    root: commonStyle.textFieldFullWidth,
                    input: commonStyle.textFieldInput,
                    focused: commonStyle.textFieldActive,
                    error: commonStyle.inputBoxError,
                  }}
                />
                {formik.touched.diastolic && formik.errors.diastolic && (
                  <FormHelperText error>
                    {formik.errors.diastolic}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={6}>
                <Select
                  className={[
                    commonStyle.selectInputStyle,
                    // errors.task ? classes.inputBoxError : "",
                  ].join(" ")}
                  value={formik.values.BPPosition}
                  name="BPPosition"
                  onChange={(e: any) =>
                    formik.setFieldValue("BPPosition", e.target.value)
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
                            Select Position
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {position?.map((data: any) => {
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
              </Grid>
              <Grid item xs={6}>
                <Select
                  className={[
                    commonStyle.selectInputStyle,
                    // errors.task ? classes.inputBoxError : "",
                  ].join(" ")}
                  value={formik.values.BPArea}
                  name="BPArea"
                  onChange={(e: any) =>
                    formik.setFieldValue("BPArea", e.target.value)
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
                            Select Area
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {area?.map((data: any) => {
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
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1A1A1A" }}
                  >
                    Heart Rate
                  </Typography>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <CustomFormLabel label="BPM" isRequired={false} />
                  <InputBase
                    type="text"
                    placeholder="Enter"
                    name="BPM"
                    onChange={(e) =>
                      formik.setFieldValue("BPM", e.target.value)
                    }
                    onKeyPress={(e: any) => {
                      handleKeyPress(e);
                    }}
                    error={!!formik.touched.BPM && !!formik.errors.BPM}
                    value={formik.values.BPM}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                    classes={{
                      root: commonStyle.textFieldFullWidth,
                      input: commonStyle.textFieldInput,
                      focused: commonStyle.textFieldActive,
                      error: commonStyle.inputBoxError,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1A1A1A" }}
                  >
                    Respiratory Rate
                  </Typography>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <CustomFormLabel label="BPM" isRequired={false} />
                  <InputBase
                    type="text"
                    placeholder="Enter"
                    name="respirationRate"
                    onChange={(e) =>
                      formik.setFieldValue("respirationRate", e.target.value)
                    }
                    onKeyPress={(e: any) => {
                      handleKeyPress(e);
                    }}
                    error={
                      !!formik.touched.respirationRate &&
                      !!formik.errors.respirationRate
                    }
                    value={formik.values.respirationRate}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                    classes={{
                      root: commonStyle.textFieldFullWidth,
                      input: commonStyle.textFieldInput,
                      focused: commonStyle.textFieldActive,
                      error: commonStyle.inputBoxError,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1A1A1A" }}
                  >
                    Oxygen Saturation
                  </Typography>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <CustomFormLabel label="%" isRequired={false} />
                  <InputBase
                    type="text"
                    placeholder="Enter"
                    name="oxygenSaturation"
                    onChange={(e) =>
                      formik.setFieldValue("oxygenSaturation", e.target.value)
                    }
                    onKeyPress={(e: any) => {
                      handleKeyPress(e);
                    }}
                    error={
                      !!formik.touched.oxygenSaturation &&
                      !!formik.errors.oxygenSaturation
                    }
                    value={formik.values.oxygenSaturation}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                    classes={{
                      root: commonStyle.textFieldFullWidth,
                      input: commonStyle.textFieldInput,
                      focused: commonStyle.textFieldActive,
                      error: commonStyle.inputBoxError,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1A1A1A" }}
                  >
                    Body Mass Index
                  </Typography>
                </Grid>
                <Grid item xs={12} mt={2}>
                  <CustomFormLabel label="&#8203;" isRequired={false} />
                  <InputBase
                    type="text"
                    placeholder="Enter"
                    name="bodyMassIndex"
                    readOnly
                    onChange={(e) =>
                      formik.setFieldValue("bodyMassIndex", e.target.value)
                    }
                    onKeyPress={(e: any) => {
                      handleKeyPress(e);
                    }}
                    error={
                      !!formik.touched.bodyMassIndex &&
                      !!formik.errors.bodyMassIndex
                    }
                    value={bmi}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                    classes={{
                      root: commonStyle.textFieldFullWidth,
                      input: commonStyle.textFieldInput,
                      focused: commonStyle.textFieldActive,
                      error: commonStyle.inputBoxError,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#1A1A1A" }}
                >
                  Height
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <InputBase
                  type="text"
                  placeholder="Enter"
                  name="heightFT"
                  onChange={(e) => {
                    formik.setFieldValue("heightFT", e.target.value),
                      setHeight(e.target.value);
                    calculateBMI();
                  }}
                  error={!!formik.touched.heightFT && !!formik.errors.heightFT}
                  value={formik.values.heightFT}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                  classes={{
                    root: commonStyle.textFieldFullWidth,
                    input: commonStyle.textFieldInput,
                    focused: commonStyle.textFieldActive,
                    error: commonStyle.inputBoxError,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  className={[
                    commonStyle.selectInputStyle,
                    // errors.task ? classes.inputBoxError : "",
                  ].join(" ")}
                  value={formik.values.heightUnit}
                  name="heightUnit"
                  onChange={(e: any) =>
                    formik.setFieldValue("heightUnit", e.target.value)
                  }
                  sx={{ marginTop: "0px !important" }}
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
                            Select Unit
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {heightOptions?.map((data: any) => {
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
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#1A1A1A" }}
                >
                  Temperature
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CustomFormLabel label="&#8203;" isRequired={false} />
                <InputBase
                  type="text"
                  placeholder="Enter"
                  name="temperature"
                  onChange={(e) =>
                    formik.setFieldValue("temperature", e.target.value)
                  }
                  onKeyPress={(e: any) => {
                    handleKeyPress(e);
                  }}
                  error={
                    !!formik.touched.temperature && !!formik.errors.temperature
                  }
                  value={formik.values.temperature}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                  classes={{
                    root: commonStyle.textFieldFullWidth,
                    input: commonStyle.textFieldInput,
                    focused: commonStyle.textFieldActive,
                    error: commonStyle.inputBoxError,
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <CustomFormLabel label="degree" isRequired={false} />
                <Select
                  className={[
                    commonStyle.selectInputStyle,
                    // errors.task ? classes.inputBoxError : "",
                  ].join(" ")}
                  value={formik.values.tempUnit}
                  name="tempUnit"
                  onChange={(e: any) =>
                    formik.setFieldValue("tempUnit", e.target.value)
                  }
                  sx={{ marginTop: "0px !important" }}
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
                            Select Unit
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {tempOptions?.map((data: any) => {
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
              </Grid>
              <Grid item xs={6}>
                <CustomFormLabel label="&#8203;" isRequired={false} />
                <Select
                  className={[
                    commonStyle.selectInputStyle,
                    // errors.task ? classes.inputBoxError : "",
                  ].join(" ")}
                  value={formik.values.tempArea}
                  name="tempArea"
                  onChange={(e: any) =>
                    formik.setFieldValue("tempArea", e.target.value)
                  }
                  sx={{ marginTop: "0px !important" }}
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
                            Select Area
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {tempAreaOptions?.map((data: any) => {
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
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                {/* <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#1A1A1A" }}
                  >
                    Weight
                  </Typography>
                </Grid> */}
                <Grid item xs={12}>
                  <CustomFormLabel label="Weight" isBold isRequired={false} />
                  <InputBase
                    type="text"
                    placeholder="Enter"
                    name="weight"
                    onChange={(e) => {
                      formik.setFieldValue("weight", e.target.value),
                        setWeight(e.target.value);
                      calculateBMI();
                    }}
                    error={!!formik.touched.weight && !!formik.errors.weight}
                    value={formik.values.weight}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }}
                    classes={{
                      root: commonStyle.textFieldFullWidth,
                      input: commonStyle.textFieldInput,
                      focused: commonStyle.textFieldActive,
                      error: commonStyle.inputBoxError,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <CustomFormLabel label="&#8203;" isRequired={false} />
                <Select
                  className={[
                    commonStyle.selectInputStyle,
                    // errors.task ? classes.inputBoxError : "",
                  ].join(" ")}
                  value={formik.values.weightUnit}
                  name="weightUnit"
                  onChange={(e: any) =>
                    formik.setFieldValue("weightUnit", e.target.value)
                  }
                  sx={{ marginTop: "0px !important" }}
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
                            Select Area
                          </Typography>
                        </span>
                      );
                    }
                    return <Typography variant="h5">{selected}</Typography>;
                  }}
                  MenuProps={MenuProps}
                  displayEmpty
                >
                  {weightUnits?.map((data: any) => {
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
              </Grid>
              <Grid item xs={12}>
                <CustomFormLabel label="Note" />
                <InputBase
                  fullWidth
                  multiline={false}
                  name="note"
                  value={formik.values.note}
                  rows="3"
                  placeholder="Enter"
                  classes={{
                    root: commonStyle.providerTextAreaField,
                    input: commonStyle.textFieldInput,
                    focused: commonStyle.textFieldActive,
                    error: commonStyle.inputBoxError,
                  }}
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.note && formik.errors.note)}
                  onChange={(e) => formik.setFieldValue("note", e.target.value)}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
        >
          <ButtonBase
            onClick={handleClose}
            sx={formButtonStyle.cancelButtonStyle}
          >
            Cancel
          </ButtonBase>
          <ButtonBase
            sx={formButtonStyle.saveButtonStyle}
            onClick={formik.submitForm}
          >
            Add
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}
