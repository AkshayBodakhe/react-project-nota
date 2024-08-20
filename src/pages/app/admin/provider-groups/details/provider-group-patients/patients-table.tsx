export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
  displaySort?: boolean;
}

export interface Row {
  [key: string]: string | JSX.Element;
}

export const columns: Column[] = [
  { id: "id", label: "ID", minWidth: 50, displaySort: true },
  {
    id: "patientName",
    label: "Patient Name",
    minWidth: 100,
    displaySort: true,
  },
  {
    id: "contactNumber",
    label: "Contact Number",
    minWidth: 100,
    displaySort: true,
  },
  { id: "birthDate", label: "DOB", minWidth: 150, displaySort: true },
  { id: "providers", label: "Providers", minWidth: 80, displaySort: true },
  {
    id: "providerGroupLocation",
    label: "Provider Group Location",
    minWidth: 120,
    displaySort: true,
  },
  { id: "lastVisit", label: "Last Visit", minWidth: 50, displaySort: true },
  { id: "status", label: "Status", minWidth: 50, displaySort: false },
];

export function createData(
  patientID: string,
  patientName: JSX.Element | string,
  contactNumber: string,
  dob: string,
  providers: string,
  providerGroupLocation: string,
  lastVisit: string,
  status: JSX.Element | string
): Row {
  return {
    patientID,
    patientName,
    contactNumber,
    dob,
    providers,
    providerGroupLocation,
    lastVisit,
    status,
  };
}
