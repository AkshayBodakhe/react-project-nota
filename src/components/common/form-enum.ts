import { PatientLabOrder } from "../../sdk/thinkemr-core-0.0.1/requests";

export enum providerType {
  SENT_BY_EMAIL = "SENT_BY_EMAIL",
  UNCOMPLETED = "UNCOMPLETED",
  IN_REVIEW = "IN_REVIEW",
  DECLINED = "DECLINED",
  APPROVED = "APPROVED",
  ACTIONS_REQUIRED = "ACTIONS_REQUIRED",
  NOT_STARTED = "NOT_STARTED",
}

export interface Option {
  key: string;
  value: string;
}

export const providerTypeList = [
  {
    key: "MD",
    value: "MD",
  },
  {
    key: "PA",
    value: "PA",
  },
  {
    key: "LCSW",
    value: "LCSW",
  },
  {
    key: "NP",
    value: "NP",
  },
  {
    key: "NPS",
    value: "NPS",
  },
  {
    key: "RN",
    value: "RN",
  },
  {
    key: "BHNP",
    value: "BHNP",
  },
  {
    key: "FNP",
    value: "FNP",
  },
  {
    key: "RD",
    value: "RD",
  },
  {
    key: "NONE",
    value: "None",
  },
  {
    key: "PSYD",
    value: "Psyd",
  },
  {
    key: "CASE_MANAGER",
    value: "Case Manager",
  },
  {
    key: "FRONT_DESK_MANAGER",
    value: "Front Desk Manager",
  },
  {
    key: "GENERAL_MEDICINE",
    value: "General Medicine",
  },
  {
    key: "OTHER",
    value: "other",
  },
];

export const providerRoleList = [
  {
    key: "FACILITY_ADMIN",
    value: "Facility Admin",
  },
  {
    key: "SPECIALIST",
    value: "Specialist",
  },
  {
    key: "PRIMARY_CARE_ADMIN",
    value: "Primary Care Provider",
  },
  {
    key: "PHYSICIAN_ASSISTANT",
    value: "Physician Assistant",
  },
  {
    key: "PHYSICIAN",
    value: "Physician",
  },
];

export const Gender = [
  {
    key: "MALE",
    value: "Male",
  },
  {
    key: "FEMALE",
    value: "Female",
  },
  {
    key: "TRANSGENDER",
    value: "Transgender",
  },
  {
    key: "OTHER",
    value: "Other",
  },
];

export const PortalName = [
  {
    key: "Navala Global",
    value: "NAVALAGLOBAL",
  },
  {
    key: "Navala Care",
    value: "NAVALACARE",
  },
];

export const ContactType = [
  {
    key: "Insurace (Payer)",
    value: "Insurace (Payer)",
  },
  {
    key: "Lab",
    value: "Lab",
  },
  {
    key: "Clinic",
    value: "Clinic",
  },
  {
    key: "Vendor",
    value: "Vendor",
  },
  {
    key: "Pharmacy",
    value: "Pharmacy",
  },
  {
    key: "Provider",
    value: "Provider",
  },
  {
    key: "Patient",
    value: "Patient",
  },
  {
    key: "Other",
    value: "Other",
  },
];

export const BookingWindows = [
  {
    key: "ONE_WEEK",
    value: "1 Week",
  },
  {
    key: "TWO_WEEK",
    value: "2 Week",
  },
  {
    key: "THREE_WEEK",
    value: "3 Week",
  },
  {
    key: "FOUR_WEEK",
    value: "4 Week",
  },
  {
    key: "FIVE_WEEK",
    value: "5 Week",
  },
  {
    key: "SIX_WEEK",
    value: "6 Week",
  },
  {
    key: "TWELVE_WEEK",
    value: "12 Week",
  },
  {
    key: "TWENTY_SIX_WEEK",
    value: "26 Week",
  },
  {
    key: "FIFTY_TWO_WEEK",
    value: "52 Week",
  },
];

