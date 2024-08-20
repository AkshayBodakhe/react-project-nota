import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  message?: string;
  handleConfirm?: () => void;
};

export const confirmModalStyle = makeStyles(() => {
  return {
    btnStyle: {
      ".css-x1i9eg-MuiTypography-root": {
        fontSize: "16px",
      },
    },
  };
});

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { open, onClose, message, handleConfirm } = props;
  const classes = confirmModalStyle();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ width: "100px", border: "5px solid black" }}
      maxWidth={"sm"}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h6" color={"black"}>
            {message || "Are you sure you want to continue?"}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className={classes.btnStyle} onClick={onClose}>
          <Typography variant="h5">{"Cancel"}</Typography>
        </Button>
        <Button onClick={handleConfirm} autoFocus>
          <Typography variant="h5">{"Confirm"}</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
