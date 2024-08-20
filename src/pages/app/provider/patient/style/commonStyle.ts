import { makeStyles } from "@mui/styles";

export const patientStyle = makeStyles(() => ({
  formTitle: {
    fontWeight: "bold",
    // padding: "10px 0px !important",
  },
  main: {
    // margin: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "end",
    gap: "20px",
  },
  closeButton: {
    right: "0",
    position: "absolute",
    marginRight: "25px",
  },
  formGridTitle: {
    color: "#000000",
    fontWeight: "bold",
    background: "#DAEAF8 !important",
    padding: "10px 10px !important",
  },
  inputField: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
    marginTop: "10px",
  },
  inputBoxText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: "14px !important",
    lineHeight: "140%",
    color: "",
    width: "100%",
    resize: "vertical",
    minHeight: "15px",
  },
  inputBoxActive: {
    background: `#FFFFFF 0% 0% no-repeat padding-box !important`,
    boxShadow: `0px 0px 6px #0097F002 !important`,
    border: `1px solid #0097F0 !important`,
    borderRadius: "4px !important",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    border: "none",
    "& fieldset": { border: "none" },
    height: "42px !important",
    width: "100%",
    marginTop: "10px",
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  label: {
    color: "#1A1A1A7F !important",
    fontWeight: "500 !important",
    // marginBottom: "10px !important",
  },
  GridDiv: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  textUploadZone: {
    color: "#1A1A1ACC !important",
    fontSize: "18px !important",
    marginTop: "24px",
    marginBottom: "24px",
  },
  insuranceGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  insuranceDropZone: {
    display: "flex",
    gap: "30px",
  },
  uploadIcon: {
    fill: "#2879C9",
  },
  dropZone: {
    minHeight: "150px !important",
    minWidth: "350px !important",
    width: "380px !important",
    height: "200px !important",
    borderRadius: "20px",
    backgroundColor: "#F1F1F1",
    border: "2px solid #00000029",
  },
  tableTitle: {
    color: "#000",
    // background: "#e1e8ed",
    padding: "0px 5px 10px 0px !important",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "bold",
  },
  checkBoxColor: {
    color: "#004186 !important",
  },
  tableCell: {
    padding: "10px 5px !important",
  },
  successStatus: {
    display: "flex",
    // justifyContent: "center",
    color: "white",
    borderRadius: "20px",
    padding: "2px 0px",
  },
  failStatus: {
    display: "flex",
    // justifyContent: "center",
    color: "white",
    borderRadius: "20px",
    padding: "2px 0px",
  },
  patientDetails: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-start",
    cursor: "pointer",
    alignItems: "center !important",
  },
  avatarStyle: {
    width: "32px !important",
    height: "32px !important",
  },
  customTextField: {
    "& input::placeholder": {
      fontSize: "14px",
    },
  },
  checkBoxText: {
    // fontWeight: "700 !important",
    color: "#1A1A1ACC !important",
  },
  checkBoxGrid: {
    display: "flex",
    // marginTop: "10px !important ",
  },
  checkBoxItem: {
    display: "flex",
    alignItems: "center",
  },
  btnTextDropList: {
    textAlign: "left",
    position: "absolute",
    left: 12,
    fontSize: "14px !important",
    fontStyle: "normal !important",
    fontFamily: "Roboto !important",
    fontWeight: "400 !important",
    lineHeight: "140%",
    color: "rgba(33, 37, 41, 0.65)",
  },
  mainFromContainer: {
    marginTop: "20px !important",
    border: "1px solid #1A1A1A26",
    padding: "15px",
    boxShadow: "0px 0px 6px #00000029",
    borderRadius: "5px",
    opacity: 1,
  },
  listItem: {
    paddingY: "0px !important",
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
}));
