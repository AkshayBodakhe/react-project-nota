import { makeStyles } from "@mui/styles";
import { alpha } from "@mui/material";
import { theme } from "./notificationThem";

export const toolBarContainer = {
  display: "grid"
  // gridTemplateColumns: "1fr 215px"
};

export const searchBar = {
  border: "1px solid #D2D2D2",
  width: "35% !important",
  borderRadius: "10px",
  background: theme.palette.background.default,
  "& fieldset": {
    border: "none"
  },
  ".MuiInputLabel-root": {
    top: "-6px",
    fontSize: "14px",
    color: "#8F8F8F"
  },
  ".MuiOutlinedInput-root": {
    padding: "0px 0px 0px 8px  !important",
    height: "auto !important"
  },
  ".MuiChip-root": {
    height: "28px !important"
  }
};

export const profileContainer = {
  display: "flex",
  alignItems: "center",
  gap: "15%"
};

export const badgeStyle = {
  background: `${theme.palette.background.default}`,
  borderRadius: "5px",
  color: `${theme.palette.primary.main}`,
  border: `1px solid ${theme.palette.primary.main}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "36px",
  height: "36px",
  fontSize: "100px",
  cursor: "pointer"
};

export const searchContainer = {
  display: "flex",
  alignItems: "center"
};

export const title1 = {
  fontSize: "16px",
  color: theme.palette.primary.main,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "150px"
};

export const title2 = {
  fontSize: "13px",
  color: theme.palette.primary.main
};

export const profileAvt = {
  border: "1.35px solid #6EC4F6",
  borderRadius: "100%"
  // height: "32px",
  // width: "32px"
};

export const searchIcon = {
  color: "#727272"
};

export const navBarStyles = makeStyles(() => ({
  badge: {
    fontSize: 17,
    height: 20,
    minWidth: 20
  }
}));

export const notificationContainer = {
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "15px",
  cursor: "pointer"
};

export const notificationContainerUnseen = {
  border: `1px solid ${theme.palette.grey[300]}`,
  background: alpha(theme.palette.info.light, 0.2),
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "15px",
  cursor: "pointer"
};
export const cardStyle = {
  padding: "15px 0",
  border: "3px solid white",
  // borderRadius: "5px",
  backgroundColor: "white",
  // background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 0px 6px #00000029",
  borderRadius: "10px",
  opacity: 1,
};
export const FilterSearch = {
  background: "#CCECFF80 0% 0% no-repeat padding-box !important",
  border: "1px solid #1B5984 !important",
  borderRadius: "5px !important",
  opacity: 1,
  color: "#1B5984 !important",
  padding: "8px 10px !important",
}