export const AvailibilityType = [
  {
    key: "IN_PERSON",
    value: "In Person",
  },
  {
    key: "VIRTUAL",
    value: "Virtual",
  },
];

export const OperationType = [
  {
    key: "Add",
    value: "ADD",
  },
  {
    key: "Remove",
    value: "REMOVE",
  },
];

export const MaritalStatusOptions = [
  {
    key: "SINGLE",
    value: "Single",
  },
  {
    key: "MARRIED",
    value: "Married",
  },
  {
    key: "DIVORCED",
    value: "Divorced",
  },
  {
    key: "WIDOWED",
    value: "Widowed",
  },
];

export const LanguageOptions = [
  {
    key: "ENGLISH",
    value: "English",
  },
  {
    key: "SPANISH",
    value: "Spanish",
  },
  {
    key: "FRENCH",
    value: "French",
  },
  {
    key: "GERMAN",
    value: "German",
  },
  {
    key: "ITALIAN",
    value: "Italian",
  },
  {
    key: "POETUGUESE",
    value: "Portuguese",
  },
  {
    key: "POLISH",
    value: "Polish",
  },
  {
    key: "DUTCH",
    value: "Dutch",
  },
  {
    key: "RUSSIAN",
    value: "Russian",
  },
  {
    key: "CHINESE",
    value: "Chinese",
  },
  {
    key: "ARABIC",
    value: "Arabic",
  },
  {
    key: "NONE",
    value: "None",
  },
];

export const Race = [  
  {
    key: "WHITE",
    value: "White",
  },
  {
    key: "BLACK",
    value: "Black",
  },
  {
    key: "ASIAN",
    value: "Asian",
  },
  {
    key: "NATIVE_AMERICAN",
    value: "Native American",
  },
  {
    key: "OTHER",
    value: "Other",
  },
];

export const Ethnicity = [  
  {
    key: "HISPANIC",
    value: "Hispanic",
  },
  {
    key: "NON_HISPANIC",
    value: "White (Non-Hispanic)",
  },
  {
    key: "BLACK",
    value: "Black",
  },
  {
    key: "ASIAN",
    value: "Asian",
  },
  {
    key: "NATIVE_AMERICAN",
    value: "Native American",
  },
  {
    key: "OTHER",
    value: "Other",
  },
];

export const RealationWithPatient = [
  {
    key: "SPOUSE",
    value: "Spouse",
  },
  {
    key: "CHILD",
    value: "Child",
  },
  {
    key: "GRANDCHILD",
    value: "Grand Child",
  },
  {
    key: "FOSTERCHILD",
    value: "Foster Child",
  },
  {
    key: "SELF",
    value: "Self",
  },
  {
    key: "OTHER",
    value: "Other",
  },
];

export const LicecedState = [
  {
    key: "ALASKA",
    value: "Alaska",
  },
];

export const States = [
  {
    key: "NY - New York",
    value: "NY - New York",
  },
  {
    key: "NJ - New Jerersy",
    value: "NJ - New Jerersy",
  },
  {
    key: "UT - Utah",
    value: "UT - Utah",
  },
  {
    key: "NV - Nevada",
    value: "NV - Nevada",
  },
];

export const TimeZones = [
  {
    key: "PST",
    value: "PST",
  },
  {
    key: "CST",
    value: "CST",
  },
  {
    key: "EST",
    value: "EST",
  },
  {
    key: "MST",
    value: "MST",
  },
  {
    key: "AST",
    value: "AST",
  },
  {
    key: "HST",
    value: "HST",
  },
];

export const AppointmentTimeZones = [
  {
    key: "EST",
    value: "EST",
  },
  {
    key: "CT",
    value: "CT",
  },
  {
    key: "MT",
    value: "MT",
  },
  {
    key: "PT",
    value: "PT",
  },
  {
    key: "AKT",
    value: "AKT",
  },
  {
    key: "HST",
    value: "HST",
  },
  {
    key: "HAST",
    value: "HAST",
  },
  {
    key: "MST",
    value: "MST",
  },
  {
    key: "IST",
    value: "IST",
  },
];

