import { Column } from "../../../../../../components/common/enums-and-interfaces/interfaces";

export interface Row {
  [key: string]: string | JSX.Element;
}

export const columns: Column[] = [
  {
    id: "id",
    label: "User ID",
    minWidth: 50,
    displaySort: false,
    align: "left",
  },
  {
    id: "userName",
    label: "User Name",
    minWidth: 120,
    displaySort: false,
    align: "left",
  },
  {
    id: "role",
    label: "Role",
    minWidth: 80,
    displaySort: false,
    align: "left",
  },
  // {
  //   id: "departmentName",
  //   label: "Department Name",
  //   minWidth: 80,
  //   displaySort: false,
  //   align: "left",
  // },
  // { id: "email", label: "Email Id", minWidth: 80, displaySort: false, align: 'left' },
  {
    id: "phone",
    label: "Contact",
    minWidth: 100,
    displaySort: false,
    align: "left",
  },
  {
    id: "lastLogin",
    label: "Last Login",
    minWidth: 120,
    displaySort: false,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
    displaySort: false,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 50,
    displaySort: false,
    align: "center",
  },
];

export function createData(
  id: string,
  userName: JSX.Element | string,
  role: string,
  emailId: string,
  contactNumber: string,
  lastLogin: string,
  status: JSX.Element | string,
  action: JSX.Element | string
): Row {
  return {
    id,
    userName,
    role,
    emailId,
    contactNumber,
    lastLogin,
    status,
    action,
  };
}
