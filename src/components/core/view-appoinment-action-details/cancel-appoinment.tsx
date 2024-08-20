import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  InputBase,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import calendar from "../../../assets/other/cancelAppoinment.svg";
import { commonWidget } from "../../../styles/common";
import EventSucessModal from "../../common/success-modal";

export const cancelDialog = makeStyles({
  imgStyle: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function CancelAppointment(props: any) {
  const commonClasses = commonWidget();

  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const classes = cancelDialog();

  const sxs = {
    dialogContentText: {
      textAlign: " center",
      fontSize: "20px",
      fontWeight: "600",
      letterSpacing: "0px",
      color: "#1A1A1A",
      opacity: "1",
    },
    fieldStyle: {
      width: "96%",
      margin: "12px 13px",
    },
  };

  React.useEffect(() => {
    if (props.openCancelAppointmentDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <Dialog
        open={props.openCancelAppointmentDialog}
        onClose={props.onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <div>
            <Close
              onClick={props.onClose}
              sx={{ cursor: "pointer", float: "right" }}
            />
          </div>
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className={classes.imgStyle}>
              <img
                src={calendar}
                style={{
                  height: "202px",
                  width: "182px",
                  marginBottom: "20px",
                }}
              />
            </div>
            <div>
              <Typography sx={sxs.dialogContentText}>
                Please enter reason for the appointment cancellation
              </Typography>
            </div>
            <div>
              <InputBase
                id="document-name-label"
                name="name"
                role="textbox"
                placeholder="Please Enter reason for the appointment cancellation"
                type="text"
                sx={sxs.fieldStyle}
                classes={{
                  root: commonClasses.textFieldFullWidth,
                  input: commonClasses.textFieldInput,
                  focused: commonClasses.textFieldActive,
                  error: commonClasses.inputBoxError,
                }}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div>
            <Button
              sx={{ textTransform: "initial", fontWeight: "600" }}
              variant="contained"
              type="button"
              onClick={() => {
                setOpenSuccessModal(true);
              }}
            >
              Cancel Appointment
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      {openSuccessModal && (
        <EventSucessModal
          message="Appointment has been cancelled!"
          onClose={() => {
            setOpenSuccessModal(false);
            props.onClose(true);
          }}
        />
      )}
    </>
  );
}