export const AppointmentsTime = [
  {
    key: "HOURS_AWAY",
    value: "Hours Away",
  },
  {
    key: "MINUTE_AWAY",
    value: "Minute Away",
  },
  {
    key: "DAY_AWAY",
    value: "Day Away",
  },
];

export const RelationToInsured = [
  { key: "Self", value: "SELF" },
  { key: "Spouse", value: "SPOUSE" },
  { key: "Child", value: "CHILD" },
  { key: "Other", value: "OTHER" },
];

export const RelationShips = [
  // { key: "SELF", value: "Self" },
  { key: "SPOUSE", value: "Spouse" },
  { key: "PARENT", value: "Parent" },
  { key: "CHILD", value: "Child" },
  { key: "SIBLING", value: "Sibling" },
  { key: "OTHER", value: "Other" },
];

export const InsuranceTypeOpts = [
  { key: "PRIMARY", value: "Primary Insurance" },
  { key: "SECONDARY", value: "Secondary Insurance" },
  { key: "OTHER", value: "Other" },
];

export const YearOfexperiance = [
  {
    key: "UNDER_10_YEARS",
    value: "Under 10 years",
  },
  {
    key: "10-20_YEARS",
    value: "10-20 Years",
  },
  {
    key: "20-30_YEARS",
    value: "20-30 years",
  },
];

export const EnrollSelection = [
  {
    key: "EMAIL_ME",
    value: "Email me program info",
  },
  {
    key: "ENROLL_ME",
    value: "Yes, enroll me",
  },
  {
    key: "DONT_ENROLL_ME",
    value: "No, Do not enroll me",
  },
];

export const languagesSpoken = [
  {
    key: "ENGLISH",
    value: "English",
  },
  {
    key: "FRENCH",
    value: "French",
  },
  {
    key: "BILINGUAL",
    value: "Bilingual Spanish/English",
  },
];

export const portals = [
  {
    key: "NAVALA_CARE",
    value: "Navala Care",
  },
  {
    key: "NAVALA_GLOBAL",
    value: "Navala Global",
  },
];

export const AgeGroupSeen = [
  {
    key: "PEDIATRIC",
    value: "Pediatric",
  },
  {
    key: "ADULT",
    value: "Adult",
  },
  {
    key: "GERIATRIC",
    value: "Geriatric",
  },
];

export const NewPatientsAndCashpay = [
  {
    key: true,
    value: "Yes",
  },
  {
    key: false,
    value: "No",
  },
];

export const IntakePlans = [
  {
    key: "Medical_BRIEF_INTAKE_FORM",
    value: "Medical brief Intake Form",
  },
  {
    key: "NUTRITION_QUESTIONS",
    value: "Nutrition Question",
  },
  {
    key: "ANNUAL_UPDATE",
    value: "Annual Update",
  },
  {
    key: "MEDICAL_INTAKE_FORM",
    value: "Medical Intake Form",
  },
];

export const roomOptions = [
  {
    key: "Room_1",
    value: "Room 1",
  },
  {
    key: "Room_2",
    value: "Room 2",
  },
  {
    key: "Room_3",
    value: "Room 3",
  },
  {
    key: "Room_4",
    value: "Room 4",
  },
];

export const WeekDays = [
  {
    key: "MONDAY",
    value: "Monday",
  },
  {
    key: "TUESDAY",
    value: "Tuesday",
  },
  {
    key: "WEDNESDAY",
    value: "Wednesday",
  },
  {
    key: "THURSDAY",
    value: "Thursday",
  },
  {
    key: "FRIDAY",
    value: "Friday",
  },
  {
    key: "SATURDAY",
    value: "Saturday",
  },
  {
    key: "SUNDAY",
    value: "Sunday",
  },
];

export const insuranceAcceptedList = [
  "199SEIU Benefits and pension funds - Athena PPO",
  "199SEIU Benefits and pension funds - Institutional",
  "199SEIU Benefits and pension funds - Multiplan PPO",
  "199SEIU Benefits and pension funds - Unknown",
];

