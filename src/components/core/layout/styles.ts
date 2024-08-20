import { makeStyles } from "@mui/styles";
//import { flexEnd } from "../../../styles/common";
import theme from "../../../theme";

export const useStyles = makeStyles(() => ({
  appBarContainerForAdmin: {
    boxShadow: "0px 6px 17px #00000029 !important",
    height: "50px",
    width: "100%",
    background: "#FFFFFF !important",
  },
  toolbar: {
    minHeight: "49px !important",
  },

  inputBoxActive2: {
    background: "#FFFFFF 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 6px #00418602 !important",
    border: "1px solid #36588C!important",
    borderRadius: "4px !important",
  },

  sideBarContainer: {
    minHeight: "calc(100vh - 51px)",
    background: "#EBF4F5",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    maxWidth: "250px",
    margin: "0px 0 0 0",
    overflowY: "auto",
  },
  componentStyle: {
    width: "100%",
    // padding: '10px',
    // background: '#FFFFFF 0% 0% no-repeat padding-box',
    // boxShadow: '0px 0px 8px #00000029',
    // borderRadius: '5px',
    // opacity: 1,
    // overflowX: "hidden",
    // overflowY: "scroll",
  },
  dashGrid: {
    borderRadius: "5px",
    position: "relative",
    minHeight: "96.3vh",
    overflow: "hidden",
    // background: "#F5F6F9 0% 0% no-repeat padding-box",
    background: "#F1F1F1 0% 0% no-repeat padding-box",
    // boxShadow: "0px 0px 8px #00000029",
    opacity: "1",
    flex: "1",
    // margin: "10px 45px !important",
    display: "flex",
    margin: "0 !important",
    padding: "10px 30px !important",
    "@media (max-width: 1280px)": {
      padding: "10px 20px",
    },
  },
  sideBarContainerAdmin: {
    minWidth: "190px",
    minHeight: "calc(100vh - 51px)",
    background: "#FFFFFF",
    boxShadow: "4px 4px 8px #00000029",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    maxWidth: "211px",
    margin: "0px 0 0 0",
    overflowY: "auto",
  },
  listRoot: {
    padding: "10px !important",
  },
  listItemRoot: {
    margin: "10px 0px",
    color: "#697386",
    cursor: "pointer",
    fontWeight: "600 !important",
    overflow: "hidden",
    "&:hover": {
      borderRadius: "5px",
      background: "#E0E0E0",
    },
  },
  activeList: {
    borderRight: "5px solid #0097F0",
    borderRadius: "5px",
    background: "#E0E0E0",
  },
  listItemText: {
    color: "red !important",
  },
  listItemTextRoot: {
    overflow: "hidden",
  },
  listItemStyle: {
    padding: "9px 18px !important",
    "&:hover": {
      color: "#36588C !important",
      background: "#CCECFF 0% 0% no-repeat padding-box !important",
    },
  },
  iconStyle: {
    color: "#0097F0!important",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  iconStyleAdmin: {
    color: "#0097F0 !important",
    width: "20px",
  },
  otherTab: {},
  mobileWidth: {
    width: "76px",
  },
  subMenulistItemRoot: {
    margin: "3px 25px",
    padding: "8px 10px",
    color: "#697386",
    cursor: "pointer",
    fontWeight: "600 !important",
    width: "fit-content !important",
    overflow: "hidden",
    "&:hover": {
      borderRadius: "5px",
      background: "#E0E0E0",
    },
  },
  subMenuList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "end",
  },
  listItemStyleClass: {
    display: "flex",
    justifyContent: "space-between !important",
    margin: "10px 0px !important",
  },
  paddinNone: {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
  },
  appBarContainer: {
    height: "60px",
    width: "100%",
    background: "#2C57B3 0% 0% no-repeat padding-box !important",
    boxShadow: "0px 0px 8px #00000029",
    color: "#fff",
    opacity: 1,
    justifyContent: "center",
  },
  search: {
    position: "relative",
    "&:hover": {},
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperPop: {
    width: "500px",

    height: "500px",
  },

  inputRoot: {
    maxWidth: "250px",
    height: "30px",
    background: "#FFFFFF",
    boxShadow: "0px 0px 5px #00000029",
    borderRadius: "5px",
    padding: "0px 16px",

    margin: "0px 14px 0px 0px",
    [theme.breakpoints.down("md")]: {
      maxWidth: "230px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "150px",
    },

    [theme.breakpoints.down("xs")]: {
      maxWidth: "100px",
    },
  },

  inputText: {
    minHeight: "15px",
    fontSie: "12px",
    padding: "4px 9px 5px !important",
  },
  searchIconStyle: {
    color: "#1A1A1A7F",
  },
  logoStyle: {
    flexGrow: 1,
    margin: "0px 42px !important",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 9px !important",
    },
  },
  dataListOfProvider: {
    "&:hover": {
      borderBottom: "2px solid #fff",
    },
  },
  userNameText: {
    marginLeft: "12px !important",
    marginTop: "9px",
    font: "normal normal medium 18px/22px Roboto",
    letterSpacing: 0,
    color: "#1A1A1A",
    fontWeight: "bold",
  },
  buttonActive: {
    borderBottom: "3px solid #ffff !important",
  },
  buttonDeactive: {
    borderBottom: "3px solid transparent !important",
  },
}));

