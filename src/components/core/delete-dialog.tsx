import {
  ButtonBase,
  Dialog,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { formButtonStyle } from "../../styles/common";
interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onEventSuccessModalOpen: () => void;
  title: string;
  message: string;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = (props:DeleteDialogProps) => {
  const {
    open,
    onClose,
    onEventSuccessModalOpen,
    message,
  }=props

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        sx={{ boxShadow: "0px 0px 8px #00000029" }}
      >
        <Grid container p={2}>
          <Grid item xs={11}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Do you want to delete {message}?
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {/* <ButtonBase onClick={onClose}>
              <CloseOutlinedIcon />
            </ButtonBase> */}
          </Grid>
        </Grid>
        <DialogActions>
          <Grid sx={{ display: "flex", gap: "20px" }}>
            <Grid>
              <ButtonBase
                onClick={onClose}
                sx={formButtonStyle.cancelButtonStyle}
              >
                Cancel
              </ButtonBase>
            </Grid>
            <Grid>
              <ButtonBase sx={formButtonStyle.saveButtonStyle} onClick={onEventSuccessModalOpen}>
                Yes
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