export const workLocationsList = [
  "26 Federal plaza, New York, NY 10278",
  "1527 Pond Reef Rd, New York, NY 10278",
  "925 S Chugach St #APT 10, New York, NY 10278",
  "925 S Chugach St #APT 10, New York, NY 10278",
  "925 S Chugach St #APT 10, New York, NY 10278",
];

export const newStatusList = [
  {
    key: "Awaiting of sign-off",
    value: "Awaiting of sign-off",
  },
  {
    key: "Missing CPT code",
    value: "Missing CPT code",
  },
  {
    key: "Missing ICD code",
    value: "Missing ICD code",
  },
  {
    key: "Cancel",
    value: "Cancel",
  },
];

export const Severity = [
  {
    key: "MILD",
    value: "Mild",
  },
  {
    key: "MODERATE",
    value: "Moderate",
  },
  {
    key: "HIGH",
    value: "High",
  },
];

export const selectStatus = [
  {
    label: true,
    name: "Active",
  },
  {
    label: false,
    name: "Historical",
  },
];

export const selectType = [
  {
    label: "CHRONIC",
    name: "Chronic",
  },
  {
    label: "ACUTE",
    name: "Acute",
  },
];

export const Criticality = [
  {
    key: "LOW",
    value: "Low",
  },
  {
    key: "HIGH",
    value: "High",
  },
  {
    key: "UNABLE_TO_ACCESS",
    value: "Unable To Access",
  },
];

export const PatientInsurance = [
  {
    key: "fasting",
    value: "Fasting - 12 Hours",
  },
  {
    key: "non-fasting",
    value: "Non - Fasting",
  },
  {
    key: "doesnt matter",
    value: "Fasting or non-fasting does not matter (Random)",
  },
];

export const ChartNote = [
  {
    key: PatientLabOrder.chartNote.OFFICE_VISIT,
    value: "Office Visit",
  },
  {
    key: PatientLabOrder.chartNote.OTHER,
    value: "Other",
  },
];

export const InterpretationType = [
  {
    key: "NORMAL",
    value: "Normal",
  },
  {
    key: "ABNORMAL",
    value: "Abnormal",
  },
];

export const DocumentType = [
  {
    key: "Intake Form",
    value: "Intake Form",
  },
  {
    key: "SOAP Note",
    value: "SOAP Note",
  },
  {
    key: "Signed Consent Form",
    value: "Signed Consent Form",
  },
];

export enum priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  ALL = "ALL",
}

export enum statusType {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE",
  INCOMPLETE = "INCOMPLETE",
  ALL = "ALL",
}

export enum taskTypes {
  REMINDER_TASKS = "REMINDER_TASKS",
  DOCUMENTS = "DOCUMENTS",
  REFERRALS_UNDELIVERED_FAXES = "REFERRALS_UNDELIVERED_FAXES",
  MEDICATION_SAFETY = "MEDICATION_SAFETY",
  UNSIGNED_ENCOUNTER = "UNSIGNED_ENCOUNTER",
  SUPER_BILLS_UNSUBMITTED_BILLS = "SUPER_BILLS_UNSUBMITTED_BILLS",
  IMAGE_ORDER = "IMAGE_ORDER",
  ALL = "ALL",
}
export const DosageWhenList = [
  {
    key: "BEFORE_MEAL",
    value: "Before Meal",
  },
  {
    key: "AFTER_MEAL",
    value: "After Meal",
  },
  {
    key: "AFTERNOON_MEAL",
    value: "Afternoon Meal",
  },
  {
    key: "IN_THE_MORNING",
    value: "In the Morning",
  },
];
export const DosageUnitList = [
  {
    key: "MG",
    value: "Mg",
  },
  {
    key: "TABLET",
    value: "Tablet",
  },
];
export const DosageTimeList = [
  {
    key: "EVERY_DAY",
    value: "Every Day",
  },
  {
    key: "TWICE_A_DAY",
    value: "Twice A Day",
  },
];
