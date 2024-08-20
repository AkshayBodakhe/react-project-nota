import {
  Box,
  ButtonBase,
  Grid,
  InputBase,
  Tab,
  Tabs,
  Typography,
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Autocomplete,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  commonContainer,
  commonWidget,
  formButtonStyle,
  subTitles,
  val,
} from "../../../../../styles/common";
import { PROVIDER } from "../../documents/documents-constant/documents-common-const";
import AppLayout from "../../../../../components/core/layout/layout";
import React, { useEffect, useRef } from "react";
import ClinicalData from "./clinical-data/clinical-data";
import EncounterTab from "./encounter/encounter";
import HistoryTab from "./history/history-tab";
import TemplateTab from "./template/template-tab";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quillStyles.scss";
import { useState } from "react";
import {
  useEncounterControllerServiceAddEncounterDetails,
  useEncounterControllerServiceGetEncounterDetails,
  useMedicalCodeControllerServiceGetAllMedicalCodes,
  usePatientControllerServiceGetPatient,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  BillingCodes,
  EncounterDetailsRequest,
  Patient,
  PatientSocialHistory,
  PatientVital,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import AgeCalculator from "../../../../../components/common/age-calculator/age-calculator";
import HPIForm from "./dialog/hpi";
import ObjectiveForm from "./dialog/objective";
import AddIcdCode from "./dialog/icd-code";
import { useFormik } from "formik";
import * as Yup from "yup";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Column,
  ErrorResponseEntity,
} from "../../../../../components/common/enums-and-interfaces/interfaces";
import { sxs } from "../../../../../components/core/view-appoinment-action-details/check-in-dialog";
import { Close } from "@mui/icons-material";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import "../complete-check-in/quillStyles.scss";
import ROSForm from "./dialog/ros-dialog";
import VitalsForm from "./dialog/vitals";
import { multiSelectDropDown } from "../calendar/appointments";
import { getLoggedInUser } from "../../../../../components/common/enums-and-interfaces/common-functions";
import LabForm from "./dialog/lab-form";
import MedicationsForm from "./dialog/medication-form";
import avatar from "../../../../../assets/other/avatar_01.jpg";
import NoteForBP from "./dialog/bp-note";
import NoteForBMI from "./dialog/bmi-note";
import NoteForHr from "./dialog/hr-note";
import NoteForResp from "./dialog/resp-note";
import NoteForHeight from "./dialog/height-note";
import NoteForWeight from "./dialog/weight-note";
import NoteForTemperature from "./dialog/temperature-note";
import NoteForOxygen from "./dialog/oxigen-note";
import ViewUnsignedVisite from "../../unsigned-visit/view-unsigned";
import CancelPopMeassage from "../../../../../components/common/cancel-pop";
import EncounterView from "../../unsigned-visit/encounter-view";
import PrintEncounterView from "../../unsigned-visit/print-Encouter-View";
import EventSucessModal from "../../../../../components/common/success-modal";
import SharePDF from "./dialog/share-pdf";
import { transformText } from "../../../../../components/common/helper";
import {
  HeaderTabs,
  blueButtonStyle,
  boxContainer,
  displayNote,
  grayButtonStyle,
  key,
  noteBox,
  sideBarList,
  value,
} from "./complete-check-in-const";
import { tableUseStyles } from "../calendar/appointmentWithLocations";
import IntakeFormList from "../appointment-details-dialog/intake-form-list";
const DATE_FORMAT = "MM-DD-YYYY";

export const formatDateMMDDYYWithoutTz = (date: string) => {
  if (!date) {
    return "";
  }
  return moment(date).format(DATE_FORMAT);
};

const tabColumns: Column[] = [
  { id: "medicationName", label: "Medication Name", width: "135px" },
  { id: "startDate", label: "Start Date", width: "130px" },
  { id: "endDate", label: "End Date", width: "130px" },
  { id: "dosageTime", label: "Dosage Time", width: "110px" },
  { id: "dosageUnit", label: "Dosage Unit", width: "140" },
  { id: "dosageWhen", label: "Dosage When", width: "130px" },
  { id: "duration", label: "Duration", width: "110px" },
  { id: "sig", label: "Sig", width: "110px" },
  { id: "note", label: "Note", width: "fit-content" },
];

