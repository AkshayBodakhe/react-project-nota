import {
  Autocomplete,
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DropzoneArea } from "material-ui-dropzone";
import { adminConstants } from "../../../../../../../../../constants/admin";
import ClearIcon from "@mui/icons-material/Clear";
import {
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../../../../../styles/common";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { BillType } from "../../../enums-interfaces/enums";
import SelectInput from "../../../../../../../../../components/common/select-input";
import {
  ChartNote,
  PatientInsurance,
} from "../../../../../../../../../components/common/form-enum";
import CustomDatePickerProps from "../../../../../../../../../components/common/custom-date-picker";
import moment from "moment";
import {
  useDiagnosticCentresControllerServiceListDiagnosticCenter,
  useLocationControllerServiceGetAllLocations,
  usePatientLabOrderControllerServiceAddOrderSet,
  usePatientLabOrderControllerServiceAddPatientLabOrder,
  usePatientLabOrderControllerServiceUpdatePatientLabOrder,
} from "../../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { PatientLabOrder } from "../../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import dayjs from "dayjs";
import EventSucessModal from "../../../../../../../../../components/common/success-modal";
import { ModalMessages } from "../../../../../../../../../components/common/enums-and-interfaces/enums";
import OrderSetModal from "./order-set-modal";
import { DialogFormProps } from "../../../enums-interfaces/interfaces";
import { useSelector } from "react-redux";

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
    // fontSize: "14px !important",
    fontWeight: "bold !important",
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
  "& .css-142erj9-MuiPaper-root-MuiDialog-paper": {
    maxWidth: "900px",
  },
  hoursInputField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 8px",
    fontSize: "16px",
    width: "100% !important",
    "@media (max-width: 820px)": {
      width: "100%",
    },
  },
}));

const sxs = {
  billTypeBox: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 6px #00000029",
    borderRadius: "20px",
    opacity: 1,
    display: "flex",
    justifyContent: "space-between",
    // padding: '8px',
    cursor: "pointer",
  },
  billType: {
    width: "35%",
    display: "flex",
    borderRadius: "20px",
    padding: "8px",
    justifyContent: "center",
  },
  activeBillType: {
    color: "#1B5984",
    border: "1px solid #1B5984",
  },
  reminderTime: {
    display: "flex",
    // textAlign: 'center !important',
    alignItems: "center !important",
    flexDirection: "row",
    flex: "1",
    justifyContent: "center !important",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#1A1A1A26",
    fontSize: "14px",
  },
};

const DialogWidth = {
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    maxWidth: "800px !important",
  },
};

