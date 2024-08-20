import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { formButtonStyle } from "../../../../../../src/styles/common";
import {
  useCommunicationControllerServiceGetGroups,
  useCommunicationControllerServiceSendGroupMessage,
  usePatientControllerServiceGetPatients,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  CommunicationControllerService,
  OutgoingMessagesRequest,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { commonWidget, formTitle } from "../../../../../styles/common";
import { test } from "../../../admin/new-master/drug-catalog/add-drug-catalog2";
import { multiSelectDropDown } from "../../patient/add-new-patient";
import { patientStyle } from "../../patient/style/commonStyle";
import { style } from "../../referral/style/common-style";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "../../../../../components/common/enums-and-interfaces/common-functions";
import { useParams } from "react-router-dom";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
interface AddUserProps {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  editData?: any;
  refetch?:any;
}

const initialVal = {
  groupList: "",
  patient: [],
  subject: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  groupList: Yup.object().required("Please select the group"),
  patient: Yup.array()
    .min(1, "Please select the patient flag")
    .of(
      Yup.object().shape({
        uuid: Yup.string().required(),
      })
    ),
  subject: Yup.string().required("Please enter the subject").matches(/^[a-zA-Z0-9\s]*$/, "Please enter the valid subject"),
  description: Yup.string().required("Please enter the description"),
});

