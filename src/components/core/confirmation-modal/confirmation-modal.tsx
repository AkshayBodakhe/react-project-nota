import {
  ButtonBase,
  Dialog,
  DialogActions,
  DialogProps,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  open: boolean;
  handleClose: any;
  message: string;
};

export const css = {
  save: {
    background: "#2C57B3 0% 0% no-repeat padding-box",
    opacity: 1,
    fontFamily: "Roboto, sans-serif !important",
    width: "6rem",
    height: "35px",
    fontSize: "14px",
    color: "#ffffff",
    borderRadius: "4px",
  },
  cancel: {
    fontFamily: "Roboto, sans-serif !important",
    width: "6rem",
    color: "#36588C",
    borderColor: "#36588C",
    height: "35px",
    fontSize: "14px",
    background: "#CCECFF80 0% 0% no-repeat padding-box",
    border: "1px solid #2C57B3",
    borderRadius: "5px",
    opacity: 1,
  },
};

const ConfirmationModal = (props: Props) => {
  const { open, handleClose, message } = props;
  const [scroll] = useState<DialogProps["scroll"]>("paper");

  return (
    <React.Fragment key={"ConfirmationModal"}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        sx={{
          padding: "20px",
        }}
        fullWidth
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
          ></Grid>
        </Grid>
        <DialogActions>
          <Grid sx={{ display: "flex", gap: "20px" }}>
            <Grid>
              <ButtonBase onClick={() => handleClose(false)} sx={css.cancel}>
                No
              </ButtonBase>
            </Grid>
            <Grid>
              <ButtonBase sx={css.save} onClick={() => handleClose(true)}>
                Yes
              </ButtonBase>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmationModal;
