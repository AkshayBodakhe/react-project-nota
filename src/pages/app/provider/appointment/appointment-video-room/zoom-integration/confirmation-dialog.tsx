import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  message?: string;
  handleConfirm?: () => void;
};

export const saveBtn = {
  px: "20px",
  py: "5px",
  borderRadius: "5px",
  backgroundColor: "#2c57b3",
  border: "1px solid #2c57b3",
};

export const blueButtonStyle = {
  px: "15px",
  py: "5px",
  borderRadius: "5px",
  backgroundColor: "#e1effb",
  border: "1px solid #2c57b3",
};

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { open, onClose, message, handleConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        zIndex: "999999999999999",
      }}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography
            sx={{ fontSize: "18px", color: "black", fontWeight: "500" }}
          >
            {message || "Are you sure you want to continue?"}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={onClose}> */}
        <ButtonBase sx={blueButtonStyle} onClick={onClose}>
          <Typography sx={{ fontSize: "14px", color: "#2c57b3" }}>
            {"No"}
          </Typography>
        </ButtonBase>
        {/* </Button> */}
        <ButtonBase sx={saveBtn} onClick={handleConfirm}>
          {/* <Button onClick={handleConfirm} autoFocus> */}
          <Typography
            sx={{
              fontSize: "14px",
              textTransform: "capitalize",
              color: "#fff",
            }}
          >
            {"Yes"}
          </Typography>
          {/* </Button> */}
        </ButtonBase>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
