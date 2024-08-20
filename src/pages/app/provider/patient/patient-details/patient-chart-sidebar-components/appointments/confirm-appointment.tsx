import {
  Box,
  ButtonBase,
  Checkbox,
  Dialog,
  // DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { formButtonStyle } from "../../../../../../../styles/common";

export const modalStyle = makeStyles(() => ({
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  checkboxFirst: {
    color: "#1A1A1A80",
    fontSize: "20px",
    fontWeight: "600",
    font: "Roboto medium",
    display: "flex",
    alignItems: "center",
  },
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
    fontWeight: "700 !important",
    color: "#1A1A1A",
  },
  commonCheckbox: {
    padding: "0px",
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
  dialogSection: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  footer:{
    display:"flex",
    justifyContent:"space-between",
    marginTop:"30px",
  },
  footerText:{
    display:"flex",
    alignItems:"end",
  },
  footerBtn :{
    display:"flex",
    alignItems:"end",
  }
}));

export interface DialogProps {
  open: boolean;
  onClose: () => void;
}

function ConfirmAppointment(props: DialogProps) {
  const classes = modalStyle();
  const { onClose, open } = props;

  const close = () =>{
    onClose();
  }

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid className={classes.dialogTitle}>
          <Grid>
            <Typography variant="h4" style={{fontWeight:"bold"}}>
              Accept Appointment for Henna West
            </Typography>
          </Grid>
          <Grid style={{cursor :"pointer"}}>
            <CloseIcon onClick={close}/>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="scroll-dialog-description"
          // ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Box className={classes.cardContainer}>
            <Typography variant="h4" className={classes.subTitle}>
              Appointment Details
            </Typography>
            <Box className={classes.cardContainerRight}>
              <Box className={classes.firstLine}>
                <Typography className={classes.firstLine}>
                  Henna West
                </Typography>
                <Typography className={classes.firstLine}>
                  hennawest@gmail.com
                </Typography>
                <Typography className={classes.firstLine}>
                  (555) 321-1234
                </Typography>
              </Box>
              <Box className={classes.secondLine}>
                <Typography className={classes.secondLine}>
                  Friday, March 20, 2022 from 10:00 AM - 10:40 AM
                </Typography>
              </Box>
              <Box>
                <Typography className={classes.thirdLine}>
                  99441 - Initial Consultation - 40 Minutes - $60 at video call
                  consultation
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.dialogSection}>
            <Box>
              <Typography variant="h4" className={classes.checkboxHeadingFirst}>
                Consent Documents
              </Typography>
            </Box>
            <Box className={classes.checkboxFirst}>
              <Checkbox
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                }}
              />
              <Typography>Consent for Telehealth Consultation</Typography>
            </Box>
            <Box className={classes.checkboxFirst}>
              <Checkbox
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                }}
              />
              <Typography>Notice of Privacy Practices</Typography>
            </Box>
            <Box className={classes.checkboxFirst}>
              <Checkbox
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                }}
              />
              <Typography>Practice Policies</Typography>
            </Box>
          </Box>
          <Box className={classes.dialogSection}>
            <Typography variant="h4" className={classes.checkboxHeadingFirst}>
              Questionnaire
            </Typography>
            <Box className={classes.checkboxFirst}>
              <Checkbox
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                }}
              />
              <Typography>Standard Intake Questionnaire Template</Typography>
            </Box>
            <Box className={classes.checkboxFirst}>
              <Checkbox
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                }}
              />
              <Typography>Pre-Appointment Screening Questionnaire</Typography>
            </Box>
          </Box>
          <Box className={classes.dialogSection}>
            <Typography variant="h4" className={classes.checkboxHeadingFirst}>
              Demographics
            </Typography>
            <Box className={classes.checkboxFirst}>
              <Checkbox
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 28 },
                }}
              />
              <Typography>Demographics form </Typography>
            </Box>
          </Box>
        </DialogContentText>
        <Grid className={classes.footer}>
        <Grid className={classes.footerText}>Henna will receive documents on his patient portal</Grid>
        <Grid className={classes.footerBtn}>
          <ButtonBase sx={formButtonStyle.saveButtonStyle}>
            Send & Confirm
          </ButtonBase>
        </Grid>
      </Grid>
      </DialogContent>
      <Grid>    
      </Grid>
    </Dialog>
  );
}

export default ConfirmAppointment;
