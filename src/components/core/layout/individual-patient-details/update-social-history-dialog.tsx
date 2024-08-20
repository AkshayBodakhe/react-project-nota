import React from "react";
import { ButtonBase, Dialog, Grid, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface UpdateSocialHistoryDialogProps {
  open: boolean;
  onClose: () => void;
}

export const UpdateSocialHistoryDialog: React.FC<
  UpdateSocialHistoryDialogProps
> = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <Grid container sx={{ height: "700px" }}>
          <Grid container>
            <Grid item xs={11}>
              <Typography
                variant="h1"
                sx={{ color: "#1A1A1A", fontWeight: "bold" }}
              >
                Social history
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <ButtonBase onClick={onClose}>
                <CloseOutlinedIcon />
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default UpdateSocialHistoryDialog;
