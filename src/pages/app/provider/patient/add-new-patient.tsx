import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  Autocomplete,
  Box,
  ButtonBase,
  Checkbox,
  Grid,
  InputBase,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik } from "formik";
import { DropzoneArea } from "material-ui-dropzone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
import ImageSelector from "../../../../components/common/image-upload";
import { adminConstants } from "../../../../constants/admin";
import {
  useDiagnosticCentresControllerServiceListDiagnosticCenter,
  useInsuranceControllerServiceGetInsurancePayer,
  useLocationControllerServiceGetAllLocations,
  usePatientControllerServiceAddPatient,
  usePharmacyControllerServiceGetPharmacyForProviderGroup,
  useProviderControllerServiceGetAllProviders,
} from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { backIcon, backToText } from "../../../../styles/auth-form";
import {
  customImageContainer,
  formButtonStyle,
} from "../../../../styles/common";
import AddPreferences from "./add-preferences";
import { patientStyle } from "./style/commonStyle";
import {
  Insurance,
  Patient,
  Provider,
} from "../../../../sdk/thinkemr-core-0.0.1/requests";
import { useSelector } from "react-redux";

export const multiSelectDropDown = {
  borderRadius: "5px",
  // background: "#ffffff",
  // marginTop: "10px",
  border: "none",
  "& fieldset": { border: "none" },
  ".MuiOutlinedInput-notchedOutline": { border: "none" },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  // "input" :{
  //   height: "42px !important",
  // },
  ".MuiOutlinedInput-root": {
    padding: "0px !important",
    height: "42px !important",
  },
  ".MuiChip-root": {
    height: "28px !important",
  },
};

const initialVal = {
  provider: "",
  primaryLocation: "",
  registrationDate: null,
  legalLastName: "",
  legalFirstName: "",
  firstNameUsed: "",
  middleName: "",
  dateofbirth: null,
  gender: "",
  maritalStatus: "",
  ssn: "",
  language: "",
  ethnicity: "",
  race: "",
  addressLine: "",
  city: "",
  zipcode: "",
  state: "",
  country: "",
  contactNumber: "",
  email: "",
  faxNumber: "",
  relationshipWithPatient: "",
  lastName: "",
  firstName: "",
  emergcontactNumber: "",
  emergencyEmail: "",
  insurance: [
    {
      insuranceType: "",
      insurancePayer: { id: null, payerId: "", payerName: "" },
      planId: "",
      groupId: "",
      groupName: "",
      memberId: "",
      payerContactNumber: "",
      payerFaxNumber: "",
      relationshipWithPolicyHolder: "",
      copay: "",
      policyHolderfirstName: "",
      policyHolderlastName: "",
      PolicyHolderdateofbirth: null,
      policyHolderAddressLine: "",
      policyHolderCity: "",
      policyHoldersZipcode: "",
      policyHoldersCountry: "",
      policyHoldersState: "",
    },
  ],
  privacyCheckboxes: [] as string[],
};

