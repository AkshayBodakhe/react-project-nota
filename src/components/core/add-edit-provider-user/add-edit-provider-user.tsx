import {
  Autocomplete,
  Box,
  // Button,
  ButtonBase,
  Checkbox,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormHelperText,
  Grid,
  InputBase,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import CustomFormLabel from "../../common/custom-form-label";
// import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { adminConstants } from "../../../constants/admin";
import { Enums } from "../../../pages/app/admin/provider-groups/common-files/enums";
import {
  User,
  UserControllerService,
} from "../../../sdk/thinkemr-core-0.0.1/requests";
import providerGroupService from "../../../service/provider-group--service";
import {
  actionBtns,
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../styles/common";
import {
  EnrollSelection,
  Gender,
  providerTypeList,
  YearOfexperiance,
} from "../../common/form-enum";
import ImageSelector from "../../common/image-upload";
import SelectInput from "../../common/select-input";
// import { setAlert } from "../../../redux/actions/snackbar/alert.action";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { multiSelectDropDown } from "../../../../src/pages/app/provider/patient/add-new-patient";
import Loading from "../../../components/common/spinner/loading";
import { patientStyle } from "../../../pages/app/provider/patient/style/commonStyle";
import {
  useProviderGroupControllerServiceAddSpecialities,
  useProviderGroupControllerServiceGetAllCountries,
  useProviderGroupControllerServiceGetAllLanguages,
  useProviderGroupControllerServiceGetAllSpecialities,
} from "../../../sdk/thinkemr-core-0.0.1/queries";
import { alertAction } from "../../../store/features/common-actions/snackbar/alertSlice";
import { setDetailData } from "../../../store/features/common-actions/user-detail/userDetailSlice";

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

export const addEditProviderStyle = {
  dialogClose: {
    position: "absolute",
    right: "28px",
    cursor: "pointer",
    fontSize: "14px !important",
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
    fontSize: "14px!important",
    color: "#1A1A1A7F",
  },

  checkBoxStyle: {
    color: "#70707066",
    "&.Mui-checked": {
      color: "#0097F0",
    },
  },
};

const {
  //ADD_PROVIDER,
  // PROVIDER_TYPE_MISSING,
  // ROLE_MISSING,
  // SPECIALITY_MISSING,
  //NAME_MISSING,
  // FIRSTNAME_MISSING,
  // LASTNAME_MISSING,
  // NPI_NUMBER_MISSING,
  // PHONE_NUMBER_MISSING,
  // GROUP_NPI_MISSING,
  // EMAIL_MISSING,
  // WORK_LOCATION_MISSING,
  EMAIL,
  SELECT_AN_OPTION,
  SELECT_SPECIALITY_TYPE,
  // INVALID_EMAIL,
  PROVIDER_TYPE,
  SELECT_SPECIALITY,
  LICENSE_NUMBER,
  // INSURANCE_ACCEPTED,
  ROLE,
  FIRST_NAME,
  LAST_NAME,
  GENDER,
  NPI_NUMBER,
  ENTER_NPI_NUMBER,
  PROVIDER_PHONE_NUMBER,
  OFFICE_FAX_NUMBER,
  ENTER_FAX_NUMBER,
  ENTER_PROVIDER_PHONE_NUMBER,
  LICENSED_STATE,
  YEAR_OF_EXPERIANCE,
  ENTER_EMAIL,
  BASIC_ACCOUNT_PROFILE_DATA,
  // AREAS_OF_FOCUS,
  // ENTER_AREAS_OF_FOCUS,
  // HOSPITAL_AFFECTION,
  // ENTER_HOSPITAL_AFFECTION,
  PRIOR_AUTORIZATION,
  // DEPARTMENT_NAME,
  // EMP_REFERRAL_NUMER,
  // ENTER_EMP_REFERRAL_NUMER,
  // ACCEPT_NEW_PATIENTS,
  // SECOND_OPINION,
  // AGE_GROUP_SEEN,
  // ACCEPT_CASH_PAY,
  // ACTUAL_SPECIALITY_CARE_SERVICE,
  LANGAGE_SPOKEN,
  INSURANCE_VERIFICATION,
  PROVIDER_BIO,
  ENTER_BIO,
  EXPERTISE_IN,
  ENTER_EXPERTISE,
  WORK_EXPERIANCE,
  SAVE,
  ADD,
  GROUP_NPI_NUMBER,
  ENTER_GROUP_NIP_NUMBER,
  TAXONOMY_NUMBER,
  WORK_LOCATIONS,
  ENTER_WORK_EXPERIENCE,
  ENTER_TAXONOMY_NUMBER,
  ENTER_LICENSE_NUMBER,
  // PROVIDER,
  CANCEL,
} = adminConstants;

interface AddProviderProps {
  title: string;
  source: string;
  getRequestBody?: any;
  GetProviderProfileDetails?: any;
  open: boolean;
  setOpen?: any;
  scroll?: string;
  editUserData?: any;
  providerUuid?: any;
  onClose?: any;
  setStaffUser?: any;
  apiSource?: any;
  isEditProviderPage?: boolean;
  providerGroupNpiNumber?: string;
  refetchProviderUser?: any;
  providerWorkLocationList: any[];
  providerLicensedStateList: any[];
  providerGroupSpecialities: any[];
  userRolesList: any[];
  providerGrpNpi?: string;
  setRefetchUsers?: any;
  refetch?: any;
  // insuranceAcceptedList: any[]
}

function AddEditProviderUser(props: AddProviderProps) {
  const {
    title,
    // source,
    open,
    setOpen,
    refetch,
    //GetProviderProfileDetails,
    //apiSource,
    providerUuid,
    userRolesList,
    providerGrpNpi,
    setRefetchUsers,
    //providerGroupNpiNumber,
  } = props;
  // const classStyle = selectMultiInputCommonWidget();

  // const providerGrpNpiNumber = useSelector(
  //   (state: any) => state.commonReducer.userDetail.data
  // );

  const [initialProvierProfileInfo] = useState({
    uuid: "",
    providerType: "",
    specialities: [] as { name: string | string[] }[],
    role: userRolesList?.filter(
      (userRole: any) => userRole?.name === "PROVIDER"
    ),
    firstName: "",
    lastName: "",
    gender: "",
    npi: "",
    contactNumber: "",
    fax: "",
    groupNpi: providerGrpNpi || null,
    email: "",
    roleType: User.roleType.PROVIDER,
    // licensedStates: "",
    countries: [],
    licenseNumber: "",
    // acceptedInsurances: [] as { id: number; payerName: string }[],
    experienceYears: "",
    taxonomyNumber: "",
    workLocations: [] as { uuid: string; name: string }[],
    active: true,
    avatar: null,
    newAvatar: null,
    languages: [],
    // departmentName: '',
    licenseExpiryDate: "",
    providerProfileInfo: {
      // id: "",
      // focusedArea: "",
      // hospitalAffilation: "",
      // ageGroupSeen: "",
      // referralNumber: "",
      // acceptNewPatients: false,
      // acceptCashPay: false,
      // secondOpinion: "",
      // acuteSpeciality: "",
      bio: "",
      expertise: "",
      experience: "",
    },
  });
  const styles = patientStyle();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .min(2, "First Name must be at least two characters long")
      .required("Please enter the first name")
      .matches(/^[A-Za-z ]+$/, "Please enter the valid first name"),
    lastName: Yup.string()
      .trim()
      .min(2, "Last Name must be at least two characters long")
      .required("Please enter the last name")
      .matches(/^[A-Za-z ]+$/, "Please enter the valid last name"),
    providerType: Yup.string().required("Please select the provider type"),
    // role: Yup.string(),
    email: Yup.string()
      .email("Please enter the valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter the valid email"
      )
      .required("Please enter the valid email"),
    npi: Yup.string()
      .matches(/^\d+$/, "Please enter the valid Provider NPI number")
      .min(10, "Provider NPI number should be at least 10 digits")
      .max(10, "Provider NPI number should not exceed 10 digits"),
    // .required("NPI number is a required field")
    contactNumber: Yup.string()
      .required("Please enter the contact number")
      .matches(/^\d+$/, "Please enter the valid contact number")
      .min(10, "Contact number should be at least 10 digits")
      .max(10, "Contact number should not exceed 10 digits"),
    // groupNpi: Yup.string().required('Group NPI Required')
    //   .matches(/^\d{10}$/, 'NPI number must be exactly 10 digits'),
    gender: Yup.string().required("Please select the gender"),
    providerProfileInfo: Yup.object().shape({
      expertise: Yup.string(),
      // .required("Expertise is a required field"),
      // experience: Yup.string(),
      // .required("Experience is a required field"),
    }),
    // departmentName: Yup.string().trim().min(2, 'In-valid Name').required('Department name is required'),
    // licenseNumber: Yup.string()
    //   .notRequired()
    //   .matches(/^[0-9]+$/, "Please enter the valid license number"),
    licensedStates: Yup.string().matches(
      /^[A-Za-z0-9]+$/,
      "Please enter the valid licensed state"
    ),

    // .required("License number is a required field")
    // .matches(/^[A-Za-z0-9]+$/, "License number should be alphanumeric"),
    fax: Yup.string()
      .notRequired()
      .matches(/^[0-9]+$/, "Please enter the valid fax number"),
    // .required("Please select the spoken language"),
    taxonomyNumber: Yup.string()
      .max(10, "Taxonomy number should not exceed 10 digits")
      .matches(/^[A-Za-z0-9]+$/, "Please enter the valid taxonomy number"),
    insuranceVerification: Yup.string().optional(),
    // .required(
    //   "Insurance verification is a required field"
    // ),
    priorAuthorisations: Yup.string().optional(),
    // .required(
    //   "Prior authorization is a required field"
    // ),
    experienceYears: Yup.string(),
    // .required(
    //   "Experience years is a required field"
    // ),
  });

  const [scroll] = useState<DialogProps["scroll"]>("paper");
  let { id: providerGroupUuid } = useParams();
  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
  }
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
  const dispatch = useDispatch();
  const [tenantId] = useState(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );
  // const [insuranceAccepted, setinsuranceAccepted] = useState<{ id: number; payerName: string }[]>([]);
  const [licensedState, setLicensedState] = useState<
    { id: Number; state: string; country: string }[]
  >([]);
  const [licensedStateData, setLicensedStateData] = useState<
    { state: string; country: string }[]
  >([]);

  const [specialities, setSpecialities] = useState<string[]>([]);
  const [workLocations, setWorkLocation] = useState<
    { uuid: string; name: string }[]
  >([]);
  const [workLocationData, setWorkLocationData] = useState<
    { uuid: string; name: string }[]
  >([]);
  const [specialitiesListData, setSpecialitiesListData] = useState<
    { name: string | string[] }[]
  >([]);
  // const [insuranceAcceptedData, setInsuranceAcceptedData] = useState<{ id: number; payerName: string }[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [providerWorkLocationList, setProviderWorkLocationList] = useState<
    any[]
  >([]);
  const [providerLicensedStateList, setProviderLicensedStateList] = useState<
    any[]
  >([]);
  const [providerGroupSpecialities, setProviderGroupSpecialities] = useState<
    any[]
  >([]);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [countryList, setCountryList] = useState<any[]>([]);
  const { data: countryData, isSuccess } =
    useProviderGroupControllerServiceGetAllCountries({
      page: 0,
      size: 20,
    });

  const { data: languageList, isSuccess: getLanguages } =
    useProviderGroupControllerServiceGetAllLanguages({});
  const [languagesSpoken, setLanguageSpoken] = useState(null);

  useEffect(() => {
    if (getLanguages && !!languageList) {
      setLanguageSpoken(languageList?.data?.content);
    }
  }, [getLanguages]);

  useEffect(() => {
    if (isSuccess && !!countryData) {
      setCountryList(countryData?.data?.content);
    }
  }, [isSuccess]);

  // const [insuranceAcceptedList, setInsuranceAcceptedList] = useState<any[]>([]);
  // const [otherSpecilityVal, setOtherSpecialityVal] = useState<{}>();
  const [specialitiesPagination, setSpecialitiesPagination] = useState({
    page: 0,
    size: 10,
  });

  const handleClose = () => {
    setOpen((item: boolean) => !item);
  };

  const handleClosedSpecialityDialog = () => {
    setOpenDialog((item) => !item);
    formikData.resetForm();
  };

  const selectRef = useRef(null);

  // const [specialityError, setSpecialityError] = useState("");

  useEffect(() => {
    getAllRolesWithDefault();
  }, []);

  useEffect(() => {
    if (props.providerLicensedStateList.length)
      setProviderLicensedStateList(props.providerLicensedStateList);
    if (props.providerGroupSpecialities.length) {
      type spec = [
        {
          id: string;
          name: string;
        }
      ];
      const newSpeciality: spec = [
        {
          id: "0",
          name: "Add new speciality",
        },
      ];
      setProviderGroupSpecialities([
        ...newSpeciality,
        ...props.providerGroupSpecialities,
      ]);
    }
    if (props.providerWorkLocationList.length) {
      const workLocationNew = props.providerWorkLocationList.map((item) => {
        return {
          uuid: item?.uuid,
          name: item?.name,
        };
      });
      setProviderWorkLocationList(workLocationNew);
    } else getWorkLocations();
    if (props.userRolesList?.length) setUserRoles(props.userRolesList);
    else getAllRolesWithDefault();
    // if (props.insuranceAcceptedList.length) setInsuranceAcceptedList(props.insuranceAcceptedList);
    // else getAllInsuranceAccepted();

    if (providerUuid?.uuid) patchData(providerUuid);
  }, [providerUuid]);

  // const getProviderById = (providerUuid: string) => {

  //   try {
  //     providerGroupService.getProviderById(tenantId, providerUuid).then((provider: any) => {
  //       if (provider?.data && provider.data?.data) {
  //         console.log("provider :: ", provider);
  //       }
  //     })
  //   } catch (error) {

  //   }
  // }

  const patchData = (provider: any) => {
    providerGroupService
      .getProviderById(tenantId, provider.uuid)
      .then((res) => {
        if (res?.data && res.data?.data) {
          const editData: any = res.data.data;
          Object.keys(editData).map((key: any) => {
            if (key === "role") {
              formik.setFieldValue(
                "role",
                (userRolesList?.length !== 0 &&
                  userRolesList?.find(
                    (userRole: any) => userRole?.name === "PROVIDER"
                  )?.uuid) ||
                  ""
              );
            } else if (editData[key] !== null) {
              formik.setFieldValue(key, editData[key]);
            }
          });
          setLicensedState(editData.licensedStates);
          setUserRoles(userRolesList || []);
          setSpecialities(
            editData.specialities?.map((res: any) => res.name) || []
          );
          setSpecialitiesListData(editData.specialities || []);
          setLicensedStateData(editData.licensedStates);
          const updatedWorkLocations = editData?.workLocations?.map(
            (item: any) => {
              return {
                uuid: item?.uuid,
                name: item?.name,
              };
            }
          );
          setWorkLocation(updatedWorkLocations || []);
          const updatedWorkLocationData = editData?.workLocations?.map(
            (item: any) => {
              return {
                uuid: item?.uuid,
                name: item?.name,
              };
            }
          );
          setWorkLocationData(updatedWorkLocationData || []);
        }
      });
    // if(providerData)
    // setWorkLocation(editData.specialities);
    // setWorkLocationData(editData.specialities);
    // setinsuranceAccepted(editData.acceptedInsurances);
    // setInsuranceAcceptedData(editData.acceptedInsurances);
  };

  const handleSpecialityChange = (event: any) => {
    const {
      target: { value },
    } = event;

    const newSpec = value.filter(
      (item: string) => item !== "Add new speciality"
    );

    let specialitiesData: { name: string | string[] }[] = [];
    setSpecialities(typeof newSpec === "string" ? newSpec.split(",") : newSpec);

    for (let i = 0; i < value.length; i++) {
      specialitiesData.push({ name: value[i] });
    }

    setSpecialitiesListData(specialitiesData);
    const val = event.target.value;
    if (val.includes("Add new speciality")) {
      setOpenDialog((item) => !item);
    }
  };

  //const [workLocationError, setWorkLocationError] = useState("");

  const handleWorkLocationChange = (event: any) => {
    const {
      target: { value },
    } = event;
    let workLocationData: { uuid: string; name: string }[] = [];
    setWorkLocation(typeof value === "string" ? value.split(",") : value);
    for (let i = 0; i < value.length; i++) {
      if (!workLocationData.includes(value[i].uuid)) {
        workLocationData.push({
          uuid: value[i].uuid,
          name: value[i].name,
        });
      }
    }
    setWorkLocationData(workLocationData);
    //setWorkLocationError("");
  };

  // const handleInsuranceAcceptedChange = (event: any) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   let insuranceAcceptedData: { id: number; payerName: string }[] = [];
  //   setinsuranceAccepted(typeof value === "string" ? value.split(",") : value);
  //   for (let i = 0; i < value.length; i++) {
  //     insuranceAcceptedData.push({
  //       id: value[i].id,
  //       payerName: value[i].payerName,
  //     });
  //   }
  //   setInsuranceAcceptedData(insuranceAcceptedData);
  // };

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
    setLicensedStateData(licensedStateData);
  };

  const handleClickAway = () => {};

  // const getAllLicensedStates = async () => {
  //   try {
  //     await providerGroupService
  //       .getAllLicensedStates(tenantId)
  //       .then((states: any) => {
  //         if (states?.data && states.data?.data) {
  //           setProviderLicensedStateList(states.data.data.content);
  //         }
  //       });
  //   } catch (error) {
  //     console.log("Error while fetching licensed states");
  //   }
  // };

  const {
    data,
    isLoading,
    isError,
    refetch: callSpecilities,
  } = useProviderGroupControllerServiceGetAllSpecialities({
    page: specialitiesPagination.page,
    size: specialitiesPagination.size,
  });

  useEffect(() => {
    // if (isError) callSpecilities();
    if (data?.data && data.data?.content) {
      const newSpec = [
        {
          id: "0",
          name: "Add new speciality",
        },
      ];
      setProviderGroupSpecialities([...newSpec, ...data.data.content]);
    }
  }, [data?.data, isLoading]);

  // const getAllSpecialities = () => {
  //   providerGroupService
  //     .getAllSpecialities(
  //       tenantId,
  //       specialitiesPagination.page,
  //       specialitiesPagination.size
  //     )
  //     .then((specialities: any) => {
  //       if (specialities?.data && specialities.data?.data) {
  //         const newSpec = [
  //           {
  //             id: "0",
  //             name: "Add new speciality",
  //           },
  //         ];
  //         setProviderGroupSpecialities([
  //           ...newSpec,
  //           ...specialities.data.data.content,
  //         ]);
  //       }
  //     });
  // };

  const getWorkLocations = () => {
    providerGroupService
      .getAllLocations(
        tenantId,
        0,
        10,
        "created",
        "desc",
        "",
        providerGroupUuid
      )
      .then((res: any) => {
        if (res?.data?.data && res.data.data.content) {
          const payloadForWorkLocation = res?.data?.data?.content?.map(
            (item: any) => {
              return {
                uuid: item?.uuid,
                name: item?.name,
              };
            }
          );
          setProviderWorkLocationList(payloadForWorkLocation);
        }
      });
  };

  async function getAllRolesWithDefault() {
    try {
      providerGroupService
        .getAllRolesWithDefault(tenantId, 0, 10, providerGroupUuid)
        .then((roles: any) => {
          if (roles?.data && roles.data?.data) {
            const array: any[] = roles.data.data.content;
            // formik.setFieldValue('role', array?.length !== 0 && array?.find((userRole: any) => userRole?.name === 'PROVIDER')?.uuid)
            setUserRoles(roles.data.data.content);
          }
        });
    } catch (error) {}
  }

  // const getAllInsuranceAccepted = () => {
  //   providerGroupService.getAllInsuranceAccepted(tenantId, 0, 10).then((insurances: any) => {
  //     if (insurances?.data && insurances.data?.data) {
  //       setInsuranceAcceptedList(insurances.data.data?.content)
  //     }
  //   })
  // }

  const addUpdateProvider = async (values: any) => {
    values.role =
      values.role[0]?.uuid ||
      (userRolesList &&
        userRolesList?.find((userRole: any) => userRole?.name === "PROVIDER")
          ?.uuid);
    values.providerGroup = providerGroupUuid;
    const payload = { ...values };
    if (title == "Add Provider User") {
      payload.avatar = payload?.avatar?.split(",")[1];
    } else {
      payload.newAvatar = payload?.newAvatar?.split(",")[1];
    }
    try {
      await providerGroupService
        .addUpdateUser(
          tenantId,
          payload,
          providerUuid ? "UPDATE" : "ADD",
          "provider"
        )
        .then((res: any) => {
          if (res.status > "199" && res.status < "299") {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data.message,
                severity: "success",
              })
            );
            handleClose();
            props?.setRefetchUsers ? props?.setRefetchUsers(true) : null;
          } else
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data?.message || res.data?.error,
                severity: "error",
              })
            );
        });
    } catch (error) {
      console.log("Error while adding Provider :: ", error);
    }
    getLoginnedUserDetails();
  };

  const handleProfileImg = (event: any) => {
    formik.setFieldValue(providerUuid?.uuid ? "newAvatar" : "avatar", event);
  };

  const handleFormSubmit = (values: any) => {
    values.workLocations = workLocationData;
    values.specialities = specialitiesListData;
    addUpdateProvider(values);
  };

  const getLoginnedUserDetails = async () => {
    const data = await UserControllerService.getUsersProfileDetails();
    dispatch(setDetailData(data?.data));
  };

  const handleDateChange = (event: any) => {
    // const expiryDate: any = new Date(event);
    // const localDate = moment(expiryDate).format("yyyy-MM-DD");
    formik.setFieldValue("licenseExpiryDate", event);
  };

  const formik = useFormik({
    initialValues: initialProvierProfileInfo,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  }) as any;

  const { mutateAsync: addSpecialitisMutateAsync } =
    useProviderGroupControllerServiceAddSpecialities();

  // const handleChangeSpecialityOption = (event: any) => {
  //   setOtherSpecialityVal(event.target.value as string);
  // };

  // const addSpecilityOption = async () => {
  //   const otherOption: Speciality = {
  //     name: otherSpecilityVal as string,
  //   };
  //   try {
  //     if (otherSpecilityVal) {
  //       await addSpecialitisMutateAsync({
  //         requestBody: otherOption,
  //       })
  //         .then((res: any) => {
  // if (res?.status >= 200 && res.status <= 299) {
  // dispatch(
  //   alertAction.setAlert({
  //     open: true,
  //     message: res.message,
  //     severity: "success",
  //   })
  // );
  // } else if (res?.status >= 299) {
  //   dispatch(
  //     alertAction.setAlert({
  //       open: true,
  //       message: res?.message || "",
  //       severity: "error",
  //     })
  //   );
  // }
  //       })
  //       .catch(() => {});
  //   }
  // } catch {}
  // setOpenDialog((item) => !item);
  // };

  async function handleMenuScroll(event: any) {
    const selectMenu: any = selectRef.current;
    const isNearBottom =
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight - 1;
    if (selectMenu && isNearBottom && !isLoading) {
      setSpecialitiesPagination((prev) => ({
        ...prev,
        size: specialitiesPagination.size + 100,
      }));
    }
  }

  const initilalSpecialities = {
    name: "",
  };

  const validationSchemaForSpec = Yup.object().shape({
    name: Yup.string()
      .required("New speciality required")
      .matches(
        /^[A-Za-z0-9]+$/,
        "Specialities contains only characters and numbers"
      ),
  });

  const handleAddNewSpecialities = async (values: any) => {
    try {
      if (values) {
        await addSpecialitisMutateAsync({
          requestBody: values,
        })
          .then((res: any) => {
            // if (res?.status >= 200 && res.status <= 299) {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message,
                severity: "success",
              })
            );
            // } else if (res?.status >= 299) {
            //   dispatch(
            //     alertAction.setAlert({
            //       open: true,
            //       message: res?.message || "",
            //       severity: "error",
            //     })
            //   );
            // }
          })
          .catch(() => {});
      }
    } catch {}
    handleClosedSpecialityDialog();
  };

  const handleToggleLocation = (location: any) => {
    const locationIndex = workLocations.findIndex(
      (item) => item.uuid === location.uuid
    );

    if (locationIndex === -1) {
      // If location is not already selected, add it to the selection
      setWorkLocation([...workLocations, location]);
    } else {
      // If location is already selected, remove it from the selection
      setWorkLocation(
        workLocations.filter((item) => item.uuid !== location.uuid)
      );
    }
  };

  const formikData = useFormik({
    initialValues: initilalSpecialities,
    validationSchema: validationSchemaForSpec,
    onSubmit: handleAddNewSpecialities,
  }) as any;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        {/* <Formik
          initialValues={initialProvierProfileInfo}
          // validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, errors, formik.setFieldValue, submitForm }) => (
            <Form> */}
        <DialogTitle id="scroll-dialog-title" sx={formTitle}>
          {title}
          {/* <Close
                  sx={addEditProviderStyle.dialogClose}
                  onClick={handleClose}
                /> */}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <Box>
            <Box>
              <Box sx={addEditProviderStyle.informationDetailsSetup}>
                <Box>
                  {/* <CustomFormLabel label="Provider photo" /> */}
                  <ImageSelector
                    existingProfileImage={formik.values.avatar}
                    setProfileImage={handleProfileImg}
                  />
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
                          value={formik.values.providerType}
                          size="small"
                          name="providerType"
                          MenuProps={MenuProps}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          classes={{
                            error: classes.inputBoxError,
                          }}
                          error={
                            !!(
                              formik.touched.providerType &&
                              formik.errors.providerType
                            )
                          }
                          // onChange={(e) =>
                          //   formik.setFieldValue("providerType", e.target.value)
                          // }
                          sx={addEditProviderStyle.addressSelectStyle}
                        >
                          {providerTypeList
                            ?.sort((a, b) => a.value.localeCompare(b.value))
                            ?.map((providerType: any) => (
                              <MenuItem
                                key={providerType.key}
                                value={providerType.key}
                                sx={addEditProviderStyle.selectPlaceHolderStyle}
                              >
                                {providerType.value}
                              </MenuItem>
                            ))}
                        </Select>

                        {formik.touched.providerType &&
                          formik.errors.providerType && (
                            <FormHelperText error>
                              {formik.errors.providerType}
                            </FormHelperText>
                          )}
                      </Box>
                      <Box sx={addEditProviderStyle.multiSelectOption}>
                        <CustomFormLabel
                          label={SELECT_SPECIALITY}
                          // isRequired={true}
                        />
                        <Select
                          multiple
                          displayEmpty
                          size="small"
                          name="specialities"
                          ref={selectRef}
                          value={specialities}
                          onScrollCapture={handleMenuScroll}
                          MenuProps={MenuProps}
                          classes={{
                            error: classes.inputBoxError,
                          }}
                          onBlur={formik.handleBlur}
                          onChange={(event) => handleSpecialityChange(event)}
                          // error={
                          //   !!(
                          //     formik.touched.specialities &&
                          //     !specialities.length
                          //   )
                          // }
                          input={<OutlinedInput />}
                          renderValue={(selected) => {
                            if (selected?.length === 0) {
                              return (
                                <span
                                  style={
                                    addEditProviderStyle.selectPlaceHolderStyle
                                  }
                                >
                                  {SELECT_SPECIALITY_TYPE}
                                </span>
                              );
                            }
                            return selected.join(", ");
                          }}
                          inputProps={{ "aria-label": "Without label" }}
                          fullWidth
                          sx={addEditProviderStyle.selectTopModalStyle}
                          // className={`${classStyle.select} ${specialityError.length != 0 &&
                          //   classStyle.selectError
                          //   }`}
                        >
                          {providerGroupSpecialities.length !== 0 &&
                            providerGroupSpecialities?.map(
                              (speciality: any) => (
                                <MenuItem
                                  key={speciality.id}
                                  value={speciality.name}
                                >
                                  {speciality.name !== "Add new speciality" && (
                                    <Checkbox
                                      checked={
                                        specialities.indexOf(speciality.name) >
                                        -1
                                      }
                                      sx={addEditProviderStyle.checkBoxStyle}
                                    />
                                  )}
                                  <ListItemText
                                    primary={speciality.name}
                                    sx={
                                      addEditProviderStyle.selectPlaceHolderStyle
                                    }
                                  />
                                </MenuItem>
                              )
                            )}
                          {/* {isLoading && (
                            <MenuItem
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Loading />
                            </MenuItem>
                          )} */}
                        </Select>
                        {/* {formik.touched.specialities &&
                          !specialitiesListData.length && (
                            <Typography
                              color="error"
                              sx={{ mt: 0.4 }}
                              variant="body2"
                            >
                              {"Please select the speciality type"}
                            </Typography>
                          )} */}
                      </Box>
                      <Box>
                        <CustomFormLabel label={ROLE} />

                        <Select
                          fullWidth
                          displayEmpty
                          value={formik.values.role}
                          size="small"
                          name="role"
                          disabled={true}
                          renderValue={(selected: any) => {
                            return userRoles?.find(
                              (role) =>
                                role.uuid === (selected[0]?.uuid || selected)
                            )?.name;
                          }}
                          MenuProps={MenuProps}
                          // onChange={(e: any) => {
                          //   const role: any = e.target.value;
                          //   formik.setFieldValue("role", role.uuid)
                          // }
                          // }
                          classes={{
                            error: classes.inputBoxError,
                          }}
                          // error={!!(formik.touched.role && formik.errors.role)}
                          sx={addEditProviderStyle.addressSelectStyle}
                        >
                          {userRoles.length !== 0 &&
                            userRoles?.map((role: any) => {
                              return (
                                <MenuItem
                                  key={role.id}
                                  value={role?.uuid}
                                  sx={
                                    addEditProviderStyle.selectPlaceHolderStyle
                                  }
                                >
                                  {role?.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                        {/* {formik.touched.role && formik.errors.role && (
                          <FormHelperText error>
                            {"Role Required"}
                          </FormHelperText>
                        )} */}
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
                            name="firstName"
                            placeholder={FIRST_NAME}
                            value={formik.values.firstName}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            // onChange={(e) =>
                            //   formik.setFieldValue("firstName", e.target.value)
                            // }
                            error={
                              !!(
                                formik.touched.firstName &&
                                formik.errors.firstName
                              )
                            }
                          />
                          {formik.touched.firstName &&
                            formik.errors.firstName && (
                              <FormHelperText error>
                                {formik.errors.firstName}
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
                            name="lastName"
                            value={formik.values.lastName}
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error: classes.inputBoxError,
                            }}
                            // onChange={(e) =>
                            //   formik.setFieldValue("lastName", e.target.value)
                            // }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            error={
                              !!(
                                formik.touched.lastName &&
                                formik.errors.lastName
                              )
                            }
                          />
                          {formik.touched.lastName &&
                            formik.errors.lastName && (
                              <FormHelperText error>
                                {formik.errors.lastName}
                              </FormHelperText>
                            )}
                        </Box>
                      </Box>
                      <Box>
                        <CustomFormLabel label={GENDER} isRequired={true} />
                        <SelectInput
                          placeholder={SELECT_AN_OPTION}
                          isEditForm={formik.values?.gender}
                          value={formik.values?.gender}
                          selectedOption={formik.values?.gender}
                          options={Gender}
                          name={"gender"}
                          isError={
                            formik.touched.gender && formik.errors.gender
                          }
                          selectInputError={formik.errors.gender}
                          onChange={(e: any) =>
                            formik.setFieldValue("gender", e.target.value)
                          }
                        />
                        {formik.touched.gender && formik.errors.gender && (
                          <FormHelperText error>
                            {formik.errors.gender}
                          </FormHelperText>
                        )}
                      </Box>
                      <Box>
                        <CustomFormLabel label={NPI_NUMBER} />
                        <InputBase
                          fullWidth
                          value={formik.values.npi}
                          name="npi"
                          placeholder={ENTER_NPI_NUMBER}
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: formik.errors.npi && classes.inputBoxError,
                          }}
                          onKeyPress={(e) => {
                            const allowedKeys = /[0-9\b]/;
                            if (!allowedKeys.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          // onChange={(e) =>
                          //   formik.setFieldValue("npi", e.target.value)
                          // }
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={!!(formik.touched.npi && formik.errors.npi)}
                        />
                        {formik.touched.npi && formik.errors.npi && (
                          <FormHelperText error>
                            {formik.errors.npi}
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
                          value={formik.values.contactNumber}
                          name="contactNumber"
                          placeholder={ENTER_PROVIDER_PHONE_NUMBER}
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          // onChange={(e) =>
                          //   formik.setFieldValue("contactNumber", e.target.value)
                          // }
                          error={
                            !!(
                              formik.touched.contactNumber &&
                              formik.errors.contactNumber
                            )
                          }
                        />
                        {formik.touched.contactNumber &&
                          formik.errors.contactNumber && (
                            <FormHelperText error>
                              {formik.errors.contactNumber}
                            </FormHelperText>
                          )}
                      </Box>
                      <Box>
                        <CustomFormLabel label={OFFICE_FAX_NUMBER} />
                        <InputBase
                          fullWidth
                          placeholder={ENTER_FAX_NUMBER}
                          name="fax"
                          value={formik.values.fax}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={!!(formik.touched.fax && formik.errors.fax)}
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                        />
                        {formik.touched.fax && formik.errors.fax && (
                          <FormHelperText error>
                            {formik.errors.fax}
                          </FormHelperText>
                        )}
                      </Box>
                      {/* <Box>
                        <CustomFormLabel
                          label={GROUP_NPI_NUMBER}
                          isRequired={true}
                        />
                        <InputBase
                          fullWidth
                          value={formik.values.groupNpi}
                          name="groupNpi"
                          disabled={true}
                          placeholder={ENTER_GROUP_NIP_NUMBER}
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                          // onChange={(e) =>
                          //   formik.setFieldValue(
                          //     "groupNpi",
                          //     e.target.value
                          //   )
                          // }
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            !!(
                              formik.touched.groupNpi && formik.errors.groupNpi
                            )
                          }
                        />
                        {formik.touched.groupNpi && formik.errors.groupNpi && (
                          <FormHelperText error>
                            {formik.errors.groupNpi}
                          </FormHelperText>
                        )}
                      </Box> */}
                      {/* <Box>
                        <CustomFormLabel
                          label={LICENSED_STATE}
                          // isRequired={true}
                        />

                        <InputBase
                          fullWidth
                          placeholder={"Enter licensed  state"}
                          name="licensedStates"
                          value={formik.values.licensedStates}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyPress={(e) => {
                            handleKeyPress(e);
                          }}
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                        />
                      </Box> */}
                      <Grid item xs={12}>
                        <CustomFormLabel label="Country" isRequired={false} />
                        <Autocomplete
                          sx={{
                            ...multiSelectDropDown,
                          }}
                          multiple
                          limitTags={2}
                          id="tags-standard"
                          options={countryList || []}
                          value={formik.values.countries}
                          getOptionLabel={(option: any) => option?.country}
                          disableCloseOnSelect
                          onChange={(_, values) => {
                            formik.setFieldValue("countries", values);
                          }}
                          renderOption={(props, option: any) => (
                            <MenuItem
                              key={option.id}
                              value={option.id}
                              sx={{ justifyContent: "space-between" }}
                              {...props}
                            >
                              {option?.country}
                            </MenuItem>
                          )}
                          onBlur={formik.handleBlur}
                          renderInput={(params) => (
                            <TextField
                              classes={{ root: styles.customTextField }}
                              {...params}
                              variant="outlined"
                              placeholder={
                                formik.values?.countries?.length > 0
                                  ? ""
                                  : "Select Country"
                              }
                            />
                          )}
                        />
                      </Grid>
                    </Box>

                    <Box sx={addEditProviderStyle.profileInformationGrid}>
                      <Box>
                        <CustomFormLabel
                          label={LICENSE_NUMBER}
                          // isRequired={true}
                        />
                        <InputBase
                          fullWidth
                          value={formik.values.licenseNumber}
                          placeholder={ENTER_LICENSE_NUMBER}
                          name="licenseNumber"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          // onKeyPress={(e) => {
                          //   const allowedKeys = /[0-9\b]/;
                          //   if (!allowedKeys.test(e.key)) {
                          //     e.preventDefault();
                          //   }
                          // }}
                          // error={
                          //   !!(
                          //     formik.touched.licenseNumber &&
                          //     formik.errors.licenseNumber
                          //   )
                          // }
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                          // onChange={(e) => formik.setFieldValue('licenseNumber', e.target.value)}
                        />
                        {/* {formik.touched.licenseNumber &&
                          formik.errors.licenseNumber && (
                            <FormHelperText error>
                              {formik.errors.licenseNumber}
                            </FormHelperText>
                          )} */}
                      </Box>
                      {/* sx={addEditProviderStyle.profileInformationGrid} */}
                      <Box>
                        <Box>
                          <CustomFormLabel label={EMAIL} isRequired={true} />
                          <InputBase
                            fullWidth
                            value={formik.values.email}
                            placeholder={ENTER_EMAIL}
                            disabled={!!providerUuid?.uuid}
                            name="email"
                            classes={{
                              root: classes.textFieldRoot,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                              error:
                                formik.errors.email && classes.inputBoxError,
                            }}
                            //   sx={{
                            //     background: isEditProviderPage
                            //       ? backgroudColor.tableHead
                            //       : "none",
                            //   }}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            // onChange={(e) =>
                            //   formik.setFieldValue("email", e.target.value)
                            // }
                            error={
                              !!(formik.touched.email && formik.errors.email)
                            }
                          />
                          {formik.touched.email && formik.errors.email && (
                            <FormHelperText error>
                              {formik.errors.email}
                            </FormHelperText>
                          )}
                        </Box>
                      </Box>
                      {/* <Box sx={addEditProviderStyle.multiSelectOption}>
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
                          {insuranceAcceptedList?.map(
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
                      </Box> */}
                      <Box>
                        <CustomFormLabel
                          label={YEAR_OF_EXPERIANCE}
                          // isRequired={true}
                        />
                        <SelectInput
                          isEditForm={formik.values?.experienceYears}
                          placeholder={SELECT_AN_OPTION}
                          name={"experienceYears"}
                          value={formik.values?.experienceYears}
                          selectedOption={formik.values?.experienceYears}
                          isError={
                            formik.touched.experienceYears &&
                            formik.errors.experienceYears
                          }
                          selectInputError={formik.errors.experienceYears}
                          options={YearOfexperiance}
                          onChange={(e: any) =>
                            formik.setFieldValue(
                              "experienceYears",
                              e.target.value
                            )
                          }
                        />
                        {formik.touched.experienceYears &&
                          formik.errors.experienceYears && (
                            <FormHelperText error>
                              {formik.errors.experienceYears}
                            </FormHelperText>
                          )}
                      </Box>
                    </Box>

                    <Box sx={addEditProviderStyle.profileInformationGrid}>
                      <Box>
                        <CustomFormLabel
                          label={TAXONOMY_NUMBER}
                          // isRequired={true}
                        />
                        <InputBase
                          fullWidth
                          name="taxonomyNumber"
                          type="text"
                          value={formik.values.taxonomyNumber}
                          placeholder={ENTER_TAXONOMY_NUMBER}
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError,
                          }}
                          onKeyPress={(e) => {
                            const allowedKeys = /[0-9\b]/;
                            if (!allowedKeys.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            !!(
                              formik.touched.taxonomyNumber &&
                              formik.errors.taxonomyNumber
                            )
                          }
                          // onChange={(e: any) => formik.setFieldValue('taxonomyNumber', e.target.value)}
                        />
                        {formik.touched.taxonomyNumber &&
                          formik.errors.taxonomyNumber && (
                            <FormHelperText error>
                              {formik.errors.taxonomyNumber}
                            </FormHelperText>
                          )}
                      </Box>
                      <Box sx={addEditProviderStyle.multiSelectOption}>
                        <CustomFormLabel
                          label={WORK_LOCATIONS}
                          // isRequired={true}
                        />
                        <Select
                          multiple
                          displayEmpty
                          size="small"
                          value={workLocations}
                          MenuProps={MenuProps}
                          // error={
                          //   !!(
                          //     formik.touched.workLocations &&
                          //     !workLocations.length
                          //   )
                          // }
                          onChange={(event) => handleWorkLocationChange(event)}
                          classes={{
                            error: classes.inputBoxError,
                          }}
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
                        >
                          {providerWorkLocationList.length !== 0 &&
                            providerWorkLocationList?.map((location: any) => (
                              <MenuItem key={location.uuid} value={location}>
                                <Checkbox
                                  checked={workLocations.some(
                                    (item) => item?.uuid === location?.uuid
                                  )}
                                  onChange={() =>
                                    handleToggleLocation(location)
                                  }
                                  sx={addEditProviderStyle.checkBoxStyle}
                                />
                                <ListItemText
                                  primary={location.name}
                                  sx={
                                    addEditProviderStyle.selectPlaceHolderStyle
                                  }
                                />
                              </MenuItem>
                            ))}
                        </Select>
                        {/* {formik.touched.workLocations &&
                          workLocations.length === 0 && (
                            <FormHelperText error>
                              {"Work location is a required field"}
                            </FormHelperText>
                          )} */}
                      </Box>
                      <Box>
                        <CustomFormLabel
                          label={LANGAGE_SPOKEN}
                          isRequired={false}
                        />
                        <Autocomplete
                          sx={{
                            ...multiSelectDropDown,
                          }}
                          multiple
                          limitTags={2}
                          id="tags-standard"
                          options={languagesSpoken || []}
                          value={formik.values.languages}
                          getOptionLabel={(option: any) => option?.name}
                          disableCloseOnSelect
                          onChange={(_, values) => {
                            // console.log("valuess",values)
                            formik.setFieldValue("languages", values);
                          }}
                          renderOption={(props, option: any) => (
                            <MenuItem
                              key={option.id}
                              value={option.id}
                              sx={{ justifyContent: "space-between" }}
                              {...props}
                            >
                              {option?.name}
                            </MenuItem>
                          )}
                          onBlur={formik.handleBlur}
                          renderInput={(params) => (
                            <TextField
                              classes={{ root: styles.customTextField }}
                              {...params}
                              variant="outlined"
                              placeholder={
                                formik.values?.country?.length > 0
                                  ? ""
                                  : "Select Country"
                              }
                            />
                          )}
                        />
                      </Box>
                    </Box>

                    <Box sx={addEditProviderStyle.profileInformationGrid}>
                      <Box>
                        <CustomFormLabel
                          label={INSURANCE_VERIFICATION}
                          // isRequired={true}
                        />
                        <SelectInput
                          isError={
                            formik.touched.insuranceVerification &&
                            formik.errors.insuranceVerification
                          }
                          selectInputError={formik.errors.insuranceVerification}
                          isEditForm={
                            formik.values?.insuranceVerification || ""
                          }
                          value={formik.values?.insuranceVerification || ""}
                          selectedOption={
                            formik.values?.insuranceVerification || ""
                          }
                          placeholder={SELECT_AN_OPTION}
                          options={EnrollSelection}
                          onChange={(e: any) =>
                            formik.setFieldValue(
                              "insuranceVerification",
                              e.target.value
                            )
                          }
                        />
                        {formik.touched.insuranceVerification &&
                          formik.errors.insuranceVerification && (
                            <FormHelperText error>
                              {formik.errors.insuranceVerification}
                            </FormHelperText>
                          )}
                      </Box>
                      <Box>
                        <CustomFormLabel
                          label={PRIOR_AUTORIZATION}
                          // isRequired={true}
                        />
                        <SelectInput
                          isError={
                            formik.touched.priorAuthorisations &&
                            formik.errors.priorAuthorisations
                          }
                          selectInputError={formik.errors.priorAuthorisations}
                          isEditForm={formik.values?.priorAuthorisations || ""}
                          selectedOption={
                            formik.values?.priorAuthorisations || ""
                          }
                          value={formik.values?.priorAuthorisations || ""}
                          placeholder={SELECT_AN_OPTION}
                          options={EnrollSelection}
                          onChange={(e: any) =>
                            formik.setFieldValue(
                              "priorAuthorisations",
                              e.target.value
                            )
                          }
                        />
                        {formik.touched.priorAuthorisations &&
                          formik.errors.priorAuthorisations && (
                            <FormHelperText error>
                              {formik.errors.priorAuthorisations}
                            </FormHelperText>
                          )}
                      </Box>
                      <Box>
                        <CustomFormLabel
                          label={"License Expiry Date"}
                          // isRequired={true}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            onChange={(e) =>
                              formik.setFieldValue("licenseExpiryDate", e)
                            }
                            value={
                              formik.values.licenseExpiryDate
                                ? dayjs(formik.values.licenseExpiryDate)
                                : null
                            }
                            disablePast
                            slotProps={{
                              textField: { size: "small" },
                            }}
                            readOnly={
                              title === "Review Task" || title === "Edit Task"
                            }
                            sx={{
                              width: "100%",
                              "& fieldset": { border: "none" },
                              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                              "& label": {
                                color: "#1A1A1A80 !important",
                                fontSize: "14px !important",
                              },
                              "& .MuiInputBase-root": {
                                height: "42px",
                                fontSize: "14px",
                                // color: "#1A1A1A7F !important",
                                borderRadius: "5px",
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Box>
                    </Box>

                    <Box sx={addEditProviderStyle.profileInformationGrid}>
                      {/* <Box>
                        <CustomFormLabel label={DEPARTMENT_NAME} isRequired={true} />
                        <InputBase
                          fullWidth
                          name="departmentName"
                          type="text"
                          value={formik.values.departmentName}
                          placeholder={'Enter Department'}
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: classes.inputBoxError
                          }}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={!!(formik.touched.departmentName && formik.errors.departmentName)}
                        />
                        {formik.touched.departmentName && formik.errors.departmentName && (
                          <FormHelperText error>
                            {formik.errors.departmentName}
                          </FormHelperText>
                        )}
                      </Box> */}
                    </Box>

                    {/* <Box sx={addEditProviderStyle.profileInformationGrid}>
                      <Box>
                        <CustomFormLabel
                          label={EMAIL}
                          isRequired={true}
                        />
                        <InputBase
                          fullWidth
                          value={formik.values.email}
                          placeholder={ENTER_EMAIL}
                          classes={{
                            root: classes.textFieldRoot,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                            error: formik.errors.email && classes.inputBoxError,
                          }}
                          //   sx={{
                          //     background: isEditProviderPage
                          //       ? backgroudColor.tableHead
                          //       : "none",
                          //   }}
                          onChange={(e) =>
                            formik.setFieldValue("email", e.target.value)
                          }
                          error={!!formik.errors.email}
                          disabled={isEditProviderPage}
                        />
                        {formik.errors.email && (
                          <FormHelperText error>
                            {formik.errors.email}
                          </FormHelperText>
                        )}
                      </Box>
                    </Box> */}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  margin: "10px 0 10px 0",
                  color: "#1B5984 !important",
                  fontSize: "16px !important",
                }}
              >
                {BASIC_ACCOUNT_PROFILE_DATA}
              </Typography>
              <Box>
                {/* <Box sx={addEditProviderStyle.accountsInfo}>
                  <Box sx={addEditProviderStyle.accountsSubDetailsSetup2}>
                    <Box>
                      <CustomFormLabel label={AREAS_OF_FOCUS} />
                      <InputBase
                        fullWidth
                        name="providerProfileInfo.focusedArea"
                        value={formik.values.providerProfileInfo.focusedArea}
                        placeholder={ENTER_AREAS_OF_FOCUS}
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                        }}
                        onChange={(e: any) => formik.setFieldValue("providerProfileInfo.focusedArea", e.target.value)}
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel label={HOSPITAL_AFFECTION} />
                      <InputBase
                        fullWidth
                        name="providerProfileInfo.hospitalAffilation"
                        value={formik.values.providerProfileInfo.hospitalAffilation}
                        placeholder={ENTER_HOSPITAL_AFFECTION}
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                        }}
                        onChange={(e: any) => formik.setFieldValue("providerProfileInfo.hospitalAffilation", e.target.value)}
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel label={PRIOR_AUTORIZATION} />
                      <SelectInput
                        isEditForm={providerUuid?.providerProfileInfo?.priorAuthorisation}
                        selectedOption={providerUuid?.providerProfileInfo?.priorAuthorisation}
                        placeholder={SELECT_AN_OPTION}
                        options={EnrollSelection}
                        onChange={(e: any) =>
                          formik.setFieldValue(
                            "providerProfileInfo.priorAuthorisation",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                  </Box>

                  <Box sx={addEditProviderStyle.accountsSubDetailsSetup2}>
                    <Box>
                      <CustomFormLabel label={EMP_REFERRAL_NUMER} />
                      <InputBase
                        fullWidth
                        name="providerProfileInfo.referralNumber"
                        value={formik.values.providerProfileInfo.referralNumber}
                        placeholder={ENTER_EMP_REFERRAL_NUMER}
                        classes={{
                          root: classes.textFieldRoot,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                        }}
                        onChange={(e: any) => formik.setFieldValue("providerProfileInfo.referralNumber", e.target.value)}
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel label={ACCEPT_NEW_PATIENTS} />
                      <SelectInput
                        isEditForm={providerUuid?.providerProfileInfo?.acceptNewPatients}
                        selectedOption={providerUuid?.providerProfileInfo?.acceptNewPatients}
                        placeholder={SELECT_AN_OPTION}
                        options={NewPatientsAndCashpay}
                        onSelectOption={(e: any) =>
                          formik.setFieldValue(
                            "providerProfileInfo.acceptNewPatients",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel label={SECOND_OPINION} />
                      <SelectInput
                        isEditForm={providerUuid?.providerProfileInfo?.secondOpinion}
                        selectedOption={providerUuid?.providerProfileInfo?.secondOpinion}
                        placeholder={SELECT_AN_OPTION}
                        options={EnrollSelection}
                        onSelectOption={(e: any) =>
                          formik.setFieldValue("providerProfileInfo.secondOpinion", e.target.value)
                        }
                      />
                    </Box>
                  </Box>

                  <Box sx={addEditProviderStyle.accountsSubDetailsSetup2}>
                    <Box>
                      <CustomFormLabel label={AGE_GROUP_SEEN} />
                      <SelectInput
                        isEditForm={providerUuid?.providerProfileInfo?.ageGroupSeen}
                        placeholder={SELECT_AN_OPTION}
                        selectedOption={providerUuid?.providerProfileInfo?.ageGroupSeen}
                        options={AgeGroupSeen}
                        onSelectOption={(e: any) =>
                          formik.setFieldValue("providerProfileInfo.ageGroupSeen", e.target.value)
                        }
                      ></SelectInput>
                    </Box>
                    <Box>
                      <CustomFormLabel label={ACCEPT_CASH_PAY} />
                      <SelectInput
                        isEditForm={providerUuid?.providerProfileInfo?.acceptCashPay}
                        placeholder={SELECT_AN_OPTION}
                        selectedOption={providerUuid?.providerProfileInfo?.acceptCashPay}
                        options={NewPatientsAndCashpay}
                        onSelectOption={(e: any) =>
                          formik.setFieldValue("providerProfileInfo.acceptCashPay", e.target.value)
                        }
                      ></SelectInput>
                    </Box>
                    <Box>
                      <CustomFormLabel
                        label={ACTUAL_SPECIALITY_CARE_SERVICE}
                      />
                      <SelectInput
                        isEditForm={providerUuid?.providerProfileInfo?.acuteSpeciality}
                        selectedOption={providerUuid?.providerProfileInfo?.acuteSpeciality}
                        placeholder={SELECT_AN_OPTION}
                        options={EnrollSelection}
                        onSelectOption={(e: any) =>
                          formik.setFieldValue("providerProfileInfo.acuteSpeciality", e.target.value)
                        }
                      ></SelectInput>
                    </Box>
                  </Box>

                  <Box sx={addEditProviderStyle.accountsSubDetailsSetup2}>
                    <Box>
                      <CustomFormLabel label={LANGAGE_SPOKEN} />
                      <SelectInput
                        isEditForm={providerUuid?.providerProfileInfo?.languageSpoken}
                        selectedOption={providerUuid?.providerProfileInfo?.languageSpoken}
                        placeholder={SELECT_AN_OPTION}
                        options={languagesSpoken}
                        onSelectOption={(e: any) =>
                          formik.setFieldValue("providerProfileInfo.languageSpoken", e.target.value)
                        }
                      ></SelectInput>
                    </Box>
                    <Box>
                      <CustomFormLabel label={INSURANCE_VERIFICATION} />
                      <SelectInput
                        isEditForm={providerUuid?.providerProfileInfo?.insuranceVerification}
                        placeholder={SELECT_AN_OPTION}
                        selectedOption={providerUuid?.providerProfileInfo?.insuranceVerification}
                        options={EnrollSelection}
                        onSelectOption={(e: any) =>
                          formik.setFieldValue(
                            "providerProfileInfo.insuranceVerification",
                            e.target.value
                          )
                        }
                      ></SelectInput>
                    </Box>
                  </Box>
                </Box> */}

                <Box sx={{ marginTop: "20px" }}>
                  <CustomFormLabel label={PROVIDER_BIO} />
                  <InputBase
                    // {...addEditProviderProfileForm.providerBio}
                    fullWidth
                    rows="3"
                    name="providerProfileInfo.bio"
                    value={formik.values.providerProfileInfo.bio}
                    multiline={true}
                    placeholder={ENTER_BIO}
                    classes={{
                      root: classes.providerTextAreaField,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                    }}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "providerProfileInfo.bio",
                        e.target.value
                      )
                    }
                  />
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <CustomFormLabel label={EXPERTISE_IN} />
                  <InputBase
                    fullWidth
                    rows="3"
                    name="providerProfileInfo.expertise"
                    value={formik.values.providerProfileInfo.expertise}
                    multiline={true}
                    placeholder={ENTER_EXPERTISE}
                    classes={{
                      root: classes.providerTextAreaField,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.touched.providerProfileInfo?.expertise &&
                        formik.errors.providerProfileInfo?.expertise
                      )
                    }
                    // onChange={(e) => formik.setFieldValue("providerProfileInfo.expertise", e.target.value)}
                  />
                  {formik.touched.providerProfileInfo?.expertise &&
                    formik.errors.providerProfileInfo?.expertise && (
                      <FormHelperText error>
                        {formik.errors.providerProfileInfo?.expertise}
                      </FormHelperText>
                    )}
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <CustomFormLabel label={WORK_EXPERIANCE} />
                  <InputBase
                    fullWidth
                    multiline={true}
                    name="providerProfileInfo.experience"
                    value={formik.values.providerProfileInfo.experience}
                    rows="3"
                    placeholder={ENTER_WORK_EXPERIENCE}
                    classes={{
                      root: classes.providerTextAreaField,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!(
                        formik.touched.providerProfileInfo?.experience &&
                        formik.errors.providerProfileInfo?.experience
                      )
                    }
                    // onChange={(e) => formik.setFieldValue("providerProfileInfo.experience", e.target.value)}
                  />
                  {formik.touched.providerProfileInfo?.experience &&
                    formik.errors.providerProfileInfo?.experience && (
                      <FormHelperText error>
                        {formik.errors.providerProfileInfo.experience}
                      </FormHelperText>
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={formBottom}>
          <Grid sx={actionBtns}>
            <ButtonBase
              onClick={handleClose}
              sx={formButtonStyle.cancelButtonStyle}
            >
              {CANCEL}
            </ButtonBase>
            <ButtonBase
              sx={formButtonStyle.saveButtonStyle}
              onClick={formik.submitForm}
            >
              {providerUuid?.uuid ? SAVE : ADD}
            </ButtonBase>
          </Grid>
        </DialogActions>
        {/* </Form>
          )}
        </Formik> */}
        <Grid xs={12}>
          <Dialog
            maxWidth="sm"
            fullWidth={true}
            onClose={handleClosedSpecialityDialog}
            open={openDialog}
          >
            <DialogTitle>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>{"Enter speciality"}</Typography>
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={handleClosedSpecialityDialog}
                />
              </Box>
            </DialogTitle>
            <form>
              <DialogContent>
                <Grid mx={2} py={3}>
                  <InputBase
                    fullWidth
                    // onChange={(
                    //   event: React.ChangeEvent<
                    //     HTMLTextAreaElement | HTMLInputElement
                    //   >
                    // ) => {
                    //   handleChangeSpecialityOption(event);
                    // }}
                    placeholder="Speciality"
                    name="name"
                    value={formikData.values.name}
                    onBlur={formikData.handleBlur}
                    onChange={formikData.handleChange}
                    error={
                      !!(formikData.touched.name && formikData.errors.name)
                    }
                    classes={{
                      root: classes.textFieldRoot,
                      input: classes.textFieldInput,
                      focused: classes.textFieldActive,
                      error: classes.inputBoxError,
                    }}
                  />
                  {formikData.touched.name && formikData.errors.name && (
                    <FormHelperText error>
                      {formikData.errors.name}
                    </FormHelperText>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <ButtonBase
                  // onClick={addSpecilityOption}
                  onClick={formikData.submitForm}
                  sx={formButtonStyle.saveButtonStyle}
                >
                  {"Add"}
                </ButtonBase>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </Dialog>
    </ClickAwayListener>
  );
}

export default AddEditProviderUser;
