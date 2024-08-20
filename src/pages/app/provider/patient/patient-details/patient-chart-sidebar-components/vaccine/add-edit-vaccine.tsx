import {
  Autocomplete,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  // Grid,
  InputBase,
  // MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useRef, useState } from "react";
import SelectInput from "../../../../../../../components/common/select-input";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../styles/common";
import { VaccineFormType } from "../enums-interfaces/enums";
// import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import { useFormik } from "formik";
// import dayjs from "dayjs";
import moment from "moment";
import dayjs from "dayjs";
import {
  useUserControllerServiceGetActiveAndCurrentUsers,
  useVaccineControllerServiceAddPatientVaccine,
  useVaccineControllerServiceGetAllVaccines,
  useVaccineControllerServiceUpdatePatientVaccine,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { PatientVaccine } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import * as Yup from "yup";
import { getLoggedInUser } from "../../../../../../../components/common/enums-and-interfaces/common-functions";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";

const vaccineNames = [
  { id: 1, name: "Sputnik V,40592" },
  { id: 2, name: "Oxford/AstraZeneca" },
  { id: 3, name: "Pfizer/BioNTech" },
  { id: 4, name: "Sinopharm/Beijing" },
  { id: 5, name: "CanSino" },
  { id: 6, name: "Moderna" },
];

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
    key: "BUCCEL",
    value: "Buccel",
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
  borderRadius: "4px",
  ".MuiOutlinedInput-root": {
    padding: "0px !important",
    height: "42px !important",
    fontSize: "14px !important",
  },
  ".MuiChip-root": {
    height: "28px !important",
  },
};

export const commonPorviderGroupWidget = makeStyles(() => ({
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
    padding: "21px 0px 21px 16px",
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

const StyledDatePicker = styled(DatePicker)(() => ({
  "& .MuiInputBase-root": {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  "& .MuiInputBase-input": {
    padding: "10px !important",
  },
  "& .Mui-focused": {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: `0px 0px 6px #00418602 !important`,
    border: `1px solid #004186 !important`,
    borderRadius: "4px !important",
  },
}));

export const medStyle = makeStyles({
  contentContainer: {
    display: "flex",
    justifyContent: "start",
    gap: "15px",
    alignItems: "end",
  },
});

export const DialogWidth = {
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    width: "1050px !important",
    maxWidth: "1050px !important",
  },
};

const med = {
  keyStyle: {
    color: "#1A1A1A;",
    marginTop: "24px",
    marginBottom: "12px",
  },
};

interface AddEditVaccineProps {
  title: string;
  onClose: () => void;
  open: boolean;
  patientData: any;
  vaccineUuid?: any;
}

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      fontSize: "13px",
    },
  },
});

interface FormFields {
  type: VaccineFormType;
  vaccine: null;
  patient: {};
  administerDate?: string;
  administerTime?: string;
  orderedBy?: null;
  administeredBy?: null;
  manufacturer?: string;
  ndcCode?: string;
  lot?: string;
  dose?: string;
  units?: string;
  route?: string;
  site?: string;
  expiryDate?: string;
  reaction?: string;
  reason?: string;
  note?: string;
}

