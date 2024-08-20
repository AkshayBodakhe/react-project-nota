export const key = {
  color: "#7b7b7b",
  fontSize: "16px !important",
};
export const value = {
  color: "#1A1A1ACC",
  fontWeight: "bold !important",
};

export const grayButtonStyle = {
  display: "flex",
  gap: "3px",
  px: "4px",
  py: "2px",
  background: "#e5e5e5",
  border: "1px solid #c3c2c2",
  borderRadius: "5px",
};

export const blueButtonStyle = {
  px: "15px",
  py: "8px",
  borderRadius: "5px",
  backgroundColor: "#e1effb",
  border: "1px solid #2c57b3",
};

export const saveButtonStyle = {
  px: "15px",
  py: "8px",
  borderRadius: "5px",
  backgroundColor: "#003cc2",
  border: "1px solid #003cc2",
};

export const activeTab = {
  fontWeight: "bold",
  color: "blue",
};

export const boxContainer = {
  height: "30px",
  width: "80px",
  border: "1px solid black",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const displayNote = {
  display: "flex",
  flexDirection: "column",
  rowGap: 1,
  overflow: "hidden",
};

export const noteBox = {
  background: "#e1effb",
  borderRadius: "5px",
  cursor: "pointer",
};

export const sideBarList = [
  {
    id: "Subjective",
    name: "Subjective",
    submenu: [
      {
        id: "HPI",
        name: "HPI",
      },
      {
        id: "ROS",
        name: "ROS",
      },
    ],
  },
  {
    id: "Objective",
    name: "Objective",
    submenu: [
      {
        id: "Vitals",
        name: "Vitals",
      },
      {
        id: "PE",
        name: "PE",
      },
    ],
  },
  {
    id: "Assessment",
    name: "Assessment",
    submenu: [
      {
        id: "Diagnosis Code",
        name: "Diagnosis Code",
      },
    ],
  },
  {
    id: "Plan",
    name: "Plan",
    submenu: [
      {
        id: "Procedure Code",
        name: "Procedure Code",
      },
      {
        id: "Lab",
        name: "Lab",
      },
      {
        id: "Imaging",
        name: "Imaging",
      },
      {
        id: "Medications",
        name: "Medications",
      },
      {
        id: "Instruction Note",
        name: "Instruction Note",
      },
      {
        id: "Follow Up",
        name: "Follow Up",
      },
    ],
  },
];

export interface HeaderTabs {
  label: string;
}
