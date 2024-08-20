import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  // FormLabel,
  InputBase,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  // styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";
import { Severity } from "../../../../../../../components/common/form-enum";
import SelectInput from "../../../../../../../components/common/select-input";
import { adminConstants } from "../../../../../../../constants/admin";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../styles/common";
import { useFormik } from "formik";
import moment from "moment";
import {
  useAllergyControllerServiceAddPatientAllergies,
  useAllergyControllerServiceGetAllAllergies,
  useAllergyControllerServiceUpdatePatientAllergies,
  useAllergyControllerServiceViewAllergy,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import dayjs from "dayjs";
import * as Yup from "yup";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { handleKeyPress } from "../../../../../../../components/common/enums-and-interfaces/common-functions";
export interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  patientDetails: any;
  allergyUuid?: string;
  refetch?: any;
  editAllergyData?: any;
}

export const DialogWidth = {
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: "950px !important",
  },
};

export const allergyStyle = makeStyles(() => ({
  buttonActive: {
    fontSize: "16px !important",
    padding: "5px 10px!important",
    border: "1px solid #004186  !important",
    borderRadius: "5px !important",
    background: "#2C57B3 !important",
    marginRight: "10px !important",
    width: "90px",
    // height: "40px",
  },
  buttonTypoActive: {
    color: "#FFFFFF !important",
    fontWeight: "bold !important",
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
    // height: "40px",
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

const validationSchema = Yup.object().shape({
  allergy: Yup.string().required("Please enter the Allergy name"),
  patient: Yup.object().shape({
    uuid: Yup.string().required("Patient UUID is required"),
  }),
  allergyType: Yup.string().required("Allergy type is required"),
  reaction: Yup.string().required("Please select the reaction"),
  severity: Yup.string().required("Please select the severity"),
  // onSetDate: Yup.string().required("Onset date is required"),
  // note: Yup.string().required("Please enter the note"),
});

export const reaction = [
  {
    key: "PAIN",
    value: "Pain",
  },
  {
    key: "RUNNY_NOSE",
    value: "Runny Nose",
  },
  {
    key: "SWELLING",
    value: "Swelling",
  },
  {
    key: "BLOATING",
    value: "Bloating",
  },
  {
    key: "VOMITING",
    value: "Vomiting",
  },
  {
    key: "RASHES",
    value: "Rashes",
  },
];

const { CANCEL, SAVE } = adminConstants;

function AddAllergies(props: DialogProps) {
  const { onClose, open, title, refetch, editAllergyData } = props;
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const classes = commonWidget();
  const [selectedDate, setSelectedDate] = useState(dayjs("0"));
  const [selectStatus, setSelectedStatus] = useState([
    {
      key: "Active",
      value: true,
    },
    {
      key: "Inactive",
      value: false,
    },
  ]);
  const [reactionArray, setReactionArray] = useState<
    { id: number; name: string }[]
  >([]);
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState(null);
  const [initialValues, setInitialValues] = useState({
    id: "",
    uuid: "",
    active: true,
    archive: false,
    allergy: "",
    patient: {
      uuid: props?.patientDetails?.uuid || "-",
    },
    allergyType: "DRUG",
    reaction: "",
    severity: "",
    onSetDate: "",
    note: "",
    status: true,
  });

  const { mutateAsync } = editAllergyData?.uuid
    ? useAllergyControllerServiceUpdatePatientAllergies()
    : useAllergyControllerServiceAddPatientAllergies();
  const { data: getAllergies, isSuccess } =
    useAllergyControllerServiceGetAllAllergies({ page: 0, size: 20 });

  useEffect(() => {
    if (getAllergies?.data) {
      setSearchResult(getAllergies.data.content);
      patchData(getAllergies.data);
    }
  }, [getAllergies?.data]);

  function patchData(data: any) {
    Object.keys(data).map((res) => {
      formik.setFieldValue(res, data[res]);
    });
    setInitialValues((prev) => ({ ...prev, data }));
    setSelectedDate(dayjs(data.onSetDate));
  }

  useEffect(() => {
    if (editAllergyData) {
      setSelectedButtonIndex(editAllergyData?.status == true ? 0 : 1);
      setInitialValues((prevValues) => ({
        ...prevValues,
        uuid: editAllergyData.uuid,
        allergy: editAllergyData?.allergy,
        allergyType: editAllergyData.type.toUpperCase(),
        reaction: editAllergyData?.reaction,
        severity: editAllergyData.severity,
        onSetDate: editAllergyData.setDate,
        note: editAllergyData.note,
        status: editAllergyData.status,
      }));
    }
  }, [editAllergyData]);

  // const searchResult = {
  //   data: {
  //     data: {
  //       content: [
  //         {
  //           id: "1",
  //           name: "Difficulty Breathing",
  //         },
  //         {
  //           id: "2",
  //           name: "Wheezing",
  //         },
  //         {
  //           id: "3",
  //           name: "Hoarseness",
  //         },
  //         {
  //           id: "4",
  //           name: "Watery Eyes",
  //         },
  //         {
  //           id: "5",
  //           name: "Headache",
  //         },
  //         {
  //           id: "6",
  //           name: "Congestion",
  //         },
  //       ],
  //     },
  //   },
  // };

  const defaultProps = {
    options: searchResult || [],
    getOptionLabel: (option: any) => option.name,
  };

  const deleteReaction = (idToDelete: any) => {
    const updatedAllergies = reactionArray.filter((reaction) => {
      return reaction.id !== idToDelete;
    });
    setReactionArray(updatedAllergies);
  };
  const close = () => {
    onClose();
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    try {
      mutateAsync({ requestBody: values })
        .then((res: any) => {
          props.onClose();
          refetch(true);
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
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmit(values, { setSubmitting }),
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onClose={onClose} sx={DialogWidth}>
      <DialogTitle id="scroll-dialog-title">
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
          <Grid
            item
            xs={11.7}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography sx={formTitle}>{title}</Typography>
          </Grid>
          <Grid item xs={0.3}>
            <ButtonBase onClick={close}>
              <CloseIcon />
            </ButtonBase>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <form action="" onSubmit={formik.handleSubmit}>
          <Box>
            <Box sx={{ width: "100%" }}>
              <FormControl>
                <CustomFormLabel label="Allergy Type" isRequired={true} />
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={formik.values.allergyType}
                >
                  <FormControlLabel
                    value="DRUG"
                    control={
                      <Radio
                        onChange={(e) =>
                          formik.setFieldValue("allergyType", e.target.value)
                        }
                      />
                    }
                    label="Drug"
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: "15px !important",
                        color: "black !important",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="FOOD"
                    control={
                      <Radio
                        onChange={(e) =>
                          formik.setFieldValue("allergyType", e.target.value)
                        }
                      />
                    }
                    label="Food"
                  />
                  <FormControlLabel
                    value="ENVIRONMENT"
                    control={
                      <Radio
                        onChange={(e) =>
                          formik.setFieldValue("allergyType", e.target.value)
                        }
                      />
                    }
                    label="Environment"
                  />
                  <FormControlLabel
                    value="OTHER"
                    control={
                      <Radio
                        onChange={(e) =>
                          formik.setFieldValue("allergyType", e.target.value)
                        }
                      />
                    }
                    label="OTHER"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: "10px",
                gap: "20px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <CustomFormLabel label="Name" isRequired={true} />
                <InputBase
                  type="text"
                  placeholder="Enter Allergy Name"
                  name="allergy"
                  onChange={(e) =>
                    formik.setFieldValue("allergy", e.target.value)
                  }
                  onKeyPress={(e: any) => {
                    handleKeyPress(e);
                  }}
                  readOnly={title === "Review Task" || title === "Edit Task"}
                  error={!!formik.touched.allergy && !!formik.errors.allergy}
                  value={formik.values.allergy}
                  onBlur={formik.handleBlur}
                  style={{ width: "100%" }}
                  classes={{
                    root: classes.textFieldFullWidth,
                    input: classes.textFieldInput,
                    focused: classes.textFieldActive,
                    error: classes.inputBoxError,
                  }}
                />
                {formik.touched.allergy && formik.errors.allergy && (
                  <FormHelperText error>
                    {formik.errors?.allergy}
                  </FormHelperText>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <CustomFormLabel label="Reaction" isRequired={true} />
                <SelectInput
                  placeholder="Select Reaction"
                  isEditForm={props.allergyUuid}
                  selectedOption={formik.values.reaction}
                  value={formik.values.reaction}
                  isError={
                    !!(formik.touched.reaction && formik.errors.reaction)
                  }
                  name="reaction"
                  error={formik.errors.reaction}
                  options={reaction}
                  onChange={(e: any) =>
                    formik.setFieldValue("reaction", e.target.value)
                  }
                />
              </Box>
              <Box>
                <CustomFormLabel label="Severity" isRequired={true} />
                <SelectInput
                  placeholder="Select Severity"
                  isEditForm={props.allergyUuid}
                  selectedOption={formik.values.severity}
                  isError={
                    !!(formik.touched.severity && formik.errors.severity)
                  }
                  value={formik.values.severity}
                  name="severity"
                  error={formik.errors.severity}
                  options={Severity}
                  onChange={(e: any) =>
                    formik.setFieldValue("severity", e.target.value)
                  }
                ></SelectInput>
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <Box>
                {reactionArray.map((tab: any) => {
                  return (
                    <Box
                      sx={{
                        height: "32px",
                        border: "1px solid #0097F052",
                        background: "#0097F00D",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "5px",
                        marginBottom: "5px",
                      }}
                    >
                      <Typography>{tab.name}</Typography>
                      <CloseIcon
                        sx={{ color: "#0097F0", fontSize: "20px" }}
                        onClick={() => deleteReaction(tab.id)}
                      />
                    </Box>
                  );
                })}
              </Box>
              <Box></Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "355px 1fr",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <CustomFormLabel label=" Onset Date" isRequired={false} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture={true}
                    value={
                      formik.values.onSetDate
                        ? dayjs(formik.values.onSetDate)
                        : null
                    }
                    sx={{
                      "& .MuiInputBase-input": {
                        padding: "10px !important",
                      },
                      width: "100%",
                      "& fieldset": { border: "none" },
                      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                      borderRadius: "4px",
                      "& label": {
                        color: "#1A1A1A80 !important",
                        fontSize: "14px !important",
                      },
                      "& .MuiInputBase-root": {
                        height: "42px",
                        width: "100%",
                        fontSize: "14px",
                        borderRadius: "5px",
                        border:
                          formik.errors.onSetDate && formik.touched.onSetDate
                            ? "1px solid red"
                            : "",
                      },
                    }}
                    onChange={(e: any) => {
                      const date = moment(e.$d).format("yyyy-MM-DD");
                      // setSelectedDate(dayjs(date));
                      formik.setFieldValue("onSetDate", date);
                    }}
                  />
                  {formik.touched.onSetDate && formik.errors.onSetDate && (
                    <FormHelperText error>
                      {formik.errors.onSetDate}
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </Box>
              <Box>
                <CustomFormLabel label="Status" />
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "start",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  {selectStatus.map((data, index) => {
                    return (
                      <Grid
                        item
                        xs={2}
                        sx={{
                          background:
                            selectedButtonIndex == index
                              ? "#2C57B3 !important"
                              : "transparent",
                          color:
                            selectedButtonIndex == index
                              ? "#fff !important"
                              : "black",
                          borderRadius: "5px",
                          opacity: 1,
                          width: "200px !important",
                          height: "38px !important",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0px 0px 6px #00000029",
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedButtonIndex(index);
                          formik.setFieldValue(
                            "status",
                            index == 0 ? true : false
                          );
                        }}
                      >
                        {data.key}
                      </Grid>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              <CustomFormLabel label="Note" isRequired={false} />
              <InputBase
                onChange={(e) => formik.setFieldValue("note", e.target.value)}
                onBlur={formik.handleBlur}
                fullWidth
                multiline={true}
                rows="3"
                name="note"
                value={formik.values.note}
                placeholder="Type here"
                classes={{
                  root: classes.providerTextAreaField,
                  input: classes.textFieldInput,
                  focused: classes.textFieldActive,
                  error: classes.inputBoxError,
                }}
              />
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions
        sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
      >
        <ButtonBase onClick={close} sx={formButtonStyle.cancelButtonStyle}>
          {CANCEL}
        </ButtonBase>
        <ButtonBase
          type="submit"
          sx={formButtonStyle.saveButtonStyle}
          onClick={formik.submitForm}
        >
          {title == "Add Allergy" ? "Add" : "Save"}
        </ButtonBase>
      </DialogActions>
    </Dialog>
  );
}

export default AddAllergies;