function AddNewPatient() {
  const classes = patientStyle();
  const navigate = useNavigate();
  const [initialValues, setInitailValues] = useState({ ...initialVal });
  const [addPreferenceTitle, setPreferenceTitle] = useState("");
  const [openPreferenceModal, setOpenPreferenceModal] = useState(false);
  // const validationSchema = Yup.object().shape({
  //   provider: Yup.string().required("Provider is required"),
  //   primaryLocation: Yup.string().required("Primary Location is required"),
  //   registrationDate: Yup.date()
  //     .nullable()
  //     .required("Registration Date is required"),
  //   legalLastName: Yup.string().required("Legal Last Name is required"),
  //   legalFirstName: Yup.string().required("Legal First Name is required"),
  //   firstNameUsed: Yup.string(),
  //   middleName: Yup.string(),
  //   dateofbirth: Yup.date().nullable().required("Date of Birth is required"),
  //   gender: Yup.string().required("Gender is required"),
  //   maritalStatus: Yup.string().required("Marital Status is required"),
  //   ssn: Yup.string(),
  //   language: Yup.string(),
  //   ethnicity: Yup.string(),
  //   race: Yup.string(),
  //   addressLine: Yup.string(),
  //   city: Yup.string(),
  //   zipcode: Yup.string(),
  //   state: Yup.string(),
  //   country: Yup.string(),
  //   contactNumber: Yup.string().required("Contact Number is required"),
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   faxNumber: Yup.string(),
  //   relationshipWithPatient: Yup.string(),
  //   lastName: Yup.string(),
  //   firstName: Yup.string(),
  //   insuranceType: Yup.string(),
  //   insurancePayer: Yup.string(),
  //   emergcontactNumber: Yup.string(),
  //   emergencyEmail: Yup.string().email("Invalid email address"),
  //   memberId: Yup.string(),
  //   planId: Yup.string(),
  //   groupId: Yup.string(),
  //   groupName: Yup.string(),
  //   copay: Yup.string(),
  //   payerContactNumber: Yup.string(),
  //   payerFaxNumber: Yup.string(),
  //   relationshipWithPolicyHolder: Yup.string(),
  // });

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

  const { ADD, CANCEL } = adminConstants;
  const [languageOptions, setLanguageOptions] = useState<string[] | null>(null);
  const [raceOptions, setRaceOptions] = useState<string[] | null>(null);
  const [ethnicityOptions, setEthinicityOptions] = useState<string[] | null>(
    null
  );
  const [maritalStatusOptions, setMaritalStatusOptions] = useState<
    string[] | null
  >(null);
  const [genderOptions, setGenderOptions] = useState<string[] | null>(null);
  const [relationshipWithPatientOptions, setRelationshipWithPatientOptions] =
    useState<string[] | null>(null);
  const [insuranceTypeOptions, setInsuranceTypeOptions] = useState<
    string[] | null
  >(null);
  const [insurancePayerOptions, setInsurancePayerOptions] = useState<
    string[] | null
  >(null);
  const [relationshipWithPolicyHolderOptions, setRelationWithPolicyHolder] =
    useState<string[] | null>(null);
  const [providerOptions, setProviderOptions] = useState<any>(null);
  const [locationOptions, setLocationOptions] = useState<any>(null);
  const [insuranceSections, setInsuranceSections] = useState([
    { id: 1, title: "Primary Insurance" },
  ]);
  const [showSecondaryIns, setShowSecondaryIns] = useState(true);
  const [pharmacyOptions, setPharmacyOptions] = useState<any>(null);
  const [labOptions, setLabOptions] = useState<any>(null);
  const [radiologyOptions, setRadiologyOptions] = useState<any>(null);
  const [pharmacyStore, setPharmacyStore] = useState<any>("");
  const [labStore, setLabStore] = useState<any>("");
  const [radiologyStore, setRadiologyStore] = useState<any>("");
  const [showPolicyHolder, setShowPolicyHolder] = useState(false);
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup || "";
  useEffect(() => {
    // const languageValues = Object.values(Patient.language) as string[];
    setLanguageOptions(null);
    const raceValues = Object.values(Patient.race) as string[];
    setRaceOptions(raceValues);
    const ethinicityValues = Object.values(Patient.ethnicity) as string[];
    setEthinicityOptions(ethinicityValues);
    const maritalValues = Object.values(Patient.maritalStatus) as string[];
    setMaritalStatusOptions(maritalValues);
    const genderValues = Object.values(Patient.gender) as string[];
    setGenderOptions(genderValues);
    const relationWithPatientValues = Object.values(
      Patient.emergContactRelation
    ) as string[];
    setRelationshipWithPatientOptions(relationWithPatientValues);
    const insuranceTypeValues = Object.values(
      Insurance.insuranceType
    ) as string[];
    setInsuranceTypeOptions(insuranceTypeValues);
    // const insurancePayerValues = Object.values(Insurance.) as string[];
    // setInsurancePayerOptions(insurancePayerValues);
    const insuranceRelationHolderValues = Object.values(
      Insurance?.relationshipWithPolicyHolder
    ) as string[];
    setRelationWithPolicyHolder(insuranceRelationHolderValues);
  }, []);

  const Pageable = {
    page: 0,
    size: 100,
  };

  const { data, isSuccess } = useProviderControllerServiceGetAllProviders({
    providerGroupUuid,
    searchBy: "",
    sourceId: undefined,
    ...Pageable,
  });

  const { data: getLocationsData, isSuccess: getLocations } =
    useLocationControllerServiceGetAllLocations({
      providerGroupUuid,
    });

  const { mutateAsync, isSuccess: AddedPatient } =
    usePatientControllerServiceAddPatient();

  const {
    data: getPharmacyData,
    isSuccess: getPharmacy,
    refetch: reCallGetPharmacy,
  } = usePharmacyControllerServiceGetPharmacyForProviderGroup({
    providerGroupUuid,
    page: 0,
    size: 10,
  });

  const {
    data: getPreferredData,
    isSuccess: getRadiologySuccess,
    refetch: callGetRadiology,
  } = useDiagnosticCentresControllerServiceListDiagnosticCenter({
    providerGroupUuid,
    type: "RADIOLOGY",
  });

  const {
    data: getLabData,
    isSuccess: getLabSuccess,
    refetch: callGetLab,
  } = useDiagnosticCentresControllerServiceListDiagnosticCenter({
    providerGroupUuid,
    type: "LAB",
  });

  const { data: insurancePayerData, isSuccess: getInsurancePayerData } =
    useInsuranceControllerServiceGetInsurancePayer({});

  useEffect(() => {
    if (getInsurancePayerData && !!insurancePayerData) {
      setInsurancePayerOptions(insurancePayerData?.data?.content);
    }
  }, [insurancePayerData]);

  useEffect(() => {
    if (getPharmacy && !!getPharmacyData) {
      setPharmacyOptions(getPharmacyData?.data?.content);
    }
  }, [getPharmacy]);

  useEffect(() => {
    if (getLabSuccess && !!getLabData) {
      setLabOptions(getLabData?.data?.content);
    }
  }, [getLabSuccess, getLabData]);

  useEffect(() => {
    if (getRadiologySuccess && !!getPreferredData) {
      setRadiologyOptions(getPreferredData?.data?.content);
    }
  }, [getRadiologySuccess, getPreferredData]);

  useEffect(() => {
    if (AddedPatient) {
      // navigate("/provider/patients");
    }
  }, [AddedPatient]);

  useEffect(() => {
    if (!!getLocationsData && getLocations) {
      setLocationOptions(getLocationsData?.data?.content);
    }
  }, [getLocations]);

  useEffect(() => {
    if (!!data && isSuccess) {
      setProviderOptions(data?.data?.content);
    }
  }, [isSuccess]);

  const storePharmacy = () => {
    reCallGetPharmacy();
  };

  const storeLab = (data: any) => {
    if (data) callGetLab();
  };

  const storeRadiology = (data: any) => {
    if (data) callGetRadiology();
  };

  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    providerOptions.forEach((data: any) => {
      if (data.id === value) {
        setInitailValues((prevData) => ({
          ...prevData,
          [name]: `${data.firstName} ${data.lastName}`,
        }));
      }
    });
  };

  const handleSelectLocationOption = (e: any) => {
    const { value, name } = e.target;
    if (Array.isArray(locationOptions)) {
      locationOptions.forEach((element: any) => {
        if (element.id == value) {
          setInitailValues((prevData) => ({
            ...prevData,
            [name]: `${element?.billingAddress.line1} ${element?.billingAddress.line2} ${element?.billingAddress.city} ${element?.billingAddress.state} ${element?.billingAddress.country} ${element?.billingAddress.zipcode}`,
          }));
        }
      });
    }
  };

  const handleSelectedOption = (e: any) => {
    const { value, name } = e.target;
    setInitailValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectedOptionForInsurance = (
    e: React.ChangeEvent<{ name: string; value: any }>,
    indexOfInsuranceToUpdate?: number
  ) => {
    const { value, name } = e.target;

    if (value !== "SELF" && name === "relationshipWithPolicyHolder") {
      setShowPolicyHolder(true);
    }

    setInitailValues((prevData) => {
      const updatedInsurance = prevData.insurance.map((insurance, index) =>
        index === indexOfInsuranceToUpdate
          ? { ...insurance, [name]: value }
          : insurance
      );

      return { ...prevData, insurance: updatedInsurance };
    });
  };

  const handleDateChange = (date: any, name: any, index?: number) => {
    const formattedDate = date.toISOString();
    if (name == "PolicyHolderdateofbirth" && index != undefined) {
      setInitailValues((prevData) => {
        const updatedInsurance = [...prevData.insurance];
        updatedInsurance[index] = {
          ...updatedInsurance[index],
          [name]: formattedDate,
        };
        return {
          ...prevData,
          insurance: updatedInsurance,
        };
      });
    } else {
      setInitailValues((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    }
  };

  const handleClose = () => {
    // props.handleToggleAddModal();
    navigate("/provider/patients");
  };
  const inputData = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { value, name } = e.target;
    const InputLabel = [
      "policyHolderfirstName",
      "policyHolderlastName",
      "policyHolderCity",
      "policyHoldersZipcode",
      "policyHolderAddressLine",
      "memberId",
      "planId",
      "groupId",
      "groupName",
      "copay",
      "payerContactNumber",
      "payerFaxNumber",
    ];
    if (InputLabel.includes(name) && index != undefined) {
      setInitailValues((prevData) => {
        const updatedInsurance = [...prevData.insurance];
        updatedInsurance[index] = {
          ...updatedInsurance[index],
          [name]: value,
        };
        return {
          ...prevData,
          insurance: updatedInsurance,
        };
      });
    } else {
      setInitailValues((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddInsurance = () => {
    setShowSecondaryIns(false);
    setInsuranceSections((prevSections) => [
      ...prevSections,
      { id: prevSections.length + 1, title: "Secondary Insurance" },
    ]);
    setInitailValues((prevData) => ({
      ...prevData,
      insurance: [
        ...prevData.insurance,
        {
          insuranceType: "",
          insurancePayer: { id: null, payerId: "", payerName: "" },
          planId: "",
          groupId: "",
          groupName: "",
          memberId: "",
          payerContactNumber: "",
          payerFaxNumber: "",
          relationshipWithPolicyHolder: "",
          copay: "",
          policyHolderfirstName: "",
          policyHolderlastName: "",
          PolicyHolderdateofbirth: null,
          policyHolderAddressLine: "",
          policyHolderCity: "",
          policyHoldersZipcode: "",
          policyHoldersCountry: "",
          policyHoldersState: "",
        },
      ],
    }));
  };

  const countryOptions = ["Africa", "Asia", "India"];
  const stateOptions = ["Maharashtra", "Gujarat"];

  const privacy = [
    { id: "1", name: "Consent To Email", checked: "true" },
    { id: "2", name: "Consent To Call", checked: "true" },
    { id: "3", name: "Consent To Message", checked: "true" },
  ];

  const handleCheckboxChange = (itemId: string) => {
    setInitailValues((prevValues: any) => {
      const newCheckboxes: string[] = [...prevValues.privacyCheckboxes];
      if (newCheckboxes.includes(itemId)) {
        const index = newCheckboxes.indexOf(itemId);
        newCheckboxes.splice(index, 1);
      } else {
        newCheckboxes.push(itemId);
      }
      return {
        ...prevValues,
        privacyCheckboxes: newCheckboxes,
      };
    });
  };

  const getPrivacyValues = (id: string) => {
    return initialValues.privacyCheckboxes.some((element) => element === id);
  };

  const showPreferenceModal = (item: string) => {
    setOpenPreferenceModal(true);
    if (item === "Preferred Pharmacy") setPreferenceTitle("Add New Pharmacy");
    else if (item === "Preferred Labs") setPreferenceTitle("Add New Labs");
    else if (item === "Preferred Radiology")
      setPreferenceTitle("Add New Radiology");
  };

  const handleSelect = (value: any, name: string) => {
    const { id, uuid } = value;
    if (name === "Preferred Pharmacy") setPharmacyStore({ id: id, uuid: uuid });
    else if (name === "Preferred Radiology")
      setRadiologyStore({ id: id, uuid: uuid });
    else if (name === "Preferred Labs") setLabStore({ id: id, uuid: uuid });
  };

  const handleFormSubmit = (values: any) => {
    let requestBody: any = {
      provider: {
        id: 1,
        uuid: "9411009d-bbfe-459e-8ba0-d2f77a3b145e",
        providerType: Provider.providerType.MD,
        specialities: [],
        role: "",
        firstName: "",
        lastName: "",
        npi: "",
        contactNumber: "",
        groupNpi: "",
        email: "",
        licensedStates: [],
        workLocations: [],
      },
      location: {
        id: 1,
        uuid: "66391fa4-9a13-4e30-a8b7-20ecee9d7d41",
        locationId: "",
        name: "",
        specialities: [],
        contact: "",
        email: "",
        physicalAddress: {
          line1: values.addressLine,
          city: values.city,
          state: values.state,
          country: values.country,
          zipcode: values.zipcode,
        },
        billingAddress: {
          line1: values.addressLine,
          city: values.city,
          state: values.state,
          country: values.country,
          zipcode: values.zipcode,
        },
      },
      registrationDate: values.registrationDate,
      legalLastName: values.legalLastName,
      legalFirstName: values.legalFirstName,
      firstNameUsed: values.firstNameUsed,
      middleName: values.middleName,
      birthDate: values.dateofbirth,
      ssn: values.ssn,
      language: values.language,
      race: values.race,
      ethnicity: values.ethnicity,
      maritalStatus: values.maritalStatus,
      gender: values.gender,
      address: {
        line1: values.addressLine,
        city: values.city,
        state: values.state,
        country: values.country,
        zipcode: values.zipcode,
      },
      contactNumber: values.contactNumber,
      email: values.email,
      fax: values.faxNumber,
      emergContactLastName: values.lastName,
      emergContactFirstName: values.firstName,
      emergContactRelation: values.relationshipWithPatient,
      emergContactNumber: values.emergcontactNumber,
      emergContactEmail: values.emergencyEmail,
      emailConsent: getPrivacyValues("1"),
      callConsent: getPrivacyValues("2"),
      messageConsent: getPrivacyValues("3"),
    };

    let tempArrayOfInsurance: any = [];

    if (values.insurance.length > 0) {
      values.insurance.forEach((element: any) => {
        let insurance = {
          insuranceType: element.insuranceType,
          insurancePayer: element.insurancePayer,
          copay: element.copay,
          payerContactNumber: element.payerContactNumber,
          payerFaxNumber: element.payerFaxNumber,
          memberId: element.memberId,
          planId: element.planId,
          groupId: element.groupId,
          groupName: element.groupName,
          relationshipWithPolicyHolder: element.relationshipWithPolicyHolder,
          insurancePolicyHolder: {
            firstName: element.policyHolderfirstName,
            lastName: element.policyHolderlastName,
            dob: element.PolicyHolderdateofbirth,
            address: {},
          },
        };
        tempArrayOfInsurance.push(insurance);
      });
    }
    if (tempArrayOfInsurance.length > 0) {
      const a = {
        insurances: tempArrayOfInsurance,
      };
      requestBody = { ...requestBody, ...a };
    }
    if (pharmacyStore) {
      const a = {
        preferredPharmacy: pharmacyStore,
      };
      requestBody = { ...requestBody, ...a };
    } else if (labStore) {
      const a = {
        preferredLab: labStore,
      };
      requestBody = { ...requestBody, ...a };
    } else if (radiologyStore) {
      const a = {
        preferredRadiology: radiologyStore,
      };
      requestBody = { ...requestBody, ...a };
    }
    mutateAsync({ requestBody: requestBody });
  };

  return (
    <Formik
      enableReinitialize={true}
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        values,
        // touched,
        // errors,
        // isSubmitting,
        // isValid,
        // setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid className={classes.main}>
            <Grid>
              <Grid
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  marginRight: "39px",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Grid item>
                  {/* <ButtonBase onClick={onCloseDrawer}>
              <ArrowBackOutlined />
            </ButtonBase> */}
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Add Patient
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowBackIosIcon sx={backIcon} />
                  <Typography onClick={handleClose} sx={backToText}>
                    Back
                  </Typography>
                </Grid>
              </Grid>
              <Grid>Patient Registration Provider Group with : NODMD</Grid>
              <Grid>
                <div>
                  <Grid className={classes.formGridTitle} mt={3}>
                    <Typography sx={{ fontWeight: "700" }}>
                      Provider/Registation Dates
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    // xs={12}
                    // lg={12}
                    columnGap={3}
                    sx={{ marginTop: "20px !important" }}
                  >
                    <Grid item xs={3}>
                      <Typography variant="h4" className={classes.label}>
                        Primary Provider
                      </Typography>

                      <Select
                        className={classes.selectInputStyle}
                        value={values.provider}
                        name="provider"
                        onChange={(e: any) => handleSelectOption(e)}
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
                                  Select Primary Provider
                                </Typography>
                              </span>
                            );
                          }
                          return (
                            <Typography variant="h5">{selected}</Typography>
                          );
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {providerOptions?.map((data: any) => {
                          return (
                            <MenuItem
                              key={data.id}
                              value={data.id}
                              className={classes.menuItemColorStyle}
                            >
                              {data.firstName}
                              {""}
                              {data.lastName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography className={classes.label} variant="h4">
                        Provider Group Location
                      </Typography>
                      <Select
                        className={classes.selectInputStyle}
                        value={values.primaryLocation}
                        name="primaryLocation"
                        onChange={(e: any) => handleSelectLocationOption(e)}
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
                                  Select Provider Location
                                </Typography>
                              </span>
                            );
                          }
                          return (
                            <Typography variant="h5">{selected}</Typography>
                          );
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {locationOptions?.map((value: any) => {
                          return (
                            <MenuItem
                              className={classes.menuItemColorStyle}
                              key={value.id}
                              value={value.id}
                            >
                              {" "}
                              <Typography className={classes.btnTextDropList}>
                                {"  "} {value?.billingAddress.line1} {"  "}
                                {value?.billingAddress.line2}
                                {"  "} {value?.billingAddress.city}
                                {"  "} {value?.billingAddress.state}
                                {"  "} {value?.billingAddress.country} {"  "}
                                {value?.billingAddress.zipcode}{" "}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h4" className={classes.label}>
                        Registration Date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                            marginTop: "10px",
                            // boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <DatePicker
                            onChange={(date) =>
                              handleDateChange(date, "registrationDate")
                            }
                            value={values.registrationDate}
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </Box>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid>
                <div>
                  <Grid className={classes.formGridTitle} mt={3}>
                    <Typography sx={{ fontWeight: "700" }}>
                      Patient Details
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    sx={{ marginTop: "20px !important" }}
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#1A1A1A !important",
                        }}
                      >
                        Profile Picture
                      </Typography>
                      <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        // sx={{
                        //   background: "#FFFFFF",
                        //   border: "2px dashed #1A1A1A66",
                        //   borderRadius: "10px",
                        //   marginTop: "10px",
                        //   height: "81%",
                        // }}
                      >
                        <ImageSelector />
                      </Grid>
                    </Grid>
                    <Grid item xs={9} className={classes.GridDiv}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography
                            variant="h4"
                            sx={{
                              color: "#1A1A1A !important",
                            }}
                          >
                            Legal Last Name
                          </Typography>

                          <InputBase
                            value={values.legalLastName}
                            name="legalLastName"
                            fullWidth
                            placeholder="Enter legal last name"
                            classes={{
                              root: classes.inputField,
                              input: classes.inputBoxText,
                              focused: classes.inputBoxActive,
                            }}
                            onChange={(e: any) => inputData(e)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h4" className={classes.label}>
                            Legal First Name
                          </Typography>

                          <InputBase
                            value={values.legalFirstName}
                            name="legalFirstName"
                            fullWidth
                            placeholder="Enter legal first name"
                            classes={{
                              root: classes.inputField,
                              input: classes.inputBoxText,
                              focused: classes.inputBoxActive,
                            }}
                            onChange={(e: any) => inputData(e)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h4" className={classes.label}>
                            First Name Used
                          </Typography>

                          <InputBase
                            value={values.firstNameUsed}
                            name="firstNameUsed"
                            fullWidth
                            placeholder="Enter legal last name"
                            classes={{
                              root: classes.inputField,
                              input: classes.inputBoxText,
                              focused: classes.inputBoxActive,
                            }}
                            onChange={(e: any) => inputData(e)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h4" className={classes.label}>
                            Middle Name
                          </Typography>

                          <InputBase
                            value={values.middleName}
                            name="middleName"
                            fullWidth
                            placeholder="Enter middle name"
                            classes={{
                              root: classes.inputField,
                              input: classes.inputBoxText,
                              focused: classes.inputBoxActive,
                            }}
                            onChange={(e: any) => inputData(e)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h4" className={classes.label}>
                            Date Of Birth
                          </Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box
                              sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                position: "relative",
                                marginTop: "10px",
                              }}
                            >
                              <DatePicker
                                onChange={(date) =>
                                  handleDateChange(date, "dateofbirth")
                                }
                                value={values.dateofbirth}
                                slotProps={{ textField: { size: "small" } }}
                              />
                            </Box>
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h4" className={classes.label}>
                            Gender
                          </Typography>
                          <Select
                            className={classes.selectInputStyle}
                            value={values.gender}
                            name="gender"
                            onChange={(e: any) => handleSelectedOption(e)}
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      className={classes.label}
                                    >
                                      Select Gender
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {genderOptions?.map((data) => {
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
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="h4" className={classes.label}>
                            Marital Status
                          </Typography>
                          <Select
                            className={classes.selectInputStyle}
                            value={values.maritalStatus}
                            name="maritalStatus"
                            onChange={(e: any) => handleSelectedOption(e)}
                            renderValue={(selected) => {
                              if (!selected) {
                                return (
                                  <span>
                                    <Typography
                                      variant="h5"
                                      className={classes.label}
                                    >
                                      Select Status
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {maritalStatusOptions?.map((data) => {
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
                        <Grid item xs={4}>
                          {" "}
                          <Typography variant="h4" className={classes.label}>
                            SSN
                          </Typography>
                          <InputBase
                            value={values.ssn}
                            name="ssn"
                            fullWidth
                            placeholder="Enter SSN"
                            classes={{
                              root: classes.inputField,
                              input: classes.inputBoxText,
                              focused: classes.inputBoxActive,
                            }}
                            onChange={(e: any) => inputData(e)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h4" className={classes.label}>
                            Language
                          </Typography>
                          <Select
                            className={classes.selectInputStyle}
                            value={values.language}
                            name="language"
                            onChange={(e: any) => handleSelectedOption(e)}
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
                                      Select Language
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {languageOptions?.map((data) => {
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
                        <Grid item xs={4}>
                          <Typography
                            variant="h4"
                            className={classes.label}
                            sx={
                              {
                                // marginTop: "20px !important",
                              }
                            }
                          >
                            Ethnicity
                          </Typography>
                          <Select
                            className={classes.selectInputStyle}
                            value={values.ethnicity}
                            name="ethnicity"
                            onChange={(e: any) => handleSelectedOption(e)}
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
                                      Select Ethnicity
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {ethnicityOptions?.map((data) => {
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
                        <Grid item xs={4}>
                          <Typography
                            variant="h4"
                            className={classes.label}
                            sx={
                              {
                                // marginTop: "20px !important",
                              }
                            }
                          >
                            Race
                          </Typography>
                          <Select
                            className={classes.selectInputStyle}
                            value={values.race}
                            name="race"
                            onChange={(e: any) => handleSelectedOption(e)}
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
                                      Select Race
                                    </Typography>
                                  </span>
                                );
                              }
                              return (
                                <Typography variant="h5">{selected}</Typography>
                              );
                            }}
                            MenuProps={MenuProps}
                            displayEmpty
                          >
                            {raceOptions?.map((data) => {
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
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid>
                <div>
                  <Grid className={classes.formGridTitle} mt={3}>
                    <Typography sx={{ fontWeight: "700" }}>
                      Address Details
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    sx={{ marginTop: "20px" }}
                    className={classes.GridDiv}
                    spacing={2}
                  >
                    <Grid item xs={3}>
                      <Typography
                        className={classes.label}
                        variant="h4"
                        sx={
                          {
                            //   marginTop: "20px !important",
                          }
                        }
                      >
                        Address
                      </Typography>

                      <InputBase
                        value={values.addressLine}
                        name="addressLine"
                        fullWidth
                        placeholder="Enter Address"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            //   marginTop: "20px !important",
                          }
                        }
                      >
                        City
                      </Typography>

                      <InputBase
                        value={values.city}
                        name="city"
                        fullWidth
                        placeholder="Enter City"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            //   marginTop: "20px !important",
                          }
                        }
                      >
                        Zipcode
                      </Typography>

                      <InputBase
                        value={values.zipcode}
                        name="zipcode"
                        fullWidth
                        placeholder="Enter Zipcode"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            // marginTop: "20px !important",
                          }
                        }
                      >
                        Country
                      </Typography>
                      <Select
                        className={classes.selectInputStyle}
                        value={values.country}
                        name="country"
                        onChange={(e: any) => handleSelectedOption(e)}
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
                                  Select Country
                                </Typography>
                              </span>
                            );
                          }
                          return (
                            <Typography variant="h5">{selected}</Typography>
                          );
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {countryOptions.map((data) => {
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
                    <Grid item xs={3}>
                      <Typography
                        variant="h4"
                        className={classes.label}
                        sx={
                          {
                            // marginTop: "20px !important",
                          }
                        }
                      >
                        State
                      </Typography>
                      <Select
                        className={classes.selectInputStyle}
                        value={values.state}
                        name="state"
                        onChange={(e: any) => handleSelectedOption(e)}
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
                                  Select State
                                </Typography>
                              </span>
                            );
                          }
                          return (
                            <Typography variant="h5">{selected}</Typography>
                          );
                        }}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {stateOptions.map((data) => {
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
                  </Grid>
                </div>
              </Grid>
              <Grid>
                <div>
                  <Grid className={classes.formGridTitle} mt={3}>
                    <Typography sx={{ fontWeight: "700" }}>
                      Contact Details
                    </Typography>
                  </Grid>
                  <Grid container sx={{ marginTop: "20px" }} columnGap={3}>
                    <Grid item xs={3}>
                      <Typography variant="h4" className={classes.label}>
                        Contact Number
                      </Typography>

                      <InputBase
                        value={values.contactNumber}
                        name="contactNumber"
                        fullWidth
                        placeholder="Enter Contact Number"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h4" className={classes.label}>
                        Email
                      </Typography>

                      <InputBase
                        value={values.email}
                        name="email"
                        fullWidth
                        placeholder="Enter Email"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="h4" className={classes.label}>
                        Fax Number
                      </Typography>

                      <InputBase
                        value={values.faxNumber}
                        name="faxNumber"
                        fullWidth
                        placeholder="Enter Fax Number"
                        classes={{
                          root: classes.inputField,
                          input: classes.inputBoxText,
                          focused: classes.inputBoxActive,
                        }}
                        onChange={(e: any) => inputData(e)}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid>
                <div>
                  <Grid>
                    <Grid className={classes.formGridTitle} mt={3}>
                      <Typography sx={{ fontWeight: "700" }}>
                        Emergency Contact Details
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      sx={{ marginTop: "20px !important" }}
                      className={classes.GridDiv}
                      spacing={2}
                    >
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          Relationship with Patient
                        </Typography>
                        <Select
                          className={classes.selectInputStyle}
                          value={values.relationshipWithPatient}
                          name="relationshipWithPatient"
                          onChange={(e: any) => handleSelectedOption(e)}
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
                                    Select Relationship with Patient
                                  </Typography>
                                </span>
                              );
                            }
                            return (
                              <Typography variant="h5">{selected}</Typography>
                            );
                          }}
                          MenuProps={MenuProps}
                          displayEmpty
                        >
                          {relationshipWithPatientOptions?.map((data) => {
                            return (
                              <MenuItem
                                value={data}
                                key={data}
                                className={classes.menuItemColorStyle}
                              >
                                {data}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          Last Name
                        </Typography>

                        <InputBase
                          value={values.lastName}
                          name="lastName"
                          fullWidth
                          placeholder="Enter LastName"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          First Name
                        </Typography>

                        <InputBase
                          value={values.firstName}
                          name="firstName"
                          fullWidth
                          placeholder="Enter FirstName"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="h4"
                          className={classes.label}
                          sx={
                            {
                              // marginTop: "20px !important",
                            }
                          }
                        >
                          Contact Number
                        </Typography>

                        <InputBase
                          value={values.emergcontactNumber}
                          name="emergcontactNumber"
                          fullWidth
                          placeholder="Enter Contact"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="h4"
                          className={classes.label}
                          // sx={{
                          //   marginTop: "20px !important",
                          // }}
                        >
                          Email
                        </Typography>
                        <InputBase
                          value={values.emergencyEmail}
                          name="emergencyEmail"
                          fullWidth
                          placeholder="Enter Email"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid>
                <div>
                  <Grid className={classes.formGridTitle} mt={3}>
                    <Typography sx={{ fontWeight: "700" }}>
                      Preferences
                    </Typography>
                  </Grid>
                  <Grid container columnGap={3} sx={{ marginTop: "20px" }}>
                    <Grid item xs={3}>
                      <Grid
                        container
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="h4" className={classes.label}>
                          Preferred Pharmacy
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1B5984",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            showPreferenceModal("Preferred Pharmacy")
                          }
                        >
                          <AddIcon
                            sx={{ color: "#1B5984", fontSize: "15px" }}
                          />{" "}
                          Add new
                        </Typography>
                      </Grid>

                      <Autocomplete
                        sx={multiSelectDropDown}
                        multiple={false}
                        id="tags-standard"
                        options={pharmacyOptions || []}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(value) =>
                          handleSelect(value, "Preferred Pharmacy")
                        }
                        disableCloseOnSelect
                        renderOption={(props, option) => (
                          <MenuItem
                            key={option.id}
                            value={option}
                            sx={{ justifyContent: "space-between" }}
                            {...props}
                          >
                            {option.name}
                          </MenuItem>
                        )}
                        renderInput={(params) => (
                          <TextField
                            classes={{ root: classes.customTextField }}
                            {...params}
                            variant="outlined"
                            placeholder="Search And Select Pharmacy"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Grid
                        container
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="h4" className={classes.label}>
                          Preferred Labs
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1B5984",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => showPreferenceModal("Preferred Labs")}
                        >
                          <AddIcon
                            sx={{ color: "#1B5984", fontSize: "15px" }}
                          />{" "}
                          Add new
                        </Typography>
                      </Grid>
                      <Autocomplete
                        sx={multiSelectDropDown}
                        multiple
                        id="tags-standard"
                        options={labOptions || []}
                        getOptionLabel={(option: any) => option.name}
                        disableCloseOnSelect
                        onChange={(value) =>
                          handleSelect(value, "Preferred Labs")
                        }
                        renderOption={(props, option) => (
                          <MenuItem
                            key={option.id}
                            value={option}
                            sx={{ justifyContent: "space-between" }}
                            {...props}
                          >
                            {option.name}
                          </MenuItem>
                        )}
                        renderInput={(params) => (
                          <TextField
                            classes={{ root: classes.customTextField }}
                            {...params}
                            variant="outlined"
                            placeholder="Search And Select Labs"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Grid
                        container
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="h4" className={classes.label}>
                          Preferred Radiology
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#1B5984",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            showPreferenceModal("Preferred Radiology")
                          }
                        >
                          <AddIcon
                            sx={{ color: "#1B5984", fontSize: "15px" }}
                          />{" "}
                          Add new
                        </Typography>
                      </Grid>
                      <Autocomplete
                        sx={multiSelectDropDown}
                        multiple
                        id="tags-standard"
                        options={radiologyOptions || []}
                        getOptionLabel={(option: any) => option.name}
                        onChange={(value) =>
                          handleSelect(value, "Preferred Radiology")
                        }
                        disableCloseOnSelect
                        renderOption={(props, option) => (
                          <MenuItem
                            key={option.id}
                            value={option}
                            sx={{ justifyContent: "space-between" }}
                            {...props}
                          >
                            {option.name}
                          </MenuItem>
                        )}
                        renderInput={(params) => (
                          <TextField
                            classes={{ root: classes.customTextField }}
                            {...params}
                            variant="outlined"
                            placeholder="Search And Select Radiology"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid>
                {insuranceSections.map((section, index) => (
                  <div key={section.id}>
                    <Grid className={classes.formGridTitle} mt={3}>
                      <Typography sx={{ fontWeight: "700" }}>
                        {section.title}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      sx={{ marginTop: "20px !important" }}
                      // className={classes.GridDiv}
                      spacing={2}
                    >
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          Insurance Type
                        </Typography>
                        <Select
                          className={classes.selectInputStyle}
                          value={values?.insurance[index]?.insuranceType}
                          name="insuranceType"
                          onChange={(e: any) =>
                            handleSelectedOptionForInsurance(e, index)
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
                                    Select Insurance Type
                                  </Typography>
                                </span>
                              );
                            }
                            return (
                              <Typography variant="h5">{selected}</Typography>
                            );
                          }}
                          MenuProps={MenuProps}
                          displayEmpty
                        >
                          {insuranceTypeOptions?.map((data) => {
                            return (
                              <MenuItem
                                value={data}
                                key={data}
                                className={classes.menuItemColorStyle}
                              >
                                {data}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          Insurance Payer
                        </Typography>
                        <Select
                          className={classes.selectInputStyle}
                          value={
                            values?.insurance[index]?.insurancePayer.payerName
                          }
                          name="insurancePayer"
                          onChange={(e: any) =>
                            handleSelectedOptionForInsurance(e, index)
                          }
                          renderValue={(selected: any) => {
                            if (!selected) {
                              return (
                                <span>
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      color: "#1A1A1A80 !important",
                                    }}
                                  >
                                    Select Payer
                                  </Typography>
                                </span>
                              );
                            }
                            return (
                              <Typography variant="h5">
                                {selected?.payerName ?? selected}
                              </Typography>
                            );
                          }}
                          MenuProps={MenuProps}
                          displayEmpty
                        >
                          {insurancePayerOptions?.map((data: any) => {
                            return (
                              <MenuItem
                                key={data.payerId}
                                value={data}
                                className={classes.menuItemColorStyle}
                              >
                                {data.payerName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          Member ID
                        </Typography>

                        <InputBase
                          value={values?.insurance[index]?.memberId}
                          name="memberId"
                          fullWidth
                          placeholder="Enter Member ID"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e, index)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="h4"
                          className={classes.label}
                          sx={
                            {
                              // marginTop: "20px !important",
                            }
                          }
                        >
                          Plan ID
                        </Typography>

                        <InputBase
                          value={values?.insurance[index]?.planId}
                          name="planId"
                          fullWidth
                          placeholder="Enter Plan ID"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e, index)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="h4"
                          className={classes.label}
                          sx={
                            {
                              // marginTop: "20px !important",
                            }
                          }
                        >
                          Group ID
                        </Typography>

                        <InputBase
                          value={values?.insurance[index]?.groupId}
                          name="groupId"
                          fullWidth
                          placeholder="Enter Group ID"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e, index)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="h4"
                          sx={{
                            color: "#1A1A1A !important",
                          }}
                        >
                          Group Name
                        </Typography>

                        <InputBase
                          value={values?.insurance[index]?.groupName}
                          name="groupName"
                          fullWidth
                          placeholder="Enter Group Name"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e, index)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          Copay
                        </Typography>

                        <InputBase
                          value={values?.insurance[index]?.copay}
                          name="copay"
                          fullWidth
                          placeholder="$Copay"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e, index)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="h4"
                          className={classes.label}
                          sx={
                            {
                              // marginTop: "20px  !important",
                            }
                          }
                        >
                          Payer Contact Number
                        </Typography>

                        <InputBase
                          value={values?.insurance[index]?.payerContactNumber}
                          name="payerContactNumber"
                          fullWidth
                          placeholder="Enter Contact Number"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e, index)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          Payer Fax Number
                        </Typography>

                        <InputBase
                          value={values?.insurance[index]?.payerFaxNumber}
                          name="payerFaxNumber"
                          fullWidth
                          placeholder="Enter Fax Number"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                          onChange={(e: any) => inputData(e, index)}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h4" className={classes.label}>
                          Relationship With Policy Holder
                        </Typography>
                        <Select
                          className={classes.selectInputStyle}
                          value={
                            values?.insurance[index]
                              ?.relationshipWithPolicyHolder
                          }
                          name="relationshipWithPolicyHolder"
                          onChange={(e: any) =>
                            handleSelectedOptionForInsurance(e, index)
                          }
                          renderValue={(selected) => {
                            if (!selected) {
                              return (
                                <span>
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      color: "#1A1A1A80  !important",
                                    }}
                                  >
                                    Select
                                  </Typography>
                                </span>
                              );
                            }
                            return (
                              <Typography variant="h5">{selected}</Typography>
                            );
                          }}
                          MenuProps={MenuProps}
                          displayEmpty
                        >
                          {relationshipWithPolicyHolderOptions?.map((data) => {
                            return (
                              <MenuItem
                                value={data}
                                key={data}
                                className={classes.menuItemColorStyle}
                              >
                                {data}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Grid>
                      {showPolicyHolder && (
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <Typography
                                variant="h4"
                                className={classes.label}
                              >
                                First Name
                              </Typography>

                              <InputBase
                                value={
                                  values?.insurance[index]
                                    ?.policyHolderfirstName
                                }
                                name="policyHolderfirstName"
                                fullWidth
                                placeholder="Enter FirstName"
                                classes={{
                                  root: classes.inputField,
                                  input: classes.inputBoxText,
                                  focused: classes.inputBoxActive,
                                }}
                                onChange={(e: any) => inputData(e, index)}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="h4"
                                className={classes.label}
                              >
                                Last Name
                              </Typography>

                              <InputBase
                                value={
                                  values?.insurance[index]?.policyHolderlastName
                                }
                                name="policyHolderlastName"
                                fullWidth
                                placeholder="Enter LastName"
                                classes={{
                                  root: classes.inputField,
                                  input: classes.inputBoxText,
                                  focused: classes.inputBoxActive,
                                }}
                                onChange={(e: any) => inputData(e, index)}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="h4"
                                className={classes.label}
                              >
                                Date Of Birth
                              </Typography>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "relative",
                                    marginTop: "10px",
                                  }}
                                >
                                  <DatePicker
                                    onChange={(date) =>
                                      handleDateChange(
                                        date,
                                        "PolicyHolderdateofbirth",
                                        index
                                      )
                                    }
                                    value={
                                      values?.insurance[index]
                                        ?.PolicyHolderdateofbirth
                                    }
                                    slotProps={{ textField: { size: "small" } }}
                                  />
                                </Box>
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                className={classes.label}
                                variant="h4"
                                sx={
                                  {
                                    //   marginTop: "20px !important",
                                  }
                                }
                              >
                                Address Line1
                              </Typography>

                              <InputBase
                                value={
                                  values?.insurance[index]
                                    ?.policyHolderAddressLine
                                }
                                name="policyHolderAddressLine"
                                fullWidth
                                placeholder="Enter Address"
                                classes={{
                                  root: classes.inputField,
                                  input: classes.inputBoxText,
                                  focused: classes.inputBoxActive,
                                }}
                                onChange={(e: any) => inputData(e, index)}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="h4"
                                className={classes.label}
                                sx={
                                  {
                                    //   marginTop: "20px !important",
                                  }
                                }
                              >
                                City
                              </Typography>

                              <InputBase
                                value={
                                  values?.insurance[index]?.policyHolderCity
                                }
                                name="policyHolderCity"
                                fullWidth
                                placeholder="Enter City"
                                classes={{
                                  root: classes.inputField,
                                  input: classes.inputBoxText,
                                  focused: classes.inputBoxActive,
                                }}
                                onChange={(e: any) => inputData(e, index)}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="h4"
                                className={classes.label}
                                sx={
                                  {
                                    //   marginTop: "20px !important",
                                  }
                                }
                              >
                                Zipcode
                              </Typography>

                              <InputBase
                                value={
                                  values?.insurance[index]?.policyHoldersZipcode
                                }
                                name="policyHoldersZipcode"
                                fullWidth
                                placeholder="Enter zopcode"
                                classes={{
                                  root: classes.inputField,
                                  input: classes.inputBoxText,
                                  focused: classes.inputBoxActive,
                                }}
                                onChange={(e: any) => inputData(e, index)}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                variant="h4"
                                className={classes.label}
                                sx={
                                  {
                                    // marginTop: "20px !important",
                                  }
                                }
                              >
                                Country
                              </Typography>
                              <Select
                                className={classes.selectInputStyle}
                                value={
                                  values?.insurance[index]?.policyHoldersCountry
                                }
                                name="policyHoldersCountry"
                                onChange={(e: any) => handleSelectedOption(e)}
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
                                          Select Country
                                        </Typography>
                                      </span>
                                    );
                                  }
                                  return (
                                    <Typography variant="h5">
                                      {selected}
                                    </Typography>
                                  );
                                }}
                                MenuProps={MenuProps}
                                displayEmpty
                              >
                                {countryOptions.map((data) => {
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
                            <Grid item xs={3}>
                              <Typography
                                variant="h4"
                                className={classes.label}
                                sx={
                                  {
                                    // marginTop: "20px !important",
                                  }
                                }
                              >
                                State
                              </Typography>
                              <Select
                                className={classes.selectInputStyle}
                                value={
                                  values?.insurance[index]?.policyHoldersState
                                }
                                name="policyHoldersState"
                                onChange={(e: any) => handleSelectedOption(e)}
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
                                          Select State
                                        </Typography>
                                      </span>
                                    );
                                  }
                                  return (
                                    <Typography variant="h5">
                                      {selected}
                                    </Typography>
                                  );
                                }}
                                MenuProps={MenuProps}
                                displayEmpty
                              >
                                {stateOptions.map((data) => {
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
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    <Grid
                      container
                      className={classes.insuranceGrid}
                      sx={{ flexDirection: "column" }}
                    >
                      <Grid item>
                        <Typography
                          variant="h4"
                          className={classes.label}
                          sx={{
                            marginTop: "20px  !important",
                          }}
                        >
                          Upload Insurance Card
                        </Typography>
                      </Grid>
                      <Grid className={classes.insuranceDropZone}>
                        <Grid item sx={customImageContainer}>
                          <DropzoneArea
                            maxFileSize={1048576} // 1 MB in bytes
                            filesLimit={1}
                            acceptedFiles={[
                              "image/jpeg",
                              "image/jpg",
                              "image/png",
                            ]}
                            dropzoneText=" Click here to upload from Front Side Drag & Drop files Or Browse Files"
                            onChange={(_files: any) => {}}
                            classes={{
                              root: classes.dropZone,
                              icon: classes.uploadIcon,
                              text: classes.textUploadZone,
                            }}
                          />
                        </Grid>
                        <Grid item sx={customImageContainer}>
                          <DropzoneArea
                            maxFileSize={1048576} // 1 MB in bytes
                            filesLimit={1}
                            acceptedFiles={[
                              "image/jpeg",
                              "image/jpg",
                              "image/png",
                            ]}
                            dropzoneText=" Click here to upload from Back Side Drag & Drop files Or Browse Files"
                            classes={{
                              root: classes.dropZone,
                              icon: classes.uploadIcon,
                              text: classes.textUploadZone,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                ))}
                {showSecondaryIns && (
                  <Grid mt={2} container alignItems={"center"}>
                    <AddIcon sx={{ color: "#1B5984 !important" }} />
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#1B5984",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onClick={handleAddInsurance}
                    >
                      {" "}
                      Add Secondary Insurance
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid>
                <div>
                  <Grid className={classes.formGridTitle} mt={3}>
                    <Typography sx={{ fontWeight: "700" }}>Privacy</Typography>
                  </Grid>
                  <Grid sx={{ marginTop: "10px !important", color: "#000" }}>
                    <Grid item className={classes.checkBoxGrid}>
                      {privacy.map((item) => {
                        return (
                          <Grid
                            item
                            key={item.id}
                            className={classes.checkBoxItem}
                          >
                            <Typography
                              variant="h4"
                              className={classes.checkBoxText}
                            >
                              {item.name}
                            </Typography>
                            <Checkbox
                              //   classes={{
                              //     checked: classes.checkBoxColor,
                              //     root: classes.checkBoxColor,
                              //   }}
                              checked={values.privacyCheckboxes.includes(
                                item.id
                              )}
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid className={classes.buttonContainer}>
                <ButtonBase
                  onClick={handleClose}
                  sx={formButtonStyle.cancelButtonStyle}
                >
                  {CANCEL}
                </ButtonBase>
                <ButtonBase sx={formButtonStyle.saveButtonStyle} type="submit">
                  {ADD}
                </ButtonBase>
              </Grid>
            </Grid>
            {openPreferenceModal && (
              <AddPreferences
                open={openPreferenceModal}
                onClose={() => setOpenPreferenceModal(false)}
                title={addPreferenceTitle}
                storePharmacy={storePharmacy}
                storeLab={storeLab}
                storeRadiology={storeRadiology}
              />
            )}
          </Grid>
        </form>
      )}
    </Formik>
  );
}

export default AddNewPatient;
// function setToggleAddModal(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
