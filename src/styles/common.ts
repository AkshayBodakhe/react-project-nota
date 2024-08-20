import { makeStyles } from "@mui/styles";
import theme from "../theme";
import { adminConstants } from "../constants/admin";
const { CHANGE } = adminConstants;
export const commonWidget = makeStyles(
  () => ({
    menuItemColorStyle: {
      color: "#1A1A1A7F",
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
    label: {
      color: "#1A1A1A7F !important",
      fontWeight: "500 !important",
      // marginBottom: "10px !important",
    },
    textFieldInput: {
      fontStyle: "normal",
      // fontWeight: "bold",
      fontSize: "14px !important",
      lineHeight: "140%",
      color: "",
      width: "100%",
      resize: "vertical",
      minHeight: "15px",
      "&::placeholder": {
        fontSize: "14px !important",
        fontWeight: "500 !important",
      },
    },
    textFieldRoot: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "42px",
      textAlign: "center",
      padding: "12px 10px 12px 10px",
    },
    textFieldActive: {
      background: `${theme.palette.primary.light} 0% 0% no-repeat padding-box !important`,
      boxShadow: `0px 0px 6px ${theme.palette.secondary.main} !important`,
      border: `1px solid ${theme.palette.primary.main} !important`,
      borderRadius: "4px !important",
    },
    inputBoxError: {
      background: `${theme.palette.primary.light} 0% 0% no-repeat padding-box !important`,
      boxShadow: "0px 0px 6px #ef53502 !important",
      border: `1px solid ${theme.palette.error.main} !important`,
      borderRadius: "4px !important",
    },
    providerTextAreaField: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      size: "small",
      textAlign: "center",
      padding: "10px 0px 10px 10px !important",
      fontSize: "16px",
      minHeight: "81px",
      width: "100%",
    },
    pageError: {
      marginBottom: "10px !important",
      fontSize: "15px !important",
      color: "#2BBC30 !important",
    },
    errorMessgaeStyle: {
      color: `${theme.palette.error.main}`,
    },
    pageTitle: {
      textAlign: "left",
      fontWeight: "bold !important",
      letterSpacing: "0.22px !important",
      color: "#1A1A1A",
      marginLeft: "2px !important",
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
    },
    providerTextInput: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "38px",
      textAlign: "center",
      padding: "13px 0px 10px 16px",
      fontSize: "16px",
      alignItems: "center",
      "& input::placeholder": {
        alignItems: "center",
        fontSize: "12.5px",
      },
      "@media (max-width: 820px)": {
        width: "100%",
      },
      "@media (max-width: 768px)": {
        width: "100%",
      },
    },
    inputBoxActive2: {
      background: "#FFFFFF 0% no-repeat padding-box !important",
      boxShadow: "0px 0px 6px #00418602 !important",
      border: "1px solid #36588C!important",
      borderRadius: "4px !important",
    },
    providerGroupDescriptionTextInput: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      size: "small",
      textAlign: "center",
      padding: "10px 0px 10px 10px !important",
      fontSize: "16px",
      minHeight: "81px",
    },
    addressTextField: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "42px !important",
      textAlign: "center",
      padding: "13px 0px 10px 16px",
      fontSize: "16px",
      width: "100%",
      "@media (max-width: 820px)": {
        width: "100% !important",
      },
    },
    addressCityTextField: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
      height: "42px !important",
      textAlign: "center",
      padding: "13px 0px 10px 16px",
      fontSize: "16px",
      width: "12.773rem !important",
      "@media (max-width: 820px)": {
        width: "100% !important",
      },
    },

    hoursInputField: {
      borderRadius: "5px",
      border: "none",
      "& fieldset": { border: "none" },
      boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
      height: "42px !important",
      textAlign: "center",
      padding: "13px 0px 10px 8px",
      fontSize: "16px",
      width: "6rem !important",
      "@media (max-width: 820px)": {
        width: "100%",
      },
    },
    hoursInputTextBox: {
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontSize: "14px !important",
      lineHeight: "140%",
      color: "",
      width: "100%",
      resize: "vertical",
      minHeight: "15px",
    },
    tableHeadRowContainer: {
      "& th": {
        backgroundColor: "#f1ebd7d9 !important",
        borderBottom: "none",
        fontSize: "14px",
        fontWeight: "600",
        padding: "8px 10px !important",
        color: "#1A1A1A99 !important",
      },

      "& td": {
        padding: "10px 10px !important",
        fontSize: "0.875rem",
      },
    },
    tableHeadRow: {
      "& th": {
        backgroundColor: "#f5edd7 !important",
        borderBottom: "none",
        fontSize: "14px",
        fontWeight: "600",
        padding: "8px 10px !important",
        color: "#1A1A1A99 !important",
      },

      "& td": {
        padding: "10px 10px !important",
        fontSize: "0.875rem",
      },
    },
    providerTableHeadRowContainer: {
      "& th": {
        backgroundColor: "#E7E7E7 !important",
        borderBottom: "none",
        fontSize: "14px",
        fontWeight: "600",
        padding: "8px 10px !important",
        color: "#1A1A1ACC !important",
      },

      "& td": {
        padding: "10px 10px !important",
        fontSize: "0.875rem",
        // fontWeight: "600",
        textAlign: "left",
        // font: 'normal bold 18px/21px Roboto',
        letterSpacing: "0.4px",
        color: "#1A1A1A80 !important",
        opacity: 1,
      },
    },
    addButtonTypo: {
      color: "#0097F0 !important",
      display: "flex",
      paddingRight: "2px !important",
      opacity: 0.7,
    },
    avatarImage: {
      display: "flex",
      alignItems: "center",
    },
    avatarStyle: {
      width: "32px !important",
      height: "32px !important",
    },
    noDataMsg: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: "4% 0",
      background: "white",
    },
    addUserRoleBtnTypo: {
      color: "#0097F0 !important",
      fontWeight: "bold !important",
      display: "flex",
      paddingRight: "12px",
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
  }),
  { defaultTheme: theme }
);

