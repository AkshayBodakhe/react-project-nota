import { transformText } from "../../../../../components/common/helper";

export const getActionColor = (action: string) => {
  const transformTextStr = transformText(action);
  switch (transformTextStr) {
    case "Not Confirmed":
      return "#fde0a6f2";
    case "Scheduled":
      return "#078cc3";
    case "Checked In":
      return "#dc78e1";
    case "Exam Room":
      return "#57E1F7";
    case "In Room - Intake":
      return "#897FFF";
    case "Completed":
      return "#198754";
    case "Cancelled":
      return "#dc3545";
    case "Confirmed":
      return "#588BC1";
    case "No Show":
      return "#623ab2";
    case "Waiting Room":
      return "#88C2FF";
    case "Re Scheduled":
      return "rgba(153, 102, 255, 0.5)"
    case "Low":
      return "#00B917";
    case "Medium":
      return "#0097F0";
    case "High":
      return "#FF6347";
    case "Active":
      return "#00B917"
    case "Inactive":
      return "#FF3939"
    case "Open":
      return "#0097F0"
    case "In Progress":
      return "#b571dd"
      case "Complete":
        return "#00B917"
    case "Incomplete":
      return "#FF6347"
    case "Virtual":
      return "#800080"
    case "In Person":
      return "#008080"
    case "Initial":
      return "#808000"
    case "Follow Up":
      return "rgba(153, 102, 255, 0.5)"
    default:
      return "inherit";
  }
};
