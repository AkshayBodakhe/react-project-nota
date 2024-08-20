import { makeStyles } from "@mui/styles";

export const ScheduleAppointmentStyle = makeStyles(() => ({
    newPatientButton: {
      background: "#CCECFF80 0% 0% no-repeat padding-box !important",
      border: "1px solid #1B5984 !important",
      borderRadius: "5px !important",
      opacity: 1,
      color: "#1B5984 !important",
      padding: "6px !important",
      fontWeight: "bold !important",
      height: "40px !important",
    },
    newPatientDiv: {
      display: "flex",
      alignItems: "end",
    },
    formlabel: {
      color: "#1A1A1A !important",
      fontSize: "14px !important",
    },
    FormControlLabel: {
      color: "#1A1A1ACC !important",
      fontSize: "14px !important",
    },
    checkBoxColor: {
      background: "#FFFFFF 0% 0% no-repeat padding-box !important",
      border: "1px solid #1A1A1A33 !important",
      borderRadius: "3px !important",
      opacity: 1,
    },
    repeatDiv: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
    weekLetters: {
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      border: "1px solid #1A1A1A33 !important",
      borderRadius: "5px !important",
      opacity: 1,
      color: "#1A1A1A80 !important",
      display: "flex !important",
      width: "30px !important",
      height: "30px !important",
      justifyContent: "center !important",
      alignItems: "center !important",
    },
    enter: {
      background: "#FFFFFF 0% 0% no-repeat padding-box !important",
      boxShadow: "0px 0px 6px #00000029 !important",
      borderRadius: "5px !important",
      opacity: 1,
      width: "50px !important",
      height: "37px !important",
    },
    slotContainer: {
      background: "#FFFFFF 0% 0% no-repeat padding-box !important",
      boxShadow: "0px 0px 6px #00000029 !important",
      borderRadius: "5px",
      opacity: 1,
      display: "flex !important",
      alignItems: "center !important",
      height: "38px !important",
      gap: "5px",
    },
    chooseLabel: {
      color: "#00000066 !important",
    },
    slots: {
      boxShadow: "0px 2px 8px #00000029 !important",
      borderRadius: "5px",
      opacity: 1,
      display: "flex !important",
      alignItems: "center !important",
      justifyContent: "center !important",
      width: "80px !important",
      height: "40px !important",
      cursor:'pointer'
      
    },
    calenderUI: {
      background: "#FFFFFF 0% 0% no-repeat padding-box !important",
      boxShadow: "0px 0px 8px #00000029 !important",
      borderRadius: "5px",
      opacity: 1,
      zIndex:999
    },
  }));