export const flexEnd = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "10px",
};

export const iconArrowWort = {
  marginBottom: "-2px",
  fontSize: "14px",
  transform: "rotate(90deg)",
  color: "#4C4C4CCC",
  cursor: "pointer",
};

export const navigateToDetails = {
  cursor: "pointer",
  textDecoration: "underline",
  fontSize: "16px !important",
  color: "#0097F0",
};

export const customFormLabelBox = (source: string) => {
  return {
    fontFamily: "Roboto, sans-serif !important",
    fontSize: "14px !important",
    color: theme.palette.primary.dark,
    fontWeight: source === CHANGE ? "550" : "550 !important",
  };
};

export const dialogClose = {
  position: "absolute",
  right: "28px",
  cursor: "pointer",
};

export const selectInputStyle = {
  ".MuiOutlinedInput-notchedOutline": {
    border: 0,
    minHeight: "0px !important",
  },
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  height: "42px !important",
  width: "100%",
};

export const dialogTitle = {
  fontSize: "18px !important",
  // marginBottom: "30px !important",
  fontWeight: "bold !important",
  textAlign: "center",
};

export const formTitle = {
  textAlign: "start",
  fontSize: "18px !important",
  color: "black",
  // background: "#F5F6F9",
  fontFamily: "Roboto,sans-serif !important",
  fontWeight: "bold !important",
};

export const formBottom = {
  textAlign: "center",
  // background: "#F5F6F9",
};

export const actionBtns = {
  display: "flex",
  gap: "20px",
  marginRight: "20px",
};

export const providerLabel = {
  letterSpacing: "0.22px",
  color: "#1A1A1A80 !important",
  fontSize: "14px !important",
  opacity: 1,
  fontFamily: "Roboto,sans-serif !important;",
  fontWeight: "600 !important",
};

export const providerValue = {
  letterSpacing: "0.22px",
  color: "#1A1A1ACC",
  opacity: 1,
  fontSize: "14px !important",
  fontWeight: "600 !important",
  fontFamily: "Roboto,sans-serif !important;",
};

export const providerSpeciality = {
  showSpeciality: {
    background: "#CCECFF4D",
    borderRadius: "15px",
    opacity: 1,
  },
  specialityName: {
    color: "#1B5984 !important",
    opacity: 1,
    padding: "6px",
    fontSize: "16px !important",
  },
};

