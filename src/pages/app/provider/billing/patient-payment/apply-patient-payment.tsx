import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../styles/common";
import { adminConstants } from "../../../../../constants/admin";

export const addPatientPaymentStyle = makeStyles(() => ({
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
  label: {
    color: "#1A1A1A !important",
    marginBottom: "10px !important",
    fontSize: "14px !important",
  },
  selectInputStyle: {
    ".MuiOutlinedInput-notchedOutline": { border: 0 },
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
    height: "42px !important",
    width: "100%",
    border: "none",
    background: "white",
    "& fieldset": { border: "none" },
  },
  menuItemColorStyle: {
    color: "#1A1A1A7F",
  },
}));

interface AddMasterModelProps {
  source?: string;
  open: boolean;
  setOpen: any;
  scroll?: string;
  title?: string;
  columns?: any;
  labData?: any;
  setLabData?: any;
}

function ApplyPatientPayment(props: AddMasterModelProps) {
  const classes = addPatientPaymentStyle();
  const {
    //source,
    open,
    setOpen,
    scroll,
    setLabData,
  } = props;
  const { CANCEL ,ADD} = adminConstants;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    setLabData({
      loincNum: "",
      description: "",
    });
  };

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //     },
  //   },
  // };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        id="scroll-dialog-title"
        sx={{ background: "#F5F6F9", marginBottom: "15px" }}
      >
        <Typography sx={formTitle}>Patient Payment Apply</Typography>
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <Grid container columnGap={2}>
          <Grid item xs={3.8}>
            <Typography variant="h4" className={classes.label}>
              Payment ID
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Payment ID"
              />
            </Paper>
          </Grid>
          <Grid item xs={3.8}>
            <Typography variant="h4" className={classes.label}>
              Transaction ID
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Transaction Id"
              />
            </Paper>
          </Grid>
          <Grid item xs={3.8}>
            <Typography variant="h4" className={classes.label}>
              Patient Name
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Patient Name"
              />
            </Paper>
          </Grid>
          <Grid item xs={3.8} mt={2}>
            <Typography variant="h4" className={classes.label}>
              Total Payment
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Total Payment"
              />
            </Paper>
          </Grid>
          <Grid item xs={3.8} mt={2}>
            <Typography variant="h4" className={classes.label}>
              Applied Payment
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Applied Payment"
              />
            </Paper>
          </Grid>
          <Grid item xs={3.8} mt={2}>
            <Typography variant="h4" className={classes.label}>
              Unapplied Payment
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Unapplied Payment"
              />
            </Paper>
          </Grid>
          <Grid item xs={3.8} mt={2}>
            <Typography variant="h4" className={classes.label}>
              Service/Bill NO
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Service/Bill NO"
              />
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{ paddingRight: "20px !important", gap: "10px", ...formBottom }}
      >
        <ButtonBase
          onClick={handleClose}
          sx={formButtonStyle.cancelButtonStyle}
        >
          {CANCEL}
        </ButtonBase>
        <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={handleSave}>
          {ADD}
        </ButtonBase>
      </DialogActions>
    </Dialog>
  );
}

export default ApplyPatientPayment;
