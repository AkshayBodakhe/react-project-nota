import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  formBottom,
  formButtonStyle,
  formTitle,
} from "../../../../../styles/common";
import { adminConstants } from "../../../../../constants/admin";
import { useState } from "react";

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
    fontSize:"14px !important",
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

function AddPatientPayment(props: AddMasterModelProps) {
  const classes = addPatientPaymentStyle();
  const {
    //source,
    open,
    setOpen,
    scroll,
    setLabData,
  } = props;
  const {CANCEL} = adminConstants;

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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  const ServiceType = ["All", "Pending For Claim", "Submitted"];
  const [allBillsData, setAllBillsData] = useState({
    primaryProvider: "",
    primaryLocation: "",
    registrationDate: "",
  });

  const handleSelectOption = (e: any) => {
    const { value, name } = e.target;
    setAllBillsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle
        id="scroll-dialog-title"
        sx={{ background: "#F5F6F9", marginBottom: "15px" }}
      >
        <Typography sx={formTitle}>Patient Payment Entry</Typography>
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <Grid container columnGap={2}>
          <Grid item xs={5.8}>
            <Typography variant="h4" className={classes.label}>
              Patient Payment
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder=" Patient Payment"
              />
            </Paper>
          </Grid>
          <Grid item xs={5.8}>
            <Typography variant="h4" className={classes.label}>
              Payment Method
            </Typography>
            <Select
              className={classes.selectInputStyle}
              value={allBillsData.primaryProvider}
              name="primaryProvider"
              onChange={(e: any) => handleSelectOption(e)}
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <span>
                      <Typography
                        variant="h5"
                        sx={{
                          color: "#1A1A1A80 !important",
                        }}
                      >
                        Payment Method
                      </Typography>
                    </span>
                  );
                }
                return <Typography variant="h5">{selected}</Typography>;
              }}
              MenuProps={MenuProps}
              displayEmpty
            >
              {ServiceType.map((data) => {
                return (
                  <MenuItem value={data} className={classes.menuItemColorStyle}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={5.8} mt={2}>
            <Typography variant="h4" className={classes.label}>
              Check No/NFT/Trans.Id
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Check No/NFT/Trans.Id"
              />
            </Paper>
          </Grid>
          <Grid item xs={5.8} mt={2}>
            <Typography variant="h4" className={classes.label}>
              Amount
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Amount"
              />
            </Paper>
          </Grid>
          <Grid item xs={5.8} mt={2}>
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
        </Grid>
        <Grid container xs={12} mt={2}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.label}>
              Notes
            </Typography>
            <Paper component="form" className={classes.paperSearch}>
              <InputBase
                className={classes.inputBase}
                placeholder="Notes"
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
          Submit
        </ButtonBase>
      </DialogActions>
    </Dialog>
  );
}

export default AddPatientPayment;