export default function AddEditVaccine(props: AddEditVaccineProps) {
  const cs = medStyle();
  const classes = commonWidget();
  const placeholderStyle = useStyles();
  const dispatch = useDispatch();
  const { open, title, onClose } = props;
  const descriptionElementRef = useRef<HTMLElement>(null);
  // const [value, setValue] = useState<any>(null);
  const classDepartment = commonPorviderGroupWidget();
  const [vaccineList, setVaccineList] = useState([]);
  const [isHistory, setIsHistory] = useState(false);
  const [initialValues, setInitialValues] = useState<FormFields>({
    type: VaccineFormType.ADMINISTERED,
    vaccine: null,
    patient: {
      uuid: props?.patientData?.uuid,
    },
    orderedBy: null,
    administeredBy: null,
    units: "",
    route: "",
    site: "",
    administerDate: "",
    ndcCode: "",
    manufacturer: "",
    expiryDate: "",
    reaction: "",
    reason: "",
    note: "",
    lot: "",
    dose: "",
    administerTime: "",
  });
  const [userList, setUserList] = useState<any[]>([]);

  const validationSchema = Yup.object().shape({
    orderedBy: Yup.object().required("Please select the provider ordered by"),
    administeredBy: Yup.object().required("Please select administered by"),
    units: Yup.string().required("Please select the unit"),
    route: Yup.string().required("Please select the route"),
    site: Yup.string().required("Please select the body site"),
    administerDate: Yup.date().required("Please enter the administer date"),
    ndcCode: Yup.string().required("Please enter the NDC code"),
    manufacturer: Yup.string().required("Please enter the manufacturer"),
    // expiryDate: Yup.date().required("Expiry date is required"),
    // reaction: Yup.string().required("Reaction is required"),
    // reason: Yup.string().required("Reason is required"),
    // note: Yup.string().required("Note is required"),
    // lot: Yup.string().required("Lot is required"),
    vaccine: Yup.object()
      .shape({
        name: Yup.string().required("Please select the vaccine name"),
      })
      .required("Please select the vaccine name"),
    administerTime: Yup.string().required("Please enter the administer time"),
  });

  const validationSchemaForHistory = Yup.object().shape({
    vaccine: Yup.object()
      .shape({
        name: Yup.string().required("Please select the vaccine name"),
      })
      .required("Please select the vaccine name"),
    orderedBy: Yup.object().required("Please select the provider ordered by"),
    administeredBy: Yup.object().required("Please select administered by"),
  });

  const { mutateAsync } = props.vaccineUuid
    ? useVaccineControllerServiceUpdatePatientVaccine()
    : useVaccineControllerServiceAddPatientVaccine();

  const { data, isSuccess } = useVaccineControllerServiceGetAllVaccines({});
  // const editData = props.vaccineUuid ? useVaccineControllerServiceViewPatientVaccine({ patientVaccineUuid: props.vaccineUuid }) : null;

  const { data: users } = useUserControllerServiceGetActiveAndCurrentUsers({
    page: 0,
    size: 100,
    providerGroupUuid: getLoggedInUser()?.providerGroup,
  });

  useEffect(() => {
    const site = Object.values(PatientVaccine.site) as string[];
  }, []);

  useEffect(() => {
    if (isSuccess && !!data) {
      setVaccineList(data?.data?.content);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if (users?.data && users.data?.content) {
      setUserList(users.data.content);
    }
    if (props.vaccineUuid) {
      patchData(props.vaccineUuid);
    }
  }, [open, users?.data]);

  function patchData(data: any) {
    Object.keys(data).map((key) => {
      formik.setFieldValue(key, data[key]);
      setInitialValues((prev) => ({
        ...prev,
        key: data[key],
      }));
    });
  }

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (values: any) => {
    let requestBody: any;

    if (isHistory) {
      requestBody = {
        type: "HISTORICAL",
        vaccine: {
          id: values.vaccine.id,
          name: values.vaccine.name,
        },
        patient: {
          uuid: values.patient.uuid,
        },
        orderedBy: {
          uuid: values.orderedBy.uuid,
          firstName: values.orderedBy.firstName,
          lastName: values.orderedBy.lastName,
        },
        administeredBy: {
          uuid: values.administeredBy.uuid,
          firstName: values.administeredBy.firstName,
          lastName: values.administeredBy.lastName,
        },
        administerDate: values.administerDate,
        administerTime: values.administerTime,
      };
    } else {
      requestBody = { ...values };
    }
    mutateAsync({ requestBody: requestBody }).then((res: any) => {
      props.onClose();
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res.message,
          severity: "success",
        })
      );
    });
  };

  const vaccineDefaultProps = {
    options: vaccineList || [],
    getOptionLabel: (option: any) => option.name,
  };

  const defaultProps = {
    options: userList || [],
    getOptionLabel: (option: any) => `${option.firstName} ${option.lastName}`,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: !isHistory
      ? validationSchema
      : validationSchemaForHistory,
    onSubmit: handleSubmit,
  });

  // VaccineFormType.ADMINISTERED

  const handleFormValues = (
    formikValues: any,
    fieldName: string,
    fieldValue: any
  ) => {
    formikValues[fieldName] = fieldValue;
    setInitialValues((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle id="scroll-dialog-title">
          <Typography sx={formTitle}>{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formik.values.type}
                  >
                    <FormControlLabel
                      value={VaccineFormType.ADMINISTERED}
                      control={
                        <Radio
                          onChange={(e) => {
                            formik.setFieldValue("type", e.target.value),
                              setIsHistory(false);
                          }}
                        />
                      }
                      label="Administered"
                    />
                    <FormControlLabel
                      value={VaccineFormType.HISTORICAL}
                      control={
                        <Radio
                          onChange={(e) => {
                            formik.setFieldValue("type", e.target.value),
                              setIsHistory(true);
                          }}
                        />
                      }
                      label="Historical"
                    />
                    {/* <FormControlLabel value={VaccineFormType.REFUSED_NOT_ADMINISTERED} control={<Radio onChange={(e) => formik.setFieldValue('type', e.target.value)} />} label="Refused Or Not Administered" /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h5">Vaccine Name</Typography>
                <Autocomplete
                  {...vaccineDefaultProps}
                  id="controlled-demo"
                  value={formik.values.vaccine}
                  sx={{
                    ...multiSelectDropDown,
                    border:
                      formik.touched.vaccine && formik.errors.vaccine
                        ? "1px solid red"
                        : null,
                  }}
                  onChange={(_event: any, newValue: any) => {
                    handleFormValues(formik.values, "vaccine", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Ordered By"
                      variant="outlined"
                    />
                  )}
                />
                {formik.touched.vaccine && formik.errors.vaccine && (
                  <FormHelperText error>{formik.errors.vaccine}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} mt={1}>
                {formik.values.type === VaccineFormType.ADMINISTERED ? (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <CustomFormLabel
                          label="Administer Date"
                          isRequired={true}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StyledDatePicker
                            value={dayjs(
                              formik.values.administerDate
                                ? dayjs(formik.values.administerDate)
                                : null
                            )}
                            disableFuture
                            sx={{
                              "& .MuiInputBase-input": {
                                padding: "12px !important",
                                fontSize: "14px !important",
                              },
                              "& .MuiInputBase-root": {
                                height: "42px",
                                fontSize: "14px",
                                // color: "#1A1A1A7F !important",
                                border:
                                  formik.touched.administerDate &&
                                  formik.errors.administerDate
                                    ? "1px solid red"
                                    : "",
                                borderRadius: "5px",
                              },
                            }}
                            onChange={(e: any) => {
                              const date = moment(e.$d).format("yyyy-MM-DD");
                              handleFormValues(
                                formik.values,
                                "administerDate",
                                date
                              );
                              // formik.setFieldValue('administerDate', date);
                            }}
                          />
                        </LocalizationProvider>
                        {formik.touched.administerDate &&
                          formik.errors.administerDate && (
                            <FormHelperText error>
                              {formik.errors.administerDate}
                            </FormHelperText>
                          )}
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel
                          label="Administer Time"
                          isRequired={true}
                        />
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="administerTime"
                          value={formik.values.administerTime}
                          placeholder="Administered By"
                          type="time"
                          sx={{
                            "& .MuiInputBase-input": {
                              padding: "5px !important",
                            },
                          }}
                          error={
                            !!formik.touched.administerTime &&
                            !!formik.errors.administerTime
                          }
                          onBlur={formik.handleBlur}
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            // input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                            error: classes.inputBoxError,
                          }}
                          onChange={(e) =>
                            handleFormValues(
                              formik.values,
                              "administerTime",
                              e.target.value
                            )
                          }
                        />
                        {formik.touched.administerTime &&
                          formik.errors.administerTime && (
                            <FormHelperText error>
                              {formik.errors.administerTime}
                            </FormHelperText>
                          )}
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel label="Ordered By" isRequired={true} />
                        <Autocomplete
                          {...defaultProps}
                          id="controlled-demo"
                          value={formik.values.orderedBy}
                          sx={{
                            ...multiSelectDropDown,
                            marginTop: "0px !important",
                            border:
                              formik.touched.orderedBy &&
                              formik.errors.orderedBy
                                ? "1px solid red"
                                : null,
                          }}
                          onChange={(_event: any, newValue: any) => {
                            handleFormValues(
                              formik.values,
                              "orderedBy",
                              newValue
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Ordered By"
                              variant="outlined"
                            />
                          )}
                        />
                        {formik.touched.orderedBy &&
                          formik.errors.orderedBy && (
                            <FormHelperText error>
                              {formik.errors.orderedBy}
                            </FormHelperText>
                          )}
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel
                          label="Administered By"
                          isRequired={true}
                        />
                        <Autocomplete
                          {...defaultProps}
                          id="controlled-demo"
                          value={formik.values.administeredBy}
                          onChange={(_event: any, newValue: any) => {
                            handleFormValues(
                              formik.values,
                              "administeredBy",
                              newValue
                            );
                          }}
                          sx={{
                            ...multiSelectDropDown,
                            marginTop: "0px !important",
                            border:
                              formik.touched.administeredBy &&
                              formik.errors.administeredBy
                                ? "1px solid red"
                                : null,
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={placeholderStyle}
                              placeholder="Select Administered By"
                              onChange={(_e) => {}}
                              variant="outlined"
                            />
                          )}
                        />
                        {formik.touched.administeredBy &&
                          formik.errors.administeredBy && (
                            <FormHelperText error>
                              {formik.errors.administeredBy}
                            </FormHelperText>
                          )}
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormLabel
                          label="Manufacturer"
                          isRequired={true}
                        />
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="manufacturer"
                          value={formik.values.manufacturer || ""}
                          onChange={(e) =>
                            handleFormValues(
                              formik.values,
                              "manufacturer",
                              e.target.value
                            )
                          }
                          error={
                            !!formik.touched.manufacturer &&
                            !!formik.errors.manufacturer
                          }
                          onBlur={formik.handleBlur}
                          role="textbox"
                          placeholder="Enter Manufacturer"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                            error: classes.inputBoxError,
                          }}
                        />
                        {formik.touched.manufacturer &&
                          formik.errors.manufacturer && (
                            <FormHelperText error>
                              {formik.errors.manufacturer}
                            </FormHelperText>
                          )}
                      </Grid>
                      <Grid item xs={6}>
                        <CustomFormLabel label="NDC Code" isRequired={true} />
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="ndcCode"
                          role="textbox"
                          value={formik.values.ndcCode || ""}
                          onChange={(e) =>
                            handleFormValues(
                              formik.values,
                              "ndcCode",
                              e.target.value
                            )
                          }
                          error={
                            !!formik.touched.ndcCode && !!formik.errors.ndcCode
                          }
                          onBlur={formik.handleBlur}
                          placeholder="Enter NDC Code"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                            error: classes.inputBoxError,
                          }}
                        />
                        {formik.touched.ndcCode && formik.errors.ndcCode && (
                          <FormHelperText error>
                            {formik.errors.ndcCode}
                          </FormHelperText>
                        )}
                      </Grid>

                      <Grid item xs={3}>
                        <CustomFormLabel label="Lot" isRequired={false} />
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="lot"
                          value={formik.values.lot || ""}
                          onChange={(e) =>
                            handleFormValues(
                              formik.values,
                              "lot",
                              e.target.value
                            )
                          }
                          placeholder="Enter Lot"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel label="Dose" isRequired={false} />
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="dose"
                          value={formik.values.dose || ""}
                          onChange={(e) =>
                            handleFormValues(
                              formik.values,
                              "dose",
                              e.target.value
                            )
                          }
                          placeholder="Enter"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel label="Units" isRequired={true} />
                        <SelectInput
                          placeholder="Unit"
                          options={mg}
                          value={formik.values.units}
                          isError={formik.touched.units && formik.errors.units}
                          isEditForm={props.vaccineUuid}
                          selectedOption={formik.values.units || ""}
                          onChange={(e: any) =>
                            handleFormValues(
                              formik.values,
                              "units",
                              e.target.value
                            )
                          }
                        />
                        {formik.touched.units && formik.errors.units && (
                          <FormHelperText error>
                            {formik.errors.units}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel label="Route" isRequired={true} />
                        <SelectInput
                          placeholder="Route"
                          isEditForm={props.vaccineUuid}
                          value={formik.values.route}
                          isError={formik.touched.route && formik.errors.route}
                          selectedOption={formik.values.route || ""}
                          options={route}
                          onChange={(e: any) =>
                            handleFormValues(
                              formik.values,
                              "route",
                              e.target.value
                            )
                          }
                        />
                        {formik.touched.route && formik.errors.route && (
                          <FormHelperText error>
                            {formik.errors.route}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel label="Body Site" isRequired={true} />
                        <SelectInput
                          isEditForm={props.vaccineUuid}
                          value={formik.values.site}
                          selectedOption={formik.values.site || ""}
                          isError={formik.touched.site && formik.errors.site}
                          options={site}
                          placeholder="Site"
                          onChange={(e: any) =>
                            handleFormValues(
                              formik.values,
                              "site",
                              e.target.value
                            )
                          }
                        />
                        {formik.touched.site && formik.errors.site && (
                          <FormHelperText error>
                            {formik.errors.site}
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel
                          label="Expiry Date"
                          isRequired={false}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StyledDatePicker
                            value={
                              formik.values.expiryDate
                                ? dayjs(formik.values.expiryDate)
                                : null
                            }
                            disablePast
                            sx={{
                              "& .MuiInputBase-input": {
                                padding: "12px !important",
                                fontSize: "14px !important",
                              },
                              "& .MuiInputBase-root": {
                                height: "42px",
                                fontSize: "14px",
                                // color: "#1A1A1A7F !important",
                                // border: formik.errors.expiryDate
                                //   ? "1px solid red"
                                //   : "",
                                borderRadius: "5px",
                              },
                            }}
                            onChange={(e: any) => {
                              const date = moment(e.$d).format("yyyy-MM-DD");
                              handleFormValues(
                                formik.values,
                                "expiryDate",
                                date
                              );
                              // formik.setFieldValue('administerDate', date);
                            }}
                          />
                        </LocalizationProvider>
                        {/* {formik.touched.expiryDate &&
                      formik.errors.expiryDate && (
                        <FormHelperText error>
                          {formik.errors.expiryDate}
                        </FormHelperText>
                      )} */}
                      </Grid>

                      <Grid item xs={3}>
                        <CustomFormLabel label="Reaction" isRequired={false} />
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="reaction"
                          value={formik.values.reaction || ""}
                          onChange={(e) =>
                            handleFormValues(
                              formik.values,
                              "reaction",
                              e.target.value
                            )
                          }
                          role="textbox"
                          placeholder="Enter Manufacturer"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel label="Reason" isRequired={false} />
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="reason"
                          value={formik.values.reason || ""}
                          role="textbox"
                          onChange={(e) =>
                            handleFormValues(
                              formik.values,
                              "reason",
                              e.target.value
                            )
                          }
                          placeholder="Reason"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <CustomFormLabel label="Note" isRequired={false} />
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="name"
                          value={formik.values.note || ""}
                          role="textbox"
                          onChange={(e) =>
                            handleFormValues(
                              formik.values,
                              "note",
                              e.target.value
                            )
                          }
                          placeholder="Type here"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : formik.values.type === VaccineFormType.HISTORICAL ? (
                  <>
                    <Grid className={cs.contentContainer}>
                      <div style={{ width: "25%" }}>
                        <Typography variant="h5" sx={med.keyStyle}>
                          Administer Date
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StyledDatePicker
                            value={dayjs(formik.values.administerDate)}
                            sx={{
                              "& .MuiInputBase-input": {
                                padding: "12px !important",
                                fontSize: "0.8rem",
                              },
                            }}
                            onChange={(e: any) => {
                              const date = moment(e.$d).format("yyyy-MM-DD");
                              handleFormValues(
                                formik.values,
                                "administerDate",
                                date
                              );
                              // formik.setFieldValue('administerDate', date);
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                      {/* <div style={{ width: "25%" }}>
                  <Typography variant="h5" sx={med.keyStyle}>
                    Administer Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePicker
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "12px !important",
                          fontSize: "0.8rem",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div> */}

                      <Grid item xs={3}>
                        <CustomFormLabel label="Ordered By" isRequired={true} />
                        <Autocomplete
                          {...defaultProps}
                          id="controlled-demo"
                          value={formik.values.orderedBy}
                          sx={{
                            ...multiSelectDropDown,
                            marginTop: "0px !important",
                            border:
                              formik.touched.orderedBy &&
                              formik.errors.orderedBy
                                ? "1px solid red"
                                : null,
                          }}
                          onChange={(_event: any, newValue: any) => {
                            handleFormValues(
                              formik.values,
                              "orderedBy",
                              newValue
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Ordered By"
                              variant="outlined"
                            />
                          )}
                        />
                        {formik.touched.orderedBy &&
                          formik.errors.orderedBy && (
                            <FormHelperText error>
                              {formik.errors.orderedBy}
                            </FormHelperText>
                          )}
                      </Grid>
                      <Grid item xs={3}>
                        <CustomFormLabel
                          label="Administered By"
                          isRequired={true}
                        />
                        <Autocomplete
                          {...defaultProps}
                          id="controlled-demo"
                          value={formik.values.administeredBy}
                          onChange={(_event: any, newValue: any) => {
                            handleFormValues(
                              formik.values,
                              "administeredBy",
                              newValue
                            );
                          }}
                          sx={{
                            ...multiSelectDropDown,
                            marginTop: "0px !important",
                            border:
                              formik.touched.administeredBy &&
                              formik.errors.administeredBy
                                ? "1px solid red"
                                : null,
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={placeholderStyle}
                              placeholder="Select Administered By"
                              onChange={(_e) => {}}
                              variant="outlined"
                            />
                          )}
                        />
                        {formik.touched.administeredBy &&
                          formik.errors.administeredBy && (
                            <FormHelperText error>
                              {formik.errors.administeredBy}
                            </FormHelperText>
                          )}
                      </Grid>

                      <div style={{ width: "25%" }}>
                        <Typography variant="h5" sx={med.keyStyle}>
                          Expiry Date
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StyledDatePicker
                            sx={{
                              "& .MuiInputBase-input": {
                                padding: "12px !important",
                                fontSize: "0.8rem",
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </Grid>
                  </>
                ) : (
                  <>
                    <div className={cs.contentContainer}>
                      <div style={{ width: "50%" }}>
                        <Typography variant="h5" sx={med.keyStyle}>
                          Manufacturer
                        </Typography>
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="name"
                          role="textbox"
                          placeholder="Enter Manufacturer"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                          }}
                        />
                      </div>
                      <div style={{ width: "30%" }}>
                        <Typography variant="h5" sx={med.keyStyle}>
                          Lot
                        </Typography>
                        <InputBase
                          fullWidth
                          id="document-name-label"
                          name="name"
                          role="textbox"
                          placeholder="Enter Lot"
                          type="text"
                          classes={{
                            root: classDepartment.AddressFormLongtInputField2,
                            input: classDepartment.inputBoxText2,
                            focused: classDepartment.inputBoxActive2,
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
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
            {title === "Add Vaccine" ? "Add" : "Save"}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}
