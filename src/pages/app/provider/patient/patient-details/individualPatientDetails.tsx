import {
  Autocomplete,
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
// import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { adminConstants } from "../../../../../constants/admin";
import moment from "moment";
import avatar from "../../../../../assets/other/avatar_01.jpg";
import { problemsforms } from "../../../../../mock-data/problemstabledetails";
import { medicationsdata } from "../../../../../mock-data/medicationstabledetails";
import { allergiesforms } from "../../../../../mock-data/allergiestabledetails";
import { useLocation, useNavigate } from "react-router-dom";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AppLayout from "../../../../../components/core/layout/layout";
import { formButtonStyle } from "../../../../../styles/common";
// import ProviderPatientsChartDemographics from "./patient-chart-sidebar-components/demographics";
// import Index from "./patient-chart-sidebar-components/appointments";
import Allergies from "./patient-chart-sidebar-components/allergies/index";
import ProblemIndex from "./patient-chart-sidebar-components/problems/index";
import MedicationIndex from "./patient-chart-sidebar-components/medication";
import VaccineIndex from "./patient-chart-sidebar-components/vaccine";
import VitalIndex from "./patient-chart-sidebar-components/vitals";
import LabIndex from "./patient-chart-sidebar-components/lab";
import HistoryIndex from "./patient-chart-sidebar-components/history";
// import ImagingIndex from "./patient-chart-sidebar-components/imaging";
import PatientDetailDashboard from "./patient-chart-sidebar-components/dashboard";
import DiagnosesTab from "./patient-chart-sidebar-components/diagnoses";
import DocumentsTab from "./patient-chart-sidebar-components/documents";
import VisitDetailsTab from "./patient-chart-sidebar-components/visit-details";
import FinancialTab from "./patient-chart-sidebar-components/financial";
import BillingTab from "./patient-chart-sidebar-components/billing";
import { isNavalaCare } from "../../../../../components/common/helper";
import Documentation from "../../documents/documentation";
import FolderItems from "../../documents/folder-items/folder-item";
import React from "react";
import { folderList } from "../../documents/documents-constant/documents-common-const";
import AdherenceToTreatment from "./patient-chart-sidebar-components/adherence-to-treatment/adherence-treatment";
import STITestingAndHistory from "./patient-chart-sidebar-components/sti-testing-history/sti-testing-history";
import SubstanceAbuseHistory from "./patient-chart-sidebar-components/substance-abuse-history/sub-abuse-history";
import RiskBehaviorScreening from "./patient-chart-sidebar-components/risk-behavior-screening/risk-behavior-screening";
import SocialAndEnvironmental from "./patient-chart-sidebar-components/social-and-environment/social-and-environment";
import HivAidsAndOtherStdEducation from "./patient-chart-sidebar-components/hiv-aid's-and-others/hiv-aids-and-others";
import FamilyPlanning from "./patient-chart-sidebar-components/family-planning/family-panning";
import ReferralsForServices from "./patient-chart-sidebar-components/referrals-for-services/referrals-for-services";
import { wrap } from "module";
import {
  usePatientControllerServiceGetPatient,
  useStickynotesControllerServiceGetAllStickyNote,
} from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import CloseIcon from "@mui/icons-material/Close";
import CustomFormLabel from "../../../../../components/common/custom-form-label";
import { multiSelectDropDown } from "../add-new-patient";
import PatientProfile from "./patient-chart-sidebar-components/patient-profile/profile";
import AddIcon from "@mui/icons-material/Add";
import AddNotes from "./patient-chart-sidebar-components/documents/sticky-notes/add-notes";
import { StickynotesControllerService } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { formatDate } from "../../../../../components/common/enums-and-interfaces/common-functions";
import Other from "./patient-chart-sidebar-components/other/other";
import PortalAccess from "./patient-chart-sidebar-components/patient-portal-access/portal-access";
import InsuranceTab from "./patient-chart-sidebar-components/demographics/insurance/insurance-tab";
import { Permission } from "../../../../../components/common/enums-and-interfaces/enums";
import useHasPermission from "../../../../../components/common/useHasPermission";
import PatientCardDetails from "./patient-chart-sidebar-components/card-details/patient-card-details";
import CardDetailsComponent from "./patient-chart-sidebar-components/card-details/card-details";
import PatientCardsInfo from "./patient-chart-sidebar-components/card-details";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Loader from "../../../../../components/common/spinner/loader";
// import ImagingIndex from "./patient-chart-sidebar-components/imaging";

// import ProviderPatientsChartAllergies from "./patient-chart-sidebar-components/allergies";
// import ProviderPatientsChartProblems from "./patient-chart-sidebar-components/problems";
// import ProviderPatientsChartMedications from "./patient-chart-sidebar-components/medications";
// import ProviderPatientsChartVaccines from "./patient-chart-sidebar-components/vaccines";
// import ProviderPatientsChartVitals from "./patient-chart-sidebar-components/vitals/vitals";
// import ProviderPatientsChartLabResult from "./patient-chart-sidebar-components/lab-results";
// import ProviderPatientsChartHistory from "./patient-chart-sidebar-components/history";
// import ProviderPatientsChartDocuments from "./patient-chart-sidebar-components/documents";
// import ProviderPatientsChartPatientPortalAccess from "./patient-chart-sidebar-components/patient-portal";
const {
  PROVIDER,
  // ADD_NEW_PATIENT
} = adminConstants;

export const patientDetailsStyle = makeStyles(() => ({
  childBody: {
    // backgroundColor: "#F1F1F1 !important",
  },
  mainBody: {
    marginBottom: "20px !important",
    backgroundColor: "#FFFFFF !important",
    boxShadow: "0px 0px 8px #00000029 !important",
    padding: "10px",
    borderRadius: "5px",
    // height: "auto !important",
    maxHeight: "140px !important",
  },
  sideBarBody: {
    width: "100%",
    // marginBottom: "20px !important",
    backgroundColor: "#FFFFFF !important",
    boxShadow: "0px 0px 8px #00000029 !important",
    padding: "5px",
    borderRadius: "5px",
    height: "70vh !important",
    overflowY: "scroll",
  },
  sideBarGrid: {
    boxShadow: "0px 0px 8px #00000029 !important",
    backgroundColor: "#FFFFFF !important",
    borderRadius: "5px",
    // marginTop: "10px",
    // height: "88.7vh !important",
    height: "100% !important",
  },
  sideBarButton: {
    width: "auto",
    padding: "20px !important",
    height: "32px",
    background: "#004186 0% 0% no-repeat padding-box !important",
    borderRadius: " 5px !important",
    color: "#fff !important",
    display: "flex",
    justifyContent: "space-evenly !important",
  },
  whiteText: {
    color: "#36598C !important",
    fontWeight: "bold !important",
  },
  listItem: {
    padding: "0px !important",
    margin: "0px !important",
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    "&:active": {
      backgroundColor: "transparent !important",
    },
    "& .MuiTouchRipple-root": {
      display: "none !important",
    },
  },
  tabStyle: {
    width: "100%",
    textAlign: "center",
    fontSize: "16px !important",
    // textAlign: "left",
    // fontWeight: "600 !important",
    color: "#1A1A1AB3 !important",
    padding: "5% !important",
    paddingLeft: "10% !important",
    margin: "3px 10px !important",
  },
  fixedGridBorder: {
    borderRight: "2px solid #1A1A1A1A !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    // paddingLeft: "8px",
    // paddingBottom: "20px",
  },
  activeCard: {
    background: "#defae7",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    padding: "3px 15px",
    // justifyContent: "center",
    // color: 'green !important'
    fontSize: "16px",
    fontWeight: "600 !important",
    fontFamily: "Roboto",
    color: "#00B917 !important",
  },
  inactiveCard: {
    borderRadius: "12px",
    fontWeight: "600 !important",
    display: "flex",
    alignItems: "center",
    padding: "3px 15px",
    background: "#fadfde",
    justifyContent: "center",
    color: "red",
  },
  buttonGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  scheduleButton: {
    width: "auto !important",
    height: "42px !important",
    background: "#004186 0% 0% no-repeat padding-box !important",
    borderRadius: "5px !important",
    color: "#fff !important",
    display: "flex",
    justifyContent: "flex-start !important",
    alignItems: "center",
    padding: "5px !important",
  },
  immediateButton: {
    width: "auto !important",
    height: "42px !important",
    border: "2px solid #004186 !important",
    background: "#CCECFF80 0% 0% no-repeat padding-box !important",
    borderRadius: "5px !important",
    color: "#fff !important",
    display: "flex",
    justifyContent: "flex-start !important",
    alignItems: "center",
    padding: "5px !important",
  },
  activeSidebar: {
    background: "#cce7ff 0% 0% no-repeat padding-box !important",
    color: "#004186 !important",
    //outline: "1px solid #36588C",
    borderRadius: "10px",
    // margin: '10px !important'
  },
  activeCount: {
    background: "#36598C",
    color: "#FFFFFF",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#1A1A1ACC !important",
    // fontWeight: "bold !important",
  },
  value: {
    fontWeight: "bold !important",
    color: "#004186 !important",
  },
  scheduleAppointmentTypo: {
    color: "#36588C !important",
    // fontWeight: "bold !important",
    // marginLeft: "10px !important",
  },
  immediateVisitNoteTypo: {
    // color: "#36588C !important",
    // fontWeight: "bold !important",
    marginLeft: "10px !important",
  },
}));

export const sideBarList = [
  {
    id: "Dashboard",
    name: "Dashboard",
    permission: true,
  },
  {
    id: "Allergies",
    name: "Allergies",
    permission: Permission.ALLERGY,
  },
  {
    id: "Diagnoses",
    name: "Diagnoses",
    permission: true,
  },
  {
    id: "Medications",
    name: "Medications",
    permission: Permission.MEDICATION,
  },
  {
    id: "Vaccines",
    name: "Vaccines",
    permission: Permission.VACCINE,
  },
  {
    id: "Vitals",
    name: "Vitals",
    permission: Permission.VITAL,
  },
  {
    id: "History",
    name: "History",
    permission: Permission.HISTORY,
  },
  {
    id: "Documents",
    name: "Documents",
    permission: Permission.DOCUMENT,
  },
  // {
  //   id: "Visit Details",
  //   name: "Visit Details",
  //   permission: true,
  // },
  // {
  //   id: "Financial",
  //   name: "Financial",
  //   permission: true,
  // },
  // {
  //   id: "Billing",
  //   name: "Billing",
  //   permission: true,
  // },
  {
    id: "Insurance",
    name: "Insurance",
    permission: true,
  },
  {
    id: "Payment Details",
    name: "Payment Details",
    permission: true,
  },
  {
    id: "Profile",
    name: "Profile",
    permission: true,
  },
  {
    id: "Portal Access",
    name: "Patient App Access",
    permission: true,
  },
];

export const careSideBarList = [
  {
    id: "Dashboard",
    name: "Dashboard",
    permission: true,
  },
  {
    id: "Document",
    name: "Document",
    permission: Permission.DOCUMENT,
    submenu: [
      {
        id: "CONSENTS_RELEASING_INFORMATION",
        name: "Consents to release information (medical,mental health, substance abuse)",
        permission: true,
      },
      {
        id: "LIMITS_OF_CONFIDENTIALITY_POLICY",
        name: "Limits of confidentiality policy",
        permission: true,
      },
      {
        id: "STATEMENT_FOR_CASE_MANAGEMENT",
        name: "Statement of informed Consent to Receive Case Management",
        permission: true,
      },
      {
        id: "STATEMENT_FOR_CLIENTS_RIGHTS_AND_RESPONSIBILITIES",
        name: "A statement of Client Rights and Responsibilities",
        permission: true,
      },
      {
        id: "GRIEVANCE_PRODUCERS_POLICY",
        name: "Grievance Procedure Policy",
        permission: true,
      },
      {
        id: "ENROLEMENT_FORM",
        name: "340B Enrolment Form",
        permission: true,
      },
      {
        id: "HEALTH_INSURANCE",
        name: "Health Insurance",
        permission: true,
      },
      {
        id: "HARDCOPY_PRESCRIPTION",
        name: "Hard Copy Prescription",
        permission: true,
      },
      {
        id: "SUMMARY_OF_MEDICAL_VISITS",
        name: "Summary of Medical Visits",
        permission: true,
      },
    ],
  },
  {
    id: "Medications",
    name: "Medications",
    permission: Permission.MEDICATION,
  },
  {
    id: "ADHERENCE_TO_TREATMENT",
    name: "Adherence to treatment",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "STI_TESTING_AND_HISTORY",
    name: "STI Testing & History",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "SUBSTANCE_ABUSE_HISTORY",
    name: "Substance Abuse History",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "RISK_BEHAVIOR_SCREENING",
    name: "Risk Behavior Screening",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "SOCIAL_AND_ENVIRONMENT_SUPPORT",
    name: "Social and Environmental Support",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "HIV/AIDS_AND_OTHER_STD_EDUCATION",
    name: "HIV/AIDS & Other STDs Education",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "FAMILY_PLANNING",
    name: "Family Planning",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "REFERRALS_FOR_SERVICES",
    name: "Referrals for Services",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "OTHER",
    name: "Other",
    permission: Permission.CARE_PATIENT_CHART,
  },
  {
    id: "Profile",
    name: "Profile",
    permission: true,
  },
];

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

function IndividualPatientDetails() {
  const classes = patientDetailsStyle();
  const location = useLocation();
  const encounterDetails = useLocation();
  const [patientData, setPatientData] = useState<any>();
  const lastLogin = new Date(patientData?.lastLogin) || "-";
  const [stickyD, setStickyD] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialog = () => {
    setOpenDialog((item) => !item);
  };
  const [flag, setFlag] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openSideListComponent, setOpenSideListComponent] =
    useState("Dashboard");
  const [activeCount, setActiveCount] = useState([
    {
      id: "Problems",
      count: "0",
    },
  ]);

  const { data: patientInfo, isLoading: isLoadingByChart } =
    usePatientControllerServiceGetPatient({
      patientUuid: encounterDetails?.state?.appointmentDetails?.patientUuid,
    });

  useEffect(() => {
    if (patientInfo) {
      setPatientData(patientInfo?.data);
    }
  }, [patientInfo]);

  const { data: patientDetails } = usePatientControllerServiceGetPatient({
    patientUuid: location?.state?.row?.uuid,
  });

  useEffect(() => {
    if (location?.state?.row && patientDetails) {
      setPatientData(patientDetails?.data);
    }
  }, [patientDetails]);

  const {
    data: stickyNoteData,
    isLoading,
    isError,
    refetch,
  } = useStickynotesControllerServiceGetAllStickyNote({
    patientUuid: patientData?.uuid,
    page: 0,
    size: 10,
    sort: ["created,desc"],
  });
  useEffect(() => {
    if (!!patientData && !!stickyNoteData)
      setStickyD(stickyNoteData?.data?.content?.slice(0, 1));
  }, [patientData, stickyNoteData]);

  const canViewStickyNotes = isNavalaCare()
    ? true
    : useHasPermission(Permission.STICKY_NOTE);

  function createAllergiesForms(
    allergies: string,
    criticality: string,
    reason: string,
    severity: string,
    onsetdate: string,
    updateddate: string,
    status: boolean,
    note: string,
    action: boolean
  ): Row {
    return {
      allergies,
      criticality,
      reason,
      severity,
      onsetdate,
      updateddate,
      status,
      note,
      action,
    };
  }

  useEffect(() => {
    const newRows = allergiesforms?.content.map((data: any) => {
      return createAllergiesForms(
        data.allergies,
        data.criticality,
        data.reason,
        data.severity,
        data.onsetdate,
        data.updateddate,
        data.status,
        data.note,
        data.action
      );
    });
    let countOfActive = 0;
    newRows?.forEach((item) => {
      if (item.status) {
        countOfActive++;
      }
    });

    const updateCount = (id: string, newCount: number) => {
      setActiveCount((prevActiveCount: any) => {
        return prevActiveCount.map((item: { id: any }) => {
          if (item.id === id) {
            return { ...item, count: newCount.toString() };
          }
          return item;
        });
      });
    };
    updateCount("Allergies", countOfActive);
  }, []);

  function createProblemsForms(
    problems: string,
    type: string,
    diagnoseddate: string,
    updateddate: string,
    status: boolean,
    note: string,
    action: boolean
  ): Row {
    return {
      problems,
      type,
      diagnoseddate,
      updateddate,
      status,
      note,
      action,
    };
  }

  useEffect(() => {
    const newRows = problemsforms?.content.map((data: any) => {
      return createProblemsForms(
        data.problems,
        data.type,
        data.diagnoseddate,
        data.updateddate,
        data.status,
        data.note,
        data.action
      );
    });

    let countOfActive = 0;
    newRows?.forEach((item) => {
      if (item.status) {
        countOfActive++;
      }
    });

    const updateCount = (id: string, newCount: number) => {
      setActiveCount((prevActiveCount: any) => {
        return prevActiveCount.map((item: { id: any }) => {
          if (item.id === id) {
            return { ...item, count: newCount.toString() };
          }
          return item;
        });
      });
    };

    updateCount("Problems", countOfActive);
  }, []);

  function createMedicationForms(
    medication: string,
    prescriber: string,
    dosage: string,
    route: string,
    startdate: string,
    enddate: string,
    status: boolean,
    action: boolean
  ): Row {
    return {
      medication,
      prescriber,
      dosage,
      route,
      startdate,
      enddate,
      status,
      action,
    };
  }

  useEffect(() => {
    const newRows = medicationsdata?.content.map((data: any) => {
      return createMedicationForms(
        data.medication,
        data.prescriber,
        data.dosage,
        data.route,
        data.startdate,
        data.enddate,
        data.status,
        data.action
      );
    });
    const activeData = newRows.filter((res) => res.status === true);
    const activeCount = activeData.length;

    const updateCount = (id: string, newCount: number) => {
      setActiveCount((prevActiveCount: any) => {
        return prevActiveCount.map((item: { id: any }) => {
          if (item.id === id) {
            return { ...item, count: newCount.toString() };
          }
          return item;
        });
      });
    };
    updateCount("Medications", activeCount);
  }, []);

  const handleScheduleNewAppointment = () => {};
  const [folderOpen, setFolderOpen] = useState(
    "CONSENTS_RELEASING_INFORMATION"
  );
  const [folderInfo, setFolderInfo] = useState(
    "Consents to release information (medical,mental health, substance abuse)"
  );
  const openSidebarPage = (id: any) => {
    setOpenSideListComponent(id);
    if (id === "Document") {
      toggleSubMenu();
      setFolderOpen("CONSENTS_RELEASING_INFORMATION");
    } else {
      setIsSubMenuOpen(false);
    }
  };

  const handleOpenFolder = (folderDetails: any) => {
    setFolderOpen(folderDetails?.id);
    setFolderInfo(folderDetails.name);
  };
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  function calculateAge(dateOfBirth: any) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getUTCFullYear() - dob.getUTCFullYear();
    const monthDiff = today.getUTCMonth() - dob.getUTCMonth();
    const dayDiff = today.getUTCDate() - dob.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }
  const sideBarData = !isNavalaCare() ? sideBarList : careSideBarList;

  const {
    data,
    isSuccess,
    isLoading: isLoadingByOpenPatient,
  } = usePatientControllerServiceGetPatient({
    patientUuid: patientData?.uuid,
  });

  return (
    <>
      {(isLoadingByOpenPatient || isLoadingByChart) && (
        <Loader isLoading={true} />
      )}
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid>
          <Grid container spacing={2}>
            <Grid item xs={1.4}>
              <Grid className={classes.sideBarGrid}>
                <List>
                  {sideBarData.map((tab: any) => {
                    const canViewTab =
                      tab.permission === true
                        ? true
                        : useHasPermission(tab.permission);
                    if (!canViewTab) {
                      return null;
                    }
                    return (
                      <Box>
                        <ListItem
                          className={classes.listItem}
                          button
                          key={tab.id}
                        >
                          <Typography
                            //noWrap={true}
                            // overflow={"wrap"}
                            flexWrap={"wrap"}
                            title={tab.name}
                            onClick={() => {
                              openSidebarPage(tab.id);
                            }}
                            className={`${classes.tabStyle} ${
                              tab.id === openSideListComponent &&
                              classes.activeSidebar
                            }`}
                            sx={{
                              // display: "flex",
                              // justifyContent: "space-between",
                              textAlign: "left",
                              // alignItems: "left",
                              color:
                                tab.id === openSideListComponent
                                  ? "#004186 !important"
                                  : "black !important",
                              fontWeight:
                                tab.id === openSideListComponent
                                  ? "bold"
                                  : "normal",
                            }}
                          >
                            {tab.name}
                            {activeCount.map((res) => {
                              if (res.id === tab.id) {
                                return (
                                  <span className={classes.activeCount}>
                                    {res.count}
                                  </span>
                                );
                              }
                            })}
                          </Typography>
                        </ListItem>
                        {isSubMenuOpen && (
                          <Box>
                            {tab?.submenu?.map((subItem: any) => (
                              <ListItem
                                key={subItem.id}
                                button
                                className={classes.listItem}
                              >
                                <Box width={"80%"} ml={2}>
                                  <Typography
                                    noWrap={false}
                                    title={subItem.name}
                                    onClick={() => handleOpenFolder(subItem)}
                                    className={`${classes.tabStyle} ${
                                      subItem.id === folderOpen &&
                                      classes.activeSidebar
                                    }`}
                                    sx={{
                                      color: "black !important",
                                    }}
                                  >
                                    {subItem.name}
                                  </Typography>
                                </Box>
                              </ListItem>
                            ))}
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
            <Grid item xs={10.6} className={classes.childBody}>
              <Grid container sx={{ flexDirection: "column" }}>
                <Grid item className={classes.mainBody}>
                  <Grid container sx={{ display: "flex", gap: "20px" }}>
                    <Grid sx={{ pt: 1.5 }}>
                      <img
                        style={{
                          height: "90px",
                          width: "90px",
                          borderRadius: "50%",
                        }}
                        src={data?.data?.avatar || avatar}
                      />
                    </Grid>
                    <Grid item xs={4.5}>
                      <Grid container mt={0}>
                        <Grid
                          item
                          xs={12}
                          className={classes.fixedGridBorder}
                          sx={{ flexDirection: "column" }}
                        >
                          <Grid
                            container
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: "15px",
                            }}
                          >
                            <Typography
                              variant="h1"
                              sx={{
                                color: "#004186",
                                fontWeight: "bold",
                                fontSize: "20px !important",
                                pb: 1,
                                pt: 2,
                              }}
                            >
                              {`${patientData?.legalFirstName} ${patientData?.legalLastName}`}
                            </Typography>
                            <Typography
                              variant="h5"
                              className={`${
                                data?.data?.isEmailVerify
                                  ? classes.activeCard
                                  : classes.inactiveCard
                              }`}
                            >
                              {data?.data?.isEmailVerify
                                ? "Active"
                                : "Inactive"}
                            </Typography>
                            <ButtonBase
                              sx={{
                                //display: "flex",
                                px: "20px",
                                background: "#e5e5e5",
                                border: "1px solid gray",
                                display: "none", //hide from the UI
                                //mx: "10px",
                              }}
                            >
                              <Typography>{"Invite Patient"}</Typography>
                            </ButtonBase>
                          </Grid>
                          <Grid container>
                            {patientData?.email && (
                              <Box
                                sx={{
                                  flex: 1,
                                  display: "flex",
                                  alignItems: "center",
                                  minWidth: "250px",
                                  mb: 1.5,
                                }}
                              >
                                <EmailIcon sx={{ mr: 1, color: "#36588C" }} />
                                <Typography
                                  variant="h4"
                                  noWrap
                                  title={patientData?.email}
                                  sx={{ cursor: "pointer" }}
                                >
                                  {patientData?.email || ""}
                                </Typography>
                              </Box>
                            )}
                            {patientData?.contactNumber && (
                              <Box
                                sx={{
                                  flex: 1,
                                  display: "flex",
                                  alignItems: "start",
                                  minWidth: "150px",
                                }}
                              >
                                <LocalPhoneIcon
                                  sx={{ mr: 1, color: "#36588C" }}
                                />
                                <Typography variant="h4" noWrap>
                                  {patientData?.contactNumber ||
                                    "No Phone Number"}
                                </Typography>
                              </Box>
                            )}
                          </Grid>
                          <Grid container>
                            {patientData?.birthDate && (
                              <>
                                <Typography variant="h4" sx={{ pb: 2, pr: 1 }}>
                                  <CalendarMonthIcon
                                    sx={{ mr: 1, color: "#36588C" }}
                                  />
                                  {moment(patientData?.birthDate).format(
                                    "MM-DD-YYYY"
                                  )}
                                </Typography>
                                <Typography variant="h4" sx={{ pb: 2 }}>
                                  {`(${calculateAge(
                                    patientData?.birthDate || ""
                                  )} Yrs)`}{" "}
                                  {`(${
                                    patientData?.gender?.slice(0, 1) || ""
                                  })`}
                                </Typography>
                              </>
                            )}
                            {/* <Box width={"65%"}>
                              {patientData?.address?.line1 ? (
                                <Typography
                                  variant="h4"
                                  sx={{ pb: 2, pl: 10, cursor: "pointer" }}
                                  title={`${patientData?.address?.line1} ${patientData?.address?.city} ${patientData?.address?.state} ${patientData?.address?.country}`}
                                  noWrap
                                >
                                  <LocationOnIcon
                                    sx={{ ml: 1, color: "#36588C" }}
                                  />{" "}
                                  {`${patientData?.address?.line1} ${patientData?.address?.city} ${patientData?.address?.state} ${patientData?.address?.country}` ||
                                    ""}
                                </Typography>
                              ) : (
                                ""
                              )}
                            </Box> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={2.8}
                      className={classes.fixedGridBorder}
                      sx={{ flexDirection: "column" }}
                    >
                      <Grid container>
                        <Grid item xs={5}>
                          <Typography variant="h5" className={classes.heading}>
                            Next Appointment
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography
                            variant="h5"
                            sx={{ color: "#36588C", fontWeight: 600 }}
                          >
                            {data?.data?.nextVisit != null
                              ? moment(data?.data?.nextVisit).format(
                                  "DD-MM-yyyy HH:mm"
                                )
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={5}>
                          <Typography variant="h5" className={classes.heading}>
                            Last Appointment
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography
                            variant="h5"
                            sx={{ color: "#36588C", fontWeight: 600 }}
                          >
                            {data?.data?.lastVisit != null
                              ? moment(data?.data?.lastVisit).format(
                                  "DD-MM-yyyy HH:mm"
                                )
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={5}>
                          <Typography variant="h5" className={classes.heading}>
                            Primary Provider
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="h5">
                            {patientData?.providerFirstName
                              ? `${patientData?.providerFirstName} ${patientData?.providerLastName}`
                              : "-"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {canViewStickyNotes && (
                      <Grid item xs={2} sx={{ flexDirection: "column" }}>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            background: "#F8FDFF 0% 0% no-repeat padding-box",
                            border: "1px solid #1B598426",
                            borderRadius: "5px",
                            opacity: 1,
                            height: "110px",
                            cursor: "pointer",
                          }}
                          onClick={() => setOpen(true)}
                        >
                          <Grid
                            item
                            xs={12}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: "5px 5px",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              Note
                            </Typography>
                            <AddIcon sx={{ fontSize: "20px" }} />
                          </Grid>
                          {stickyD.map((data: any) => {
                            return (
                              <React.Fragment key={data.id}>
                                {" "}
                                <Tooltip title={data?.description}>
                                  <Grid
                                    item
                                    xs={12}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      padding: "5px 5px",
                                      overflow: "hidden",
                                    }}
                                    onClick={() => {
                                      setOpen(true);
                                    }}
                                  >
                                    <Typography
                                      variant="h6"
                                      noWrap={false}
                                      sx={{
                                        fontWeight: "bold",
                                        color: "#1A1A1A99",
                                        height: "30px",
                                      }}
                                    >
                                      {data?.description}
                                    </Typography>
                                  </Grid>
                                </Tooltip>
                                <Grid
                                  item
                                  xs={12}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                  mt={2}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontWeight: "bold",
                                      color: "#1A1A1A99",
                                    }}
                                    pr={1}
                                  >
                                    {data?.createdInfo},
                                    {formatDate(data?.createdDate)}
                                  </Typography>
                                </Grid>
                              </React.Fragment>
                            );
                          })}
                        </Grid>
                      </Grid>
                    )}
                    <Grid
                      item
                      xs={1.3}
                      p={1}
                      className={classes.buttonGrid}
                      sx={{
                        flexDirection: "column",
                        background: "#F8FDFF 0% 0% no-repeat padding-box",
                        border: "1px solid #1B598426",
                        borderRadius: "5px",
                        opacity: 1,
                        height: "110px",
                        cursor: "pointer",
                      }}
                    >
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            variant="h5"
                            className={classes.heading}
                            sx={{ fontWeight: 600 }}
                          >
                            Patient Portal
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container gap={"3px"}>
                        <Grid item>
                          <Typography variant="h5" className={classes.heading}>
                            Last Login :
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h5"
                            sx={{ color: "#36588C", fontWeight: 600 }}
                          >
                            {(patientData?.lastLogin !== null &&
                              `${
                                lastLogin.getHours() +
                                ":" +
                                lastLogin.getMinutes() +
                                ":" +
                                lastLogin.getSeconds()
                              }`) ||
                              "00:00"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid></Grid>
                    </Grid>
                    {/* <Grid
                      item
                      // xs={1.8}
                      pb={2}
                      sx={{
                        justifyContent: "space-evenly",
                        flexDirection: "column",
                        gap: "10px",
                        paddingBottom: "0",
                      }}
                      className={classes.buttonGrid}
                    >
                      <ButtonBase
                        sx={{
                          ...formButtonStyle.saveButtonStyle,
                          width: "100%",
                          background: "#36598C",
                        }}
                        onClick={handleScheduleNewAppointment}
                      >
                        <InsertInvitationOutlinedIcon />
                        <Typography
                          variant="h5"
                          className={classes.immediateVisitNoteTypo}
                        >
                          Schedule Appointment
                        </Typography>
                      </ButtonBase>

                      <ButtonBase
                        sx={formButtonStyle.mainButtonStyle}
                        // onClick={() =>
                        //   navigate("/provider/scheduling/intake-form")
                        // }
                      >
                        <DescriptionOutlinedIcon sx={{ color: "#36588C" }} />
                        <Typography
                          variant="h5"
                          className={classes.immediateVisitNoteTypo}
                        >
                          Immediate Visit Note
                        </Typography>
                      </ButtonBase>
                    </Grid> */}
                  </Grid>
                </Grid>
                <Grid item className={classes.sideBarBody}>
                  {openSideListComponent === "Dashboard" ? (
                    <PatientDetailDashboard
                      patientData={patientData}
                      data={data}
                      setOpenSideListComponent={setOpenSideListComponent}
                      setTabValue={setTabValue}
                    />
                  ) : openSideListComponent === "Allergies" ? (
                    <Allergies patientData={patientData} />
                  ) : openSideListComponent === "Diagnoses" ? (
                    <DiagnosesTab patientData={patientData} />
                  ) : openSideListComponent === "Problems" ? (
                    <ProblemIndex />
                  ) : openSideListComponent === "Medications" ? (
                    <MedicationIndex patientData={patientData} />
                  ) : openSideListComponent === "Vaccines" ? (
                    <VaccineIndex patientData={patientData} />
                  ) : openSideListComponent === "Vitals" ? (
                    <VitalIndex patientData={patientData} />
                  ) : openSideListComponent === "Lab" ? (
                    <LabIndex patientData={patientData} />
                  ) : openSideListComponent === "History" ? (
                    <HistoryIndex
                      patientData={patientData}
                      tabValue={tabValue}
                    />
                  ) : openSideListComponent === "Documents" ? (
                    <DocumentsTab patientData={patientData} />
                  ) : openSideListComponent === "Visit Details" ? (
                    <VisitDetailsTab patientData={patientData} />
                  ) : openSideListComponent === "Financial" ? (
                    <FinancialTab patientData={patientData} />
                  ) : openSideListComponent === "Billing" ? (
                    <BillingTab patientData={patientData} />
                  ) : openSideListComponent === "Profile" ? (
                    <PatientProfile patientData={patientData} />
                  ) : openSideListComponent === "Portal Access" ? (
                    <PortalAccess patientData={patientData} />
                  ) : openSideListComponent === "Insurance" ? (
                    <InsuranceTab patientData={patientData} />
                  ) : openSideListComponent === "Payment Details" ? (
                    <PatientCardsInfo patientData={patientData} />
                  ) : // <CardDetailsComponent patientData={patientData} />
                  openSideListComponent === "ADHERENCE_TO_TREATMENT" ? (
                    <AdherenceToTreatment patientData={patientData} />
                  ) : openSideListComponent === "STI_TESTING_AND_HISTORY" ? (
                    <STITestingAndHistory patientData={patientData} />
                  ) : openSideListComponent === "SUBSTANCE_ABUSE_HISTORY" ? (
                    <SubstanceAbuseHistory patientData={patientData} />
                  ) : openSideListComponent === "RISK_BEHAVIOR_SCREENING" ? (
                    <RiskBehaviorScreening patientData={patientData} />
                  ) : openSideListComponent ===
                    "SOCIAL_AND_ENVIRONMENT_SUPPORT" ? (
                    <SocialAndEnvironmental patientData={patientData} />
                  ) : openSideListComponent ===
                    "HIV/AIDS_AND_OTHER_STD_EDUCATION" ? (
                    <HivAidsAndOtherStdEducation patientData={patientData} />
                  ) : openSideListComponent === "FAMILY_PLANNING" ? (
                    <FamilyPlanning patientData={patientData} />
                  ) : openSideListComponent === "REFERRALS_FOR_SERVICES" ? (
                    <ReferralsForServices patientData={patientData} />
                  ) : openSideListComponent === "OTHER" ? (
                    <Other patientData={patientData} />
                  ) : folderOpen !== "" ? (
                    <FolderItems
                      folderId={folderOpen}
                      patientData={patientData}
                      folderName={folderInfo}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <AddNotes
            source="Add"
            open={open}
            setOpen={setOpen}
            patientData={patientData}
            refetch={refetch}
          />
        </Grid>
      </Box>
    </>
  );
}

export default AppLayout(IndividualPatientDetails, { source: PROVIDER });
