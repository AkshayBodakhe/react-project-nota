import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputBase,
  Typography,
} from "@mui/material";
import { commonWidget, formButtonStyle } from "../../../../../../styles/common";
import { Close } from "@mui/icons-material";

interface noteDialogProps {
  open: boolean;
  onClose: any;
  formikData: any;
}

function NoteForHr(props: noteDialogProps) {
  const { open, onClose, formikData } = props;
  const classes = commonWidget();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h3">
              {"Enter Note for Heart Rate (HR)"}
            </Typography>
            <Close onClick={onClose} sx={{ cursor: "pointer" }} />
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <InputBase
              name={"objective.patientVitals[2].note"}
              onChange={formikData.handleChange}
              value={formikData?.values?.objective?.patientVitals[2]?.note}
              fullWidth
              placeholder="Enter note here"
              classes={{
                root: classes.inputField,
                input: classes.inputBoxText,
                focused: classes.inputBoxActive,
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={onClose}>
            <Typography color={"#fff"}>{"Save"}</Typography>
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NoteForHr;
