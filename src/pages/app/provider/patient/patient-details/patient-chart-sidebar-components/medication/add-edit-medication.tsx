import {
  Autocomplete,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  // MenuItem,
  TextField,
  Typography,
  // styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SelectInput from "../../../../../../../components/common/select-input";
import { adminConstants } from "../../../../../../../constants/admin";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../styles/common";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import {
  useDrugCatalogControllerServiceGetAllDrugs,
  useMedicationsControllerServiceAddPatientMedication,
  useMedicationsControllerServiceUpdatePatientMedication,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import * as Yup from "yup";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { handleKeyPress } from "../../../../../../../components/common/enums-and-interfaces/common-functions";
import {
  DosageTimeList,
  DosageUnitList,
  DosageWhenList,
} from "../../../../../../../components/common/form-enum";
import {
  ADD_TITLE_BUTTON,
  SAVE_BUTTON_TITLE,
} from "../adherence-to-treatment/common-const";
export interface DialogProps {
  open: boolean;
  title: string;
  patientData: any;
  isEditData?: any;
  onClose: () => void;
  setRefetchData?: any;
}

// const StyledDatePicker = styled(DatePicker)(() => ({
//   "& .MuiInputBase-root": {
//     borderRadius: "5px",
//     border: "none",
//     "& fieldset": { border: "none" },
//     boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
//     textAlign: "center",
//   },
//   "& .MuiInputBase-input": {
//     padding: "10px !important",
//   },
//   "& .Mui-focused": {
//     background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
//     boxShadow: `0px 0px 6px #00418602 !important`,
//     border: `1px solid #004186 !important`,
//     borderRadius: "4px !important",
//   },
// }));

export const medStyle = makeStyles({
  contentContainer: {
    display: "flex",
    justifyContent: "start",
    gap: "15px",
    alignItems: "end",
  },
  activeStyle: {
    background: "#004186",
    fontSize: "5rem",
  },
  hello: {
    background: "yellow",
  },
});

const med = {
  keyStyle: {
    color: "#1A1A1A;",
    marginTop: "24px",
    marginBottom: "12px",
  },
};

export const buttonStyle = makeStyles(() => ({
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
  timeSlot: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  inputLabel: {
    marginTop: "18px",
  },
}));

export const multiSelectDropDown = {
  marginTop: "15px",
  border: "none",
  "& fieldset": { border: "none" },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",

  ".MuiOutlinedInput-root": {
    padding: "0px !important",
    height: "42px !important",
    fontSize: "14px !important",
  },
  ".MuiChip-root": {
    height: "28px !important",
  },
};

export const selectType = [
  { label: "Chronic", name: "Chronic" },
  { label: "Acute", name: "Acute" },
];

const commonPorviderGroupWidget = makeStyles(() => ({
  providerGroupHeaderLayout: {
    display: "flex",
    padding: "15px",
    justifyContent: "space-between",
    marginBottom: "20px",
    "@media (max-width: 820px)": {
      gap: "1rem",
      display: "block",
    },
    "@media (max-width: 768px)": {
      gap: "1rem",
      display: "block",
    },
  },
  providerGroupSearch: {
    display: "flex",
    gap: "27px",
    "@media (max-width: 820px)": {
      display: "block",
      width: "100%",
      gap: "1rem",
    },
    "@media (max-width: 768px)": {
      display: "block",
      gap: "1rem",
      width: "100%",
    },
  },

  AddressFormLongtInputField2: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "38px",
    textAlign: "center",
    padding: "21px 0px 21px 5px",
    fontSize: "16px",
    alignItems: "center",
    "& input::placeholder": {
      alignItems: "center",
      fontSize: "14px",
    },
    "@media (max-width: 820px)": {
      width: "100%",
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  inputBoxText2: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive2: {
    background: "#FFFFFF 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 6px #00418602 !important",
    border: "1px solid #004186!important",
    borderRadius: "4px !important",
  },
}));

export const dosageUnit = [
  {
    key: "MG",
    value: "mg",
  },
  {
    key: "TABLET",
    value: "Tablet(s)",
  },
];

export const dosageWhen = [
  {
    key: "BEFORE_MEAL",
    value: "Before Meal",
  },
  {
    key: "AFTER_MEAL",
    value: "After Meal",
  },
  {
    key: "AFTERNOON_MEAL",
    value: "Afternoon Meal",
  },
  {
    key: "IN_THE_MORNING",
    value: "In The Morning",
  },
];

export const dosageTime = [
  {
    key: "BEFORE_MEAL",
    value: "Every Day",
  },
  {
    key: "IN_THE_MORNING",
    value: "Twice A Day",
  },
];

// const useStyles = makeStyles({
//   customTextField: {
//     "& input::placeholder": {
//       fontSize: "13px",
//     },
//   },
// });

function AddMedication(props: DialogProps) {
  const { onClose, open, title, setRefetchData } = props;
  const { ADD, CANCEL, SELECT_AN_OPTION } = adminConstants;
  const [allMedicationName, setAllMedicationName] = useState<any>();
  const classes = commonWidget();
  const dispatch = useDispatch();
  const [selectedStartDate, setSelectedStartDate] = useState<any>("");
  const [value, setValue] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>("");
  const cs = medStyle();
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const classDepartment = commonPorviderGroupWidget();
  // const placeholderStyle = useStyles();
  const close = () => {
    onClose();
  };
  const initialValues = {
    active: true,
    archive: false,
    id: "",
    uuid: "",
    drugCatalog: {
      id: 0,
      medicine: "",
      type: "",
    },
    patient: {
      uuid: props?.patientData?.uuid || "-",
    },
    prescribedById: {
      uuid: "3c403d1b-d585-4f84-a08f-57709f0e43ec",
    },
    duration: "",
    sig: "",
    dosageUnit: null,
    dosageWhen: null,
    dosageTime: null,
    startDate: "",
    endDate: "",
    note: "",
  };

  const validationSchema = Yup.object().shape({
    drugCatalog: Yup.object()
      .shape({
        medicine: Yup.string().required("Please select the medicine name"),
      })
      .required("Medication is required"),
    // duration: Yup.string().required("Please enter the duration"),
    // sig: Yup.string().required("Please enter the sig"),
    startDate: Yup.date().required("Please enter the start date"),
    // endDate: Yup.date().required("Please enter the end date"),
    // dosageUnit: Yup.string().required("Please select dosage unit"),
    // dosageWhen: Yup.string().required("Please select dosage when"),
    // dosageTime: Yup.string().required("Please select dosage time"),
    // note: Yup.string().optional(),
  });

  const medicationNames = {
    data: {
      data: {
        content: [
          { id: "1", name: "Azee 500 Tablet" },
          { id: "2", name: "Bandy-Plus Chewable Tablet" },
          { id: "3", name: "Concor COR 2.5 Tablet" },
          { id: "4", name: "hyponat-O 15 Tablet" },
          { id: "5", name: "Heptral 400mg Tablet" },
          { id: "6", name: "Meganeuron OD Plus Capsule" },
        ],
      },
    },
  };

  const { mutateAsync, isSuccess, data } = props.isEditData
    ? useMedicationsControllerServiceUpdatePatientMedication()
    : useMedicationsControllerServiceAddPatientMedication();

  useEffect(() => {
    if (isSuccess && data?.message) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: data?.message as any,
          severity: "success",
        })
      );
    }
  }, [isSuccess]);
  useEffect(() => {
    if (props.isEditData) {
      patchEditData(props.isEditData);
    }
  }, [props]);

  function patchEditData(editData: any) {
    Object.keys(editData).map((res) => {
      formik.setFieldValue(res, editData[res]);
    });
    setValue(editData.medication);
    setSelectedStartDate(dayjs(editData.startDate));
    setSelectedEndDate(dayjs(editData.endDate));
  }

  const handleSubmit = (values: any) => {
    try {
      mutateAsync({ requestBody: values })
        .then((res: any) => {
          onClose();
          setRefetchData(true);
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

  // const defaultProps = {
  //   options: medicationNames?.data?.data?.content || [],
  //   getOptionLabel: (option: any) => option.name,
  // };

  const { data: allDrugs } = useDrugCatalogControllerServiceGetAllDrugs({
    providerGroupUuid: userDetails?.data?.providerGroup,
    size: 1000,
    page: 0,
  });

  useEffect(() => {
    setAllMedicationName(allDrugs && allDrugs?.data?.content);
  }, [allDrugs]);

  const medicinesName = allMedicationName?.map((item: any) => {
    return {
      id: item?.id,
      medicine: item.medicine,
      type: item.type,
    };
  });

  const defaultProps = {
    options: medicinesName || [],
    getOptionLabel: (option: any) => option.medicine + " (" + option.type + ")",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              {title}
            </Typography>
          </Grid>

          <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
            <ButtonBase onClick={close}>
              <CloseIcon />
            </ButtonBase>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          //   ref={descriptionElementRef}
          tabIndex={-1}
        >
          <form action="">
            <Grid item xs={12}>
              <CustomFormLabel label="Medicine Name" isRequired={true} />
              <Grid item lg={12}>
                <Autocomplete
                  {...defaultProps}
                  sx={{
                    ...multiSelectDropDown,
                    border:
                      formik.touched.drugCatalog?.medicine &&
                      formik.errors.drugCatalog?.medicine
                        ? "1px solid red"
                        : null,
                  }}
                  id="tags-standard"
                  value={value}
                  onChange={(_event: any, newValue: any) => {
                    formik.setFieldValue("drugCatalog", newValue);
                    setValue(newValue);
                  }}
                  // renderOption={(props, option) => (
                  //   <MenuItem
                  //     key={option}
                  //     value={option}
                  //     sx={{ justifyContent: "space-between" }}
                  //     {...props}
                  //   >
                  //     {option}
                  //   </MenuItem>
                  // )}
                  // renderInput={(params) => (
                  //   <TextField
                  //     classes={{ root: placeholderStyle.customTextField }}
                  //     {...params}
                  //     variant="outlined"
                  //     placeholder="Select Or Search Medicine"
                  //   />
                  // )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select Or Search Medicine"
                    />
                  )}
                />
                {formik.touched.drugCatalog?.medicine &&
                  formik.errors.drugCatalog?.medicine && (
                    <FormHelperText error>
                      {formik.errors.drugCatalog?.medicine}
                    </FormHelperText>
                  )}
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <CustomFormLabel label="Sig" isRequired={false} />
              <InputBase
                fullWidth
                id="document-name-label"
                name="sig"
                role="textbox"
                value={formik.values.sig}
                onChange={(e: any) =>
                  formik.setFieldValue("sig", e.target.value)
                }
                onKeyPress={(e) => handleKeyPress(e)}
                error={!!formik.touched.sig && !!formik.errors.sig}
                onBlur={formik.handleBlur}
                placeholder="Enter Sig"
                type="text"
                classes={{
                  root: classDepartment.AddressFormLongtInputField2,
                  input: classDepartment.inputBoxText2,
                  focused: classDepartment.inputBoxActive2,
                  error: classes.inputBoxError,
                }}
              />
              {formik.touched.sig && formik.errors.sig && (
                <FormHelperText error>{formik.errors.sig}</FormHelperText>
              )}
            </Grid>
            <Grid xs={12} mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CustomFormLabel label={"Dosage When"} isRequired={false} />
                  <SelectInput
                    placeholder={SELECT_AN_OPTION}
                    isEditForm={formik?.values?.dosageWhen}
                    value={formik?.values?.dosageWhen}
                    selectedOption={formik?.values?.dosageWhen}
                    options={DosageWhenList}
                    name={"dosageWhen"}
                    isError={
                      formik?.touched?.dosageWhen && formik?.errors?.dosageWhen
                    }
                    selectInputError={formik?.errors?.dosageWhen}
                    onChange={(e: any) =>
                      formik.setFieldValue("dosageWhen", e.target.value)
                    }
                  />
                  {formik?.touched?.dosageWhen &&
                    formik?.errors?.dosageWhen && (
                      <FormHelperText error>
                        {formik?.errors?.dosageWhen}
                      </FormHelperText>
                    )}
                </Grid>
                <Grid item xs={4}>
                  <CustomFormLabel label={"Dosage Unit"} isRequired={false} />
                  <SelectInput
                    placeholder={SELECT_AN_OPTION}
                    isEditForm={formik?.values?.dosageUnit}
                    value={formik?.values?.dosageUnit}
                    selectedOption={formik?.values?.dosageUnit}
                    options={DosageUnitList}
                    name={"dosageUnit"}
                    isError={
                      formik.touched.dosageUnit && formik.errors.dosageUnit
                    }
                    selectInputError={formik.errors.dosageUnit}
                    onChange={(e: any) =>
                      formik.setFieldValue("dosageUnit", e.target.value)
                    }
                  />
                  {formik.touched.dosageUnit && formik.errors.dosageUnit && (
                    <FormHelperText error>
                      {formik.errors.dosageUnit}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <CustomFormLabel label={"Dosage Time"} isRequired={false} />
                  <SelectInput
                    placeholder={SELECT_AN_OPTION}
                    isEditForm={formik?.values?.dosageTime}
                    value={formik?.values?.dosageTime}
                    selectedOption={formik?.values?.dosageTime}
                    options={DosageTimeList}
                    name={"dosageTime"}
                    isError={
                      formik.touched.dosageUnit && formik.errors.dosageUnit
                    }
                    selectInputError={formik?.errors?.dosageUnit}
                    onChange={(e: any) =>
                      formik.setFieldValue("dosageTime", e.target.value)
                    }
                  />
                  {formik?.touched?.dosageTime &&
                    formik?.errors?.dosageTime && (
                      <FormHelperText error>
                        {formik.errors.dosageTime}
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>
            </Grid>
            {/* <div style={{ width: "30%" }}>
                <SelectInput
                  placeholder="Dosage Unit"
                  isEditForm={props.isEditData?.dosageUnit}
                  selectedOption={props.isEditData?.dosageUnit}
                  options={dosageUnit}
                  onChange={(e: any) => formik.setFieldValue('dosageUnit', e.target.value)}
                />
              </div> */}
            {/* <div style={{ width: "30%" }}>
                <SelectInput
                  placeholder="When"
                  isEditForm={props.isEditData?.dosageWhen}
                  selectedOption={props.isEditData?.dosageWhen}
                  options={dosageWhen}
                  onChange={(e: any) => formik.setFieldValue('dosageWhen', e.target.value)}
                />
              </div> */}
            {/* <div style={{ width: "30%" }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#1A1A1A",
                    marginTop: "24px",
                    marginBottom: "12px",
                  }}
                >
                  By Oral Route
                </Typography>
                <SelectInput
                  placeholder="Time"
                  options={dosageTime}
                  isEditForm={props.isEditData?.dosageTime}
                  selectedOption={props.isEditData?.dosageTime}
                  onChange={(e: any) => formik.setFieldValue('dosageTime', e.target.value)}
                />
              </div> */}
            <Grid xs={12} mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CustomFormLabel label="Duration" isRequired={false} />
                  <InputBase
                    fullWidth
                    id="document-name-label"
                    name="duration"
                    role="textbox"
                    value={formik.values.duration}
                    onChange={(e: any) =>
                      formik.setFieldValue("duration", e.target.value)
                    }
                    onKeyPress={(e) => handleKeyPress(e)}
                    error={
                      !!formik.touched.duration && !!formik.errors.duration
                    }
                    onBlur={formik.handleBlur}
                    placeholder="Enter"
                    type="text"
                    classes={{
                      root: classDepartment.AddressFormLongtInputField2,
                      input: classDepartment.inputBoxText2,
                      focused: classDepartment.inputBoxActive2,
                      error: classes.inputBoxError,
                    }}
                  />
                  {formik.touched.duration && formik.errors.duration && (
                    <FormHelperText error>
                      {formik.errors.duration}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <CustomFormLabel label="Start Date" isRequired={true} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={
                        selectedStartDate ? dayjs(selectedStartDate) : null
                      }
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
                            formik.touched.startDate && formik.errors.startDate
                              ? "1px solid red"
                              : "",
                          borderRadius: "5px",
                        },
                      }}
                      onChange={(e: any) => {
                        const startDate = moment(e.$d).format("yyyy-MM-DD");
                        setSelectedStartDate(startDate);
                        formik.setFieldValue("startDate", startDate);
                      }}
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                      <FormHelperText error>
                        {formik.errors.startDate}
                      </FormHelperText>
                    )}
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <CustomFormLabel label="End Date" isRequired={false} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedEndDate ? dayjs(selectedEndDate) : null}
                      // minDate={selectedStartDate}
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
                          // border:
                          //   formik.touched.endDate && formik.errors.endDate
                          //     ? "1px solid red !important"
                          //     : "",
                          borderRadius: "5px",
                        },
                      }}
                      onChange={(e: any) => {
                        const endDate = moment(e.$d).format("yyyy-MM-DD");
                        setSelectedEndDate(endDate);
                        formik.setFieldValue("endDate", endDate);
                      }}
                    />
                    {/* {formik.touched.endDate && formik.errors.endDate && (
                      <FormHelperText error>
                        {formik.errors.endDate}
                      </FormHelperText>
                    )} */}
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Typography variant="h5" sx={med.keyStyle}>
                Note
              </Typography>
              <InputBase
                fullWidth
                multiline={true}
                value={formik.values.note}
                onChange={(e) => formik.setFieldValue("note", e.target.value)}
                rows="3"
                error={!!formik.touched.note && !!formik.errors.note}
                onBlur={formik.handleBlur}
                placeholder="Type here"
                classes={{
                  root: classes.providerTextAreaField,
                  input: classes.textFieldInput,
                  focused: classes.textFieldActive,
                  error: classes.inputBoxError,
                }}
              />
              {formik.touched.note && formik.errors.note && (
                <FormHelperText error>{formik.errors.note}</FormHelperText>
              )}
            </Grid>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
      >
        <ButtonBase onClick={close} sx={formButtonStyle.cancelButtonStyle}>
          {CANCEL}
        </ButtonBase>
        <ButtonBase
          type="submit"
          onClick={formik.submitForm}
          sx={formButtonStyle.saveButtonStyle}
        >
          {title === "Add Medication" ? ADD_TITLE_BUTTON : SAVE_BUTTON_TITLE}
        </ButtonBase>
      </DialogActions>
    </Dialog>
  );
}

export default AddMedication;
