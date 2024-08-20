import theme from "../theme";

export const passwordFieldIcon = {
  position: "absolute",
  top: "50%",
  right: 25,
  transform: "translateY(-50%)",
  padding: 0,
  color: "#1A1A1A7F",
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
  },
};

export const iconStyle = {
  fontSize: "21px",
};

export const clickableText = {
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};

export const buttonStyle = {
  marginTop: "30px",
  backgroundColor: "#2C57B3 !important",
  fontWeight: "bold",
  fontSize: "15px",
  padding: "10px !important",
  textTransform: "none",
};
export const buttonTextStyle = {
  color: theme.palette.common.white,
  fontWeight: 'bold',
  fontSize: '15px'
};

export const formGrid = {
  minWidth: 500,
  maxWidth: 600,
  backgroundColor: theme.palette.primary.light,
};

export const textFieldGrid = {
  display: "flex",
  flexDirection: "column",
  marginTop: "20px",
  position: "relative",
};

export const backtologinStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  justifyContent: 'center',
  marginTop: '20px',
};

export const backIcon = {
  color: theme.palette.primary.main,
  fontSize: '15px',
};

export const backToText = {
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
};
export const logoStyleAuth = {
  position:'absolute',
  top:'25px',
  left:'20px'
}
export const backToParent = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  justifyContent: 'center',
  cursor: 'pointer',
}

export const FilterSearch = {
    background: "#CCECFF80 0% 0% no-repeat padding-box !important",
    border: "1px solid #1B5984 !important",
    borderRadius: "5px !important",
    opacity: 1,
    color: "#1B5984 !important",
    padding: "8px 10px !important",
}
