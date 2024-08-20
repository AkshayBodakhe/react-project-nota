import {
  Autocomplete,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputBase,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  useDrugCatalogControllerServiceGetAllDrugs,
  useEncounterCarePortalControllerServiceAddEncounterDetails1,
  useEncounterCarePortalControllerServiceGetEncounterDetails1,
  useEncounterControllerServiceGetEncounterDetails,
  useEncounterControllerServiceShareEncounterDetails,
  useIntakeFormControllerServiceGetAllAppointmentIntakeForms,
  useIntakeFormControllerServiceGetAllPatientIntakeForms,
  usePatientControllerServiceGetPatient,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  CarePatientChart,
  EncounterDetailsRequest,
  Patient,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import AgeCalculator from "../../../../../components/common/age-calculator/age-calculator";
import {
  commonContainer,
  commonWidget,
  formBottom,
  formButtonStyle,
  formTitle,
  val,
} from "../../../../../styles/common";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { adminConstants } from "../../../../../constants/admin";
import dayjs from "dayjs";
import EncounterTab from "./encounter/encounter";
import TemplateTab from "./template/template-tab";
import ClinicalCareData from "./clinical-data/clinicalCareData";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { Close } from "@mui/icons-material";
import { sxs } from "../../../../../components/core/view-appoinment-action-details/check-in-dialog";
import { ErrorResponseEntity } from "../../../../../components/common/enums-and-interfaces/interfaces";
import CustomDatePicker from "../../../../../components/common/custom-date-picker";
import moment from "moment";
import AppLayout from "../../../../../components/core/layout/layout";
import { PROVIDER } from "../../documents/documents-constant/documents-common-const";
import SelectInput from "../../../../../components/common/select-input";
import {
  DosageTimeList,
  DosageUnitList,
  DosageWhenList,
} from "../../../../../components/common/form-enum";
import avatar from "../../../../../assets/other/avatar_01.jpg";
import ViewCareUnsignedVisite from "../../unsigned-visit/viewCareUnsigned";
import EventSucessModal from "../../../../../components/common/success-modal";
import CancelPopMeassage from "../../../../../components/common/cancel-pop";
import EncounterCareView from "../../unsigned-visit/encounterCareView";
import { transformText } from "../../../../../components/common/helper";
import SharePDF from "./dialog/share-pdf";
import CareEncounterTab from "./encounter/care-encounter";
import { formatDateMMDDYYWithoutTz } from "./complete-check-in";
import {
  activeTab,
  blueButtonStyle,
  grayButtonStyle,
  key,
  value,
} from "./complete-check-in-const";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { SaveButtonStylo, cancelButtonStylo } from "./dialog/medication-form";
import MedicationsCareForm from "./dialog/medication-care-form";
import IntakeFormList from "../appointment-details-dialog/intake-form-list";

interface HeaderTabs {
  label: string;
}

export const careSideBarList = [
  {
    id: "Medications",
    name: "Medications",
  },
  {
    id: "ADHERENCE_TO_TREATMENT",
    name: "Adherence to treatment",
  },
  {
    id: "STI_TESTING_AND_HISTORY",
    name: "STI Testing & History",
  },
  {
    id: "SUBSTANCE_ABUSE_HISTORY",
    name: "Substance Abuse History",
  },
  {
    id: "RISK_BEHAVIOR_SCREENING",
    name: "Risk Behavior Screening",
  },
  {
    id: "SOCIAL_AND_ENVIRONMENT_SUPPORT",
    name: "Social and Environmental Support",
  },
  {
    id: "HIV_AIDS_AND_OTHER_STDS_EDUCATION",
    name: "HIV/AIDS & Other STDs Education",
  },
  {
    id: "FAMILY_PLANNING",
    name: "Family Planning",
  },
  {
    id: "REFERRALS_FOR_SERVICES",
    name: "Referrals for Services",
  },
  {
    id: "OTHERS",
    name: "Others",
  },
];
const CompleteCheckInCare = () => {
  const classes = commonWidget();
  const [indexValues, setIndexValues] = useState(0);
  const [patientData, setPatientData] = useState<Patient>();
  const dispatch = useDispatch();
  const [allMedicationName, setAllMedicationName] = useState<any>();
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );
  const [medications, setMedications] = React.useState([
    {
      drugCatalog: { id: 0, medicine: "", type: "" },
      sig: null,
      quantity: null,
      dosageUnit: null,
      dosageWhen: null,
      dosageTime: null,
      duration: null,
      startDate: null,
      endDate: null,
      note: "",
    },
  ]);

  const [openSignDialog, setOpenSignDialog] = useState(false);
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openEncounterView, setOpenEncounterView] = useState(false);
  const [openSharePdf, setSharePdf] = useState(false);
  const getAppointmentDetails = useLocation();
  const getUnsignedEncounter = useLocation();
  const [openIntakeForm, setOpenIntakeForm] = useState(false);

  // console.log("getAppointmentDetails",getAppointmentDetails)
  // console.log("getUnsignedEncounter",getUnsignedEncounter)

  const unsignedEncounter = getUnsignedEncounter?.state?.encounterDetails;

  const apptInfo = getAppointmentDetails?.state?.appointmentDetails
    ? getAppointmentDetails?.state?.appointmentDetails
    : getAppointmentDetails?.state?.row;

  const encounterUuid = getAppointmentDetails?.state?.encounterUuid
    ? getAppointmentDetails?.state?.encounterUuid
    : apptInfo?.encounterUuid
    ? apptInfo?.encounterUuid
    : unsignedEncounter?.encounterUuid;

  // console.log("apptInfo ",apptInfo)
  // console.log("unsignedEncounter",unsignedEncounter)
  // const apptInfo = getAppointmentDetails?.state?.appointmentDetails;
  // const encounterUuid = getAppointmentDetails?.state?.encounterUuid;
  const handleViewEncounterDetails = () => {
    setOpenEncounterView((item) => !item);
  };

  const userControlRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [openSideListComponent, setOpenSideListComponent] =
    useState("Medications");

  const { data: allDrugs } = useDrugCatalogControllerServiceGetAllDrugs({
    providerGroupUuid: userDetails?.data?.providerGroup,
    size: 1000,
    page: 0,
  });

  useEffect(() => {
    setAllMedicationName(allDrugs && allDrugs?.data?.content);
  }, [allDrugs]);

  const medicationNames = allMedicationName?.map((item: any) => {
    return {
      id: item?.id,
      medicine: item.medicine,
      type: item.type,
    };
  });

  const defaultProps = {
    options: medicationNames || [],
    getOptionLabel: (option: any) => option.medicine || "",
  };

  const medicationsTab = useRef<HTMLDivElement>(null);
  const adherenceRef = useRef<HTMLDivElement>(null);
  const stitestingHistoryRef = useRef<HTMLDivElement>(null);
  const SubstanceRef = useRef<HTMLDivElement>(null);
  const riskBehaviorScreeningRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const hivAidsAndOtherStdEducationRef = useRef<HTMLDivElement>(null);
  const familyPlanningRef = useRef<HTMLDivElement>(null);
  const referralsForServicesRef = useRef<HTMLDivElement>(null);
  const OtherRef = useRef<HTMLDivElement>(null);

  // const [activeSection, setActiveSection] = useState<string>("");
  // const sectionRefs:Record<string, React.RefObject<HTMLDivElement>> = {
  //   Medications: medicationsTab,
  //   ADHERENCE_TO_TREATMENT: adherenceRef,
  //   STI_TESTING_AND_HISTORY: stitestingHistoryRef,
  //   SUBSTANCE_ABUSE_HISTORY: SubstanceRef,
  //   RISK_BEHAVIOR_SCREENING: riskBehaviorScreeningRef,
  //   SOCIAL_AND_ENVIRONMENT_SUPPORT: socialRef,
  //   HIV_AIDS_AND_OTHER_STDS_EDUCATION: hivAidsAndOtherStdEducationRef,
  //   FAMILY_PLANNING: familyPlanningRef,
  //   REFERRALS_FOR_SERVICES: referralsForServicesRef,
  // };
  const todayDate = new Date();
  const initilalFormValues = {
    encounterUuid: encounterUuid,
    encounterStatus: "",
    chiefComplaint: getAppointmentDetails?.state?.row?.reasonOfVisit
      ? getAppointmentDetails?.state?.row?.reasonOfVisit
      : getAppointmentDetails?.state?.appointmentDetails?.reasonOfVisit,
    carePatientChartList: [
      {
        id: null,
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType.ADHERENCE_TO_TREATMENT,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType.STI_TESTING_AND_HISTORY,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType.SUBSTANCE_ABUSE_HISTORY,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType.RISK_BEHAVIOR_SCREENING,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },

      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType
            .SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
        socialAndEnvironmentalSupportType:
          CarePatientChart.socialAndEnvironmentalSupportType.HOUSING,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType
            .SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
        socialAndEnvironmentalSupportType:
          CarePatientChart.socialAndEnvironmentalSupportType
            .EMPLOYMENT_SOURCES_OF_INCOME,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },

      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType
            .SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
        socialAndEnvironmentalSupportType:
          CarePatientChart.socialAndEnvironmentalSupportType.EMOTIONAL_SUPPORT,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType
            .SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
        socialAndEnvironmentalSupportType:
          CarePatientChart.socialAndEnvironmentalSupportType.FOOD_ASSISTANCE,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType
            .SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
        socialAndEnvironmentalSupportType:
          CarePatientChart.socialAndEnvironmentalSupportType.TRANSPORTATION,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType
            .SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
        socialAndEnvironmentalSupportType:
          CarePatientChart.socialAndEnvironmentalSupportType
            .SUPPORT_GROUPS_FAMILY,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },

      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType
            .SOCIAL_AND_ENVIRONMENTAL_SUPPORT,
        socialAndEnvironmentalSupportType:
          CarePatientChart.socialAndEnvironmentalSupportType
            .HISTORY_OF_INCARCERATION,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType
            .HIV_AIDS_AND_OTHER_STDS_EDUCATION,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType.FAMILY_PLANNING,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType.REFERRALS_FOR_SERVICES,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
      {
        id: null,
        uuid: "",
        name: "",
        description: "",
        carePatientChartingType:
          CarePatientChart.carePatientChartingType.OTHERS,
        archive: false,
        patientUuid: apptInfo?.patientUuid,
        encounterId: encounterUuid,
      },
    ],
    providerName: null,
    signedDate: null,
  };
  const initialMedicationValues = [
    {
      drugCatalog: {
        id: 0,
        medicine: "",
        type: "",
      },
      quantity: null,
      dosageUnit: null,
      dosageWhen: null,
      dosageTime: null,
      startDate: null,
      endDate: null,
      sig: null,
      duration: null,
      note: "",
      encounterId: encounterUuid,
    },
  ];
  const { data: patientDetails } = usePatientControllerServiceGetPatient({
    patientUuid: apptInfo?.patientUuid
      ? apptInfo?.patientUuid
      : unsignedEncounter?.patientUuid,
  });

  // const { data: patientInfo } = usePatientControllerServiceGetPatient({
  //   patientUuid: unsignedEncounter?.patientUuid,
  // });

  // useEffect(() => {
  //   if (patientInfo) {
  //     //console.log("patientInfo", patientInfo?.data);
  //     setPatientData(patientInfo?.data as any);
  //   }
  // }, [unsignedEncounter]);

  useEffect(() => {
    if (patientDetails) {
      setPatientData(patientDetails?.data as Patient);
    }
  }, [patientDetails, unsignedEncounter]);
  //console.log("patientData", apptInfo?.patientUuid);
  //console.log("patientInfo", unsignedEncounter?.patientUuid);
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialog = () => {
    setOpenDialog((item) => !item);
  };
  const cancelMedication = () => {
    formik.resetForm();
  };
  const medicationValidationSchema = Yup.object().shape({
    drugCatalog: Yup.object().shape({
      medicine: Yup.string().required("Please select medicine name"),
    }),
    sig: Yup.string().required("Please enter sig"),
    // .matches(
    //   /^[a-zA-Z0-9\s,.\-'"]*$/,
    //   'Please enter valid sig'
    // ),
    dosageUnit: Yup.string().required("Please select dosage unit"),
    dosageWhen: Yup.string().required("Please select dosage when"),
    dosageTime: Yup.string().required("Please select dosage time"),
    startDate: Yup.string().required("Please select start Date"),
    // duration:Yup.string().matches(
    //   /^[a-zA-Z0-9\s,.\-'"]*$/,
    //   'Please enter Valid duration'
    // ),
  });
  const formValidationSchema = Yup.object().shape({});
  const {
    mutateAsync: addEncounterMutateAsync,
    isError,
    error,
  } = useEncounterCarePortalControllerServiceAddEncounterDetails1();

  const handleCompleteCheckIn = async (values: any) => {
    values.encounterStatus = EncounterDetailsRequest.encounterStatus.UNSIGNED;
    //console.log("formik.values",values)
    let patientMedicationList = medications?.filter(
      (medication: any) => medication?.drugCatalog?.medicine !== ""
    );
    // values.patientMedicationList[0]?.medication.name === ""
    //   ? (values.patientMedicationList.length = null)
    //   : values;

    //formikData.setValues(values);
    // if (
    //   formik.values.drugCatalog.medicine &&
    //   formik.values.dosageTime &&
    //   formik.values.dosageUnit &&
    //   formik.values.dosageWhen &&
    //   formik.values.sig &&
    //   formik.values.startDate
    // ) {
    //   patientMedicationList.push({
    //     drugCatalog: {
    //       id: formik.values.drugCatalog.id,
    //       medicine: formik.values.drugCatalog.medicine,
    //       type: formik.values.drugCatalog.type,
    //     },
    //     quantity: formik.values.quantity,
    //     dosageUnit: formik.values.dosageUnit,
    //     dosageWhen: formik.values.dosageWhen,
    //     dosageTime: formik.values.dosageTime,
    //     startDate: formik.values.startDate,
    //     endDate: formik.values.endDate,
    //     sig: formik.values.sig,
    //     duration: formik.values.duration,
    //     note: formik.values.note,
    //     encounterId: encounterUuid,
    //   });
    // }
    const filteredCarePatientChartList = values?.carePatientChartList?.filter(
      (item: any) => item?.description.trim() !== ""
    );
    const updatedValues = {
      ...values,
      carePatientChartList: filteredCarePatientChartList,
      patientMedicationList,
    };

    //console.log("updatedValues", updatedValues);
    if (values) {
      await addEncounterMutateAsync({
        requestBody: updatedValues,
      }).then((res: any) => {
        dispatch(
          alertAction.setAlert({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
      });
      handleSignDialog();
    }
  };

  const handleSignDialog = () => {
    setOpenSignDialog((item) => !item);
  };

  const handleOpenSuccessModel = () => {
    setOpenSuccessModal(true);
  };

  const handleSigInEncounter = async () => {
    formikData.values.encounterStatus =
      EncounterDetailsRequest.encounterStatus.SIGNED;
    const filteredCarePatientChartList =
      formikData?.values?.carePatientChartList?.filter(
        (item: any) => item?.description.trim() !== ""
      );
    let patientMedicationList = medications?.filter(
      (medication: any) => medication?.drugCatalog?.medicine !== ""
    );
    // if (
    //   formik.values.drugCatalog.medicine &&
    //   formik.values.dosageTime &&
    //   formik.values.dosageUnit &&
    //   formik.values.dosageWhen &&
    //   formik.values.sig &&
    //   formik.values.startDate
    // ) {
    //   patientMedicationList.push({
    //     drugCatalog: {
    //       id: formik.values.drugCatalog.id,
    //       medicine: formik.values.drugCatalog.medicine,
    //       type: formik.values.drugCatalog.type,
    //     },
    //     quantity: formik.values.quantity,
    //     dosageUnit: formik.values.dosageUnit,
    //     dosageWhen: formik.values.dosageWhen,
    //     dosageTime: formik.values.dosageTime,
    //     startDate: formik.values.startDate,
    //     endDate: formik.values.endDate,
    //     sig: formik.values.sig,
    //     duration: formik.values.duration,
    //     note: formik.values.note,
    //     encounterId: encounterUuid,
    //   });
    // }
    const updatedValues = {
      ...formikData?.values,
      carePatientChartList: filteredCarePatientChartList,
      patientMedicationList,
    };
    if (formikData.values) {
      await addEncounterMutateAsync({
        requestBody: updatedValues as unknown as EncounterDetailsRequest,
      }).then((res: any) => {
        //navigate("/provider/appointment/calendar");
        dispatch(
          alertAction.setAlert({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
      });
    }
    handleSignDialog();
    handleOpenSuccessModel();
  };

  const formikData = useFormik({
    initialValues: initilalFormValues,
    //validationSchema: (validateMedication && medicationValidationSchema),
    onSubmit: handleCompleteCheckIn,
  });
  const formik = useFormik({
    initialValues: initialMedicationValues,
    validationSchema: medicationValidationSchema,
    onSubmit: handleDialog,
  });
  //console.log("formikData.values",formikData.errors)

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const handleScroll = () => {
  //   const scrollPosition = window.scrollY + window.innerHeight / 2;
  //   const inViewSection = Object.keys(sectionRefs).find((sectionId) => {
  //     const ref = sectionRefs[sectionId];
  //     return ref.current?.offsetTop! <= scrollPosition &&
  //       ref.current?.offsetTop! + ref.current?.offsetHeight! > scrollPosition
  //   });
  //   setActiveSection(inViewSection || '');
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const scrollToUserControl = () => {
  //   if (userControlRef.current) {
  //     userControlRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

  const headerTabs: HeaderTabs[] = [
    {
      label: "Clinical Data",
    },
    {
      label: "Encounter",
    },
    {
      label: "Templates",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    switch (sectionId) {
      case "Medications":
        scrollToRef(medicationsTab);
        break;
      case "ADHERENCE_TO_TREATMENT":
        scrollToRef(adherenceRef);
        break;
      case "STI_TESTING_AND_HISTORY":
        scrollToRef(stitestingHistoryRef);
        break;
      case "SUBSTANCE_ABUSE_HISTORY":
        scrollToRef(SubstanceRef);
        break;
      case "RISK_BEHAVIOR_SCREENING":
        scrollToRef(riskBehaviorScreeningRef);
        break;
      case "SOCIAL_AND_ENVIRONMENT_SUPPORT":
        scrollToRef(socialRef);
        break;
      case "HIV_AIDS_AND_OTHER_STDS_EDUCATION":
        scrollToRef(hivAidsAndOtherStdEducationRef);
        break;
      case "FAMILY_PLANNING":
        scrollToRef(familyPlanningRef);
        break;
      case "REFERRALS_FOR_SERVICES":
        scrollToRef(referralsForServicesRef);
        break;
      case "OTHERS":
        scrollToRef(OtherRef);
        break;
      default:
        break;
    }
  };

  const handleChange = (_event: any, newValue: number) => {
    setIndexValues(newValue);
  };
  const handleOpenTab = (tabId: any) => {
    setOpenSideListComponent(tabId);
    //scrollToUserControl();
  };

  const handleCancelEncounter = () => {
    setOpenCancelModal(true);
  };

  const handleSharePdfView = () => {
    setSharePdf((item) => !item);
  };

  const handleViewFilledIntake = () => {
    setOpenIntakeForm((item) => !item);
  };

  const { data: encounterDetails } =
    useEncounterCarePortalControllerServiceGetEncounterDetails1({
      uuid: apptInfo
        ? apptInfo?.encounterUuid
        : unsignedEncounter?.encounterUuid,
    });
  // console.log(
  //   "encounterDetails",
  //   encounterDetails?.data?.patientMedicationList
  // );
  const patchData = (encounterDetails: any) => {
    if (encounterDetails?.data?.chiefComplaint) {
      formikData.setFieldValue(
        "chiefComplaint",
        encounterDetails?.data?.chiefComplaint
      );
    }
    if (
      encounterDetails &&
      encounterDetails?.data?.patientMedicationList.length > 0
    ) {
      setMedications(encounterDetails?.data?.patientMedicationList);
    }
    encounterDetails?.data?.carePatientChartList?.forEach((data: any) => {
      switch (data.carePatientChartingType) {
        case CarePatientChart.carePatientChartingType.ADHERENCE_TO_TREATMENT:
          formikData.setFieldValue(
            `carePatientChartList[0].description`,
            data?.description
          );
          break;

        case CarePatientChart.carePatientChartingType.STI_TESTING_AND_HISTORY:
          formikData.setFieldValue(
            `carePatientChartList[1].description`,
            data?.description
          );
          break;

        case CarePatientChart.carePatientChartingType.SUBSTANCE_ABUSE_HISTORY:
          formikData.setFieldValue(
            `carePatientChartList[2].description`,
            data?.description
          );
          break;

        case CarePatientChart.carePatientChartingType.RISK_BEHAVIOR_SCREENING:
          formikData.setFieldValue(
            `carePatientChartList[3].description`,
            data?.description
          );
          break;

        case CarePatientChart.carePatientChartingType
          .SOCIAL_AND_ENVIRONMENTAL_SUPPORT:
          switch (data.socialAndEnvironmentalSupportType) {
            case CarePatientChart.socialAndEnvironmentalSupportType.HOUSING:
              formikData.setFieldValue(
                `carePatientChartList[4].description`,
                data?.description
              );
              break;

            case CarePatientChart.socialAndEnvironmentalSupportType
              .EMPLOYMENT_SOURCES_OF_INCOME:
              formikData.setFieldValue(
                `carePatientChartList[5].description`,
                data?.description
              );
              break;

            case CarePatientChart.socialAndEnvironmentalSupportType
              .EMOTIONAL_SUPPORT:
              formikData.setFieldValue(
                `carePatientChartList[6].description`,
                data?.description
              );
              break;

            case CarePatientChart.socialAndEnvironmentalSupportType
              .FOOD_ASSISTANCE:
              formikData.setFieldValue(
                `carePatientChartList[7].description`,
                data?.description
              );
              break;

            case CarePatientChart.socialAndEnvironmentalSupportType
              .TRANSPORTATION:
              formikData.setFieldValue(
                `carePatientChartList[8].description`,
                data?.description
              );
              break;

            case CarePatientChart.socialAndEnvironmentalSupportType
              .SUPPORT_GROUPS_FAMILY:
              formikData.setFieldValue(
                `carePatientChartList[9].description`,
                data?.description
              );
              break;

            case CarePatientChart.socialAndEnvironmentalSupportType
              .HISTORY_OF_INCARCERATION:
              formikData.setFieldValue(
                `carePatientChartList[10].description`,
                data?.description
              );
              break;
          }
          break;

        case CarePatientChart.carePatientChartingType
          .HIV_AIDS_AND_OTHER_STDS_EDUCATION:
          formikData.setFieldValue(
            `carePatientChartList[11].description`,
            data?.description
          );
          break;

        case CarePatientChart.carePatientChartingType.FAMILY_PLANNING:
          formikData.setFieldValue(
            `carePatientChartList[12].description`,
            data?.description
          );
          break;

        case CarePatientChart.carePatientChartingType.REFERRALS_FOR_SERVICES:
          formikData.setFieldValue(
            `carePatientChartList[13].description`,
            data?.description
          );
          break;
        case CarePatientChart.carePatientChartingType.OTHERS:
          formikData.setFieldValue(
            `carePatientChartList[14].description`,
            data?.description
          );
          break;

        default:
          break;
      }
    });
  };
  //console.log("formikData Values....",formikData.values)

  useEffect(() => {
    // if (encounterDetails) {
    //   formikData.setValues(encounterDetails?.data as any);
    // }
    patchData(encounterDetails);
    //console.log("encounterDetails",encounterDetails)
  }, [encounterDetails, unsignedEncounter]);

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
  }, [isError]);

  const handleSaveAsDraft = async () => {
    formikData.values.encounterStatus =
      EncounterDetailsRequest.encounterStatus.UNSIGNED;

    //formikData.setValues(formikData?.values);
    const filteredCarePatientChartList =
      formikData?.values?.carePatientChartList?.filter(
        (item: any) => item?.description.trim() !== ""
      );
    let patientMedicationList = medications?.filter(
      (medication: any) => medication?.drugCatalog?.medicine !== ""
    );
    // if (
    //   formik.values.drugCatalog.medicine &&
    //   formik.values.dosageTime &&
    //   formik.values.dosageUnit &&
    //   formik.values.dosageWhen &&
    //   formik.values.sig &&
    //   formik.values.startDate
    // ) {
    //   patientMedicationList.push({
    //     drugCatalog: {
    //       id: formik.values.drugCatalog.id,
    //       medicine: formik.values.drugCatalog.medicine,
    //       type: formik.values.drugCatalog.type,
    //     },
    //     quantity: formik.values.quantity,
    //     dosageUnit: formik.values.dosageUnit,
    //     dosageWhen: formik.values.dosageWhen,
    //     dosageTime: formik.values.dosageTime,
    //     startDate: formik.values.startDate,
    //     endDate: formik.values.endDate,
    //     sig: formik.values.sig,
    //     duration: formik.values.duration,
    //     note: formik.values.note,
    //     encounterId: encounterUuid,
    //   });
    // } else {
    //   patientMedicationList = [];
    // }
    const updatedValues = {
      ...formikData?.values,
      carePatientChartList: filteredCarePatientChartList,
      patientMedicationList,
    };
    //console.log("qqqqqqqqqqq",formikData.values)
    if (formikData.values) {
      await addEncounterMutateAsync({
        //requestBody: formikData.values as unknown as EncounterDetailsRequest,
        requestBody: updatedValues as unknown as EncounterDetailsRequest,
      }).then((res: any) => {
        navigate("/provider/unsigned-visit");
        dispatch(
          alertAction.setAlert({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
      });
    }
  };
  const [enablePreview, setEnablePreview] = useState(false);
  useEffect(() => {
    if (unsignedEncounter && unsignedEncounter.status === "SIGNED") {
      setEnablePreview(true);
    }
  }, [unsignedEncounter]);

  const handleCheckInAfterPreview = () => {
    formikData.submitForm();
  };

  return (
    <>
      <form>
        <Box display={"grid"} gridTemplateColumns={"70% 1fr"} gap={2} py={1}>
          <Box>
            <Box>
              <Grid
                display={"flex"}
                gap={1}
                sx={{
                  background: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Grid p={2}>
                  <img
                    style={{ height: "80px", width: "80px" }}
                    src={patientData?.avatar || avatar}
                  />
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                  }}
                >
                  <Grid
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                    px={2}
                    py={2}
                  >
                    <Typography
                      variant="h3"
                      fontWeight={"bold"}
                      sx={{ color: "#0097f0", paddingRight: 2 }}
                    >
                      {patientData?.legalFirstName +
                        " " +
                        patientData?.legalLastName}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                      SSN :
                    </Typography>
                    <Typography variant="h5" sx={{ marginRight: 3 }}>
                      {patientData?.ssn || "-"}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                      {"DOB :"}
                    </Typography>
                    <Typography variant="h5" sx={{ color: "#7b7b7b" }}>
                      {formatDateMMDDYYWithoutTz(
                        patientData?.birthDate as string
                      )}
                    </Typography>
                    <Typography variant="h5">
                      {"(" + toCamelCase(patientData?.gender as string) + ")"}
                    </Typography>
                  </Grid>
                  <Grid
                    display={"flex"}
                    gap={0.7}
                    justifyContent={"start"}
                    px={2}
                    py={2}
                  >
                    <Typography sx={{ color: "#7b7b7b" }}>
                      MOBILE NUMBER :
                    </Typography>
                    <Typography>{patientData?.contactNumber}</Typography>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    rowGap: "0.5",
                  }}
                >
                  <Grid display={"flex"} gap={0.7} px={2} py={2}>
                    {/* <Typography
                      px={1.2}
                      py={0.3}
                      sx={{
                        border: "1px solid #ffe2e2",
                        borderRadius: "20px",
                        color: "red",
                        background: "#ffe2e2",
                      }}
                    >
                      {countAllergy + " Allergies"}
                    </Typography> */}
                    <ButtonBase
                      sx={{
                        display: "flex",
                        px: "8px",
                        py: "2px",
                        background: "#e5e5e5",
                        border: "1px solid gray",
                        mx: "10px",
                      }}
                    >
                      <Typography>{"Invite Patient"}</Typography>
                    </ButtonBase>
                  </Grid>
                  <Grid
                    display={"flex"}
                    gap={0.7}
                    justifyContent={"start"}
                    px={2}
                    py={2}
                  >
                    <ButtonBase sx={{ display: "flex", gap: "3px" }}>
                      <AddCircleOutlineIcon
                        sx={{ color: "#003cc2", fontSize: "18px" }}
                      />
                      <Typography sx={{ color: "#003cc2" }}>Flag</Typography>
                    </ButtonBase>
                    <Typography
                      ml={1}
                      px={0.8}
                      py={0.2}
                      sx={{
                        background: "#f5f5dd",
                        color: "#b4b400 ",
                        borderRadius: "20px",
                      }}
                    >
                      Diabetic
                    </Typography>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    rowGap: "0.5",
                  }}
                >
                  <Grid display={"flex"} gap={1} px={2} py={2}>
                    <Typography sx={{ color: "#7b7b7b" }}>
                      {"INSURANCE"}
                    </Typography>
                    <Typography>{"-"}</Typography>
                  </Grid>
                  <Grid
                    display={"flex"}
                    gap={0.7}
                    justifyContent={"start"}
                    px={2}
                    py={2}
                  >
                    <Typography sx={{ color: "#7b7b7b" }}>
                      PRIMARY PROVIDER
                    </Typography>
                    <Typography>
                      {patientData?.provider?.firstName +
                        " " +
                        patientData?.provider?.lastName || "-"}
                    </Typography>
                  </Grid>
                </Box>
              </Grid>
            </Box>
            <Box mt={1}></Box>
            <Grid
              display={"flex"}
              gap={1}
              sx={{
                background: "#fff",
                borderRadius: "5px",
                boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                padding: "15px",
                marginTop: "1px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Select
                sx={{ width: "20%", height: "40px", background: "#efefef" }}
                name="status"
                renderValue={() => {
                  return (
                    <span>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#1A1A1A80 !important",
                          fontWeight: "bold",
                        }}
                      >
                        SOAP Note
                      </Typography>
                    </span>
                  );
                }}
                displayEmpty
              ></Select>
              <ButtonBase
                sx={{
                  ...formButtonStyle.editProfileBtn,
                  paddingX: "1rem",
                  paddingY: "1rem",
                  backgroundColor: "#efefef",
                }}
                onClick={handleViewFilledIntake}
              >
                Intake
                <Typography>{`(${
                  (apptInfo && apptInfo?.intakeFormCount) || "0"
                })`}</Typography>
              </ButtonBase>
            </Grid>
            {!enablePreview ? (
              <Box
                sx={{
                  background: "#fff",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                }}
                mt={1}
                p={2}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "11% 1fr",
                  }}
                >
                  <Grid>
                    <Box
                      sx={{ borderRight: "1px solid silver", opacity: "0.8" }}
                    >
                      {careSideBarList.map((tab: any) => {
                        return (
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleOpenTab(tab.id);
                                scrollToSection(tab.id);
                              }}
                            >
                              <Grid
                                sx={{
                                  padding: "6px",
                                  py: "11px",
                                  borderTopRightRadius:
                                    tab.id === openSideListComponent
                                      ? "#1071d1 !important"
                                      : "",
                                }}
                              >
                                <Typography
                                  className={` ${
                                    tab.id === openSideListComponent &&
                                    activeTab
                                  }`}
                                  sx={{
                                    color:
                                      tab.id === openSideListComponent
                                        ? "#004186 !important"
                                        : "black !important",
                                    fontWeight:
                                      tab.id === openSideListComponent
                                        ? "600"
                                        : "",
                                  }}
                                >
                                  {tab.name}
                                </Typography>
                              </Grid>
                              {tab.id === openSideListComponent && (
                                <Grid
                                  sx={{
                                    width: "3px",
                                    borderRadius: "2px",
                                    background: "#003cc2 !important",
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Grid>
                  <Grid
                    ref={userControlRef}
                    sx={{ overflowY: "scroll", maxHeight: "71.5vh" }}
                    px={2}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        py: "7px",
                      }}
                      mb={1}
                    >
                      <Typography variant="h3">
                        {"APPOINTMENT DETAILS"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "0.5",
                      }}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          my: "10px",
                        }}
                      >
                        <Grid container gap={1}>
                          <Typography sx={key}>
                            {"Appointment Date & Time"}
                          </Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            {apptInfo?.appointmentDate
                              ? moment(apptInfo?.appointmentDate).format(
                                  "MM-DD-YYYY"
                                ) +
                                  " " +
                                  apptInfo?.startTime || "-"
                              : moment(unsignedEncounter?.updatedDate).format(
                                  "MM-DD-YYYY"
                                ) +
                                  " " +
                                  unsignedEncounter?.startTime || "-"}
                          </Typography>
                        </Grid>
                        <Grid container gap={1}>
                          <Typography sx={key}>{"Appointment Type"}</Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            {apptInfo?.appointmentType
                              ? toCamelCase(apptInfo?.appointmentType)
                              : toCamelCase(
                                  unsignedEncounter?.appointmentType
                                ) || "-"}
                          </Typography>
                        </Grid>
                        <Grid container gap={1}>
                          <Typography sx={key}>
                            {"Rendering Provider"}
                          </Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            {apptInfo?.providerName
                              ? apptInfo?.providerName
                              : unsignedEncounter?.providerName || "-"}
                          </Typography>
                        </Grid>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          my: "10px",
                        }}
                      >
                        <Grid container gap={1}>
                          <Typography sx={key}>{"Age at Encounter"}</Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            <AgeCalculator
                              birthdate={
                                unsignedEncounter
                                  ? unsignedEncounter?.dob
                                  : (patientData?.birthDate as string)
                              }
                            />
                            &nbsp;{"- Years"}
                          </Typography>
                        </Grid>
                        <Grid container gap={1}>
                          <Typography sx={key}>{"Location"}</Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            {apptInfo?.locationName
                              ? apptInfo?.locationName
                              : unsignedEncounter?.location || "-"}
                          </Typography>
                        </Grid>
                        <Grid container gap={1}>
                          <Typography sx={key}>{"POS"}</Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            {apptInfo?.locationName
                              ? apptInfo?.locationName
                              : unsignedEncounter?.location || "-"}
                          </Typography>
                        </Grid>
                      </Box>
                    </Box>
                    <hr />
                    <Box>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"CHIEF COMPLAINT(CC)"}
                        </Typography>
                      </Grid>
                      <Grid py={2}>
                        <InputBase
                          name="chiefCompliant"
                          value={formikData.values.chiefComplaint}
                          onChange={(e) =>
                            formikData.setFieldValue(
                              "chiefComplaint",
                              e.target.value
                            )
                          }
                          fullWidth
                          placeholder="Chief Complaint"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                        />
                      </Grid>
                    </Box>
                    <hr />
                    <Box ref={medicationsTab}>
                      <Grid
                        sx={{ background: "#efefef", mt: "20px", mb: "20px" }}
                      >
                        <Typography variant="h3" px={1} py={1}>
                          {"MEDICATIONS"}
                        </Typography>
                      </Grid>
                      {medications[0]?.drugCatalog?.medicine !== "" &&
                        medications.map((medicine: any) => (
                          <Grid sx={{ ...commonContainer, my: 2 }}>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>
                                {"Medication Name"}
                              </Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {medicine?.drugCatalog?.medicine || "-"}
                              </Typography>
                            </Box>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>{"Start Date"}</Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {medicine?.startDate
                                  ? moment(medicine?.startDate).format(
                                      "MM-DD-YYYY"
                                    )
                                  : "-"}
                              </Typography>
                            </Box>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>{"End Date"}</Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {medicine?.endDate
                                  ? moment(medicine?.endDate).format(
                                      "MM-DD-YYYY"
                                    )
                                  : "-"}
                              </Typography>
                            </Box>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>{"Dosage Time"}</Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {transformText(medicine?.dosageTime) || "-"}
                              </Typography>
                            </Box>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>{"Dosage Unit"}</Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {transformText(medicine?.dosageUnit) || "-"}
                              </Typography>
                            </Box>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>{"Dosage When"}</Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {transformText(medicine?.dosageWhen) || "-"}
                              </Typography>
                            </Box>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>{"Duration"}</Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {medicine?.duration || "-"}
                              </Typography>
                            </Box>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>{"Sig"}</Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {medicine?.sig || "-"}
                              </Typography>
                            </Box>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"13% 2% 1fr"}
                            >
                              <Typography sx={key}>{"Note"}</Typography>
                              <Typography sx={key}>{"-"}</Typography>
                              <Typography sx={val}>
                                {medicine?.note || "-"}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      <Grid my={2}>
                        <ButtonBase
                          sx={grayButtonStyle}
                          onClick={() => {
                            handleDialog();
                            //setCurrentComponent("Medications");
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Medications"}
                          </Typography>
                        </ButtonBase>
                      </Grid>
                    </Box>
                    <Box ref={adherenceRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"ADHERENCE TO TREATMENT"}
                        </Typography>
                      </Grid>
                      <Grid my={2}>
                        <InputBase
                          name="carePatientChartList[0].description"
                          value={
                            formikData?.values?.carePatientChartList[0]
                              ?.description
                          }
                          onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="2"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          //placeholder="Description"
                        />
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, mt: "10px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("ADHERENCE_TO_TREATMENT")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Adherence to Treatment"}
                          </Typography>
                        </ButtonBase> */}
                      </Grid>
                    </Box>
                    <Box ref={stitestingHistoryRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"STI TESTING AND HISTORY"}
                        </Typography>
                      </Grid>
                      <Grid my={2}>
                        <InputBase
                          name="carePatientChartList[1].description"
                          value={
                            formikData?.values?.carePatientChartList[1]
                              ?.description
                          }
                          onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="2"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          //placeholder="Description"
                        />
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, mt: "10px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("STI_TESTING_AND_HISTORY")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add STI Testing and History"}
                          </Typography>
                        </ButtonBase> */}
                      </Grid>
                    </Box>
                    <Box ref={SubstanceRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"SUBSTANCE ABUSE HISTORY"}
                        </Typography>
                      </Grid>
                      <Grid my={2}>
                        <InputBase
                          name="carePatientChartList[2].description"
                          value={
                            formikData?.values?.carePatientChartList[2]
                              ?.description
                          }
                          onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="2"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          //placeholder="Description"
                        />
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, mt: "10px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("SUBSTANCE_ABUSE_HISTORY")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Substance Abuse History"}
                          </Typography>
                        </ButtonBase> */}
                      </Grid>
                    </Box>

                    <Box ref={riskBehaviorScreeningRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"RISK BEHAVIOR SCREENING"}
                        </Typography>
                      </Grid>
                      <Grid my={2}>
                        <InputBase
                          name="carePatientChartList[3].description"
                          value={
                            formikData?.values?.carePatientChartList[3]
                              ?.description
                          }
                          onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="2"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          //placeholder="Description"
                        />
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, mt: "10px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("RISK_BEHAVIOR_SCREENING")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Risk Behavior Screening"}
                          </Typography>
                        </ButtonBase> */}
                      </Grid>
                    </Box>
                    <Box ref={socialRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"SOCIAL AND ENVIRONMENT SUPPORT"}
                        </Typography>
                      </Grid>
                      <Box my={2}>
                        <Box>
                          <Grid sx={{ background: "#efefef", my: "20px" }}>
                            <Typography variant="h3" px={1} py={1}>
                              {"Housing"}
                            </Typography>
                          </Grid>
                          <InputBase
                            name="carePatientChartList[4].description"
                            value={
                              formikData?.values?.carePatientChartList[4]
                                ?.description
                            }
                            onChange={formikData.handleChange}
                            fullWidth
                            multiline={true}
                            rows="2"
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                            //placeholder="Description"
                          />
                        </Box>
                        <Box>
                          <Grid sx={{ background: "#efefef", my: "20px" }}>
                            <Typography variant="h3" px={1} py={1}>
                              {"Employment/Sources Of Income"}
                            </Typography>
                          </Grid>
                          <InputBase
                            name="carePatientChartList[5].description"
                            value={
                              formikData?.values?.carePatientChartList[5]
                                ?.description
                            }
                            onChange={formikData.handleChange}
                            fullWidth
                            multiline={true}
                            rows="2"
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                            //placeholder="Description"
                          />
                        </Box>
                        <Box>
                          <Grid sx={{ background: "#efefef", my: "20px" }}>
                            <Typography variant="h3" px={1} py={1}>
                              {"Emotional Support"}
                            </Typography>
                          </Grid>
                          <InputBase
                            name="carePatientChartList[6].description"
                            value={
                              formikData?.values?.carePatientChartList[6]
                                ?.description
                            }
                            onChange={formikData.handleChange}
                            fullWidth
                            multiline={true}
                            rows="2"
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                            //placeholder="Description"
                          />
                        </Box>
                        <Box>
                          <Grid sx={{ background: "#efefef", my: "20px" }}>
                            <Typography variant="h3" px={1} py={1}>
                              {"Food Assistance"}
                            </Typography>
                          </Grid>
                          <InputBase
                            name="carePatientChartList[7].description"
                            value={
                              formikData?.values?.carePatientChartList[7]
                                ?.description
                            }
                            onChange={formikData.handleChange}
                            fullWidth
                            multiline={true}
                            rows="2"
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                            //placeholder="Description"
                          />
                        </Box>
                        <Box>
                          <Grid sx={{ background: "#efefef", my: "20px" }}>
                            <Typography variant="h3" px={1} py={1}>
                              {"Transportation"}
                            </Typography>
                          </Grid>
                          <InputBase
                            name="carePatientChartList[8].description"
                            value={
                              formikData?.values?.carePatientChartList[8]
                                ?.description
                            }
                            onChange={formikData.handleChange}
                            fullWidth
                            multiline={true}
                            rows="2"
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                            //placeholder="Description"
                          />
                        </Box>
                        <Box>
                          <Grid sx={{ background: "#efefef", my: "20px" }}>
                            <Typography variant="h3" px={1} py={1}>
                              {"Support Group/Family"}
                            </Typography>
                          </Grid>
                          <InputBase
                            name="carePatientChartList[9].description"
                            value={
                              formikData?.values?.carePatientChartList[9]
                                ?.description
                            }
                            onChange={formikData.handleChange}
                            fullWidth
                            multiline={true}
                            rows="2"
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                            //placeholder="Description"
                          />
                        </Box>
                        <Box>
                          <Grid sx={{ background: "#efefef", my: "20px" }}>
                            <Typography variant="h3" px={1} py={1}>
                              {"History of Incarceration"}
                            </Typography>
                          </Grid>
                          <InputBase
                            name="carePatientChartList[10].description"
                            value={
                              formikData?.values?.carePatientChartList[10]
                                ?.description
                            }
                            onChange={formikData.handleChange}
                            fullWidth
                            multiline={true}
                            rows="2"
                            classes={{
                              root: classes.providerTextAreaField,
                              input: classes.textFieldInput,
                              focused: classes.textFieldActive,
                            }}
                            //placeholder="Description"
                          />
                        </Box>
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, m: "4px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("HOUSING")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">{"Add  Housing"}</Typography>
                        </ButtonBase>
                        <ButtonBase
                          sx={{ ...grayButtonStyle, m: "4px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("EMPLOYMENT_SOURCES_OF_INCOME")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Employment/Sources of Income"}
                          </Typography>
                        </ButtonBase>
                        <ButtonBase
                          sx={{ ...grayButtonStyle, m: "4px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("EMOTIONAL_SUPPORT")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Emotional Support"}
                          </Typography>
                        </ButtonBase>
                        <ButtonBase
                          sx={{ ...grayButtonStyle, m: "4px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("FOOD_ASSISTANCE")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Food Assistance"}
                          </Typography>
                        </ButtonBase>
                        <ButtonBase
                          sx={{ ...grayButtonStyle, m: "4px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("TRANSPORTATION")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add transportation"}
                          </Typography>
                        </ButtonBase>
                        <ButtonBase
                          sx={{ ...grayButtonStyle, m: "4px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("SUPPORT_GROUPS_FAMILY")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Support Group/Family"}
                          </Typography>
                        </ButtonBase>
                        <ButtonBase
                          sx={{ ...grayButtonStyle, m: "4px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("HISTORY_OF_INCARCERATION")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add History of Incarceration"}
                          </Typography>
                        </ButtonBase> */}
                      </Box>
                    </Box>
                    <Box ref={hivAidsAndOtherStdEducationRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"HIV/AIDS AND OTHER STD EDUCATION"}
                        </Typography>
                      </Grid>
                      <Grid my={2}>
                        <InputBase
                          name="carePatientChartList[11].description"
                          value={
                            formikData?.values?.carePatientChartList[11]
                              ?.description
                          }
                          onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="2"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          //placeholder="Description"
                        />
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, mt: "10px" }}
                          onClick={()=>{
                            handleDialog()
                            setCurrentComponent("HIV_AIDS_AND_OTHER_STDS_EDUCATION")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add HIV/AIDS and Other STD Education"}
                          </Typography>
                        </ButtonBase> */}
                      </Grid>
                    </Box>
                    <Box ref={familyPlanningRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"FAMILY PLANNING"}
                        </Typography>
                      </Grid>
                      <Grid my={2}>
                        <InputBase
                          name="carePatientChartList[12].description"
                          value={
                            formikData?.values?.carePatientChartList[12]
                              ?.description
                          }
                          onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="2"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          //placeholder="Description"
                        />
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, mt: "10px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("FAMILY_PLANNING")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Family Planning"}
                          </Typography>
                        </ButtonBase> */}
                      </Grid>
                    </Box>
                    <Box ref={referralsForServicesRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"REFERRALS FOR SERVICES"}
                        </Typography>
                      </Grid>
                      <Grid my={2}>
                        <InputBase
                          name="carePatientChartList[13].description"
                          value={
                            formikData?.values?.carePatientChartList[13]
                              ?.description
                          }
                          onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="2"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          //placeholder="Description"
                        />
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, mt: "10px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("REFERRALS_FOR_SERVICES")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Referrals For Services"}
                          </Typography>
                        </ButtonBase> */}
                      </Grid>
                    </Box>
                    <Box ref={OtherRef}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"OTHERS"}
                        </Typography>
                      </Grid>
                      <Grid my={2}>
                        <InputBase
                          name="carePatientChartList[14].description"
                          value={
                            formikData?.values?.carePatientChartList[14]
                              ?.description
                          }
                          onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="2"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          //placeholder="Description"
                        />
                        {/* <ButtonBase
                          sx={{ ...grayButtonStyle, mt: "10px" }}
                          onClick={()=>{
                            handleDialog
                            setCurrentComponent("REFERRALS_FOR_SERVICES")
                          }}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">
                            {"Add Referrals For Services"}
                          </Typography>
                        </ButtonBase> */}
                      </Grid>
                    </Box>
                    {/* <Box>
                      <Grid my={1.5}>
                        <Typography fontWeight={"600"} fontSize={"17px"}>
                          {"Follow Up & Instruction Note"}
                        </Typography>
                      </Grid>
                      <Grid py={0}>
                        <InputBase
                          name="encounterPlan.instructionNote"
                          // value={formikData.values.encounterPlan.instructionNote}
                          // onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="4"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          placeholder="Follow up & instruction note"
                        />
                      </Grid>
                    </Box> */}
                    {/* <Box>
                      <Grid my={1.5}>
                        <Typography fontWeight={"600"} fontSize={"17px"}>
                          {"Additional Note"}
                        </Typography>
                      </Grid>
                      <Grid py={0}>
                        <InputBase
                          name={"encounterPlan.additionalNote"}
                          // value={formikData.values.encounterPlan.additionalNote}
                          // onChange={formikData.handleChange}
                          fullWidth
                          multiline={true}
                          rows="4"
                          classes={{
                            root: classes.providerTextAreaField,
                            input: classes.textFieldInput,
                            focused: classes.textFieldActive,
                          }}
                          placeholder="Additional Note"
                        />
                      </Grid>
                    </Box> */}
                    <Box
                      py={3}
                      sx={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "end",
                        alignItems: "center",
                      }}
                    >
                      <ButtonBase
                        sx={blueButtonStyle}
                        onClick={handleCancelEncounter}
                      >
                        <Typography sx={{ color: "#2c57b3" }}>
                          {"Cancel"}
                        </Typography>
                      </ButtonBase>
                      <ButtonBase
                        sx={blueButtonStyle}
                        onClick={() => {
                          handleSaveAsDraft();
                        }}
                      >
                        <Typography sx={{ color: "#2c57b3" }}>
                          {"Save As Draft"}
                        </Typography>
                      </ButtonBase>
                      <ButtonBase
                        sx={{
                          px: "20px",
                          py: "8px",
                          borderRadius: "5px",
                          backgroundColor: "#2c57b3",
                          border: "1px solid #2c57b3",
                        }}
                        onClick={() => setEnablePreview(true)}
                      >
                        <Typography sx={{ color: "#fff" }}>{"Save"}</Typography>
                      </ButtonBase>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  background: "#fff",
                  borderBottomLeftRadius: "5px",
                  borderBottomRightRadius: "5px",
                  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                }}
                mt={1}
                p={2}
              >
                <ViewCareUnsignedVisite
                  formik={formik}
                  formikData={formikData}
                  medications={medications}
                  handleCheckInAfterPreview={handleCheckInAfterPreview}
                  setEnablePreview={setEnablePreview}
                  isSignedView={
                    unsignedEncounter && unsignedEncounter.status === "SIGNED"
                      ? true
                      : false
                  }
                  appInfo={apptInfo}
                  unsignedEncounter={unsignedEncounter}
                  handleCancelEncounter={handleCancelEncounter}
                  handleViewEncounterDetails={handleViewEncounterDetails}
                  setSharePdf={setSharePdf}
                />
              </Box>
            )}
          </Box>
          <Box>
            {!(unsignedEncounter && unsignedEncounter.status === "SIGNED") ? (
              <Box
                sx={{
                  background: "#fff",
                  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  borderRadius: "5px",
                  paddingX: "16px",
                  paddingY: "5px",
                }}
              >
                <Grid>
                  <Tabs
                    value={indexValues}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    {headerTabs.map((tab: any) => {
                      return (
                        <Tab
                          key={tab.label}
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "bold !important",
                            fontSize: "16px !important",
                          }}
                          label={tab.label}
                        />
                      );
                    })}
                  </Tabs>
                </Grid>
                <Grid
                  sx={{ overflowY: "scroll", height: "92.5vh" }}
                  pt={5}
                  px={2}
                  pb={3}
                >
                  {indexValues === 0 && (
                    <ClinicalCareData
                      patientUuid={
                        apptInfo?.patientUuid
                          ? apptInfo?.patientUuid
                          : unsignedEncounter?.patientUuid
                      }
                    />
                  )}
                  {indexValues === 1 && (
                    <CareEncounterTab
                      patientUuid={
                        unsignedEncounter
                          ? unsignedEncounter?.patientUuid
                          : apptInfo?.patientUuid
                      }
                    />
                  )}
                  {indexValues === 2 && <TemplateTab />}
                </Grid>
              </Box>
            ) : (
              <Box
                sx={{
                  background: "#fff",
                  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
                  borderRadius: "5px",
                  paddingX: "16px",
                  pb: 68,
                }}
              >
                <Box>
                  <Typography variant="h1" sx={{ pt: 2 }}>
                    {"Signatures"}
                  </Typography>
                  <Box
                    sx={{
                      // display: "flex",
                      border: "1px solid #003cc2",
                      borderRadius: "5px",
                      marginTop: "30px",
                      background: "#e1effb",
                      height: "200px",
                    }}
                    px={2}
                    pt={3}
                  >
                    <Typography
                      variant="h1"
                      style={{
                        color: "black",
                        fontFamily: "Serif",
                        fontStyle: "italic",
                        paddingTop: "60px",
                        fontWeight: 500,
                      }}
                      className={"signatureStyle"}
                    >
                      {unsignedEncounter?.providerName || "-"}
                    </Typography>
                    <Box mt={2}>
                      <Typography>
                        {"Signed by " + unsignedEncounter?.providerName || "-"}
                      </Typography>
                      <Typography>
                        {formatDateMMDDYYWithoutTz(todayDate as any)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        {/*<Box>
          <Dialog
            maxWidth="sm"
            fullWidth={true}
            onClose={handleDialog}
            open={openDialog}
          >
            <DialogTitle>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography pl={1.5} variant="h4">
                  {currentComponent === "Medications"
                    ? "Medications"
                    : currentComponent === "ADHERENCE_TO_TREATMENT"
                    ? ADHERENCE_TITLE
                    : currentComponent === "STI_TESTING_AND_HISTORY"
                    ? STI_TESTING_AND_HISTORY
                    : currentComponent === "SUBSTANCE_ABUSE_HISTORY"
                    ? ADD_SUBSTANCE_TITLE
                    : currentComponent === "RISK_BEHAVIOR_SCREENING"
                    ? ADD_RISK_SUB_TITLE
                    : currentComponent === "SOCIAL_AND_ENVIRONMENT_SUPPORT"
                    ? ADD_SOCIAL_ND_DIALOG
                    : currentComponent === "HIV_AIDS_AND_OTHER_STDS_EDUCATION"
                    ? ADD_HIV_AID_TITLE
                    : currentComponent === "FAMILY_PLANNING"
                    ? ADD_FAMILY_PLANNING
                    : currentComponent === "REFERRALS_FOR_SERVICES"
                    ? ADD_REFERRALS_TITLE
                    : null}
                </Typography>
                <CloseIcon sx={{ cursor: "pointer" }} onClick={handleDialog} />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid mx={2} pb={3} pt={1}>
                <Box mb={1.5}>
                  <CustomFormLabel label={NAME_TITLE} />
                </Box>
                <InputBase
                  fullWidth
                  placeholder="Enter"
                  name="name"
                  // value={formik.values.name}
                  // onChange={formik.handleChange}
                  // error={!!(formik.errors.name && formik.touched.name)}
                  classes={{
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                    focused: classes.textFieldActive,
                    error: classes.inputBoxError,
                  }}
                />
                {/* {formik.touched.name && formik.errors.name && (
                    <FormHelperText error>
                      {formik.errors.name}
                    </FormHelperText>
                )} 
              </Grid>
              <Grid mx={2}>
                <Box mb={1.5}>
                  <CustomFormLabel label={DESCRIPTION_TITLE} />
                </Box>
                <InputBase
                  fullWidth
                  multiline={true}
                  name="description"
                  //name="providerProfileInfo.experience"
                  // value={formik.values.providerProfileInfo.experience}
                  rows="5"
                  placeholder={TYPE_HERE_PLACEHOLDER}
                  // value={formik.values.description}
                  // onChange={formik.handleChange}
                  // error={!!(formik.errors.description && formik.touched.description)}
                  classes={{
                    root: classes.providerTextAreaField,
                    input: classes.textFieldInput,
                    focused: classes.textFieldActive,
                    error: classes.inputBoxError,
                  }}
                />
                {/* {formik.touched.description && formik.errors.description && (
                    <FormHelperText error>
                      {formik.errors.description}
                    </FormHelperText>
                )} 
              </Grid>
            </DialogContent>
            <DialogActions>
              <ButtonBase
                // onClick={addSpecilityOption}
                //   onClick={formikData.submitForm}
                sx={formButtonStyle.saveButtonStyle}
                onClick={() => {
                  formikData.submitForm();
                }}
              >
                {SAVE_BUTTON_TITLE}
              </ButtonBase>
            </DialogActions>
          </Dialog>
              </Box>*/}

        <Box>
          <Dialog
            open={openSignDialog}
            onClose={handleSignDialog}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="scroll-dialog-title" sx={sxs.headerContainer}>
              <Typography variant="h3">
                {"Sign And Lock Diagnosis And Treatment Plan"}
              </Typography>
              <Close sx={{ cursor: "pointer" }} onClick={handleSignDialog} />
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <Box
                  sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                  columnGap={4}
                >
                  <Box>
                    <Grid>
                      <CustomFormLabel label={"Name"} />
                      <Box>
                        <InputBase
                          fullWidth
                          placeholder="Name"
                          classes={{
                            root: classes.inputField,
                            input: classes.inputBoxText,
                            focused: classes.inputBoxActive,
                          }}
                        />
                      </Box>
                    </Grid>
                    {/* <Grid pt={3}>
                    <CustomFormLabel label={"Description"} />
                    <Box pt={2}>
                      <InputBase
                        name={""}
                        value={""}
                        onChange={() => {}}
                        fullWidth
                        multiline={true}
                        rows="3"
                        classes={{
                          root: classes.providerTextAreaField,
                          input: classes.textFieldInput,
                          focused: classes.textFieldActive,
                        }}
                        placeholder="Enter text"
                      />
                    </Box>
                  </Grid> */}
                  </Box>
                  <Box
                    sx={{
                      // display: "flex",
                      border: "1px solid #003cc2",
                      borderRadius: "5px",
                      marginTop: "30px",
                      background: "#e1effb",
                      height: "120px",
                    }}
                    px={2}
                    pt={3}
                  >
                    <Typography
                      variant="h3"
                      style={{
                        color: "black",
                        fontFamily: "Serif",
                      }}
                      className={"signatureStyle"}
                    >
                      {apptInfo?.providerName
                        ? apptInfo?.providerName
                        : unsignedEncounter?.providerName || "-"}
                    </Typography>
                    <Box mt={2}>
                      <Typography>
                        {"Signed by " +
                          (apptInfo?.providerName
                            ? apptInfo?.providerName
                            : unsignedEncounter?.providerName) || "-"}
                      </Typography>
                      <Typography>
                        {formatDateMMDDYYWithoutTz(todayDate as any)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <ButtonBase
                onClick={handleSigInEncounter}
                sx={{
                  background: "#004186",
                  padding: "8px 8px",
                  borderRadius: "5px",
                }}
              >
                <Typography color={"#fff"}>{"Sign & Lock"}</Typography>
              </ButtonBase>
            </DialogActions>
          </Dialog>
        </Box>
      </form>
      <Grid>
        <MedicationsCareForm
          openDialog={openDialog}
          handleDialog={handleDialog}
          formik={formik}
          medications={medications}
          setMedications={setMedications}
          cancelMedication={cancelMedication}
        />
        {openSuccessModal && (
          <EventSucessModal
            message={"Encounter Note Signed Successfully"}
            onClose={() => setOpenSuccessModal(false)}
            route={"/provider/appointment/calendar"}
          />
        )}
        {openCancelModal && (
          <CancelPopMeassage
            message={"Are you certain you want to end this encounter?"}
            onClose={() => setOpenCancelModal(false)}
            navigateToRoute={"/provider/appointment/calendar"}
          />
        )}
        <EncounterCareView
          open={openEncounterView}
          onClose={handleViewEncounterDetails}
          appointmentDetails={apptInfo ? apptInfo : unsignedEncounter}
          formikData={formikData}
          formik={formik}
          medications={medications}
        />
        <SharePDF
          open={openSharePdf}
          onClose={handleSharePdfView}
          message={"encounter"}
          source={"CareEncounter"}
          uuid={
            apptInfo
              ? apptInfo?.encounterUuid
              : unsignedEncounter?.encounterUuid
          }
        />
        <Box>
          <IntakeFormList
            open={openIntakeForm}
            onClose={handleViewFilledIntake}
            apptInfo={apptInfo}
          />
        </Box>
      </Grid>
    </>
  );
};

export default AppLayout(CompleteCheckInCare, { source: PROVIDER });
