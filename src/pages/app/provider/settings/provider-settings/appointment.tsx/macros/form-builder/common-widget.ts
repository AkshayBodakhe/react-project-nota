import { makeStyles } from "@mui/styles";
import theme from "../../../../../../../../theme";

export const style = makeStyles(() => ({
  tableHeader: {
    background: "#FFC77B33 0% 0% no-repeat padding-box !important",
    fontWeight: "600 !important",
  },
  tableHeaderText: {
    fontWeight: "600  !important",
    color: "#1A1A1A80",
    fontSize: "16px !important",
  },
  actionBtn: {
    background: "#CCECFF 0% 0% no-repeat padding-box !important",
    border: "1px solid #0097F0 !important",
    borderRadius: "3px !important",
    padding: "3px 10px !important",
    opacity: 1,
    cursor: "pointer",
    "&:hover": {
      color: "#36588C",
    },
    color: "#0097F0 !important",
  },
}));

export const tableUseStyles = makeStyles(
  (theme) => ({
    tableContainer: {
      width: "100%",
      marginTop: "20px",
    },

    key: {
      color: "#7b7b7b",
      fontSize: "16px !important",
    },
    value: {
      color: "#1A1A1ACC",
      fontWeight: "bold !important",
    },
    tableHeaderCell: {
      padding: "10px !important",
      background: "#DAEAF8 0% 0% no-repeat padding-box !important",
      color: "#000",
      boxShadow: "none !important",
      opacity: 1,
    },
    tableHeadCellRoot: {
      padding: "0.550rem !important",
    },
    checkBoxColor: {
      color: "#004186 !important",
    },
    tableRowCell: {
      padding: "5px 10px !important",
      [theme.breakpoints.down("xl")]: {
        padding: "5px 10px !important",
      },
    },
    tableBodyRow: {
      backgroundColor: "#ffffff",
      "&:nth-of-type(odd)": {
        backgroundColor: "#ffffff",
      },
    },
    pagination: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 16,
    },
    paginatioUL: {
      border: "1px solid red",
    },

    root: {
      "& .MuiPaginationItem-root": {
        color: "#000",
        "&:hover": {
          backgroundColor: "#ccc",
        },

        "&.Mui-selected": {
          backgroundColor: "#004186 !important",
          color: "#fff",
        },
      },

      "& .MuiPaginationItem-icon": {
        color: "#004186 !important",
      },
    },
    defaultText: {
      color: "#000000 !important",
      //fontWeight: "bold !important",
    },
    contactText: {
      color: "#000000 !important",
      //fontWeight: "600 !important",
    },
    copayAmountNegativeText: {
      //fontWeight: "600 !important",
      width: "auto",
      //border: "1px solid #FF3939",
      color: "#FF3939 !important",
      // background: "#FF39390D",
      // textAlign: "center",
      // borderRadius: "5px",
      padding: "2px",
    },
    copayAmountPositiveText: {
      //fontWeight: "600 !important",
      width: "auto",
      //border: "1px solid #00B917",
      color: "#00B917 !important",
      //background: "#00B9170D",
      //textAlign: "center",
      //borderRadius: "5px",
      padding: "2px",
    },

    patientInfo: {
      display: "flex !important",
      alignItems: "center !important",
      gap: "20px !important",
    },
    avatarStyle: {
      width: "32px !important",
      height: "32px !important",
    },
    subAppoinmentInfo: {
      color: "#000000 !important",
      // fontSize: "14px !important",
      //fontWeight: "600 !important",
    },
    subAppoinmentInfo2: {
      color: "#000000 !important",
      textDecoration: "underline",
      // fontSize: "14px !important",
      //fontWeight: "600 !important",
      cursor: "pointer",
    },

    tableHeadingTypo: {
      color: "#000000 !important",
      //fontWeight: "600 !important",
    },
    paginationBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    TabelheadingTypo: {
      color: "#000000 !important",
    },
    headingBackground: {
      background: "#DAEAF8 0% 0% no-repeat padding-box !important",
    },
    checkIcon: {
      color: "#00B917",
    },
    warningIcon: {
      color: "#FF3939",
    },
  }),
  { defaultTheme: theme }
);
