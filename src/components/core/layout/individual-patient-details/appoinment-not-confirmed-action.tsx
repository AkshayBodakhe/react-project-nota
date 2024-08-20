import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { Checkbox, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import EventSucessModal from "../../../common/success-modal";
// import EventSucessModal from "../../common/success-modal";

export const dialogStyles = makeStyles({
  headerContainer: {
    textAlign: "left",
    color: "#1A1A1A",
    fontSize: "32px !important",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "start",
    border: "1px solid #1A1A1A33",
    background: "#1A1A1A0D 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    padding: "16px",
  },
  cardContainerRight: {
    marginLeft: "59px",
    font: "normal normal medium 16px/19px Roboto",
    color: "#1A1A1ACC",
    fontWeight: "800",
  },
  firstLine: {
    display: "flex",
    justifyContent: "space-between",
  },
  secondLine: {
    padding: "18px 0px",
  },
  checkboxFirst: {
    display: "flex",
    justifyContent: "start",
  },
});

const sxs = {
  mainButtonStyle: {
    width: "12.625rem",
    backgroundColor: "#0097F0",
    height: "42px",
    textTransform: "initial",
    fontSize: "14px",
    fontWeight: "500",
  },
  titleStyle: {
    color: "#1A1A1A",
    fontWeight: "600",
  },
  subTitle: {
    color: "#004186",
    fontWeight: "600",
    font: "normal normal medium 24px/28px Roboto",
  },
  firstLine: {
    color: "var(--unnamed-color-1a1a1acc)",
    font: "normal normal medium 16px/19px Roboto",
    fontWeight: "700",
    opacity: "1",
  },
  secondLine: {
    color: "var(--unnamed-color-1a1a1acc)",
    font: "normal normal medium 16px/19px Roboto",
    fontWeight: "700",
    opacity: "1",
  },
  thirdLine: {
    color: "var(--unnamed-color-1a1a1acc)",
    font: "normal normal medium 16px/19px Roboto",
    fontWeight: "700",
    opacity: "1",
  },
  checkboxHeadingFirst: {
    marginTop: "49px",
    marginBottom: "13px",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  checkboxHeadingSecond: {
    marginTop: "28px",
    marginBottom: "13px",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  checkboxHeadingThird: {
    marginTop: "28px",
    marginBottom: "13px",
    fontWeight: "600",
    color: "#1A1A1A",
  },
  commonCheckbox: {
    padding: "0px",
  },
  checkboxFirst: {
    padding: "12px",
    color: "#1A1A1A80",
    fontSize: "20px",
    fontWeight: "600",
    font: "Roboto medium",
  },
  footerDialog: {
    display: "flex",
    justifyContent: "space-between",
  },
  footerContent: {
    fontSize: "20px",
    paddingLeft: "24px",
    fontWeight: "600",
    color: "#1A1A1A80",
    opacity: "1",
  },
  btnDialog: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: "16px",
    marginRight: " 16px",
    textTransform: "initial",
  },
};

export default function AppoinmentNotConfirmedAction({
  openDialog,
  onClose,
}: any) {
  const classes = dialogStyles();
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (openDialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={onClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          id="scroll-dialog-title"
          // className={classes.headerContainer}
        >
          <Typography variant="h1" sx={sxs.titleStyle}>
            {"Accept Appointment for Henna West"}
            <Close
              sx={{
                position: "absolute",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={onClose}
            />
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className={classes.cardContainer}>
              <Typography variant="h1" sx={sxs.subTitle}>
                Appointment Details
              </Typography>
              <div className={classes.cardContainerRight}>
                <div className={classes.firstLine}>
                  <Typography sx={sxs.firstLine}>Henna West</Typography>
                  <Typography sx={sxs.firstLine}>
                    hennawest@gmail.com
                  </Typography>
                  <Typography sx={sxs.firstLine}>(555) 321-1234</Typography>
                </div>
                <div className={classes.secondLine}>
                  <Typography sx={sxs.secondLine}>
                    Friday, March 20, 2022 from 10:00 AM - 10:40 AM
                  </Typography>
                </div>
                <div>
                  <Typography sx={sxs.thirdLine}>
                    99441 - Initial Consultation - 40 Minutes - $60 at video
                    call consultation
                  </Typography>
                </div>
              </div>
            </div>
            <div>
              <Typography variant="h1" sx={sxs.checkboxHeadingFirst}>
                Consent Documents
              </Typography>
              <div className={classes.checkboxFirst}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
                <Typography sx={sxs.checkboxFirst}>
                  Consent for Telehealth Consultation
                </Typography>
              </div>
              <div className={classes.checkboxFirst}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
                <Typography sx={sxs.checkboxFirst}>
                  Notice of Privacy Practices
                </Typography>
              </div>
              <div className={classes.checkboxFirst}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
                <Typography sx={sxs.checkboxFirst}>
                  Practice Policies
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="h1" sx={sxs.checkboxHeadingSecond}>
                Questionnaire
              </Typography>
              <div className={classes.checkboxFirst}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
                <Typography sx={sxs.checkboxFirst}>
                  Standard Intake Questionnaire Template
                </Typography>
              </div>
              <div className={classes.checkboxFirst}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
                <Typography sx={sxs.checkboxFirst}>
                  Pre-Appointment Screening Questionnaire
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="h1" sx={sxs.checkboxHeadingThird}>
                Demographics
              </Typography>
              <div className={classes.checkboxFirst}>
                <Checkbox
                  sx={{
                    padding: 0,
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                />
                <Typography sx={sxs.checkboxFirst}>
                  Demographics form{" "}
                </Typography>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={sxs.footerDialog}>
          <Typography sx={sxs.footerContent}>
            Henna will receive documents on his patient portal
          </Typography>
          <div>
            <Button
              sx={sxs.btnDialog}
              variant="contained"
              type="submit"
              onClick={() => {
                setOpenSuccessModal(true);
              }}
            >
              Send & Confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      {openSuccessModal && (
        <EventSucessModal
          message="Appointment Confirmed Successfully!"
          onClose={() => {
            setOpenSuccessModal(false);
            onClose(true);
          }}
        />
      )}
    </div>
  );
}
