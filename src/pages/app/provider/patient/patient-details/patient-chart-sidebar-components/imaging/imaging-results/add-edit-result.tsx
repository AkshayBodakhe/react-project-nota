import {
  Box,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputBase,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { style } from "../../../../../referral/style/common-style";
import { patientStyle } from "../../../../style/commonStyle";
import React, { useEffect, useState } from "react";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  commonWidget,
  customImageContainer,
  formButtonStyle,
} from "../../../../../../../../styles/common";
import { DropzoneArea } from "material-ui-dropzone";
import { uploadStyle } from "../../../../../../admin/new-master/data-import/upload-data-import";
import {
  PatientImageOrderControllerService,
  PatientImageResult,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import {
  usePatientImageResultControllerServiceAddImageResults,
  usePatientImageResultControllerServiceUpdateImageResults,
  useUserControllerServiceGetUsers,
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  patientData: any;
  editData?:any;
}

function AddEditResult(props: DialogProps) {
  const { onClose, open, title, patientData,editData } = props;
  const commonStyle = style();
  const classes = patientStyle();
  const common = commonWidget();
  const uploadClasses = uploadStyle();
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
  const [value, setValue] = React.useState("");
  const [labOrder, setLabOrder] = useState("");
  const [, setSelectedLabOrder] = useState<any>(null);
  const [showLabOrder, setShowLabOrder] = useState(false);
  const [labOrderOption, setLabOrderOption] = useState<any>(null);
  const [reviewer, setReviewer] = useState<any>(null);
  const [selectedreviewer, setSelectedReviewer] = useState<any>(null);
  const [reviewerOption, setReviewerOption] = useState<any>(null);
  const [registrationDate, setRegistrationDate] = useState<any>(null);
  const [imagingType, setImagingType] = useState<any>(null);
  const [imagingTypeOption, setImagingTypeOption] = useState<any>(null);
  const [testName, setTestName] = useState<any>(null);
  const [interpretation, setInterpretation] = useState(undefined);
  const [selectedInterpretation, setSelectedInterpretation] = useState(null);
  const [interpretationOption, setInterpretationOption] = useState<any>(null);
  const [note, setNote] = useState("");
  const [time, setTime] = useState("");
  // const [file,setFileDetails] = useState('');

  const { mutateAsync } =
    usePatientImageResultControllerServiceAddImageResults();

  const { mutateAsync:editResult , isSuccess :editSuccess} = usePatientImageResultControllerServiceUpdateImageResults();  

  useEffect(() => {
    if(editData){
      setValue(editData?.uploadOption);
      setNote(editData?.note);
      setSelectedInterpretation(editData?.interpretation);
      setTestName(editData?.test);
      setSelectedReviewer(editData?.reviewer);
      setImagingType(editData?.imageType);
      // setRegistrationDate(editData?.recordedDate);
    }
  },[editData]);

  useEffect(() => {

  },[editSuccess]);

  useEffect(() => {
    getImageOrderList();
    const imageType = Object.values(PatientImageResult.imageType) as string[];
    setImagingTypeOption(imageType);
    const interpretation = Object.values(
      PatientImageResult.interpretation
    ) as string[];
    setInterpretationOption(interpretation);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    if (value != "Associate result with existing lab order") {
      setShowLabOrder(true);
    } else {
      setShowLabOrder(false);
    }
  };

  const handleSelectOption = (event: any, name?: any) => {
    if (name == "Reviewer") {
      reviewerOption.forEach((element: any) => {
        if (element.id == event.target.value) {
          // setProviderUUID(element.uuid);
          const providerName = `${element.firstName || ""} ${
            element.lastName || ""
          }`;
          setSelectedReviewer(providerName);
          setReviewer({
            id: element.id,
            uuid: element.uuid,
          });
        }
      });
    } else if (name == "labOrder") {
      labOrderOption.forEach((element: any) => {
        if (element.id == event.target.value) {
          const formatteddate = formattedDate(element.collectionDatetime);
          setLabOrder(formatteddate);
          setSelectedLabOrder({
            id: element.id,
            uuid: element.uuid,
          });
        }
      });
    } else if (name == "imagingType") {
      setImagingType(event.target.value);
    } else if (name == "interpretation") {
      setInterpretation(event.target.value);
    }
  };

  const handleDateChange = (date: any) => {
    setRegistrationDate(formatRegistrationDate(date));
  };

  const inputData = (e: any) => {
    setTestName(e.target.value);
  };

  const pageable = {
    page: 0,
    size: 100,
  };

  const { data: userList, isSuccess: getUserList } =
    useUserControllerServiceGetUsers({
      ...pageable,
    });

  useEffect(() => {
    if (getUserList && !!userList) {
      setReviewerOption(userList?.data?.content);
    }
  }, [getUserList]);

  const getImageOrderList = async () => {
    const list = await PatientImageOrderControllerService.getAllImageOrders(
      patientData.uuid
    );
    if (list?.data?.content) {
      setLabOrderOption(list?.data?.content);
    }
  };
  const UploadFile = (_file: File) => {
    // requestBody = {
    //   category: category,
    //   title: category,
    //   formData: {
    //     file: file,
    //   },
    //   providerGroupUuid: providerGroupName,
    // };
  };

  const formatRegistrationDate = (date: any) => {
    const inputDate = new Date(date);
    const year = inputDate.getUTCFullYear();
    const month = String(inputDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getUTCDate()).padStart(2, "0");
    const hours = String(inputDate.getUTCHours()).padStart(2, "0");
    const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(inputDate.getUTCSeconds()).padStart(2, "0");
    const iso8601DateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    return iso8601DateString;
  };

  const formattedDate = (date: any) => {
    const localTime = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      localTime
    );
    return `Ordered on ${formattedDate}`;
  };

  const handleTimeChange = (time: any) => {
    setTime(convertTime(new Date(time)));
  };

  const convertTime = (time: any) => {
    const inputDate = new Date(time);

    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();

    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    const formattedMinutes = String(minutes).padStart(2, "0");

    const formattedTimeString = `${formattedHours}:${formattedMinutes}${amPm}`;
    return formattedTimeString;
  };

  const submitForm = () => {
    const requestBody = {
      id: undefined,
      uuid: editData?.uuid || '',
      patient: {
        id: patientData.id,
        uuid: patientData.uuid,
      },
      patientImageOrder: {
        id: 1,
        uuid: '6440b270-7bbc-4ab3-af63-2e01e1bd31a0',
        patient:{
          uuid:''
        }
      },
      uploadOption: value,
      reviewer: reviewer,
      recordedDate: registrationDate,
      recordedTime: time,
      imageType: imagingType,
      testName: testName,
      interpretation: interpretation,
      file: undefined,
      note: note,
      archive: false,
    };
    if(editData?.uuid){
      editResult({requestBody:requestBody});
    }else{
      mutateAsync({ requestBody: requestBody });
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
        <DialogTitle sx={{ padding: "15px 15px 8px " }}>
          <Grid className={commonStyle.dialogTitle}>
            <Grid>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", color: "#1A1A1A" }}
              >
                {title}
              </Typography>
            </Grid>
            <Grid style={{ cursor: "pointer" }}>
              <CloseIcon onClick={() => onClose()} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={7.5}>
                  <Typography variant="h4" className={classes.label}>
                    Upload Option
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Associate result with existing lab order"
                        control={<Radio />}
                        label="Associate result with existing lab order"
                      />
                      <FormControlLabel
                        value="Upload result without lab order"
                        control={<Radio />}
                        label="Upload result without lab order"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {showLabOrder && (
                  <Grid item xs={4.5}>
                    <Typography variant="h4" className={classes.label}>
                      Lab Order
                    </Typography>
                    <Select
                      className={classes.selectInputStyle}
                      value={labOrder}
                      name="labOrder"
                      onChange={(e: any) => handleSelectOption(e, "labOrder")}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span>
                              <Typography
                                variant="h5"
                                sx={{ color: "#1A1A1A7F !important" }}
                              >
                                Select
                              </Typography>
                            </span>
                          );
                        }
                        return <Typography variant="h5">{selected}</Typography>;
                      }}
                      MenuProps={MenuProps}
                      displayEmpty
                    >
                      {labOrderOption?.map((data: any) => {
                        return (
                          <MenuItem
                            value={data.id}
                            className={classes.menuItemColorStyle}
                          >
                            {formattedDate(data.collectionDatetime)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" className={classes.label}>
                Reviewer
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={selectedreviewer}
                name="selectedreviewer"
                onChange={(e: any) => handleSelectOption(e, "Reviewer")}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{ color: "#1A1A1A7F !important" }}
                        >
                          Select
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {reviewerOption?.map((data: any) => {
                  return (
                    <MenuItem
                      value={data.id}
                      className={classes.menuItemColorStyle}
                    >
                      {data.firstName} {data.lastName}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" className={classes.label}>
                Recorded Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                    marginTop: "10px !important",
                  }}
                >
                  <DatePicker
                    onChange={(date) => handleDateChange(date)}
                    value={registrationDate}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" className={classes.label}>
                Recorded Time
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["TimePicker", "TimePicker"]}
                  sx={{ paddingTop: "10px !important" }}
                >
                  <TimePicker
                    ampm={false}
                    minutesStep={5}
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: {
                          '& .MuiTextField-root': {
                            minWidth: "174px !important",
                          },
                        },
                      },
                    }}
                    onChange={handleTimeChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.label}>
                Imaging Type
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={imagingType}
                name="imagingType"
                onChange={(e: any) => handleSelectOption(e, "imagingType")}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{ color: "#1A1A1A7F !important" }}
                        >
                          Select
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {imagingTypeOption?.map((data: any) => {
                  return (
                    <MenuItem
                      key={data}
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.label}>
                Test Name
              </Typography>
              <InputBase
                value={testName}
                name="testName"
                fullWidth
                placeholder="Enter Test Name"
                classes={{
                  root: classes.inputField,
                  input: classes.inputBoxText,
                  focused: classes.inputBoxActive,
                }}
                onChange={(e: any) => inputData(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4" className={classes.label}>
                Interpretation
              </Typography>
              <Select
                className={classes.selectInputStyle}
                value={selectedInterpretation}
                name="interpretation"
                onChange={(e: any) => handleSelectOption(e, "interpretation")}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span>
                        <Typography
                          variant="h5"
                          sx={{ color: "#1A1A1A7F !important" }}
                        >
                          Select
                        </Typography>
                      </span>
                    );
                  }
                  return <Typography variant="h5">{selected}</Typography>;
                }}
                MenuProps={MenuProps}
                displayEmpty
              >
                {interpretationOption?.map((data: any) => {
                  return (
                    <MenuItem
                      key={data}
                      value={data}
                      className={classes.menuItemColorStyle}
                    >
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sx={customImageContainer}>
              <DropzoneArea
                dropzoneText="Drag & Drop files Or Browse Files"
                showFileNames
                // showAlerts={false}
                maxFileSize={1048576} // 1 MB in bytes
                filesLimit={1}
                acceptedFiles={[".csv", "text/csv"]}
                onChange={(files: any) => UploadFile(files)}
                classes={{
                  root: uploadClasses.dropZone,
                  icon: uploadClasses.uploadIcon,
                  text: uploadClasses.textUploadZone,
                }}
              />
              <Grid item>
                <Typography
                  variant="h1"
                  sx={{
                    color: "#1A1A1A7F",
                    mt: 1,
                    fontSize: "10px !important",
                  }}
                >
                  Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                  PPT
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.label}>
                Note
              </Typography>
              <InputBase
                fullWidth
                rows="3"
                name="note"
                value={note}
                multiline={true}
                placeholder="Type here"
                classes={{
                  root: common.providerTextAreaField,
                  input: common.textFieldInput,
                  focused: common.textFieldActive,
                }}
                onChange={(e) => setNote(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonContainer} mt={2}>
              <ButtonBase
                sx={formButtonStyle.saveButtonStyle}
                type="submit"
                onClick={submitForm}
              >
                Save Image Result
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddEditResult;
