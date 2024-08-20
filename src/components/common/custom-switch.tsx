import { Button, Switch, Typography, styled } from "@mui/material";
import { withStyles } from "@mui/styles";
// import ActiveInactiveSwitch from "../../../common/custom-switch";
import { switchStyles } from "../../pages/app/admin/settings/enable-disable-switch";

type Props = {
  state: boolean;
  onChange: any;
  role?: boolean;
};

export const CustomSwitch = withStyles({
  switchBase: {
    color: "#4C4C4C66",
    "&$checked": {
      color: `#FFFFFF !important`,
      top: "10px",
      width: "35px !important",
      height: "5px !important",
    },
    "&$checked + $track": {
      backgroundColor: `#2BAC1D !important`,
    },
  },
  checked: {},
  track: {},
})(Switch);

export const AntSwitch = styled(Switch)(({}) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    transitionDuration: "100ms !important",
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#2BAC1D",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: { duration: 300 },
    //   duration: 200,
    // }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#BFBFBF",
    //   theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: "border-box",
  },
}));

const ActiveInactiveSwitch = (props: Props) => {
  const classes = switchStyles();
  const { state, onChange, role } = props;

  return (
    <Button
      sx={{
        background: "#1A1A1A0F 0% 0% no-repeat padding-box",
        borderRadius: "13px",
        padding: "2px 10px",
        gap: "8px",
        width: "7rem",
      }}
    >
      <AntSwitch
        onChange={onChange}
        checked={state}
        sx={{}}
        inputProps={{ "aria-label": "ant design" }}
      />
      {!role && (
        <Typography className={classes.enableDisableMainTheme}>
          {state ? "Active" : "Inactive"}
        </Typography>
      )}
      {role && (
        <Typography className={classes.enableDisableMainTheme}>
          {state ? "Enable" : "Disable"}
        </Typography>
      )}
    </Button>
  );
};

export default ActiveInactiveSwitch;
