import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { formButtonStyle } from "../../../../../../src/styles/common";
import {
  useCommunicationControllerServiceCreateGroup,
  useCommunicationControllerServiceUpdateGroup,
  usePatientControllerServiceGetPatients,
  usePatientFlagsControllerServiceGetAllPatientFlags,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { commonWidget, formTitle } from "../../../../../styles/common";
import { multiSelectDropDown } from "../../patient/add-new-patient";
import { patientStyle } from "../../patient/style/commonStyle";
import { style } from "../../referral/style/common-style";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../../../../components/common/enums-and-interfaces/common-functions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomFormLabel from "../../../../../components/common/custom-form-label";

interface AddUserProps {
  source?: string;
  open: boolean;
  setOpen?: any;
  scroll?: string;
  title?: string;
  columns?: any;
  editData?: any;
  refetch: any;
  onClose: () => void;
}

const initialVal = {
  name: "",
  patientFlag: [],
  patient: [],
};

function AddGroupList(props: AddUserProps) {
  const { open, title, refetch, onClose, editData } = props;
  const commonStyle = style();
  const classes = commonWidget();
  const styles = patientStyle();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({ ...initialVal });
  const [patientFlags, setPatientFlags] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const { id } = useParams();
  let providerGroupUuid = id as string;
  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
  }
  const { data, isSuccess } =
    usePatientFlagsControllerServiceGetAllPatientFlags({
      providerGroupUuid,
      page: 0,
      size: 100,
    });

  const { mutateAsync, isSuccess: addGroup } =
    useCommunicationControllerServiceCreateGroup();

  const { mutateAsync: editGroup, isSuccess: isEditGroup } =
    useCommunicationControllerServiceUpdateGroup();

  const { data: patientData, isSuccess: getpatient } =
    usePatientControllerServiceGetPatients({ providerGroupUuid });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter group name")
    .matches(/^[a-zA-Z0-9\s]+$/, "Please enter valid group name"),
    patientFlag: Yup.array()
      // .min(1, "Patient flag is required.")
      .of(
        Yup.object().shape({
          uuid: Yup.string(),
        })
      ),
    patient: Yup.array()
      .min(1, "Patient is required.")
      .of(
        Yup.object().shape({
          uuid: Yup.string().required(),
        })
      ),
  });

  useEffect(() => {
    if (getpatient && !!patientData) {
      setPatientList(patientData?.data?.content);
    }
  }, [patientData, getpatient]);

  useEffect(() => {
    if (isSuccess && !!data) {
      setPatientFlags(data?.data?.content);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (addGroup || isEditGroup) {
      handleClose();
      refetch(true);
    }
  }, [addGroup, isEditGroup]);

  useEffect(() => {
    if (editData) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        name: editData?.data?.name || "",
        patientFlag: editData?.data?.flags || [],
        patient: editData?.data?.patients || [],
      }));
    }
  }, [editData]);

  const handleFormSubmit = (values: any) => {
    let payload: any = {
      uuid: editData?.data?.uuid || "",
      name: values.name,
      patients: values.patient,
      flags: values.patientFlag,
      providerGroupUuid: getLoggedInUser()?.providerGroup,
    };
    if (title == "Add Group") {
      try {
        mutateAsync({ requestBody: payload })
          .then((res: any) => {
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
    } else {
      try {
        editGroup({ requestBody: payload })
          .then((res: any) => {
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
    }
  };

  const handleClose = () => {
    onClose();
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
      {({ values, touched, errors, handleBlur, submitForm, setFieldValue }) => (
        <Form>
          <Dialog open={open} onClose={handleClose} sx={{ width: "100%" }}>
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
                  <CustomFormLabel label="Group Name" isRequired={true} />
                  <InputBase
                    type="text"
                    placeholder="Enter Group Name"
                    name="name"
                    onChange={(e) =>
                      // setInitialValues((prevValues) => ({
                      //   ...prevValues,
                      //   name: e.target.value,
                      // }))
                      setFieldValue("name", e.target.value)
                    }
                    error={!!touched.name && !!errors.name}
                    value={values.name}
                    onBlur={handleBlur}
                    style={{ width: "100%" }}
                    classes={{
                      root: classes.textFieldFullWidth,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                </Grid>
                {/* <Grid item xs={12}>
                  <CustomFormLabel
                    label="Select By Patient Flags"
                    // isRequired={true}
                  />
                  <Autocomplete
                    sx={{
                      ...multiSelectDropDown,
                      border:
                        touched.patientFlag && errors.patientFlag
                          ? "1px solid red"
                          : null,
                    }}
                    multiple
                    id="tags-standard"
                    options={patientFlags || []}
                    value={values.patientFlag}
                    getOptionLabel={(option: any) => option.name}
                    disableCloseOnSelect
                    onChange={(_, values) => {
                      // console.log("valuess",values)
                      setFieldValue("patientFlag", values);
                    }}
                    renderOption={(props, option: any) => (
                      <MenuItem
                        key={option.uuid}
                        value={option.uuid}
                        sx={{ justifyContent: "space-between" }}
                        {...props}
                      >
                        {option.name}
                      </MenuItem>
                    )}
                    onBlur={handleBlur}
                    renderInput={(params) => (
                      <TextField
                        classes={{ root: styles.customTextField }}
                        {...params}
                        variant="outlined"
                        placeholder={
                          values?.patientFlag?.length > 0
                            ? ""
                            : "Select Patient Flag"
                        }
                      />
                    )}
                  />
                  {touched.patientFlag && errors.patientFlag && (
                    <FormHelperText error>{errors.patientFlag}</FormHelperText>
                  )}
                </Grid> */}
                <Grid item xs={8}>
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
                    value={values.patient}
                    defaultValue={initialValues.patient}
                    getOptionLabel={(option: any) =>
                      `${option?.legalFirstName} ${option?.legalLastName}`
                    }
                    disableCloseOnSelect
                    onChange={(_, values) => {
                      setFieldValue("patient", values);
                    }}
                    renderOption={(props, option: any) => (
                      <MenuItem
                        key={option.uuid}
                        value={option.uuid}
                        sx={{ justifyContent: "space-between" }}
                        {...props}
                      >
                        {option?.legalFirstName} {option?.legalLastName}
                      </MenuItem>
                    )}
                    onBlur={handleBlur}
                    renderInput={(params) => (
                      <TextField
                        classes={{ root: styles.customTextField }}
                        {...params}
                        variant="outlined"
                        placeholder={
                          values?.patient?.length > 0 ? "" : "Select Patient"
                        }
                      />
                    )}
                  />
                  {touched.patient && errors.patient && (
                    <FormHelperText error>{errors.patient}</FormHelperText>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  mt={1}
                  sx={{ display: "flex", justifyContent: "end", gap: "20px" }}
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
                    {title == "Edit Group" ? "Save" : "Add"}
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
export default AddGroupList;
