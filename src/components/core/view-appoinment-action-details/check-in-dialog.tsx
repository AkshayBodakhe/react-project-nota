import { Close } from "@mui/icons-material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
export const checkInDialogStyles = makeStyles({
  headerContainerIcons: {
    display: "flex",
  },
  dialogContent: {
    display: "grid",
    gridTemplateColumns: "225px 200px",
    lineHeight: "5px",
    padding: "0px 0px 34px 0px",
  },
  dialogContentContainer: {
    display: "flex",
  },
  dialogContainerContentColSecond: {
    marginLeft: "65px",
  },
});

export const sxs = {
  dialogTitle: {
    color: " #1A1A1A",
    fontSize: "1.5rem",
    fontWeight: "600",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  checkInIcon: {
    // marginRight: "10px",
    color: "#36588C",
  },
  chartText: {
    margin: "0px 8px",
    fontWeight: "600",
    color: "#36588C",
  },
  dialogContentKey: {
    color: "#1A1A1A80",
    letterSpacing: "0.19px",
    fontWeight: "700",
  },
  dialogContentValue: {
    color: "#1A1A1ACC",
    fontWeight: "bold",
    letterSpacing: "0.19px",
    opacity: "1",
  },
  btnStyle: {
    marginRight: "16px",
    background: "#CCECFF80",
    color: "#36588C",
    border: "1px solid #36588C",
    fontWeight: "600",
    textTransform: "initial",
  },
};
export default function CheckInDialog(props: any) {
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const classes = checkInDialogStyles();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.openCheckInDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={props.openCheckInDialog}
        onClose={props.onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          id="scroll-dialog-title"
          // className={classes.headerContainer}
          sx={sxs.headerContainer}
        >
          <Typography sx={sxs.dialogTitle}>{"Check In"}</Typography>

          <div className={classes.headerContainerIcons}>
            <TrendingUpIcon sx={sxs.checkInIcon} />
            <Typography sx={sxs.chartText}>Chart</Typography>
            <Close onClick={props.onClose} sx={{ cursor: "pointer" }} />
          </div>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className={classes.dialogContentContainer}>
              <div>
                <div className={classes.dialogContent}>
                  <Typography sx={sxs.dialogContentKey}>
                    Appointment Type
                  </Typography>
                  <Typography sx={sxs.dialogContentValue}>
                    New Patient
                  </Typography>
                </div>
                <div className={classes.dialogContent}>
                  <Typography sx={sxs.dialogContentKey}>
                    Authorization
                  </Typography>
                  <Typography sx={sxs.dialogContentValue}>
                    Religare (NCB54878545)
                  </Typography>
                </div>
                <div className={classes.dialogContent}>
                  <Typography sx={sxs.dialogContentKey}>
                    Reason For Visit
                  </Typography>
                  <Typography sx={sxs.dialogContentValue}>
                    Headaches And Sickness
                  </Typography>
                </div>
                <div className={classes.dialogContent}>
                  <Typography sx={sxs.dialogContentKey}>
                    Outstanding Balance
                  </Typography>
                  <Typography sx={sxs.dialogContentValue}>$20</Typography>
                </div>
                <div className={classes.dialogContent}>
                  <Typography sx={sxs.dialogContentKey}>Copay</Typography>
                  <Typography sx={sxs.dialogContentValue}>$45</Typography>
                </div>
              </div>
              <div className={classes.dialogContainerContentColSecond}>
                <div className={classes.dialogContent}>
                  <Typography sx={sxs.dialogContentKey}>
                    Primary Provider Name
                  </Typography>
                  <Typography sx={sxs.dialogContentValue}>
                    Corina Earle
                  </Typography>
                </div>
                <div className={classes.dialogContent}>
                  <Typography sx={sxs.dialogContentKey}>
                    Appointment Date & Time
                  </Typography>
                  <Typography sx={sxs.dialogContentValue}>
                    21 Sep 2022 & 03:30 PM
                  </Typography>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div>
            <Button
              sx={sxs.btnStyle}
              variant="contained"
              type="button"
              onClick={() => {
                props.setOpenDialog(true);
              }}
            >
              Edit Demographics
            </Button>
            <Button sx={sxs.btnStyle} variant="contained" type="submit">
              Collect Payment
            </Button>
            <Button
              sx={{ textTransform: "initial", fontWeight: "600" }}
              variant="contained"
              type="button"
              onClick={() => {
                navigate("/provider/appointment/intake-form");
              }}
            >
              Complete Check In
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
