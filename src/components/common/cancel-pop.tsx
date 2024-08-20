import {
  ButtonBase,
  Dialog,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successModalStyles } from "./success-modal";
import { formButtonStyle } from "../../styles/common";

interface CancelPopMeassageProps {
  onClose: () => void;
  message: string;
  navigateToRoute: string;
}
const CancelPopMeassage: React.FC<CancelPopMeassageProps> = ({
  onClose,
  message,
  navigateToRoute,
}) => {
  const classes = successModalStyles();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  console.log(message, navigateToRoute);
  const handleClose = () => {
    onClose();
    setOpen(false);
  };
  const handleYesClick = () => {
    onClose();
    setOpen(false);
    navigate(navigateToRoute);
  };
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
              {message}
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
              <ButtonBase
                sx={formButtonStyle.saveButtonStyle}
                onClick={handleYesClick}
              >
                Yes
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CancelPopMeassage;
