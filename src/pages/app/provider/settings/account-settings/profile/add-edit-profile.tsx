import {
    Box,
    // Button,
    ButtonBase,
    Checkbox,
    ClickAwayListener,
    FormHelperText,
    Grid,
    InputBase,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
  // import { Close } from "@mui/icons-material";
  import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { makeStyles } from "@mui/styles";
import specialityTypeList  from '../../../../../../mock-data/specialityTypeList.json'
import providerLicensedStateList from '../../../../../../mock-data/providerLicensedStateList.json'
import providerInsuranceAcceptedList from '../../../../../../mock-data/providerInsuranceAcceptedList.json'
import providerWorkLocationList from '../../../../../../mock-data/providerInsuranceAcceptedList.json'
import {
    actionBtns,
    commonWidget,
    formButtonStyle
} from "../../../../../../styles/common";
import {
    AgeGroupSeen,
    EnrollSelection,
    Gender,
    NewPatientsAndCashpay,
    YearOfexperiance,
    languagesSpoken,
    providerRoleList,
    providerTypeList,
} from "../../../../../../components/common/form-enum";
// import SelectInput from "../../common/select-input";
import CustomFormLabel from "../../../../../../components/common/custom-form-label";
import ImageSelector from "../../../../../../components/common/image-upload";
import SelectInput from "../../../../../../components/common/select-input";
import { adminConstants } from "../../../../../../constants/admin";
import { backIcon, backToText } from "../../../../../../styles/auth-form";
  
  const baseSelectStyle = {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    fontSize: "16px",
  };
  
  export const selectMultiInputCommonWidget = makeStyles(() => ({
    close: {
      position: "absolute",
      right: "28px",
      cursor: "pointer",
    },
    select: {
      ...baseSelectStyle,
      border: "none",
    },
    selectError: {
      ...baseSelectStyle,
      border: "red 1px solid !important",
    },
  }));
  
  const addEditProviderStyle = {
    dialogClose: {
      position: "absolute",
      right: "28px",
      cursor: "pointer",
    },
  
    selectInputStyle: {
      ".MuiOutlinedInput-notchedOutline": { border: 0 },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "42px !important",
      width: "100%",
    },
  
    dialogTitle: {
      fontSize: "18px !important",
      fontWeight: "bold !important",
    },
  
    topModalContainerMain: {
      display: "flex",
      gap: "30px",
      borderBottom: "1px solid #4C4C4C4D",
      paddingBottom: "20px",
      "@media (max-width: 820px)": {
        width: "100%",
      },
      "@media (max-width: 768px)": {
        width: "100%",
      },
    },
  
    topModalFormContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "22px",
      "@media (max-width: 820px)": {
        width: "100%",
      },
    },
  
    providerSubheader: {
      backgroundColor: "#CCECFF",
      padding: "10px",
    },
  
    informationDetailsSetup: {
      display: "grid",
      gridTemplateColumns: "1fr 6fr",
      gap: "10px",
      "@media (max-width: 820px)": {
        display: "block",
        gap: "10px",
      },
      "@media (max-width: 768px)": {
        display: "block",
        gap: "10px",
      },
    },
  
    informationSubdetailsSetup: {
      display: "grid",
      gridTemplateColumns: "2fr 2fr 2fr",
      width: "100%",
      gap: "20px",
      "@media (max-width: 820px)": {
        display: "block",
      },
      "@media (max-width: 768px)": {
        display: "block",
      },
    },
  
    informatonSubDetailsSetup2: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      width: "100%",
      "@media (max-width: 820px)": {
        marginTop: "10px",
        gridTemplateColumns: "2fr 2fr",
        display: "grid",
      },
      "@media (max-width: 768px)": {
        marginTop: "10px",
        gridTemplateColumns: "2fr 2fr",
        display: "grid",
      },
    },
  
    accountsSubDetailsSetup2: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      width: "100%",
      "@media (max-width: 820px)": {
        gridTemplateColumns: "2fr 2fr",
      },
      "@media (max-width: 768px)": {
        gridTemplateColumns: "2fr 2fr",
      },
    },
  
    marginTop: {
      marginTop: "20px",
    },
  
    basicInfoHeading: {
      margin: "20px 0 10px 0",
      color: "#36588C !important",
    },
  
    accountsInfo: {
      display: "grid",
      gridTemplateColumns: "2fr 2fr 2fr 2fr",
      width: "100%",
      gap: "20px",
      "@media (max-width: 820px)": {
        gridTemplateColumns: "2fr 2fr",
      },
      "@media (max-width: 768px)": {
        gridTemplateColumns: "2fr 2fr",
      },
    },
  
    providerProfileSetup: {
      border: "1px solid #7070704D",
      borderRadius: "5px",
      marginTop: "20px",
    },
  
    backButtonSetUp: {
      display: "flex",
      gap: "10px",
      cursor: "pointer",
    },
  
    actionButtonMarginTop: {
      display: "flex",
      justifyContent: "end",
      marginTop: "20px",
    },
  
    actionButton: {
      textTransform: "initial",
      backgroundColor: "#36588C !important",
    },
  
    profileInformationGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 2fr 2fr",
      gap: "20px",
      marginBottom: "15px",
    },
  
    addressSelectStyle: {
      ".MuiOutlinedInput-notchedOutline": { border: 0 },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "42px !important",
    },
  
    selectTopModalStyle: {
      ".MuiOutlinedInput-notchedOutline": { border: 0 },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      border: "1px solid #00000029",
      height: "42px !important",
      maxWidth: "24.375rem",
      padding: "13px 0px 10px 0px",
    },
  
    multiSelectOption: {
      overflow: "hidden",
    },
  
    modalTitle: {
      fontFamily: "ROBOTO !important",
      fontSize: "18px !important",
      fontWeight: "bold !important",
    },
  
    selectPlaceHolderStyle: {
      fontSize: "14px",
      color: "#1A1A1A7F",
    },
  
    checkBoxStyle: {
      color: "#70707066",
      "&.Mui-checked": {
        color: "#0097F0",
      },
    },
    title:{
      color: "#1A1A1A !important",
      fontWeight:"bold !important",
    }
  };
  
  const {
    //ADD_PROVIDER,
    PROVIDER_TYPE_MISSING,
    ROLE_MISSING,
    SPECIALITY_MISSING,
    //NAME_MISSING,
    FIRSTNAME_MISSING,
    LASTNAME_MISSING,
    NPI_NUMBER_MISSING,
    PHONE_NUMBER_MISSING,
    GROUP_NPI_MISSING,
    EMAIL_MISSING,
    WORK_LOCATION_MISSING,
    EMAIL,
    SELECT_AN_OPTION,
    INVALID_EMAIL,
    PROVIDER_TYPE,
    SELECT_SPECIALITY,
    LICENSE_NUMBER,
    INSURANCE_ACCEPTED,
    ROLE,
    FIRST_NAME,
    LAST_NAME,
    GENDER,
    NPI_NUMBER,
    ENTER_NPI_NUMBER,
    PROVIDER_PHONE_NUMBER,
    OFFICE_FAX_NUMBER,
    ENTER_PROVIDER_PHONE_NUMBER,
    LICENSED_STATE,
    YEAR_OF_EXPERIANCE,
    ENTER_EMAIL,
    BASIC_ACCOUNT_PROFILE_DATA,
    AREAS_OF_FOCUS,
    ENTER_AREAS_OF_FOCUS,
    HOSPITAL_AFFECTION,
    ENTER_HOSPITAL_AFFECTION,
    PRIOR_AUTORIZATION,
    EMP_REFERRAL_NUMER,
    ENTER_EMP_REFERRAL_NUMER,
    ACCEPT_NEW_PATIENTS,
    SECOND_OPINION,
    AGE_GROUP_SEEN,
    ACCEPT_CASH_PAY,
    ACTUAL_SPECIALITY_CARE_SERVICE,
    LANGAGE_SPOKEN,
    INSURANCE_VERIFICATION,
    PROVIDER_BIO,
    ENTER_BIO,
    EXPERTISE_IN,
    ENTER_EXPERTISE,
    WORK_EXPERIANCE,
    SAVE,
    GROUP_NPI_NUMBER,
    ENTER_GROUP_NIP_NUMBER,
    TAXONOMY_NUMBER,
    WORK_LOCATIONS,
    ENTER_WORK_EXPERIENCE,
    ENTER_TAXONOMY_NUMBER,
    ENTER_LICENSE_NUMBER,
    // PROVIDER,
    // CANCEL,
  } = adminConstants;
  
  function EditProfile({ onCloseDrawer }: { onCloseDrawer: () => void }) {
    const classStyle = selectMultiInputCommonWidget();
  
    const initialProvierProfileInfo = {
      uuid: "",
      providerType: "",
      specialities: [] as { name: string | string[] }[],
      userType: "",
      firstName: "",
      lastName: "",
      gender: "",
      npiNumber: "",
      phoneNumber: "",
      faxNumber: "",
      groupNpiNumber: "",
      email: "",
      licensedState: {
        country: "",
        state: "",
      },
      licenceNumber: "",
      insuranceAccepted: [] as { id: number; payerName: string }[],
      yearOfExperience: "",
      taxonomyNumber: "",
      workLocations: [] as { locationId: string; name: string }[],
      active: true,
      avatar: "",
      newAvatar: "",
  
      id: "",
      subSpeciality: "",
      hospitalAffilation: "",
      ageGroupSeen: "",
      languageSpoken: "",
      referralNumber: "",
      acceptNewPatients: false,
      acceptCashPay: false,
      insuranceVerification: "",
      priorAuthorisation: "",
      secondOpinion: "",
      acuteSpeciality: "",
      bio: "",
      expertiseIn: "",
      workExperience: "",
    };
  
    const validationSchema = Yup.object().shape({
      providerType: Yup.string().required(PROVIDER_TYPE_MISSING),
      specialities: Yup.string().required(SPECIALITY_MISSING),
      userType: Yup.string().required(ROLE_MISSING),
      firstName: Yup.string().required(FIRSTNAME_MISSING),
      lastName: Yup.string().required(LASTNAME_MISSING),
      email: Yup.string().email(INVALID_EMAIL).required(EMAIL_MISSING),
      npiNumber: Yup.string().required(NPI_NUMBER_MISSING),
      phoneNumber: Yup.string().required(PHONE_NUMBER_MISSING),
      groupNpiNumber: Yup.string().required(GROUP_NPI_MISSING),
      workLocations: Yup.string().required(WORK_LOCATION_MISSING),
    });
  
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
          width: 50,
        },
      },
    };
    const classes = commonWidget();
  
    const [insuranceAccepted, setinsuranceAccepted] = useState<
      { id: number; payerName: string }[]
    >([]);
  
    const [licensedState, setLicensedState] = useState<
      { id: Number; state: string; country: string }[]
    >([]);
  
    const [specialitiesList, setspecialitiesList] = useState<string[]>([]);
    const [workLocations, setWorkLocation] = useState<
      {
        locationId: string;
        name: string;
      }[]
    >([]);
  
    const [specialityError, setSpecialityError] = useState("");
  
    const handleSpecialityChange = (event: any) => {
      const {
        target: { value },
      } = event;
      let specialitiesData: { name: string | string[] }[] = [];
      setspecialitiesList(typeof value === "string" ? value.split(",") : value);
      for (let i = 0; i < value.length; i++) {
        specialitiesData.push({ name: value[i] });
      }
      setSpecialityError("");
    };
  
    //const [workLocationError, setWorkLocationError] = useState("");
  
    const handleWorkLocationChange = (event: any) => {
      const {
        target: { value },
      } = event;
      let workLocationData: { locationId: string; name: string }[] = [];
      setWorkLocation(typeof value === "string" ? value.split(",") : value);
      for (let i = 0; i < value.length; i++) {
        workLocationData.push({
          locationId: value[i].locationId,
          name: value[i].name,
        });
      }
      //setWorkLocationError("");
    };
  
    const handleInsuranceAcceptedChange = (event: any) => {
      const {
        target: { value },
      } = event;
      let insuranceAcceptedData: { id: number; payerName: string }[] = [];
      setinsuranceAccepted(typeof value === "string" ? value.split(",") : value);
      for (let i = 0; i < value.length; i++) {
        insuranceAcceptedData.push({
          id: value[i].id,
          payerName: value[i].payerName,
        });
      }
    };
  
    const handleLicensedStateChange = (event: any) => {
      const {
        target: { value },
      } = event;
      let licensedStateData: { state: string; country: string }[] = [];
      setLicensedState(typeof value === "string" ? value.split(",") : value);
      for (let i = 0; i < value.length; i++) {
        licensedStateData.push({
          state: value[i].state,
          country: value[i].country,
        });
      }
    };
  
    const handleClickAway = () => {};
  
    const handleFormSubmit = () => {};
  
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <Formik
          initialValues={initialProvierProfileInfo}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <Grid container p={2}>
                <Grid item>
                  <Grid container justifyContent={"space-between"} mb={2}>
                    <Grid item>
                      <Typography sx={addEditProviderStyle.title}>Edit Profile</Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ArrowBackIosIcon sx={backIcon} />
                      <Typography onClick={onCloseDrawer} sx={backToText}>
                        Back
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* <Close
                    sx={addEditProviderStyle.dialogClose}
                    onClick={handleClose}
                  /> */}
                  <Box>
                    <Box>
                      <Box sx={addEditProviderStyle.informationDetailsSetup}>
                        <Box>
                          <CustomFormLabel label="Provider photo" />
                          <ImageSelector />
                        </Box>
                        <Box sx={addEditProviderStyle.topModalFormContainer}>
                          <Box>
                            <Box sx={addEditProviderStyle.profileInformationGrid}>
                              <Box>
                                <CustomFormLabel
                                  label={PROVIDER_TYPE}
                                  isRequired={true}
                                />
                                <Select
                                  fullWidth
                                  displayEmpty
                                  renderValue={(selected: any) => {
                                    if (selected?.length === 0) {
                                      return (
                                        <span
                                          style={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        >
                                          {SELECT_AN_OPTION}
                                        </span>
                                      );
                                    }
                                    return (
                                      providerTypeList.find(
                                        (providerType: any) =>
                                          providerType.key === selected
                                      )?.value || ""
                                    );
                                  }}
                                  value={values.providerType}
                                  size="small"
                                  MenuProps={MenuProps}
                                  onChange={(e) =>
                                    setFieldValue("providerType", e.target.value)
                                  }
                                  sx={addEditProviderStyle.addressSelectStyle}
                                  className={
                                    errors.providerType
                                      ? classes.inputBoxError
                                      : ""
                                  }
                                >
                                  {providerTypeList?.map((providerType: any) => (
                                    <MenuItem
                                      key={providerType.key}
                                      value={providerType.key}
                                      sx={
                                        addEditProviderStyle.selectPlaceHolderStyle
                                      }
                                    >
                                      {providerType.value}
                                    </MenuItem>
                                  ))}
                                </Select>
  
                                {errors.providerType && (
                                  <FormHelperText error>
                                    {errors.providerType}
                                  </FormHelperText>
                                )}
                              </Box>
                              <Box sx={addEditProviderStyle.multiSelectOption}>
                                <CustomFormLabel
                                  label={SELECT_SPECIALITY}
                                  isRequired={true}
                                />
  
                                <Select
                                  multiple
                                  displayEmpty
                                  size="small"
                                  value={specialitiesList}
                                  MenuProps={MenuProps}
                                  onChange={(event) =>
                                    handleSpecialityChange(event)
                                  }
                                  input={<OutlinedInput />}
                                  renderValue={(selected) => {
                                    if (selected?.length === 0) {
                                      return (
                                        <span
                                          style={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        >
                                          {SELECT_AN_OPTION}
                                        </span>
                                      );
                                    }
                                    return selected.join(", ");
                                  }}
                                  inputProps={{ "aria-label": "Without label" }}
                                  fullWidth
                                  sx={addEditProviderStyle.selectTopModalStyle}
                                  className={`${classStyle.select} ${
                                    specialityError.length != 0 &&
                                    classStyle.selectError
                                  }`}
                                >
                                  {specialityTypeList?.content?.map(
                                    (speciality: any) => (
                                      <MenuItem
                                        key={speciality.id}
                                        value={speciality.name}
                                      >
                                        <Checkbox
                                          checked={
                                            specialitiesList.indexOf(
                                              speciality.name
                                            ) > -1
                                          }
                                          sx={addEditProviderStyle.checkBoxStyle}
                                        />
                                        <ListItemText
                                          primary={speciality.name}
                                          sx={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        />
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                                {specialityError.length != 0 && (
                                  <Typography color="error" variant="body2">
                                    {specialityError}
                                  </Typography>
                                )}
                              </Box>
                              <Box>
                                <CustomFormLabel label={ROLE} isRequired={true} />
  
                                <Select
                                  fullWidth
                                  displayEmpty
                                  renderValue={(selected: any) => {
                                    if (selected?.length === 0) {
                                      return (
                                        <span
                                          style={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        >
                                          {SELECT_AN_OPTION}
                                        </span>
                                      );
                                    }
                                    return (
                                      providerRoleList.find(
                                        (userRole: any) =>
                                          userRole.key === selected
                                      )?.value || ""
                                    );
                                  }}
                                  value={values.userType}
                                  size="small"
                                  MenuProps={MenuProps}
                                  onChange={(e) =>
                                    setFieldValue("userType", e.target.value)
                                  }
                                  sx={addEditProviderStyle.addressSelectStyle}
                                  className={
                                    errors.userType ? classes.inputBoxError : ""
                                  }
                                >
                                  {providerRoleList?.map((role: any) => (
                                    <MenuItem
                                      key={role.key}
                                      value={role.key}
                                      sx={
                                        addEditProviderStyle.selectPlaceHolderStyle
                                      }
                                    >
                                      {role.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {errors.userType && (
                                  <FormHelperText error>
                                    {errors.userType}
                                  </FormHelperText>
                                )}
                              </Box>
                            </Box>
  
                            <Box sx={addEditProviderStyle.profileInformationGrid}>
                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "2fr 2fr",
                                  gap: "10px",
                                }}
                              >
                                <Box>
                                  <CustomFormLabel
                                    label={FIRST_NAME}
                                    isRequired={true}
                                  />
                                  <InputBase
                                    fullWidth
                                    placeholder={FIRST_NAME}
                                    value={values.firstName}
                                    classes={{
                                      root: classes.textFieldRoot,
                                      input: classes.textFieldInput,
                                      focused: classes.textFieldActive,
                                      error:
                                        errors.firstName && classes.inputBoxError,
                                    }}
                                    onChange={(e) =>
                                      setFieldValue("firstName", e.target.value)
                                    }
                                    error={!!errors.firstName}
                                  />
                                  {errors.firstName && (
                                    <FormHelperText error>
                                      {errors.firstName}
                                    </FormHelperText>
                                  )}
                                </Box>
                                <Box>
                                  <CustomFormLabel
                                    label={LAST_NAME}
                                    isRequired={true}
                                  />
                                  <InputBase
                                    fullWidth
                                    placeholder={LAST_NAME}
                                    value={values.lastName}
                                    classes={{
                                      root: classes.textFieldRoot,
                                      input: classes.textFieldInput,
                                      focused: classes.textFieldActive,
                                      error:
                                        errors.lastName && classes.inputBoxError,
                                    }}
                                    onChange={(e) =>
                                      setFieldValue("lastName", e.target.value)
                                    }
                                    error={!!errors.lastName}
                                  />
                                  {errors.lastName && (
                                    <FormHelperText error>
                                      {errors.lastName}
                                    </FormHelperText>
                                  )}
                                </Box>
                              </Box>
                              <Box>
                                <CustomFormLabel label={GENDER} />
                                <SelectInput
                                  placeholder={SELECT_AN_OPTION}
                                  options={Gender}
                                  onChange={(e: any) =>
                                    setFieldValue("gender", e.target.value)
                                  }
                                ></SelectInput>
                              </Box>
                              <Box>
                                <CustomFormLabel
                                  label={NPI_NUMBER}
                                  isRequired={true}
                                />
                                <InputBase
                                  fullWidth
                                  value={values.npiNumber}
                                  placeholder={ENTER_NPI_NUMBER}
                                  classes={{
                                    root: classes.textFieldRoot,
                                    input: classes.textFieldInput,
                                    focused: classes.textFieldActive,
                                    error:
                                      errors.npiNumber && classes.inputBoxError,
                                  }}
                                  onChange={(e) =>
                                    setFieldValue("npiNumber", e.target.value)
                                  }
                                  error={!!errors.npiNumber}
                                />
                                {errors.npiNumber && (
                                  <FormHelperText error>
                                    {errors.npiNumber}
                                  </FormHelperText>
                                )}
                              </Box>
                            </Box>
  
                            <Box sx={addEditProviderStyle.profileInformationGrid}>
                              <Box>
                                <CustomFormLabel
                                  label={PROVIDER_PHONE_NUMBER}
                                  isRequired={true}
                                />
                                <InputBase
                                  fullWidth
                                  value={values.phoneNumber}
                                  placeholder={ENTER_PROVIDER_PHONE_NUMBER}
                                  classes={{
                                    root: classes.textFieldRoot,
                                    input: classes.textFieldInput,
                                    focused: classes.textFieldActive,
                                    error:
                                      errors.phoneNumber && classes.inputBoxError,
                                  }}
                                  onChange={(e) =>
                                    setFieldValue("phoneNumber", e.target.value)
                                  }
                                  error={!!errors.phoneNumber}
                                />
                                {errors.phoneNumber && (
                                  <FormHelperText error>
                                    {errors.phoneNumber}
                                  </FormHelperText>
                                )}
                              </Box>
                              <Box>
                                <CustomFormLabel label={OFFICE_FAX_NUMBER} />
                                <InputBase
                                  fullWidth
                                  placeholder={ENTER_TAXONOMY_NUMBER}
                                  classes={{
                                    root: classes.textFieldRoot,
                                    input: classes.textFieldInput,
                                    focused: classes.textFieldActive,
                                  }}
                                />
                              </Box>
                              <Box>
                                <CustomFormLabel
                                  label={GROUP_NPI_NUMBER}
                                  isRequired={true}
                                />
                                <InputBase
                                  fullWidth
                                  value={values.groupNpiNumber}
                                  placeholder={ENTER_GROUP_NIP_NUMBER}
                                  classes={{
                                    root: classes.textFieldRoot,
                                    input: classes.textFieldInput,
                                    focused: classes.textFieldActive,
                                    error:
                                      errors.groupNpiNumber &&
                                      classes.inputBoxError,
                                  }}
                                  onChange={(e) =>
                                    setFieldValue(
                                      "groupNpiNumber",
                                      e.target.value
                                    )
                                  }
                                  error={!!errors.groupNpiNumber}
                                />
                                {errors.groupNpiNumber && (
                                  <FormHelperText error>
                                    {errors.groupNpiNumber}
                                  </FormHelperText>
                                )}
                              </Box>
                            </Box>
  
                            <Box sx={addEditProviderStyle.profileInformationGrid}>
                              <Box sx={addEditProviderStyle.multiSelectOption}>
                                <CustomFormLabel label={LICENSED_STATE} />
  
                                <Select
                                  multiple
                                  displayEmpty
                                  size="small"
                                  value={licensedState}
                                  input={<OutlinedInput />}
                                  MenuProps={MenuProps}
                                  onChange={(event) =>
                                    handleLicensedStateChange(event)
                                  }
                                  renderValue={(selected: any) => {
                                    if (selected?.length === 0) {
                                      return (
                                        <span
                                          style={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        >
                                          {SELECT_AN_OPTION}
                                        </span>
                                      );
                                    }
                                    const states = selected?.map(
                                      (state: any) => state.state
                                    );
                                    return states?.join(", ");
                                  }}
                                  inputProps={{ "aria-label": "Without label" }}
                                  fullWidth
                                  sx={addEditProviderStyle.selectTopModalStyle}
                                >
                                  {providerLicensedStateList?.content?.map(
                                    (state: any) => (
                                      <MenuItem key={state.id} value={state}>
                                        <Checkbox
                                          checked={licensedState?.some(
                                            (item) => item.id === state.id
                                          )}
                                          sx={addEditProviderStyle.checkBoxStyle}
                                        />
                                        <ListItemText
                                          primary={state.state}
                                          sx={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        />
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </Box>
                              <Box>
                                <CustomFormLabel label={LICENSE_NUMBER} />
                                <InputBase
                                  fullWidth
                                  placeholder={ENTER_LICENSE_NUMBER}
                                  classes={{
                                    root: classes.textFieldRoot,
                                    input: classes.textFieldInput,
                                    focused: classes.textFieldActive,
                                  }}
                                />
                              </Box>
                              <Box sx={addEditProviderStyle.multiSelectOption}>
                                <CustomFormLabel label={INSURANCE_ACCEPTED} />
                                <Select
                                  multiple
                                  displayEmpty
                                  size="small"
                                  value={insuranceAccepted}
                                  input={<OutlinedInput />}
                                  MenuProps={MenuProps}
                                  onChange={(event) =>
                                    handleInsuranceAcceptedChange(event)
                                  }
                                  renderValue={(selected: any) => {
                                    if (selected?.length === 0) {
                                      return (
                                        <span
                                          style={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        >
                                          {SELECT_AN_OPTION}
                                        </span>
                                      );
                                    }
                                    const payerNames = selected?.map(
                                      (payer: any) => payer.payerName
                                    );
                                    return payerNames?.join(", ");
                                  }}
                                  inputProps={{ "aria-label": "Without label" }}
                                  fullWidth
                                  sx={addEditProviderStyle.selectTopModalStyle}
                                >
                                  {providerInsuranceAcceptedList?.content?.map(
                                    (insurance: any) => (
                                      <MenuItem
                                        key={insurance.id}
                                        value={insurance}
                                      >
                                        <Checkbox
                                          checked={insuranceAccepted.some(
                                            (item) => item.id === insurance.id
                                          )}
                                          sx={addEditProviderStyle.checkBoxStyle}
                                        />
                                        <ListItemText
                                          primary={insurance.payerName}
                                          sx={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        />
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </Box>
                            </Box>
  
                            <Box sx={addEditProviderStyle.profileInformationGrid}>
                              <Box>
                                <CustomFormLabel label={YEAR_OF_EXPERIANCE} />
                                <SelectInput
                                  // isEditForm={isEditProviderPage}
                                  placeholder={SELECT_AN_OPTION}
                                  options={YearOfexperiance}
                                  onChange={(e: any) =>
                                    setFieldValue(
                                      "yearOfExperience",
                                      e.target.value
                                    )
                                  }
                                ></SelectInput>
                              </Box>
                              <Box>
                                <CustomFormLabel label={TAXONOMY_NUMBER} />
                                <InputBase
                                  fullWidth
                                  name="lastName"
                                  type="text"
                                  placeholder={ENTER_TAXONOMY_NUMBER}
                                  classes={{
                                    root: classes.textFieldRoot,
                                    input: classes.textFieldInput,
                                    focused: classes.textFieldActive,
                                  }}
                                />
                              </Box>
                              <Box sx={addEditProviderStyle.multiSelectOption}>
                                <CustomFormLabel
                                  label={WORK_LOCATIONS}
                                  isRequired={true}
                                />
                                <Select
                                  multiple
                                  displayEmpty
                                  size="small"
                                  value={workLocations}
                                  MenuProps={MenuProps}
                                  onChange={(event) =>
                                    handleWorkLocationChange(event)
                                  }
                                  input={<OutlinedInput />}
                                  renderValue={(selected: any) => {
                                    if (selected?.length === 0) {
                                      return (
                                        <span
                                          style={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        >
                                          {SELECT_AN_OPTION}
                                        </span>
                                      );
                                    }
                                    const checkWorkLocations = selected?.map(
                                      (workLocation: any) => workLocation.name
                                    );
                                    return checkWorkLocations?.join(", ");
                                  }}
                                  inputProps={{ "aria-label": "Without label" }}
                                  fullWidth
                                  sx={addEditProviderStyle.selectTopModalStyle}
                                  //   className={`${classStyle.select} ${
                                  //     workLocationError.length != 0 &&
                                  //     classStyle.selectError
                                  //   }`}
                                >
                                  {providerWorkLocationList?.content.map(
                                    (location: any) => (
                                      <MenuItem
                                        key={location.locationId}
                                        value={location}
                                      >
                                        <Checkbox
                                          checked={workLocations.some(
                                            (item) =>
                                              item.locationId ===
                                              location.locationId
                                          )}
                                          sx={addEditProviderStyle.checkBoxStyle}
                                        />
                                        <ListItemText
                                          primary={location.name}
                                          sx={
                                            addEditProviderStyle.selectPlaceHolderStyle
                                          }
                                        />
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </Box>
                            </Box>
  
                            <Box sx={addEditProviderStyle.profileInformationGrid}>
                              <Box>
                                <CustomFormLabel
                                  label={EMAIL}
                                  isRequired={true}
                                />
                                <InputBase
                                  fullWidth
                                  value={values.email}
                                  placeholder={ENTER_EMAIL}
                                  classes={{
                                    root: classes.textFieldRoot,
                                    input: classes.textFieldInput,
                                    focused: classes.textFieldActive,
                                    error: errors.email && classes.inputBoxError,
                                  }}
                                  //   sx={{
                                  //     background: isEditProviderPage
                                  //       ? backgroudColor.tableHead
                                  //       : "none",
                                  //   }}
                                  onChange={(e) =>
                                    setFieldValue("email", e.target.value)
                                  }
                                  error={!!errors.email}
                                  disabled={false}
                                />
                                {errors.email && (
                                  <FormHelperText error>
                                    {errors.email}
                                  </FormHelperText>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
  
                    <Box>
                      <Typography
                        sx={{
                          margin: "20px 0 10px 0",
                          color: "#1B5984 !important",
                          fontSize: "16px !important",
                        }}
                      >
                        {BASIC_ACCOUNT_PROFILE_DATA}
                      </Typography>
                      <Box>
                        <Box sx={addEditProviderStyle.accountsInfo}>
                          <Box sx={addEditProviderStyle.accountsSubDetailsSetup2}>
                            <Box>
                              <CustomFormLabel label={AREAS_OF_FOCUS} />
                              <InputBase
                                fullWidth
                                // value={basicAccountData.subSpeciality}
                                placeholder={ENTER_AREAS_OF_FOCUS}
                                classes={{
                                  root: classes.textFieldRoot,
                                  input: classes.textFieldInput,
                                  focused: classes.textFieldActive,
                                }}
                                // onChange={(e: any) => handleProviderProfileValues(e)}
                              />
                            </Box>
                            <Box>
                              <CustomFormLabel label={HOSPITAL_AFFECTION} />
                              <InputBase
                                fullWidth
                                // value={basicAccountData.hospitalAffilation}
                                placeholder={ENTER_HOSPITAL_AFFECTION}
                                classes={{
                                  root: classes.textFieldRoot,
                                  input: classes.textFieldInput,
                                  focused: classes.textFieldActive,
                                }}
                                // onChange={(e: any) => handleProviderProfileValues(e)}
                              />
                            </Box>
                            <Box>
                              <CustomFormLabel label={PRIOR_AUTORIZATION} />
                              <SelectInput
                                // isEditForm={isEditProviderPage}
                                placeholder={SELECT_AN_OPTION}
                                options={EnrollSelection}
                                onChange={(e: any) =>
                                  setFieldValue(
                                    "priorAuthorisation",
                                    e.target.value
                                  )
                                }
                              ></SelectInput>
                            </Box>
                          </Box>
  
                          <Box sx={addEditProviderStyle.accountsSubDetailsSetup2}>
                            <Box>
                              <CustomFormLabel label={EMP_REFERRAL_NUMER} />
                              <InputBase
                                fullWidth
                                // value={basicAccountData.referralNumber}
                                placeholder={ENTER_EMP_REFERRAL_NUMER}
                                classes={{
                                  root: classes.textFieldRoot,
                                  input: classes.textFieldInput,
                                  focused: classes.textFieldActive,
                                }}
                                // onChange={(e: any) => handleProviderProfileValues(e)}
                              />
                            </Box>
                            <Box>
                              <CustomFormLabel label={ACCEPT_NEW_PATIENTS} />
                              <SelectInput
                                // isEditForm={isEditProviderPage}
                                placeholder={SELECT_AN_OPTION}
                                options={NewPatientsAndCashpay}
                                onChange={(e: any) =>
                                  setFieldValue(
                                    "acceptNewPatients",
                                    e.target.value
                                  )
                                }
                              ></SelectInput>
                            </Box>
                            <Box>
                              <CustomFormLabel label={SECOND_OPINION} />
                              <SelectInput
                                // isEditForm={isEditProviderPage}
                                placeholder={SELECT_AN_OPTION}
                                options={EnrollSelection}
                                onChange={(e: any) =>
                                  setFieldValue("secondOpinion", e.target.value)
                                }
                              ></SelectInput>
                            </Box>
                          </Box>
  
                          <Box sx={addEditProviderStyle.accountsSubDetailsSetup2}>
                            <Box>
                              <CustomFormLabel label={AGE_GROUP_SEEN} />
                              <SelectInput
                                // isEditForm={isEditProviderPage}
                                placeholder={SELECT_AN_OPTION}
                                options={AgeGroupSeen}
                                onChange={(e: any) =>
                                  setFieldValue("ageGroupSeen", e.target.value)
                                }
                              ></SelectInput>
                            </Box>
                            <Box>
                              <CustomFormLabel label={ACCEPT_CASH_PAY} />
                              <SelectInput
                                // isEditForm={isEditProviderPage}
                                placeholder={SELECT_AN_OPTION}
                                options={NewPatientsAndCashpay}
                                onChange={(e: any) =>
                                  setFieldValue("acceptCashPay", e.target.value)
                                }
                              ></SelectInput>
                            </Box>
                            <Box>
                              <CustomFormLabel
                                label={ACTUAL_SPECIALITY_CARE_SERVICE}
                              />
                              <SelectInput
                                // isEditForm={isEditProviderPage}
                                placeholder={SELECT_AN_OPTION}
                                options={EnrollSelection}
                                onChange={(e: any) =>
                                  setFieldValue("acuteSpeciality", e.target.value)
                                }
                              ></SelectInput>
                            </Box>
                          </Box>
  
                          <Box sx={addEditProviderStyle.accountsSubDetailsSetup2}>
                            <Box>
                              <CustomFormLabel label={LANGAGE_SPOKEN} />
                              <SelectInput
                                // isEditForm={isEditProviderPage}
                                placeholder={SELECT_AN_OPTION}
                                options={languagesSpoken}
                                onChange={(e: any) =>
                                  setFieldValue("languageSpoken", e.target.value)
                                }
                              ></SelectInput>
                            </Box>
                            <Box>
                              <CustomFormLabel label={INSURANCE_VERIFICATION} />
                              <SelectInput
                                // isEditForm={isEditProviderPage}
                                placeholder={SELECT_AN_OPTION}
                                options={EnrollSelection}
                                onChange={(e: any) =>
                                  setFieldValue(
                                    "insuranceVerification",
                                    e.target.value
                                  )
                                }
                              ></SelectInput>
                            </Box>
                          </Box>
                        </Box>
  
                        <Box sx={{ marginTop: "20px" }}>
                          <CustomFormLabel label={PROVIDER_BIO} />
                          <InputBase
                            // {...addEditProviderProfileForm.providerBio}
                            fullWidth
                            rows="3"
                            // value={basicAccountData.bio}
                            multiline={true}
                            placeholder={ENTER_BIO}
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                          />
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                          <CustomFormLabel label={EXPERTISE_IN} />
                          <InputBase
                            fullWidth
                            rows="3"
                            multiline={true}
                            placeholder={ENTER_EXPERTISE}
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                          />
                        </Box>
                        <Box sx={{ marginTop: "20px" }}>
                          <CustomFormLabel label={WORK_EXPERIANCE} />
                          <InputBase
                            fullWidth
                            multiline={true}
                            rows="3"
                            placeholder={ENTER_WORK_EXPERIENCE}
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
  
                  <Grid container sx={actionBtns} mt={3} justifyContent={'end'}>
                    <ButtonBase sx={formButtonStyle.saveButtonStyle}>
                      {SAVE}
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </ClickAwayListener>
    );
  }
  
  export default EditProfile;
  