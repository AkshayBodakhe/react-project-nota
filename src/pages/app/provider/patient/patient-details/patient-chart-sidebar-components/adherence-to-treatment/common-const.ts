export const ADHERENCE_TITLE = "Adherence To Treatment";
export const ADD_AT = "Add AT";
export const ADD_ADHERENCE_TITLE = "Add Adherence to Treatment";
export const SAVE_BUTTON_TITLE = "Save";
export const NAME_TITLE = "Name";
export const DESCRIPTION_TITLE = "Description";
export const TYPE_HERE_PLACEHOLDER = "Type Here";
export const STI_TESTING_AND_HISTORY = "STI Testing & History";
export const ADD_STI = "Add STI";
export const ADD_STI_DIALOG_TITLE = "Add STI Testing & History";
export const ADD_TITLE_BUTTON = "Add";
export const SUBSTANCE_PAGE_TITLE = "Substance Abuse History";
export const ADD_SUBSTANCE_TITLE = "Add Substance Abuse History";
export const RISK_SCREENING_TITLE = "Risk Behavior Screening";
export const ADD_RISK_SUB_TITLE = "Add Risk Behavior Screening";
export const SOCIAL_ND_EVN_TITLE = "Social and Environmental Support";
export const ADD_HOUSING = "Add Housing";
export const ADD_EMPLOYMENT_SOURCES_OF_INCOME =
  "Add Employment/Sources Of Income";
export const ADD_EMOTIONAL_SUPPORT = "Add Emotional Support";
export const ADD_FOOD_ASSISTANCE = "Add Food Assistance";
export const ADD_TRANSPORTATION = "Add Transportation";
export const ADD_SUPPORT_GROUP_FAMILY = "Add Support Group/Family";
export const ADD_HISTORY_OF_INCARCERATION = "Add History Of Incarceration";

export const HIV_AID_TITLE = "HIV/AIDS & Other STDs Education";
export const ADD_HIV_AID_TITLE = "Add HIV/AIDS & Other STDs Education";
export const FAMILY_PLANNING = "Family Planning";
export const ADD_FAMILY_PLANNING = "Add Family Planning";
export const REFERRALS_FOR_SERVICES = "Referrals for services";
export const ADD_REFERRALS_TITLE = "Add Referrals for Services";
export const OTHER = "Other";
export const ADD_OTHER_TITLE = "Add Other";
export const TITLE="Title";
export const NOTE="Note";

export const buttonStyle = {
  fontFamily: "Roboto, sans-serif !important",
  width: "9.625rem",
  backgroundColor: "#2C57B3",
  height: "35px",
  fontSize: "14px",
  color: "#ffffff",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#2C57B3",
  },
  background: "#36598C",
};

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
  maxWidth?:number;
  width?: string;
  displaySort?: boolean;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  render?: (value: any, row: Row, args?: any) => JSX.Element;
  callbackFun?: (data: any) => void;
}

export const columns: Column[] = [
  { id: "date", label: "Date", minWidth: 100,maxWidth:100, align: "left" },
  { id: "recordedby", label: "Recorded By", minWidth: 200, align: "left" },
  { id: "name", label: "Title", minWidth: 100, align: "left" },
  { id: "description", label: "Note", minWidth: 200, align: "left" },
];
