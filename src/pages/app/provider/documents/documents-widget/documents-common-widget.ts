import { makeStyles } from "@mui/styles";

export const parentContainer = {
  background: "white",
  boxShadow: "0px 0px 8px #00000029",
  borderRadius: "5px",
  opacity: 1,
  padding: "10px",
};

export const buttonStyle = {
  border: "2px solid #d9d9d9",
  paddingX: "5px",
  paddingY: "3px",
  borderRadius: "5px",
};

export const inputStyle = {
  background: "inherit",
  height: "fit-content",
  borderRadius: "5px",
  border: "1px solid #d9d9d9",
  paddingX: "10px",
};

export const arrowBack = {
  cursor: "pointer",
  color: "black",
};

export const attachmentStyle = {
  border: "2px dotted #737373",
  cursor: "pointer",
};

export const head1 = {
  color: "#1A1A1ACC",
  fontWeight: 600,
};

export const fileStyle = {
  height: "100px",
  width: "100px",
  padding: "0px",
  cursor: "pointer",
};

export const uploadButtonStyle = {
  textTransform: "none",
  cursor: "pointer",
  background: "#2C57B3",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "30px",
  borderRadius: "5px",
};

export const inputBase = makeStyles(() => ({
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
    height: "20px !important",
    width: "100%",
    marginTop: "10px",
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  dropZone: {
    minHeight: "150px !important",
    // minWidth: "350px !important",
    width: "330px !important",
    height: "255px !important",
    borderRadius: "20px",
    backgroundColor: "#F1F1F1",
    border: "2px solid #00000029",
    padding: "15px",
  },
  uploadIcon: {
    fill: "#2879C9",
  },
  textUploadZone: {
    color: "#1A1A1ACC !important",
    fontSize: "15px !important",
    marginTop: "0px",
    marginBottom: "10px",
  },
}));
