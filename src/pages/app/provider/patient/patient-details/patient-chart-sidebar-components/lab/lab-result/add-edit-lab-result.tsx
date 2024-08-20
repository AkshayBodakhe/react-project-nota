import {
  Autocomplete,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { labStyle } from "./../lab-order/forms/add-edit-lab-order";
import {
  commonWidget,
  formButtonStyle,
  formTitle,
} from "../../../../../../../../styles/common";
import { adminConstants } from "../../../../../../../../constants/admin";
import { useFormik } from "formik";
import CustomDatePickerProps from "../../../../../../../../components/common/custom-date-picker";
import { useEffect, useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import SelectInput from "../../../../../../../../components/common/select-input";
import { InterpretationType } from "../../../../../../../../components/common/form-enum";
import {
  useDiagnosticCentresControllerServiceListDiagnosticCenter,
  usePatientLabOrderControllerServiceGetAllLabOrders,
  usePatientLabResultsControllerServiceAddLabResults,
  usePatientLabResultsControllerServiceUpdatePatientLabResults,
  useUserControllerServiceGetUsers,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import moment from "moment";
import dayjs from "dayjs";
import { ResultUploadOptions } from "../../enums-interfaces/enums";
import { DialogFormProps } from "../../enums-interfaces/interfaces";
import { useSelector } from "react-redux";

const { ADD, CANCEL, EDIT } = adminConstants;

const DialogWidth = {
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: "700px !important",
  },
};

function AddEditLabResult(props: DialogFormProps) {
  const classes = labStyle();
  const commonClasses = commonWidget();
  const [reviewerData, setReviewerData] = useState<any[]>([]);
  const [labNamesData, setlabNamesData] = useState<any[]>([]);
  const [labOrdersData, setLabOrdersData] = useState<any[]>([]);

  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  const [initialValues] = useState({
    id: "",
    uuid: "",
    patient: {
      uuid: props.patientData.uuid,
    },
    uploadOption: "Upload result without lab order",
    patientLabOrder: null,
    reviewer: null,
    labName: null,
    recordedDate: "",
    recordedTime: "",
    unit: "",
    resultValue: "",
    testName: "",
    interpretation: "",
    file: "",
    note: "",
    archive: "",
  });

  const { mutateAsync } = props.editData
    ? usePatientLabResultsControllerServiceUpdatePatientLabResults()
    : usePatientLabResultsControllerServiceAddLabResults();

  const {
    data: reviewerList,
    isLoading: isReviewersListLoading,
    isError: isReviewersError,
    refetch: refetchReviewers,
  } = useUserControllerServiceGetUsers({});

  const {
    data: labNameList,
    isLoading: isLabNamesLoading,
    refetch: refetechLabNames,
    isError: isLabNamesError,
  } = useDiagnosticCentresControllerServiceListDiagnosticCenter({
    providerGroupUuid,
    type: "LAB",
    page: 0,
    size: 100,
  });

  const {
    data: labOrdersList,
    isLoading: isLabOrdersLoading,
    refetch: refetchLabOrders,
    isError: isLabOrdersError,
  } = usePatientLabOrderControllerServiceGetAllLabOrders({
    patientUuid: props.patientData.uuid,
    page: 0,
    size: 10,
  });

  useEffect(() => {
    if (props.editData) handleEditData(props.editData);
  }, [props]);

  useEffect(() => {
    if (!isReviewersListLoading && isReviewersError) refetchReviewers();
    if (!isLabOrdersLoading && isLabOrdersError) refetchLabOrders();
    if (!isLabNamesLoading && isLabNamesError) refetechLabNames();
    if (reviewerList?.data && reviewerList.data?.content)
      setReviewerData(reviewerList.data.content);
    if (labNameList?.data && labNameList.data?.content)
      setlabNamesData(labNameList.data.content);
    if (labOrdersList?.data && labOrdersList.data?.content)
      setLabOrdersData(labOrdersList.data.content);
  }, [
    reviewerList?.data,
    labNameList?.data,
    labOrdersList?.data,
    isReviewersListLoading,
    isLabNamesLoading,
    isLabOrdersLoading,
  ]);

  const handleSubmit = (Values: any) => {
    if (formik.values.uploadOption === ResultUploadOptions.WITHOUT_LAB_ORDER)
      formik.values.patientLabOrder = null;

    try {
      mutateAsync({ requestBody: Values }).then(() => {
        props.onClose();
      });
    } catch (_error) {}
  };

  const labDefaultProps = {
    options: labOrdersData,
    getOptionLabel: (option: any) => `Ordered on ${option.collectionDateTime}`,
  };

  const reviewerDefaultProps = {
    options: reviewerData,
    getOptionLabel: (option: any) => `${option.firstName} ${option.lastName}`,
  };

  const labNamesDefaultProps = {
    options: labNamesData,
    getOptionLabel: (option: any) => option.name,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  });

  function handleEditData(editData: any) {
    Object.keys(editData).map((key: any) => {
      formik.setFieldValue(key, editData[key]);
    });
    formik.setFieldValue("labName", editData.lab);
  }

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} sx={DialogWidth}>
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ background: "#F5F6F9", marginBottom: "15px" }}
        >
          <Typography sx={formTitle}>{props.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <form action="">
            <Grid container>
              <Grid item container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5" className={classes.label}>
                    Upload Option
                  </Typography>
                  <RadioGroup
                    value={formik.values.uploadOption}
                    onChange={(e) =>
                      formik.setFieldValue("uploadOption", e.target.value)
                    }
                  >
                    <FormControlLabel
                      value={ResultUploadOptions.EXISTING_LAB_ORDER}
                      control={<Radio />}
                      label={ResultUploadOptions.EXISTING_LAB_ORDER}
                    />
                    <FormControlLabel
                      value={ResultUploadOptions.WITHOUT_LAB_ORDER}
                      control={<Radio />}
                      label={ResultUploadOptions.WITHOUT_LAB_ORDER}
                    />
                  </RadioGroup>
                </Grid>
                {formik.values.uploadOption ===
                  ResultUploadOptions.EXISTING_LAB_ORDER && (
                  <Grid item xs={12} lg={6}>
                    <Typography variant="h5" className={classes.label}>
                      Lab Order
                    </Typography>
                    <Autocomplete
                      {...labDefaultProps}
                      id="labOrder"
                      value={formik.values.patientLabOrder}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "1px !important",
                          border: "none",
                          "& fieldset": { border: "none" },
                          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                        },
                      }}
                      onChange={(_event: any, newValue: any) => {
                        formik.setFieldValue("patientLabOrder", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item container xs={12} lg={12} spacing={2} mt={1}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5" className={classes.label}>
                    Reviewer
                  </Typography>
                  <Autocomplete
                    {...reviewerDefaultProps}
                    id="reviewer"
                    value={formik.values.reviewer}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "1px !important",
                        border: "none",
                        "& fieldset": { border: "none" },
                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    onChange={(_event: any, newValue: any) => {
                      formik.setFieldValue("reviewer", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item container xs={12} spacing={2} lg={6}>
                  <Grid item xs={6} lg={6}>
                    <Typography variant="h5" className={classes.label}>
                      Recorded Date
                    </Typography>
                    <CustomDatePickerProps
                      value={dayjs(formik.values.recordedDate)}
                      changeDate={(e: any) => {
                        const date = moment(e.$d).format("yyyy-MM-DD");
                        formik.setFieldValue("recordedDate", date);
                      }}
                      height="42px"
                    />
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Typography variant="h5" className={classes.label}>
                      Recorded Time
                    </Typography>
                    <TextField
                      fullWidth
                      sx={{
                        width: "100% !important",
                        "& .MuiOutlinedInput-input": {
                          padding: "8px 6px",
                          resize: "none",
                        },
                      }}
                      type="text"
                      name="recordedTime"
                      placeholder="Enter Time"
                      onBlur={(e: any) => (e.target.type = "text")}
                      onFocus={(e: any) => (e.target.type = "time")}
                      InputProps={{
                        classes: {
                          root: classes.hoursInputField,
                          // input: commonStyle.hoursInputTextBox,
                          // focused: commonStyle.textFieldActive,
                        },
                      }}
                      value={formik.values.recordedTime}
                      onChange={(e) =>
                        formik.setFieldValue("recordedTime", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12} lg={12} spacing={2} mt={1}>
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5" className={classes.label}>
                    Lab Name
                  </Typography>
                  <Autocomplete
                    {...labNamesDefaultProps}
                    id="labName"
                    value={formik.values.labName}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "1px !important",
                        border: "none",
                        "& fieldset": { border: "none" },
                        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    onChange={(_event: any, newValue: any) => {
                      formik.setFieldValue("labName", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5" className={classes.label}>
                    Test Name
                  </Typography>
                  <TextField
                    fullWidth
                    sx={{
                      width: "100% !important",
                      "& .MuiOutlinedInput-input": {
                        padding: "8px 6px",
                        resize: "none",
                      },
                    }}
                    type="text"
                    name="testName"
                    value={formik.values.testName}
                    placeholder="Enter Test Name"
                    InputProps={{
                      classes: {
                        root: classes.hoursInputField,
                      },
                    }}
                    onChange={(e) =>
                      formik.setFieldValue("testName", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} lg={12} spacing={2} mt={1}>
                <Grid item container xs={12} spacing={2} lg={6}>
                  <Grid item xs={6} lg={6}>
                    <Typography variant="h5" className={classes.label}>
                      Result Value
                    </Typography>
                    <TextField
                      fullWidth
                      sx={{
                        width: "100% !important",
                        "& .MuiOutlinedInput-input": {
                          padding: "8px 6px",
                          resize: "none",
                        },
                      }}
                      type="text"
                      name="resultValue"
                      placeholder="Enter Result Value"
                      InputProps={{
                        classes: {
                          root: classes.hoursInputField,
                        },
                      }}
                      value={formik.values.resultValue}
                      onChange={(e) =>
                        formik.setFieldValue("resultValue", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6} lg={6}>
                    <Typography variant="h5" className={classes.label}>
                      Unit
                    </Typography>
                    <TextField
                      fullWidth
                      sx={{
                        width: "100% !important",
                        "& .MuiOutlinedInput-input": {
                          padding: "8px 6px",
                          resize: "none",
                        },
                      }}
                      type="text"
                      name="unit"
                      placeholder="Enter Unit"
                      InputProps={{
                        classes: {
                          root: classes.hoursInputField,
                        },
                      }}
                      value={formik.values.unit}
                      onChange={(e) =>
                        formik.setFieldValue("unit", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5" className={classes.label}>
                    Interpretation
                  </Typography>
                  <SelectInput
                    options={InterpretationType}
                    isEditForm={formik.values?.interpretation}
                    selectedOption={formik.values?.interpretation || ""}
                    onChange={(e: any) =>
                      formik.setFieldValue("interpretation", e.target.value)
                    }
                    placeholder="Select"
                  />
                  {/* <Autocomplete
                                    {...labDefaultProps}
                                    id="interpretation"
                                    // value={formik.values.location}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            padding: '1px !important',
                                            border: "none",
                                            "& fieldset": { border: "none" },
                                            boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)"
                                        },
                                    }}
                                    onChange={(event: any, newValue: any) => {
                                        console.log(event);
                                        formik.setFieldValue('location', newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} placeholder="Select" variant="outlined" />
                                    )}
                                /> */}
                </Grid>
              </Grid>
              <Grid item xs={12} lg={12} mt={2}>
                <DropzoneArea
                  dropzoneText="Drag & Drop files Or Browse Files"
                  onChange={(_files: any) => {}}
                  classes={{
                    root: classes.dropZone,
                    icon: classes.uploadIcon,
                    text: classes.textUploadZone,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12} mt={1}>
                <Typography variant="h5" className={classes.label}>
                  Note
                </Typography>
                <InputBase
                  fullWidth
                  type="text"
                  name="note"
                  value={formik.values.note}
                  placeholder="Type Here"
                  onChange={(e) => formik.setFieldValue("note", e.target.value)}
                  classes={{
                    root: commonClasses.providerTextAreaField,
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <ButtonBase
            onClick={props.onClose}
            sx={formButtonStyle.cancelButtonStyle}
          >
            {CANCEL}
          </ButtonBase>
          <ButtonBase
            sx={formButtonStyle.saveButtonStyle}
            onClick={formik.submitForm}
          >
            {props.editData ? EDIT : ADD}
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddEditLabResult;