function AddGroupMessages(props: AddUserProps) {
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
  const { id } = useParams();
  const commonStyle = style();
  const styles = patientStyle();
  const { open, setOpen, title ,refetch} = props;
  const [initialValues] = useState({ ...initialVal });
  const [groupList, setGroupList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [groupUUID, setGroupUUID] = useState("");
  const [patientUUID, setPatientUUID] = useState("");
  const classes = commonWidget();
  const [selectedValue, setSelectedValue] = useState("include");
  const providerDetail = useSelector((state:any) => state.commonReducer?.userDetail?.data)
  const providerGroupUuid = providerDetail?.providerGroup
  const { data, isSuccess } = useCommunicationControllerServiceGetGroups({
    providerGroupUuid,
      page: 0,
      size: 100,
  }); 

  const {
    data: patientData,
    isSuccess: getpatient,
  } = usePatientControllerServiceGetPatients({providerGroupUuid});

  const dispatch = useDispatch();

  const { mutateAsync, isSuccess: sendMessage } =
    useCommunicationControllerServiceSendGroupMessage();

  useEffect(() => {
    if (!!data && isSuccess) {
      setGroupList(data?.data?.content);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (sendMessage) {      
      handleClose();
      refetch();
    }
  }, [sendMessage]);

  useEffect(() => {
    if (getpatient && !!patientData) {
      setPatientList(patientData?.data?.content);
    }
  }, [getpatient, patientData]);

  const handleFormSubmit = (values: any) => {
    const payload: any = {
      communicationGroups: {
        uuid: groupUUID,
      },
      includeExcludeType:
        selectedValue == "include"
          ? OutgoingMessagesRequest.includeExcludeType.INCLUDE
          : OutgoingMessagesRequest.includeExcludeType.EXCLUDE,
      patientsUuid: patientUUID,
      description: values.description,
      subject: values.subject,
      providerGroupUuid: id || getLoggedInUser()?.providerGroup
    };
    try {
      mutateAsync({ requestBody: payload })
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

  const handleClose = () => {
    setOpen(false);
  };

  const getPatient = async (event: any) => {
    setSelectedValue(event.target.value);
    if (event.target.value == "include") {
     
    } else {
      const patients = await CommunicationControllerService.getGroupPatients(
        groupUUID,
          0,
         100,
      );
      setPatientList(patients?.data?.content);
    }
  };

  const getGroupId = (e: any) => {
    const data = e.target.value;
    setGroupUUID(data?.uuid);
  };

  const selectPatient = (selectedValues: any) => {
    const patientUuids = selectedValues.map((option: any) => option.uuid);
    setPatientUUID(patientUuids);
  };

  return (
    <Formik
      onSubmit={(values) => {
        handleFormSubmit(values);
      }}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, errors, handleBlur, touched, submitForm, setFieldValue }) => (
        <Form>
          <Dialog open={open} onClose={handleClose} sx={test}>
            <DialogTitle id="scroll-dialog-title" sx={{ marginBottom: "15px" }}>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid item>
                  <Typography sx={formTitle}>{title}</Typography>
                </Grid>
                <Grid item>
                  <ButtonBase onClick={handleClose}>
                    <CloseIcon />
                  </ButtonBase>
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <CustomFormLabel label="Select group" isRequired={true} />
                  <Select
                    className={[
                      commonStyle.selectInputStyle,
                      errors.groupList ? classes.inputBoxError : "",
                    ].join(" ")}
                    value={values.groupList}
                    name="groupList"
                    onChange={(e: any) => {setFieldValue("groupList", e.target.value),getGroupId(e)}}
                    renderValue={(selected:any) => {
                      if (!selected) {
                        return (
                          <span>
                            <Typography
                              variant="h5"
                              sx={{
                                color: "#1A1A1A80 !important",
                              }}
                            >
                              Select Type
                            </Typography>
                          </span>
                        );
                      }
                      return <Typography variant="h5">{selected?.name}</Typography>;
                    }}
                    MenuProps={MenuProps}
                    displayEmpty
                  >
                    {groupList?.map((data: any) => {
                      return (
                        <MenuItem
                          value={data}
                          className={commonStyle.menuItemColorStyle}
                        >
                          {data.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {touched.groupList && errors.groupList && (
                    <FormHelperText error>{errors.groupList}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={6}>
                <CustomFormLabel label="Add Patient" isRequired={true} />
                  <Autocomplete
                    sx={{
                      ...multiSelectDropDown,
                      border:
                        touched.patient && errors.patient
                          ? "1px solid red"
                          : null,
                    }}
                    multiple
                    limitTags={2}
                    id="tags-standard"
                    options={patientList || []}
                    getOptionLabel={(option: any) =>
                      `${option?.legalFirstName} ${option?.legalLastName}` || ""
                    }
                    disableCloseOnSelect
                    onChange={(_, values) => {
                      setFieldValue("patient", values);
                      selectPatient(values);
                    }}
                    renderOption={(props, option) => (
                      <MenuItem
                        key={option.uuid}
                        value={option.uuid}
                        sx={{ justifyContent: "space-between" }}
                        {...props}
                      >
                        {option?.legalFirstName} {option?.legalLastName}
                      </MenuItem>
                    )}
                    renderInput={(params) => (
                      <TextField
                        classes={{ root: styles.customTextField }}
                        {...params}
                        variant="outlined"
                        placeholder={patientUUID.length>0?"":"Select Patient"}
                        inputProps={{ ...params.inputProps, style: { lineHeight: "unset" } }}
                      />
                    )}
                  />
                  {touched.patient && errors.patient && (
                    <FormHelperText error>{errors.patient}</FormHelperText>
                  )}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", alignItems: "center" }}
                  mt={2}
                >
                  <RadioGroup
                    row
                    aria-label="selection"
                    name="selection"
                    value={selectedValue}
                    onChange={getPatient}
                  >
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", alignItems: "center" }}
                      mt={1.5}
                    >
                      <FormControlLabel
                        value="include"
                        control={<Radio />}
                        label="Include"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 22,
                          },
                        }}
                      />
                      <FormControlLabel
                        value="exclude"
                        control={<Radio />}
                        label="Exclude"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 22,
                          },
                        }}
                      />
                    </Grid>
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                <CustomFormLabel label="Subject" isRequired={true} />
                  <InputBase
                    type="text"
                    placeholder="Type Here"
                    name="subject"
                    onChange={(e) =>
                      setFieldValue("subject", e.target.value)
                    }
                    error={!!touched.subject && !!errors.subject}
                    value={values.subject}
                    onBlur={handleBlur}
                    style={{ width: "100%" }}
                    classes={{
                      root: classes.textFieldFullWidth,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                  {touched.subject && errors.subject && (
                    <FormHelperText error>{errors.subject}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                <CustomFormLabel label="Description" isRequired={true} />
                  <InputBase
                    fullWidth
                    multiline={true}
                    rows="8"
                    name="description"
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    error={!!touched.description && !!errors.description}
                    onBlur={handleBlur}
                    placeholder="Type here"
                    classes={{
                      root: classes.providerTextAreaField,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error>{errors.description}</FormHelperText>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "end",gap:"20px"}}
                >
                   <ButtonBase
                      onClick={handleClose}
                      sx={formButtonStyle.cancelButtonStyle}
                    >
                      Cancel
                    </ButtonBase>
                  <ButtonBase
                    sx={{ ...formButtonStyle.saveButtonStyle, height: "37px" }}
                    onClick={submitForm}
                  >
                    Add
                  </ButtonBase>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
}
export default AddGroupMessages;