function AddEditLabOrders(props: DialogFormProps) {
  const { onClose, open, title } = props;

  const classes = labStyle();
  const commonStyle = commonWidget();
  const { ADD, CANCEL } = adminConstants;

  const [tests, setTests] = useState<any[]>([]);
  const [icdCodes, setIcdCodes] = useState<any[]>([]);
  const [icdCodesData, setIcdCodesData] = useState<any[]>([]);
  const [locationsData, setLocationsData] = useState<any[]>([]);
  const [labData, setLabData] = useState<any[]>([]);
  const [testsData, setTestsData] = useState<any[]>([]);
  const [successModalOpen, setOpenSuccessModalOpne] = useState(false);
  const [message, setMessage] = useState("");
  const [orderSetModal, setOpenOrderSetModal] = useState<boolean>(false);
  const [orderName, setOrderName] = useState("");
  const [reminderTime, setReminderTime] = useState<string[]>([
    "12h",
    "24h",
    "3d",
    "7d",
    "2w",
    "+",
  ]);

  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;

  const data: any = {};
  const { data: LocationData } = useLocationControllerServiceGetAllLocations({
    providerGroupUuid,
  });
  const { data: LABData } =
    useDiagnosticCentresControllerServiceListDiagnosticCenter({
      providerGroupUuid,
      type: "LAB",
    });
  const TESTSData: any = {
    data: {
      content: [
        {
          id: 1,
          name: "Example Test 1",
        },
        {
          id: 2,
          name: "Example Test 2",
        },
      ],
    },
  };

  const { mutateAsync } = props.editData
    ? usePatientLabOrderControllerServiceUpdatePatientLabOrder()
    : usePatientLabOrderControllerServiceAddPatientLabOrder();
  const { mutateAsync: addOrderSet } =
    usePatientLabOrderControllerServiceAddOrderSet();

  useEffect(() => {
    if (props.editData) patchData(props.editData);
  }, []);

  useEffect(() => {
    if (data?.data && data.data?.content) {
      setIcdCodesData(data.data.content);
    }
    if (LocationData?.data && LocationData.data?.content) {
      setLocationsData(LocationData.data.content);
    }
    if (LABData?.data && LABData.data?.content) {
      setLabData(LABData.data.content);
    }
    if (TESTSData?.data && TESTSData.data?.content) {
      setTestsData(TESTSData.data.content);
    }
  }, [LocationData?.data, LABData?.data]);

  // const icdCodesData = [
  //   {
  //     id: 1,
  //     name: 'Methadone Blood with Confirmation (CLH 2437) (METHSP)'
  //   },
  //   {
  //     id: 2,
  //     name: 'Methadone Blood with Confirmation (CLH 2437)'
  //   }
  // ];

  // const locationsData = [
  //   {
  //     id: 1,
  //     uuid: 'f445a272-3218-4d72-be29-7563d82f0b48',
  //     name: 'Jupiter Hospital'
  //   },
  //   {
  //     id: 2,
  //     uuid: 'k345a272-3218-4d72-be29-7563d82f0b48',
  //     name: 'Bharti Hospital'
  //   }
  // ]

  // const labData = [
  //   {
  //     id: 1,
  //     name: 'Lab 1'
  //   },
  //   {
  //     id: 2,
  //     name: 'Lab 2'
  //   }
  // ]

  // const testsData = [
  //   {
  //     id: 1,
  //     name: "Example Test 1"
  //   },
  //   {
  //     id: 2,
  //     name: "Example Test 2"
  //   }
  // ];

  const [initialValues] = useState({
    id: "",
    uuid: "",
    location: {
      id: "",
      name: "",
    },
    diagnosticCentre: {
      id: "",
      uuid: "",
    },
    patient: {
      uuid: props.patientData?.uuid,
    },
    billTypes: BillType.PATIENT,
    tests: "",
    icdCodeName: "",
    patientInstructions: "",
    labInstructions: "",
    collectionDateTime: null,
    reminderTime: "",
    chartNote: PatientLabOrder.chartNote,
    status: PatientLabOrder.status.SEND,
    archive: false,
  });

  const patchData = (editData: any) => {
    Object.keys(editData).map((key) => {
      if (key != formik.values.collectionDateTime)
        formik.setFieldValue(key, editData[key]);
      else formik.setFieldValue(key, dayjs(editData[key]));
    });
    setTests(editData.tests);
    setIcdCodes(editData.icdCodes);
  };

  const icdCodesDefaultProps = {
    options: icdCodesData,
    getOptionLabel: (option: any) => option.name,
  };

  const locationsDefaultProps = {
    options: locationsData,
    getOptionLabel: (option: any) => option.name,
  };

  const labDefaultProps = {
    options: labData,
    getOptionLabel: (option: any) => option.name,
  };

  const testsDefaultProps = {
    options: testsData,
    getOptionLabel: (option: any) => option.name,
  };

  const handleAddOrderSet = () => {
    if (orderName && tests.length) {
      const orderSetPayload = {
        patient: {
          uuid: props.patientData?.uuid || "-",
        },
        orderName: orderName,
        tests: tests,
      };

      try {
        addOrderSet({ requestBody: orderSetPayload }).then(() => {
          setOpenOrderSetModal(false);
          setOrderName("");
        });
      } catch (error) {}
    }
  };

  const handleSubmit = (values: any, type: any) => {
    values.tests = tests;
    // values.icdCodeName = icdCodes;
    setMessage(ModalMessages.LAB_ADDED);

    if (type === "CANCEL" && !values.location.name) {
      onClose();
      return;
    }
    if (type === "CANCEL") {
      setMessage(ModalMessages.LAB_EDITED);
      values.status = PatientLabOrder.status.DRAFT;
    }

    try {
      mutateAsync({ requestBody: values }).then(() => {
        props.onClose();
        setOpenSuccessModalOpne(true);
      });
    } catch (_error) {}
  };

  const closeOrderSet = () => {
    setOpenOrderSetModal(false);
    setOrderName("");
  };

  const handleAddReminderTime = (event: any) => {
    if (event === "+") {
      setReminderTime((prev) => [...prev, "1m"]);
    } else {
    }
  };

  const handleAddRemoveDetails = (
    newValue: any,
    action: string,
    detailArray: any[],
    setMethod: any
  ) => {
    if (!newValue) return;

    if (action === "ADD") {
      if (!detailArray.length)
        setMethod((prevTests: any) => [...prevTests, newValue]);
      else {
        if (!detailArray.some((test) => test.id === newValue.id)) {
          setMethod((prevTests: any) => [...prevTests, newValue]);
        }
      }
    } else {
      const newArray = detailArray.filter((test) => test.id != newValue.id);
      setMethod(newArray);
    }

    // if(type === 'TESTS'){
    //   if(action === 'ADD'){
    //     if (!tests.length) setTests(prevTests => [...prevTests, newValue]);
    //     else {
    //       if (!tests.some(test => test.id === newValue.id)) {
    //         setTests(prevTests => [...prevTests, newValue]);
    //       }
    //     }
    //   }else{
    //     const newArray = tests.filter(test => test.id != newValue.id);
    //     setTests(newArray);
    //   }
    // }else{
    //   if(action === 'ADD'){
    //     if (!icdCodes.length) setIcdCodes(prevCodes => [...prevCodes, newValue]);
    //     else {
    //       if (!icdCodes.some(test => test.id === newValue.id)) {
    //         setIcdCodes(prevCodes => [...prevCodes, newValue]);
    //       }
    //     }
    //   }else{
    //     const newArray = icdCodes.filter(test => test.id != newValue.id);
    //     setIcdCodes(newArray);
    //   }
    // }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => handleSubmit(values, "ADD"),
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} sx={DialogWidth}>
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ background: "#F5F6F9", marginBottom: "15px" }}
        >
          <Typography sx={formTitle}>{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} xs={12}>
            <Grid item xs={12} lg={6}>
              <Typography variant="h5" className={classes.label}>
                Location
              </Typography>
              <Autocomplete
                {...locationsDefaultProps}
                id="location"
                value={formik.values.location}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "1px !important",
                    border: "none",
                    "& fieldset": { border: "none" },
                    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onChange={(_event: any, newValue: any) => {
                  formik.setFieldValue("location", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search And Select Location"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid
              item
              container
              spacing={2}
              xs={12}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item xs={12} lg={6}>
                <Typography variant="h5" className={classes.label}>
                  Lab
                </Typography>
                <Autocomplete
                  {...labDefaultProps}
                  id="diagnosticCentre"
                  value={formik.values.diagnosticCentre}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "1px !important",
                      border: "none",
                      "& fieldset": { border: "none" },
                      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  onChange={(_event: any, newValue: any) => {
                    formik.setFieldValue("diagnosticCentre", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search And Select"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} lg={5}>
                <Typography variant="h5" className={classes.label}>
                  Bill Type
                </Typography>
                <Box sx={sxs.billTypeBox}>
                  <ButtonBase
                    sx={{
                      ...sxs.billType,
                      ...(formik.values.billTypes == BillType.PATIENT &&
                        sxs.activeBillType),
                    }}
                    onClick={() =>
                      formik.setFieldValue("billTypes", BillType.PATIENT)
                    }
                  >
                    Patient
                  </ButtonBase>
                  <ButtonBase
                    sx={{
                      ...sxs.billType,
                      ...(formik.values.billTypes == BillType.PROVIDER &&
                        sxs.activeBillType),
                    }}
                    onClick={() =>
                      formik.setFieldValue("billTypes", BillType.PROVIDER)
                    }
                  >
                    Provider
                  </ButtonBase>
                  <ButtonBase
                    sx={{
                      ...sxs.billType,
                      ...(formik.values.billTypes == BillType.INSURANCE &&
                        sxs.activeBillType),
                    }}
                    onClick={() =>
                      formik.setFieldValue("billTypes", BillType.INSURANCE)
                    }
                  >
                    Insurance
                  </ButtonBase>
                </Box>
              </Grid>
              {/* <Grid item xs={3}>
              <Typography variant="h5" className={classes.label}>
                Registration Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Choose Date"
                  slotProps={{ textField: { size: "small" } }}
                  sx={{
                    width: "100%",
                    "& fieldset": { border: "none" },
                    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                    "& label": {
                      color: "#1A1A1A80 !important",
                      fontSize: "14px !important",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid> */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.label}>
                Tests
              </Typography>
              <Box>
                {tests &&
                  tests.map((test: any) => {
                    return (
                      <InputBase
                        key={test.id}
                        disabled
                        sx={{ marginBottom: "10px" }}
                        fullWidth
                        classes={{
                          root: commonStyle.textFieldFullWidth,
                        }}
                        endAdornment={
                          <IconButton
                            aria-label="clear"
                            onClick={() =>
                              handleAddRemoveDetails(
                                test,
                                "REMOVE",
                                tests,
                                setTests
                              )
                            }
                            edge="start"
                          >
                            <ClearIcon />
                          </IconButton>
                        }
                        value={test.name}
                      />
                    );
                  })}
              </Box>
              <Autocomplete
                {...testsDefaultProps}
                id="tests"
                // value={tests}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "1px !important",
                    border: "none",
                    "& fieldset": { border: "none" },
                    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onChange={(_event: any, newValue: any) => {
                  handleAddRemoveDetails(newValue, "ADD", tests, setTests);
                }}
                renderInput={(params: any) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Search and Select Test"
                      variant="outlined"
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.label}>
                ICD Code
              </Typography>
              <Box>
                {icdCodes &&
                  icdCodes.map((test: any) => {
                    return (
                      <InputBase
                        key={test.id}
                        disabled
                        sx={{ marginBottom: "10px" }}
                        fullWidth
                        classes={{
                          root: commonStyle.textFieldFullWidth,
                        }}
                        endAdornment={
                          <IconButton
                            aria-label="clear"
                            onClick={() =>
                              handleAddRemoveDetails(
                                test,
                                "REMOVE",
                                icdCodes,
                                setIcdCodes
                              )
                            }
                            edge="start"
                          >
                            <ClearIcon />
                          </IconButton>
                        }
                        value={test.name}
                      />
                    );
                  })}
              </Box>
              <Autocomplete
                {...icdCodesDefaultProps}
                id="icdCodes"
                // value={formik.values.location}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "1px !important",
                    border: "none",
                    "& fieldset": { border: "none" },
                    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onChange={(_event: any, newValue: any) => {
                  handleAddRemoveDetails(
                    newValue,
                    "ADD",
                    icdCodes,
                    setIcdCodes
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search and Select ICD"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} lg={12}>
              <ButtonBase sx={{
                background: '#1A1A1A0D 0% 0% no-repeat padding-box',
                border: '1px solid #1A1A1A26',
                borderRadius: '3px',
                opacity: 1,
                padding: '5px'
                // width: '100%'
              }}
                onClick={handleAddOrderSet}
              >
                Save as Order Set
              </ButtonBase>
            </Grid> */}
            <Grid item xs={12} lg={12}>
              <Typography variant="h5" className={classes.label}>
                Patient Instructions
              </Typography>
              <SelectInput
                isEditForm={props.editData?.patientInstructions}
                selectedOption={props.editData?.patientInstructions}
                placeholder="Select Patient Instructions"
                options={PatientInsurance}
                onChange={(e: any) =>
                  formik.setFieldValue("patientInstructions", e.target.value)
                }
              />
              {/* <InputBase
              placeholder="Type here"
              multiline={true}
              rows="3"
              classes={{
                root: commonStyle.providerTextAreaField,
              }}
            /> */}
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography variant="h5" className={classes.label}>
                Lab Instructions To Test Center
              </Typography>
              <InputBase
                fullWidth
                placeholder="Lab instructions to test center"
                value={formik.values.labInstructions}
                classes={{
                  root: commonStyle.textFieldFullWidth,
                  input: commonStyle.textFieldInput,
                  focused: commonStyle.textFieldActive,
                }}
                onChange={(e) =>
                  formik.setFieldValue("labInstructions", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography variant="h5" className={classes.label}>
                Collection Date & Time
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <CustomDatePickerProps
                    value={dayjs(formik.values.collectionDateTime)}
                    changeDate={(e: any) => {
                      const date = moment(e.$d).toDate().toISOString();
                      // console.log("date :: ", date);

                      formik.setFieldValue("collectionDateTime", date);
                    }}
                    height="42px"
                  />
                </Grid>
                <Grid item xs={4}>
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
                    placeholder="Time"
                    onBlur={(e: any) => (e.target.type = "text")}
                    onFocus={(e: any) => (e.target.type = "time")}
                    InputProps={{
                      classes: {
                        root: classes.hoursInputField,
                        input: commonStyle.hoursInputTextBox,
                        focused: commonStyle.textFieldActive,
                      },
                    }}
                    value={formik.values.reminderTime}
                    onChange={(e) =>
                      formik.setFieldValue("reminderTime", e.target.value)
                    }
                    // disabled={!hoursSelect.monday}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              xs={12}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item xs={12} lg={5}>
                <Typography variant="h5" className={classes.label}>
                  Reminder Time
                </Typography>
                <Box sx={{ display: "flex", gap: "12px" }}>
                  {reminderTime.map((time: any) => {
                    return (
                      <InputBase
                        readOnly
                        sx={{
                          ...sxs.reminderTime,
                          "& .css-yz9k0d-MuiInputBase-input ": {
                            display: "flex",
                            flex: 1,
                            textAlign: "center !important",
                            cursor: "pointer",
                          },
                        }}
                        onClick={(e: any) =>
                          handleAddReminderTime(e.target.value)
                        }
                        value={time}
                      />
                    );
                  })}
                </Box>
                {/* <span style={{ fontSize: '14px' }}>If result are not received within this time period, we’ll send you a reminder to follow up with the patient</span> */}
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant="h5" className={classes.label}>
                  Chart Note
                </Typography>
                <SelectInput
                  isEditForm={props.editData?.chartNote}
                  selectedOption={props.editData?.chartNote}
                  placeholder="Select a Chart Note"
                  options={ChartNote}
                  onChange={(e: any) =>
                    formik.setFieldValue("chartNote", e.target.value)
                  }
                />
              </Grid>
            </Grid>
            {/* <Grid item xs={12} lg={12}>
            <DropzoneArea
              dropzoneText="Drag & Drop files Or Browse Files"
              onChange={(files: any) => { console.log("Files :: ", files) }}
              classes={{
                root: classes.dropZone,
                icon: classes.uploadIcon,
                text: classes.textUploadZone,
              }}
            />
          </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
        >
          <ButtonBase
            sx={{
              background: "#1A1A1A0D 0% 0% no-repeat padding-box",
              border: "1px solid #1A1A1A26",
              borderRadius: "3px",
              opacity: 1,
              padding: "9px",
              width: "8vw",
            }}
            onClick={() => setOpenOrderSetModal(true)}
          >
            Save as Order Set
          </ButtonBase>
          <ButtonBase
            onClick={() => handleSubmit(formik.values, "CANCEL")}
            sx={formButtonStyle.cancelButtonStyle}
          >
            {CANCEL}
          </ButtonBase>
          <ButtonBase
            sx={formButtonStyle.saveButtonStyle}
            onClick={formik.submitForm}
          >
            {ADD}
          </ButtonBase>
        </DialogActions>
      </Dialog>
      {successModalOpen && (
        <EventSucessModal
          message={message}
          onClose={() => setOpenSuccessModalOpne(false)}
        />
      )}
      <OrderSetModal
        open={orderSetModal}
        onClose={closeOrderSet}
        orderName={orderName}
        setOrderName={setOrderName}
        onSave={handleAddOrderSet}
      />
    </>
  );
}

export default AddEditLabOrders;
