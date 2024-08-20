import { makeStyles } from "@mui/styles";

export const style = makeStyles(() => ({
  main: {
    background: "#ffffff",
  },
  mainTitle: {
    font: "normal normal medium 24px/28px Roboto",
    letterSpacing: "0px",
    color: "#1A1A1ACC",
    opacity: 1,
    fontWeight: "bold !important",
  },
  icon: {
    fontSize: "20px !important",
  },
  filterBtn: {
    background: "#1A1A1A0D 0% 0% no-repeat padding-box !important",
    border: "1px solid #1A1A1A26 !important",
    borderRadius: "5px !important",
    opacity: 1,
    textAlign: "left",
    font: "normal normal medium 14px/16px Roboto !important",
    letterSpacing: "0px",
    color: "#1A1A1A99 !important",
    padding: "2px 5px !important",
  },
  filterContainer: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 6px #00000029",
    borderRadius: "10px",
    opacity: 1,
  },
  checkContainer: {
    display: "flex",
    gap: "15px",
  },
  checkItem: {
    color: "#1A1A1A7F",
    opacity: 1,
    display: "flex",
    alignItems: "center",
    fontSize: "14px !important",
  },
  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
    background: "none !important",
  },
  inputBase: {
    marginLeft: "2px !important",
    flex: 1,
    "& input::placeholder": {
      fontSize: "14px",
    },
  },
  iconButton: {
    padding: "10px",
  },
  label: {
    color: "#1A1A1A !important",
    fontSize: "16px !important",
    opacity: 1,
    marginBottom: "10px !important",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "100%",
    border: "none",
    "& fieldset": { border: "none" },
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
  filterTitle: {
    display: "flex",
    gap: "15px",
  },
  noPadding: {
    paddingTop: "0px !important",
  },
}));
