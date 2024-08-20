import { makeStyles } from "@mui/styles";

export const parentContainer = {
  background: "#fff",
  boxShadow: "0px 0px 8px #00000029",
  borderRadius: "5px",
  opacity: 1,
  padding: "10px",
};

export const style = makeStyles(() => ({
  tab: {
    fontSize: "16px !important",
  },
  speciality: {
    ackground: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #1A1A1A33",
    borderRadius: "10px",
    opacity: 1,
    padding: "10px",
  },
  imgStyle: {
    width: "146px !important",
    height: "130px !important",
  },
  multispeciality: {
    background: "#CCECFF4D 0% 0% no-repeat padding-box",
    borderRadius: "15px",
    opacity: 1,
    padding: "0px 10px !important",
  },
  key: {
    color: "#1A1A1A80",
    fontSize: "16px !important",
  },
  value: {
    color: "#1A1A1ACC",
    fontWeight: "bold !important",
  },
}));

export const dataImportTab = makeStyles(() => ({
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
  },
  iconButton: {
    padding: "10px",
  },
  tableHeader: {
    background: "#FFC77B33 0% 0% no-repeat padding-box !important",
    fontWeight: "600 !important",
  },
  tableHeaderText: {
    fontWeight: "600  !important",
    color: "#1A1A1A80",
    fontSize: "16px !important",
  },
}));
