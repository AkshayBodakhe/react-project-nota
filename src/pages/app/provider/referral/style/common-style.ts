import { makeStyles } from "@mui/styles";

export const style = makeStyles(() => ({
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems:"baseline"
  },
  footerBtn: {
    display: "flex",
    alignItems: "end",
    gap:"20px"
  },
  footer: {
    display: "flex",
    justifyContent: "end",
    marginTop: "30px",
    gap: "20px",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "100%",
    border: "none",
    "& fieldset": { border: "none" },
    '& .MuiInputBase-root': {
         display:"flex",
         alignItems:"center"                   
    }
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
    textTransform:"capitalize",
    fontSize:"13px !important"
  },
  label: {
    color: "#1A1A1A !important",
    marginBottom: "10px !important",
  },
  textFieldFullWidth: {
    borderRadius: "5px",
    border: "none",
    "& fieldset": { border: "none" },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    textAlign: "center",
    padding: "13px 0px 10px 16px",
    fontSize: "16px",
    width: "100%",
  },
  addlabel: {
    color: "#36588C",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "14px",
  },
  footerText: {
    display: "flex",
    alignItems: "end",
  },
  titleData: {
    color: "black",
  },
  signBtn: {
    border: "1px solid #36588C",
    padding: "8px 15px",
  },
  dropZone: {
    minHeight: "200px !important",
  },
  uploadIcon: {
    fill: "#1A1A1A66",
  },
  textUploadZone: {
    color: "#1A1A1A",
    fontSize: "12px !important",
  },
  box: {
    border: "1px solid #1A1A1A33",
    opacity: 1,
    padding: "10px !important",
  },
  container: {
    flexDirection: "column",
    background: "#FFFFFF 0% 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 6px #00000029 !important",
    borderRadius: "10px !important",
  },
  item: {
    display: "flex",
  },
  title: {
    fontWeight: "bold",
    color: "#1B5984",
    fontSize: "16px",
    fontStyle: "Roboto, Medium",
  },
  unitItem: {
    display: "flex",
    marginTop: "5px !important",
  },
  dataTitle: {
    color: "#1A1A1A99",
  },
  data: {
    color: "#1A1A1ACC",
  },
  optionBtn: {
    background: "#1A1A1A0D 0% 0% no-repeat padding-box !important",
    border: "1px solid #1A1A1A26 !important",
    borderRadius: "3px !important",
    opacity: 1,
    color: "#1A1A1A99 !important",
    fontSize: "14px !important",
    padding: "2px 5px !important",
  },
  icon: {
    fontSize: "16px !important", // Adjust the size as needed
    cursor: "pointer",
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
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    gap: "20px",
  },
}));
