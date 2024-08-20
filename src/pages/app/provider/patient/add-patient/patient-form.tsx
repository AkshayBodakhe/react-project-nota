import { Button, Grid, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
// import * as React from "react";
import { useState, useEffect } from "react";
import ProviderInformation from "./providerInformation";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PatientDetails from "./patient-details";
import ContactInfo from "./contact-info";
import EmergencyContact from "./emergency-contact";
import Insurance from "./insurance";
import Preferences from "./preferences";
import { patientStyle } from "../style/commonStyle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Privacy from "./privacy";
import { formButtonStyle } from "../../../../../styles/common";
import {
  ErrorResponseEntity,
  PaginationState,
} from "../../../../../components/common/enums-and-interfaces/interfaces";
import {
  useInsuranceControllerServiceGetInsurancePayer,
  useLocationControllerServiceGetAllLocations,
  usePatientControllerServiceAddPatient,
  usePatientControllerServiceArchivePatient,
  usePatientControllerServiceGetPatient,
  usePatientControllerServiceUpdatePatient,
  useProviderControllerServiceGetAllProviders,
  useProviderGroupControllerServiceGetAllCountries,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../../store/hooks";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import ConfirmationModal from "../../../../../components/core/confirmation-modal/confirmation-modal";
import { useSelector } from "react-redux";
import AppointmentInformation from "./appointmentInformation";
import { CHECK_IN_TITLE } from "../../appointment/calendar/appointmentWithLocations";
import PatientConsent from "./patient-balance";
import PatientBalance from "./patient-balance";
import { Patient } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
export interface FormInputs {
  control?: string;
  name: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  value: any;
  xs: number;
  options?: any[];
  handleChange?: any;
  dateFormat?: string;
  mapName?: string;
  mapLastName?: string;
  errorMsg?: string;
  isError?: boolean;
  data?: any[];
  mapBy?: string;
  isDisabled?: boolean;
  format?: string;
}

const css = {
  cancelBtn: {
    background: "#CCECFF80 0% 0% no-repeat padding-box",
    border: "1px solid #1B5984",
    borderRadius: "5px",
    color: "#2C57B3",
    opacity: 1,
    textTransform: "none",
    fontSize: "14px",
  },
  saveAndNext: {
    ...formButtonStyle.mainButtonStyle,
    color: "white",
    background: "#2C57B3 !important",
  },
};

function PatientForm() {
  const classes = patientStyle();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [locationList, setLocationList] = useState<any[]>([]);
  const [providerList, setProviderList] = useState<any[]>([]);
  const [insurancePayerList, setInsurancePayerList] = useState<any[]>([]);
  const providerInfo = useSelector(
    (state: any) => state.commonReducer.userDetail?.data
  );
  const providerGroupUuid = providerInfo?.providerGroup || "";
  const [patientInfo, setPatientInfo] = useState<any>();
  const dispatch = useAppDispatch();
  const [pagination] = useState<PaginationState>({
    page: 0,
    size: 100,
    searchString: "",
    sortBy: "created",
    sortDirection: "desc",
    totalPages: 0,
    totalElements: 0,
  });

  const getParam = useLocation();
  const titleInfo = getParam.state.titleData;
  const apptDetails = getParam.state.appointmentDetails;
  const patientData = getParam.state.patientDetails;
  const isPatientProfile = getParam.state.editProfile === "Patient Profile";
  const row = getParam.state.patientData;

  const { mutateAsync, isError, error } = patientData?.uuid
    ? usePatientControllerServiceUpdatePatient()
    : usePatientControllerServiceAddPatient();
  const [value, setValue] = useState<number>(0);
  const [closeModal, setCloseModal] = useState(false);

  const {
    data: locationData,
    isLoading: isLocationDataLoading,
    isError: isLocationError,
  } = useLocationControllerServiceGetAllLocations({
    providerGroupUuid: providerInfo?.providerGroup,
    page: pagination.page,
    size: pagination.size,
  });

  const {
    data: providerData,
    isLoading: isProviderListLoading,
    isError: isProviderError,
  } = useProviderControllerServiceGetAllProviders({
    providerGroupUuid: providerGroupUuid,
    ...pagination,
  });

  const {
    data: insurancePayerData,
    isLoading: isInsurancePayerLoading,
    isError: isInsurancePayerError,
  } = useInsuranceControllerServiceGetInsurancePayer({ page: 0, size: 20 });

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const [initialValues, setInitialValues] = useState({
    uuid: apptDetails ? apptDetails?.patientUuid : "",
    provider: "",
    location: "",
    registrationDate: "",
    legalFirstName: "",
    middleName: "",
    legalLastName: "",
    birthDate: "",
    gender: "",
    maritalStatus: null,
    timezone: null,
    languages: [],
    ssn: null,
    race: null,
    ethnicity: null,
    contactNumber: "",
    homeNumber: "",
    email: "",
    faxNumber: "",
    avatar: "",
    newAvatar: "",
    address:
      {
        line1: "" || undefined,
        line2: "" || undefined,
        city: "" || undefined,
        state: "" || undefined,
        street: "" || undefined,
        country: "" || undefined,
        zipcode: "" || undefined,
      } || null,
    emergContactRelation: null,
    emergContactFirstName: "",
    emergContactLastName: "",
    emergContactNumber: "",
    emergContactEmail: "",
    insurance: {
      insuranceType: "",
      groupName: "",
      memberId: "",
      groupId: "",
      insurancePayer: null,
      planName: "",
      planType: "",
      relationshipWithPolicyHolder: "SELF",
      expiryDate: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      active: true,
    },
    preferredPharmacy: null,
    preferredLab: null,
    preferredRadiology: null,
    emailConsent: true,
    callConsent: true,
    messageConsent: true,
    active: true,
    outstandingBalance: "",
    copayAmount: "",
  } as any);

  useEffect(() => {
    if (patientData) {
      patchData(patientData);
      setPatientInfo(patientData);
      setInitialValues(patientData);
    }
  }, [patientData]);

  const patchData = (editData: any) => {
    Object.keys(editData).map((res) => {
      formik.setFieldValue(res, editData[res]);
    });
  };

  const validations = Yup.object().shape({
    // appointmentDateAndTime: Yup.string(),
    locationsData: Yup.string(),
    appointmentType: Yup.string(),
    renderingProvider: Yup.string(),
    provider: Yup.object().required("Please select the provider"),
    location: Yup.object().required("Please select the location"),
    // registrationDate: Yup.string().required('Registration Date Required'),
    legalFirstName: Yup.string()
      .required("Please enter the first name")
      .matches(/^[A-Za-z ]+$/, "Please enter the valid first name"),
    // middleName: Yup.string().required('Middle Name Required').matches(/^[A-Za-z]+$/, "Name should contain only characters"),
    legalLastName: Yup.string()
      .required("Please enter the last name")
      .matches(/^[A-Za-z ]+$/, "Please enter the valid last name"),
    birthDate: Yup.string()
      .required("Please enter the date of birth")
      .test(
        "notFutureDate",
        "Please enter the valid date of birth",
        function (value) {
          //console.log(Date.parse(value) <= Date.now())
          return Date.parse(value) <= Date.now();
        }
      ),
    gender: Yup.string().required("Please select the gender"),
    contactNumber: Yup.string()
      .required("Please enter the Contact number")
      .matches(/^\d+$/, "Please enter the valid contact number")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits"),
    email: Yup.string()
      .email("Please enter the valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter the valid email"
      )
      .required("Please enter the email"),
    // faxNumber: Yup.string()
    //   .max(10, "Fax Number should not exceed 10 digits")
    //   .matches(/^[0-9]+$/, "Fax Number should contain only digits")
    //   .required("Fax Number Required"),
    address: Yup.object().shape({
      line1: Yup.string()
        .required("Please enter the address")
        .matches(/^[a-zA-Z0-9\s,/]*$/, "Please enter the valid address"),
      city: Yup.string()
        .required("Please enter the valid city name")
        .matches(/^[A-Za-z\s]+$/, "Please enter the valid city name"),
      state: Yup.string()
        .required("Please enter the state name")
        .matches(/^[A-Za-z\s]+$/, "Please enter the valid state name"),
      country: Yup.string()
        .required("Please enter the country name")
        .matches(/^[A-Za-z\s]+$/, "Please enter the valid country name"),
      // zipcode: Yup.string().required("Please enter the zip code")
      //   .matches(/^[0-9]+$/, "Please enter the valid zip code"),
    }),
    emergContactRelation: Yup.string()
      .trim()
      .min(2, "First Name Required")
      .required("Please select Emergerency Contact Relation"),
    emergContactFirstName: Yup.string()
      .trim()
      .min(2, "First Name must be at least 2 characters long")
      .required("Please enter first name")
      .matches(/^[A-Za-z]+$/, "Please enter the valid first name"),
    emergContactLastName: Yup.string()
      .trim()
      .min(2, "Last Name must be at least 2 characters long")
      .required("Please enter last name")
      .matches(/^[A-Za-z]+$/, "Please enter the valid last name"),
    insurance: Yup.object().shape({
      // insuranceType: Yup.string().required("Insurance Type Required"),
      // groupName: Yup.string().required("Group Name Required"),
      // insurancePayer: Yup.object().required("Insurance Payer Required"),
      // memberId: Yup.string().required("Member Id Required"),
      // planName: Yup.string().required("Plan Name Required"),
      // planType: Yup.string().required("Plan Type Required"),
      // groupId: Yup.string().required("Group ID Required"),
      expiryDate: Yup.string().test(
        "notPastDate",
        "Please enter the valid expiry date",
        function (value: any) {
          if (!value || value === "Invalid date") return true;
          return Date.parse(value) >= Date.now();
        }
      ),
      relationshipWithPolicyHolder: Yup.string(),
      firstName: Yup.string()
        .when("relationshipWithPolicyHolder", (val: any, schema: any) => {
          return val[0] === "SELF"
            ? schema.notRequired()
            : schema.required("Please enter the first name");
        })
        .trim()
        .min(2, "First Name must be at least 2 characters long"),
      lastName: Yup.string()
        .when("relationshipWithPolicyHolder", (val: any, schema: any) => {
          return val[0] === "SELF"
            ? schema.notRequired()
            : schema.required("Please enter the Last name");
        })
        .trim()
        .min(2, "Last Name must be at least 2 characters long"),
      dob: Yup.string().when(
        "relationshipWithPolicyHolder",
        (val: any, schema: any) => {
          return val[0] === "SELF"
            ? schema.notRequired()
            : schema
                .required("Please enter the date of birth")
                .test(
                  "notFutureDate",
                  "Please enter the valid date of birth",
                  function (value: any) {
                    return Date.parse(value) <= Date.now();
                  }
                );
        }
      ),
      gender: Yup.string().when(
        "relationshipWithPolicyHolder",
        (val: any, schema: any) => {
          return val[0] === "SELF"
            ? schema.notRequired()
            : schema.required("Please select the gender");
        }
      ),
      line1: Yup.string().when(
        "relationshipWithPolicyHolder",
        (val: any, schema: any) => {
          return val[0] === "SELF"
            ? schema.notRequired()
            : schema.required("Please enter the address");
        }
      ),
      city: Yup.string().when(
        "relationshipWithPolicyHolder",
        (val: any, schema: any) => {
          return val[0] === "SELF"
            ? schema.notRequired()
            : schema.required("Please enter the city name");
        }
      ),
      state: Yup.string().when(
        "relationshipWithPolicyHolder",
        (val: any, schema: any) => {
          return val[0] === "SELF"
            ? schema.notRequired()
            : schema.required("Please enter the state name");
        }
      ),
      country: Yup.string().when(
        "relationshipWithPolicyHolder",
        (val: any, schema: any) => {
          return val[0] === "SELF"
            ? schema.notRequired()
            : schema.required("Please enter the country name");
        }
      ),
      // zipcode: Yup.string().when(
      //   "relationshipWithPolicyHolder",
      //   (val: any, schema: any) => {
      //     return val[0] === "SELF"
      //       ? schema.notRequired()
      //       : schema.required("Zip Code Required");
      //   }
      // ),
    }),
    emergContactNumber: Yup.string()
      .matches(/^\d+$/, "Please enter the valid contact number")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits")
      .required("Please enter contact number"),
    emergContactEmail: Yup.string()
      .email("Please enter valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter valid email"
      )
      .required("Please enter the email"),
    outstandingBalance: Yup.string(),
    copayAmount: Yup.string(),
  });

  const tabData = [
    "Provider Information",
    "Patient Details",
    "Contact Information",
    "Emergency Contact",
    "Insurance",
    "Preferences",
    // "Privacy Consent",
  ];

  const tabLable = [
    "Appointment Information",
    "Patient Details",
    "Contact Information",
    "Emergency Contact",
    "Preferences",
    // "Privacy Consent",
    // "Patient Balance",
  ];

  const { mutateAsync: patientUpdateWhileEncounter } =
    usePatientControllerServiceUpdatePatient();

  useEffect(() => {
    if (!isLocationError && locationData?.data) {
      setLocationList(locationData.data.content);
    }
  }, [isLocationDataLoading]);

  useEffect(() => {
    if (!isProviderError && providerData?.data) {
      setProviderList(providerData.data.content);
    }
  }, [isProviderListLoading]);

  useEffect(() => {
    if (!isInsurancePayerError && insurancePayerData?.data) {
      setInsurancePayerList(insurancePayerData.data.content);
    }
  }, [isInsurancePayerLoading]);

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body?.message) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message:
            (error as ErrorResponseEntity)?.body?.message || "Error Occured",
          severity: "error",
        })
      );
    }
  }, [isError]);

  useEffect(() => {
    if (isValid) {
      if (!isLastStep()) {
        const newCompleted = completed;
        newCompleted[value] = true;
        setCompleted(newCompleted);
        handleNext();
      } else if (isLastStep() && allStepsCompleted()) {
        const currDate = new Date();
        const {
          insurance,
          preferredPharmacy,
          preferredLab,
          preferredRadiology,
          appointmentDateAndTime,
          ...newPayload
        } = formik.values;
        // const testing = removeFields(insurance);
        const payload = {
          ...newPayload,
          // insurances: [removeFields(insurance)],
          insurances:
            removeFields(insurance) === null
              ? [insurance]
              : removeFields(insurance) === null
              ? removeFields(insurance)
              : [removeFields(insurance)],
          providerGroup: providerGroupUuid,
          registrationDate: currDate,
        };
        if (payload?.insurances?.[0]?.insuranceType === "") {
          payload.insurances = null;
        }
        payload.preferredPharmacy = { uuid: preferredPharmacy?.uuid || null };
        payload.preferredLab = { uuid: preferredLab?.uuid || null };
        payload.preferredRadiology = { uuid: preferredRadiology?.uuid || null };
        payload.appointmentDateAndTime = "";
        // payload. = "" as any;
        if (payload?.provider === null) payload.provider = {};
        if (payload?.location === null) payload.location = {};
        setIsValid(false);
        setIsSubmiting(false);
        titleInfo === "Check In"
          ? patientUpdateWhileEncounter({ requestBody: payload }).then(
              (res: any) => {
                navigate("/provider/appointment/calendar");
                dispatch(
                  alertAction.setAlert({
                    open: true,
                    message: res.message,
                    severity: "success",
                  })
                );
              }
            )
          : mutateAsync({ requestBody: payload }).then((res: any) => {
              isPatientProfile
                ? navigate("/provider/patient-details", { state: { row } })
                : navigate("/provider/patients");
              dispatch(
                alertAction.setAlert({
                  open: true,
                  message: res.message,
                  severity: "success",
                })
              );
            });
      } else handleNext();
    }
  }, [isValid]);

  const renderTab = (index: any, label: any) => (
    <Tab
      key={index}
      label={
        <div>
          <span className="tabNumber">{index + 1}</span>
          {label}
        </div>
      }
      value={String(index)}
      sx={{
        textTransform: "capitalize",
        fontWeight: 600,
        "& .tabNumber": {
          marginRight: "10px",
          background: "#1A1A1A0D",
          padding: "5px 10px",
          borderRadius: "25px",
          textAlign: "center",
        },
      }}
    />
  );

  const handleSubmit = (_values: any) => {};

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - 1;
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validations,
    onSubmit: handleSubmit,
  });

  const totalSteps = () => {
    if (titleInfo === "Check In") return tabLable.length;
    return tabData.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return value === totalSteps() - 1;
  };

  const handleNext = () => {
    let newActiveStep: number = !allStepsCompleted()
      ? tabData.findIndex((_step, i) => !(i in completed))
      : value + 1;
    setIsSubmiting(false);
    setIsValid(false);
    setValue(newActiveStep);
  };

  const handleBack = () => {
    setValue((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = (isTrue: boolean) => {
    if (isTrue) navigate("/provider/patients");
    else setCloseModal(false);
  };

  const handleComplete = () => {
    // console.log("values", formik.values);
    setIsSubmiting(true);
  };

  function removeFields(obj: any) {
    try {
      if (!obj) return null;
      const {
        firstName,
        lastName,
        dob,
        gender,
        line1,
        line2,
        city,
        state,
        country,
        zipcode,
        ...newObject
      } = obj;
      const insurancePolicyHolder = {
        insurancePolicyHolder: {
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          gender: gender,
          address: {
            line1: line1,
            line2: line2,
            city: city,
            state: state,
            country: country,
          },
        },
      };
      return obj.relationshipWithPolicyHolder === "SELF"
        ? null
        : { ...newObject, ...insurancePolicyHolder };
    } catch (error) {
      console.error("Error in removeFields:", error);
      return null;
    }
  }

  return (
    <Grid container sx={{ background: "white", padding: "1%" }}>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <ArrowBackOutlinedIcon
          sx={{ fontSize: "20px" }}
          onClick={() => setCloseModal(true)}
        />
        &nbsp;&nbsp;
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {titleInfo}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={2.5}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value.toString()}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                aria-label="lab API tabs example"
                sx={{
                  "& .MuiTabs-flexContainer": {
                    justifyContent: "space-between",
                  },
                }}
              >
                {titleInfo === CHECK_IN_TITLE
                  ? tabLable.map((label, index) => renderTab(index, label))
                  : tabData.map((label, index) => renderTab(index, label))}
                {/* {tabLable.map((label, index) => renderTab(index, label))} */}
              </TabList>
            </Box>
          </TabContext>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.mainFromContainer}>
        {(() => {
          switch (value) {
            case 0:
              return titleInfo === "Check In" ? (
                <AppointmentInformation
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                  apptDetails={apptDetails}
                />
              ) : (
                <ProviderInformation
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                  locationList={locationList}
                  providerList={providerList}
                />
              );
            case 1:
              return (
                <PatientDetails
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              );
            case 2:
              return (
                <ContactInfo
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              );
            case 3:
              return (
                <EmergencyContact
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              );
            case 4:
              return titleInfo === "Check In" ? (
                <Preferences
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              ) : (
                <Insurance
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  insurancePayerList={insurancePayerList}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              );
            case 5:
              return titleInfo === "Check In" ? (
                <Privacy
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              ) : (
                <Preferences
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              );
            case 6:
              return titleInfo === "Check In" ? (
                <PatientBalance
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              ) : (
                <Privacy
                  formik={formik}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  setIsValid={setIsValid}
                  setIsSubmitting={setIsSubmiting}
                />
              );
            default:
              return <></>;
          }
        })()}
      </Grid>
      <Grid
        container
        mt={2}
        sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
      >
        <Button sx={css.cancelBtn} onClick={handleBack} disabled={value === 0}>
          Back
        </Button>
        <Box sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
          <Button sx={css.cancelBtn} onClick={() => setCloseModal(true)}>
            Cancel
          </Button>
          <Button type="submit" sx={css.saveAndNext} onClick={handleComplete}>
            {allStepsCompleted() ? "Save & Finish" : "Save & Next"}
          </Button>
        </Box>
      </Grid>
      {closeModal && (
        <ConfirmationModal
          open={closeModal}
          handleClose={handleClose}
          message="Do you want to leave without saving your changes?"
        />
      )}
    </Grid>
  );
}

export default PatientForm;