export const formButtonStyle = {
  mainButtonStyle: {
    backgroundColor: "#DAEAF8",
    textTransform: "initial",
    fontSize: "14px",
    color: "#36598c",
    boxShadow: "none !important",
    padding: "6px 16px !important",
    borderRadius: "4px",
  },
  pullButton: {
    fontFamily: "Roboto, sans-serif !important",
    width: "45%",
    color: "#36588C",
    borderColor: "#36588C",
    height: "42px",
    fontSize: "14px",
    border: "1px solid #36588C",
    borderRadius: "4px",
  },
  cancelButtonStyle: {
    fontFamily: "Roboto, sans-serif !important",
    width: "9.625rem",
    color: "#36588C",
    borderColor: "#36588C",
    height: "35px",
    fontSize: "14px",
    border: "1px solid #36588C",
    borderRadius: "4px",
  },
  saveButtonStyle: {
    fontFamily: "Roboto, sans-serif !important",
    width: "9.625rem",
    backgroundColor: "#2C57B3",
    height: "35px",
    fontSize: "14px",
    color: "#ffffff",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#2C57B3",
    },
  },
  applyButtonStyle: {
    fontFamily: "Roboto, sans-serif !important",
    width: "45%",
    backgroundColor: "#36588C",
    height: "42px",
    fontSize: "14px",
    color: "#ffffff",
    borderRadius: "4px",
  },
  drawerTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    right: "0px",
    background: "#F5F6F9",
    width: "100%",
    top: "0px",
    position: "absolute",
    zIndex: 1,
  },
  drawerButtonContainer: {
    display: "flex",
    gap: "20px",
    position: "absolute",
    justifyContent: "flex-end",
    padding: "10px",
    right: "0px",
    background: "#F5F6F9",
    width: "100%",
    bottom: "0px",
  },
  defaultBtn: {
    background: "#CCECFF80 0% 0% no-repeat padding-box",
    border: "1px solid #1B5984",
    borderRadius: "5px",
    opacity: 1,
    padding: "5px 10px !important",
    color: "#1B5984",
  },
  disableBtn: {
    background: "#1A1A1A66 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: 1,
    padding: "5px 10px !important",
    color: "#FFFFFF",
    font: "normal normal bold 14px/16px Roboto",
    letterSpacing: "0.24px",
  },
  editProfileBtn: {
    background: "#CCECFF80 0% 0% no-repeat padding-box",
    border: "1px solid #1B5984",
    borderRadius: "5px",
    opacity: 1,
    height: "35px !important",
  },
};
export const customImageContainer = {
  "& 	.MuiDropzonePreviewList-root": {
    position: "absolute",
    top: "0",
  },
  "& .MuiDropzonePreviewList-image": {
    maxWidth: "500px",
    height: "38vh",
  },
  "& 	.MuiDropzonePreviewList-imageContainer": {
    padding: "32px 0px",
  },
  "& 	.MuiTypography-body1": {
    marginBottom: "10px",
  },
};
export const getCustomStyle = (col: string, value: string): boolean => {
  return col == value;
};

export const AddEditTitle = {
  color: "#1A1A1A",
  opacity: 1,
  fontWeight: "bold !important",
  fontSize: "16px !important",
};

export const statusStyle = {
  background: "#1A1A1A0F 0% 0% no-repeat padding-box",
  borderRadius: "13px",
  opacity: 1,
  padding: "0px 3px",
  cursor: "pointer",
  width: "99px",
};

export const filter = {
  label: { color: "#1A1A1A !important", marginBottom: "10px !important" },
  paperSearch: {
    padding: "4px",
    display: "flex",
    alignItems: "center",
    height: "42px",
    border: "none",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
  },
  inputBase: {
    marginLeft: "2px !important",
    flex: 1,
    "& MuiInputBase-root ": {
      fontSize: "14px !important",
    },
  },
  iconButton: {
    padding: "10px",
  },
  filterContainer: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #1A1A1A33",
    borderRadius: "10px",
    opacity: 1,
    padding: "15px",
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
};

export const editPrintConfiguration = {
  background: "#CCECFF 0% 0% no-repeat padding-box",
  border: "1px solid #0097F0",
  borderRadius: "3px",
  opacity: 1,
  height: "25px",
};

export const deletePrintConfiguration = {
  background: "#FF39390D 0% 0% no-repeat padding-box",
  border: "1px solid #FF3939",
  borderRadius: "3px",
  opacity: 1,
  height: "25px",
};

export const monthView = {
  ".custom-calendar .rbc-month-view ": {
    padding: "10px",
  },
};

export const subTitles = {
  fontSize: "18px",
  fontWeight: "600",
  wordSpacing: "10",
  color: "#2c57b3",
};

export const key = { color: "black", fontSize: "18px" };
export const val = { fontSize: "18px" };

export const commonContainer = {
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
  border: "1px solid #d4d4d4",
  padding: "10px",
  borderRadius: "5px",
};

export const containerList = {
  display: "grid",
  gridTemplateColumns: "50% 50%",
};

export const subTitle = { color: "black", fontSize: "20px" };

export const SaveButtonStylo = {
  fontFamily: "Roboto, sans-serif !important",
  // width: "9.625rem",
  padding: "5px 25px",
  backgroundColor: "#2C57B3",
  height: "35px",
  fontSize: "14px",
  color: "#ffffff",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#2C57B3",
  },
};

export const cancelButtonStylo = {
  fontFamily: "Roboto, sans-serif !important",
  // width: "9.625rem",
  padding: "5px 10px",
  color: "#36588C",
  borderColor: "#36588C",
  height: "35px",
  fontSize: "14px",
  border: "1px solid #36588C",
  borderRadius: "4px",
};