export const listText = {
  activeListText: {
    fontSize: "0.875rem",
    letterSpacing: "0px",
    color: "#1A1A1A",
    fontWeight: "bold",
  },
  deActiveListText: {
    fontSize: "1.005rem",
    letterSpacing: "0px",
    color: "#1A1A1AB3",
    fontWeight: "800",
  },
  gapBetweenIcon: {
    minWidth: "35px",
  },
  activeListTextAdmin: {
    fontSize: "0.75rem",
    letterSpacing: "0px",
    color: "#1A1A1A",
    fontWeight: "bold",
  },
  deActiveListTextAdmin: {
    fontSize: "0.75rem",
    letterSpacing: "0px",
    color: "#1A1A1A",
  },
};
export const dashboardMainStyle = {
  "@media (max-width: 820px)": {
    width: "70% !important",
  },
  "@media (max-width: 768px)": {
    width: "65% !important",
  },
  "@media (max-width: 1285.60px)": {
    width: "80% !important",
  },
};

export const iconButtonStyle = {
  p: "10px",
  position: "absolute",
  margin: "4px -48px",
};

export const userNameText = {
  font: "normal normal medium 18px/22px",
  color: "#1A1A1A",
  letterSpacing: 0,
  textAlign: "left",
  fontWeight: 550,
  marginLeft: "12px",
  marginTop: "5px",
};

export const borderBottomWhite = "3px solid #fff";

export const toolBarHeight = "40px";
export const toolBarHeightAdmin = "49px";

export const toolBarStyleProvider = {
  minHeight: toolBarHeight,
  width: "100%",
  paddingLeft: "0px",
};

export const providerAppBarOptions = {
  margin: "0px 15px",
  padding: "4px 8px",
  color: "#fff",
};

export const arrowDropDownOptions = {
  height: "28px",
  marginTop: "12px",
  marginLeft: "12px",
  paddingTop: "2px",
};

export const iconStyle = { color: "#fff", margin: "0px 14px 0px 0px" };

export const avatarStyle = {
  width: "24px",
  height: "24px",
  margin: "0px 14px 0px 0px",
};

export const logutModal = {
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 0px 8px #00000029",
  borderRadius: "5px",
  width: "165px",
  height: "100px",
  paddingTop: "15px",
};

export const subGrid = {
  height: "28px",
  marginLeft: "12px",
};

export const betweenGridMargin = "12px";
export const topGridMargin = "25px";
export const menuCursor = "pointer";

const basePop = {
  fontSize: "14px",
  padding: "6px 15px",
};

export const popButtons = {
  ...basePop,
  color: "#1A1A1A99",
  cursor: "pointer",
};

export const mainContainer = {
  background: "white",
  boxShadow: "0px 0px 8px #00000029",
  borderRadius: "5px",
  opacity: 1,
  padding: "10px",
  height: "470px",
};

export const card = {
  border: "1px solid #1A1A1A1A",
  borderRadius: "5px",
  opacity: 1,
  padding: "10px",
  height: "370px",
};

export const tabNumber = {
  marginRight: "8px",
  background: "#1A1A1A0D",
  padding: "5px 10px",
  borderRadius: "25px",
  textAlign: "center",
};