function CompleteCheckIn() {
  const classes = commonWidget();
  const tableClasses = tableUseStyles();
  const [indexValues, setValue] = useState(0);
  const [patientData, setPatientData] = useState<Patient>();
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openEncounterView, setOpenEncounterView] = useState(false);
  const [openPrintEncounterView, setOpenPrintEncounterView] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openSharePdf, setSharePdf] = useState(false);
  const [openSideListComponent, setOpenSideListComponent] =
    useState("Subjective");
  const [countAllergy, setCountAllergy] = useState(0);
  const [openSubTab, setOpenSubTab] = useState("HPI");
  const getAppointmentDetails = useLocation();
  const getUnsignedEncounter = useLocation();
  const encounterByJoinCall = useSelector(
    (state: any) => state.commonReducer.encounterReducer
  );
  const unsignedEncounter = getUnsignedEncounter?.state?.encounterDetails;
  const apptInfo = getAppointmentDetails?.state?.appointmentDetails
    ? getAppointmentDetails?.state?.appointmentDetails
    : getAppointmentDetails?.state?.row;
  const encounterUuid = getAppointmentDetails?.state?.encounterUuid
    ? getAppointmentDetails?.state?.encounterUuid
    : apptInfo?.encounterUuid
    ? apptInfo?.encounterUuid
    : unsignedEncounter?.encounterUuid
    ? unsignedEncounter?.encounterUuid
    : getAppointmentDetails?.state?.row?.encounterUuid;
  // || encounterByJoinCall?.encounterDetails?.encounterUuid;
  const [openHpi, setOpenHpi] = useState(false);
  const [openROS, setOpenROS] = useState(false);
  const [openPE, setOpenPE] = useState(false);
  const [openObjText, setOpenObjectiveText] = useState(false);
  const [openVitals, setOpenVitals] = useState(false);
  const [openLab, setOpenLab] = useState(false);
  const [openImaging, setOpenImaging] = useState(false);
  const [openIcdCode, setOpenIcdCode] = useState(false);
  const [openPlan, setOpenPlan] = useState(false);
  const [openMedications, setOpenMedication] = useState(false);
  const userControlRef = useRef<HTMLDivElement | null>(null);
  const [openSignDialog, setOpenSignDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const subjectiveTab = useRef(null);
  const objectiveTab = useRef(null);
  const assessmentTab = useRef(null);
  const planTab = useRef(null);
  const hpiTab = useRef(null);
  const rosTab = useRef(null);
  const vitalsTab = useRef(null);
  const peTab = useRef(null);
  const diagnoCodeTab = useRef(null);
  const proceCodeTab = useRef(null);
  const labTab = useRef(null);
  const imagingTab = useRef(null);
  const medicationsTab = useRef(null);
  const instrNoteTab = useRef(null);
  const followUpTab = useRef(null);
  const [icdCodes, setIcdCode] = useState<any[]>();
  const [CPTCodes, setCPTCode] = useState<any[]>();
  const [openBPNote, setOpenBPNote] = useState(false);
  const [openBMINote, setOpenBMINote] = useState(false);
  const [openHr, setOpenHr] = useState(false);
  const [openResp, setOpenResp] = useState(false);
  const [openHeightNote, setOpenHeightNote] = useState(false);
  const [openWeightNote, setOpenWeightNote] = useState(false);
  const [openTempNote, setOpenTempNote] = useState(false);
  const [openOxigenNote, setOpenOxigenNote] = useState(false);
  const [openIntakeForm, setOpenIntakeForm] = useState(false);
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

  const handleSharePdfView = () => {
    setSharePdf((item) => !item);
  };

  const handleViewEncounterDetails = () => {
    setOpenEncounterView((item) => !item);
  };

  const handlePrintViewEncounterDetails = () => {
    setOpenPrintEncounterView((item) => !item);
  };

  const handleOpenSuccessModel = () => {
    setOpenSuccessModal(true);
  };

  const handleOpenHpi = () => {
    setOpenHpi((item) => !item);
  };

  const handleOpenROS = () => {
    setOpenROS((item) => !item);
  };

  const handleOpenPE = () => {
    setOpenPE((item) => !item);
  };

  const handleOpenNote = () => {
    setOpenBPNote((item) => !item);
  };

  const handleOpenBmi = () => {
    setOpenBMINote((item) => !item);
  };

  const handleOpenHr = () => {
    setOpenHr((item) => !item);
  };

  const handleOpenResp = () => {
    setOpenResp((item) => !item);
  };

  const handleOpenHeight = () => {
    setOpenHeightNote((item) => !item);
  };

  const handleOpenWightNote = () => {
    setOpenWeightNote((item) => !item);
  };

  const handleOpenForTemperatureNote = () => {
    setOpenTempNote((item) => !item);
  };

  const handleOpenO2Note = () => {
    setOpenOxigenNote((item) => !item);
  };

  const handleOpenVitals = () => {
    setOpenVitals((item) => !item);
  };

  const handleOpenIcdCode = () => {
    setOpenIcdCode((item) => !item);
  };

  const handleOpenLab = () => {
    setOpenLab((item) => !item);
  };

  const handleOpenImaging = () => {
    setOpenImaging((item) => !item);
  };

  const handleOpenMedications = () => {
    setOpenMedication((item) => !item);
  };

  const handleOpenPlan = () => {
    setOpenPlan((item) => !item);
  };

  const handleOpenTab = (tabId: any, subId: any) => {
    setActiveTab(tabId);
    setOpenSideListComponent(tabId);
    setOpenSubTab(subId);

    if (userControlRef.current) {
      userControlRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    scrollToUserControl();
  };

  const scrollToUserControl = () => {
    if (userControlRef.current) {
      userControlRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleOpenSubTab = (subTabId: any, parentTabId: string) => {
    setOpenSubTab(subTabId);
    if (parentTabId) {
      setOpenSideListComponent(parentTabId);
    }
    scrollToUserControl();
  };

  const headerTabs: HeaderTabs[] = [
    {
      label: "Clinical Data",
    },
    {
      label: "Encounter",
    },
    {
      label: "History",
    },
    {
      label: "Templates",
    },
  ];

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  const { data: patientDetails } = usePatientControllerServiceGetPatient({
    patientUuid: apptInfo?.patientUuid
      ? apptInfo?.patientUuid
      : unsignedEncounter?.patientUuid,
  });

  useEffect(() => {
    if (patientDetails) {
      setPatientData(patientDetails?.data as Patient);
    }
  }, [patientDetails, unsignedEncounter]);
  const {
    mutateAsync: addEncounterMutateAsync,
    isError,
    error,
  } = useEncounterControllerServiceAddEncounterDetails();

  const primaryProviderName =
    patientData?.provider !== null
      ? patientData &&
        patientData?.provider?.firstName + " " + patientData?.provider?.lastName
      : "NA";

  const handleCompleteCheckIn = async (values: any) => {
    const requestBody = {
      encounterUuid: encounterUuid,
      encounterStatus: EncounterDetailsRequest.encounterStatus.UNSIGNED,
      chiefComplaint: values.chiefComplaint,
      subjective: {
        historyOfPresentIllness: {
          todayVisit: values?.subjective?.historyOfPresentIllness?.todayVisit,
          patientPastMedicalHistory: getPatientPastMedicalHistory(
            values?.subjective?.historyOfPresentIllness
          ),
          patientPastSurgicalHistory: getPatientPastSurgicalHistoy(
            values?.subjective?.historyOfPresentIllness
          ),
          hospitalization:
            values.subjective?.historyOfPresentIllness?.hospitalization,
          patientFamilyHistory: getPatientFamilyHistory(
            values?.subjective?.historyOfPresentIllness
          ),
          patientSocialHistory: getPatientSocialHistory(
            values?.subjective?.historyOfPresentIllness
          ),
          patientAllergy: values?.subjective?.historyOfPresentIllness
            ?.patientAllergy?.allergy
            ? {
                allergyType:
                  values?.subjective?.historyOfPresentIllness?.patientAllergy
                    ?.allergyType,
                allergy:
                  values?.subjective?.historyOfPresentIllness?.patientAllergy
                    ?.allergy,
                reaction:
                  values?.subjective?.historyOfPresentIllness?.patientAllergy
                    ?.reaction, //Enum
                severity:
                  values?.subjective?.historyOfPresentIllness?.patientAllergy
                    ?.severity,
                note: values?.subjective?.historyOfPresentIllness
                  ?.patientAllergy?.note,
                status: true,
              }
            : null,
        },
        reviewOfSystem: values?.subjective?.reviewOfSystem,
      },
      // objective: values?.objective,
      objective: {
        ...values?.objective,
        patientVitals: getPatientVitals(values?.objective?.patientVitals),
      },

      assessment: values?.assessment,
      encounterPlan: {
        encounterPlanNote: values?.encounterPlan.encounterPlanNote,
        billingCodes: values?.encounterPlan.billingCodes,
        labTest: values?.encounterPlan?.labTest,
        imaging: values?.encounterPlan?.imaging,
        patientMedications:
          medications[0]?.drugCatalog?.medicine === "" ? null : medications,
        instructionNote: values?.encounterPlan?.instructionNote,
        additionalNote: values?.encounterPlan?.additionalNote,
      },
    };

    if (values) {
      await addEncounterMutateAsync({
        requestBody: requestBody as any,
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

  const { data: encounterDetails } =
    useEncounterControllerServiceGetEncounterDetails({
      uuid: apptInfo
        ? apptInfo?.encounterUuid
        : unsignedEncounter?.encounterUuid,
    });

  const todayDate = new Date();
  const initilalFormValues: any = {
    chiefComplaint: getAppointmentDetails?.state?.appointmentDetails
      ? getAppointmentDetails?.state?.appointmentDetails?.reasonOfVisit
      : getAppointmentDetails?.state?.row?.reasonOfVisit,
    subjective: {
      historyOfPresentIllness: {
        todayVisit: "",
        patientPastMedicalHistory: {
          name: "",
          onsetDate: "",
          note: "",
        },
        patientPastSurgicalHistory: {
          name: "",
          surgeryDate: "",
          note: "",
        },
        hospitalization: "",
        patientFamilyHistory: {
          name: "",
          relative: "", //Enum will be get from nikhil
          onSetAge: "",
          note: "",
        },
        patientSocialHistory: {
          name: "",
          description: "",
          socialHistoryType:
            PatientSocialHistory.socialHistoryType.SOCIAL_HISTORY,
        },
        patientAllergy: {
          allergyType: "DRUG",
          allergy: "", //Enum
          reaction: null, //Enum
          severity: null, //Enum
          note: "",
          status: true,
        },
      },
      reviewOfSystem: {
        general: "",
        diet: "",
        eyes: "",
        hent: "",
        respiratoryTherapy: "",
        chorionicVillusSampling: "",
        breast: "",
        gastrointestinal: "",
        genitourinary: "",
        marshallSmithSyndrome: "",
        normalSaline: "",
        skin: "",
        hemo: "",
        endocrinology: "",
        psychology: "",
      },
    },
    objective: {
      objectiveNote: "",
      patientVitals: [
        {
          name: PatientVital.name.BLOOD_PRESSURE,
          position: "",
          area: "",
          unit: "",
          value1: "",
          value2: "",
          recordedDate: todayDate,
          note: "",
        },
        {
          name: PatientVital.name.BMI,
          position: "",
          area: "",
          unit: "",
          value1: "",
          value2: "",
          recordedDate: todayDate,
          note: "",
        },
        {
          name: PatientVital.name.HEART_RATE,
          position: "",
          area: "",
          unit: "",
          value1: "",
          value2: "",
          recordedDate: todayDate,
          note: "",
        },
        {
          name: PatientVital.name.RESPIRATION_RATE,
          position: "",
          area: "",
          unit: "",
          value1: "",
          value2: "",
          recordedDate: todayDate,
          note: "",
        },
        {
          name: PatientVital.name.OXYGEN_SATURATION,
          position: "",
          area: "",
          unit: "",
          value1: "",
          value2: "",
          recordedDate: todayDate,
          note: "",
        },
        {
          name: PatientVital.name.HEIGHT,
          position: "",
          area: "",
          unit: "",
          value1: "",
          value2: "",
          recordedDate: todayDate,
          note: "",
        },
        {
          name: PatientVital.name.TEMPERATURE,
          position: "",
          area: "",
          unit: "",
          value1: "",
          value2: "",
          recordedDate: todayDate,
          note: "",
        },
        {
          name: PatientVital.name.WEIGHT,
          position: "",
          area: "",
          unit: "",
          value1: "",
          value2: "",
          recordedDate: todayDate,
          note: "",
        },
      ],
      physicalExam: {
        general: "",
        eyes: "",
        hent: "",
        neck: "",
        respiratoryTherapy: "",
        chorionicVillusSampling: "",
        breast: "",
        abdom: "",
        genitourinary: "",
        marshallSmithSyndrome: "",
        normalSaline: "",
        skin: "",
        lymph: "",
        psych: "",
        rectal: "",
      },
    },
    assessment: {
      assessmentNote: "" as string,
      billingCodes: [],
    },
    encounterPlan: {
      encounterPlanNote: "",
      billingCodes: [],
      labTest: "",
      imaging: "",
      patientMedications: [
        {
          drugCatalog: {
            id: 0,
            medicine: "",
            type: "",
          },
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
      ],
      instructionNote: "",
      additionalNote: "",
    },
  };

  // useEffect(() => {
  //   if (encounterDetails) {
  //     const mergedFormValues = {
  //       ...initilalFormValues,
  //       ...encounterDetails.data,
  //     };

  //     setPatientMedication(
  //       encounterDetails &&
  //         encounterDetails?.data?.encounterPlan?.patientMedications
  //     );

  //     const formValues = replaceNullValuesWithDefaults(mergedFormValues);

  //     formikData.setValues(formValues);
  //   }
  // }, [encounterDetails, unsignedEncounter]);

  useEffect(() => {
    if (encounterDetails && encounterDetails?.data?.encounterPlan !== null) {
      const mergedFormValues = {
        ...initilalFormValues,
        ...encounterDetails.data,
      };
      setMedications(
        encounterDetails &&
          encounterDetails?.data?.encounterPlan?.patientMedications
      );

      if (
        !mergedFormValues.encounterPlan.patientMedications ||
        mergedFormValues.encounterPlan.patientMedications.length === 0
      ) {
        mergedFormValues.encounterPlan.patientMedications = [
          {
            drugCatalog: {
              id: 0,
              medicine: "",
              type: "",
            },
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
        ];
      }

      // Replace null values with defaults
      const formValues = replaceNullValuesWithDefaults(mergedFormValues);

      // Set form values using Formik
      formikData.setValues(formValues);
    }
  }, [encounterDetails, unsignedEncounter]);

  function replaceNullValuesWithDefaults(obj: any) {
    for (const key in obj) {
      if (obj[key] === null && initilalFormValues[key] !== undefined) {
        obj[key] = initilalFormValues[key];
      } else if (typeof obj[key] === "object") {
        replaceNullValuesWithDefaults(obj[key]);
      }
    }
    return obj;
  }

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
    const requestBody = {
      encounterUuid: encounterUuid,
      encounterStatus: EncounterDetailsRequest.encounterStatus.UNSIGNED,
      chiefComplaint: formikData?.values?.chiefComplaint,
      subjective: {
        historyOfPresentIllness: {
          todayVisit:
            formikData?.values?.subjective?.historyOfPresentIllness?.todayVisit,
          patientPastMedicalHistory: getPatientPastMedicalHistory(
            formikData?.values?.subjective?.historyOfPresentIllness
          ),
          //  {
          //   name: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientPastMedicalHistory?.name,
          //   onsetDate:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientPastMedicalHistory?.onsetDate,
          //   note: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientPastMedicalHistory?.note,
          // },
          patientPastSurgicalHistory: getPatientPastSurgicalHistoy(
            formikData.values?.subjective?.historyOfPresentIllness
          ),
          // {
          //   name: formikData.values?.subjective?.historyOfPresentIllness
          //     ?.patientPastSurgicalHistory?.name,
          //   surgeryDate:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientPastSurgicalHistory?.surgeryDate,
          //   note: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientPastSurgicalHistory?.note,
          // },
          hospitalization:
            formikData?.values?.subjective?.historyOfPresentIllness
              ?.hospitalization,
          patientFamilyHistory: getPatientFamilyHistory(
            formikData?.values?.subjective?.historyOfPresentIllness
          ),
          // {
          //   name: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientFamilyHistory?.name,
          //   relative:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientFamilyHistory?.relative, //Enum will be get from nikhil
          //   onSetAge:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientFamilyHistory?.onSetAge,
          //   note: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientFamilyHistory?.note,
          // },
          patientSocialHistory: getPatientSocialHistory(
            formikData?.values?.subjective?.historyOfPresentIllness
          ),
          //  {
          //   name: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientSocialHistory?.name,
          //   description:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientSocialHistory?.description,
          //   socialHistoryType:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientSocialHistory?.socialHistoryType,
          // },
          patientAllergy: formikData?.values?.subjective
            ?.historyOfPresentIllness?.patientAllergy?.allergy
            ? {
                allergyType:
                  formikData.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.allergyType,
                allergy:
                  formikData.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.allergy,
                reaction:
                  formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.reaction, //Enum
                severity:
                  formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.severity,
                note: formikData?.values?.subjective?.historyOfPresentIllness
                  ?.patientAllergy?.note,
                status: true,
              }
            : null,
        },
        reviewOfSystem: formikData?.values?.subjective?.reviewOfSystem,
      },
      objective: {
        ...formikData?.values?.objective,
        patientVitals: getPatientVitals(
          formikData?.values?.objective?.patientVitals
        ),
      },
      assessment: formikData?.values?.assessment,
      encounterPlan: {
        encounterPlanNote: formikData?.values?.encounterPlan.encounterPlanNote,
        billingCodes: formikData?.values?.encounterPlan.billingCodes,
        labTest: formikData?.values?.encounterPlan?.labTest,
        imaging: formikData?.values?.encounterPlan?.imaging,
        patientMedications:
          medications[0]?.drugCatalog?.medicine === "" ? null : medications,
        instructionNote: formikData?.values?.encounterPlan?.instructionNote,
        additionalNote: formikData?.values?.encounterPlan?.additionalNote,
      },
    };
    if (formikData.values) {
      await addEncounterMutateAsync({
        requestBody: requestBody as unknown as EncounterDetailsRequest,
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

  const getPatientPastMedicalHistory = (history: any) => {
    const { name, onsetDate, note } = history?.patientPastMedicalHistory || {};
    if (!name && !onsetDate && !note) {
      return null;
    }
    return {
      name,
      onsetDate,
      note,
    };
  };

  const getPatientPastSurgicalHistoy = (history: any) => {
    const { name, surgeryDate, note } =
      history?.patientPastSurgicalHistory || {};
    if (!name && !surgeryDate && !note) {
      return null;
    }
    return {
      name,
      surgeryDate,
      note,
    };
  };

  const getPatientFamilyHistory = (history: any) => {
    const { name, relative, onSetAge, note } =
      history?.patientFamilyHistory ?? {};
    if (!name && !relative && !onSetAge && !note) {
      return null;
    }
    return {
      name,
      relative,
      onSetAge,
      note,
    };
  };

  const getPatientSocialHistory = (history: any) => {
    const { name, description, socialHistoryType } =
      history?.patientSocialHistory ?? {};
    if (!name && !description && !socialHistoryType) {
      return null;
    }
    return {
      name,
      description,
      socialHistoryType,
    };
  };

  // const getPatientVitals = (vitals: any) => {
  //   console.log("vitals", vitals);
  //   const hasPatientVitals = vitals?.some(
  //     (vital: any) => vital.value1 || vital.value2 || vital.note
  //   );
  //   const filledPatientVitals = initilalFormValues.objective.patientVitals.map(
  //     (defaultVital: any, index: any) => ({
  //       ...defaultVital,
  //       ...vitals?.objective?.patientVitals[index],
  //     })
  //   );
  //   console.log("filledPatientVitals", filledPatientVitals);
  //   return hasPatientVitals ? filledPatientVitals : null;
  // };

  const getPatientVitals = (vitals: any) => {
    const hasPatientVitals = vitals?.some(
      (vital: any) => vital.value1 || vital.value2 || vital.note
    );

    const filledPatientVitals = initilalFormValues.objective.patientVitals.map(
      (defaultVital: any, index: any) => ({
        ...defaultVital,
        ...(vitals && vitals[index]),
      })
    );

    return hasPatientVitals ? filledPatientVitals : null;
  };

  const prepareEncounterPlan = (encounterPlan: any) => {
    if (
      !encounterPlan.patientMedications ||
      encounterPlan.patientMedications.length === 0 ||
      encounterPlan.patientMedications.every(
        (med: any) => !med.drugCatalog.medicine
      )
    ) {
      encounterPlan.patientMedications = null;
    }

    return encounterPlan;
  };

  const handleSigInEncounter = async () => {
    const requestBody = {
      encounterUuid: encounterUuid,
      encounterStatus: EncounterDetailsRequest.encounterStatus.SIGNED,
      chiefComplaint: formikData?.values?.chiefComplaint,
      subjective: {
        historyOfPresentIllness: {
          todayVisit:
            formikData?.values?.subjective?.historyOfPresentIllness?.todayVisit,
          patientPastMedicalHistory: getPatientPastMedicalHistory(
            formikData?.values?.subjective?.historyOfPresentIllness
          ),
          //  {
          //   name: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientPastMedicalHistory?.name,
          //   onsetDate:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientPastMedicalHistory?.onsetDate,
          //   note: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientPastMedicalHistory?.note,
          // },
          patientPastSurgicalHistory: getPatientPastSurgicalHistoy(
            formikData.values?.subjective?.historyOfPresentIllness
          ),
          // {
          //   name: formikData.values?.subjective?.historyOfPresentIllness
          //     ?.patientPastSurgicalHistory?.name,
          //   surgeryDate:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientPastSurgicalHistory?.surgeryDate,
          //   note: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientPastSurgicalHistory?.note,
          // },
          hospitalization:
            formikData?.values?.subjective?.historyOfPresentIllness
              ?.hospitalization,
          patientFamilyHistory: getPatientFamilyHistory(
            formikData?.values?.subjective?.historyOfPresentIllness
          ),
          // {
          //   name: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientFamilyHistory?.name,
          //   relative:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientFamilyHistory?.relative, //Enum will be get from nikhil
          //   onSetAge:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientFamilyHistory?.onSetAge,
          //   note: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientFamilyHistory?.note,
          // },
          patientSocialHistory: getPatientSocialHistory(
            formikData?.values?.subjective?.historyOfPresentIllness
          ),
          //  {
          //   name: formikData?.values?.subjective?.historyOfPresentIllness
          //     ?.patientSocialHistory?.name,
          //   description:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientSocialHistory?.description,
          //   socialHistoryType:
          //     formikData?.values?.subjective?.historyOfPresentIllness
          //       ?.patientSocialHistory?.socialHistoryType,
          // },
          patientAllergy: formikData?.values?.subjective
            ?.historyOfPresentIllness?.patientAllergy?.allergy
            ? {
                allergyType: "DRUG",
                allergy:
                  formikData.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.allergy,
                reaction:
                  formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.reaction, //Enum
                severity:
                  formikData?.values?.subjective?.historyOfPresentIllness
                    ?.patientAllergy?.severity,
                note: formikData?.values?.subjective?.historyOfPresentIllness
                  ?.patientAllergy?.note,
                status: true,
              }
            : null,
        },
        reviewOfSystem: formikData?.values?.subjective?.reviewOfSystem,
      },
      objective: {
        ...formikData?.values?.objective,
        patientVitals: getPatientVitals(
          formikData?.values?.objective?.patientVitals
        ),
      },
      assessment: formikData?.values?.assessment,
      encounterPlan: {
        encounterPlanNote: formikData?.values?.encounterPlan.encounterPlanNote,
        billingCodes: formikData?.values?.encounterPlan.billingCodes,
        labTest: formikData?.values?.encounterPlan?.labTest,
        imaging: formikData?.values?.encounterPlan?.imaging,
        patientMedications:
          medications[0]?.drugCatalog?.medicine === "" ? null : medications,
        instructionNote: formikData?.values?.encounterPlan?.instructionNote,
        additionalNote: formikData?.values?.encounterPlan?.additionalNote,
      },
    };
    if (formikData.values) {
      await addEncounterMutateAsync({
        requestBody: requestBody as unknown as EncounterDetailsRequest,
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

  const handleCancelEncounter = () => {
    setOpenCancelModal(true);
  };

  const formValidationSchema = Yup.object().shape({});

  const formikData = useFormik({
    initialValues: initilalFormValues,
    validationSchema: formValidationSchema,
    onSubmit: handleCompleteCheckIn,
  });

  const scrollToRef = (ref: any) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section"); // Assuming each section title is a <h4> element
      let currentSection = null;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight / 2) {
          currentSection = section.textContent;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data } = useMedicalCodeControllerServiceGetAllMedicalCodes({
    codeType: BillingCodes.type.ICD,
    page: 0,
    size: 20,
    sortBy: "",
    sortDirection: "",
    searchString: "",
    providerGroupUuid: getLoggedInUser().providerGroup || "",
  });

  useEffect(() => {
    let icdDetails: [] = [];
    if (data) {
      icdDetails = data?.data?.content;
      const customIcd = icdDetails?.map((item: any) => {
        return {
          id: item.id,
          type: item.type,
          code: item.code,
          description: item.description,
        };
      });
      setIcdCode(customIcd);
    }
  }, [data]);

  const { data: cptData } = useMedicalCodeControllerServiceGetAllMedicalCodes({
    codeType: BillingCodes.type.CPT,
    page: 0,
    size: 20,
    sortBy: "",
    sortDirection: "",
    searchString: "",
    providerGroupUuid: getLoggedInUser().providerGroup || "",
  });

  useEffect(() => {
    let cptDetails: [] = [];
    if (cptData) {
      cptDetails = cptData?.data?.content;
      const customCpt = cptDetails?.map((item: any) => {
        return {
          id: item.id,
          type: item.type,
          code: item.code,
          description: item.description,
        };
      });
      setCPTCode(customCpt);
    }
  }, [cptData]);

  const scrollToSection = (sectionId: string) => {
    switch (sectionId) {
      case "Subjective":
        scrollToRef(subjectiveTab);
        break;
      case "Objective":
        scrollToRef(objectiveTab);
        break;
      case "Assessment":
        scrollToRef(assessmentTab);
        break;
      case "Plan":
        scrollToRef(planTab);
        break;
      default:
        break;
    }
  };

  const scrollToSubSection = (subSectionId: string) => {
    switch (subSectionId) {
      case "HPI":
        scrollToRef(hpiTab);
        break;
      case "ROS":
        scrollToRef(rosTab);
        break;
      case "Vitals":
        scrollToRef(vitalsTab);
        break;
      case "PE":
        scrollToRef(peTab);
        break;
      case "Diagnosis Code":
        scrollToRef(diagnoCodeTab);
        break;
      case "Procedure Code":
        scrollToRef(proceCodeTab);
        break;
      case "Lab":
        scrollToRef(labTab);
        break;
      case "Imaging":
        scrollToRef(imagingTab);
        break;
      case "Medications":
        scrollToRef(medicationsTab);
        break;
      case "Instruction Note":
        scrollToRef(instrNoteTab);
        break;
      case "Follow Up":
        scrollToRef(followUpTab);
        break;
      default:
        break;
    }
  };

  const [enablePreview, setEnablePreview] = useState(false);

  useEffect(() => {
    if (unsignedEncounter && unsignedEncounter.status === "SIGNED") {
      setEnablePreview(true);
    }
  }, [unsignedEncounter]);

  const handleChangeView = () => {
    setEnablePreview(true);
  };

  const handleCheckInAfterPreview = () => {
    formikData.submitForm();
  };

  const handleViewFilledIntake = () => {
    setOpenIntakeForm((item) => !item);
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
                    <Typography sx={{ color: "#7b7b7b", fontSize: "16px" }}>
                      SSN :
                    </Typography>
                    <Typography sx={{ marginRight: 3, fontSize: "16px" }}>
                      {patientData?.ssn ? patientData?.ssn : "-"}
                    </Typography>
                    <Typography sx={{ color: "#7b7b7b", fontSize: "16px" }}>
                      {"DOB :"}
                    </Typography>
                    <Typography sx={{ color: "#7b7b7b", fontSize: "16px" }}>
                      {formatDateMMDDYYWithoutTz(
                        patientData?.birthDate as string
                      )}
                    </Typography>
                    <Typography sx={{ fontSize: "16px" }}>
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
                    <Typography
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
                    </Typography>
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
                      // sx={{
                      //   background: "#f5f5dd",
                      //   color: "#b4b400 ",
                      //   borderRadius: "20px",
                      // }}
                    >
                      {""}
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
                    <Typography>{"NA"}</Typography>
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
                      {(primaryProviderName && primaryProviderName) || "-"}
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
                      {sideBarList.map((tab: any) => {
                        const subId = tab.submenu.map((item: any) => item);
                        return (
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handleOpenTab(tab.id, subId[0].id),
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
                            <Box>
                              {tab.submenu.map((sub: any) => {
                                return (
                                  <Box>
                                    <Grid
                                      sx={{
                                        pl: "20px",
                                        py: "12px",
                                        cursor: "pointer",
                                        background:
                                          sub.id === openSubTab
                                            ? "#f0f8ff !important"
                                            : "",
                                      }}
                                      onClick={() => {
                                        handleOpenSubTab(sub.id, tab.id),
                                          scrollToSubSection(sub.id);
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight:
                                            sub.id === openSubTab ? "bold" : "",
                                          color:
                                            sub.id === openSubTab
                                              ? "#004186 !important"
                                              : "black !important",
                                        }}
                                      >
                                        {sub.name}
                                      </Typography>
                                    </Grid>
                                  </Box>
                                );
                              })}
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
                            {unsignedEncounter
                              ? formatDateMMDDYYWithoutTz(
                                  unsignedEncounter?.appointmentDate
                                ) +
                                " " +
                                unsignedEncounter?.startTime
                              : apptInfo?.appointmentDate +
                                  " " +
                                  apptInfo?.startTime || "-"}
                          </Typography>
                        </Grid>
                        <Grid container gap={1}>
                          <Typography sx={key}>{"Appointment Type"}</Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            {unsignedEncounter
                              ? toCamelCase(unsignedEncounter?.appointmentType)
                              : toCamelCase(apptInfo?.appointmentType) || "-"}
                          </Typography>
                        </Grid>
                        <Grid container gap={1}>
                          <Typography sx={key}>
                            {"Rendering Provider"}
                          </Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            {unsignedEncounter
                              ? unsignedEncounter?.provider?.firstname +
                                " " +
                                unsignedEncounter?.provider?.lastname
                              : apptInfo?.providerName || "-"}
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
                            {unsignedEncounter
                              ? unsignedEncounter?.location
                              : apptInfo?.locationName || "-"}
                          </Typography>
                        </Grid>
                        <Grid container gap={1}>
                          <Typography sx={key}>{"Appointment Mode"}</Typography>
                          <Typography>{":"}</Typography>
                          <Typography sx={value}>
                            {unsignedEncounter
                              ? toCamelCase(unsignedEncounter?.presentType)
                              : toCamelCase(apptInfo?.presentType) || "-"}
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
                          name={"chiefComplaint"}
                          value={formikData.values.chiefComplaint}
                          onChange={formikData.handleChange}
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
                    <Box ref={subjectiveTab}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"SUBJECTIVE"}
                        </Typography>
                      </Grid>
                      <Box ref={hpiTab}>
                        <Grid my={1.5}>
                          <Typography>
                            {"History Of Present Illness(HPI)"}
                          </Typography>
                        </Grid>
                        <Grid
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={2}
                          p={1.5}
                          my={2}
                          sx={{ border: "2px solid #efefef" }}
                        >
                          <Box
                            display={"grid"}
                            alignItems={"start"}
                            gridTemplateColumns={"20% 1fr"}
                            columnGap={2}
                            rowGap={2}
                          >
                            {formikData?.values?.subjective
                              ?.historyOfPresentIllness?.todayVisit?.length >
                              0 && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Today's Visit : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.historyOfPresentIllness?.todayVisit ||
                                    "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective
                              ?.historyOfPresentIllness
                              ?.patientPastMedicalHistory?.name?.length > 0 && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Medical History : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.historyOfPresentIllness
                                    ?.patientPastMedicalHistory?.name || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective
                              ?.historyOfPresentIllness
                              ?.patientPastSurgicalHistory?.name?.length >
                              0 && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Surgical History : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.historyOfPresentIllness
                                    ?.patientPastSurgicalHistory?.name || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective
                              ?.historyOfPresentIllness?.patientSocialHistory
                              ?.name?.length > 0 && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Social History : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.historyOfPresentIllness
                                    ?.patientSocialHistory?.name || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective
                              ?.historyOfPresentIllness?.patientFamilyHistory
                              ?.name?.length > 0 && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Family History : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.historyOfPresentIllness
                                    ?.patientFamilyHistory?.name || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective
                              ?.historyOfPresentIllness?.hospitalization
                              ?.length > 0 && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Hospitalization : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.historyOfPresentIllness
                                    ?.hospitalization || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective
                              ?.historyOfPresentIllness?.patientAllergy?.allergy
                              ?.length > 0 && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Allergies : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.historyOfPresentIllness?.patientAllergy
                                    ?.allergy ||
                                    "-" +
                                      " : " +
                                      toCamelCase(
                                        formikData?.values?.subjective
                                          ?.historyOfPresentIllness
                                          ?.patientAllergy?.allergyType
                                      ) ||
                                    "-" +
                                      " : " +
                                      formikData?.values?.subjective
                                        ?.historyOfPresentIllness
                                        ?.patientAllergy?.reaction ||
                                    "-" +
                                      " : " +
                                      formikData?.values?.subjective
                                        ?.historyOfPresentIllness
                                        ?.patientAllergy?.severity ||
                                    "-"}
                                </Typography>
                              </>
                            )}
                          </Box>
                        </Grid>
                      </Box>
                      <Grid my={2}>
                        <ButtonBase
                          sx={grayButtonStyle}
                          onClick={handleOpenHpi}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">{"Add HPI"}</Typography>
                        </ButtonBase>
                      </Grid>
                      <Box ref={rosTab}>
                        <Grid my={1.5}>
                          <Typography>{"Review Of Service (ROS)"}</Typography>
                        </Grid>
                        <Grid
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={2}
                          p={1.5}
                          my={2}
                          sx={{ border: "2px solid #efefef" }}
                        >
                          <Box
                            display={"grid"}
                            alignItems={"start"}
                            gridTemplateColumns={"20% 1fr"}
                            columnGap={2}
                            rowGap={2}
                          >
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.general && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"GENERAL : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.general || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.diet && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"DIET : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.diet || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.eyes && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"EYES : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.eyes || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.hent && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"HENT : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.hent || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.respiratoryTherapy && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"RESP : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.respiratoryTherapy || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.chorionicVillusSampling && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"CVS : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.chorionicVillusSampling ||
                                    "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.breast && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Breast : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.breast || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.gastrointestinal && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"GI : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.gastrointestinal || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.genitourinary && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"GU : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.genitourinary || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.marshallSmithSyndrome && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"MSS : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.marshallSmithSyndrome ||
                                    "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.normalSaline && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"NS : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.normalSaline || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.skin && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Skin : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.skin || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.hemo && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Hemo : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.hemo || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.endocrinology && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Endoc : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.endocrinology || "-"}
                                </Typography>
                              </>
                            )}
                            {formikData?.values?.subjective?.reviewOfSystem
                              ?.psychology && (
                              <>
                                <Typography
                                  sx={{ fontSize: "14px", color: "black" }}
                                >
                                  {"Psych : "}
                                </Typography>
                                <Typography sx={{ fontSize: "14px" }}>
                                  {formikData?.values?.subjective
                                    ?.reviewOfSystem?.psychology || "-"}
                                </Typography>
                              </>
                            )}
                          </Box>
                        </Grid>
                      </Box>
                      <Grid my={2}>
                        <ButtonBase
                          sx={grayButtonStyle}
                          onClick={handleOpenROS}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">{"Add ROS"}</Typography>
                        </ButtonBase>
                      </Grid>
                    </Box>
                    <Box ref={objectiveTab}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"OBJECTIVE"}
                        </Typography>
                      </Grid>

                      <Grid py={2}>
                        <Grid
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={2}
                          p={1.5}
                          my={2}
                          sx={{ border: "2px solid #efefef" }}
                        >
                          {/* <Typography
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          {"Objective"}
                        </Typography>
                        <Typography>
                          {formikData.values?.objective?.objectiveNote || "-"}
                        </Typography> */}
                          {/* <Grid py={1} container gap={2}> */}
                          {/* <ButtonBase
                            sx={grayButtonStyle}
                            onClick={handleOpenObjectiveDes}
                          >
                            <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                            <Typography variant="h5">
                              {"Add Objective"}
                            </Typography>
                          </ButtonBase> */}
                          <Box pt={1} pb={2}>
                            <Grid>
                              <Typography
                                sx={{ fontSize: "16px", fontWeight: "bold" }}
                              >
                                {"Objective"}
                              </Typography>
                              <Box pt={2}>
                                <InputBase
                                  name={"objective.objectiveNote"}
                                  value={
                                    formikData?.values?.objective?.objectiveNote
                                  }
                                  onChange={formikData.handleChange}
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
                            </Grid>
                          </Box>
                          {/* </Grid> */}
                          <Box ref={vitalsTab}>
                            <Grid>
                              <Typography
                                sx={{ fontSize: "16px", fontWeight: "bold" }}
                              >
                                {"Vitals"}
                              </Typography>
                            </Grid>
                            <Box
                              display={"grid"}
                              gridTemplateColumns={"1fr 1fr 1fr 1fr"}
                              rowGap={3}
                              mt={1}
                              mb={2}
                            >
                              <Box sx={displayNote}>
                                <Grid
                                  display={"grid"}
                                  gridTemplateColumns={"22% 30% 30%"}
                                  alignItems={"center"}
                                >
                                  <Typography>{"BP"}</Typography>
                                  <Box sx={boxContainer}>
                                    <Typography>
                                      {formikData?.values?.objective
                                        ?.patientVitals[0]?.value1 +
                                        " / " +
                                        formikData?.values?.objective
                                          ?.patientVitals[0]?.value2}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={noteBox}
                                    mx={1}
                                    onClick={handleOpenNote}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                    <Typography>{"Note"}</Typography>
                                  </Box>
                                </Grid>
                                <Typography
                                  noWrap
                                  sx={{ cursor: "pointer", maxWidth: "250px" }}
                                  title={
                                    formikData?.values?.objective
                                      ?.patientVitals[0]?.note
                                  }
                                >
                                  {
                                    formikData?.values?.objective
                                      ?.patientVitals[0]?.note
                                  }
                                </Typography>
                              </Box>
                              <Box sx={displayNote}>
                                <Grid
                                  display={"grid"}
                                  gridTemplateColumns={"22% 30% 30%"}
                                  alignItems={"center"}
                                >
                                  <Typography>{"BMI"}</Typography>
                                  <Box sx={boxContainer}>
                                    <Typography>
                                      {formikData.values?.objective
                                        ?.patientVitals[1]?.value1 || "-"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={noteBox}
                                    mx={1}
                                    onClick={handleOpenBmi}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                    <Typography>{"Note"}</Typography>
                                  </Box>
                                </Grid>
                                <Typography
                                  sx={{ cursor: "pointer", maxWidth: "250px" }}
                                  title={
                                    formikData?.values?.objective
                                      ?.patientVitals[1]?.note
                                  }
                                >
                                  {
                                    formikData?.values?.objective
                                      ?.patientVitals[1]?.note
                                  }
                                </Typography>
                              </Box>
                              <Box sx={displayNote}>
                                <Grid
                                  display={"grid"}
                                  gridTemplateColumns={"22% 30% 30%"}
                                  alignItems={"center"}
                                >
                                  <Typography>{"HR"}</Typography>
                                  <Box sx={boxContainer}>
                                    <Typography>
                                      {formikData.values?.objective
                                        ?.patientVitals[2]?.value1 || "-"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={noteBox}
                                    mx={1}
                                    onClick={handleOpenHr}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                    <Typography>{"Note"}</Typography>
                                  </Box>
                                </Grid>
                                <Typography
                                  sx={{ cursor: "pointer", maxWidth: "250px" }}
                                  title={
                                    formikData?.values?.objective
                                      ?.patientVitals[2]?.note
                                  }
                                >
                                  {
                                    formikData?.values?.objective
                                      ?.patientVitals[2]?.note
                                  }
                                </Typography>
                              </Box>
                              <Box sx={displayNote}>
                                <Grid
                                  display={"grid"}
                                  gridTemplateColumns={"22% 30% 30%"}
                                  alignItems={"center"}
                                >
                                  <Typography>{"RR"}</Typography>
                                  <Box sx={boxContainer}>
                                    <Typography>
                                      {formikData.values?.objective
                                        ?.patientVitals[3]?.value1 || "-"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={noteBox}
                                    mx={1}
                                    onClick={handleOpenResp}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                    <Typography>{"Note"}</Typography>
                                  </Box>
                                </Grid>
                                <Typography
                                  sx={{ cursor: "pointer", maxWidth: "250px" }}
                                  title={
                                    formikData?.values?.objective
                                      ?.patientVitals[3]?.note
                                  }
                                >
                                  {
                                    formikData?.values?.objective
                                      ?.patientVitals[3]?.note
                                  }
                                </Typography>
                              </Box>
                              <Box sx={displayNote}>
                                <Grid
                                  display={"grid"}
                                  gridTemplateColumns={"22% 30% 30%"}
                                  alignItems={"center"}
                                >
                                  <Typography>{"Height"}</Typography>
                                  <Box sx={boxContainer}>
                                    <Typography>
                                      {formikData.values?.objective
                                        ?.patientVitals[5]?.value1 || "-"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={noteBox}
                                    mx={1}
                                    onClick={handleOpenHeight}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                    <Typography>{"Note"}</Typography>
                                  </Box>
                                </Grid>
                                <Typography
                                  sx={{ cursor: "pointer", maxWidth: "250px" }}
                                  title={
                                    formikData?.values?.objective
                                      ?.patientVitals[4]?.note
                                  }
                                >
                                  {
                                    formikData?.values?.objective
                                      ?.patientVitals[4]?.note
                                  }
                                </Typography>
                              </Box>
                              <Box sx={displayNote}>
                                <Grid
                                  display={"grid"}
                                  gridTemplateColumns={"22% 30% 30%"}
                                  alignItems={"center"}
                                >
                                  <Typography>{"Weight"}</Typography>
                                  <Box sx={boxContainer}>
                                    <Typography>
                                      {formikData.values?.objective
                                        ?.patientVitals[7]?.value1 || "-"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={noteBox}
                                    mx={1}
                                    onClick={handleOpenWightNote}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                    <Typography>{"Note"}</Typography>
                                  </Box>
                                </Grid>
                                <Typography
                                  sx={{ cursor: "pointer", maxWidth: "250px" }}
                                  title={
                                    formikData?.values?.objective
                                      ?.patientVitals[5]?.note
                                  }
                                >
                                  {
                                    formikData?.values?.objective
                                      ?.patientVitals[5]?.note
                                  }
                                </Typography>
                              </Box>
                              <Box sx={displayNote}>
                                <Grid
                                  display={"grid"}
                                  gridTemplateColumns={"22% 30% 30%"}
                                  alignItems={"center"}
                                >
                                  <Typography>{"Temp"}</Typography>
                                  <Box sx={boxContainer}>
                                    <Typography>
                                      {formikData.values?.objective
                                        ?.patientVitals[6]?.value1 || "-"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={noteBox}
                                    mx={1}
                                    onClick={handleOpenForTemperatureNote}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                    <Typography>{"Note"}</Typography>
                                  </Box>
                                </Grid>
                                <Typography
                                  sx={{ cursor: "pointer", maxWidth: "250px" }}
                                  title={
                                    formikData?.values?.objective
                                      ?.patientVitals[6]?.note
                                  }
                                >
                                  {
                                    formikData?.values?.objective
                                      ?.patientVitals[6]?.note
                                  }
                                </Typography>
                              </Box>
                              <Box sx={displayNote}>
                                <Grid
                                  display={"grid"}
                                  gridTemplateColumns={"22% 30% 30%"}
                                  alignItems={"center"}
                                >
                                  <Typography>{"O2"}</Typography>
                                  <Box sx={boxContainer}>
                                    <Typography>
                                      {formikData.values?.objective
                                        ?.patientVitals[4]?.value1 || "-"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    gap={1}
                                    sx={noteBox}
                                    mx={1}
                                    onClick={handleOpenO2Note}
                                  >
                                    <AddCircleOutlineIcon
                                      sx={{ fontSize: "18px" }}
                                    />
                                    <Typography>{"Note"}</Typography>
                                  </Box>
                                </Grid>
                                <Typography
                                  sx={{ cursor: "pointer", maxWidth: "250px" }}
                                  title={
                                    formikData?.values?.objective
                                      ?.patientVitals[7]?.note
                                  }
                                >
                                  {
                                    formikData?.values?.objective
                                      ?.patientVitals[7]?.note
                                  }
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Grid py={1} container gap={2}>
                            <ButtonBase
                              sx={grayButtonStyle}
                              onClick={handleOpenVitals}
                            >
                              <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                              <Typography variant="h5">
                                {"Add Vitals"}
                              </Typography>
                            </ButtonBase>
                          </Grid>
                          <Box ref={peTab}>
                            <Typography
                              sx={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {"Physical Examination"}
                            </Typography>
                            <Grid
                              display={"flex"}
                              flexDirection={"column"}
                              rowGap={2}
                              p={1.5}
                              my={2}
                              sx={{ border: "2px solid #efefef" }}
                            >
                              <Box
                                display={"grid"}
                                alignItems={"start"}
                                gridTemplateColumns={"20% 1fr"}
                                columnGap={2}
                                rowGap={2}
                                mt={2}
                              >
                                {formikData.values?.objective?.physicalExam
                                  ?.general && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"GENERAL : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.general || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.eyes && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"EYES : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.eyes || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.hent && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"HENT : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.hent || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.neck && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"NECK : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.neck || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.respiratoryTherapy && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"RESP : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.respiratoryTherapy ||
                                        "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.chorionicVillusSampling && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"CVS : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam
                                        ?.chorionicVillusSampling || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.breast && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"BREAST : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.breast || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.abdom && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"ABDOM : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.abdom || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.genitourinary && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"GU : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.genitourinary || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.marshallSmithSyndrome && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"MSS : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.marshallSmithSyndrome ||
                                        "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.normalSaline && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"NS : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.normalSaline || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.skin && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"SKIN : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.skin || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.lymph && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"Lymph : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.lymph || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.psych && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"PSYCH : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.psych || "-"}
                                    </Typography>
                                  </>
                                )}
                                {formikData.values?.objective?.physicalExam
                                  ?.rectal && (
                                  <>
                                    <Typography
                                      sx={{ fontSize: "14px", color: "black" }}
                                    >
                                      {"RECTAL : "}
                                    </Typography>
                                    <Typography sx={{ fontSize: "14px" }}>
                                      {formikData.values?.objective
                                        ?.physicalExam?.rectal || "-"}
                                    </Typography>
                                  </>
                                )}
                              </Box>
                            </Grid>
                          </Box>
                          <Grid pt={1} mb={1} container gap={2}>
                            <ButtonBase
                              sx={grayButtonStyle}
                              onClick={handleOpenPE}
                            >
                              <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                              <Typography variant="h5">{"Add PE"}</Typography>
                            </ButtonBase>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box ref={assessmentTab}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"ASSESSMENT"}
                        </Typography>
                      </Grid>
                      <Grid py={2}>
                        <Grid
                          display={"flex"}
                          flexDirection={"column"}
                          rowGap={2}
                          p={1.5}
                          my={2}
                          sx={{ border: "2px solid #efefef" }}
                        >
                          <Grid my={1}>
                            <Typography
                              mb={1}
                              sx={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {"Assessment"}
                            </Typography>
                            <InputBase
                              name={"assessment.assessmentNote"}
                              value={
                                formikData?.values?.assessment?.assessmentNote
                              }
                              onChange={formikData.handleChange}
                              fullWidth
                              multiline={true}
                              rows="4"
                              classes={{
                                root: classes.providerTextAreaField,
                                input: classes.textFieldInput,
                                focused: classes.textFieldActive,
                              }}
                              placeholder="Enter Text"
                            />
                          </Grid>
                          {/* <Typography
                          sx={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          {"Assessment"}
                        </Typography>
                        <Typography>
                          {formikData.values.assessment?.assessmentNote || "-"}
                        </Typography> */}
                          {/* <Grid container gap={2}>
                          <ButtonBase
                            sx={grayButtonStyle}
                            onClick={handleOpenIcdCode}
                          >
                            <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                            <Typography variant="h5">{"Assessment"}</Typography>
                          </ButtonBase>
                        </Grid> */}
                          <Grid my={2}>
                            <CustomFormLabel label={"ICD-10 code"} />
                            <Autocomplete
                              sx={{ ...multiSelectDropDown }}
                              multiple={true}
                              limitTags={2}
                              id="tags-standard"
                              options={icdCodes || []}
                              value={
                                formikData?.values?.assessment === null
                                  ? []
                                  : formikData?.values?.assessment?.billingCodes
                              }
                              defaultValue={
                                initilalFormValues.assessment?.billingCodes
                              }
                              getOptionLabel={(option: any) =>
                                option?.code + " " + option?.description
                              }
                              onChange={(_event: any, newValue: any) => {
                                formikData.setFieldValue(
                                  "assessment.billingCodes",
                                  newValue
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  placeholder="Select"
                                  sx={{
                                    justifyContent: "space-between",
                                    padding: "5px 10px",
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Box ref={diagnoCodeTab}>
                            <Typography
                              sx={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {"Diagnosis Code"}
                            </Typography>
                            <Typography>
                              {formikData?.values?.assessment?.billingCodes?.map(
                                (item: any) => {
                                  return (
                                    <Box display={"flex"}>
                                      <Typography pt={1}>
                                        {item?.code + " " + item?.description}
                                      </Typography>
                                    </Box>
                                  );
                                }
                              )}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box ref={planTab}>
                      <Grid sx={{ background: "#efefef", mt: "20px" }}>
                        <Typography variant="h3" px={1} py={1}>
                          {"PLAN"}
                        </Typography>
                      </Grid>
                      <Grid
                        display={"flex"}
                        flexDirection={"column"}
                        rowGap={2}
                        p={1.5}
                        my={2}
                        sx={{
                          border: "2px solid #efefef",
                        }}
                      >
                        {/* <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        {"Plan"}
                      </Typography>
                      <Typography>
                        {formikData.values?.encounterPlan?.encounterPlanNote ||
                          "-"}
                      </Typography>
                      <Grid my={1} container gap={2}>
                        <ButtonBase
                          sx={grayButtonStyle}
                          onClick={handleOpenPlan}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">{"Add Plan"}</Typography>
                        </ButtonBase>
                      </Grid> */}

                        <Grid my={2}>
                          <Typography fontSize={"16px"} fontWeight={"600"}>
                            {"Plan"}
                          </Typography>
                          <Grid my={2}>
                            <InputBase
                              name={"encounterPlan.encounterPlanNote"}
                              value={
                                formikData?.values?.encounterPlan
                                  ?.encounterPlanNote
                              }
                              onChange={formikData?.handleChange}
                              onError={(_e) => {}}
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
                          </Grid>
                        </Grid>
                        <Grid>
                          <Typography fontSize={"16px"} fontWeight={"600"}>
                            {"CPT Code"}
                          </Typography>
                          <Grid my={2}>
                            <Autocomplete
                              sx={{ ...multiSelectDropDown }}
                              multiple={true}
                              limitTags={2}
                              id="tags-standard"
                              options={CPTCodes || []}
                              value={
                                formikData?.values?.encounterPlan === null
                                  ? []
                                  : formikData?.values?.encounterPlan
                                      ?.billingCodes
                              }
                              getOptionLabel={(option: any) =>
                                option?.code + " " + option?.description
                              }
                              onChange={(_event: any, newValue: any) => {
                                formikData.setFieldValue(
                                  "encounterPlan.billingCodes",
                                  newValue
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  placeholder="Select"
                                  sx={{
                                    justifyContent: "space-between",
                                    padding: "5px 10px",
                                  }}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                        <Box ref={proceCodeTab}>
                          <Typography
                            sx={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {"Procedure Code"}
                          </Typography>
                          <Typography>
                            {formikData?.values?.encounterPlan?.billingCodes?.map(
                              (item: any) => {
                                return (
                                  <Box display={"flex"}>
                                    <Typography pt={1}>
                                      {item?.code + " " + item?.description}
                                    </Typography>
                                  </Box>
                                );
                              }
                            )}
                          </Typography>
                        </Box>

                        <Box ref={labTab}>
                          <Typography
                            sx={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {"Lab Test"}
                          </Typography>
                          <Grid my={2}>
                            <InputBase
                              name={"encounterPlan.labTest"}
                              value={formikData?.values?.encounterPlan?.labTest}
                              onChange={formikData.handleChange}
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
                            {/* </Grid> */}
                          </Grid>
                          {/* <Typography>
                          {formikData.values?.encounterPlan?.labTest || "-"}
                        </Typography> */}
                        </Box>
                        {/* <Grid my={1} container gap={2}>
                        <ButtonBase
                          sx={grayButtonStyle}
                          onClick={handleOpenLab}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">{"Add Lab"}</Typography>
                        </ButtonBase>
                      </Grid> */}
                        <Box ref={imagingTab}>
                          <Typography
                            sx={{ fontSize: "16px", fontWeight: "bold" }}
                          >
                            {"Imaging"}
                          </Typography>
                          {/* <Typography>
                          {formikData.values?.encounterPlan?.imaging || "-"}
                        </Typography> */}
                          <Grid my={2}>
                            <InputBase
                              name={"encounterPlan.imaging"}
                              value={formikData?.values?.encounterPlan?.imaging}
                              onChange={formikData.handleChange}
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
                          </Grid>
                        </Box>
                        {/* <Grid my={1} container gap={2}>
                        <ButtonBase
                          sx={grayButtonStyle}
                          onClick={handleOpenImaging}
                        >
                          <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                          <Typography variant="h5">{"Add Imaging"}</Typography>
                        </ButtonBase>
                      </Grid> */}
                        <Box ref={medicationsTab}>
                          {medications &&
                            medications.length !== 0 &&
                            medications?.[0]?.drugCatalog?.medicine && (
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  pb: 2,
                                }}
                              >
                                {"Medication"}
                              </Typography>
                            )}

                          {medications &&
                            medications.length !== 0 &&
                            medications?.[0]?.drugCatalog?.medicine && (
                              <TableContainer component={Paper}>
                                <Table>
                                  <TableHead>
                                    <TableRow
                                      className={tableClasses.headingBackground}
                                    >
                                      {tabColumns.map((column) => (
                                        <TableCell
                                          key={column.id}
                                          className={
                                            tableClasses.tableHeaderCell
                                          }
                                          sx={{ minWidth: column.width }}
                                        >
                                          <Typography
                                            variant="h5"
                                            className={
                                              tableClasses.TabelheadingTypo
                                            }
                                          >
                                            {column.label}
                                          </Typography>
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {medications.map(
                                      (medicine, index) =>
                                        medicine?.drugCatalog?.medicine && (
                                          <TableRow key={index}>
                                            <TableCell>
                                              {medicine?.drugCatalog
                                                ?.medicine || "-"}
                                            </TableCell>
                                            <TableCell>
                                              {medicine?.startDate
                                                ? moment(
                                                    medicine?.startDate
                                                  ).format("MM-DD-YYYY")
                                                : "-"}
                                            </TableCell>
                                            <TableCell>
                                              {medicine?.endDate
                                                ? moment(
                                                    medicine?.endDate
                                                  ).format("MM-DD-YYYY")
                                                : "-"}
                                            </TableCell>
                                            <TableCell>
                                              {medicine?.dosageTime
                                                ? transformText(
                                                    medicine?.dosageTime
                                                  )
                                                : "-"}
                                            </TableCell>
                                            <TableCell>
                                              {medicine?.dosageUnit
                                                ? transformText(
                                                    medicine?.dosageUnit
                                                  )
                                                : "-"}
                                            </TableCell>
                                            <TableCell>
                                              {medicine?.dosageWhen
                                                ? transformText(
                                                    medicine?.dosageWhen
                                                  )
                                                : "-"}
                                            </TableCell>
                                            <TableCell>
                                              {medicine?.duration || "-"}
                                            </TableCell>
                                            <TableCell>
                                              {medicine?.sig || "-"}
                                            </TableCell>
                                            <TableCell>
                                              <Typography
                                                noWrap={true}
                                                title={medicine?.note}
                                                sx={{
                                                  width: "60px",
                                                  cursor: "pointer",
                                                }}
                                              >
                                                {medicine?.note || "-"}
                                              </Typography>
                                            </TableCell>
                                          </TableRow>
                                        )
                                    )}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            )}
                        </Box>
                        <Grid my={1} container gap={2}>
                          <ButtonBase
                            sx={grayButtonStyle}
                            onClick={handleOpenMedications}
                          >
                            <AddCircleOutlineIcon sx={{ fontSize: "18px" }} />
                            <Typography variant="h5">
                              {"Add Medication"}
                            </Typography>
                          </ButtonBase>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box ref={instrNoteTab}>
                      <Grid my={1.5}>
                        <Typography fontWeight={"600"} fontSize={"17px"}>
                          {"Follow Up & Instruction Note"}
                        </Typography>
                      </Grid>
                      <Grid py={0}>
                        <InputBase
                          name="encounterPlan.instructionNote"
                          value={
                            formikData?.values?.encounterPlan?.instructionNote
                          }
                          onChange={formikData.handleChange}
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
                    </Box>
                    <Box ref={followUpTab}>
                      <Grid my={1.5}>
                        <Typography fontWeight={"600"} fontSize={"17px"}>
                          {"Additional Note"}
                        </Typography>
                      </Grid>
                      <Grid py={0}>
                        <InputBase
                          name={"encounterPlan.additionalNote"}
                          value={
                            formikData?.values?.encounterPlan?.additionalNote
                          }
                          onChange={formikData.handleChange}
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
                    </Box>
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
                        // onClick={formikData.submitForm}
                        onClick={handleChangeView}
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
                p={1}
              >
                <ViewUnsignedVisite
                  formikData={formikData}
                  setEnablePreview={setEnablePreview}
                  tableClasses={tableClasses}
                  tabColumns={tabColumns}
                  handleCheckInAfterPreview={handleCheckInAfterPreview}
                  isSignedView={
                    unsignedEncounter && unsignedEncounter?.status === "SIGNED"
                      ? true
                      : false
                  }
                  appInfo={apptInfo}
                  unsignedEncounter={unsignedEncounter}
                  handleCancelEncounter={handleCancelEncounter}
                  openPrintEncounterView={openPrintEncounterView}
                  handlePrintViewEncounterDetails={
                    handlePrintViewEncounterDetails
                  }
                  setSharePdf={setSharePdf}
                  medications={medications}
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
                  sx={{ overflowY: "scroll", height: "95vh" }}
                  pt={5}
                  px={2}
                  pb={3}
                >
                  {indexValues === 0 && (
                    <ClinicalData
                      setCountAllergy={setCountAllergy}
                      patientUuid={
                        unsignedEncounter
                          ? unsignedEncounter?.patientUuid
                          : apptInfo?.patientUuid
                      }
                    />
                  )}
                  {indexValues === 1 && (
                    <EncounterTab
                      patientUuid={
                        unsignedEncounter
                          ? unsignedEncounter?.patientUuid
                          : apptInfo?.patientUuid
                      }
                    />
                  )}
                  {indexValues === 2 && (
                    <HistoryTab
                      patientUuid={
                        unsignedEncounter
                          ? unsignedEncounter?.patientUuid
                          : apptInfo?.patientUuid
                      }
                    />
                  )}
                  {indexValues === 3 && <TemplateTab />}
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
      </form>
      <Box>
        <HPIForm
          openHpi={openHpi}
          onClose={handleOpenHpi}
          formikData={formikData}
        />
        <ROSForm
          open={openROS}
          onClose={handleOpenROS}
          formikData={formikData}
        />
        <VitalsForm
          open={openVitals}
          onClose={handleOpenVitals}
          formikData={formikData}
        />
        <ObjectiveForm
          open={openPE}
          onClose={handleOpenPE}
          formikData={formikData}
        />
        <AddIcdCode
          open={openIcdCode}
          onClose={handleOpenIcdCode}
          formikData={formikData}
          initilalFormValues={initilalFormValues}
        />
        <MedicationsForm
          open={openMedications}
          onClose={handleOpenMedications}
          formikData={formikData}
          medications={medications}
          setMedications={setMedications}
        />
        <NoteForBP
          open={openBPNote}
          onClose={handleOpenNote}
          formikData={formikData}
        />
        <NoteForBMI
          open={openBMINote}
          onClose={handleOpenBmi}
          formikData={formikData}
        />
        <NoteForHr
          open={openHr}
          onClose={handleOpenHr}
          formikData={formikData}
        />
        <NoteForResp
          open={openResp}
          onClose={handleOpenResp}
          formikData={formikData}
        />
        <NoteForHeight
          open={openHeightNote}
          onClose={handleOpenHeight}
          formikData={formikData}
        />
        <NoteForWeight
          open={openWeightNote}
          onClose={handleOpenWightNote}
          formikData={formikData}
        />
        <NoteForTemperature
          open={openTempNote}
          onClose={handleOpenForTemperatureNote}
          formikData={formikData}
        />
        <NoteForOxygen
          open={openOxigenNote}
          onClose={handleOpenO2Note}
          formikData={formikData}
        />
        {openCancelModal && (
          <CancelPopMeassage
            message={"Are you certain you want to end this encounter?"}
            onClose={() => setOpenCancelModal(false)}
            navigateToRoute={"/provider/appointment/calendar"}
          />
        )}
        {openSuccessModal && (
          <EventSucessModal
            message={"Encounter Note Signed Successfully"}
            onClose={() => setOpenSuccessModal(false)}
            route={"/provider/appointment/calendar"}
          />
        )}
        <EncounterView
          open={openEncounterView}
          onClose={handleViewEncounterDetails}
          appointmentDetails={apptInfo ? apptInfo : unsignedEncounter}
          formikData={formikData}
        />
        <PrintEncounterView
          open={openPrintEncounterView}
          onClose={handlePrintViewEncounterDetails}
          appointmentDetails={apptInfo ? apptInfo : unsignedEncounter}
          formikData={formikData}
          medications={medications}
        />
        <SharePDF
          open={openSharePdf}
          onClose={handleSharePdfView}
          message={"encounter"}
          source="GlobalEncounter"
          uuid={
            apptInfo
              ? apptInfo?.encounterUuid
              : unsignedEncounter?.encounterUuid
          }
        />
      </Box>
      <Box>
        <IntakeFormList
          open={openIntakeForm}
          onClose={handleViewFilledIntake}
          apptInfo={apptInfo}
        />
      </Box>
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
    </>
  );
}

export default AppLayout(CompleteCheckIn, { source: PROVIDER });
