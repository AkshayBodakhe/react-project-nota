import { Button, Typography } from "@mui/material";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";

type Props = {
  state: boolean;
};

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
  width: 30,
  height: 15,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: "red",
    },
    // "&.Mui-disabled + .MuiSwitch-track": {
    //   opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    // },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 11,
    height: 11,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#BFBFBF",
    opacity: 1,
    // transition: theme.transitions.create(["background-color"], {
    //   duration: 500,
    // }),
  },
}));

export const switchStyles = makeStyles(() => {
  return {
    enablegreen: {
      color: "#00B917",
    },
    disablered: {
      color: "#FF3939",
    },
    enableDisableMainTheme: {
      color: "#1A1A1A",
      fontSize: "14px !important",
      textTransform: "capitalize",
      fontWeight: "bold",
      marginLeft: "5px",
    },
  };
});

const EnableDisableSwitch = (props: Props) => {
  const classes = switchStyles();
  const { state } = props;

  const isEdit = useSelector((state: any) => state.editRoleReducer.edit);
  return isEdit ? (
    <Button
      sx={{
        background: "#1A1A1A0F 0% 0% no-repeat padding-box",
        borderRadius: "13px",
        padding: "2px 10px",
      }}
    >
      <IOSSwitch checked={Boolean(state)} />
      <Typography className={classes.enableDisableMainTheme}>
        {state ? "Enable" : "Disable"}
      </Typography>
    </Button>
  ) : (
    <Typography sx={{ color: state ? "#00B917" : "#FF3939" }}>
      {state ? "Enable" : "Disable"}
    </Typography>
  );
};

export default EnableDisableSwitch;
