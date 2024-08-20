export enum ModalMessages {
  LAB_DELETED = "Lab Order Deleted Successfully",
  LAB_ADDED = "Lab Order Added Successfully",
  LAB_EDITED = "Lab Edited Successfully",
  LAB_RESULT_DELETED = "Lab Result Deleted Successfully",
}

export enum Roles {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  PROVIDER = "PROVIDER",
  STAFF = "STAFF",
  NURSE = "NURSE",
  PATIENT = "PATIENT",
}

export enum ActionType {
  ACTION_WITH_EDIT_BTN = "Action with edit btn",
  ACTION_WITH_MOREVERTICON = "Action with MoreVertIcon",
}

export enum StatusType {
  TOGGLE_BTN = "Toggle Btn",
  TEXT = "Text",
}

export enum Permission {
  //admin
  AUDIT_LOG = "AUDIT_LOG",            //completed
  ADMIN_USER="ADMIN_USER",            //completed
  PROVIDER_GROUP="PROVIDER_GROUP",    //completed

  //Both Admin and Provider
  DASHBOARD="DASHBOARD",              //completed
  LOCATIONS="LOCATIONS",              //completed
  USER="USER",                        //completed
  DEPARTMENT="DEPARTMENT",            //completed
  MASTERS="MASTERS",                  //completed

  //Provider
  PATIENT="PATIENT",                  //completed
  UNSIGNED_VISIT="UNSIGNED_VISIT",    //completed
  CLINICAL_REPORT="CLINICAL_REPORT",  //completed
  STICKY_NOTE="STICKY_NOTE",          //completed
  HISTORY="HISTORY",                  //completed
  TIMELINES="TIMELINES",              //completed
  MACROS="MACROS",                    //completed
  DOCUMENT="DOCUMENT",                //completed
  MEDICATION="MEDICATION",            //completed
  TASK="TASK",                        //completed
  GROUP_MESSAGE="GROUP_MESSAGE",      //completed
  CONTACT_DIRECTORY="CONTACT_DIRECTORY",//completed
  ALLERGY="ALLERGY",                  //completed
  VACCINE="VACCINE",                  //completed
  INTAKE_FORM="INTAKE_FORM",
  VITAL="VITAL",                      //completed
  AVAILABILITY="AVAILABILITY",
  ROLES_AND_RESPONSIBILITIES="ROLES_AND_RESPONSIBILITIES",//completed
  APPOINTMENT="APPOINTMENT",          //completed

  //care provider
  CARE_PATIENT_CHART="CARE_PATIENT_CHART", //completed
}
